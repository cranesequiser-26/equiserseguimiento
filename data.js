/* ============================================================================
 * EQUISER PANAMÁ · Panel de Control Equiser — Seguimiento Integral
 * data.js — Base inicial de acciones prioritarias (dataset maestro)
 * ----------------------------------------------------------------------------
 * Fuente base: matriz de prioridades H01–H25 / M01–M27 / L01–L07 (informes
 * integrales de ordenamiento empresarial y de seguimiento financiero,
 * operativo y de RR. HH., más transcripciones de reuniones).
 *
 * Fecha de corte del tablero: 2026-10-20 (constante HOY en app.js).
 *
 * Estados oficiales (regla de negocio, NO modificar el catálogo):
 *   Pendiente de validación | Abierta | En proceso | Implementada |
 *   Pendiente de eficacia | Cerrada | Reabierta | Bloqueada | Escalada
 *
 * Reglas de contenido respetadas:
 *  - Las acciones NO se presentan como incumplimientos definitivos: varias
 *    están "Pendiente de validación" a la espera de confirmar el hecho.
 *  - "Implementada" no equivale a "Cerrada": el cierre exige evidencia y
 *    verificación independiente.
 *  - La prioridad refleja impacto/riesgo, no el vencimiento del plazo.
 * ==========================================================================*/

/* eslint-disable */
/* Carga dividida del dataset (navegador: index.html incluye data-h/m/l antes de este archivo) */
if (typeof module !== 'undefined' && module.exports && typeof ACCIONES_H === 'undefined') {
  global.ACCIONES_H = require('./data-h.js').ACCIONES_H;
  global.ACCIONES_M = require('./data-m.js').ACCIONES_M;
  global.ACCIONES_L = require('./data-l.js').ACCIONES_L;
}
const ACCIONES = [].concat(ACCIONES_H, ACCIONES_M, ACCIONES_L);

const CATALOGOS = {
  fechaCorte: '2026-10-20',
  estados: ['Pendiente de validación', 'Abierta', 'En proceso', 'Implementada', 'Pendiente de eficacia', 'Cerrada', 'Reabierta', 'Bloqueada', 'Escalada'],
  prioridades: ['Alta', 'Media', 'Baja']
};

/* Compatibilidad: permite importar como módulo en pruebas con Node */
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { ACCIONES, CATALOGOS };
}
