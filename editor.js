/* ======================================================================
   editor.js — Gestión del tablero Equiser
   · Edición completa de acciones (todos los campos)
   · Creación de nuevas acciones / prioridades
   · Registro de seguimientos por acción (comentarios + historial)
   · Programas de nivel gerencial (visión PMO/SAP)
   · Persistencia en localStorage del navegador + respaldo/importación JSON
   Se carga después de app.js y reutiliza sus funciones globales.
   ====================================================================== */

const LS_DATOS = 'equiser.datos.v2';
const LS_PROGRAMAS = 'equiser.programas.v1';

/* -------------------- Programas: semilla y asignación ------------------ */
const PROGRAMAS_SEMILLA = [
  { id: 'PRG-01', nombre: 'Control Financiero y Caja', sponsor: 'Dirección Financiera', estado: 'Activo', fecha_inicio: '2026-10-13', fecha_fin: '2026-12-15', objetivo: 'Sanear caja, conciliaciones y control de pagos: flujo de 13 semanas, viáticos, facturación y devoluciones.' },
  { id: 'PRG-02', nombre: 'Cumplimiento Legal y Fiscal', sponsor: 'Dirección', estado: 'Activo', fecha_inicio: '2026-10-13', fecha_fin: '2026-11-30', objetivo: 'Regularización con DGI, CSS y Municipio; liberación de activos con validación bancaria; contratos y pólizas al día.' },
  { id: 'PRG-03', nombre: 'Operaciones, Taller y Mantenimiento', sponsor: 'Gerencia de Operaciones', estado: 'Activo', fecha_inicio: '2026-10-13', fecha_fin: '2026-12-31', objetivo: 'Confiabilidad de la flota y los equipos: inspecciones, órdenes de trabajo, repuestos, diagnósticos y control de horas.' },
  { id: 'PRG-04', nombre: 'Talento Humano, Seguridad y Ambiente', sponsor: 'RR. HH.', estado: 'Activo', fecha_inicio: '2026-10-13', fecha_fin: '2026-12-31', objetivo: 'Expedientes, contratos, capacitación, EPP, inspecciones HSE y cumplimiento ambiental.' },
  { id: 'PRG-05', nombre: 'Comercial y Proyectos', sponsor: 'Dirección Comercial', estado: 'Activo', fecha_inicio: '2026-10-13', fecha_fin: '2026-12-31', objetivo: 'Cartera, cotizaciones, contratos de proyectos en curso y relación con clientes clave.' },
  { id: 'PRG-06', nombre: 'Gobierno, Datos y Seguimiento', sponsor: 'Secretaría de seguimiento', estado: 'Activo', fecha_inicio: '2026-10-13', fecha_fin: '2026-11-30', objetivo: 'Tablero único, gestión documental, actas, trazabilidad de decisiones y disciplina de seguimiento semanal.' }
];

const MAPA_AREA_PROGRAMA = {
  'Administración': 'PRG-01',
  'Finanzas': 'PRG-01',
  'Compras': 'PRG-01',
  'Contabilidad': 'PRG-01',
  'Legal': 'PRG-02',
  'Operaciones': 'PRG-03',
  'Taller / Mantenimiento': 'PRG-03',
  'Logística': 'PRG-03',
  'Ingeniería': 'PRG-03',
  'RR. HH.': 'PRG-04',
  'Seguridad': 'PRG-04',
  'Ambiente': 'PRG-04',
  'Comercial': 'PRG-05',
  'Dirección': 'PRG-06',
  'Gestión documental / seguimiento': 'PRG-06'
};

/** Programa efectivo de una acción (asignado o derivado del área). */
function programaDe(a) { return a.programa || MAPA_AREA_PROGRAMA[a.area] || ''; }

/* --------------------------- Persistencia ------------------------------ */
let PROGRAMAS = [];

