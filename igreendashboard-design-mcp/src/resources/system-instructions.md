# System Instructions — iGreenMCP Design System

> ESTAS REGRAS SE APLICAM AUTOMATICAMENTE A TODA CRIAÇÃO DE UI.
> O usuário NÃO precisa pedir para "seguir o design system" — isso é o padrão.

## Regra #0: Tudo via tokens

Nunca use valores hardcoded. Toda cor, tamanho, espaçamento e raio deve referenciar um token CSS:
- Cores: `var(--primary)`, `var(--fg-muted)`, `var(--border-separator)`, etc.
- Tipografia: `var(--text-heading)`, `var(--text-sm)`, etc. (9 tokens na escala)
- Spacing: `var(--space-sm)` a `var(--space-3xl)` (7 tokens)
- Radius: `var(--radius-xs)` a `var(--radius-pill)` (5 tokens)
- Shadows: `var(--shadow-card)`, `var(--shadow-popover)`
- Texto branco em fundos sólidos: `var(--on-solid)` (nunca `#fff`)

## Regra #1: Layout sidebar+topbar obrigatório

Toda página usa esta estrutura:
```html
<div class="app">
  <aside class="sidebar"> ... </aside>
  <div class="main">
    <header class="topbar"> ... </header>
    <div class="body"> <!-- conteúdo da página --> </div>
  </div>
</div>
```
Copiar sidebar e topbar de uma página existente. Apenas mudar:
- `.nav-item.active` para o item correto
- Breadcrumb (`.bc-parent` e `.bc-current`)

## Regra #2: Reutilizar classes existentes

Antes de criar CSS novo, verificar `theme/components.css` (~1700 linhas). Classes existentes por contexto:

| Contexto | Prefixo | Exemplos |
|----------|---------|----------|
| KPI cards | `.kpi-` | `.kpi-grid`, `.kpi-card`, `.kpi-value`, `.kpi-badge` |
| Tabelas | `.tbl-` | `.tbl-topbar`, `.tbl-tabs`, `.tbl-search`, `.tbl-filter-btn` |
| Drawer | `.dw-` | `.dw-header`, `.dw-tabs`, `.dw-panel`, `.dw-timeline` |
| Charts | `.ch-` | `.ch-card`, `.ch-stat-row`, `.ch-grid`, `.ch-canvas-wrap` |
| Legends | `.ch-lg-` | `.ch-lg-rich`, `.ch-lg-vals`, `.ch-lg-simple` |
| Order detail | `.od-` | `.od-tabs`, `.od-grid`, `.od-card`, `.od-status` |
| Detail page | `.od-detail-` | `.od-detail-section`, `.od-fields`, `.od-detail-tag` |
| Buttons | `.btn` | `.btn--solid`, `.btn--outline`, `.btn--ghost`, `.btn--destructive` |
| Badges | `.badge`, `.status-chip` | `.badge.buy`, `.status-chip.completed` |

## Regra #3: Dark + Light obrigatório

- Dark theme é default (`data-theme="dark"` no `<html>`)
- Tudo via tokens garante light theme automaticamente
- Anti-flash: `<script>` inline no `<head>` para aplicar tema antes do render
- Toggle: `localStorage.setItem('cv-theme', theme)`

## Regra #4: Charts sempre com legend custom

- SEMPRE `legend: { display: false }` no Chart.js
- Usar HTML legends: `.ch-lg-rich` (doughnuts), `.ch-lg-vals` (bars), `.ch-lg-simple` (lines)
- Doughnut centers: `.ch-donut-center` com `.ch-donut-val` e `.ch-donut-sub`
- Stat rows: `.ch-stat-row` com `.ch-stat` boxes (background `var(--muted)`)

## Regra #5: Tipografia da escala completa

| Token | Px | Uso típico |
|-------|-----|-----------|
| `--text-display` | 28 | Hero values, títulos de página |
| `--text-lg` | 22 | Valores destaque, donut centers |
| `--text-title` | 20 | Títulos de seção |
| `--text-heading` | 18 | Stat values, drawer titles |
| `--text-subheading` | 15 | Card titles, headings de card |
| `--text-body` | 14 | Texto padrão |
| `--text-sm` | 13 | Botões, labels, componentes |
| `--text-caption` | 12 | Legendas, metadados |
| `--text-xs` | 11 | Badges, tags, indicadores |

## Regra #6: Páginas de referência

Ao criar qualquer página ou componente, consultar as páginas existentes como modelo:

| Página | Padrões demonstrados |
|--------|--------------------|
| `analytics.html` | KPI grid, tabela com drawer, cards com charts, stat sub-cards, allocation lists |
| `products.html` | Tabela completa (toolbar, tabs, search, filter chips, export, pagination), KPI grid |
| `order-detail.html` | Tabs, grid 2 colunas, detail sections com field grids, tags, timeline, payment |
| `market-trends.html` | Filter bar, chart cards (17 tipos), stat rows, 3 tipos de legenda, sparklines |

## Regra #7: Composição de Dashboard (Golden Standard)

Ao criar uma página de dashboard (ou quando o user pedir algo como "crie um dashboard"), seguir a composição de `analytics.html`:

### Ordem das seções (top → bottom dentro de `.body`)

