/* ============================================================================
 * EQUISER PANAMÁ · Panel de Control Equiser — Seguimiento Integral
 * app.js — Lógica de la aplicación (sin backend, sin dependencias)
 * ----------------------------------------------------------------------------
 * Módulos:
 *   1. Dashboard ejecutivo (KPIs + gráficos SVG propios)
 *   2. Tablero maestro (tabla ordenable + exportación CSV)
 *   3. Vista detallada (drawer con ficha completa, checklist de cierre,
 *      historial y trazabilidad)
 *   4. Filtros avanzados combinables y persistentes (localStorage)
 *   5. Seguimiento semanal (orden de reunión: altas → vencidas → por vencer
 *      → medias → bajas)
 *   6. Matriz de alcance de prioridades (contenido educativo estático)
 *   7. Alertas y semáforos (prioridad ≠ estado ≠ urgencia temporal)
 *   8. Vista para Dirección (top críticas, decisiones, bloqueos, riesgos)
 *
 * Reglas de negocio implementadas:
 *   - Fecha de corte fija del tablero: 2025-10-20 (CATALOGOS.fechaCorte).
 *   - "Implementada" ≠ "Cerrada": el cierre exige responsable, fecha,
 *     evidencia, verificación independiente y comentario de cierre.
 *   - "Pendiente de validación" nunca se presenta como incumplimiento.
 *   - El ejecutor no autoaprueba el cierre en acciones críticas (Alta).
 * ==========================================================================*/
'use strict';

/* ------------------------------- Constantes ------------------------------ */
const HOY = CATALOGOS.fechaCorte;               // '2025-10-20' — fecha de corte
const ESTADOS_VIVOS = ['Pendiente de validación', 'Abierta', 'En proceso', 'Reabierta', 'Bloqueada', 'Escalada'];
const ESTADOS_EJECUTADAS_SIN_CIERRE = ['Implementada', 'Pendiente de eficacia'];
const PESO_PRIORIDAD = { Alta: 0, Media: 1, Baja: 2 };
const DIAS_SEMANA = ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'];
const MESES = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'];
const LS_FILTROS = 'equiser.filtros.v1';
const LS_TEMA = 'equiser.tema.v1';

/* -------------------------------- Utilidades ----------------------------- */
const $ = (sel, ctx) => (ctx || document).querySelector(sel);
const $$ = (sel, ctx) => Array.from((ctx || document).querySelectorAll(sel));

/** Escapa texto para insertarlo en HTML (los datos son internos, pero se
 *  mantiene la higiene para cuando el tablero evolucione a datos editables). */
