/* ======================================================================
   alfred.js — Alfred, asistente virtual del Panel de Control Equiser
   · Burbuja de chat flotante integrada al tablero
   · Responde sobre prioridades, vencimientos, responsables y programas
   · Puede CREAR y EDITAR acciones/prioridades y registrar seguimientos
   · Motor: OpenRouter (API compatible con OpenAI, con tool calling)
   Se carga después de editor.js y reutiliza sus funciones globales
   (ACCIONES, CATALOGOS, HOY, PROGRAMAS, persistir, refrescarTodo…).
   ====================================================================== */

const ALFRED_CFG = {
  endpoint: 'https://openrouter.ai/api/v1/chat/completions',
  // La clave NO va en el repositorio: se carga desde alfred.key.js (archivo
  // local ignorado por git) que define window.ALFRED_API_KEY.
  apiKey: (typeof window !== 'undefined' && window.ALFRED_API_KEY) || '',
  modelo: 'deepseek/deepseek-chat-v3.1',
  nombre: 'Alfred',
  maxRondasTools: 4,
  sitio: 'Panel de Control Equiser'
};

/* ==================== Contexto del tablero para Alfred ================= */

function alfredFotoCompacta() {
  const fila = a => [
    a.id, a.titulo, a.prioridad, a.estado, a.responsable || '—', a.area || '—',
    a.fecha_compromiso || '—', (a.porcentaje_avance || 0) + '%',
    esVencida(a) ? 'VENCIDA' : (venceEn7(a) ? 'vence≤7d' : '')
  ].filter(Boolean).join(' | ');
  return ACCIONES.map(fila).join('\n');
}

function alfredResumen() {
  const porEstado = {};
  CATALOGOS.estados.forEach(e => { porEstado[e] = ACCIONES.filter(a => a.estado === e).length; });
  const vencidas = ACCIONES.filter(esVencida);
  const en7 = ACCIONES.filter(venceEn7);
  return {
    fecha_corte: HOY,
    total: ACCIONES.length,
    alta: ACCIONES.filter(a => a.prioridad === 'Alta').length,
    media: ACCIONES.filter(a => a.prioridad === 'Media').length,
    baja: ACCIONES.filter(a => a.prioridad === 'Baja').length,
    por_estado: porEstado,
    vencidas: vencidas.map(a => a.id),
    vencen_en_7_dias: en7.map(a => a.id),
    programas: PROGRAMAS.map(p => `${p.id} ${p.nombre} (${p.estado})`)
  };
}

function alfredSystemPrompt() {
  return `Eres ${ALFRED_CFG.nombre}, el asistente virtual del Panel de Control Equiser — Seguimiento Integral de EQUISER PANAMÁ (equipos y servicios de izaje pesado). Hablas SIEMPRE en español, con tono profesional, claro y conciso.

TU MISIÓN
1. Responder preguntas sobre el tablero: prioridades, estados, vencimientos, responsables, áreas, programas PMO, evidencias, bloqueos y escalamientos.
2. Hacer seguimiento detallado: cuando te pidan el estado de algo, usa las herramientas para dar datos exactos (nunca inventes cifras).
3. Crear y editar prioridades/acciones y registrar seguimientos usando las herramientas disponibles.

DATOS DEL TABLERO (foto al ${HOY}, fecha de corte)
Resumen: ${JSON.stringify(alfredResumen())}

Listado compacto (id | título | prioridad | estado | responsable | área | compromiso | avance | alerta):
${alfredFotoCompacta()}

REGLAS DE NEGOCIO DEL TABLERO (respétalas y explícalas si hace falta)
- Estados oficiales: ${CATALOGOS.estados.join(' | ')}.
- "Implementada" NO equivale a "Cerrada": el cierre exige evidencia cargada y verificación independiente.
- Prioridad (Alta/Media/Baja) refleja impacto y riesgo, no el vencimiento del plazo.
- Una acción viva (no cerrada) con fecha compromiso anterior a la fecha de corte está VENCIDA.
- Sin evidencia no se cierra; el verificador debe ser distinto del ejecutor en lo posible.

CÓMO ACTUAR
- Para crear una acción, pide al usuario al menos: título, prioridad, área, responsable y fecha compromiso (si falta algo crítico, pregúntalo; lo demás puedes asumirlo con valores razonables).
- Al crear o editar, confirma después con un resumen breve de lo realizado (id, cambios).
- Para cerrar una acción recuerda que se requiere evidencia; si el usuario insiste sin evidencia, explica la regla.
- Si te preguntan algo fuera del panel, responde brevemente y redirige al tablero.
- Usa formato ligero: listas cortas con guiones y negritas con ** doble asterisco cuando ayude. Nada de tablas gigantes en el chat.`;
}

