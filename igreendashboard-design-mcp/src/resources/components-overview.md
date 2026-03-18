# Components Overview

> Catálogo completo de componentes do iGreenMCP Design System com referências cruzadas entre standalone folders e MCP resources.

## Índice de Componentes

| Componente | Prefixo CSS | Standalone Folder | MCP Resource | Complexidade |
|-----------|------------|-------------------|--------------|-------------|
| Button | `.btn` | `components/button/` | — | Simples |
| Card | `.card`, `.ca-`, `.pstat-`, `.pl-`, `.al-` | `components/card/` | `component-card.md` | Médio |
| KPI Card | `.kpi-` | `components/kpi-card/` | `component-card.md` | Simples |
| Badge | `.badge`, `.status-chip`, `.chg-`, `.al-chg`, `.seg-chg` | `components/badge/` | — | Simples |
| Pagination | `.pagination`, `.pb`, `.page-` | `components/pagination/` | — | Simples |
| Table | `.tbl-`, `.filter-chip`, `.fc-`, `.asset-cell`, `.coin-` | `components/table/` | `component-table.md` | Complexo |
| Filter Bar | `.filter-bar`, `.preset`, `.ftag`, `.icon-btn`, `.export-btn` | `components/filter-bar/` | — | Médio |
| Drawer | `.dw-`, `.drawer` | `components/drawer/` | `component-drawer.md` | Complexo |
| Sidebar | `.sidebar`, `.nav-item`, `.ni-`, `.sec-`, `.uc-` | — | `component-navigation.md` | Médio |
| Topbar | `.topbar`, `.t-icon-btn`, `.bc-`, `.wallet-`, `.user-` | — | `component-navigation.md` | Médio |
| Forms/Inputs | `.tbl-search`, `.dw-comment-box`, `.ov-year-select`, `.form-*`, `.form-toggle` | — | `component-forms.md` | Medio |
| Edit Page | `.form-layout`, `.form-nav`, `.form-section`, `.form-row`, `.form-group` | — | `component-edit-page.md` | Medio |
| Charts | `.chart-area`, `.donut-area`, `.ao-chart`, `.ov-chart`, `.ch-card`, `.ch-grid` | — | `component-charts.md` | Complexo |
| Chart Legends | `.ch-lg-rich`, `.ch-lg-vals`, `.ch-lg-simple` | — | `component-legends.md` | Médio |
| Detail Page | `.od-header`, `.od-tabs`, `.od-grid`, `.od-detail-*` | — | `component-detail-page.md` | Complexo |
| Stat Row | `.ch-stat-row`, `.ch-stat`, `.ch-stat-val` | — | `component-charts.md` | Simples |
| Customer Segmentation | `.seg-*` | — | `component-analytics-cards.md` | Médio |
| Order Overview | `.ov-stat*`, `.ov-chart`, `.ov-year-select` | — | `component-analytics-cards.md` | Médio |
| User Activity | `.ua-*` | — | `component-analytics-cards.md` | Médio |
| Top Countries | `.tc-*` | — | `component-analytics-cards.md` | Médio |
| Channel Revenue | `.cr-*` | — | `component-analytics-cards.md` | Médio |
| Asset Overview | `.ao-*`, `.dist-*` | — | `component-analytics-cards.md` | Complexo |

## Recursos MCP (19 total)

### Foundation
| Resource | Conteúdo |
|----------|----------|
| `system-instructions.md` | Regras "enraizadas" que dispensam instrução do user — aplicadas automaticamente |
| `colors.md` | Paleta completa de tokens: surfaces, foreground (14 níveis), brand, status, overlays, shadows, `--on-solid` |
| `typography.md` | Escala tipográfica (9 tokens), pesos, font features, padrões de uso |
| `layout.md` | Spacing scale, border radius, grid patterns, z-index, glass effect, scroll, responsive |
| `rules.md` | 12 regras obrigatórias, 6 princípios, z-index system, naming dictionary, icon sizes |
| `states.md` | Hover, active, focus, disabled, loading, open/closed, collapsed, empty/error states |