function esc(v) {
  return String(v ?? '').replace(/[&<>"']/g, c => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  }[c]));
}

/** Parsea 'YYYY-MM-DD' como fecha local (evita desfases de zona horaria). */
function parseFecha(iso) {
  const [y, m, d] = iso.split('-').map(Number);
  return new Date(y, m - 1, d);
}

/** Días hasta la fecha compromiso desde HOY (negativo = vencida). */
function diasPara(accion) {
  const MS_DIA = 86400000;
  return Math.round((parseFecha(accion.fecha_compromiso) - parseFecha(HOY)) / MS_DIA);
}

function fmtFecha(iso) {
  if (!iso) return '—';
  const f = parseFecha(iso);
  return `${f.getDate()} ${MESES[f.getMonth()]} ${f.getFullYear()}`;
}

/** ¿La acción sigue abierta desde el punto de vista operativo? */
function esViva(a) { return ESTADOS_VIVOS.includes(a.estado); }

/** Vencida: acción viva con fecha compromiso anterior a hoy. */
function esVencida(a) { return esViva(a) && diasPara(a) < 0; }
function venceHoy(a) { return esViva(a) && diasPara(a) === 0; }
function venceEn3(a) { return esViva(a) && diasPara(a) > 0 && diasPara(a) <= 3; }
function venceEn7(a) { return esViva(a) && diasPara(a) >= 0 && diasPara(a) <= 7; }
function sinResponsable(a) { return !a.responsable || a.responsable === 'Por asignar'; }
function sinEvidencia(a) { return !a.evidencia_cargada; }

/** Semáforo de URGENCIA TEMPORAL (independiente de la prioridad). */
function semaforo(a) {
  if (a.estado === 'Cerrada') return { cls: '', txt: 'Cerrada ' + fmtFecha(a.fecha_cierre) };
  const d = diasPara(a);
  if (d < 0) return { cls: 'u-vencida', txt: `Vencida hace ${Math.abs(d)} d` };
  if (d === 0) return { cls: 'u-hoy', txt: 'Vence hoy' };
  if (d <= 3) return { cls: 'u-3dias', txt: `Vence en ${d} d` };
  return { cls: '', txt: `Vence en ${d} d` };
}

/** Clase CSS del badge de estado (tonos neutros/azules; nunca urgencia). */
function claseEstado(estado) {
  return {
    'Pendiente de validación': 's-validacion',
    'Abierta': '',
    'En proceso': 's-proceso',
    'Implementada': 's-implementada',
    'Pendiente de eficacia': 's-eficacia',
    'Cerrada': 's-cerrada',
    'Reabierta': 's-reabierta',
    'Bloqueada': 's-bloqueada',
    'Escalada': 's-escalada'
  }[estado] || '';
}

/** Alertas activas de una acción (módulo 7). */
function alertasDe(a) {
  const out = [];
  if (esVencida(a)) out.push({ tipo: 'vencida', txt: 'Vencida', nivel: 'crit' });
  if (venceHoy(a)) out.push({ tipo: 'hoy', txt: 'Vence hoy', nivel: 'warn' });
  if (venceEn3(a)) out.push({ tipo: '3dias', txt: 'Vence en ≤3 días', nivel: 'warn' });
  if (sinResponsable(a)) out.push({ tipo: 'sin-responsable', txt: 'Sin responsable', nivel: 'crit' });
  if (a.estado === 'Bloqueada') out.push({ tipo: 'bloqueada', txt: 'Bloqueada', nivel: 'crit' });
  if (a.estado === 'Escalada') out.push({ tipo: 'escalada', txt: 'Escalada a Dirección', nivel: 'crit' });
  if (sinEvidencia(a) && (ESTADOS_EJECUTADAS_SIN_CIERRE.includes(a.estado) || a.porcentaje_avance >= 50))
    out.push({ tipo: 'sin-evidencia', txt: 'Sin evidencia', nivel: 'warn' });
  if (a.estado === 'Pendiente de validación') out.push({ tipo: 'validacion', txt: 'Pendiente de validación', nivel: 'info' });
  if (a.estado === 'Pendiente de eficacia') out.push({ tipo: 'eficacia', txt: 'Pendiente de eficacia', nivel: 'info' });
  if (a.estado === 'Reabierta') out.push({ tipo: 'reabierta', txt: 'Reabierta por ineficacia', nivel: 'crit' });
  return out;
}

/** Checklist de cierre — regla de negocio (módulo 9 / spec "Evidencia y cierre").
 *  Devuelve los requisitos y si cada uno se cumple. */
function checklistCierre(a) {
  const comentarioCierre = a.comentarios.some(c => /cierre|verific/i.test(c.texto));
  const items = [
    { ok: !sinResponsable(a), label: 'Responsable único asignado', detalle: a.responsable },
    { ok: !!a.fecha_compromiso, label: 'Fecha compromiso definida', detalle: fmtFecha(a.fecha_compromiso) },
    { ok: !!a.evidencia_cargada, label: 'Evidencia mínima cargada', detalle: a.evidencia_requerida },
    { ok: !!a.verificador, label: 'Verificador designado', detalle: a.verificador },
    { ok: a.prioridad !== 'Alta' ? !!a.verificador : (!!a.verificador && a.verificador.split('(')[0].trim() !== a.responsable.split('(')[0].trim()),
      label: 'Verificación independiente del ejecutor (acciones críticas)', detalle: a.verificador || '—' },
    { ok: comentarioCierre, label: 'Comentario de cierre / verificación registrado', detalle: comentarioCierre ? 'Registrado en historial' : 'Sin registro' }
  ];
  const cerrable = items.every(i => i.ok);
  return { items, cerrable };
}

/** ¿Debe escalarse? Reglas de escalamiento de la spec. */
function debeEscalarse(a) {
  if (a.estado === 'Escalada' || a.estado === 'Cerrada') return false;
  if (a.prioridad === 'Alta' && esVencida(a)) return true;
  if (a.estado === 'Bloqueada' && a.prioridad === 'Alta') return true;
  if (sinResponsable(a)) return true;
  if (a.prioridad === 'Alta' && sinEvidencia(a) && a.porcentaje_avance >= 50) return true;
  if (a.estado === 'Reabierta') return true;
  return false;
}

/* ------------------------------ Estado global ---------------------------- */
const state = {
  vista: 'dashboard',
  query: '',
  filtros: { prioridad: '', estado: '', area: '', responsable: '', flags: [] },
  orden: { clave: 'prioridad', dir: 1 },
  seleccionada: null
};

/** Carga filtros persistentes (spec: "filtros persistentes"). */
function cargarFiltros() {
  try {
    const raw = localStorage.getItem(LS_FILTROS);
    if (raw) {
      const f = JSON.parse(raw);
      state.filtros = Object.assign(state.filtros, f);
      state.query = f.query || '';
    }
  } catch (e) { /* almacenamiento no disponible (file:// en algunos navegadores) */ }
}
function guardarFiltros() {
  try {
    localStorage.setItem(LS_FILTROS, JSON.stringify(Object.assign({}, state.filtros, { query: state.query })));
  } catch (e) { /* sin persistencia: la app sigue funcionando */ }
}

/* ----------------------------- Motor de filtros -------------------------- */
function aplicarFiltros(lista) {
  const f = state.filtros;
  const q = state.query.trim().toLowerCase();
  return lista.filter(a => {
    if (f.prioridad && a.prioridad !== f.prioridad) return false;
    if (f.estado && a.estado !== f.estado) return false;
    if (f.area && a.area !== f.area) return false;
    if (f.responsable && a.responsable !== f.responsable) return false;
    for (const flag of f.flags) {
      switch (flag) {
        case 'vencidas': if (!esVencida(a)) return false; break;
        case 'por-vencer': if (!venceEn7(a)) return false; break;
        case 'sin-evidencia': if (!sinEvidencia(a)) return false; break;
        case 'bloqueadas': if (a.estado !== 'Bloqueada') return false; break;
        case 'escaladas': if (a.estado !== 'Escalada') return false; break;
        case 'validacion': if (a.estado !== 'Pendiente de validación') return false; break;
        case 'eficacia': if (a.estado !== 'Pendiente de eficacia') return false; break;
        case 'reabiertas': if (a.estado !== 'Reabierta') return false; break;
        case 'cerradas': if (a.estado !== 'Cerrada') return false; break;
      }
    }
    if (q) {
      const texto = [a.id, a.codigo, a.titulo, a.descripcion, a.prioridad, a.area, a.subarea,
        a.responsable, (a.colaboradores || []).join(' '), a.origen, a.riesgo, a.etiquetas.join(' '),
        a.evidencia_requerida, a.verificador].join(' ').toLowerCase();
      if (!texto.includes(q)) return false;
    }
    return true;
  });
}

function ordenar(lista) {
  const { clave, dir } = state.orden;
  const val = a => {
    switch (clave) {
      case 'prioridad': return PESO_PRIORIDAD[a.prioridad];
      case 'fecha_compromiso': return a.fecha_compromiso;
      case 'fecha_creacion': return a.fecha_creacion;
      case 'avance': return a.porcentaje_avance;
      case 'dias': return diasPara(a);
      default: return String(a[clave] ?? '').toLowerCase();
    }
  };
  return [...lista].sort((x, y) => {
    const vx = val(x), vy = val(y);
    if (vx < vy) return -1 * dir;
    if (vx > vy) return 1 * dir;
    return x.id < y.id ? -1 : 1;
  });
}

/* --------------------------- Fragmentos HTML base ------------------------ */
function badgePrioridad(p) { return `<span class="badge ${p.toLowerCase()}">${esc(p)}</span>`; }
function badgeEstado(e) { return `<span class="badge estado ${claseEstado(e)}">${esc(e)}</span>`; }
function badgeArea(a) { return `<span class="badge area no-dot">${esc(a)}</span>`; }
function semaforoHTML(a) {
  const s = semaforo(a);
  return `<span class="semaforo ${s.cls}"><i aria-hidden="true"></i>${esc(s.txt)}</span>`;
}
function progresoHTML(p) {
  return `<div class="progress-wrap"><div class="progress" role="progressbar" aria-valuenow="${p}" aria-valuemin="0" aria-valuemax="100"><span style="width:${p}%"></span></div><span>${p}%</span></div>`;
}
function miniAlertasHTML(a) {
  const als = alertasDe(a);
  if (!als.length) return '';
  return `<div class="alert-strip">${als.map(al =>
    `<span class="mini-alert ${al.nivel === 'warn' ? 'warn' : al.nivel === 'info' ? 'neutral' : ''}">${esc(al.txt)}</span>`).join('')}</div>`;
}

/* ===================== 1. DASHBOARD EJECUTIVO ============================ */
function renderDashboard() {
  const todas = ACCIONES;
  const n = predicado => todas.filter(predicado).length;

  // KPIs exigidos por la spec
  const kpis = [
    { id: 'total', label: 'Acciones totales', valor: todas.length, meta: 'Base consolidada', cls: '', filtro: null },
    { id: 'alta', label: 'Prioridad alta', valor: n(a => a.prioridad === 'Alta'), meta: 'Impacto/riesgo crítico', cls: 'k-alta', filtro: { prioridad: 'Alta' } },
    { id: 'media', label: 'Prioridad media', valor: n(a => a.prioridad === 'Media'), meta: 'Debilidad de gestión', cls: 'k-accent', filtro: { prioridad: 'Media' } },
    { id: 'baja', label: 'Prioridad baja', valor: n(a => a.prioridad === 'Baja'), meta: 'Mejora programable', cls: 'k-ok', filtro: { prioridad: 'Baja' } },
    { id: 'vencidas', label: 'Vencidas', valor: n(esVencida), meta: 'Acción viva fuera de plazo', cls: 'k-alta', filtro: { flags: ['vencidas'] } },
    { id: 'por-vencer', label: 'Por vencer ≤ 7 días', valor: n(venceEn7), meta: 'Incluye las que vencen hoy', cls: 'k-hoy', filtro: { flags: ['por-vencer'] } },
    { id: 'proceso', label: 'En proceso', valor: n(a => a.estado === 'En proceso'), meta: 'Ejecución en curso', cls: '', filtro: { estado: 'En proceso' } },
    { id: 'validacion', label: 'Pend. de validación', valor: n(a => a.estado === 'Pendiente de validación'), meta: 'No son incumplimiento confirmado', cls: 'k-accent', filtro: { estado: 'Pendiente de validación' } },
    { id: 'eficacia', label: 'Pend. de eficacia', valor: n(a => a.estado === 'Pendiente de eficacia'), meta: 'Ejecutadas, sin comprobar', cls: '', filtro: { estado: 'Pendiente de eficacia' } },
    { id: 'cerradas', label: 'Cerradas', valor: n(a => a.estado === 'Cerrada'), meta: 'Con evidencia y verificación', cls: 'k-ok', filtro: { estado: 'Cerrada' } },
    { id: 'reabiertas', label: 'Reabiertas', valor: n(a => a.estado === 'Reabierta'), meta: 'La solución no fue eficaz', cls: 'k-alta', filtro: { estado: 'Reabierta' } },
    { id: 'escaladas', label: 'Escaladas', valor: n(a => a.estado === 'Escalada'), meta: 'Requieren decisión de Dirección', cls: 'k-alta', filtro: { estado: 'Escalada' } }
  ];

  $('#kpiGrid').innerHTML = kpis.map((k, i) => `
    <article class="kpi ${k.cls}">
      <h3>${esc(k.label)}</h3>
      <div class="value">${k.valor}</div>
      <div class="meta">${esc(k.meta)}</div>
      ${k.filtro ? `<button data-kpi="${i}" aria-label="Ver ${esc(k.label)} en el tablero"></button>` : ''}
    </article>`).join('');

  $$('#kpiGrid [data-kpi]').forEach(btn => btn.addEventListener('click', () => {
    const k = kpis[Number(btn.dataset.kpi)];
    limpiarFiltros(false);
    if (k.filtro.prioridad) state.filtros.prioridad = k.filtro.prioridad;
    if (k.filtro.estado) state.filtros.estado = k.filtro.estado;
    if (k.filtro.flags) state.filtros.flags = [...k.filtro.flags];
    guardarFiltros();
    sincronizarControlesFiltro();
    cambiarVista('tablero');
  }));

  renderDonutPrioridad(todas);
  renderBarrasEstado(todas);
  renderBarrasArea(todas);
  renderVencimientosProximos(todas);
}

/** Dona SVG propia por prioridad (sin librerías de charts). */
function renderDonutPrioridad(todas) {
  const datos = [
    { label: 'Alta', color: 'var(--color-alta)', n: todas.filter(a => a.prioridad === 'Alta').length },
    { label: 'Media', color: 'var(--color-media)', n: todas.filter(a => a.prioridad === 'Media').length },
    { label: 'Baja', color: 'var(--color-baja)', n: todas.filter(a => a.prioridad === 'Baja').length }
  ];
  const total = todas.length;
  const R = 60, C = 2 * Math.PI * R;
  let offset = C * 0.25; // inicia arriba
  const arcos = datos.map(d => {
    const len = (d.n / total) * C;
    const circ = `<circle cx="80" cy="80" r="${R}" stroke="${d.color}" stroke-dasharray="${len} ${C - len}" stroke-dashoffset="${offset}"></circle>`;
    offset -= len;
    return circ;
  }).join('');
  $('#donutPrioridad').innerHTML = `
    <div class="donut-wrap">
      <svg class="donut" viewBox="0 0 160 160" role="img" aria-label="Distribución por prioridad: ${datos.map(d => d.label + ' ' + d.n).join(', ')}">
        <circle class="track" cx="80" cy="80" r="${R}"></circle>
        ${arcos}
        <text x="80" y="76" text-anchor="middle" style="font-size:26px;font-weight:700;fill:var(--color-text)">${total}</text>
        <text x="80" y="96" text-anchor="middle" style="font-size:11px;fill:var(--color-text-faint)">acciones</text>
      </svg>
      <div class="legend">
        ${datos.map(d => `<div class="li"><span class="sw" style="background:${d.color}"></span>${d.label}: <strong>&nbsp;${d.n}</strong>&nbsp;(${Math.round(d.n / total * 100)}%)</div>`).join('')}
      </div>
    </div>`;
}

function renderBarrasEstado(todas) {
  const max = Math.max(...CATALOGOS.estados.map(e => todas.filter(a => a.estado === e).length));
  const fillCls = e => ({
    'Pendiente de validación': 'f-accent', 'En proceso': 'f-info',
    'Implementada': 'f-purple', 'Pendiente de eficacia': 'f-purple',
    'Cerrada': 'f-baja', 'Reabierta': 'f-alta', 'Bloqueada': 'f-alta', 'Escalada': 'f-alta'
  }[e] || '');
  $('#chartEstado').innerHTML = `<div class="chart">${CATALOGOS.estados.map(e => {
    const n = todas.filter(a => a.estado === e).length;
    return `<div class="chart-row">
      <span class="lbl" title="${esc(e)}">${esc(e)}</span>
      <div class="bar-track"><div class="bar-fill ${fillCls(e)}" style="width:${max ? (n / max * 100) : 0}%"></div></div>
      <span class="num">${n}</span>
    </div>`;
  }).join('')}</div>`;
}

function renderBarrasArea(todas) {
  const areas = [...new Set(todas.map(a => a.area))];
  const conteo = areas.map(ar => ({ area: ar, n: todas.filter(a => a.area === ar).length }))
    .sort((x, y) => y.n - x.n);
  const max = Math.max(...conteo.map(c => c.n));
  $('#chartArea').innerHTML = `<div class="chart">${conteo.map(c => `
    <div class="chart-row">
      <span class="lbl" title="${esc(c.area)}">${esc(c.area)}</span>
      <div class="bar-track"><div class="bar-fill f-info" style="width:${(c.n / max * 100)}%"></div></div>
      <span class="num">${c.n}</span>
    </div>`).join('')}</div>`;
}

/** Línea de tiempo de vencimientos (componente visual obligatorio 6). */
function renderVencimientosProximos(todas) {
  const proximas = todas.filter(a => esViva(a) && diasPara(a) <= 10)
    .sort((x, y) => diasPara(x) - diasPara(y));
  $('#timelineVencimientos').innerHTML = proximas.length ? `<div class="timeline">${proximas.map(a => `
    <div class="timeline-item">
      <div class="timeline-date">${fmtFecha(a.fecha_compromiso)}</div>
      <div class="timeline-body">
        <strong>${esc(a.id)} · ${esc(a.titulo)}</strong>
        <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:center;margin-top:4px;">
          ${badgePrioridad(a.prioridad)} ${semaforoHTML(a)}
        </div>
        <span class="who">${esc(a.responsable)} · ${esc(a.area)}</span>
      </div>
    </div>`).join('')}</div>`
    : '<div class="empty">Sin vencimientos en los próximos 10 días.</div>';
}

/* ===================== 2. TABLERO MAESTRO ================================= */
const COLUMNAS_TABLA = [
  { clave: 'codigo', label: 'Código', sortable: true },
  { clave: 'prioridad', label: 'Prioridad', sortable: true },
  { clave: 'titulo', label: 'Acción', sortable: true },
  { clave: 'area', label: 'Área', sortable: true },
  { clave: 'responsable', label: 'Responsable', sortable: true },
  { clave: 'fecha_compromiso', label: 'Compromiso', sortable: true },
  { clave: 'dias', label: 'Semáforo', sortable: true },
  { clave: 'estado', label: 'Estado', sortable: true },
  { clave: 'avance', label: 'Avance', sortable: true },
  { clave: 'evidencia', label: 'Evidencia', sortable: false }
];

function renderTablero() {
  const datos = ordenar(aplicarFiltros(ACCIONES));
  $('#resultInfo').textContent = `${datos.length} de ${ACCIONES.length} acciones`;

  $('#tablaHead').innerHTML = `<tr>${COLUMNAS_TABLA.map(c => `
    <th ${c.sortable ? `class="sortable" data-sort="${c.clave}" tabindex="0" role="button" aria-label="Ordenar por ${c.label}"` : ''}>
      ${c.label}${state.orden.clave === c.clave ? `<span class="sort-ind">${state.orden.dir === 1 ? '▲' : '▼'}</span>` : ''}
    </th>`).join('')}</tr>`;

  $('#tablaBody').innerHTML = datos.length ? datos.map(a => `
    <tr data-id="${a.id}" class="${esVencida(a) ? 'row-vencida' : ''}" tabindex="0">
      <td><strong>${esc(a.id)}</strong><div class="td-sub">${esc(a.codigo)}</div></td>
      <td>${badgePrioridad(a.prioridad)}</td>
      <td>${esc(a.titulo)}<div class="td-sub">${esc(a.subarea)} · Origen: ${esc(a.origen.length > 46 ? a.origen.slice(0, 46) + '…' : a.origen)}</div></td>
      <td>${esc(a.area)}</td>
      <td>${esc(a.responsable)}${a.colaboradores.length ? `<div class="td-sub">+ ${esc(a.colaboradores.join(', '))}</div>` : ''}</td>
      <td>${fmtFecha(a.fecha_compromiso)}<div class="td-sub">Creada: ${fmtFecha(a.fecha_creacion)}</div></td>
      <td>${semaforoHTML(a)}</td>
      <td>${badgeEstado(a.estado)}</td>
      <td>${progresoHTML(a.porcentaje_avance)}</td>
      <td>${a.evidencia_cargada
        ? '<span class="mini-alert neutral">Cargada</span>'
        : '<span class="mini-alert warn">Pendiente</span>'}</td>
    </tr>`).join('')
    : `<tr><td colspan="${COLUMNAS_TABLA.length}"><div class="empty">No hay resultados para los filtros aplicados.</div></td></tr>`;

  // Interacciones: ordenar y abrir detalle
  $$('#tablaHead th.sortable').forEach(th => {
    const activar = () => {
      const clave = th.dataset.sort;
      if (state.orden.clave === clave) state.orden.dir *= -1;
      else state.orden = { clave, dir: 1 };
      renderTablero();
    };
    th.addEventListener('click', activar);
    th.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); activar(); } });
  });
  $$('#tablaBody tr[data-id]').forEach(tr => {
    tr.addEventListener('click', () => abrirDetalle(tr.dataset.id));
    tr.addEventListener('keydown', e => { if (e.key === 'Enter') abrirDetalle(tr.dataset.id); });
  });
}

