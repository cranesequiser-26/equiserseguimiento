/* Equiser · dataset maestro — parte ALTA (H01–H25). Cargar antes que data.js */
/* eslint-disable */
const ACCIONES_H = [
  /* ======================= PRIORIDAD ALTA (H01–H25) ======================= */
  {
    id: 'H01', codigo: 'EQ-H01',
    titulo: 'Liberación de camioneta y validación con BAC',
    descripcion: 'Verificar si se completó la firma en BAC La Fortuna, qué documentos se entregaron y qué requisito falta para liberar la camioneta. No se debe recibir, mover ni disponer del activo sin validación bancaria y acta de recepción firmada.',
    prioridad: 'Alta', area: 'Administración', subarea: 'Activos y banca',
    responsable: 'Jeffer Solís', colaboradores: ['Asesor legal', 'Dirección'],
    origen: 'Informe integral de seguimiento financiero, operativo y de RR. HH.',
    fecha_creacion: '2026-10-13', fecha_compromiso: '2026-10-15', fecha_cierre: null,
    estado: 'Bloqueada', porcentaje_avance: 55,
    riesgo: 'Disponer de un activo sin liberación bancaria expone a la empresa a un reclamo financiero y legal inmediato.',
    impacto: 'Legal y financiero', urgencia: 'Inmediata',
    evidencia_requerida: 'Confirmación bancaria, copia de documentos firmados, acta de liberación y recepción.',
    evidencia_cargada: false,
    bloqueo: 'El banco indica un requisito documental pendiente; sin la firma faltante no hay liberación.',
    dependencia: 'BAC La Fortuna · ejecutivo de cuenta',
    verificador: 'Ricardo (Dirección)',
    criterio_cierre: 'Acta de recepción firmada con confirmación escrita del banco de que no existe gravamen pendiente.',
    criterio_eficacia: 'El vehículo opera 15 días sin requerimientos bancarios ni observaciones legales.',
    comentarios: [
      { fecha: '2026-10-14', autor: 'Jeffer Solís', texto: 'Se realizó la visita a BAC La Fortuna; quedó pendiente un requisito que el banco debe confirmar por escrito.' },
      { fecha: '2026-10-17', autor: 'Secretaría de seguimiento', texto: 'Acción marcada como bloqueada a la espera de la respuesta bancaria. Se sugiere escalamiento si no hay respuesta el 21-10.' }
    ],
    historial: [
      { fecha: '2026-10-13', autor: 'Secretaría de seguimiento', evento: 'Acción creada a partir de la reunión de seguimiento.' },
      { fecha: '2026-10-14', autor: 'Jeffer Solís', evento: 'Primer avance: visita al banco y levantamiento de requisitos.' },
      { fecha: '2026-10-17', autor: 'Ricardo (Dirección)', evento: 'Cambio de estado: Abierta → Bloqueada (requisito bancario pendiente).' }
    ],
    etiquetas: ['banca', 'activos', 'documentos']
  },
  {
    id: 'H02', codigo: 'EQ-H02',
    titulo: 'Conciliación de transferencia y devolución de USD 5.000',
    descripcion: 'Reconstruir el movimiento completo del dinero: cuenta de origen, beneficiario, concepto, devolución total o parcial, diferencia existente, relación con la naviera y asiento contable correspondiente.',
    prioridad: 'Alta', area: 'Finanzas', subarea: 'Tesorería y conciliación',
    responsable: 'Celia', colaboradores: ['Ricardo', 'Dirección'],
    origen: 'Informe integral de seguimiento financiero, operativo y de RR. HH.',
    fecha_creacion: '2026-10-13', fecha_compromiso: '2026-10-16', fecha_cierre: null,
    estado: 'Escalada', porcentaje_avance: 45,
    riesgo: 'Saldo no recuperado sin trazabilidad contable: afecta caja y puede derivar en reclamo formal a terceros.',
    impacto: 'Financiero inmediato', urgencia: 'Inmediata',
    evidencia_requerida: 'Estados bancarios, comprobantes de transferencia y devolución, conciliación y asiento contable.',
    evidencia_cargada: false,
    bloqueo: null,
    dependencia: 'Comprobantes bancarios · contraparte naviera',
    verificador: 'Ricardo (Dirección)',
    criterio_cierre: 'Conciliación completa con asiento contable registrado y saldo recuperado o reclamo formal radicado.',
    criterio_eficacia: 'No aparecen partidas sin conciliar en los dos cortes semanales siguientes.',
    comentarios: [
      { fecha: '2026-10-16', autor: 'Celia', texto: 'Se identificó la devolución parcial; falta documentar la diferencia y su relación con la naviera.' },
      { fecha: '2026-10-18', autor: 'Dirección', texto: 'Se escala a Dirección por tratarse de saldo no recuperado con impacto directo en caja.' }
    ],
    historial: [
      { fecha: '2026-10-13', autor: 'Secretaría de seguimiento', evento: 'Acción creada a partir de la reunión de seguimiento.' },
      { fecha: '2026-10-16', autor: 'Celia', evento: 'Avance: identificación de movimientos y devolución parcial.' },
      { fecha: '2026-10-18', autor: 'Dirección', evento: 'Cambio de estado: En proceso → Escalada (saldo pendiente no recuperado).' }
    ],
    etiquetas: ['tesorería', 'conciliación', 'naviera', 'caja']
  },
  {
    id: 'H03', codigo: 'EQ-H03',
    titulo: 'Expediente al abogado por demanda laboral',
    descripcion: 'Reunir contratos, planillas, pagos, comunicaciones y la demanda para entregar al abogado un expediente completo que permita obtener exposición económica, calendario procesal y estrategia documentada.',
    prioridad: 'Alta', area: 'Legal', subarea: 'Contencioso laboral',
    responsable: 'RR. HH. (coordinación)', colaboradores: ['Dirección', 'Abogado externo'],
    origen: 'Informe integral de seguimiento financiero, operativo y de RR. HH.',
    fecha_creacion: '2026-10-13', fecha_compromiso: '2026-10-21', fecha_cierre: null,
    estado: 'En proceso', porcentaje_avance: 70,
    riesgo: 'Comparecer a un proceso laboral sin expediente ordenado eleva la exposición económica y debilita la defensa.',
    impacto: 'Legal y laboral', urgencia: 'Alta',
    evidencia_requerida: 'Expediente indexado entregado, opinión legal inicial, calendario de fechas y responsables.',
    evidencia_cargada: false,
    bloqueo: null,
    dependencia: 'Archivo de RR. HH. · contabilidad (planillas y pagos)',
    verificador: 'Dirección',
    criterio_cierre: 'Abogado confirma recepción de expediente completo y emite opinión inicial con estrategia.',
    criterio_eficacia: 'Se cumplen los dos primeros hitos procesales sin desgloses ni tachas por falta de documentos.',
    comentarios: [
      { fecha: '2026-10-17', autor: 'RR. HH.', texto: 'Contratos y planillas ya compilados; se está indexando la correspondencia.' }
    ],
    historial: [
      { fecha: '2026-10-13', autor: 'Secretaría de seguimiento', evento: 'Acción creada a partir de la reunión de seguimiento.' },
      { fecha: '2026-10-15', autor: 'RR. HH.', evento: 'Inicio de compilación documental.' },
      { fecha: '2026-10-17', autor: 'RR. HH.', evento: 'Avance al 70%: indexación en curso.' }
    ],
    etiquetas: ['legal', 'laboral', 'expediente']
  },
  {
    id: 'H04', codigo: 'EQ-H04',
    titulo: 'Recalcular y acordar liquidaciones',
    descripcion: 'Validar períodos, conceptos, pagos previos y diferencias de las liquidaciones con base documental. No pagar ni firmar finiquitos sin un cálculo revisado y aprobado por las tres partes.',
    prioridad: 'Alta', area: 'RR. HH.', subarea: 'Obligaciones laborales',
    responsable: 'RR. HH.', colaboradores: ['Contabilidad', 'Asesor laboral'],
    origen: 'Informe integral de seguimiento financiero, operativo y de RR. HH.',
    fecha_creacion: '2026-10-14', fecha_compromiso: '2026-10-22', fecha_cierre: null,
    estado: 'Pendiente de validación', porcentaje_avance: 35,
    riesgo: 'Pagar liquidaciones con cálculos no validados genera reclamos laborales, diferencias y contingencia legal.',
    impacto: 'Laboral y financiero', urgencia: 'Alta',
    evidencia_requerida: 'Cálculo revisado y aprobado, comunicación al colaborador, comprobante de pago o acuerdo firmado.',
    evidencia_cargada: false,
    bloqueo: null,
    dependencia: 'Expedientes de personal · registros de pago',
    verificador: 'Asesor laboral (externo)',
    criterio_cierre: 'Cada liquidación cuenta con cálculo doblemente verificado y acuerdo o pago documentado.',
    criterio_eficacia: 'No se reciben reclamos ni ajustes en los 30 días posteriores al pago.',
    comentarios: [
      { fecha: '2026-10-16', autor: 'Asesor laboral', texto: 'Los cálculos preliminares están en revisión; los montos aún NO deben tratarse como confirmados.' }
    ],
    historial: [
      { fecha: '2026-10-14', autor: 'Secretaría de seguimiento', evento: 'Acción creada a partir de la reunión de seguimiento.' },
      { fecha: '2026-10-16', autor: 'Asesor laboral', evento: 'Estado definido: Pendiente de validación de los cálculos base.' }
    ],
    etiquetas: ['laboral', 'liquidaciones', 'validación']
  },
  {
    id: 'H05', codigo: 'EQ-H05',
    titulo: 'Pagar viáticos válidos pendientes',
    descripcion: 'Cerrar los viáticos pendientes desde septiembre (o el período real que determine la conciliación), con aprobación del jefe de proyecto correspondiente, sin usar la falta de firma como excusa indefinida.',
    prioridad: 'Alta', area: 'Finanzas', subarea: 'Viáticos y nómina operativa',
    responsable: 'Celia', colaboradores: ['Jefes de proyecto'],
    origen: 'Informe integral de seguimiento financiero, operativo y de RR. HH.',
    fecha_creacion: '2026-10-13', fecha_compromiso: '2026-10-18', fecha_cierre: null,
    estado: 'En proceso', porcentaje_avance: 50,
    riesgo: 'El rezago de viáticos deteriora el clima laboral, desmotiva al personal operativo y puede escalar a reclamo.',
    impacto: 'Financiero y clima laboral', urgencia: 'Alta',
    evidencia_requerida: 'Relación aprobada por persona y proyecto, firmas de aprobación y comprobantes de pago.',
    evidencia_cargada: false,
    bloqueo: null,
    dependencia: 'Aprobaciones de jefes de proyecto',
    verificador: 'Ricardo (Dirección)',
    criterio_cierre: 'Relación de viáticos conciliada al 100% y pagos ejecutados con comprobante.',
    criterio_eficacia: 'Corte semanal posterior sin rezagos nuevos.',
    comentarios: [
      { fecha: '2026-10-17', autor: 'Celia', texto: 'Conciliados 9 de 18 casos; se requiere que dos jefes de proyecto confirmen aprobaciones pendientes.' }
    ],
    historial: [
      { fecha: '2026-10-13', autor: 'Secretaría de seguimiento', evento: 'Acción creada a partir de la reunión de seguimiento.' },
      { fecha: '2026-10-17', autor: 'Celia', evento: 'Avance al 50%: conciliación parcial completada.' }
    ],
    etiquetas: ['viáticos', 'pagos', 'clima laboral']
  },
  {
    id: 'H06', codigo: 'EQ-H06',
    titulo: 'Regularización con DGI, CSS y Municipio',
    descripcion: 'Obtener estados oficiales de las obligaciones fiscales, municipales y de seguridad social; identificar vencimientos y recargos; definir plan de pago o acuerdo formal con cada entidad.',
    prioridad: 'Alta', area: 'Legal', subarea: 'Obligaciones fiscales y municipales',
    responsable: 'Celia', colaboradores: ['Contador externo', 'Dirección'],
    origen: 'Informe integral de ordenamiento empresarial y plan de acción',
    fecha_creacion: '2026-10-13', fecha_compromiso: '2026-10-17', fecha_cierre: null,
    estado: 'Escalada', porcentaje_avance: 40,
    riesgo: 'Obligaciones legales críticas sin conciliar: recargos crecientes, afectación de permisos y contingencia fiscal.',
    impacto: 'Legal, fiscal y continuidad', urgencia: 'Inmediata',
    evidencia_requerida: 'Estados oficiales, declaraciones presentadas, recibos o acuerdos de pago firmados.',
    evidencia_cargada: false,
    bloqueo: null,
    dependencia: 'Contador externo · disponibilidad de caja',
    verificador: 'Dirección',
    criterio_cierre: 'Acuerdos o planes de pago formalizados con las tres entidades y calendario de cumplimiento activo.',
    criterio_eficacia: 'Dos ciclos de vencimientos atendidos sin nuevos recargos.',
    comentarios: [
      { fecha: '2026-10-17', autor: 'Contador externo', texto: 'Se recibió el estado de DGI; CSS y Municipio aún sin confirmación oficial.' },
      { fecha: '2026-10-18', autor: 'Dirección', texto: 'Escalada: obligación legal crítica sin conciliar en plazo.' }
    ],
    historial: [
      { fecha: '2026-10-13', autor: 'Secretaría de seguimiento', evento: 'Acción creada a partir de la reunión de seguimiento.' },
      { fecha: '2026-10-17', autor: 'Contador externo', evento: 'Avance: estado DGI recibido.' },
      { fecha: '2026-10-18', autor: 'Dirección', evento: 'Cambio de estado: En proceso → Escalada (obligación legal crítica sin conciliar).' }
    ],
    etiquetas: ['DGI', 'CSS', 'municipio', 'fiscal']
  },
  {
    id: 'H07', codigo: 'EQ-H07',
    titulo: 'Mapa real de créditos Banesco',
    descripcion: 'Definir saldo actual, mora, garantías y fecha del siguiente pago de los créditos Banesco; conciliar capital, intereses y recargos para tomar decisiones compatibles con la caja.',
    prioridad: 'Alta', area: 'Finanzas', subarea: 'Deuda bancaria',
    responsable: 'Ricardo', colaboradores: ['Celia'],
    origen: 'Informe integral de seguimiento financiero, operativo y de RR. HH.',
    fecha_creacion: '2026-10-14', fecha_compromiso: '2026-10-23', fecha_cierre: null,
    estado: 'Abierta', porcentaje_avance: 15,
    riesgo: 'Decidir pagos sin conocer el estado real de la deuda puede provocar mora, recargos o ejecución de garantías.',
    impacto: 'Financiero', urgencia: 'Alta',
    evidencia_requerida: 'Estados del préstamo emitidos por el banco y plan de amortización actualizado.',
    evidencia_cargada: false,
    bloqueo: null,
    dependencia: 'Banesco · ejecutivo de cuenta',
    verificador: 'Dirección',
    criterio_cierre: 'Mapa de deuda aprobado por Dirección con calendario de pagos integrado al flujo de caja.',
    criterio_eficacia: 'El flujo de caja de 13 semanas refleja los pagos reales sin desviaciones en el primer mes.',
    comentarios: [
      { fecha: '2026-10-16', autor: 'Ricardo', texto: 'Solicitados al banco los estados actualizados de ambos créditos.' }
    ],
    historial: [
      { fecha: '2026-10-14', autor: 'Secretaría de seguimiento', evento: 'Acción creada a partir de la reunión de seguimiento.' },
      { fecha: '2026-10-16', autor: 'Ricardo', evento: 'Solicitud formal de estados al banco.' }
    ],
    etiquetas: ['banca', 'deuda', 'Banesco']
  },
  {
    id: 'H08', codigo: 'EQ-H08',
    titulo: 'Flujo de caja de 13 semanas y prioridad de pagos',
    descripcion: 'Crear el tablero único de flujo de caja de 13 semanas, priorizando nómina, viáticos, obligaciones legales, seguridad, continuidad operativa y servicio de deuda, con fuentes y fechas.',
    prioridad: 'Alta', area: 'Finanzas', subarea: 'Flujo de caja',
    responsable: 'Celia', colaboradores: ['Ricardo', 'Dirección'],
    origen: 'Informe integral de ordenamiento empresarial y plan de acción',
    fecha_creacion: '2026-10-13', fecha_compromiso: '2026-10-20', fecha_cierre: null,
    estado: 'En proceso', porcentaje_avance: 40,
    riesgo: 'Sin flujo de caja priorizado, los pagos se deciden por presión y no por criticidad: riesgo de caja quebrada.',
    impacto: 'Financiero y continuidad', urgencia: 'Inmediata',
    evidencia_requerida: 'Flujo semanal aprobado por Dirección y lista de pagos priorizada.',
    evidencia_cargada: false,
    bloqueo: null,
    dependencia: 'Mapa de deuda (H07) · cartera por cobrar (M24)',
    verificador: 'Dirección',
    criterio_cierre: 'Flujo de 13 semanas aprobado y en uso en la reunión semanal de seguimiento.',
    criterio_eficacia: 'Cuatro semanas consecutivas de ejecución con desviación menor al 10%.',
    comentarios: [
      { fecha: '2026-10-19', autor: 'Celia', texto: 'Estructura del flujo lista; se integran compromisos de deuda y nómina de quincena.' }
    ],
    historial: [
      { fecha: '2026-10-13', autor: 'Secretaría de seguimiento', evento: 'Acción creada a partir de la reunión de seguimiento.' },
      { fecha: '2026-10-19', autor: 'Celia', evento: 'Avance al 40%: estructura base construida.' }
    ],
    etiquetas: ['flujo de caja', 'priorización', '13 semanas']
  },
  {
    id: 'H09', codigo: 'EQ-H09',
    titulo: 'Cálculo de cargos BAC y reclamo a BRD',
    descripcion: 'Calcular los intereses y descuentos aplicados por BAC en cada cesión y reclamar a BRD únicamente lo soportado por contrato o aceptación expresa. Reclamar solo lo sustentado.',
    prioridad: 'Alta', area: 'Finanzas', subarea: 'Factoring y cesiones',
    responsable: 'Ricardo', colaboradores: ['Celia', 'Comercial'],
    origen: 'Informe integral de seguimiento financiero, operativo y de RR. HH.',
    fecha_creacion: '2026-10-14', fecha_compromiso: '2026-10-24', fecha_cierre: null,
    estado: 'Abierta', porcentaje_avance: 10,
    riesgo: 'Cargos financieros no recuperados erosionan el margen de los proyectos cedidos.',
    impacto: 'Financiero', urgencia: 'Alta',
    evidencia_requerida: 'Estado BAC por cesión, cálculo de cargos y carta de reclamo radicada con acuse.',
    evidencia_cargada: false,
    bloqueo: null,
    dependencia: 'Estados de cuenta BAC · contrato con BRD',
    verificador: 'Dirección',
    criterio_cierre: 'Reclamo radicado con soporte completo y registro de seguimiento de respuesta.',
    criterio_eficacia: 'Recuperación total o parcial reconocida por BRD en un plazo acordado.',
    comentarios: [],
    historial: [
      { fecha: '2026-10-14', autor: 'Secretaría de seguimiento', evento: 'Acción creada a partir de la reunión de seguimiento.' }
    ],
    etiquetas: ['factoring', 'BAC', 'BRD', 'reclamo']
  },
  {
    id: 'H10', codigo: 'EQ-H10',
    titulo: 'Facturación de Cuarto Puente',
    descripcion: 'Convertir la ejecución del servicio en factura aceptada: emitir factura con soporte de horas, aceptación del cliente, contrato e impuestos verificados, coordinando con Juan Ricardo cuando aplique.',
    prioridad: 'Alta', area: 'Comercial', subarea: 'Facturación y cartera',
    responsable: 'Karen', colaboradores: ['Contabilidad', 'Operaciones'],
    origen: 'Informe integral de seguimiento financiero, operativo y de RR. HH.',
    fecha_creacion: '2026-10-13', fecha_compromiso: '2026-10-20', fecha_cierre: null,
    estado: 'En proceso', porcentaje_avance: 80,
    riesgo: 'Trabajo ejecutado sin facturar es caja que no entra: afecta directamente el flujo de 13 semanas.',
    impacto: 'Financiero inmediato', urgencia: 'Inmediata',
    evidencia_requerida: 'Factura emitida con anexos, acuse de recibo del cliente y fecha estimada de cobro.',
    evidencia_cargada: true,
    bloqueo: null,
    dependencia: 'Aceptación del cliente · soporte de horas de Operaciones',
    verificador: 'Ricardo (Dirección)',
    criterio_cierre: 'Factura aceptada por el cliente e ingresada a cartera con plan de cobro definido.',
    criterio_eficacia: 'Cobro efectuado dentro de los términos pactados.',
    comentarios: [
      { fecha: '2026-10-18', autor: 'Karen', texto: 'Factura emitida con anexos; pendiente acuse formal del cliente.' },
      { fecha: '2026-10-19', autor: 'Contabilidad', texto: 'Se verificó la correcta aplicación de impuestos y soporte de horas.' }
    ],
    historial: [
      { fecha: '2026-10-13', autor: 'Secretaría de seguimiento', evento: 'Acción creada a partir de la reunión de seguimiento.' },
      { fecha: '2026-10-18', autor: 'Karen', evento: 'Evidencia cargada: factura y anexos.' },
      { fecha: '2026-10-19', autor: 'Contabilidad', evento: 'Avance al 80%: verificación fiscal completada.' }
    ],
    etiquetas: ['facturación', 'cartera', 'Cuarto Puente']
  },
  {
    id: 'H11', codigo: 'EQ-H11',
    titulo: 'Informe de cauchos y horas para Costanera',
    descripcion: 'Enviar a la ingeniera Carla un informe claro sobre lo ocurrido con cauchos y horas: separar hechos, causa probable, costo asociado y petición concreta, sin culpas anticipadas.',
    prioridad: 'Alta', area: 'Operaciones', subarea: 'Relación con cliente',
    responsable: 'Daniel', colaboradores: ['Vladimir', 'Karen'],
    origen: 'Transcripción de reunión operativa',
    fecha_creacion: '2026-10-14', fecha_compromiso: '2026-10-17', fecha_cierre: null,
    estado: 'Implementada', porcentaje_avance: 100,
    riesgo: 'Sin informe formal, la discusión con el cliente queda en lo verbal y se pierde capacidad de negociación.',
    impacto: 'Comercial y reputacional', urgencia: 'Alta',
    evidencia_requerida: 'Informe firmado, fotos, partes de trabajo y acuse de recibo del cliente.',
    evidencia_cargada: true,
    bloqueo: null,
    dependencia: 'Partes de campo de Vladimir',
    verificador: 'Karen (Comercial)',
    criterio_cierre: 'Cliente confirma recepción y se registra su respuesta formal.',
    criterio_eficacia: 'El cliente acepta la petición o se acuerda compensación documentada.',
    comentarios: [
      { fecha: '2026-10-17', autor: 'Daniel', texto: 'Informe enviado con fotos y partes; se espera respuesta de la ingeniera Carla.' },
      { fecha: '2026-10-19', autor: 'Secretaría de seguimiento', texto: 'Recordatorio: “Implementada” no equivale a cerrada. Falta confirmar la respuesta del cliente (verificación).' }
    ],
    historial: [
      { fecha: '2026-10-14', autor: 'Secretaría de seguimiento', evento: 'Acción creada a partir de la reunión de seguimiento.' },
      { fecha: '2026-10-17', autor: 'Daniel', evento: 'Evidencia cargada: informe, fotos y partes enviados.' },
      { fecha: '2026-10-17', autor: 'Daniel', evento: 'Cambio de estado: En proceso → Implementada.' }
    ],
    etiquetas: ['cliente', 'informe', 'cauchos']
  },
  {
    id: 'H12', codigo: 'EQ-H12',
    titulo: 'Aislar equipo afectado por cauchos y tanquilla',
    descripcion: 'Contención inmediata: equipo afectado fuera de servicio hasta completar inspección de neumáticos, ruta, estabilidad y recolección de versiones del incidente, sin culpas anticipadas.',
    prioridad: 'Alta', area: 'Seguridad', subarea: 'Seguridad operacional',
    responsable: 'Vladimir', colaboradores: ['Daniel', 'Seguridad'],
    origen: 'Hallazgo operativo en sitio',
    fecha_creacion: '2026-10-14', fecha_compromiso: '2026-10-16', fecha_cierre: '2026-10-16',
    estado: 'Cerrada', porcentaje_avance: 100,
    riesgo: 'Operar el equipo sin análisis técnico pudo provocar lesión grave o daño significativo del equipo.',
    impacto: 'Seguridad operacional', urgencia: 'Inmediata',
    evidencia_requerida: 'Informe técnico de inspección, fotos y acta de liberación del equipo.',
    evidencia_cargada: true,
    bloqueo: null,
    dependencia: null,
    verificador: 'Seguridad (verificación independiente)',
    criterio_cierre: 'Inspección técnica completada y liberación firmada por responsable y verificador.',
    criterio_eficacia: 'Control de rutas futuras validado en la siguiente maniobra similar (seguimiento en M26).',
    comentarios: [
      { fecha: '2026-10-16', autor: 'Seguridad', texto: 'Inspección completada y equipo liberado con recomendaciones de ruta. Cierre verificado.' }
    ],
    historial: [
      { fecha: '2026-10-14', autor: 'Secretaría de seguimiento', evento: 'Acción creada (contención inmediata).' },
      { fecha: '2026-10-15', autor: 'Vladimir', evento: 'Inspección técnica ejecutada en sitio.' },
      { fecha: '2026-10-16', autor: 'Seguridad', evento: 'Verificación de cierre: evidencia suficiente.' },
      { fecha: '2026-10-16', autor: 'Seguridad', evento: 'Cambio de estado: En proceso → Cerrada.' }
    ],
    etiquetas: ['seguridad', 'contención', 'izaje']
  },
  {
    id: 'H13', codigo: 'EQ-H13',
    titulo: 'Retiro de radio defectuoso',
    descripcion: 'Ninguna maniobra sin comunicación segura: sustituir el radio defectuoso, probarlo en campo e implantar chequeo de comunicación al inicio de cada turno.',
    prioridad: 'Alta', area: 'Operaciones', subarea: 'Comunicaciones de maniobra',
    responsable: 'Vladimir', colaboradores: ['Manuel'],
    origen: 'Hallazgo operativo en sitio',
    fecha_creacion: '2026-10-14', fecha_compromiso: '2026-10-15', fecha_cierre: null,
    estado: 'Pendiente de eficacia', porcentaje_avance: 100,
    riesgo: 'Una falla de comunicación durante una maniobra de izaje puede causar lesión grave.',
    impacto: 'Seguridad operacional', urgencia: 'Inmediata',
    evidencia_requerida: 'Registro de prueba del equipo sustituto y verificación de campo del chequeo de turno.',
    evidencia_cargada: true,
    bloqueo: null,
    dependencia: null,
    verificador: 'Seguridad (verificación independiente)',
    criterio_cierre: 'Tres turnos consecutivos sin falla de comunicación, documentados.',
    criterio_eficacia: 'El chequeo de inicio de turno queda adoptado como práctica permanente (verificación a 15 días).',
    comentarios: [
      { fecha: '2026-10-15', autor: 'Vladimir', texto: 'Radio sustituido y probado. Se inició el conteo de turnos sin falla (1 de 3).' }
    ],
    historial: [
      { fecha: '2026-10-14', autor: 'Secretaría de seguimiento', evento: 'Acción creada a partir de la reunión de seguimiento.' },
      { fecha: '2026-10-15', autor: 'Vladimir', evento: 'Evidencia cargada: registro de prueba del equipo.' },
      { fecha: '2026-10-15', autor: 'Vladimir', evento: 'Cambio de estado: En proceso → Pendiente de eficacia (faltan 3 turnos sin falla).' }
    ],
    etiquetas: ['seguridad', 'comunicación', 'maniobra']
  },
  {

    id: 'H14', codigo: 'EQ-H14',
    titulo: 'Liberación física del sitio de trabajo',
    descripcion: 'No iniciar trabajos con obstáculos pendientes: retirar cables, vehículos e interferencias del área de maniobra y dejar evidencia formal de la liberación del sitio.',
    prioridad: 'Alta', area: 'Operaciones', subarea: 'Preparación de sitio',
    responsable: 'Daniel', colaboradores: ['Vladimir', 'Seguridad'],
    origen: 'Hallazgo operativo en sitio',
    fecha_creacion: '2026-10-14', fecha_compromiso: '2026-10-21', fecha_cierre: null,
    estado: 'En proceso', porcentaje_avance: 65,
    riesgo: 'Iniciar maniobras con obstáculos en el área incrementa la probabilidad de incidente operacional.',
    impacto: 'Seguridad operacional', urgencia: 'Alta',
    evidencia_requerida: 'Inspección firmada, fotos del sitio liberado y permiso de trabajo emitido.',
    evidencia_cargada: false,
    bloqueo: null,
    dependencia: 'Coordinación con el cliente para retiro de vehículos de terceros',
    verificador: 'Seguridad (verificación independiente)',
    criterio_cierre: 'Permiso de trabajo emitido sobre sitio liberado y verificado en campo.',
    criterio_eficacia: 'Control de cambios del sitio operando: ninguna interferencia nueva sin autorización en 15 días.',
    comentarios: [
      { fecha: '2026-10-18', autor: 'Daniel', texto: 'Cables retirados; quedan dos vehículos de terceros por reubicar con apoyo del cliente.' }
    ],
    historial: [
      { fecha: '2026-10-14', autor: 'Secretaría de seguimiento', evento: 'Acción creada a partir de la reunión de seguimiento.' },
      { fecha: '2026-10-18', autor: 'Daniel', evento: 'Avance al 65%: retiro parcial de obstáculos.' }
    ],
    etiquetas: ['seguridad', 'sitio', 'permiso de trabajo']
  },
  {
    id: 'H15', codigo: 'EQ-H15',
    titulo: 'Evaluación práctica de operadores',
    descripcion: 'Autorizar solo personal competente: comprobar en la práctica lectura de tablas de carga, uso correcto del equipo y respuesta a condiciones cambiantes de cada operador.',
    prioridad: 'Alta', area: 'RR. HH.', subarea: 'Competencias operativas',
    responsable: 'Vladimir', colaboradores: ['Daniel', 'RR. HH.'],
    origen: 'Informe integral de ordenamiento empresarial y plan de acción',
    fecha_creacion: '2026-10-14', fecha_compromiso: '2026-10-23', fecha_cierre: null,
    estado: 'En proceso', porcentaje_avance: 30,
    riesgo: 'Operadores sin competencia verificada elevan el riesgo de incidente en maniobras críticas.',
    impacto: 'Seguridad y personas', urgencia: 'Alta',
    evidencia_requerida: 'Evaluación práctica por operador y lista de personal autorizado.',
    evidencia_cargada: false,
    bloqueo: null,
    dependencia: 'Disponibilidad de equipos para evaluación práctica',
    verificador: 'Dirección',
    criterio_cierre: '100% de operadores evaluados con lista de autorizados publicada.',
    criterio_eficacia: 'Revalidación periódica programada y primer ciclo sin observaciones.',
    comentarios: [
      { fecha: '2026-10-19', autor: 'Vladimir', texto: 'Evaluados 3 de 8 operadores; se programa la siguiente jornada práctica.' }
    ],
    historial: [
      { fecha: '2026-10-14', autor: 'Secretaría de seguimiento', evento: 'Acción creada a partir de la reunión de seguimiento.' },
      { fecha: '2026-10-19', autor: 'Vladimir', evento: 'Avance al 30%: primera jornada de evaluación.' }
    ],
    etiquetas: ['competencias', 'operadores', 'seguridad']
  },
  {
    id: 'H16', codigo: 'EQ-H16',
    titulo: 'Inspección del gancho referido como 300 t',
    descripcion: 'Sin trazabilidad no se usa: confirmar identificación, estado físico, compatibilidad y certificados del accesorio de izaje antes de cualquier uso.',
    prioridad: 'Alta', area: 'Operaciones', subarea: 'Accesorios de izaje',
    responsable: 'Daniel', colaboradores: ['Manuel', 'Inspector externo'],
    origen: 'Hallazgo operativo en sitio',
    fecha_creacion: '2026-10-14', fecha_compromiso: '2026-10-18', fecha_cierre: null,
    estado: 'Bloqueada', porcentaje_avance: 60,
    riesgo: 'Usar un accesorio de izaje sin trazabilidad ni certificado puede provocar falla catastrófica en maniobra.',
    impacto: 'Seguridad operacional', urgencia: 'Inmediata',
    evidencia_requerida: 'Informe de inspección, certificados del fabricante y liberación técnica firmada.',
    evidencia_cargada: false,
    bloqueo: 'El fabricante no ha entregado los certificados de trazabilidad del accesorio; inspección física ya realizada.',
    dependencia: 'Fabricante / proveedor del accesorio',
    verificador: 'Inspector externo',
    criterio_cierre: 'Accesorio con certificado y trazabilidad completa, integrado al programa de inspección.',
    criterio_eficacia: 'El accesorio pasa la primera inspección programada sin observaciones.',
    comentarios: [
      { fecha: '2026-10-17', autor: 'Manuel', texto: 'Inspección física sin novedad aparente, pero sin certificados no hay liberación posible.' },
      { fecha: '2026-10-18', autor: 'Daniel', texto: 'Accesorio marcado fuera de servicio hasta recibir trazabilidad. Se contactó al fabricante.' }
    ],
    historial: [
      { fecha: '2026-10-14', autor: 'Secretaría de seguimiento', evento: 'Acción creada a partir de la reunión de seguimiento.' },
      { fecha: '2026-10-17', autor: 'Manuel', evento: 'Inspección física ejecutada.' },
      { fecha: '2026-10-18', autor: 'Daniel', evento: 'Cambio de estado: En proceso → Bloqueada (certificados del fabricante pendientes).' }
    ],
    etiquetas: ['izaje', 'certificados', 'trazabilidad']
  },
  {
    id: 'H17', codigo: 'EQ-H17',
    titulo: 'Control del sistema de diésel',
    descripcion: 'No instalar ni operar sin validación: mantener el suministro autorizado mientras se revisan requisitos aplicables, diseño, contención y plan de emergencia del sistema de combustible.',
    prioridad: 'Alta', area: 'Ambiente', subarea: 'Combustible y control ambiental',
    responsable: 'Manuel', colaboradores: ['Seguridad/Ambiente', 'Dirección'],
    origen: 'Informe integral de ordenamiento empresarial y plan de acción',
    fecha_creacion: '2026-10-15', fecha_compromiso: '2026-10-20', fecha_cierre: null,
    estado: 'Pendiente de validación', porcentaje_avance: 25,
    riesgo: 'Operar un sistema de combustible sin validación puede generar derrame, sanción ambiental y riesgo de incendio.',
    impacto: 'Ambiental y seguridad', urgencia: 'Inmediata',
    evidencia_requerida: 'Validación de requisitos aplicables, plano del sistema y procedimiento de contención y emergencia.',
    evidencia_cargada: false,
    bloqueo: null,
    dependencia: 'Criterio de autoridad ambiental / aseguradora',
    verificador: 'Dirección',
    criterio_cierre: 'Sistema validado documentalmente con procedimiento de emergencia aprobado y comunicado.',
    criterio_eficacia: 'Prueba de respuesta ante derrame ejecutada con resultado satisfactorio.',
    comentarios: [
      { fecha: '2026-10-17', autor: 'Seguridad/Ambiente', texto: 'Los requisitos aplicables están en revisión; el alcance aún no está confirmado (pendiente de validación).' }
    ],
    historial: [
      { fecha: '2026-10-15', autor: 'Secretaría de seguimiento', evento: 'Acción creada a partir de la reunión de seguimiento.' },
      { fecha: '2026-10-17', autor: 'Seguridad/Ambiente', evento: 'Revisión de requisitos en curso.' }
    ],
    etiquetas: ['diésel', 'ambiente', 'emergencia']
  },
  {
    id: 'H18', codigo: 'EQ-H18',
    titulo: 'Cierre técnico del ramal LTM 1080',
    descripcion: 'Terminar la reparación del ramal eléctrico de la LTM 1080: medir, proteger y probar el sistema antes de liberar el equipo. Bloqueo total si la falla afecta mando o seguridad.',
    prioridad: 'Alta', area: 'Taller / Mantenimiento', subarea: 'Sistemas eléctricos',
    responsable: 'Manuel', colaboradores: ['Marcial'],
    origen: 'Informe integral de seguimiento financiero, operativo y de RR. HH.',
    fecha_creacion: '2026-10-14', fecha_compromiso: '2026-10-22', fecha_cierre: null,
    estado: 'En proceso', porcentaje_avance: 75,
    riesgo: 'Un ramal eléctrico sin cierre técnico puede dejar el equipo sin mandos de seguridad en operación.',
    impacto: 'Seguridad y continuidad operativa', urgencia: 'Alta',
    evidencia_requerida: 'Orden de trabajo cerrada, registro de pruebas y liberación técnica firmada.',
    evidencia_cargada: false,
    bloqueo: null,
    dependencia: 'Disponibilidad del equipo para pruebas finales',
    verificador: 'Vladimir (Operaciones)',
    criterio_cierre: 'Pruebas funcionales superadas y equipo liberado con orden cerrada.',
    criterio_eficacia: 'Inspección posterior a 15 días sin recurrencia de la falla.',
    comentarios: [
      { fecha: '2026-10-19', autor: 'Marcial', texto: 'Reparación ejecutada; faltan pruebas bajo carga y protección definitiva del ramal.' }
    ],
    historial: [
      { fecha: '2026-10-14', autor: 'Secretaría de seguimiento', evento: 'Acción creada a partir de la reunión de seguimiento.' },
      { fecha: '2026-10-19', autor: 'Marcial', evento: 'Avance al 75%: reparación ejecutada, pruebas pendientes.' }
    ],
    etiquetas: ['mantenimiento', 'LTM 1080', 'eléctrico']
  },
  {
    id: 'H19', codigo: 'EQ-H19',
    titulo: 'Diagnóstico de baterías recurrentes',
    descripcion: 'No cambiar piezas sin diagnóstico: medir batería, alternador, cableado, tierra y consumos parásitos hasta hallar la causa raíz de las fallas recurrentes.',
    prioridad: 'Alta', area: 'Taller / Mantenimiento', subarea: 'Diagnóstico eléctrico',
    responsable: 'Manuel', colaboradores: ['Marcial'],
    origen: 'Hallazgo operativo recurrente',
    fecha_creacion: '2026-10-10', fecha_compromiso: '2026-10-19', fecha_cierre: null,
    estado: 'Reabierta', porcentaje_avance: 50,
    riesgo: 'Fallas eléctricas recurrentes inmovilizan equipos en campo y pueden dejar una maniobra a medias.',
    impacto: 'Continuidad operativa', urgencia: 'Alta',
    evidencia_requerida: 'Mediciones antes/después, diagnóstico de causa raíz y revisión a 7 y 30 días.',
    evidencia_cargada: true,
    bloqueo: null,
    dependencia: null,
    verificador: 'Vladimir (Operaciones)',
    criterio_cierre: 'Causa raíz documentada, corrección aplicada y revisiones a 7/30 días sin recurrencia.',
    criterio_eficacia: '30 días sin falla eléctrica en el activo intervenido; tendencia por activo en seguimiento.',
    comentarios: [
      { fecha: '2026-10-12', autor: 'Marcial', texto: 'Se reemplazó batería y se registraron mediciones iniciales.' },
      { fecha: '2026-10-18', autor: 'Manuel', texto: 'La falla reapareció: el cambio de batería no fue eficaz. Se reabre y se exige diagnóstico de causa raíz (alternador/consumo parásito sospechoso).' }
    ],
    historial: [
      { fecha: '2026-10-10', autor: 'Secretaría de seguimiento', evento: 'Acción creada por hallazgo recurrente.' },
      { fecha: '2026-10-12', autor: 'Marcial', evento: 'Evidencia cargada: mediciones y reemplazo de batería.' },
      { fecha: '2026-10-13', autor: 'Manuel', evento: 'Cambio de estado: En proceso → Pendiente de eficacia.' },
      { fecha: '2026-10-18', autor: 'Manuel', evento: 'Reapertura: la solución no fue eficaz (falla recurrente). Estado: Pendiente de eficacia → Reabierta.' }
    ],
    etiquetas: ['mantenimiento', 'diagnóstico', 'reapertura']
  },
  {
    id: 'H20', codigo: 'EQ-H20',
    titulo: 'Cierre de condiciones contractuales y standby',
    descripcion: 'Nada crítico por acuerdo verbal: definir alcance, tarifas, movilización, desmovilización, standby, forma de pago y responsabilidades antes de comprometer recursos en nuevos servicios.',
    prioridad: 'Alta', area: 'Legal', subarea: 'Contratos comerciales',
    responsable: 'Karen', colaboradores: ['Daniel', 'Asesor legal'],
    origen: 'Informe integral de ordenamiento empresarial y plan de acción',
    fecha_creacion: '2026-10-14', fecha_compromiso: '2026-10-24', fecha_cierre: null,
    estado: 'En proceso', porcentaje_avance: 55,
    riesgo: 'Operar bajo acuerdos verbales expone a disputas de tarifas, standby no cobrado y responsabilidades difusas.',
    impacto: 'Legal y financiero', urgencia: 'Alta',
    evidencia_requerida: 'Contrato o adenda firmada con las condiciones acordadas.',
    evidencia_cargada: false,
    bloqueo: null,
    dependencia: 'Negociación con cliente en curso',
    verificador: 'Dirección',
    criterio_cierre: 'Contrato/adenda firmado y comunicado a Operaciones y Finanzas.',
    criterio_eficacia: 'El siguiente servicio se ejecuta y factura conforme a las condiciones firmadas, sin disputas.',
    comentarios: [
      { fecha: '2026-10-18', autor: 'Karen', texto: 'Minuta de adenda en revisión por asesor legal; standby y movilización ya valorados.' }
    ],
    historial: [
      { fecha: '2026-10-14', autor: 'Secretaría de seguimiento', evento: 'Acción creada a partir de la reunión de seguimiento.' },
      { fecha: '2026-10-18', autor: 'Karen', evento: 'Avance al 55%: adenda en revisión legal.' }
    ],
    etiquetas: ['contratos', 'standby', 'clientes']
  },
  {
    id: 'H21', codigo: 'EQ-H21',
    titulo: 'Cotizaciones comparables de transporte',
    descripcion: 'No elegir solo por precio: comparar capacidad, ruta, seguros, plazo y costo total antes de contratar la movilización de equipos.',
    prioridad: 'Alta', area: 'Logística', subarea: 'Transporte y movilización',
    responsable: 'Karen', colaboradores: ['Vladimir', 'Daniel'],
    origen: 'Informe integral de seguimiento financiero, operativo y de RR. HH.',
    fecha_creacion: '2026-10-15', fecha_compromiso: '2026-10-25', fecha_cierre: null,
    estado: 'Abierta', porcentaje_avance: 20,
    riesgo: 'Contratar transporte sin comparación técnica puede encarecer la operación o comprometer la seguridad del traslado.',
    impacto: 'Financiero y operativo', urgencia: 'Alta',
    evidencia_requerida: 'Cuadro comparativo de cotizaciones y aprobación de la opción seleccionada.',
    evidencia_cargada: false,
    bloqueo: null,
    dependencia: 'Respuesta de proveedores de transporte',
    verificador: 'Dirección',
    criterio_cierre: 'Proveedor seleccionado con comparativo documentado y aprobación registrada.',
    criterio_eficacia: 'Evaluación de desempeño del proveedor posterior a la primera movilización.',
    comentarios: [],
    historial: [
      { fecha: '2026-10-15', autor: 'Secretaría de seguimiento', evento: 'Acción creada a partir de la reunión de seguimiento.' }
    ],
    etiquetas: ['transporte', 'movilización', 'cotizaciones']
  },
  {
    id: 'H22', codigo: 'EQ-H22',
    titulo: 'Recalcular tarifas y rentabilidad real',
    descripcion: 'Sin costo validado no se cotiza: recalcular tarifas incluyendo movilización, personal, combustible, permisos, mantenimiento, costos financieros e indirectos.',
    prioridad: 'Alta', area: 'Comercial', subarea: 'Tarifas y rentabilidad',
    responsable: 'Karen', colaboradores: ['Daniel', 'Celia'],
    origen: 'Informe integral de ordenamiento empresarial y plan de acción',
    fecha_creacion: '2026-10-15', fecha_compromiso: '2026-10-27', fecha_cierre: null,
    estado: 'Abierta', porcentaje_avance: 20,
    riesgo: 'Cotizar con tarifas por debajo del costo real destruye margen y caja en cada servicio.',
    impacto: 'Financiero', urgencia: 'Alta',
    evidencia_requerida: 'Costeo por servicio y tarifario aprobado por Dirección.',
    evidencia_cargada: false,
    bloqueo: null,
    dependencia: 'Datos de costos de Operaciones y Finanzas',
    verificador: 'Dirección',
    criterio_cierre: 'Tarifario aprobado, publicado y en uso por Comercial.',
    criterio_eficacia: 'Las tres primeras cotizaciones posteriores muestran margen positivo validado.',
    comentarios: [
      { fecha: '2026-10-19', autor: 'Celia', texto: 'Se entregó a Comercial la base de costos financieros e indirectos para el costeo.' }
    ],
    historial: [
      { fecha: '2026-10-15', autor: 'Secretaría de seguimiento', evento: 'Acción creada a partir de la reunión de seguimiento.' },
      { fecha: '2026-10-19', autor: 'Celia', evento: 'Insumo de costos entregado a Comercial.' }
    ],
    etiquetas: ['tarifas', 'rentabilidad', 'costos']
  },
  {
    id: 'H23', codigo: 'EQ-H23',
    titulo: 'Expediente del patio y depósito de USD 8.000',
    descripcion: 'Proteger continuidad y documentos: reunir contrato del patio, pagos, comunicaciones y estrategia legal sobre el depósito de USD 8.000, además de un plan alterno de patio.',
    prioridad: 'Alta', area: 'Legal', subarea: 'Patio, depósito y asuntos legales',
    responsable: 'Dirección', colaboradores: ['Asesor legal'],
    origen: 'Informe integral de ordenamiento empresarial y plan de acción',
    fecha_creacion: '2026-10-15', fecha_compromiso: '2026-10-24', fecha_cierre: null,
    estado: 'Escalada', porcentaje_avance: 50,
    riesgo: 'Conflicto legal por el patio puede interrumpir la operación y poner en riesgo el depósito de USD 8.000.',
    impacto: 'Legal y continuidad del negocio', urgencia: 'Inmediata',
    evidencia_requerida: 'Expediente completo, estrategia legal documentada y plan de continuidad de patio.',
    evidencia_cargada: false,
    bloqueo: null,
    dependencia: 'Respuesta de la contraparte del arrendamiento',
    verificador: 'Asesor legal (externo)',
    criterio_cierre: 'Estrategia legal definida con plan de continuidad operativa aprobado por Dirección.',
    criterio_eficacia: 'Hitos legales y operativos cumplidos en las dos primeras fechas de control.',
    comentarios: [
      { fecha: '2026-10-17', autor: 'Asesor legal', texto: 'Contrato y comprobantes de pago reunidos; se evalúan dos escenarios de negociación.' },
      { fecha: '2026-10-19', autor: 'Dirección', texto: 'Escalada por impacto directo en continuidad operativa; requiere decisión de Dirección esta semana.' }
    ],
    historial: [
      { fecha: '2026-10-15', autor: 'Secretaría de seguimiento', evento: 'Acción creada a partir de la reunión de seguimiento.' },
      { fecha: '2026-10-17', autor: 'Asesor legal', evento: 'Compilación documental completada.' },
      { fecha: '2026-10-19', autor: 'Dirección', evento: 'Cambio de estado: En proceso → Escalada (decisión de Dirección requerida).' }
    ],
    etiquetas: ['patio', 'legal', 'continuidad', 'depósito']
  },
  {
    id: 'H24', codigo: 'EQ-H24',
    titulo: 'Órdenes y repuestos pendientes de la 780',
    descripcion: 'Prioridad por seguridad y parada: emitir las órdenes de compra de los repuestos pendientes de la grúa 780, priorizar los pagos y comprobar recepción e instalación del repuesto correcto.',
    prioridad: 'Alta', area: 'Compras', subarea: 'Repuestos críticos',
    responsable: 'Marcial', colaboradores: ['Celia'],
    origen: 'Informe integral de seguimiento financiero, operativo y de RR. HH.',
    fecha_creacion: '2026-10-14', fecha_compromiso: '2026-10-17', fecha_cierre: null,
    estado: 'En proceso', porcentaje_avance: 70,
    riesgo: 'La grúa 780 permanece parada: pérdida de ingresos diarios y posible incumplimiento con clientes.',
    impacto: 'Continuidad operativa y financiero', urgencia: 'Alta',
    evidencia_requerida: 'Órdenes de compra emitidas, constancia de recepción y orden técnica de instalación.',
    evidencia_cargada: false,
    bloqueo: null,
    dependencia: 'Priorización de pago según flujo de caja (H08)',
    verificador: 'Manuel (Taller)',
    criterio_cierre: 'Repuestos instalados y equipo liberado técnicamente.',
    criterio_eficacia: 'El equipo opera dos semanas sin la falla que motivó la compra.',
    comentarios: [
      { fecha: '2026-10-16', autor: 'Marcial', texto: 'Dos de tres OC emitidas; la tercera espera priorización de pago.' },
      { fecha: '2026-10-18', autor: 'Celia', texto: 'Pago del repuesto crítico incluido en la lista priorizada del flujo de caja.' }
    ],
    historial: [
      { fecha: '2026-10-14', autor: 'Secretaría de seguimiento', evento: 'Acción creada a partir de la reunión de seguimiento.' },
      { fecha: '2026-10-16', autor: 'Marcial', evento: 'Avance: 2 de 3 órdenes de compra emitidas.' },
      { fecha: '2026-10-18', autor: 'Celia', evento: 'Pago priorizado en flujo de caja.' }
    ],
    etiquetas: ['repuestos', 'grúa 780', 'compras']
  },
  {
    id: 'H25', codigo: 'EQ-H25',
    titulo: 'Dueño único por acción crítica',
    descripcion: 'Nada asignado a “todos”: definir un responsable único, un suplente y un verificador para cada acción crítica, y comunicarlo formalmente.',
    prioridad: 'Alta', area: 'Gestión documental / seguimiento', subarea: 'Disciplina de seguimiento',
    responsable: 'Dirección', colaboradores: ['Secretaría de seguimiento'],
    origen: 'Informe integral de ordenamiento empresarial y plan de acción',
    fecha_creacion: '2026-10-13', fecha_compromiso: '2026-10-15', fecha_cierre: '2026-10-15',
    estado: 'Cerrada', porcentaje_avance: 100,
    riesgo: 'Acciones sin dueño único se diluyen entre reuniones, chats y correos sin control.',
    impacto: 'Gestión y control', urgencia: 'Alta',
    evidencia_requerida: 'Matriz de responsables, suplentes y verificadores aprobada y comunicada.',
    evidencia_cargada: true,
    bloqueo: null,
    dependencia: null,
    verificador: 'Secretaría de seguimiento',
    criterio_cierre: 'Matriz aprobada por Dirección y distribuida a todos los responsables.',
    criterio_eficacia: 'Uso obligatorio de la matriz verificado en las dos primeras reuniones de seguimiento.',
    comentarios: [
      { fecha: '2026-10-15', autor: 'Dirección', texto: 'Matriz aprobada y comunicada. Cierre verificado por Secretaría de seguimiento.' }
    ],
    historial: [
      { fecha: '2026-10-13', autor: 'Secretaría de seguimiento', evento: 'Acción creada a partir de la reunión de seguimiento.' },
      { fecha: '2026-10-15', autor: 'Dirección', evento: 'Evidencia cargada: matriz de responsables aprobada.' },
      { fecha: '2026-10-15', autor: 'Secretaría de seguimiento', evento: 'Verificación de cierre completada. Estado: Implementada → Cerrada.' }
    ],
    etiquetas: ['responsables', 'seguimiento', 'gobernanza']
  },

];

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { ACCIONES_H };
}