/* ==================== Herramientas (tool calling) ===================== */

const ALFRED_TOOLS = [
  {
    type: 'function',
    function: {
      name: 'consultar_acciones',
      description: 'Busca acciones del tablero con filtros opcionales. Devuelve coincidencias con sus campos clave.',
      parameters: {
        type: 'object',
        properties: {
          estado: { type: 'string', description: 'Estado exacto del catálogo' },
          prioridad: { type: 'string', enum: ['Alta', 'Media', 'Baja'] },
          responsable: { type: 'string', description: 'Texto contenido en el responsable' },
          area: { type: 'string', description: 'Texto contenido en el área' },
          solo_vencidas: { type: 'boolean' },
          vencen_en_7_dias: { type: 'boolean' },
          texto: { type: 'string', description: 'Texto libre en título o descripción' },
          limite: { type: 'integer', description: 'Máximo de resultados (defecto 15)' }
        }
      }
    }
  },
  {
    type: 'function',
    function: {
      name: 'detalle_accion',
      description: 'Devuelve TODOS los campos de una acción concreta por su id (p. ej. H01, M12, L03).',
      parameters: {
        type: 'object',
        properties: { id: { type: 'string' } },
        required: ['id']
      }
    }
  },
  {
    type: 'function',
    function: {
      name: 'crear_accion',
      description: 'Crea una nueva acción/prioridad en el tablero y la guarda. El id se genera automáticamente según la prioridad.',
      parameters: {
        type: 'object',
        properties: {
          titulo: { type: 'string' },
          descripcion: { type: 'string' },
          prioridad: { type: 'string', enum: ['Alta', 'Media', 'Baja'] },
          area: { type: 'string', description: 'Área responsable, p. ej. Finanzas, Legal, Operaciones, RR. HH., Comercial…' },
          subarea: { type: 'string' },
          responsable: { type: 'string' },
          fecha_compromiso: { type: 'string', description: 'Formato YYYY-MM-DD' },
          impacto: { type: 'string' },
          urgencia: { type: 'string', enum: ['Inmediata', 'Alta', 'Media', 'Baja'] },
          riesgo: { type: 'string' },
          verificador: { type: 'string' },
          etiquetas: { type: 'array', items: { type: 'string' } }
        },
        required: ['titulo', 'prioridad', 'area', 'responsable', 'fecha_compromiso']
      }
    }
  },
  {
    type: 'function',
    function: {
      name: 'editar_accion',
      description: 'Modifica campos de una acción existente. Campos permitidos: titulo, descripcion, prioridad, area, subarea, responsable, colaboradores, estado, fecha_compromiso, porcentaje_avance, riesgo, impacto, urgencia, evidencia_requerida, evidencia_cargada, bloqueo, dependencia, verificador, criterio_cierre, criterio_eficacia, etiquetas, programa.',
      parameters: {
        type: 'object',
        properties: {
          id: { type: 'string' },
          campos: { type: 'object', description: 'Solo los campos a cambiar' }
        },
        required: ['id', 'campos']
      }
    }
  },
  {
    type: 'function',
    function: {
      name: 'agregar_seguimiento',
      description: 'Registra un seguimiento (comentario con autor y fecha) en una acción; opcionalmente cambia su estado o avance.',
      parameters: {
        type: 'object',
        properties: {
          id: { type: 'string' },
          texto: { type: 'string' },
          autor: { type: 'string', description: 'Quién reporta; defecto: Alfred (asistente)' },
          nuevo_estado: { type: 'string', description: 'Estado del catálogo, opcional' },
          porcentaje_avance: { type: 'integer', minimum: 0, maximum: 100 }
        },
        required: ['id', 'texto']
      }
    }
  }
];

const ALFRED_CAMPOS_EDITABLES = ['titulo', 'descripcion', 'prioridad', 'area', 'subarea', 'responsable',
  'colaboradores', 'estado', 'fecha_compromiso', 'porcentaje_avance', 'riesgo', 'impacto', 'urgencia',
  'evidencia_requerida', 'evidencia_cargada', 'bloqueo', 'dependencia', 'verificador', 'criterio_cierre',
  'criterio_eficacia', 'etiquetas', 'programa'];

function alfredBuscar(id) { return ACCIONES.find(a => a.id === String(id || '').trim().toUpperCase()); }