/** Exporta la vista filtrada a CSV (spec: exportar vista filtrada). */
function exportarCSV() {
  const datos = ordenar(aplicarFiltros(ACCIONES));
  const encabezado = ['codigo', 'id', 'titulo', 'descripcion', 'prioridad', 'area', 'subarea',
    'responsable', 'colaboradores', 'origen', 'fecha_creacion', 'fecha_compromiso', 'fecha_cierre',
    'estado', 'porcentaje_avance', 'riesgo', 'evidencia_requerida', 'evidencia_cargada',
    'bloqueo', 'dependencia', 'verificador', 'criterio_cierre', 'criterio_eficacia', 'etiquetas'];
  const filas = datos.map(a => [
    a.codigo, a.id, a.titulo, a.descripcion, a.prioridad, a.area, a.subarea, a.responsable,
    a.colaboradores.join(' | '), a.origen, a.fecha_creacion, a.fecha_compromiso, a.fecha_cierre || '',
    a.estado, a.porcentaje_avance, a.riesgo, a.evidencia_requerida, a.evidencia_cargada ? 'SI' : 'NO',
    a.bloqueo || '', a.dependencia || '', a.verificador, a.criterio_cierre, a.criterio_eficacia, a.etiquetas.join(' | ')
  ]);
  const csv = [encabezado, ...filas]
    .map(r => r.map(v => `"${String(v).replaceAll('"', '""')}"`).join(','))
    .join('\r\n');
  const blob = new Blob(['﻿' + csv], { type: 'text/csv;charset=utf-8;' }); // BOM para Excel
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = `equiser-seguimiento-${HOY}.csv`;
  a.click();
  URL.revokeObjectURL(a.href);
}

