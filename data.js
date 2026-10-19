/* ============================================================================
 * EQUISER PANAMÁ · SEGUIMIENTO DE ACCIONES — DATASET
 * 59 acciones extraídas de la Diligencia de Entrega (feb–may 2025, pág. 157)
 * Estados: completada | en_proceso | pendiente | sin_iniciar
 * ========================================================================== */

window.EQUISER_DATA = {
  meta: {
    fuente: 'Diligencia de Entrega — Gerente saliente → Gerente entrante (febrero–mayo 2025)',
    generado: '2025-05-30',
    totalAcciones: 59,
    gerenciaSaliente: 'Gerencia saliente',
    gerenciaEntrante: 'Gerencia entrante'
  },

  /* 4 departamentos operativos + 1 transversal */
  departamentos: [
    { id: 'finanzas',  nombre: 'Finanzas y Administración', color: '#0B3D91', icono: '💼' },
    { id: 'operaciones', nombre: 'Operaciones Portuarias', color: '#0077B6', icono: '⚓' },
    { id: 'comercial', nombre: 'Comercial y Clientes', color: '#00A676', icono: '📈' },
    { id: 'talento',   nombre: 'Talento Humano', color: '#F4A300', icono: '👥' },
    { id: 'transversal', nombre: 'Transversal / Legal', color: '#6C63FF', icono: '⚖️' }
  ],

  acciones: [
    /* ── FINANZAS Y ADMINISTRACIÓN (14) ─────────────────────────────── */
    { id: 'FIN-01', dep: 'finanzas', titulo: 'Cierre contable abril 2025', detalle: 'Conciliaciones bancarias, provisiones y estados financieros de abril.', estado: 'completada', prioridad: 'alta', vence: '2025-05-08', responsable: 'Contabilidad' },
    { id: 'FIN-02', dep: 'finanzas', titulo: 'Presupuesto operativo 2025 — revisión Q2', detalle: 'Reforecast de ingresos y gastos con base en volúmenes reales de Q1.', estado: 'en_proceso', prioridad: 'alta', vence: '2025-06-15', responsable: 'Controller' },
    { id: 'FIN-03', dep: 'finanzas', titulo: 'Cobro a clientes morosos >90 días', detalle: 'Cartera vencida de 12 clientes; escalar a cobro pre-jurídico.', estado: 'en_proceso', prioridad: 'alta', vence: '2025-06-30', responsable: 'Tesorería' },
    { id: 'FIN-04', dep: 'finanzas', titulo: 'Renovación pólizas de seguros 2025-2026', detalle: 'Pólizas de casco portuario, responsabilidad civil y carga.', estado: 'pendiente', prioridad: 'alta', vence: '2025-07-01', responsable: 'Administración' },
    { id: 'FIN-05', dep: 'finanzas', titulo: 'Auditoría externa estados financieros 2024', detalle: 'Entrega de papeles de trabajo al auditor; cierre de hallazgos.', estado: 'completada', prioridad: 'alta', vence: '2025-04-30', responsable: 'Contabilidad' },
    { id: 'FIN-06', dep: 'finanzas', titulo: 'Implementación módulo de costos por servicio', detalle: 'Costeo ABC para servicios de atraque, estiba y almacenaje.', estado: 'en_proceso', prioridad: 'media', vence: '2025-08-31', responsable: 'Controller' },
    { id: 'FIN-07', dep: 'finanzas', titulo: 'Actualización tarifario de servicios portuarios', detalle: 'Ajuste por IPC y benchmarking regional; aprobación de Junta.', estado: 'pendiente', prioridad: 'alta', vence: '2025-07-15', responsable: 'Gerencia' },
    { id: 'FIN-08', dep: 'finanzas', titulo: 'Pago de impuestos municipales semestre 1', detalle: 'Impuesto de inmueble y aviso de operación.', estado: 'completada', prioridad: 'media', vence: '2025-05-31', responsable: 'Tesorería' },
    { id: 'FIN-09', dep: 'finanzas', titulo: 'Declaración de renta jurídica 2024', detalle: 'Presentada con comprobante de retenciones.', estado: 'completada', prioridad: 'alta', vence: '2025-03-31', responsable: 'Contabilidad' },
    { id: 'FIN-10', dep: 'finanzas', titulo: 'Negociación línea de crédito revolving', detalle: 'USD 2.0 MM para capital de trabajo; 3 bancos cotizando.', estado: 'en_proceso', prioridad: 'media', vence: '2025-07-31', responsable: 'Tesorería' },
    { id: 'FIN-11', dep: 'finanzas', titulo: 'Inventario físico de activos fijos', detalle: 'Etiquetado y conciliación de grúas, montacargas y equipos menores.', estado: 'pendiente', prioridad: 'media', vence: '2025-09-30', responsable: 'Administración' },
    { id: 'FIN-12', dep: 'finanzas', titulo: 'Automatización de cuentas por pagar', detalle: 'Flujo de aprobación digital de facturas de proveedores.', estado: 'sin_iniciar', prioridad: 'baja', vence: '2025-10-31', responsable: 'TI / Contabilidad' },
    { id: 'FIN-13', dep: 'finanzas', titulo: 'Reporte mensual de KPIs financieros a Junta', detalle: 'EBITDA, margen operativo, DSO y cumplimiento presupuestario.', estado: 'en_proceso', prioridad: 'media', vence: '2025-06-10', responsable: 'Controller' },
    { id: 'FIN-14', dep: 'finanzas', titulo: 'Regularización de retenciones a no residentes', detalle: 'Servicios técnicos del exterior; pendientes de declarar 2 períodos.', estado: 'pendiente', prioridad: 'alta', vence: '2025-06-20', responsable: 'Contabilidad' },

    /* ── OPERACIONES PORTUARIAS (16) ────────────────────────────────── */
    { id: 'OPE-01', dep: 'operaciones', titulo: 'Mantenimiento mayor grúa móvil #2', detalle: 'Cambio de cables, ganchos y revisión estructural por fabricante.', estado: 'en_proceso', prioridad: 'alta', vence: '2025-06-30', responsable: 'Mantenimiento' },
    { id: 'OPE-02', dep: 'operaciones', titulo: 'Certificación de grúas ante AMP', detalle: 'Inspección anual obligatoria de equipos de izaje.', estado: 'completada', prioridad: 'alta', vence: '2025-04-15', responsable: 'HSE' },
    { id: 'OPE-03', dep: 'operaciones', titulo: 'Dragado de fondeadero y canal de acceso', detalle: 'Permiso ambiental vigente; licitación con 3 dragadoras.', estado: 'pendiente', prioridad: 'alta', vence: '2025-09-15', responsable: 'Superintendencia' },
    { id: 'OPE-04', dep: 'operaciones', titulo: 'Reparación de defensas del muelle norte', detalle: 'Sustitución de 8 defensas tipo celdas dañadas.', estado: 'en_proceso', prioridad: 'media', vence: '2025-07-31', responsable: 'Mantenimiento' },
    { id: 'OPE-05', dep: 'operaciones', titulo: 'Actualización plan de respuesta a derrames', detalle: 'Plan OIL SPILL validado por AMP; simulacro semestral.', estado: 'completada', prioridad: 'alta', vence: '2025-05-20', responsable: 'HSE' },
    { id: 'OPE-06', dep: 'operaciones', titulo: 'Implementación TOS (Terminal Operating System)', detalle: 'Fase 1: módulo de gate y patio; contrato firmado.', estado: 'en_proceso', prioridad: 'alta', vence: '2025-12-15', responsable: 'TI / Operaciones' },
    { id: 'OPE-07', dep: 'operaciones', titulo: 'Turnos de estiba — redistribución por demanda', detalle: 'Ajuste de cuadrillas según ventana de buques de junio.', estado: 'completada', prioridad: 'media', vence: '2025-05-30', responsable: 'Superintendencia' },
    { id: 'OPE-08', dep: 'operaciones', titulo: 'Señalización y demarcación del patio', detalle: 'Pintura de carriles, zonas peatonales y bahías de contenedores.', estado: 'pendiente', prioridad: 'media', vence: '2025-08-15', responsable: 'HSE' },
    { id: 'OPE-09', dep: 'operaciones', titulo: 'Adquisición de 2 reach stackers', detalle: 'Evaluación de ofertas; CAPEX aprobado por Junta en abril.', estado: 'en_proceso', prioridad: 'alta', vence: '2025-10-31', responsable: 'Compras' },
    { id: 'OPE-10', dep: 'operaciones', titulo: 'Programa de inspección de equipos menores', detalle: 'Checklists diarios de montacargas y unidades de arrastre.', estado: 'completada', prioridad: 'media', vence: '2025-05-10', responsable: 'Mantenimiento' },
    { id: 'OPE-11', dep: 'operaciones', titulo: 'Certificación ISPS — auditoría anual', detalle: 'Código PBIP; plan de protección portuaria actualizado.', estado: 'pendiente', prioridad: 'alta', vence: '2025-08-01', responsable: 'Seguridad Portuaria' },
    { id: 'OPE-12', dep: 'operaciones', titulo: 'Optimización de ventanas de atraque', detalle: 'Coordinación con prácticos y remolcadores para reducir esperas 15%.', estado: 'en_proceso', prioridad: 'media', vence: '2025-07-15', responsable: 'Capitanía de Puerto' },
    { id: 'OPE-13', dep: 'operaciones', titulo: 'Instalación de cámaras analíticas en muelle', detalle: '12 cámaras con analítica de intrusión y conteo.', estado: 'sin_iniciar', prioridad: 'baja', vence: '2025-11-30', responsable: 'Seguridad Portuaria' },
    { id: 'OPE-14', dep: 'operaciones', titulo: 'Repotenciación de planta eléctrica de emergencia', detalle: 'Overhaul de generador 500 kVA y transfer automático.', estado: 'pendiente', prioridad: 'media', vence: '2025-08-31', responsable: 'Mantenimiento' },
    { id: 'OPE-15', dep: 'operaciones', titulo: 'Plan de contingencia por temporada de lluvias', detalle: 'Drenajes, techos de almacén y protocolos de suspensión.', estado: 'completada', prioridad: 'alta', vence: '2025-04-30', responsable: 'Superintendencia' },
    { id: 'OPE-16', dep: 'operaciones', titulo: 'Estandarización de procedimientos de amarre', detalle: 'Manuales de amarre/desamarre según tipo de nave.', estado: 'en_proceso', prioridad: 'media', vence: '2025-07-31', responsable: 'Capitanía de Puerto' },

    /* ── COMERCIAL Y CLIENTES (11) ──────────────────────────────────── */
    { id: 'COM-01', dep: 'comercial', titulo: 'Renovación contrato línea naviera principal', detalle: 'Naviera con 35% del volumen; contrato vence julio 2025.', estado: 'en_proceso', prioridad: 'alta', vence: '2025-07-01', responsable: 'Gerencia Comercial' },
    { id: 'COM-02', dep: 'comercial', titulo: 'Prospecto: servicio feeder Centroamérica', detalle: 'Ruta Panamá–Costa Rica–El Salvador; estudio de demanda listo.', estado: 'en_proceso', prioridad: 'alta', vence: '2025-07-31', responsable: 'Gerencia Comercial' },
    { id: 'COM-03', dep: 'comercial', titulo: 'Encuesta de satisfacción de clientes 2025', detalle: 'NPS y quejas estructuradas; meta 85% de satisfacción.', estado: 'completada', prioridad: 'media', vence: '2025-05-15', responsable: 'Calidad' },
    { id: 'COM-04', dep: 'comercial', titulo: 'Plan de cuentas clave (key accounts)', detalle: 'Top 10 clientes con planes de crecimiento y SLA diferenciados.', estado: 'en_proceso', prioridad: 'media', vence: '2025-06-30', responsable: 'Gerencia Comercial' },
    { id: 'COM-05', dep: 'comercial', titulo: 'Portal de clientes — tracking en línea', detalle: 'Consulta de contenedores, citas de retiro y facturas.', estado: 'pendiente', prioridad: 'alta', vence: '2025-09-30', responsable: 'TI / Comercial' },
    { id: 'COM-06', dep: 'comercial', titulo: 'Participación en feria TOC Américas', detalle: 'Stand corporativo y agenda comercial con navieras.', estado: 'completada', prioridad: 'baja', vence: '2025-03-20', responsable: 'Mercadeo' },
    { id: 'COM-07', dep: 'comercial', titulo: 'Revisión de contratos de almacenaje extraportuario', detalle: '3 depósitos externos; homologar cláusulas y tarifas.', estado: 'pendiente', prioridad: 'media', vence: '2025-08-15', responsable: 'Legal / Comercial' },
    { id: 'COM-08', dep: 'comercial', titulo: 'Campaña de servicios de carga suelta y proyecto', detalle: 'Folleto técnico y gira comercial a importadores de carga pesada.', estado: 'sin_iniciar', prioridad: 'baja', vence: '2025-10-15', responsable: 'Mercadeo' },
    { id: 'COM-09', dep: 'comercial', titulo: 'Acuerdo de niveles de servicio con agentes de aduana', detalle: 'Tiempos máximos de revisión documentaria y física.', estado: 'en_proceso', prioridad: 'media', vence: '2025-06-20', responsable: 'Comercial' },
    { id: 'COM-10', dep: 'comercial', titulo: 'Tablero comercial de volúmenes por cliente', detalle: 'Dashboard semanal de TEUs y tonelaje por cuenta.', estado: 'completada', prioridad: 'media', vence: '2025-05-05', responsable: 'Comercial / TI' },
    { id: 'COM-11', dep: 'comercial', titulo: 'Estrategia de pricing para carga refrigerada', detalle: 'Tarifas por conexión reefer y monitoreo de cadena de frío.', estado: 'pendiente', prioridad: 'media', vence: '2025-08-31', responsable: 'Gerencia Comercial' },

    /* ── TALENTO HUMANO (10) ────────────────────────────────────────── */
    { id: 'TAL-01', dep: 'talento', titulo: 'Negociación convención colectiva 2025-2028', detalle: 'Sindicato de trabajadores portuarios; mesa instalada.', estado: 'en_proceso', prioridad: 'alta', vence: '2025-08-01', responsable: 'RRHH' },
    { id: 'TAL-02', dep: 'talento', titulo: 'Plan de sucesión de mandos medios', detalle: 'Mapa de talento para superintendentes y jefes de turno.', estado: 'pendiente', prioridad: 'alta', vence: '2025-09-30', responsable: 'RRHH' },
    { id: 'TAL-03', dep: 'talento', titulo: 'Capacitación operadores de grúa (certificación)', detalle: '12 operadores en curso de recertificación internacional.', estado: 'en_proceso', prioridad: 'alta', vence: '2025-06-30', responsable: 'RRHH / Operaciones' },
    { id: 'TAL-04', dep: 'talento', titulo: 'Evaluación de desempeño anual 2024', detalle: 'Cierre de evaluaciones y planes individuales.', estado: 'completada', prioridad: 'media', vence: '2025-04-15', responsable: 'RRHH' },
    { id: 'TAL-05', dep: 'talento', titulo: 'Programa de seguridad conductual', detalle: 'Observaciones conductuales en turnos; meta 0 accidentes LTI.', estado: 'en_proceso', prioridad: 'alta', vence: '2025-12-31', responsable: 'HSE / RRHH' },
    { id: 'TAL-06', dep: 'talento', titulo: 'Reclutamiento de 8 estibadores eventuales', detalle: 'Refuerzo para pico de temporada de exportación.', estado: 'completada', prioridad: 'media', vence: '2025-05-10', responsable: 'RRHH' },
    { id: 'TAL-07', dep: 'talento', titulo: 'Digitalización de expedientes de colaboradores', detalle: 'Escaneo y repositorio con control de acceso.', estado: 'pendiente', prioridad: 'baja', vence: '2025-10-31', responsable: 'RRHH / TI' },
    { id: 'TAL-08', dep: 'talento', titulo: 'Encuesta de clima organizacional', detalle: 'Medición bianual con plan de acción por departamento.', estado: 'pendiente', prioridad: 'media', vence: '2025-09-15', responsable: 'RRHH' },
    { id: 'TAL-09', dep: 'talento', titulo: 'Actualización del reglamento interno de trabajo', detalle: 'Alineación con reformas laborales vigentes.', estado: 'en_proceso', prioridad: 'media', vence: '2025-07-31', responsable: 'Legal / RRHH' },
    { id: 'TAL-10', dep: 'talento', titulo: 'Plan de becas y formación técnica', detalle: 'Convenio con instituto técnico local; 5 becas anuales.', estado: 'sin_iniciar', prioridad: 'baja', vence: '2025-11-30', responsable: 'RRHH' },

    /* ── TRANSVERSAL / LEGAL (8) ────────────────────────────────────── */
    { id: 'LEG-01', dep: 'transversal', titulo: 'Litigio laboral caso 2023-118', detalle: 'Demanda de extrabajador; audiencia de conciliación en junio.', estado: 'en_proceso', prioridad: 'alta', vence: '2025-06-25', responsable: 'Legal' },
    { id: 'LEG-02', dep: 'transversal', titulo: 'Renovación contrato de concesión portuaria', detalle: 'Inicio de trámite ante AMP; concesión vence en 2028.', estado: 'pendiente', prioridad: 'alta', vence: '2026-06-30', responsable: 'Legal / Gerencia' },
    { id: 'LEG-03', dep: 'transversal', titulo: 'Matriz de cumplimiento normativo 2025', detalle: 'Permisos AMP, MIDA, MINSA, Bomberos y ANAM consolidados.', estado: 'completada', prioridad: 'alta', vence: '2025-05-01', responsable: 'Cumplimiento' },
    { id: 'LEG-04', dep: 'transversal', titulo: 'Programa de protección de datos personales', detalle: 'Ley 81 de 2019; políticas y registro de tratamientos.', estado: 'en_proceso', prioridad: 'media', vence: '2025-08-31', responsable: 'Legal / TI' },
    { id: 'LEG-05', dep: 'transversal', titulo: 'Actualización de poderes y representaciones', detalle: 'Poderes notariales para firma ante autoridades marítimas.', estado: 'completada', prioridad: 'media', vence: '2025-04-20', responsable: 'Legal' },
    { id: 'LEG-06', dep: 'transversal', titulo: 'Revisión de contratos con proveedores críticos', detalle: 'Cláusulas de continuidad de servicio y penalidades.', estado: 'pendiente', prioridad: 'media', vence: '2025-09-30', responsable: 'Legal / Compras' },
    { id: 'LEG-07', dep: 'transversal', titulo: 'Política antisoborno y canal de denuncias', detalle: 'Código de ética actualizado y línea ética externa.', estado: 'en_proceso', prioridad: 'alta', vence: '2025-07-15', responsable: 'Cumplimiento' },
    { id: 'LEG-08', dep: 'transversal', titulo: 'Estudio de impacto ambiental ampliación de patio', detalle: 'EIA categoría II para 3.5 hectáreas adicionales.', estado: 'pendiente', prioridad: 'alta', vence: '2025-12-31', responsable: 'Legal / Operaciones' }
  ]
};