function alfredFilaDetalle(a) {
  return {
    id: a.id, codigo: a.codigo, titulo: a.titulo, prioridad: a.prioridad, estado: a.estado,
    responsable: a.responsable, area: a.area, subarea: a.subarea,
    programa: programaDe(a), compromiso: a.fecha_compromiso,
    dias_vs_corte: diasPara(a), vencida: esVencida(a), avance: a.porcentaje_avance,
    evidencia_cargada: !!a.evidencia_cargada, bloqueo: a.bloqueo || null
  };
}

/* Ejecuta una herramienta y devuelve {ok, resultado} */
function alfredEjecutarTool(nombre, args) {
  try {
    if (nombre === 'consultar_acciones') {
      let lista = ACCIONES.slice();
      if (args.estado) lista = lista.filter(a => a.estado === args.estado);
      if (args.prioridad) lista = lista.filter(a => a.prioridad === args.prioridad);
      if (args.responsable) { const r = args.responsable.toLowerCase(); lista = lista.filter(a => (a.responsable || '').toLowerCase().includes(r)); }
      if (args.area) { const r = args.area.toLowerCase(); lista = lista.filter(a => (a.area || '').toLowerCase().includes(r)); }
      if (args.solo_vencidas) lista = lista.filter(esVencida);
      if (args.vencen_en_7_dias) lista = lista.filter(venceEn7);
      if (args.texto) { const t = args.texto.toLowerCase(); lista = lista.filter(a => ((a.titulo || '') + ' ' + (a.descripcion || '')).toLowerCase().includes(t)); }
      const total = lista.length;
      lista = lista.slice(0, Math.min(args.limite || 15, 30));
      return { ok: true, resultado: { total_coincidencias: total, acciones: lista.map(alfredFilaDetalle) } };
    }

    if (nombre === 'detalle_accion') {
      const a = alfredBuscar(args.id);
      if (!a) return { ok: false, resultado: `No existe la acción ${args.id}.` };
      return { ok: true, resultado: a };
    }

    if (nombre === 'crear_accion') {
      if (!CATALOGOS.prioridades.includes(args.prioridad)) return { ok: false, resultado: 'Prioridad inválida: use Alta, Media o Baja.' };
      if (!/^\d{4}-\d{2}-\d{2}$/.test(args.fecha_compromiso || '')) return { ok: false, resultado: 'fecha_compromiso debe ser YYYY-MM-DD.' };
      const id = siguienteId(args.prioridad);
      const nueva = {
        id, codigo: 'EQ-' + id,
        titulo: args.titulo,
        descripcion: args.descripcion || args.titulo,
        prioridad: args.prioridad,
        area: args.area,
        subarea: args.subarea || '',
        responsable: args.responsable,
        colaboradores: [],
        origen: 'Registrada por Alfred (asistente del panel)',
        fecha_creacion: HOY,
        fecha_compromiso: args.fecha_compromiso,
        fecha_cierre: null,
        estado: 'Abierta',
        porcentaje_avance: 0,
        riesgo: args.riesgo || '',
        impacto: args.impacto || '',
        urgencia: args.urgencia || 'Media',
        evidencia_requerida: '',
        evidencia_cargada: false,
        bloqueo: '',
        dependencia: '',
        verificador: args.verificador || '',
        criterio_cierre: '',
        criterio_eficacia: '',
        comentarios: [],
        historial: [{ fecha: HOY, autor: 'Alfred (asistente)', evento: `Acción ${id} creada desde el chat de Alfred.` }],
        etiquetas: Array.isArray(args.etiquetas) ? args.etiquetas : [],
        programa: MAPA_AREA_PROGRAMA[args.area] || ''
      };
      ACCIONES.push(nueva);
      refrescarTodo();
      return { ok: true, resultado: { creada: alfredFilaDetalle(nueva), mensaje: `Acción ${id} creada y guardada en el tablero.` } };
    }

    if (nombre === 'editar_accion') {
      const a = alfredBuscar(args.id);
      if (!a) return { ok: false, resultado: `No existe la acción ${args.id}.` };
      const campos = args.campos || {};
      const aplicados = [];
      if (campos.estado && !CATALOGOS.estados.includes(campos.estado)) return { ok: false, resultado: `Estado inválido. Catálogo: ${CATALOGOS.estados.join(', ')}` };
      if (campos.estado === 'Cerrada' && !a.evidencia_cargada && !campos.evidencia_cargada) {
        return { ok: false, resultado: 'Regla del tablero: no se puede Cerrar sin evidencia cargada. Cargue la evidencia primero (evidencia_cargada: true junto con evidencia_requerida).' };
      }
      if (campos.prioridad && !CATALOGOS.prioridades.includes(campos.prioridad)) return { ok: false, resultado: 'Prioridad inválida.' };
      Object.keys(campos).forEach(k => {
        if (!ALFRED_CAMPOS_EDITABLES.includes(k)) return;
        a[k] = campos[k];
        aplicados.push(k);
      });
      if (!aplicados.length) return { ok: false, resultado: 'Ningún campo editable fue aplicado.' };
      if (campos.estado === 'Cerrada') { a.fecha_cierre = HOY; a.porcentaje_avance = 100; }
      if (campos.programa === undefined && campos.area) a.programa = MAPA_AREA_PROGRAMA[a.area] || a.programa || '';
      a.historial = a.historial || [];
      a.historial.push({ fecha: HOY, autor: 'Alfred (asistente)', evento: `Campos actualizados por Alfred: ${aplicados.join(', ')}.` });
      refrescarTodo();
      return { ok: true, resultado: { actualizada: alfredFilaDetalle(a), campos_aplicados: aplicados } };
    }

    if (nombre === 'agregar_seguimiento') {
      const a = alfredBuscar(args.id);
      if (!a) return { ok: false, resultado: `No existe la acción ${args.id}.` };
      // validar ANTES de mutar
      if (args.nuevo_estado) {
        if (!CATALOGOS.estados.includes(args.nuevo_estado)) return { ok: false, resultado: 'Estado inválido.' };
        if (args.nuevo_estado === 'Cerrada' && !a.evidencia_cargada) return { ok: false, resultado: 'No se puede Cerrar sin evidencia cargada (regla del tablero).' };
      }
      const autor = args.autor || 'Alfred (asistente)';
      a.comentarios = a.comentarios || [];
      a.historial = a.historial || [];
      a.comentarios.push({ fecha: HOY, autor, texto: args.texto });
      a.historial.push({ fecha: HOY, autor, evento: `Seguimiento: ${args.texto}` });
      if (args.porcentaje_avance !== undefined) a.porcentaje_avance = Math.max(0, Math.min(100, Number(args.porcentaje_avance) || 0));
      if (args.nuevo_estado) {
        const antes = a.estado;
        a.estado = args.nuevo_estado;
        a.historial.push({ fecha: HOY, autor, evento: `Cambio de estado: ${antes} → ${args.nuevo_estado}.` });
        if (args.nuevo_estado === 'Cerrada') { a.fecha_cierre = HOY; a.porcentaje_avance = 100; }
      }
      refrescarTodo();
      return { ok: true, resultado: { seguimiento_registrado: true, accion: alfredFilaDetalle(a) } };
    }

    return { ok: false, resultado: `Herramienta desconocida: ${nombre}` };
  } catch (err) {
    return { ok: false, resultado: 'Error interno ejecutando la herramienta: ' + (err && err.message) };
  }
}