/* ============== 3. VISTA DETALLADA (DRAWER) + LÓGICA DE CIERRE ============ */
function abrirDetalle(id) {
  const a = ACCIONES.find(x => x.id === id);
  if (!a) return;
  state.seleccionada = id;

  $('#drawerBadges').innerHTML = `${badgePrioridad(a.prioridad)} ${badgeEstado(a.estado)} ${badgeArea(a.area)}`;
  $('#drawerTitle').textContent = `${a.id} — ${a.titulo}`;

  const { items, cerrable } = checklistCierre(a);
  const yaCerrada = a.estado === 'Cerrada';

  $('#drawerBody').innerHTML = `
    <section class="d-section">
      <h3>Semáforo de urgencia (independiente de la prioridad)</h3>
      <div style="display:flex;gap:10px;flex-wrap:wrap;align-items:center;">
        ${semaforoHTML(a)}
        ${a.bloqueo ? `<span class="mini-alert">Bloqueo: ${esc(a.bloqueo)}</span>` : ''}
      </div>
    </section>

    <section class="d-section">
      <h3>Descripción / brecha reportada</h3>
      <p>${esc(a.descripcion)}</p>
    </section>

    <section class="d-section">
      <h3>Riesgo por no ejecutar</h3>
      <p>${esc(a.riesgo)}</p>
      <div class="tags" style="margin-top:8px;">
        <span class="tag">Impacto: ${esc(a.impacto)}</span>
        <span class="tag">Urgencia: ${esc(a.urgencia)}</span>
      </div>
    </section>

    <section class="d-section">
      <h3>Datos de control</h3>
      <div class="d-kv">
        <div class="kv"><div class="k">Responsable único</div><div class="v">${esc(a.responsable)}</div></div>
        <div class="kv"><div class="k">Colaboradores</div><div class="v">${a.colaboradores.length ? esc(a.colaboradores.join(', ')) : '—'}</div></div>
        <div class="kv"><div class="k">Verificador</div><div class="v">${esc(a.verificador)}</div></div>
        <div class="kv"><div class="k">Origen</div><div class="v">${esc(a.origen)}</div></div>
        <div class="kv"><div class="k">Creada</div><div class="v">${fmtFecha(a.fecha_creacion)}</div></div>
        <div class="kv"><div class="k">Compromiso</div><div class="v">${fmtFecha(a.fecha_compromiso)}</div></div>
        <div class="kv"><div class="k">Cierre real</div><div class="v">${a.fecha_cierre ? fmtFecha(a.fecha_cierre) : '—'}</div></div>
        <div class="kv"><div class="k">Dependencia</div><div class="v">${esc(a.dependencia || '—')}</div></div>
        <div class="kv"><div class="k">Avance</div><div class="v">${progresoHTML(a.porcentaje_avance)}</div></div>
      </div>
    </section>

    <section class="d-section">
      <h3>Evidencia</h3>
      <p><strong>Requerida:</strong> ${esc(a.evidencia_requerida)}</p>
      <p style="margin-top:6px;"><strong>Estado:</strong> ${a.evidencia_cargada
        ? '<span class="mini-alert neutral">Evidencia cargada</span>'
        : '<span class="mini-alert warn">Evidencia pendiente — sin evidencia no se cierra</span>'}</p>
    </section>

    <section class="d-section">
      <h3>Criterios de cierre y eficacia</h3>
      <p><strong>Cierre:</strong> ${esc(a.criterio_cierre)}</p>
      <p style="margin-top:6px;"><strong>Eficacia:</strong> ${esc(a.criterio_eficacia)}</p>
      ${ESTADOS_EJECUTADAS_SIN_CIERRE.includes(a.estado)
        ? `<p style="margin-top:8px;"><span class="mini-alert warn">Recordatorio: “${esc(a.estado)}” no equivale a “Cerrada”.</span></p>` : ''}
    </section>

    <section class="d-section">
      <h3>Checklist de cierre (regla de negocio)</h3>
      <div class="checklist">
        ${items.map(i => `
          <div class="check-item ${i.ok ? 'ok' : 'fail'}">
            <span class="ci-icon" aria-hidden="true">${i.ok ? '✓' : '✕'}</span>
            <div><strong>${esc(i.label)}</strong><small>${esc(i.detalle || '')}</small></div>
          </div>`).join('')}
      </div>
      <div class="cierre-veredicto ${yaCerrada || cerrable ? 'si' : 'no'}" style="margin-top:10px;">
        ${yaCerrada
          ? `Acción cerrada el ${fmtFecha(a.fecha_cierre)} con verificación registrada.`
          : cerrable
            ? 'Requisitos de cierre completos: puede presentarse a verificación de cierre.'
            : 'Cierre bloqueado: faltan requisitos marcados. Sin evidencia y verificación no se cierra.'}
      </div>
    </section>

    <section class="d-section">
      <h3>Historial y trazabilidad</h3>
      <div class="timeline">
        ${a.historial.map(h => `
          <div class="timeline-item">
            <div class="timeline-date">${fmtFecha(h.fecha)}</div>
            <div class="timeline-body">${esc(h.evento)}<span class="who">${esc(h.autor)}</span></div>
          </div>`).join('')}
      </div>
    </section>

    <section class="d-section">
      <h3>Comentarios (${a.comentarios.length})</h3>
      ${a.comentarios.length ? `<div class="timeline">${a.comentarios.map(c => `
        <div class="timeline-item">
          <div class="timeline-date">${fmtFecha(c.fecha)}</div>
          <div class="timeline-body">${esc(c.texto)}<span class="who">${esc(c.autor)}</span></div>
        </div>`).join('')}</div>` : '<p>Sin comentarios registrados.</p>'}
    </section>

    <section class="d-section">
      <h3>Etiquetas</h3>
      <div class="tags">${a.etiquetas.map(t => `<span class="tag">${esc(t)}</span>`).join('')}</div>
    </section>`;

  $('#drawer').classList.add('open');
  $('#drawer').setAttribute('aria-hidden', 'false');
  $('#overlay').classList.add('show');
  $('#drawerClose').focus();
}