function cargarDatosGuardados() {
  try {
    const raw = localStorage.getItem(LS_DATOS);
    if (raw) {
      const datos = JSON.parse(raw);
      if (Array.isArray(datos) && datos.length && datos[0].id && datos[0].titulo) {
        ACCIONES.splice(0, ACCIONES.length, ...datos);
      }
    }
  } catch (e) { /* almacenamiento no disponible: se usa el dataset base */ }
  try {
    const rawP = localStorage.getItem(LS_PROGRAMAS);
    PROGRAMAS = rawP ? JSON.parse(rawP) : JSON.parse(JSON.stringify(PROGRAMAS_SEMILLA));
    if (!Array.isArray(PROGRAMAS) || !PROGRAMAS.length) PROGRAMAS = JSON.parse(JSON.stringify(PROGRAMAS_SEMILLA));
  } catch (e) { PROGRAMAS = JSON.parse(JSON.stringify(PROGRAMAS_SEMILLA)); }
}

function persistir() {
  try {
    localStorage.setItem(LS_DATOS, JSON.stringify(ACCIONES));
    localStorage.setItem(LS_PROGRAMAS, JSON.stringify(PROGRAMAS));
    return true;
  } catch (e) { return false; }
}

/** Re-renderiza todo tras una mutación. */
function refrescarTodo() {
  persistir();
  poblarSelects();
  actualizarContadoresNav();
  renderDashboard();
  renderTablero();
  renderSemanalYAlertas();
  renderProgramas();
  sincronizarControlesFiltro();
  const sel = state.seleccionada;
  if (sel && ACCIONES.some(a => a.id === sel)) abrirDetalle(sel);
  const np = $('#navProgramas');
  if (np) np.textContent = PROGRAMAS.filter(p => p.estado !== 'Completado').length;
}

/* --------------------------- Utilidades -------------------------------- */
function siguienteId(prioridad) {
  const prefijo = { Alta: 'H', Media: 'M', Baja: 'L' }[prioridad] || 'M';
  const max = ACCIONES.reduce((m, a) => {
    const mt = /^([HML])(\d+)$/.exec(a.id);
    return mt && mt[1] === prefijo ? Math.max(m, Number(mt[2])) : m;
  }, 0);
  return prefijo + String(max + 1).padStart(2, '0');
}

function programaPorId(id) { return PROGRAMAS.find(p => p.id === id); }

function abrirModal(el) { el.classList.add('open'); el.setAttribute('aria-hidden', 'false'); }
function cerrarModal(el) { el.classList.remove('open'); el.setAttribute('aria-hidden', 'true'); }