/* ==================== Cliente OpenRouter ============================== */

async function alfredLlamarAPI(mensajes) {
  const resp = await fetch(ALFRED_CFG.endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + ALFRED_CFG.apiKey,
      'HTTP-Referer': location.origin,
      'X-Title': ALFRED_CFG.sitio
    },
    body: JSON.stringify({
      model: ALFRED_CFG.modelo,
      messages: mensajes,
      tools: ALFRED_TOOLS,
      tool_choice: 'auto',
      temperature: 0.3,
      max_tokens: 1200
    })
  });
  if (!resp.ok) {
    const txt = await resp.text().catch(() => '');
    throw new Error('OpenRouter respondió ' + resp.status + (txt ? ': ' + txt.slice(0, 180) : ''));
  }
  return resp.json();
}

/* Conversación con bucle de herramientas */
async function alfredPensar(historial) {
  const mensajes = [{ role: 'system', content: alfredSystemPrompt() }].concat(historial);
  for (let ronda = 0; ronda < ALFRED_CFG.maxRondasTools; ronda++) {
    const data = await alfredLlamarAPI(mensajes);
    const msg = data.choices && data.choices[0] && data.choices[0].message;
    if (!msg) throw new Error('Respuesta vacía del modelo.');
    mensajes.push(msg);
    if (!msg.tool_calls || !msg.tool_calls.length) {
      return { texto: msg.content || '(sin respuesta)', mensajesUsados: mensajes.slice(1) };
    }
    for (const tc of msg.tool_calls) {
      let args = {};
      try { args = JSON.parse(tc.function.arguments || '{}'); } catch (e) { args = {}; }
      const r = alfredEjecutarTool(tc.function.name, args);
      mensajes.push({
        role: 'tool',
        tool_call_id: tc.id,
        content: JSON.stringify(r.ok ? r.resultado : { error: r.resultado })
      });
    }
  }
  return { texto: 'No pude completar la operación en el número de pasos permitido. Inténtalo con una instrucción más concreta.', mensajesUsados: mensajes.slice(1) };
}