function cerrarDetalle() {
  $('#drawer').classList.remove('open');
  $('#drawer').setAttribute('aria-hidden', 'true');
  $('#overlay').classList.remove('show');
  state.seleccionada = null;
}

function copiarResumen() {
  const a = ACCIONES.find(x => x.id === state.seleccionada);
  if (!a) return;
  const s = semaforo(a);
  const texto = [
    `${a.codigo} | ${a.prioridad} | ${a.estado} | ${a.titulo}`,
    `Responsable: ${a.responsable} · Verificador: ${a.verificador}`,
    `Compromiso: ${fmtFecha(a.fecha_compromiso)} (${s.txt}) · Avance: ${a.porcentaje_avance}%`,
    `Riesgo: ${a.riesgo}`,
    `Evidencia: ${a.evidencia_cargada ? 'cargada' : 'pendiente'} — ${a.evidencia_requerida}`,
    a.bloqueo ? `Bloqueo: ${a.bloqueo}` : null
  ].filter(Boolean).join('\n');
  const btn = $('#btnCopiar');
  const done = () => { btn.textContent = 'Copiado ✓'; setTimeout(() => btn.textContent = 'Copiar resumen', 1400); };
  if (navigator.clipboard?.writeText) navigator.clipboard.writeText(texto).then(done).catch(done);
  else done();
}

/* ===================== 5. SEGUIMIENTO SEMANAL ============================= */
/** Orden de reunión (spec): altas → vencidas → por vencer → medias → bajas. */
function renderSemanal() {
  const vivas = ACCIONES.filter(esViva);
  const usados = new Set();
  const tomar = predicado => vivas.filter(a => !usados.has(a.id) && predicado(a))
    .map(a => { usados.add(a.id); return a; });

  const grupos = [
    { titulo: '1 · Acciones de prioridad alta', nota: 'Contener y decidir. Se revisan primero, siempre.', items: tomar(a => a.prioridad === 'Alta') },
    { titulo: '2 · Vencidas (media y baja)', nota: 'Una media o baja vencida genera alerta aunque no sea crítica.', items: tomar(esVencida) },
    { titulo: '3 · Por vencer en los próximos 7 días', nota: 'Prevenir el vencimiento antes de que ocurra.', items: tomar(venceEn7) },
    { titulo: '4 · Medias estructurales en curso', nota: 'Ordenan gestión, trazabilidad y control; vigilar escalamiento.', items: tomar(a => a.prioridad === 'Media') },
    { titulo: '5 · Bajas programables', nota: 'No deben desplazar acciones de seguridad, caja o legalidad.', items: tomar(a => a.prioridad === 'Baja') }
  ];
  // Cualquier viva restante (caso borde) entra al grupo 4
  const resto = tomar(() => true);
  if (resto.length) grupos[3].items.push(...resto);

  const ejecutadas = ACCIONES.filter(a => ESTADOS_EJECUTADAS_SIN_CIERRE.includes(a.estado));

  $('#semanaGrupos').innerHTML = grupos.map(g => `
    <section class="semana-group">
      <header><h3>${esc(g.titulo)}</h3><span class="count-pill">${g.items.length}</span><span class="result-info">${esc(g.nota)}</span></header>
      ${g.items.length ? g.items.map(a => tarjetaSeguimiento(a)).join('') : '<div class="empty">Sin acciones en este grupo.</div>'}
    </section>`).join('') + `
    <section class="semana-group">
      <header><h3>Verificación de eficacia y cierre</h3><span class="count-pill">${ejecutadas.length}</span>
        <span class="result-info">Ejecutadas que aún NO pueden marcarse como cerradas sin comprobación.</span></header>
      ${ejecutadas.length ? ejecutadas.map(a => tarjetaSeguimiento(a)).join('') : '<div class="empty">No hay acciones en verificación.</div>'}
    </section>`;
}

