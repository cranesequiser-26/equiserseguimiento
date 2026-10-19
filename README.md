# Panel de Control Equiser · Seguimiento Integral

Aplicación web **estática** (sin backend) para **EQUISER PANAMÁ**: tablero maestro de control, visualización, seguimiento y cierre de las **59 acciones prioritarias** (25 altas · 27 medias · 7 bajas) derivadas de los informes integrales de ordenamiento empresarial y de seguimiento financiero, operativo y de RR. HH., y de las transcripciones de reuniones.

## Qué incluye

| Módulo | Descripción |
|---|---|
| **Dashboard ejecutivo** | KPIs (totales, por prioridad, vencidas, por vencer ≤ 7 días, en proceso, pendientes de validación/eficacia, reabiertas, escaladas, cerradas), dona por prioridad, barras por estado y por área, línea de vencimientos. Gráficos SVG propios, sin librerías de charts. |
| **Tablero maestro** | Tabla ordenable por columna (prioridad, fecha, responsable, estado, avance…), con evidencia, semáforo y exportación **CSV de la vista filtrada**. |
| **Ficha detallada** | Drawer lateral con todos los campos: brecha, riesgo, responsable/colaboradores, verificador, dependencia, evidencia, criterios de cierre y eficacia, **checklist de cierre**, historial y comentarios. |
| **Filtros avanzados** | Prioridad, estado, área, responsable, palabra clave + chips (vencidas, por vencer, sin evidencia, bloqueadas, escaladas, pendientes de validación/eficacia, reabiertas, cerradas). Persistentes en `localStorage`. |
| **Seguimiento semanal** | Orden de reunión: altas → vencidas → por vencer → medias estructurales → bajas programables. Cada tarjeta responde: qué se prometió, qué se hizo, qué falta, ¿se puede cerrar?, ¿escalar? |
| **Matriz de alcance** | Sección educativa Alta/Media/Baja: significado, decisiones esperadas, consecuencias y cuándo una acción no puede cerrarse aunque esté “hecha”. |
| **Alertas y semáforos** | Vencida / vence hoy / vence en 3 días / sin responsable / sin evidencia / bloqueada / escalada / pendiente de validación / pendiente de eficacia. Separa visualmente **prioridad ≠ estado ≠ urgencia temporal**. |
| **Vista Dirección** | Top 10 críticas, decisiones pendientes, vencidas críticas, responsables con más atrasos, riesgos financieros/operativos/legales inmediatos, bloqueos y acciones sin recursos. |

## Reglas de negocio implementadas

- **Fecha de corte del tablero: 2025-10-20** (`CATALOGOS.fechaCorte` en `data.js`). Todos los semáforos y vencimientos se calculan contra esa fecha.
- Los **9 estados oficiales**: Pendiente de validación · Abierta · En proceso · Implementada · Pendiente de eficacia · Cerrada · Reabierta · Bloqueada · Escalada.
- **Sin evidencia no se cierra. Sin verificación no se cierra.** El checklist de cierre bloquea visualmente el cierre si falta responsable, fecha, evidencia, verificación independiente o comentario de cierre.
- “Implementada” ≠ “Cerrada”. “Pendiente de validación” **no** es incumplimiento confirmado.
- El ejecutor **no autoaprueba** el cierre en acciones críticas (verificador ≠ responsable).

## Estructura

```
equiserseguimiento/
├── index.html        # Aplicación (vistas: dashboard, tablero, semanal, alertas, dirección, matriz)
├── styles.css        # Sistema visual corporativo (#17365E / #E29F36), claro y oscuro
├── app.js            # Lógica: filtros, KPIs, gráficos SVG, drawer, checklist, CSV
├── data.js           # 59 acciones extendidas + catálogos (editable, listo para migrar a JSON/API)
├── assets/logo.js    # Logotipo corporativo incrustado como data-URI (sin binarios en el repo)
├── vercel.json       # Despliegue estático en Vercel (cleanUrls)
├── wrangler.toml     # Despliegue en Cloudflare Pages
├── .gitignore
└── LICENSE           # Propietario — EQUISER PANAMÁ
```

## Uso local

No requiere build ni servidor: **abra `index.html` directamente en el navegador** (funciona con `file://`). Opcionalmente, para servirlo estático:

```bash
npx serve .        # o: python3 -m http.server 8080
```

Modo claro/oscuro con el botón ◑/☀ del encabezado (respeta `prefers-color-scheme` y persiste la elección).

## Despliegue

Repositorio: <https://github.com/cranesequiser-26/equiserseguimiento>

### Vercel

1. Importe el repositorio en [vercel.com/new](https://vercel.com/new) → **Import Git Repository** → `cranesequiser-26/equiserseguimiento`.
2. Framework Preset: **Other**. Build Command: *(vacío)*. Output Directory: *(vacío / raíz)*.
3. Deploy. El archivo `vercel.json` incluido configura sitio estático con `cleanUrls` (URLs sin `.html`).
4. Para redeploys automáticos, cada `git push` a `main` dispara un nuevo despliegue.

CLI alternativo:
```bash
npm i -g vercel
vercel --prod
```

### Cloudflare Pages

1. En el dashboard de Cloudflare → **Workers & Pages** → **Create application → Pages → Connect to Git**.
2. Seleccione `cranesequiser-26/equiserseguimiento`.
3. Build settings: Framework preset **None** · Build command: *(vacío)* · Build output directory: `/` (el `wrangler.toml` incluido ya define `pages_build_output_dir = "."` y `name = "equiserseguimiento"`).
4. Deploy. El sitio quedará en `https://equiserseguimiento.pages.dev`.

CLI alternativo (Wrangler):
```bash
npm i -g wrangler
wrangler pages deploy . --project-name=equiserseguimiento
```

## Mantenimiento de datos

Las acciones viven en `data.js` como arreglo `ACCIONES` con campos documentados (id, codigo, titulo, descripcion, prioridad, area, subarea, responsable, colaboradores, origen, fechas, estado, porcentaje_avance, riesgo, impacto, urgencia, evidencia_requerida, evidencia_cargada, bloqueo, dependencia, verificador, criterio_cierre, criterio_eficacia, comentarios, historial, etiquetas). La estructura está lista para evolucionar a una API/base de datos sin cambiar la interfaz.

---

© 2025 EQUISER PANAMÁ · Uso interno. Todos los derechos reservados (ver `LICENSE`).