/* ==================== Interfaz del chat =============================== */

const alfredUI = { historial: [], ocupado: false, abierto: false };

const ALFRED_SALUDO = '¡Hola! Soy **Alfred**, el asistente del Panel de Control Equiser.\nPuedo:\n- Informarte el estado de cualquier prioridad, responsable o programa.\n- Decirte qué está vencido, bloqueado o por vencer.\n- Crear nuevas prioridades y editar o registrar seguimientos por ti.\n¿En qué te ayudo?';

const ALFRED_CHIPS = [
  '¿Qué acciones están vencidas?',
  'Resumen del tablero',
  'Acciones bloqueadas y escaladas',
  'Crear una nueva prioridad',
  '¿Cómo va el programa PRG-01?'
];

function alfredEl(html) {
  const t = document.createElement('template');
  t.innerHTML = html.trim();
  return t.content.firstElementChild;
}

function alfredFormato(txt) {
  return esc(txt)
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    .replace(/`([^`]+)`/g, '<code>$1</code>');
}

function alfredAgregarMsg(quien, texto) {
  const cuerpo = document.querySelector('.alf-body');
  if (!cuerpo) return;
  const meta = quien === 'alfredo' ? 'Alfred' : quien === 'usuario' ? 'Tú' : 'Sistema';
  const nodo = alfredEl(`<div class="alf-msg ${quien}"><span class="alf-meta">${meta}</span><div class="alf-txt">${alfredFormato(texto)}</div></div>`);
  cuerpo.appendChild(nodo);
  cuerpo.scrollTop = cuerpo.scrollHeight;
}

function alfredTyping(mostrar) {
  const cuerpo = document.querySelector('.alf-body');
  if (!cuerpo) return;
  let t = cuerpo.querySelector('.alf-typing-wrap');
  if (mostrar && !t) {
    t = alfredEl('<div class="alf-msg alfredo alf-typing-wrap"><div class="alf-typing"><i></i><i></i><i></i></div></div>');
    cuerpo.appendChild(t);
    cuerpo.scrollTop = cuerpo.scrollHeight;
  } else if (!mostrar && t) t.remove();
}

async function alfredEnviar(texto) {
  texto = (texto || '').trim();
  if (!texto || alfredUI.ocupado) return;
  if (!ALFRED_CFG.apiKey) {
    alfredAgregarMsg('sistema', 'Alfred no tiene configurada su clave de OpenRouter. Crea el archivo alfred.key.js junto a index.html con la línea: window.ALFRED_API_KEY = "tu-clave"; y recarga la página.');
    return;
  }
  alfredUI.ocupado = true;
  const btn = document.querySelector('.alf-send');
  if (btn) btn.disabled = true;
  alfredAgregarMsg('usuario', texto);
  alfredUI.historial.push({ role: 'user', content: texto });
  alfredTyping(true);
  try {
    const r = await alfredPensar(alfredUI.historial);
    alfredTyping(false);
    alfredAgregarMsg('alfredo', r.texto);
    alfredUI.historial.push({ role: 'assistant', content: r.texto });
    // conservar solo los últimos intercambios para no inflar el contexto
    if (alfredUI.historial.length > 24) alfredUI.historial = alfredUI.historial.slice(-24);
  } catch (err) {
    alfredTyping(false);
    alfredAgregarMsg('sistema', 'No pude contactar al servicio de Alfred. ' + (err && err.message ? '(' + err.message + ')' : 'Revisa la conexión e inténtalo de nuevo.'));
  } finally {
    alfredUI.ocupado = false;
    if (btn) btn.disabled = false;
    const inp = document.querySelector('.alf-inputbar textarea');
    if (inp) inp.focus();
  }
}

function alfredToggle(abrir) {
  const panel = document.querySelector('.alf-panel');
  if (!panel) return;
  alfredUI.abierto = abrir === undefined ? !alfredUI.abierto : abrir;
  panel.classList.toggle('open', alfredUI.abierto);
  panel.setAttribute('aria-hidden', String(!alfredUI.abierto));
  const burbuja = document.querySelector('.alf-bubble');
  if (burbuja) burbuja.setAttribute('aria-expanded', String(alfredUI.abierto));
  if (alfredUI.abierto) {
    const inp = document.querySelector('.alf-inputbar textarea');
    if (inp) setTimeout(() => inp.focus(), 120);
  }
}

function alfredConstruirUI() {
  if (document.querySelector('.alf-bubble')) return;

  const burbuja = alfredEl(`
    <button class="alf-bubble" type="button" aria-label="Abrir chat con Alfred" aria-expanded="false" title="Alfred · Asistente del panel">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <rect x="4" y="7" width="16" height="12" rx="3"></rect>
        <path d="M12 7V4M8 4h8"></path>
        <circle cx="9" cy="12.5" r="1.15" fill="currentColor" stroke="none"></circle>
        <circle cx="15" cy="12.5" r="1.15" fill="currentColor" stroke="none"></circle>
        <path d="M9.5 16h5"></path>
      </svg>
      <span class="alf-dot" aria-hidden="true"></span>
    </button>`);
  burbuja.addEventListener('click', () => alfredToggle());

  const panel = alfredEl(`
    <section class="alf-panel" aria-hidden="true" role="dialog" aria-label="Chat con Alfred, asistente del panel">
      <header class="alf-head">
        <div class="alf-avatar" aria-hidden="true">A</div>
        <div class="alf-head-txt">
          <strong>Alfred</strong>
          <span>Asistente del panel · seguimiento de prioridades</span>
        </div>
        <div class="alf-head-actions">
          <button class="alf-iconbtn" type="button" data-alf="limpiar" title="Limpiar conversación" aria-label="Limpiar conversación">↺</button>
          <button class="alf-iconbtn" type="button" data-alf="cerrar" title="Cerrar chat" aria-label="Cerrar chat">✕</button>
        </div>
      </header>
      <div class="alf-body" aria-live="polite"></div>
      <div class="alf-chips"></div>
      <form class="alf-inputbar">
        <textarea rows="1" placeholder="Pregúntale a Alfred sobre el tablero…" aria-label="Mensaje para Alfred"></textarea>
        <button class="alf-send" type="submit" aria-label="Enviar mensaje">
          <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M3.4 20.4 21.8 12 3.4 3.6l-.01 6.53L14 12 3.39 13.87z"/></svg>
        </button>
      </form>
    </section>`);

  document.body.appendChild(burbuja);
  document.body.appendChild(panel);

  panel.querySelector('[data-alf="cerrar"]').addEventListener('click', () => alfredToggle(false));
  panel.querySelector('[data-alf="limpiar"]').addEventListener('click', () => {
    alfredUI.historial = [];
    const cuerpo = panel.querySelector('.alf-body');
    cuerpo.innerHTML = '';
    alfredAgregarMsg('alfredo', ALFRED_SALUDO);
  });

  const chips = panel.querySelector('.alf-chips');
  ALFRED_CHIPS.forEach(c => {
    const b = alfredEl(`<button class="alf-chip" type="button"></button>`);
    b.textContent = c;
    b.addEventListener('click', () => alfredEnviar(c));
    chips.appendChild(b);
  });

  const form = panel.querySelector('.alf-inputbar');
  const area = form.querySelector('textarea');
  form.addEventListener('submit', ev => {
    ev.preventDefault();
    const v = area.value;
    area.value = '';
    area.style.height = 'auto';
    alfredEnviar(v);
  });
  area.addEventListener('keydown', ev => {
    if (ev.key === 'Enter' && !ev.shiftKey) {
      ev.preventDefault();
      form.requestSubmit();
    }
  });
  area.addEventListener('input', () => {
    area.style.height = 'auto';
    area.style.height = Math.min(area.scrollHeight, 90) + 'px';
  });

  document.addEventListener('keydown', ev => {
    if (ev.key === 'Escape' && alfredUI.abierto) alfredToggle(false);
  });

  alfredAgregarMsg('alfredo', ALFRED_SALUDO);
}

/* Hooks para pruebas automatizadas */
window.__alfred = {
  cfg: ALFRED_CFG,
  ejecutarTool: alfredEjecutarTool,
  systemPrompt: alfredSystemPrompt,
  enviar: alfredEnviar,
  toggle: alfredToggle,
  ui: alfredUI
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', alfredConstruirUI);
} else {
  alfredConstruirUI();
}