| Ordem | Seção | Classe CSS | Componentes |
|-------|-------|-----------|-------------|
| 1 | Filter bar | `.filter-bar` | Presets, date range, tags, icon buttons, export |
| 2 | KPI grid | `.kpi-grid` | 4× `.kpi-card` com sparklines (bar ou line) |
| 3 | Mid row | `.mid-row` (3fr 2fr) | Performance (chart+stats) + Allocation (donut+list) |
| 4 | Insights row | `.insights-row` (1fr 2fr 1fr) | Segmentation + Order Overview + User Activity |
| 5 | Geo row | `.geo-row` (2fr 1fr) | Top Countries (map+list) + Channel Revenue |
| 6 | Transaction table | `.table-section` | Tabela com toolbar, tabs, search, filters, pagination |
| 7 | Asset overview | `.ao-row` (2fr 3fr) | Total Assets (distribution) + Total Investments (chart) |

**Nota:** `.ao-row` usa `order: 1` e `.table-section` usa `order: 2` — o ao-row aparece visualmente ANTES da table.

### Row Classes Quick Reference

| Classe | Grid Columns | Uso |
|--------|-------------|-----|
| `.kpi-grid` | `repeat(4, 1fr)` | 4 KPI cards |
| `.mid-row` | `3fr 2fr` | Chart grande + card lateral |
| `.insights-row` | `1fr 2fr 1fr` | 3 cards: pequeno-grande-pequeno |
| `.geo-row` | `2fr 1fr` | Card largo + card estreito |
| `.ao-row` | `2fr 3fr` | Info + chart |

### Card → Row Mapping

- **KPI grid:** `.kpi-card` → ver `component-card.md`
- **Mid row esquerda:** Performance card (`.perf-stats` + `.chart-area`) → ver `component-card.md`
- **Mid row direita:** Allocation (`.donut-area` + `.alloc-list`) → ver `component-card.md`
- **Insights row:** Segmentation + Order Overview + User Activity → ver `component-analytics-cards.md`
- **Geo row:** Top Countries + Channel Revenue → ver `component-analytics-cards.md`
- **Table:** ver `component-table.md`
- **AO row:** Asset Overview (distribution + chart) → ver `component-analytics-cards.md`

## Regra #8: Responsividade

O sistema usa 4 breakpoints desktop-first. Ver `responsive.md` para detalhes completos.

- < 1280px: sidebar auto-colapsa para 68px
- < 1024px: grids 4-col → 2-col, 3-col → 2-col
- < 768px: tudo → 1-col, sidebar offscreen com overlay
- < 480px: padding reduzido, KPI → 1-col, topbar compacto

**Regras gerais de responsividade:**
- Qualquer layout 2+ colunas → 1 coluna em ≤ 767px
- Tabs (`flex-shrink: 0`) nunca encolhem — fazem scroll horizontal
- Filter chips sempre usam `flex-wrap: wrap` (todas as resoluções)
- Chart grids (`.ch-grid`, `.ch-grid-3`) → 1 coluna no mobile
- Stat cards (`.perf-stats`, `.ch-stat-row`) fazem wrap no mobile

## Regra #9: Tabela responsiva (Golden Standard)

> A tabela é o componente mais usado (~80% das páginas). Requer atenção especial.

### Estrutura HTML obrigatória
```html
<div class="table-section">          <!-- display: flex; flex-direction: column -->
  <div class="tbl-topbar">...</div>   <!-- FIXO: sempre visível -->
  <div class="tbl-scroll">            <!-- overflow: auto → SÓ a tabela rola -->
    <table>...</table>
  </div>
  <div class="pagination">...</div>   <!-- FIXO: sempre visível -->
</div>
```

### 5 regras invioláveis
1. **Scroll isolado**: `<table>` SEMPRE dentro de `<div class="tbl-scroll">`. NUNCA `overflow` no `.table-section`
2. **Toolbar empilha no mobile**: `.tbl-tabs` 100% width → `.tbl-search` 100% width → botões na próxima linha
3. **Tabs nunca encolhem**: `.tbl-tab { flex-shrink: 0 }` + scroll horizontal se não couber
4. **Filter chips quebram**: `.tbl-filters { flex-wrap: wrap }` em TODAS as resoluções
5. **Paginação sempre visível**: `.pagination` fica FORA de `.tbl-scroll`, nunca some ao scrollar

## Checklist automático

Antes de entregar qualquer UI:
- [ ] Funciona em dark theme?
- [ ] Funciona em light theme?
- [ ] Todas as cores vêm de tokens?
- [ ] Spacing usa a escala do sistema?
- [ ] Tipografia usa a escala do sistema?
- [ ] Layout tem sidebar + topbar?
- [ ] Sidebar toggle funciona?
- [ ] Theme toggle funciona?
- [ ] Focus visible em elementos interativos?
- [ ] Ícones SVG inline com currentColor?
- [ ] Tabelas usam `.tbl-scroll` wrapper? (scroll isolado)
- [ ] Toolbar e paginação fora do `.tbl-scroll`? (sempre visíveis)
- [ ] `.tbl-filters` tem `flex-wrap: wrap`?
- [ ] Tabs (`.tbl-tab`, `.od-tab`) têm `flex-shrink: 0`?
- [ ] Grids/charts colapsam corretamente no mobile?
- [ ] `.app` e `.drawer` usam `height: 100dvh` (fallback `100vh`)?
- [ ] Pagination empilha no mobile (texto + botões em linhas separadas)?
- [ ] Drawer faz scroll inteiro no mobile (não só `.dw-body`)?