/** Tarjeta de reunión: qué se prometió / qué se hizo / qué falta / ¿cerrar? / ¿escalar? */
function tarjetaSeguimiento(a) {
  const ultimo = a.comentarios[a.comentarios.length - 1];
  const { items, cerrable } = checklistCierre(a);
  const faltantes = items.filter(i => !i.ok).map(i => i.label);
  const escalar = debeEscalarse(a);
  return `
  <article class="panel follow-card p-${a.prioridad.toLowerCase()}">
    <div style="display:flex;justify-content:space-between;gap:12px;flex-wrap:wrap;align-items:flex-start;">
      <div>
        <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:center;">
          <strong>${esc(a.id)}</strong> ${badgePrioridad(a.prioridad)} ${badgeEstado(a.estado)}
        </div>
        <h4 style="margin:6px 0 0;">${esc(a.titulo)}</h4>
      </div>
      <div style="text-align:right;">${semaforoHTML(a)}<div class="td-sub">${esc(a.responsable)}</div></div>
    </div>
    <div class="follow-grid" style="margin-top:12px;">
      <div class="follow-cell"><span class="fc-label">Qué se prometió</span>${esc(a.criterio_cierre)}</div>
      <div class="follow-cell"><span class="fc-label">Qué se hizo / evidencia</span>
        ${progresoHTML(a.porcentaje_avance)}
        <div style="margin-top:6px;">${a.evidencia_cargada ? 'Evidencia cargada.' : 'Sin evidencia cargada.'}
        ${ultimo ? `<div class="td-sub" style="margin-top:4px;">Último: ${esc(ultimo.texto.length > 110 ? ultimo.texto.slice(0, 110) + '…' : ultimo.texto)}</div>` : ''}</div>
      </div>
      <div class="follow-cell ${faltantes.length ? 'fc-block' : 'fc-ok'}"><span class="fc-label">Qué falta</span>
        ${faltantes.length ? faltantes.map(f => `· ${esc(f)}`).join('<br>') : 'Nada: requisitos completos.'}
      </div>
      <div class="follow-cell ${cerrable ? 'fc-ok' : ''}"><span class="fc-label">¿Se puede cerrar?</span>
        ${a.estado === 'Cerrada' ? 'Ya está cerrada.' : cerrable ? 'Sí, puede pasar a verificación de cierre.' : 'No todavía.'}
        <div style="margin-top:8px;"><span class="fc-label">¿Escalar a Dirección?</span>
        ${a.estado === 'Escalada' ? '<span class="mini-alert">Ya escalada</span>'
          : escalar ? '<span class="mini-alert">Sí, escalar</span>'
          : '<span class="mini-alert neutral">No requiere</span>'}</div>
      </div>
    </div>
    <div style="margin-top:12px;"><button class="btn small" data-open="${a.id}">Abrir ficha completa</button></div>
  </article>`;
}

/* ===================== 7. ALERTAS Y SEMÁFOROS ============================= */
/** Separa visualmente tres conceptos que NO deben mezclarse (spec):
 *  - prioridad del riesgo (Alta/Media/Baja)
 *  - estado del avance (9 estados)
 *  - urgencia del tiempo (semáforo de vencimiento) */
function renderAlertas() {
  const grupos = [
    {
      titulo: 'Urgencia de tiempo — vencidas', cls: 'ag-crit',
      nota: 'Acciones vivas fuera de plazo. El vencimiento es un semáforo de tiempo, no de prioridad.',
      items: ACCIONES.filter(esVencida).sort((x, y) => diasPara(x) - diasPara(y)),
      meta: a => `Vencida hace ${Math.abs(diasPara(a))} días · compromiso ${fmtFecha(a.fecha_compromiso)}`
    },
    {
      titulo: 'Urgencia de tiempo — vence hoy', cls: 'ag-warn',
      nota: 'Compromisos con fecha de hoy: confirmar cumplimiento o replanificar con decisión registrada.',
      items: ACCIONES.filter(venceHoy),
      meta: a => `Compromiso hoy · ${a.responsable}`
    },
    {
      titulo: 'Urgencia de tiempo — vence en 3 días', cls: 'ag-warn',
      nota: 'Ventana corta de prevención: actuar antes del vencimiento.',
      items: ACCIONES.filter(venceEn3).sort((x, y) => diasPara(x) - diasPara(y)),
      meta: a => `Vence en ${diasPara(a)} d · ${fmtFecha(a.fecha_compromiso)}`
    },
    {
      titulo: 'Bloqueadas y escaladas', cls: 'ag-crit',
      nota: 'Requieren decisión o desbloqueo externo; no avanzan por ejecución directa.',
      items: ACCIONES.filter(a => a.estado === 'Bloqueada' || a.estado === 'Escalada'),
      meta: a => a.bloqueo ? `Bloqueo: ${a.bloqueo}` : `Estado: ${a.estado}`
    },
    {
      titulo: 'Sin responsable único', cls: 'ag-crit',
      nota: 'Regla H25: nada crítico asignado a “todos”. Toda acción necesita dueño único.',
      items: ACCIONES.filter(sinResponsable),
      meta: () => 'Responsable: por asignar'
    },
    {
      titulo: 'Sin evidencia con avance declarado', cls: 'ag-warn',
      nota: 'Avance ≥ 50 % o ejecutadas sin evidencia cargada. Sin evidencia no se cierra.',
      items: ACCIONES.filter(a => sinEvidencia(a) && (a.porcentaje_avance >= 50 || ESTADOS_EJECUTADAS_SIN_CIERRE.includes(a.estado)) && a.estado !== 'Cerrada'),
      meta: a => `Avance declarado ${a.porcentaje_avance}% sin evidencia`
    },
    {
      titulo: 'Pendientes de validación', cls: 'ag-info',
      nota: 'Detectadas o mencionadas, aún sin confirmar con evidencia. NO son incumplimientos confirmados.',
      items: ACCIONES.filter(a => a.estado === 'Pendiente de validación'),
      meta: a => `Responsable de validar: ${a.responsable}`
    },
    {
      titulo: 'Pendientes de eficacia', cls: 'ag-info',
      nota: 'Ejecutadas, pero sin comprobar que funcionaron. “Implementada” no significa “Cerrada”.',
      items: ACCIONES.filter(a => a.estado === 'Pendiente de eficacia'),
      meta: a => a.criterio_eficacia
    },
    {
      titulo: 'Reabiertas', cls: 'ag-crit',
      nota: 'La solución aplicada no fue eficaz: investigan causa raíz antes de nuevo cierre.',
      items: ACCIONES.filter(a => a.estado === 'Reabierta'),
      meta: a => a.criterio_eficacia
    }
  ];

  $('#alertasGrupos').innerHTML = grupos.map(g => `
    <section class="panel alert-group ${g.cls}">
      <h3>${esc(g.titulo)} <span class="count-pill">${g.items.length}</span></h3>
      <p class="panel-sub">${esc(g.nota)}</p>
      <div style="display:grid;gap:8px;">
        ${g.items.length ? g.items.map(a => `
          <div class="alert-item" data-open="${a.id}" tabindex="0" role="button">
            <div>
              <span class="ai-title">${esc(a.id)} · ${esc(a.titulo)}</span>
              <div class="ai-meta">${esc(g.meta(a))}</div>
            </div>
            <div style="display:flex;gap:6px;flex-wrap:wrap;justify-content:flex-end;">
              ${badgePrioridad(a.prioridad)} ${badgeEstado(a.estado)}
            </div>
          </div>`).join('')
        : '<div class="empty">Sin elementos en esta categoría.</div>'}
      </div>
    </section>`).join('');
}

