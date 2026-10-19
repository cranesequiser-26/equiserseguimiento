/* Equiser · dataset maestro — parte BAJA (L01–L07). Cargar antes que data.js */
/* eslint-disable */
const ACCIONES_L = [
  /* ======================== PRIORIDAD BAJA (L01–L07) ======================= */
  {
    id: 'L01', codigo: 'EQ-L01',
    titulo: 'Rotulación de camionetas',
    descripcion: 'Mejora visual sin desplazar lo crítico: comparar proveedor, diseño, costo y condición del vehículo antes de rotular.',
    prioridad: 'Baja', area: 'Comercial', subarea: 'Imagen corporativa',
    responsable: 'Administración', colaboradores: ['Karen'],
    origen: 'Informe integral de ordenamiento empresarial y plan de acción',
    fecha_creacion: '2026-10-15', fecha_compromiso: '2026-11-17', fecha_cierre: null,
    estado: 'Abierta', porcentaje_avance: 10,
    riesgo: 'Riesgo bajo: imagen desactualizada. No compite con acciones de seguridad, caja o legalidad.',
    impacto: 'Imagen', urgencia: 'Baja',
    evidencia_requerida: 'Diseño aprobado, cotización y fotos del resultado.',
    evidencia_cargada: false, bloqueo: null,
    dependencia: 'Disponibilidad de presupuesto no crítico',
    verificador: 'Dirección',
    criterio_cierre: 'Vehículos rotulados según diseño aprobado con registro fotográfico.',
    criterio_eficacia: 'Inventario gráfico actualizado.',
    comentarios: [],
    historial: [
      { fecha: '2026-10-15', autor: 'Secretaría de seguimiento', evento: 'Acción creada a partir de la reunión de seguimiento.' }
    ],
    etiquetas: ['imagen', 'rotulación']
  },
  {
    id: 'L02', codigo: 'EQ-L02',
    titulo: 'Visita del proveedor de cámaras',
    descripcion: 'Ver si realmente resuelve el problema: confirmar alcance, fecha y prueba funcional del sistema de cámaras de seguridad.',
    prioridad: 'Baja', area: 'Administración', subarea: 'Seguridad patrimonial',
    responsable: 'Administración', colaboradores: ['TI externo'],
    origen: 'Informe integral de ordenamiento empresarial y plan de acción',
    fecha_creacion: '2026-10-15', fecha_compromiso: '2026-11-14', fecha_cierre: null,
    estado: 'Abierta', porcentaje_avance: 20,
    riesgo: 'Riesgo bajo: sistema de cámaras con puntos ciegos. Programable sin desplazar controles esenciales.',
    impacto: 'Seguridad patrimonial', urgencia: 'Baja',
    evidencia_requerida: 'Orden de servicio y constancia de prueba funcional.',
    evidencia_cargada: false, bloqueo: null,
    dependencia: 'Agenda del proveedor',
    verificador: 'Administración',
    criterio_cierre: 'Prueba funcional aprobada y plan de mantenimiento definido.',
    criterio_eficacia: 'Cobertura verificada sin puntos ciegos críticos.',
    comentarios: [
      { fecha: '2026-10-18', autor: 'Administración', texto: 'Proveedor contactado; visita tentativa para la semana del 10 de noviembre.' }
    ],
    historial: [
      { fecha: '2026-10-15', autor: 'Secretaría de seguimiento', evento: 'Acción creada a partir de la reunión de seguimiento.' },
      { fecha: '2026-10-18', autor: 'Administración', evento: 'Contacto inicial con proveedor.' }
    ],
    etiquetas: ['cámaras', 'seguridad patrimonial']
  },
  {
    id: 'L03', codigo: 'EQ-L03',
    titulo: 'Videos y publicidad con capacidades reales',
    descripcion: 'No prometer más de lo que se demuestra: planificar contenido comercial alineado con la capacidad real de equipos y servicios.',
    prioridad: 'Baja', area: 'Comercial', subarea: 'Marketing',
    responsable: 'Andrés', colaboradores: ['Karen'],
    origen: 'Informe integral de ordenamiento empresarial y plan de acción',
    fecha_creacion: '2026-10-16', fecha_compromiso: '2026-11-28', fecha_cierre: null,
    estado: 'Abierta', porcentaje_avance: 5,
    riesgo: 'Riesgo bajo: publicidad desalineada puede prometer capacidades no verificadas. Calendarizable.',
    impacto: 'Comercial e imagen', urgencia: 'Baja',
    evidencia_requerida: 'Calendario de contenido aprobado con validación técnica de capacidades.',
    evidencia_cargada: false, bloqueo: null,
    dependencia: 'Validación de capacidades por Operaciones',
    verificador: 'Dirección',
    criterio_cierre: 'Calendario aprobado y primeras piezas publicadas con validación técnica.',
    criterio_eficacia: 'Impacto comercial medido (consultas atribuibles) en el siguiente trimestre.',
    comentarios: [],
    historial: [
      { fecha: '2026-10-16', autor: 'Secretaría de seguimiento', evento: 'Acción creada a partir de la reunión de seguimiento.' }
    ],
    etiquetas: ['marketing', 'publicidad', 'contenido']
  },
  {
    id: 'L04', codigo: 'EQ-L04',
    titulo: 'Orden de redes sociales',
    descripcion: 'Dueños y accesos claros: definir propietarios de cuentas, calendario editorial y respuesta básica a mensajes.',
    prioridad: 'Baja', area: 'Comercial', subarea: 'Redes sociales',
    responsable: 'Comercial', colaboradores: ['Administración'],
    origen: 'Informe integral de ordenamiento empresarial y plan de acción',
    fecha_creacion: '2026-10-16', fecha_compromiso: '2026-11-14', fecha_cierre: null,
    estado: 'Abierta', porcentaje_avance: 15,
    riesgo: 'Riesgo bajo: cuentas sin dueño generan respuestas tardías e imagen descuidada.',
    impacto: 'Imagen y comercial', urgencia: 'Baja',
    evidencia_requerida: 'Matriz de accesos y calendario editorial publicado.',
    evidencia_cargada: false, bloqueo: null,
    dependencia: null,
    verificador: 'Dirección',
    criterio_cierre: 'Accesos ordenados con responsables y calendario en ejecución.',
    criterio_eficacia: 'Revisión mensual con tiempos de respuesta dentro de lo definido.',
    comentarios: [],
    historial: [
      { fecha: '2026-10-16', autor: 'Secretaría de seguimiento', evento: 'Acción creada a partir de la reunión de seguimiento.' }
    ],
    etiquetas: ['redes sociales', 'imagen']
  },
  {
    id: 'L05', codigo: 'EQ-L05',
    titulo: 'Depuración de archivo físico y digital',
    descripcion: 'Documentos localizables: ordenar contratos, facturas, expedientes y comunicaciones duplicadas en archivo físico y digital.',
    prioridad: 'Baja', area: 'Gestión documental / seguimiento', subarea: 'Archivo',
    responsable: 'Administración', colaboradores: ['Contabilidad'],
    origen: 'Informe integral de ordenamiento empresarial y plan de acción',
    fecha_creacion: '2026-10-16', fecha_compromiso: '2026-11-30', fecha_cierre: null,
    estado: 'En proceso', porcentaje_avance: 20,
    riesgo: 'Riesgo bajo-moderado: archivo desordenado encarece cada búsqueda documental (apoya a H03, H23 y M19).',
    impacto: 'Documental', urgencia: 'Baja',
    evidencia_requerida: 'Índice de archivo y muestras de documentos recuperables en minutos.',
    evidencia_cargada: false, bloqueo: null,
    dependencia: 'Tiempo disponible sin desplazar cierres contables',
    verificador: 'Secretaría de seguimiento',
    criterio_cierre: 'Índice operativo y prueba de recuperación de documentos superada.',
    criterio_eficacia: 'Norma interna de archivo adoptada y aplicada a documentos nuevos.',
    comentarios: [
      { fecha: '2026-10-19', autor: 'Administración', texto: 'Se inició con contratos vigentes; el resto avanza en horas no críticas.' }
    ],
    historial: [
      { fecha: '2026-10-16', autor: 'Secretaría de seguimiento', evento: 'Acción creada a partir de la reunión de seguimiento.' },
      { fecha: '2026-10-19', autor: 'Administración', evento: 'Avance al 20%: contratos vigentes ordenados.' }
    ],
    etiquetas: ['archivo', 'documentos', 'orden']
  },
  {
    id: 'L06', codigo: 'EQ-L06',
    titulo: 'Formato visual de informes gerenciales',
    descripcion: 'Más claridad, no más burocracia: estandarizar la presentación visual de informes para mostrar decisión, responsable y evidencia.',
    prioridad: 'Baja', area: 'Gestión documental / seguimiento', subarea: 'Informes',
    responsable: 'Secretaría de seguimiento', colaboradores: ['Dirección'],
    origen: 'Informe integral de ordenamiento empresarial y plan de acción',
    fecha_creacion: '2026-10-16', fecha_compromiso: '2026-11-17', fecha_cierre: null,
    estado: 'Abierta', porcentaje_avance: 10,
    riesgo: 'Riesgo bajo: informes heterogéneos dificultan la lectura ejecutiva.',
    impacto: 'Gestión', urgencia: 'Baja',
    evidencia_requerida: 'Tres informes emitidos con el nuevo formato y aceptados por Dirección.',
    evidencia_cargada: false, bloqueo: null,
    dependencia: null,
    verificador: 'Dirección',
    criterio_cierre: 'Formato aprobado y adoptado por las áreas que reportan.',
    criterio_eficacia: 'Ajustes por retroalimentación incorporados en la segunda versión.',
    comentarios: [],
    historial: [
      { fecha: '2026-10-16', autor: 'Secretaría de seguimiento', evento: 'Acción creada a partir de la reunión de seguimiento.' }
    ],
    etiquetas: ['informes', 'formato', 'gestión']
  },
  {
    id: 'L07', codigo: 'EQ-L07',
    titulo: 'Sesión de alineación del equipo',
    descripcion: 'Hacerla después de atender lo urgente: reunión breve sobre cambios, expectativas, canales y prioridades con el personal clave.',
    prioridad: 'Baja', area: 'RR. HH.', subarea: 'Comunicación interna',
    responsable: 'Dirección', colaboradores: ['RR. HH.'],
    origen: 'Informe integral de ordenamiento empresarial y plan de acción',
    fecha_creacion: '2026-10-16', fecha_compromiso: '2026-11-18', fecha_cierre: null,
    estado: 'Pendiente de validación', porcentaje_avance: 5,
    riesgo: 'Riesgo bajo: sin alineación, persisten dudas sobre cambios y prioridades. No debe desplazar acciones críticas.',
    impacto: 'Clima y comunicación', urgencia: 'Baja',
    evidencia_requerida: 'Acta de la sesión con compromisos registrados.',
    evidencia_cargada: false, bloqueo: null,
    dependencia: 'Cierre de lo urgente de la quincena (altas vencidas)',
    verificador: 'RR. HH.',
    criterio_cierre: 'Sesión realizada con acta y compromisos comunicados.',
    criterio_eficacia: 'Pulso de seguimiento posterior sin señales de desalineación.',
    comentarios: [
      { fecha: '2026-10-18', autor: 'Dirección', texto: 'El momento oportuno de la sesión está por validarse; se confirma fecha una vez atendidas las altas vencidas.' }
    ],
    historial: [
      { fecha: '2026-10-16', autor: 'Secretaría de seguimiento', evento: 'Acción creada a partir de la reunión de seguimiento.' },
      { fecha: '2026-10-18', autor: 'Dirección', evento: 'Fecha tentativa pendiente de validación.' }
    ],
    etiquetas: ['alineación', 'equipo', 'comunicación']
  }
];

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { ACCIONES_L };
}