/* ====================== VISTA: PROGRAMAS (PMO/SAP) ====================== */
function renderProgramas() {
  const grid = $('#programasGrid');
  if (!grid) return;

  const statsDe = lista => {
    const total = lista.length;
    const cerradas = lista.filter(a => a.estado === 'Cerrada').length;
    const vencidas = lista.filter(esVencida).length;
    const crit = lista.filter(a => a.estado === 'Bloqueada' || a.estado === 'Escalada').length;
    const porVencer = lista.filter(venceEn7).length;
    const avance = total ? Math.round(lista.reduce((s, a) => s + (a.porcentaje_avance || 0), 0) / total) : 0;
    const sem = vencidas > 0 || crit > 0 ? { cls: 'rojo', txt: 'En riesgo' }
      : porVencer > 0 ? { cls: 'ambar', txt: 'Atención' }
      : { cls: 'verde', txt: 'En control' };
    return { total, cerradas, vencidas, crit, porVencer, avance, sem };
  };

  const tarjetaAccion = a => `
    <button type="button" class="prog-acc" data-open="${a.id}">
      <span class="prog-acc-id">${esc(a.id)}</span>
      <span class="prog-acc-tit">${esc(a.titulo)}</span>
      ${badgeEstado(a.estado)}
      ${semaforoHTML(a)}
    </button>`;

  const tarjetaPrograma = (p, lista, editable) => {
    const s = statsDe(lista);
    return `
    <article class="panel prog-card">
      <div class="prog-head">
        <div>
          <div style="display:flex;gap:6px;flex-wrap:wrap;align-items:center;">
            <span class="badge info no-dot">${esc(p.id)}</span>
            <span class="badge estado ${p.estado === 'Activo' ? 's-proceso' : p.estado === 'Completado' ? 's-cerrada' : 's-eficacia'}">${esc(p.estado)}</span>
            <span class="prog-sem ${s.sem.cls}">${s.sem.txt}</span>
          </div>
          <h4>${esc(p.nombre)}</h4>
          <p class="prog-sponsor">Sponsor: <strong>${esc(p.sponsor || '—')}</strong>${p.fecha_fin ? ` · horizonte ${fmtFecha(p.fecha_inicio || HOY)} → ${fmtFecha(p.fecha_fin)}` : ''}</p>
        </div>
        ${editable ? `<button type="button" class="btn" data-edit-prog="${p.id}">Editar</button>` : ''}
      </div>
      <p class="prog-obj">${esc(p.objetivo || 'Sin objetivo declarado.')}</p>
      <div class="prog-stats">
        <div><strong>${s.total}</strong><small>acciones</small></div>
        <div><strong>${s.cerradas}</strong><small>cerradas</small></div>
        <div><strong class="${s.vencidas ? 'txt-rojo' : ''}">${s.vencidas}</strong><small>vencidas</small></div>
        <div><strong class="${s.crit ? 'txt-rojo' : ''}">${s.crit}</strong><small>bloq./esc.</small></div>
        <div><strong>${s.porVencer}</strong><small>vencen ≤ 7 d</small></div>
      </div>
      <div class="prog-avance">
        <span>Avance consolidado</span>
        ${progresoHTML(s.avance)}
      </div>
      <div class="prog-acc-list">
        ${lista.length ? lista.map(tarjetaAccion).join('') : '<p class="prog-vacio">Sin acciones asignadas.</p>'}
      </div>
    </article>`;
  };

  const porPrograma = new Map();
  ACCIONES.forEach(a => {
    const pid = programaDe(a);
    if (!porPrograma.has(pid)) porPrograma.set(pid, []);
    porPrograma.get(pid).push(a);
  });

  const html = PROGRAMAS.map(p => tarjetaPrograma(p, porPrograma.get(p.id) || [], true)).join('');
  const sinAsignar = porPrograma.get('') || [];
  const extra = sinAsignar.length
    ? tarjetaPrograma({ id: '—', nombre: 'Sin programa asignado', sponsor: '—', estado: 'Activo', objetivo: 'Acciones sin programa. Asígnalas desde el editor de cada acción.' }, sinAsignar, false)
    : '';
  grid.innerHTML = html + extra;
}

/* ==================== EDITOR DE ACCIONES (crear / editar) ================= */
function opcionesPrograma(sel) {
  sel.innerHTML = '<option value="">(automático según el área)</option>' +
    PROGRAMAS.map(p => `<option value="${esc(p.id)}">${esc(p.id)} · ${esc(p.nombre)}</option>`).join('');
}