/* ===================== 8. VISTA PARA DIRECCIÓN ============================ */
/** Puntaje de criticidad para el top 10 (impacto/riesgo + tiempo + bloqueo). */
function scoreCriticidad(a) {
  if (a.estado === 'Cerrada') return -1;
  let s = 0;
  if (a.prioridad === 'Alta') s += 100;
  else if (a.prioridad === 'Media') s += 30;
  if (esVencida(a)) s += 40 + Math.min(Math.abs(diasPara(a)) * 2, 20);
  if (venceHoy(a)) s += 30;
  else if (venceEn3(a)) s += 20;
  if (a.estado === 'Escalada') s += 35;
  if (a.estado === 'Bloqueada') s += 30;
  if (a.estado === 'Reabierta') s += 30;
  if (sinResponsable(a)) s += 25;
  if (sinEvidencia(a) && a.porcentaje_avance >= 50) s += 10;
  return s;
}

function renderDireccion() {
  // Top 10 acciones críticas
  const top10 = [...ACCIONES].map(a => ({ a, s: scoreCriticidad(a) }))
    .filter(x => x.s > 0).sort((x, y) => y.s - x.s).slice(0, 10);
  $('#dirTop10').innerHTML = top10.map(({ a, s }, i) => `
    <div class="alert-item" data-open="${a.id}" tabindex="0" role="button">
      <div>
        <span class="ai-title">${i + 1}. ${esc(a.id)} · ${esc(a.titulo)}</span>
        <div class="ai-meta">${esc(a.responsable)} · compromiso ${fmtFecha(a.fecha_compromiso)} · índice de criticidad ${s}</div>
      </div>
      <div style="display:flex;gap:6px;flex-wrap:wrap;justify-content:flex-end;">${badgePrioridad(a.prioridad)} ${badgeEstado(a.estado)}</div>
    </div>`).join('');

  // Decisiones que requieren aprobación de Dirección (escaladas + bloqueadas altas)
  const decisiones = ACCIONES.filter(a => a.estado === 'Escalada' || (a.estado === 'Bloqueada' && a.prioridad === 'Alta'));
  $('#dirDecisiones').innerHTML = decisiones.length ? decisiones.map(a => `
    <div class="alert-item" data-open="${a.id}" tabindex="0" role="button">
      <div>
        <span class="ai-title">${esc(a.id)} · ${esc(a.titulo)}</span>
        <div class="ai-meta">${a.bloqueo ? 'Bloqueo: ' + esc(a.bloqueo) : 'Escalada: requiere decisión de Dirección.'}</div>
      </div>
      ${badgeEstado(a.estado)}
    </div>`).join('') : '<div class="empty">Sin decisiones pendientes de Dirección.</div>';

  // Vencidas críticas (altas vencidas)
  const vencidasCriticas = ACCIONES.filter(a => a.prioridad === 'Alta' && esVencida(a))
    .sort((x, y) => diasPara(x) - diasPara(y));
  $('#dirVencidas').innerHTML = vencidasCriticas.length ? vencidasCriticas.map(a => `
    <div class="alert-item" data-open="${a.id}" tabindex="0" role="button">
      <div>
        <span class="ai-title">${esc(a.id)} · ${esc(a.titulo)}</span>
        <div class="ai-meta">Vencida hace ${Math.abs(diasPara(a))} días · ${esc(a.responsable)}</div>
      </div>
      ${badgeEstado(a.estado)}
    </div>`).join('') : '<div class="empty">No hay altas vencidas.</div>';

  // Responsables con más atrasos
  const atrasos = {};
  ACCIONES.filter(esVencida).forEach(a => {
    const r = a.responsable;
    atrasos[r] = atrasos[r] || { n: 0, ids: [] };
    atrasos[r].n++; atrasos[r].ids.push(a.id);
  });
  const ranking = Object.entries(atrasos).sort((x, y) => y[1].n - x[1].n);
  $('#dirAtrasos').innerHTML = ranking.length ? `<div class="chart">${ranking.map(([r, d]) => `
    <div class="chart-row">
      <span class="lbl" title="${esc(d.ids.join(', '))}">${esc(r)}</span>
      <div class="bar-track"><div class="bar-fill f-alta" style="width:${(d.n / ranking[0][1].n) * 100}%"></div></div>
      <span class="num">${d.n}</span>
    </div>`).join('')}</div>` : '<div class="empty">Ningún responsable con atrasos.</div>';

  // Riesgos inmediatos por tipo (financiero / operativo / legal)
  const esRiesgo = (a, palabras) => palabras.some(p => (a.impacto + ' ' + a.area + ' ' + a.etiquetas.join(' ')).toLowerCase().includes(p));
  const riesgos = [
    { titulo: 'Financieros inmediatos', palabras: ['financiero', 'caja', 'banca', 'deuda', 'factoring', 'cartera'] },
    { titulo: 'Operativos inmediatos', palabras: ['operativ', 'seguridad', 'continuidad', 'izaje', 'mantenimiento'] },
    { titulo: 'Legales inmediatos', palabras: ['legal', 'fiscal', 'laboral', 'dgi', 'css', 'municipio', 'contrato'] }
  ];
  $('#dirRiesgos').innerHTML = riesgos.map(r => {
    const items = ACCIONES.filter(a => a.prioridad === 'Alta' && a.estado !== 'Cerrada' && esRiesgo(a, r.palabras));
    return `<section class="d-section" style="margin-bottom:14px;">
      <h3>${esc(r.titulo)} <span class="count-pill">${items.length}</span></h3>
      <div style="display:grid;gap:8px;margin-top:8px;">
        ${items.length ? items.map(a => `
          <div class="alert-item" data-open="${a.id}" tabindex="0" role="button">
            <div><span class="ai-title">${esc(a.id)} · ${esc(a.titulo)}</span>
            <div class="ai-meta">${esc(a.riesgo.length > 120 ? a.riesgo.slice(0, 120) + '…' : a.riesgo)}</div></div>
            ${semaforoHTML(a)}
          </div>`).join('') : '<div class="empty">Sin riesgos altos abiertos en esta categoría.</div>'}
      </div>
    </section>`;
  }).join('');

  // Bloqueos que impiden avance
  const bloqueos = ACCIONES.filter(a => a.estado === 'Bloqueada');
  $('#dirBloqueos').innerHTML = bloqueos.length ? bloqueos.map(a => `
    <div class="alert-item" data-open="${a.id}" tabindex="0" role="button">
      <div>
        <span class="ai-title">${esc(a.id)} · ${esc(a.titulo)}</span>
        <div class="ai-meta">${esc(a.bloqueo || 'Sin descripción del bloqueo')} · depende de: ${esc(a.dependencia || '—')}</div>
      </div>
      ${badgePrioridad(a.prioridad)}
    </div>`).join('') : '<div class="empty">No hay acciones bloqueadas.</div>';

  // Acciones sin recursos / sin responsable asignado
  const sinRecursos = ACCIONES.filter(sinResponsable);
  $('#dirSinRecursos').innerHTML = sinRecursos.length ? sinRecursos.map(a => `
    <div class="alert-item" data-open="${a.id}" tabindex="0" role="button">
      <div>
        <span class="ai-title">${esc(a.id)} · ${esc(a.titulo)}</span>
        <div class="ai-meta">Requiere designación de responsable único (regla H25).</div>
      </div>
      ${badgePrioridad(a.prioridad)}
    </div>`).join('') : '<div class="empty">Todas las acciones tienen responsable único asignado.</div>';
}