### Components
| Resource | Conteúdo |
|----------|----------|
| `component-card.md` | Card base, KPI card, stat sub-cards, allocation list, chart containers |
| `component-table.md` | 5-layer anatomy, cell types (coin, product, sales bar, actions, checkbox), toolbar, filter system, pagination |
| `component-drawer.md` | Overlay, slide animation, metadata grid, tabs, 4 panel types |
| `component-navigation.md` | Sidebar (expanded/collapsed), topbar (glass), breadcrumb, **HTML template copiável** |
| `component-forms.md` | Input base, search, textarea, comment box, select, filter chips, **form layout system**, toggle, checkbox, page-select |
| `component-edit-page.md` | Edit/form page composition: step nav, form sections, field patterns, toggle groups, action footer, **HTML template** |
| `component-charts.md` | Chart.js config, palette, 4 chart types, tooltips, stat rows, chart card variants |
| `component-legends.md` | 3 padrões de legenda (rich, value, simple), doughnut center, stat row |
| `component-detail-page.md` | Padrões `.od-*`: tabs, grid 2 colunas, detail sections, timeline, tags, **comments, attachments, HTML template completo** |
| `page-templates.md` | 4 templates HTML completos: base, tabela, detalhe, gráficos |
| `component-analytics-cards.md` | 6 analytics card types: Segmentation, Order Overview, User Activity, Top Countries, Channel Revenue, Asset Overview |
| `responsive.md` | 4 breakpoints responsivos, CSS completo, mobile sidebar toggle, checklist |
| `components-overview.md` | Este arquivo — índice e catálogo |

## Standalone Component Folders (8 total)

Cada folder contém:
- `<name>.css` — CSS extraído do `components.css` fonte
- `index.html` — Showcase HTML com preview visual + API reference table + theme toggle

```
components/
├── button/          ← 7 variantes, 4 tamanhos, icon, loading
├── card/            ← Base card, stat cards, legend, allocation
├── kpi-card/        ← 4-col grid, value, badge, sparkline
├── badge/           ← Transaction, KPI, status, change indicators
├── pagination/      ← Page info, numbered buttons, arrows
├── table/           ← Complete table with toolbar, filters, sort
├── filter-bar/      ← Presets, date range, tags, action buttons
└── drawer/          ← 620px slide-in with 4 tab panels
```

## Mapa de Prefixos CSS

| Prefixo | Componente | Qde Classes |
|---------|-----------|-------------|
| `.btn` | Button | ~30 |
| `.card` / `.ca-` | Card | ~15 |
| `.kpi-` | KPI Card | ~10 |
| `.badge` | Badge | ~5 |
| `.status-chip` / `.s-dot` | Status chip | ~5 |
| `.chg-` / `.al-chg` / `.seg-chg` | Change indicators | ~8 |
| `.tbl-` | Table toolbar | ~15 |
| `.filter-chip` / `.fc-` | Filter chips | ~12 |
| `.dw-` | Drawer | ~35 |
| `.ao-` | Asset Overview | ~8 |
| `.tc-` | Traffic/Countries | ~10 |
| `.cr-` | Channel Revenue | ~8 |
| `.seg-` | Segmentation | ~6 |
| `.ov-` | Order Overview | ~6 |
| `.ua-` | User Activity | ~6 |
| `.pl-` / `.perf-` / `.pstat-` | Performance stats | ~10 |
| `.dist-` | Distribution | ~6 |
| `.al-` | Allocation | ~8 |
| `.pb` / `.pagination` / `.page-` | Pagination | ~4 |
| `.od-` | Order Detail page | ~20 |
| `.od-detail-` | Detail sections | ~12 |
| `.od-comment-` | Comments tab | ~10 |
| `.od-att-` | Attachments tab | ~7 |
| `.form-` | Form layout & inputs | ~20 |
| `.form-toggle` | Toggle/switch | ~6 |
| `.prod-` | Product table cells | ~3 |
| `.sales-` | Sales progress bar | ~4 |
| `.tbl-action` | Table action buttons | ~3 |
| `.tbl-check` | Table checkbox | ~3 |
| `.ch-` | Chart cards/grids | ~15 |
| `.ch-lg-` | Chart legends | ~12 |
| `.ch-stat-` | Chart stat rows | ~6 |

**Total:** ~340+ classes documentadas.

## Como Usar Este Sistema

### Para criar uma nova página de dashboard:
1. Gere o CSS de tokens via `generate_theme_css` tool
2. Importe o CSS gerado como primeiro stylesheet
3. Consulte `layout.md` para a estrutura (sidebar + main + topbar)
4. Consulte `component-navigation.md` para sidebar e topbar
5. Monte o conteúdo com cards (`component-card.md`) e tabelas (`component-table.md`)
6. Adicione charts via `component-charts.md`
7. Siga as `rules.md` para garantir consistência

### Para criar um componente novo:
1. Consulte `rules.md` para naming convention e regras
2. Use tokens de `colors.md` e `layout.md` (nunca hardcode)
3. Implemente todos os estados de `states.md`
4. Teste em dark e light theme
5. Siga o checklist de qualidade em `rules.md`
