/* Equiser · dataset maestro — parte MEDIA (M01–M27). Cargar antes que data.js */
/* eslint-disable */
const ACCIONES_M = [
  /* ======================= PRIORIDAD MEDIA (M01–M27) ======================= */
  {
    id: 'M01', codigo: 'EQ-M01',
    titulo: 'Factura y agente aduanal del envío',
    descripcion: 'Ubicar la factura del envío, confirmar qué agente aduanal cotizó y solicitar una nueva oferta comparable para decidir con soporte documental.',
    prioridad: 'Media', area: 'Compras', subarea: 'Importaciones',
    responsable: 'Compras', colaboradores: ['Administración'],
    origen: 'Informe integral de seguimiento financiero, operativo y de RR. HH.',
    fecha_creacion: '2026-10-14', fecha_compromiso: '2026-10-24', fecha_cierre: null,
    estado: 'Abierta', porcentaje_avance: 15,
    riesgo: 'Sin soporte documental del envío se pierde trazabilidad del gasto y capacidad de reclamo.',
    impacto: 'Documental y económico', urgencia: 'Media',
    evidencia_requerida: 'Factura localizada, contacto del agente y cotizaciones comparables.',
    evidencia_cargada: false, bloqueo: null,
    dependencia: 'Archivo de Administración',
    verificador: 'Celia',
    criterio_cierre: 'Opción elegida con comparativo documentado y soporte completo.',
    criterio_eficacia: 'El siguiente envío se gestiona con agente y costos documentados desde el inicio.',
    comentarios: [],
    historial: [
      { fecha: '2026-10-14', autor: 'Secretaría de seguimiento', evento: 'Acción creada a partir de la reunión de seguimiento.' }
    ],
    etiquetas: ['aduanas', 'compras', 'documentos']
  },
  {
    id: 'M02', codigo: 'EQ-M02',
    titulo: 'Revisión de sociedad en Costa Rica',
    descripcion: 'Definir si conviene mantener la sociedad en Costa Rica: confirmar abogado, representante, costos, obligaciones y uso real antes de decidir continuidad o cierre.',
    prioridad: 'Media', area: 'Legal', subarea: 'Societario',
    responsable: 'Dirección', colaboradores: ['Contabilidad', 'Abogado CR'],
    origen: 'Informe integral de ordenamiento empresarial y plan de acción',
    fecha_creacion: '2026-10-14', fecha_compromiso: '2026-10-28', fecha_cierre: null,
    estado: 'Pendiente de validación', porcentaje_avance: 20,
    riesgo: 'Mantener una sociedad sin uso real genera costos y obligaciones fiscales innecesarias.',
    impacto: 'Legal y económico', urgencia: 'Media',
    evidencia_requerida: 'Carpeta societaria completa y decisión documentada de Dirección.',
    evidencia_cargada: false, bloqueo: null,
    dependencia: 'Información del abogado en Costa Rica',
    verificador: 'Dirección',
    criterio_cierre: 'Decisión de continuidad o cierre documentada con plan de ejecución.',
    criterio_eficacia: 'Plan ejecutado sin obligaciones vencidas en el trimestre siguiente.',
    comentarios: [
      { fecha: '2026-10-17', autor: 'Contabilidad', texto: 'Se solicita al abogado en CR el estado de obligaciones; la información aún no está confirmada (pendiente de validación).' }
    ],
    historial: [
      { fecha: '2026-10-14', autor: 'Secretaría de seguimiento', evento: 'Acción creada a partir de la reunión de seguimiento.' },
      { fecha: '2026-10-17', autor: 'Contabilidad', evento: 'Solicitud de información al abogado en Costa Rica.' }
    ],
    etiquetas: ['societario', 'Costa Rica', 'legal']
  },
  {
    id: 'M03', codigo: 'EQ-M03',
    titulo: 'Recuperación de uniformes y bienes',
    descripcion: 'Cierre ordenado con inventario: recuperar uniformes, llaves, teléfonos y demás bienes pendientes del personal saliente.',
    prioridad: 'Media', area: 'RR. HH.', subarea: 'Proceso de salida',
    responsable: 'RR. HH.', colaboradores: ['Administración'],
    origen: 'Informe integral de seguimiento financiero, operativo y de RR. HH.',
    fecha_creacion: '2026-10-14', fecha_compromiso: '2026-10-25', fecha_cierre: null,
    estado: 'En proceso', porcentaje_avance: 40,
    riesgo: 'Bienes de la empresa sin recuperar: pérdida patrimonial y precedente negativo en salidas.',
    impacto: 'Patrimonial', urgencia: 'Media',
    evidencia_requerida: 'Acta de entrega firmada o reclamación formal por bien no devuelto.',
    evidencia_cargada: false, bloqueo: null,
    dependencia: 'Localización del personal saliente',
    verificador: 'Administración',
    criterio_cierre: 'Inventario de bienes recuperado al 100% o reclamaciones radicadas.',
    criterio_eficacia: 'El proceso estándar de salida incorpora la devolución de bienes como paso obligatorio.',
    comentarios: [
      { fecha: '2026-10-18', autor: 'RR. HH.', texto: 'Recuperados uniformes de dos personas; pendientes llaves y un teléfono.' }
    ],
    historial: [
      { fecha: '2026-10-14', autor: 'Secretaría de seguimiento', evento: 'Acción creada a partir de la reunión de seguimiento.' },
      { fecha: '2026-10-18', autor: 'RR. HH.', evento: 'Avance al 40%: recuperación parcial.' }
    ],
    etiquetas: ['bienes', 'salida', 'inventario']
  },
  {
    id: 'M04', codigo: 'EQ-M04',
    titulo: 'Estado de internet, redes y equipos',
    descripcion: 'Ordenar pagos, accesos y comodatos: confirmar servicios activos, facturas pendientes, dueños de cuentas y retiro de equipos de terceros.',
    prioridad: 'Media', area: 'Administración', subarea: 'TI y servicios',
    responsable: 'Administración', colaboradores: ['TI externo', 'Comercial'],
    origen: 'Informe integral de seguimiento financiero, operativo y de RR. HH.',
    fecha_creacion: '2026-10-14', fecha_compromiso: '2026-10-28', fecha_cierre: null,
    estado: 'Abierta', porcentaje_avance: 10,
    riesgo: 'Servicios sin dueño claro: cortes por falta de pago, cuentas fuera de control y equipos de terceros sin comodato.',
    impacto: 'Operativo y documental', urgencia: 'Media',
    evidencia_requerida: 'Inventario de servicios, accesos y facturas al día.',
    evidencia_cargada: false, bloqueo: null,
    dependencia: 'Proveedores de internet y TI',
    verificador: 'Celia',
    criterio_cierre: 'Inventario aprobado con dueño asignado por servicio y comodatos firmados.',
    criterio_eficacia: 'Un ciclo de facturación sin servicios huérfanos ni duplicados.',
    comentarios: [],
    historial: [
      { fecha: '2026-10-14', autor: 'Secretaría de seguimiento', evento: 'Acción creada a partir de la reunión de seguimiento.' }
    ],
    etiquetas: ['TI', 'servicios', 'comodatos']
  },
  {
    id: 'M05', codigo: 'EQ-M05',
    titulo: 'Informe de resultados de Carleto',
    descripcion: 'Comparar contra expectativas reales: solicitar reporte de objetivos, actividades, logros y pendientes durante su período de contratación.',
    prioridad: 'Media', area: 'RR. HH.', subarea: 'Evaluación de gestión',
    responsable: 'Dirección', colaboradores: ['RR. HH.'],
    origen: 'Informe integral de seguimiento financiero, operativo y de RR. HH.',
    fecha_creacion: '2026-10-14', fecha_compromiso: '2026-10-24', fecha_cierre: null,
    estado: 'Pendiente de validación', porcentaje_avance: 30,
    riesgo: 'Decidir continuidad o cierre sin información validada expone a decisiones por rumores.',
    impacto: 'Personas y gestión', urgencia: 'Media',
    evidencia_requerida: 'Informe recibido y evaluación documentada contra objetivos.',
    evidencia_cargada: false, bloqueo: null,
    dependencia: 'Entrega del informe por parte del evaluado',
    verificador: 'Dirección',
    criterio_cierre: 'Informe recibido, contrastado y decisión documentada.',
    criterio_eficacia: 'Los acuerdos derivados de la evaluación se cumplen en el siguiente ciclo.',
    comentarios: [
      { fecha: '2026-10-16', autor: 'RR. HH.', texto: 'Informe solicitado formalmente; los resultados reportados aún no han sido contrastados (pendiente de validación).' }
    ],
    historial: [
      { fecha: '2026-10-14', autor: 'Secretaría de seguimiento', evento: 'Acción creada a partir de la reunión de seguimiento.' },
      { fecha: '2026-10-16', autor: 'RR. HH.', evento: 'Solicitud formal del informe enviada.' }
    ],
    etiquetas: ['evaluación', 'personas', 'informe']
  },
  {
    id: 'M06', codigo: 'EQ-M06',
    titulo: 'Conciliación de comisiones',
    descripcion: 'Regla clara por venta cobrada: cruzar comisión, margen, cobro y condiciones aprobadas por proyecto antes de pagar comisiones.',
    prioridad: 'Media', area: 'Finanzas', subarea: 'Comisiones',
    responsable: 'Celia', colaboradores: ['Karen'],
    origen: 'Informe integral de seguimiento financiero, operativo y de RR. HH.',
    fecha_creacion: '2026-10-14', fecha_compromiso: '2026-10-29', fecha_cierre: null,
    estado: 'En proceso', porcentaje_avance: 50,
    riesgo: 'Comisiones pagadas sin regla clara generan disputas internas y fuga de margen.',
    impacto: 'Financiero y clima laboral', urgencia: 'Media',
    evidencia_requerida: 'Cálculo de comisiones conciliado y comunicado a los involucrados.',
    evidencia_cargada: false, bloqueo: null,
    dependencia: 'Estado de cobro por proyecto (M24)',
    verificador: 'Ricardo (Dirección)',
    criterio_cierre: 'Esquema de comisiones fijo, documentado y aceptado por las partes.',
    criterio_eficacia: 'Dos ciclos de pago sin disputas de comisiones.',
    comentarios: [
      { fecha: '2026-10-18', autor: 'Celia', texto: 'Cruzadas las comisiones de tres proyectos; se detectó una diferencia por condición no documentada.' }
    ],
    historial: [
      { fecha: '2026-10-14', autor: 'Secretaría de seguimiento', evento: 'Acción creada a partir de la reunión de seguimiento.' },
      { fecha: '2026-10-18', autor: 'Celia', evento: 'Avance al 50%: conciliación parcial.' }
    ],
    etiquetas: ['comisiones', 'ventas', 'conciliación']
  },
  {
    id: 'M07', codigo: 'EQ-M07',
    titulo: 'Análisis de compra o permanencia de vehículo',
    descripcion: 'Comparar costo total y riesgo: evaluar si conviene comprar el vehículo en Venezuela, importarlo o mantenerlo donde está.',
    prioridad: 'Media', area: 'Dirección', subarea: 'Decisión de activos',
    responsable: 'Dirección', colaboradores: ['Compras'],
    origen: 'Informe integral de seguimiento financiero, operativo y de RR. HH.',
    fecha_creacion: '2026-10-15', fecha_compromiso: '2026-11-03', fecha_cierre: null,
    estado: 'Abierta', porcentaje_avance: 10,
    riesgo: 'Decisión de activo sin caso económico puede inmovilizar dinero o generar costos de importación no previstos.',
    impacto: 'Económico', urgencia: 'Media',
    evidencia_requerida: 'Caso económico comparativo y decisión documentada.',
    evidencia_cargada: false, bloqueo: null,
    dependencia: 'Cotizaciones de compra e importación',
    verificador: 'Dirección',
    criterio_cierre: 'Decisión aprobada con caso económico y plan de ejecución.',
    criterio_eficacia: 'La opción ejecutada se mantiene dentro del costo proyectado.',
    comentarios: [],
    historial: [
      { fecha: '2026-10-15', autor: 'Secretaría de seguimiento', evento: 'Acción creada a partir de la reunión de seguimiento.' }
    ],
    etiquetas: ['activos', 'vehículos', 'importación']
  },
  {
    id: 'M08', codigo: 'EQ-M08',
    titulo: 'Supervisión de proyectos',
    descripcion: 'Una vista común de avance y bloqueos: crear reportes de visitas, incidentes, horas, decisiones y próximos hitos por proyecto.',
    prioridad: 'Media', area: 'Operaciones', subarea: 'Control de proyectos',
    responsable: 'Vladimir', colaboradores: ['Daniel'],
    origen: 'Informe integral de ordenamiento empresarial y plan de acción',
    fecha_creacion: '2026-10-14', fecha_compromiso: '2026-11-03', fecha_cierre: null,
    estado: 'En proceso', porcentaje_avance: 35,
    riesgo: 'Sin supervisión sistemática, los desvíos de proyectos se detectan tarde y por reclamo del cliente.',
    impacto: 'Operativo y comercial', urgencia: 'Media',
    evidencia_requerida: 'Reportes semanales por proyecto emitidos de forma sostenida.',
    evidencia_cargada: false, bloqueo: null,
    dependencia: 'Formato único de reporte',
    verificador: 'Dirección',
    criterio_cierre: 'Cuatro reportes semanales consecutivos emitidos y revisados en reunión de control.',
    criterio_eficacia: 'Los bloqueos reportados reciben decisión en la semana siguiente.',
    comentarios: [
      { fecha: '2026-10-19', autor: 'Vladimir', texto: 'Formato de reporte piloto aplicado en dos proyectos; se ajusta antes de generalizar.' }
    ],
    historial: [
      { fecha: '2026-10-14', autor: 'Secretaría de seguimiento', evento: 'Acción creada a partir de la reunión de seguimiento.' },
      { fecha: '2026-10-19', autor: 'Vladimir', evento: 'Avance al 35%: piloto de reporte en curso.' }
    ],
    etiquetas: ['proyectos', 'supervisión', 'reportes']
  },
  {
    id: 'M09', codigo: 'EQ-M09',
    titulo: 'Reglas de uso de vehículos',
    descripcion: 'Conductor, combustible y daños controlados: definir asignación de vehículos, registro de kilometraje, mantenimiento, multas y reporte de incidentes.',
    prioridad: 'Media', area: 'Administración', subarea: 'Flota liviana',
    responsable: 'Administración', colaboradores: ['Operaciones'],
    origen: 'Informe integral de ordenamiento empresarial y plan de acción',
    fecha_creacion: '2026-10-15', fecha_compromiso: '2026-11-03', fecha_cierre: null,
    estado: 'Abierta', porcentaje_avance: 10,
    riesgo: 'Vehículos sin reglas claras: gasto de combustible sin control, multas sin responsable y daños sin reporte.',
    impacto: 'Económico y administrativo', urgencia: 'Media',
    evidencia_requerida: 'Política de uso publicada, inventario y registros de kilometraje activos.',
    evidencia_cargada: false, bloqueo: null,
    dependencia: null,
    verificador: 'Celia',
    criterio_cierre: 'Política aprobada y registros en uso por todos los conductores asignados.',
    criterio_eficacia: 'Monitoreo mensual sin desvíos injustificados de combustible o kilometraje.',
    comentarios: [],
    historial: [
      { fecha: '2026-10-15', autor: 'Secretaría de seguimiento', evento: 'Acción creada a partir de la reunión de seguimiento.' }
    ],
    etiquetas: ['vehículos', 'política', 'combustible']
  },
  {
    id: 'M10', codigo: 'EQ-M10',
    titulo: 'Expedientes de reparación por activo',
    descripcion: 'Cada reparación con soporte completo: cerrar los expedientes de LTM 1060, Sany 2185 y Demag 400 con diagnóstico, repuesto utilizado y prueba final.',
    prioridad: 'Media', area: 'Taller / Mantenimiento', subarea: 'Historia técnica',
    responsable: 'Manuel', colaboradores: ['Marcial'],
    origen: 'Informe integral de seguimiento financiero, operativo y de RR. HH.',
    fecha_creacion: '2026-10-14', fecha_compromiso: '2026-10-27', fecha_cierre: null,
    estado: 'En proceso', porcentaje_avance: 60,
    riesgo: 'Sin historia técnica por activo se repiten diagnósticos, se compran repuestos equivocados y no hay trazabilidad.',
    impacto: 'Operativo y económico', urgencia: 'Media',
    evidencia_requerida: 'Órdenes cerradas y hojas de vida actualizadas por activo.',
    evidencia_cargada: false, bloqueo: null,
    dependencia: 'Órdenes de trabajo históricas',
    verificador: 'Vladimir (Operaciones)',
    criterio_cierre: 'Tres expedientes cerrados con auditoría interna sin observaciones mayores.',
    criterio_eficacia: 'La siguiente reparación de cada activo consulta su expediente y reduce tiempo de diagnóstico.',
    comentarios: [
      { fecha: '2026-10-18', autor: 'Marcial', texto: 'Expediente de LTM 1060 completo; Sany 2185 al 70%; Demag 400 pendiente de pruebas.' }
    ],
    historial: [
      { fecha: '2026-10-14', autor: 'Secretaría de seguimiento', evento: 'Acción creada a partir de la reunión de seguimiento.' },
      { fecha: '2026-10-18', autor: 'Marcial', evento: 'Avance al 60%: un expediente cerrado.' }
    ],
    etiquetas: ['mantenimiento', 'expedientes', 'activos']
  },
  {
    id: 'M11', codigo: 'EQ-M11',
    titulo: 'Trazabilidad de horímetros y servicios',
    descripcion: 'Próximos vencimientos claros: validar horas reales de cada equipo y programar servicios de 250/500 horas conforme a fabricante.',
    prioridad: 'Media', area: 'Taller / Mantenimiento', subarea: 'Mantenimiento programado',
    responsable: 'Manuel', colaboradores: ['Vladimir'],
    origen: 'Informe integral de ordenamiento empresarial y plan de acción',
    fecha_creacion: '2026-10-14', fecha_compromiso: '2026-10-26', fecha_cierre: null,
    estado: 'Implementada', porcentaje_avance: 100,
    riesgo: 'Servicios por horómetro vencidos sin alerta acortan la vida útil de los equipos y elevan fallas en campo.',
    impacto: 'Operativo y económico', urgencia: 'Media',
    evidencia_requerida: 'Programa de mantenimiento cargado con alertas de vencimiento por equipo.',
    evidencia_cargada: true, bloqueo: null,
    dependencia: 'Lectura confiable de horímetros en campo',
    verificador: 'Vladimir (Operaciones)',
    criterio_cierre: 'Programa verificado en uso con alertas activas para todos los equipos.',
    criterio_eficacia: 'Cruce con partes y combustible sin inconsistencias durante un mes.',
    comentarios: [
      { fecha: '2026-10-18', autor: 'Manuel', texto: 'Programa cargado con alertas. Pendiente verificar en campo que las lecturas de horímetros se reportan de forma consistente antes de cerrar.' }
    ],
    historial: [
      { fecha: '2026-10-14', autor: 'Secretaría de seguimiento', evento: 'Acción creada a partir de la reunión de seguimiento.' },
      { fecha: '2026-10-17', autor: 'Manuel', evento: 'Evidencia cargada: programa de mantenimiento con alertas.' },
      { fecha: '2026-10-17', autor: 'Manuel', evento: 'Cambio de estado: En proceso → Implementada.' }
    ],
    etiquetas: ['mantenimiento', 'horímetros', 'programa']
  },
  {
    id: 'M12', codigo: 'EQ-M12',
    titulo: 'Coordinación Costa Rica y retorno de técnico',
    descripcion: 'Nada se desmoviliza sin inventario: organizar desarme, embalaje, transporte y retorno del personal o equipo vinculado al trabajo en Costa Rica.',
    prioridad: 'Media', area: 'Logística', subarea: 'Desmovilización internacional',
    responsable: 'Vladimir', colaboradores: ['Daniel'],
    origen: 'Informe integral de seguimiento financiero, operativo y de RR. HH.',
    fecha_creacion: '2026-10-15', fecha_compromiso: '2026-10-29', fecha_cierre: null,
    estado: 'Abierta', porcentaje_avance: 15,
    riesgo: 'Desmovilizar sin inventario expone a pérdida de herramientas, equipos y costos no conciliados.',
    impacto: 'Operativo y económico', urgencia: 'Media',
    evidencia_requerida: 'Packing list, constancia de recepción y conciliación de costos.',
    evidencia_cargada: false, bloqueo: null,
    dependencia: 'Fecha de liberación del cliente en Costa Rica',
    verificador: 'Dirección',
    criterio_cierre: 'Personal y equipo retornados con inventario conciliado.',
    criterio_eficacia: 'Conciliación final de costos y activos sin diferencias.',
    comentarios: [],
    historial: [
      { fecha: '2026-10-15', autor: 'Secretaría de seguimiento', evento: 'Acción creada a partir de la reunión de seguimiento.' }
    ],
    etiquetas: ['Costa Rica', 'desmovilización', 'logística']
  },
  {
    id: 'M13', codigo: 'EQ-M13',
    titulo: 'Cobertura de operadores y suplentes',
    descripcion: 'Evitar huecos de capacidad: publicar cobertura por proyecto, suplentes designados, horarios y control de fatiga.',
    prioridad: 'Media', area: 'RR. HH.', subarea: 'Planificación de personal operativo',
    responsable: 'Vladimir', colaboradores: ['RR. HH.'],
    origen: 'Informe integral de ordenamiento empresarial y plan de acción',
    fecha_creacion: '2026-10-14', fecha_compromiso: '2026-10-26', fecha_cierre: null,
    estado: 'En proceso', porcentaje_avance: 45,
    riesgo: 'Sin suplentes definidos, una ausencia detiene un proyecto o fuerza horas extra con riesgo de fatiga.',
    impacto: 'Operativo y personas', urgencia: 'Media',
    evidencia_requerida: 'Matriz de cobertura publicada y seguimiento de fatiga activo.',
    evidencia_cargada: false, bloqueo: null,
    dependencia: 'Resultado de evaluación de operadores (H15)',
    verificador: 'RR. HH.',
    criterio_cierre: 'Matriz de cobertura aprobada y actualizada ante la primera ausencia real.',
    criterio_eficacia: 'Ningún proyecto detenido por falta de operador en el mes siguiente.',
    comentarios: [
      { fecha: '2026-10-19', autor: 'Vladimir', texto: 'Matriz preliminar cubre 2 de 3 proyectos activos; falta designar suplente para grúa de mayor capacidad.' }
    ],
    historial: [
      { fecha: '2026-10-14', autor: 'Secretaría de seguimiento', evento: 'Acción creada a partir de la reunión de seguimiento.' },
      { fecha: '2026-10-19', autor: 'Vladimir', evento: 'Avance al 45%: matriz preliminar.' }
    ],
    etiquetas: ['operadores', 'cobertura', 'fatiga']
  },
  {
    id: 'M14', codigo: 'EQ-M14',
    titulo: 'Evaluaciones objetivas de personal',
    descripcion: 'Sin decisiones por rumores: completar evaluaciones con hechos, retroalimentación documentada y revisión legal previa a cualquier salida.',
    prioridad: 'Media', area: 'RR. HH.', subarea: 'Gestión de desempeño',
    responsable: 'Dirección', colaboradores: ['RR. HH.'],
    origen: 'Informe integral de seguimiento financiero, operativo y de RR. HH.',
    fecha_creacion: '2026-10-15', fecha_compromiso: '2026-11-05', fecha_cierre: null,
    estado: 'Abierta', porcentaje_avance: 20,
    riesgo: 'Decisiones de personal sin evaluación objetiva generan contingencia laboral y pérdida de talento clave.',
    impacto: 'Laboral y personas', urgencia: 'Media',
    evidencia_requerida: 'Evaluaciones completadas con retroalimentación y plan individual.',
    evidencia_cargada: false, bloqueo: null,
    dependencia: 'Formato de evaluación aprobado',
    verificador: 'Asesor laboral (externo)',
    criterio_cierre: 'Evaluaciones del personal clave completadas y archivadas con planes individuales.',
    criterio_eficacia: 'Capacitación o decisión sustentada ejecutada en cada caso evaluado.',
    comentarios: [],
    historial: [
      { fecha: '2026-10-15', autor: 'Secretaría de seguimiento', evento: 'Acción creada a partir de la reunión de seguimiento.' }
    ],
    etiquetas: ['desempeño', 'evaluación', 'personas']
  },

  {
    id: 'M15', codigo: 'EQ-M15',
    titulo: 'Organigrama y delegaciones formales',
    descripcion: 'Quién autoriza qué: definir organigrama, funciones temporales y límites de aprobación para comprar, pagar, contratar y liberar equipos.',
    prioridad: 'Media', area: 'Dirección', subarea: 'Estructura organizacional',
    responsable: 'Dirección', colaboradores: ['Celia'],
    origen: 'Informe integral de ordenamiento empresarial y plan de acción',
    fecha_creacion: '2026-10-14', fecha_compromiso: '2026-10-23', fecha_cierre: null,
    estado: 'En proceso', porcentaje_avance: 55,
    riesgo: 'Sin delegaciones formales, cualquier decisión queda en gris: pagos y contrataciones sin control real.',
    impacto: 'Gestión y control interno', urgencia: 'Media',
    evidencia_requerida: 'Organigrama publicado y matriz RACI / de delegación aprobada.',
    evidencia_cargada: false, bloqueo: null,
    dependencia: null,
    verificador: 'Secretaría de seguimiento',
    criterio_cierre: 'Organigrama y matriz comunicados a toda la organización y en uso diario.',
    criterio_eficacia: 'Las aprobaciones del mes siguiente respetan la matriz sin excepciones no autorizadas.',
    comentarios: [
      { fecha: '2026-10-18', autor: 'Dirección', texto: 'Borrador del organigrama circulado para comentarios; matriz de delegación en construcción.' }
    ],
    historial: [
      { fecha: '2026-10-14', autor: 'Secretaría de seguimiento', evento: 'Acción creada a partir de la reunión de seguimiento.' },
      { fecha: '2026-10-18', autor: 'Dirección', evento: 'Avance al 55%: borrador en consulta.' }
    ],
    etiquetas: ['organigrama', 'delegación', 'RACI']
  },
  {
    id: 'M16', codigo: 'EQ-M16',
    titulo: 'Inventario de teléfonos y cuentas',
    descripcion: 'Recuperar información corporativa: inventariar teléfonos, accesos y respaldos, y retirar cuentas de personal saliente respetando la privacidad.',
    prioridad: 'Media', area: 'Administración', subarea: 'Activos de información',
    responsable: 'Administración', colaboradores: ['TI externo', 'RR. HH.'],
    origen: 'Informe integral de seguimiento financiero, operativo y de RR. HH.',
    fecha_creacion: '2026-10-15', fecha_compromiso: '2026-10-30', fecha_cierre: null,
    estado: 'Abierta', porcentaje_avance: 10,
    riesgo: 'Información corporativa en manos de personal saliente: riesgo de pérdida de datos y de confidencialidad.',
    impacto: 'Información y legal', urgencia: 'Media',
    evidencia_requerida: 'Actas de entrega y prueba de respaldo/restauración de la información.',
    evidencia_cargada: false, bloqueo: null,
    dependencia: 'Coordinación con proceso de salida (M03)',
    verificador: 'Dirección',
    criterio_cierre: 'Inventario completo con cuentas migradas y respaldos verificados.',
    criterio_eficacia: 'Proceso estándar de alta y baja de cuentas funcionando en el siguiente ingreso/salida.',
    comentarios: [],
    historial: [
      { fecha: '2026-10-15', autor: 'Secretaría de seguimiento', evento: 'Acción creada a partir de la reunión de seguimiento.' }
    ],
    etiquetas: ['TI', 'cuentas', 'respaldo']
  },
  {
    id: 'M17', codigo: 'EQ-M17',
    titulo: 'Directorio y actas por área',
    descripcion: 'Un solo canal de seguimiento: publicar el directorio de correos, distribuir la minuta de cada reunión y pedir reporte breve por área.',
    prioridad: 'Media', area: 'Gestión documental / seguimiento', subarea: 'Comunicación de control',
    responsable: 'Secretaría de seguimiento', colaboradores: ['Todas las áreas'],
    origen: 'Informe integral de ordenamiento empresarial y plan de acción',
    fecha_creacion: '2026-10-13', fecha_compromiso: '2026-10-17', fecha_cierre: '2026-10-17',
    estado: 'Cerrada', porcentaje_avance: 100,
    riesgo: 'Acuerdos dispersos entre chats y correos sin un canal único de seguimiento.',
    impacto: 'Gestión', urgencia: 'Media',
    evidencia_requerida: 'Directorio publicado, acuses de recibo y reportes por área archivados.',
    evidencia_cargada: true, bloqueo: null,
    dependencia: null,
    verificador: 'Dirección',
    criterio_cierre: 'Directorio en uso y primera ronda de reportes por área recibida completa.',
    criterio_eficacia: 'El canal se mantiene como medio oficial en las reuniones siguientes.',
    comentarios: [
      { fecha: '2026-10-17', autor: 'Secretaría de seguimiento', texto: 'Directorio publicado y primeros reportes recibidos de todas las áreas. Cierre verificado por Dirección.' }
    ],
    historial: [
      { fecha: '2026-10-13', autor: 'Secretaría de seguimiento', evento: 'Acción creada a partir de la reunión de seguimiento.' },
      { fecha: '2026-10-16', autor: 'Secretaría de seguimiento', evento: 'Evidencia cargada: directorio y acuses.' },
      { fecha: '2026-10-17', autor: 'Dirección', evento: 'Verificación de cierre. Estado: Implementada → Cerrada.' }
    ],
    etiquetas: ['directorio', 'minutas', 'seguimiento']
  },
  {
    id: 'M18', codigo: 'EQ-M18',
    titulo: 'Expedientes en plataformas de clientes',
    descripcion: 'Altas y bajas al día: cargar contratos y hojas de vida del personal requeridas por las plataformas de los clientes.',
    prioridad: 'Media', area: 'RR. HH.', subarea: 'Habilitación ante clientes',
    responsable: 'Ronnie', colaboradores: ['Karen', 'RR. HH.'],
    origen: 'Informe integral de seguimiento financiero, operativo y de RR. HH.',
    fecha_creacion: '2026-10-14', fecha_compromiso: '2026-10-25', fecha_cierre: null,
    estado: 'En proceso', porcentaje_avance: 65,
    riesgo: 'Personal no habilitado en plataforma no puede ingresar a sitio: retrasos y penalidades con clientes.',
    impacto: 'Operativo y comercial', urgencia: 'Media',
    evidencia_requerida: 'Acuses de carga en plataformas y lista vigente de personal habilitado.',
    evidencia_cargada: false, bloqueo: null,
    dependencia: 'Documentos actualizados del personal',
    verificador: 'Karen (Comercial)',
    criterio_cierre: 'Personal requerido 100% habilitado con acuses archivados.',
    criterio_eficacia: 'Control de vencimientos de documentos activo, sin inhabilitaciones sorpresa.',
    comentarios: [
      { fecha: '2026-10-18', autor: 'Ronnie', texto: 'Cargados los expedientes de 6 de 9 personas; faltan dos hojas de vida actualizadas.' }
    ],
    historial: [
      { fecha: '2026-10-14', autor: 'Secretaría de seguimiento', evento: 'Acción creada a partir de la reunión de seguimiento.' },
      { fecha: '2026-10-18', autor: 'Ronnie', evento: 'Avance al 65%: carga parcial en plataformas.' }
    ],
    etiquetas: ['plataformas', 'clientes', 'habilitación']
  },
  {
    id: 'M19', codigo: 'EQ-M19',
    titulo: 'Cierres contables pendientes',
    descripcion: 'Estados y antigüedad confiables: completar cierres contables, conciliaciones y reportes de cuentas por cobrar y pagar pendientes.',
    prioridad: 'Media', area: 'Finanzas', subarea: 'Contabilidad',
    responsable: 'Ricardo', colaboradores: ['Celia'],
    origen: 'Informe integral de seguimiento financiero, operativo y de RR. HH.',
    fecha_creacion: '2026-10-14', fecha_compromiso: '2026-10-30', fecha_cierre: null,
    estado: 'En proceso', porcentaje_avance: 30,
    riesgo: 'Sin cierres al día, la información financiera para decidir (caja, cartera, deuda) no es confiable.',
    impacto: 'Financiero y de gestión', urgencia: 'Media',
    evidencia_requerida: 'Balances, conciliaciones bancarias y reportes de antigüedad actualizados.',
    evidencia_cargada: false, bloqueo: null,
    dependencia: 'Información de bancos y de facturación (H10, M24)',
    verificador: 'Dirección',
    criterio_cierre: 'Cierres pendientes completados y calendario fijo de cierre establecido.',
    criterio_eficacia: 'Próximo cierre mensual emitido dentro del calendario sin atraso.',
    comentarios: [
      { fecha: '2026-10-19', autor: 'Ricardo', texto: 'Conciliación bancaria de agosto cerrada; septiembre en proceso.' }
    ],
    historial: [
      { fecha: '2026-10-14', autor: 'Secretaría de seguimiento', evento: 'Acción creada a partir de la reunión de seguimiento.' },
      { fecha: '2026-10-19', autor: 'Ricardo', evento: 'Avance al 30%: conciliación de agosto completada.' }
    ],
    etiquetas: ['contabilidad', 'cierres', 'conciliación']
  },
  {
    id: 'M20', codigo: 'EQ-M20',
    titulo: 'Evaluación formal de proveedores',
    descripcion: 'Más que precio: comparar capacidad, cumplimiento, plazo, calidad y condiciones de pago antes de aprobar proveedores críticos.',
    prioridad: 'Media', area: 'Compras', subarea: 'Gestión de proveedores',
    responsable: 'Marcial', colaboradores: ['Celia'],
    origen: 'Informe integral de ordenamiento empresarial y plan de acción',
    fecha_creacion: '2026-10-15', fecha_compromiso: '2026-11-06', fecha_cierre: null,
    estado: 'Abierta', porcentaje_avance: 15,
    riesgo: 'Comprar solo por precio expone a repuestos incorrectos, atrasos y sobrecostos por garantías.',
    impacto: 'Operativo y económico', urgencia: 'Media',
    evidencia_requerida: 'Comparativos documentados y lista de proveedores aprobados.',
    evidencia_cargada: false, bloqueo: null,
    dependencia: 'Historial de compras',
    verificador: 'Dirección',
    criterio_cierre: 'Lista de proveedores aprobada publicada con criterios de evaluación.',
    criterio_eficacia: 'Revisión periódica con al menos una baja o mejora sustentada por desempeño.',
    comentarios: [],
    historial: [
      { fecha: '2026-10-15', autor: 'Secretaría de seguimiento', evento: 'Acción creada a partir de la reunión de seguimiento.' }
    ],
    etiquetas: ['proveedores', 'compras', 'evaluación']
  },
  {
    id: 'M21', codigo: 'EQ-M21',
    titulo: 'Control de combustible por equipo',
    descripcion: 'Litros, horómetro y responsable: implantar registro de combustible por equipo con vales, proveedor, saldo e investigación de diferencias.',
    prioridad: 'Media', area: 'Operaciones', subarea: 'Control de combustible',
    responsable: 'Manuel', colaboradores: ['Celia', 'Operaciones'],
    origen: 'Informe integral de ordenamiento empresarial y plan de acción',
    fecha_creacion: '2026-10-15', fecha_compromiso: '2026-11-05', fecha_cierre: null,
    estado: 'En proceso', porcentaje_avance: 25,
    riesgo: 'Sin control por equipo, el combustible —uno de los mayores costos— queda expuesto a fugas y desvíos.',
    impacto: 'Económico y ambiental', urgencia: 'Media',
    evidencia_requerida: 'Vales de combustible, balance litros/horas y análisis de diferencias.',
    evidencia_cargada: false, bloqueo: null,
    dependencia: 'Trazabilidad de horímetros (M11)',
    verificador: 'Celia',
    criterio_cierre: 'Registro funcionando en todos los equipos con primer balance mensual emitido.',
    criterio_eficacia: 'Diferencias investigadas y explicadas en la revisión semanal durante un mes.',
    comentarios: [
      { fecha: '2026-10-19', autor: 'Manuel', texto: 'Formato de vale definido; se prueba con dos equipos antes de generalizar.' }
    ],
    historial: [
      { fecha: '2026-10-15', autor: 'Secretaría de seguimiento', evento: 'Acción creada a partir de la reunión de seguimiento.' },
      { fecha: '2026-10-19', autor: 'Manuel', evento: 'Avance al 25%: piloto de vales.' }
    ],
    etiquetas: ['combustible', 'control', 'costos']
  },
  {
    id: 'M22', codigo: 'EQ-M22',
    titulo: 'Inspección de patio y taller',
    descripcion: 'Corregir fugas y ordenar residuos: recorrer patio y taller para contener derrames y ordenar materiales, residuos y equipos.',
    prioridad: 'Media', area: 'Ambiente', subarea: 'Orden y control ambiental',
    responsable: 'Manuel', colaboradores: ['Seguridad/Ambiente'],
    origen: 'Hallazgo operativo en patio y taller',
    fecha_creacion: '2026-10-14', fecha_compromiso: '2026-10-19', fecha_cierre: null,
    estado: 'Pendiente de eficacia', porcentaje_avance: 100,
    riesgo: 'Derrames sin contener y residuos sin orden: riesgo ambiental, de seguridad y de imagen ante visitas de clientes.',
    impacto: 'Ambiental y seguridad', urgencia: 'Media',
    evidencia_requerida: 'Informe de inspección con correcciones ejecutadas y evidencia fotográfica.',
    evidencia_cargada: true, bloqueo: null,
    dependencia: null,
    verificador: 'Seguridad/Ambiente',
    criterio_cierre: 'Nueva ronda de verificación sin hallazgos repetidos.',
    criterio_eficacia: 'Dos inspecciones consecutivas sin fugas ni residuos fuera de lugar.',
    comentarios: [
      { fecha: '2026-10-19', autor: 'Manuel', texto: 'Inspección ejecutada y correcciones aplicadas. Se programa la ronda de verificación para comprobar eficacia antes de cerrar.' }
    ],
    historial: [
      { fecha: '2026-10-14', autor: 'Secretaría de seguimiento', evento: 'Acción creada a partir de la reunión de seguimiento.' },
      { fecha: '2026-10-18', autor: 'Manuel', evento: 'Evidencia cargada: informe de inspección y correcciones.' },
      { fecha: '2026-10-19', autor: 'Manuel', evento: 'Cambio de estado: En proceso → Pendiente de eficacia.' }
    ],
    etiquetas: ['ambiente', 'patio', 'taller', 'residuos']
  },
  {
    id: 'M23', codigo: 'EQ-M23',
    titulo: 'Registro de comunicaciones y reclamaciones',
    descripcion: 'Canal contractual y fecha límite: control único de misivas, reclamos, seguimiento y acuses con clientes y terceros.',
    prioridad: 'Media', area: 'Legal', subarea: 'Comunicaciones formales',
    responsable: 'Karen', colaboradores: ['Asesor legal', 'Daniel'],
    origen: 'Informe integral de ordenamiento empresarial y plan de acción',
    fecha_creacion: '2026-10-15', fecha_compromiso: '2026-10-31', fecha_cierre: null,
    estado: 'Abierta', porcentaje_avance: 20,
    riesgo: 'Reclamos sin registro vencen sin respuesta y debilitan la posición contractual de la empresa.',
    impacto: 'Legal y comercial', urgencia: 'Media',
    evidencia_requerida: 'Registro único activo y cartas enviadas con acuse.',
    evidencia_cargada: false, bloqueo: null,
    dependencia: null,
    verificador: 'Asesor legal (externo)',
    criterio_cierre: 'Registro en uso con todos los reclamos vigentes cargados y con fecha límite.',
    criterio_eficacia: 'Escalamiento automático por vencimiento probado en un caso real.',
    comentarios: [],
    historial: [
      { fecha: '2026-10-15', autor: 'Secretaría de seguimiento', evento: 'Acción creada a partir de la reunión de seguimiento.' }
    ],
    etiquetas: ['reclamos', 'cartas', 'contratos']
  },
  {
    id: 'M24', codigo: 'EQ-M24',
    titulo: 'Antigüedad de cartera y plan de cobro',
    descripcion: 'Cobrar con ritmo semanal: consolidar facturas por edad y planificar el seguimiento de cobro por cliente y proyecto.',
    prioridad: 'Media', area: 'Finanzas', subarea: 'Cuentas por cobrar',
    responsable: 'Contabilidad', colaboradores: ['Comercial'],
    origen: 'Informe integral de seguimiento financiero, operativo y de RR. HH.',
    fecha_creacion: '2026-10-14', fecha_compromiso: '2026-10-24', fecha_cierre: null,
    estado: 'En proceso', porcentaje_avance: 70,
    riesgo: 'Cartera envejecida sin gestión reduce la caja disponible para obligaciones críticas.',
    impacto: 'Financiero', urgencia: 'Media',
    evidencia_requerida: 'Cartera conciliada por antigüedad y compromisos de cobro documentados.',
    evidencia_cargada: false, bloqueo: null,
    dependencia: 'Facturación al día (H10)',
    verificador: 'Ricardo (Dirección)',
    criterio_cierre: 'Plan de cobro aprobado con semáforo de facturas vencidas en revisión semanal.',
    criterio_eficacia: 'Reducción medible de la cartera mayor a 30 días en el primer mes.',
    comentarios: [
      { fecha: '2026-10-18', autor: 'Contabilidad', texto: 'Cartera consolidada por edades; se definieron compromisos de cobro con dos clientes principales.' }
    ],
    historial: [
      { fecha: '2026-10-14', autor: 'Secretaría de seguimiento', evento: 'Acción creada a partir de la reunión de seguimiento.' },
      { fecha: '2026-10-18', autor: 'Contabilidad', evento: 'Avance al 70%: cartera consolidada.' }
    ],
    etiquetas: ['cartera', 'cobro', 'caja']
  },
  {
    id: 'M25', codigo: 'EQ-M25',
    titulo: 'Plan de retención del personal clave',
    descripcion: 'Reducir riesgo de salida: identificar puestos críticos, posibles reemplazos, motivación, carga de trabajo y acciones concretas de retención.',
    prioridad: 'Media', area: 'RR. HH.', subarea: 'Retención de talento',
    responsable: 'Dirección', colaboradores: ['RR. HH.'],
    origen: 'Informe integral de ordenamiento empresarial y plan de acción',
    fecha_creacion: '2026-10-15', fecha_compromiso: '2026-11-10', fecha_cierre: null,
    estado: 'Abierta', porcentaje_avance: 10,
    riesgo: 'La salida de personal clave en este momento comprometería la continuidad operativa y de conocimiento.',
    impacto: 'Personas y continuidad', urgencia: 'Media',
    evidencia_requerida: 'Mapa de puestos críticos y plan de retención por persona.',
    evidencia_cargada: false, bloqueo: null,
    dependencia: 'Evaluaciones de personal (M14)',
    verificador: 'Dirección',
    criterio_cierre: 'Mapa aprobado con acciones de retención asignadas y fechadas.',
    criterio_eficacia: 'Monitoreo de clima sin alertas de salida en el trimestre.',
    comentarios: [],
    historial: [
      { fecha: '2026-10-15', autor: 'Secretaría de seguimiento', evento: 'Acción creada a partir de la reunión de seguimiento.' }
    ],
    etiquetas: ['retención', 'talento', 'personas']
  },
  {
    id: 'M26', codigo: 'EQ-M26',
    titulo: 'Método de investigación de incidentes',
    descripcion: 'Separar hechos y responsabilidades: estandarizar cómo investigar eventos técnicos sin culpar antes de verificar.',
    prioridad: 'Media', area: 'Ingeniería', subarea: 'Investigación técnica',
    responsable: 'Por asignar', colaboradores: ['Dirección', 'Operaciones'],
    origen: 'Informe integral de ordenamiento empresarial y plan de acción',
    fecha_creacion: '2026-10-15', fecha_compromiso: '2026-11-03', fecha_cierre: null,
    estado: 'Pendiente de validación', porcentaje_avance: 5,
    riesgo: 'Sin método, cada incidente se investiga distinto: conclusiones débiles y responsabilidades mal asignadas.',
    impacto: 'Gestión y seguridad', urgencia: 'Media',
    evidencia_requerida: 'Formato de investigación aprobado y usado en eventos recientes.',
    evidencia_cargada: false, bloqueo: null,
    dependencia: 'Designación de responsable (alerta activa: acción sin responsable único)',
    verificador: 'Dirección',
    criterio_cierre: 'Formato aprobado, responsable designado y método aplicado a un incidente real.',
    criterio_eficacia: 'Lecciones aprendidas documentadas y compartidas en el siguiente evento.',
    comentarios: [
      { fecha: '2026-10-17', autor: 'Dirección', texto: 'El alcance del método está en discusión; además falta designar el responsable único (ver H25).' }
    ],
    historial: [
      { fecha: '2026-10-15', autor: 'Secretaría de seguimiento', evento: 'Acción creada a partir de la reunión de seguimiento.' },
      { fecha: '2026-10-17', autor: 'Dirección', evento: 'Registrada alerta: acción sin responsable único asignado.' }
    ],
    etiquetas: ['incidentes', 'investigación', 'método']
  },
  {
    id: 'M27', codigo: 'EQ-M27',
    titulo: 'Tablero semanal único',
    descripcion: 'Toda decisión en una sola vista: revisar las 59 acciones en un único tablero antes de abrir temas nuevos en cada reunión.',
    prioridad: 'Media', area: 'Gestión documental / seguimiento', subarea: 'Disciplina de reunión',
    responsable: 'Dirección', colaboradores: ['Secretaría de seguimiento'],
    origen: 'Informe integral de ordenamiento empresarial y plan de acción',
    fecha_creacion: '2026-10-13', fecha_compromiso: '2026-10-20', fecha_cierre: null,
    estado: 'Implementada', porcentaje_avance: 100,
    riesgo: 'Sin tablero único, las reuniones vuelven a ser conversaciones sin control ni trazabilidad.',
    impacto: 'Gestión y control', urgencia: 'Media',
    evidencia_requerida: 'Tablero activo (esta aplicación) y acta de la primera reunión operada sobre él.',
    evidencia_cargada: true, bloqueo: null,
    dependencia: null,
    verificador: 'Secretaría de seguimiento',
    criterio_cierre: 'Primera reunión semanal completa operada sobre el tablero con acuerdos registrados.',
    criterio_eficacia: 'Disciplina sostenida: cuatro reuniones consecutivas usando el tablero.',
    comentarios: [
      { fecha: '2026-10-20', autor: 'Secretaría de seguimiento', texto: 'Tablero desplegado y cargado con las 59 acciones. Se verificará en la reunión de hoy antes de considerar cierre.' }
    ],
    historial: [
      { fecha: '2026-10-13', autor: 'Secretaría de seguimiento', evento: 'Acción creada a partir de la reunión de seguimiento.' },
      { fecha: '2026-10-20', autor: 'Secretaría de seguimiento', evento: 'Evidencia cargada: tablero activo con base inicial.' },
      { fecha: '2026-10-20', autor: 'Secretaría de seguimiento', evento: 'Cambio de estado: En proceso → Implementada.' }
    ],
    etiquetas: ['tablero', 'reuniones', 'disciplina']
  },

];

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { ACCIONES_M };
}