/* ===================== Navegación y controles ============================ */
function cambiarVista(vista) {
  state.vista = vista;
  $$('.view').forEach(v => { v.hidden = v.id !== 'view-' + vista; });
  $$('[data-view]').forEach(b => b.classList.toggle('active', b.dataset.view === vista));
  const titulos = {
    dashboard: 'Dashboard ejecutivo',
    tablero: 'Tablero maestro de acciones',
    semanal: 'Seguimiento semanal',
    alertas: 'Alertas y semáforos',
    direccion: 'Vista para Dirección',
    matriz: 'Matriz de alcance de prioridades'
  };
  $('#headerVista').textContent = titulos[vista] || 'Panel de Control';
  // Cerrar sidebar en móvil al navegar
  $('#sidebar').classList.remove('open');
  $('#overlay').classList.remove('show');
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function limpiarFiltros(render = true) {
  state.filtros = { prioridad: '', estado: '', area: '', responsable: '', flags: [] };
  state.query = '';
  guardarFiltros();
  if (render) { sincronizarControlesFiltro(); renderTablero(); renderSemanalYAlertas(); }
}

function sincronizarControlesFiltro() {
  $('#fPrioridad').value = state.filtros.prioridad;
  $('#fEstado').value = state.filtros.estado;
  $('#fArea').value = state.filtros.area;
  $('#fResponsable').value = state.filtros.responsable;
  $('#searchInput').value = state.query;
  $$('#flagChips .chip').forEach(c => c.classList.toggle('active', state.filtros.flags.includes(c.dataset.flag)));
}

function renderSemanalYAlertas() { renderSemanal(); renderAlertas(); renderDireccion(); }

function poblarSelects() {
  const areas = [...new Set(ACCIONES.map(a => a.area))].sort();
  const responsables = [...new Set(ACCIONES.map(a => a.responsable))].sort();
  $('#fArea').innerHTML = '<option value="">Todas las áreas</option>' + areas.map(a => `<option>${esc(a)}</option>`).join('');
  $('#fResponsable').innerHTML = '<option value="">Todos los responsables</option>' + responsables.map(r => `<option>${esc(r)}</option>`).join('');
  $('#fEstado').innerHTML = '<option value="">Todos los estados</option>' + CATALOGOS.estados.map(e => `<option>${esc(e)}</option>`).join('');
}

function actualizarContadoresNav() {
  $('#navTotal').textContent = ACCIONES.length;
  $('#navAlertas').textContent = ACCIONES.filter(a => alertasDe(a).some(x => x.nivel === 'crit')).length;
  $('#navDireccion').textContent = ACCIONES.filter(a => scoreCriticidad(a) > 0).slice(0, 10).length || '';
}

/* ------------------------------- Tema ------------------------------------ */
function initTema() {
  let tema;
  try { tema = localStorage.getItem(LS_TEMA); } catch (e) { tema = null; }
  if (!tema) tema = matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  aplicarTema(tema);
  $('#themeToggle').addEventListener('click', () => {
    tema = tema === 'dark' ? 'light' : 'dark';
    aplicarTema(tema);
    try { localStorage.setItem(LS_TEMA, tema); } catch (e) { /* sin persistencia */ }
  });
}
function aplicarTema(tema) {
  document.documentElement.setAttribute('data-theme', tema);
  $('#themeToggle').setAttribute('aria-label', 'Cambiar a modo ' + (tema === 'dark' ? 'claro' : 'oscuro'));
  $('#themeToggle').textContent = tema === 'dark' ? '☀' : '◑';
}

/* -------------------------------- Init ------------------------------------ */
function init() {
  cargarFiltros();
  poblarSelects();
  initTema();
  $('#fechaCorte').textContent = fmtFecha(HOY);

  // Navegación principal
  $$('[data-view]').forEach(btn => btn.addEventListener('click', () => cambiarVista(btn.dataset.view)));

  // Búsqueda global (aplica al tablero y tarjetas)
  $('#searchInput').addEventListener('input', e => {
    state.query = e.target.value;
    guardarFiltros();
    renderTablero();
  });

  // Filtros avanzados combinables
  [['fPrioridad', 'prioridad'], ['fEstado', 'estado'], ['fArea', 'area'], ['fResponsable', 'responsable']]
    .forEach(([id, clave]) => $('#' + id).addEventListener('change', e => {
      state.filtros[clave] = e.target.value;
      guardarFiltros();
      renderTablero();
    }));
  $$('#flagChips .chip').forEach(chip => chip.addEventListener('click', () => {
    const f = chip.dataset.flag;
    const i = state.filtros.flags.indexOf(f);
    if (i >= 0) state.filtros.flags.splice(i, 1);
    else state.filtros.flags.push(f);
    chip.classList.toggle('active');
    guardarFiltros();
    renderTablero();
  }));
  $('#btnLimpiarFiltros').addEventListener('click', () => limpiarFiltros());

  // Exportación CSV de la vista filtrada
  $('#btnCsv').addEventListener('click', exportarCSV);

  // Drawer
  $('#drawerClose').addEventListener('click', cerrarDetalle);
  $('#btnCopiar').addEventListener('click', copiarResumen);
  $('#overlay').addEventListener('click', () => { cerrarDetalle(); $('#sidebar').classList.remove('open'); });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') { cerrarDetalle(); $('#sidebar').classList.remove('open'); $('#overlay').classList.remove('show'); }
  });

  // Menú móvil
  $('#menuToggle').addEventListener('click', () => {
    const abierto = $('#sidebar').classList.toggle('open');
    $('#overlay').classList.toggle('show', abierto);
  });

  // Delegación global para botones "abrir ficha" generados dinámicamente
  document.addEventListener('click', e => {
    const t = e.target.closest('[data-open]');
    if (t) abrirDetalle(t.dataset.open);
  });
  document.addEventListener('keydown', e => {
    const t = e.target.closest && e.target.closest('[data-open]');
    if (t && e.key === 'Enter') abrirDetalle(t.dataset.open);
  });

  // Render inicial
  sincronizarControlesFiltro();
  actualizarContadoresNav();
  renderDashboard();
  renderTablero();
  renderSemanalYAlertas();
  cambiarVista('dashboard');
}

document.addEventListener('DOMContentLoaded', init);