function isoMasDias(iso, dias) {
  const d = new Date(iso + 'T12:00:00');
  d.setDate(d.getDate() + dias);
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const dd = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${dd}`;
}

function abrirEditor(id) {
  const modal = $('#modalEditor');
  const form = $('#editorForm');
  form.reset();
  $('#editorError').textContent = '';

  const a = id ? ACCIONES.find(x => x.id === id) : null;
  if (id && !a) return;

  $('#editorTitulo').textContent = a ? `Editar acción ${a.id}` : 'Nueva acción / prioridad';
  $('#editorEliminar').hidden = !a;
  form.dataset.editando = a ? a.id : '';
  opcionesPrograma($('#edPrograma'));

  $('#edTitulo').value = a ? a.titulo : '';
  $('#edDescripcion').value = a ? (a.descripcion || '') : '';
  $('#edPrioridad').value = a ? a.prioridad : 'Media';
  $('#edEstado').value = a ? a.estado : 'Abierta';
  $('#edArea').value = a ? a.area : '';
  $('#edSubarea').value = a ? (a.subarea || '') : '';
  $('#edResponsable').value = a ? a.responsable : '';
  $('#edColaboradores').value = a ? (a.colaboradores || []).join(', ') : '';
  $('#edVerificador').value = a ? (a.verificador || '') : '';
  $('#edOrigen').value = a ? (a.origen || '') : 'Panel de control Equiser';
  $('#edPrograma').value = a ? (a.programa || '') : '';
  $('#edAvance').value = a ? (a.porcentaje_avance || 0) : 0;
  $('#edFechaCreacion').value = a ? a.fecha_creacion : HOY;
  $('#edFechaCompromiso').value = a ? a.fecha_compromiso : isoMasDias(HOY, 7);
  $('#edFechaCierre').value = a && a.fecha_cierre ? a.fecha_cierre : '';
  $('#edImpacto').value = a ? (a.impacto || '') : '';
  $('#edUrgencia').value = a ? (a.urgencia || 'Programable') : 'Programable';
  $('#edRiesgo').value = a ? (a.riesgo || '') : '';
  $('#edEvidenciaReq').value = a ? (a.evidencia_requerida || '') : '';
  $('#edEvidenciaOk').checked = a ? !!a.evidencia_cargada : false;
  $('#edBloqueo').value = a ? (a.bloqueo || '') : '';
  $('#edDependencia').value = a ? (a.dependencia || '') : '';
  $('#edCriterioCierre').value = a ? (a.criterio_cierre || '') : '';
  $('#edCriterioEficacia').value = a ? (a.criterio_eficacia || '') : '';
  $('#edEtiquetas').value = a ? (a.etiquetas || []).join(', ') : '';

  abrirModal(modal);
  $('#edTitulo').focus();
}

function guardarEditor(e) {
  e.preventDefault();
  const form = $('#editorForm');
  const err = $('#editorError');
  err.textContent = '';

  const val = sel => $(sel).value.trim();
  const titulo = val('#edTitulo');
  const area = val('#edArea');
  const responsable = val('#edResponsable');
  const fechaCreacion = val('#edFechaCreacion');
  const fechaCompromiso = val('#edFechaCompromiso');
  const estado = val('#edEstado');
  const evidenciaOk = $('#edEvidenciaOk').checked;
  const verificador = val('#edVerificador');
  let fechaCierre = val('#edFechaCierre') || null;

  if (!titulo || !area || !responsable || !fechaCreacion || !fechaCompromiso) {
    err.textContent = 'Completa los campos obligatorios (*): título, área, responsable y ambas fechas.';
    return;
  }

  /* Regla de negocio del tablero: sin evidencia y verificador no se cierra */
  if (estado === 'Cerrada') {
    if (!evidenciaOk || !verificador) {
      err.textContent = 'Regla de cierre: para marcar «Cerrada» se requiere la evidencia cargada y un verificador asignado.';
      return;
    }
    if (!fechaCierre) fechaCierre = HOY;
  }

  let avance = Number($('#edAvance').value || 0);
  if (isNaN(avance)) avance = 0;
  avance = Math.max(0, Math.min(100, Math.round(avance)));
  if (estado === 'Cerrada') avance = 100;

  const splitLista = s => s.split(',').map(x => x.trim()).filter(Boolean);

  const idEditando = form.dataset.editando;
  const esNueva = !idEditando;
  const a = esNueva ? null : ACCIONES.find(x => x.id === idEditando);
  if (!esNueva && !a) { err.textContent = 'No se encontró la acción que se intentaba editar.'; return; }

  const datos = {
    titulo,
    descripcion: val('#edDescripcion'),
    prioridad: val('#edPrioridad'),
    estado,
    area,
    subarea: val('#edSubarea'),
    responsable,
    colaboradores: splitLista($('#edColaboradores').value),
    verificador,
    origen: val('#edOrigen') || 'Panel de control Equiser',
    programa: val('#edPrograma'),
    porcentaje_avance: avance,
    fecha_creacion: fechaCreacion,
    fecha_compromiso: fechaCompromiso,
    fecha_cierre: fechaCierre,
    impacto: val('#edImpacto'),
    urgencia: val('#edUrgencia'),
    riesgo: val('#edRiesgo'),
    evidencia_requerida: val('#edEvidenciaReq'),
    evidencia_cargada: evidenciaOk,
    bloqueo: val('#edBloqueo'),
    dependencia: val('#edDependencia'),
    criterio_cierre: val('#edCriterioCierre'),
    criterio_eficacia: val('#edCriterioEficacia'),
    etiquetas: splitLista($('#edEtiquetas').value)
  };

  if (esNueva) {
    const id = siguienteId(datos.prioridad);
    const nueva = Object.assign({
      id, codigo: `EQ-${id}`,
      comentarios: [], historial: []
    }, datos);
    nueva.historial.push({ fecha: HOY, autor: 'Panel de control', evento: `Acción ${id} creada desde el panel de control.` });
    ACCIONES.push(nueva);
    cerrarModal($('#modalEditor'));
    refrescarTodo();
    abrirDetalle(id);
  } else {
    const cambios = [];
    if (a.estado !== datos.estado) cambios.push(`estado → «${datos.estado}»`);
    if ((a.porcentaje_avance || 0) !== datos.porcentaje_avance) cambios.push(`avance → ${datos.porcentaje_avance}%`);
    if (a.responsable !== datos.responsable) cambios.push(`responsable → ${datos.responsable}`);
    if (a.fecha_compromiso !== datos.fecha_compromiso) cambios.push(`compromiso → ${fmtFecha(datos.fecha_compromiso)}`);
    Object.assign(a, datos);
    a.historial = a.historial || [];
    a.historial.push({
      fecha: HOY, autor: 'Panel de control',
      evento: `Acción actualizada desde el panel${cambios.length ? ': ' + cambios.join(' · ') : '.'}`
    });
    cerrarModal($('#modalEditor'));
    refrescarTodo();
  }
}

function eliminarAccion() {
  const id = $('#editorForm').dataset.editando;
  const a = id ? ACCIONES.find(x => x.id === id) : null;
  if (!a) return;
  if (!confirm(`¿Eliminar la acción ${a.id} — «${a.titulo}»?\n\nLa eliminación es definitiva. Puedes recuperar los datos originales con «Restablecer datos» o desde un respaldo JSON.`)) return;
  const i = ACCIONES.findIndex(x => x.id === id);
  if (i >= 0) ACCIONES.splice(i, 1);
  if (state.seleccionada === id) cerrarDetalle();
  cerrarModal($('#modalEditor'));
  refrescarTodo();
}

/* ==================== SEGUIMIENTOS (comentarios + trazabilidad) ========== */
function abrirSeg() {
  const a = ACCIONES.find(x => x.id === state.seleccionada);
  if (!a) return;
  const form = $('#segForm');
  form.reset();
  $('#segError').textContent = '';
  $('#segTitulo').textContent = `Seguimiento — ${a.id} ${a.titulo}`;
  $('#segFecha').value = HOY;
  $('#segAutor').value = a.responsable && a.responsable !== 'Por asignar' ? a.responsable : '';
  $('#segHistorial').checked = true;
  abrirModal($('#modalSeg'));
  $('#segTexto').focus();
}

function guardarSeg(e) {
  e.preventDefault();
  const a = ACCIONES.find(x => x.id === state.seleccionada);
  if (!a) return;
  const err = $('#segError');
  err.textContent = '';

  const fecha = $('#segFecha').value || HOY;
  const autor = $('#segAutor').value.trim();
  const texto = $('#segTexto').value.trim();
  if (!autor || !texto) {
    err.textContent = 'El autor y el texto del seguimiento son obligatorios.';
    return;
  }

  a.comentarios = a.comentarios || [];
  a.comentarios.push({ fecha, autor, texto });
  if ($('#segHistorial').checked) {
    a.historial = a.historial || [];
    const resumen = texto.length > 150 ? texto.slice(0, 149) + '…' : texto;
    a.historial.push({ fecha, autor, evento: `Seguimiento: ${resumen}` });
  }
  cerrarModal($('#modalSeg'));
  refrescarTodo();
}

/* ==================== PROGRAMAS DE NIVEL GERENCIAL (PMO) ================= */
function abrirProg(id) {
  const form = $('#progForm');
  form.reset();
  $('#progError').textContent = '';
  const p = id ? programaPorId(id) : null;
  if (id && !p) return;

  $('#progTitulo').textContent = p ? `Editar ${p.id}` : 'Nuevo programa';
  $('#progEliminar').hidden = !p;
  form.dataset.editando = p ? p.id : '';
  $('#prNombre').value = p ? p.nombre : '';
  $('#prSponsor').value = p ? (p.sponsor || '') : '';
  $('#prEstado').value = p ? p.estado : 'Activo';
  $('#prInicio').value = p ? (p.fecha_inicio || '') : HOY;
  $('#prFin').value = p ? (p.fecha_fin || '') : '';
  $('#prObjetivo').value = p ? (p.objetivo || '') : '';
  abrirModal($('#modalProg'));
  $('#prNombre').focus();
}

function guardarProg(e) {
  e.preventDefault();
  const err = $('#progError');
  err.textContent = '';
  const nombre = $('#prNombre').value.trim();
  if (!nombre) { err.textContent = 'El nombre del programa es obligatorio.'; return; }

  const form = $('#progForm');
  const idEditando = form.dataset.editando;
  const datos = {
    nombre,
    sponsor: $('#prSponsor').value.trim(),
    estado: $('#prEstado').value,
    fecha_inicio: $('#prInicio').value || '',
    fecha_fin: $('#prFin').value || '',
    objetivo: $('#prObjetivo').value.trim()
  };

  if (idEditando) {
    const p = programaPorId(idEditando);
    if (!p) { err.textContent = 'No se encontró el programa que se intentaba editar.'; return; }
    Object.assign(p, datos);
  } else {
    const max = PROGRAMAS.reduce((m, p) => {
      const mt = /^PRG-(\d+)$/.exec(p.id);
      return mt ? Math.max(m, Number(mt[1])) : m;
    }, 0);
    PROGRAMAS.push(Object.assign({ id: 'PRG-' + String(max + 1).padStart(2, '0') }, datos));
  }
  cerrarModal($('#modalProg'));
  refrescarTodo();
}

function eliminarProg() {
  const id = $('#progForm').dataset.editando;
  const p = id ? programaPorId(id) : null;
  if (!p) return;
  const usadas = ACCIONES.filter(a => programaDe(a) === id).length;
  if (usadas > 0) {
    $('#progError').textContent = `No se puede eliminar: ${usadas} acción(es) siguen asociadas a este programa. Reasígnalas antes desde el editor de cada acción.`;
    return;
  }
  if (!confirm(`¿Eliminar el programa ${p.id} — «${p.nombre}»?`)) return;
  PROGRAMAS = PROGRAMAS.filter(x => x.id !== id);
  cerrarModal($('#modalProg'));
  refrescarTodo();
}

/* ==================== RESPALDO / IMPORTACIÓN / RESTABLECER =============== */
function exportarJSON() {
  const payload = {
    aplicacion: 'Equiser · Seguimiento integral',
    fechaCorte: HOY,
    exportado: new Date().toISOString(),
    acciones: ACCIONES,
    programas: PROGRAMAS
  };
  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `equiser-respaldo-${HOY}.json`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 4000);
}

function importarJSON(archivo) {
  if (!archivo) return;
  const lector = new FileReader();
  lector.onload = () => {
    try {
      const datos = JSON.parse(lector.result);
      const acciones = Array.isArray(datos) ? datos : datos.acciones;
      const programas = Array.isArray(datos) ? null : datos.programas;
      if (!Array.isArray(acciones) || !acciones.length || !acciones[0].id || !acciones[0].titulo) {
        alert('El archivo no tiene el formato esperado: se requiere una lista de acciones con «id» y «titulo».');
        return;
      }
      ACCIONES.splice(0, ACCIONES.length, ...acciones);
      if (Array.isArray(programas) && programas.length) PROGRAMAS = programas;
      refrescarTodo();
      cambiarVista('tablero');
      alert(`Respaldo importado correctamente: ${acciones.length} acciones y ${PROGRAMAS.length} programas.`);
    } catch (e2) {
      alert('No se pudo leer el archivo JSON: ' + e2.message);
    }
  };
  lector.readAsText(archivo);
}

function restablecerDatos() {
  if (!confirm('¿Restablecer el tablero a los datos originales del informe EQ-SIG-INF-001?\n\nSe perderán las ediciones, seguimientos y programas guardados en este navegador. Descarga antes un respaldo JSON si lo necesitas.')) return;
  try {
    localStorage.removeItem(LS_DATOS);
    localStorage.removeItem(LS_PROGRAMAS);
  } catch (e) { /* sin persistencia */ }
  location.reload();
}

/* ============ Integración con la navegación y el drawer de app.js ========= */
const _cambiarVistaBase = cambiarVista;
cambiarVista = function (vista) {
  _cambiarVistaBase(vista);
  if (vista === 'programas') {
    renderProgramas();
    $('#headerVista').textContent = 'Programas de nivel gerencial (PMO)';
  }
};

const _abrirDetalleBase = abrirDetalle;
abrirDetalle = function (id) {
  _abrirDetalleBase(id);
  const a = ACCIONES.find(x => x.id === id);
  if (!a) return;
  const p = programaPorId(programaDe(a));
  if (p) $('#drawerBadges').innerHTML += ` <span class="badge info no-dot" title="Programa de nivel gerencial">${esc(p.id)} · ${esc(p.nombre)}</span>`;
};

/* --------------------------------- Init ---------------------------------- */
function initEditor() {
  cargarDatosGuardados();

  /* Catálogos del formulario de edición */
  $('#edEstado').innerHTML = CATALOGOS.estados.map(e => `<option>${esc(e)}</option>`).join('');
  const areas = [...new Set(ACCIONES.map(a => a.area).filter(Boolean))].sort();
  const personas = [...new Set(ACCIONES.flatMap(a =>
    [a.responsable, a.verificador, ...(a.colaboradores || [])].filter(x => x && x !== 'Por asignar')
  ))].sort();
  $('#dlAreas').innerHTML = areas.map(x => `<option value="${esc(x)}">`).join('');
  $('#dlResponsables').innerHTML = personas.map(x => `<option value="${esc(x)}">`).join('');

  /* Botones principales */
  $('#btnNueva').addEventListener('click', () => abrirEditor(null));
  $('#btnNueva2').addEventListener('click', () => abrirEditor(null));
  $('#btnEditar').addEventListener('click', () => { if (state.seleccionada) abrirEditor(state.seleccionada); });
  $('#btnSeguimiento').addEventListener('click', abrirSeg);
  $('#btnNuevoPrograma').addEventListener('click', () => abrirProg(null));

  /* Respaldo / importación / restablecer */
  $('#btnExportarJson').addEventListener('click', exportarJSON);
  $('#btnImportarJson').addEventListener('click', () => $('#importFile').click());
  $('#importFile').addEventListener('change', e => { importarJSON(e.target.files[0]); e.target.value = ''; });
  $('#btnRestablecer').addEventListener('click', restablecerDatos);

  /* Envío de formularios y eliminaciones */
  $('#editorForm').addEventListener('submit', guardarEditor);
  $('#segForm').addEventListener('submit', guardarSeg);
  $('#progForm').addEventListener('submit', guardarProg);
  $('#editorEliminar').addEventListener('click', eliminarAccion);
  $('#progEliminar').addEventListener('click', eliminarProg);

  /* Cierre de modales: ✕, cancelar, clic en el fondo y tecla Escape */
  [['#modalEditor', '#editorCerrar', '#editorCancelar'],
   ['#modalSeg', '#segCerrar', '#segCancelar'],
   ['#modalProg', '#progCerrar', '#progCancelar']].forEach(([m, x, c]) => {
    const modal = $(m);
    $(x).addEventListener('click', () => cerrarModal(modal));
    $(c).addEventListener('click', () => cerrarModal(modal));
    modal.addEventListener('click', e => { if (e.target === modal) cerrarModal(modal); });
  });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') $$('.modal.open').forEach(cerrarModal);
  });

  /* Edición de programas desde las tarjetas (delegación de eventos) */
  document.addEventListener('click', e => {
    const t = e.target.closest('[data-edit-prog]');
    if (t) abrirProg(t.dataset.editProg);
  });

  /* Primer render con los datos guardados (si los hay) */
  refrescarTodo();
}

document.addEventListener('DOMContentLoaded', initEditor);
