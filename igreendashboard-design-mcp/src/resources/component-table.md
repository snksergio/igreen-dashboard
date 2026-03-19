# Component: Table

> Tabela com toolbar de 5 camadas, tabs, filtros, busca, ordenação, paginação e cell types genéricos (produto, progresso, ações, checkbox).

## Anatomia (5 camadas)

```
┌─ .table-section ────────────────────────────────────────────┐
│                                                               │
│  Layer 1 — .tbl-title-row                                    │
│  ┌─────────────────────────────────────────────────────────┐ │
│  │ .card-title + .tbl-badge    .tbl-export-btn             │ │
│  └─────────────────────────────────────────────────────────┘ │
│                                                               │
│  Layer 2 — .tbl-toolbar-row                                  │
│  ┌─────────────────────────────────────────────────────────┐ │
│  │ .tbl-tabs [All|Buy|Sell|Swap]  ← spacer →  .tbl-search │ │
│  │                                  .tbl-filter-btn         │ │
│  │                                  .tbl-refresh-btn        │ │
│  └─────────────────────────────────────────────────────────┘ │
│                                                               │
│  Layer 3 — .tbl-filters (hidden by default, toggle via btn)  │
│  ┌─────────────────────────────────────────────────────────┐ │
│  │ .filter-chip .filter-chip .filter-chip .add-filter-btn  │ │
│  └─────────────────────────────────────────────────────────┘ │
│                                                               │
│  Layer 4 — .tbl-scroll (scroll wrapper — only table scrolls) │
│  ┌─────────────────────────────────────────────────────────┐ │
│  │ table                                                    │ │
│  │   thead: Asset | Type | Amount | Price | Total | Chg    │ │
│  │   tbody: rows com hover var(--overlay-3)                 │ │
│  └─────────────────────────────────────────────────────────┘ │
│                                                               │
│  Layer 5 — .pagination                                       │
│  ┌─────────────────────────────────────────────────────────┐ │
│  │ .page-info "Showing 1-10 of 1,247"   .page-btns [1..10]│ │
│  └─────────────────────────────────────────────────────────┘ │
│                                                               │
└─────────────────────────────────────────────────────────────┘
```

## CSS Spec

### Container
```css
.table-section {
  background: var(--card);
  border-radius: var(--radius-md);
  padding: var(--space-xl) var(--space-2xl);    /* 20px 24px */
  box-shadow: var(--shadow-card);
  display: flex;
  flex-direction: column;
}

/* Scroll wrapper: only the table scrolls, toolbar + pagination stay fixed */
.tbl-scroll {
  overflow: auto;
  flex: 1;
  min-height: 0;
  -webkit-overflow-scrolling: touch;
}
```

### Tab system (pill style)
```css
.tbl-tabs {
  display: inline-flex; gap: 2px;
  background: var(--muted);
  border-radius: var(--radius-sm); padding: 3px;
}
.tbl-tab {
  min-height: 32px; padding: 0 14px;
  border-radius: var(--radius-xs);
  background: transparent; color: var(--fg-muted);
  font-size: var(--text-sm); font-weight: 500;
}
.tbl-tab.active {
  background: var(--surface-raised); color: var(--foreground);
  font-weight: 600;
  box-shadow: 0 1px 3px rgba(0,0,0,0.06);
}
```

### Filter chip system
```css
.filter-chip {
  height: 32px; padding: 0 12px;
  background: var(--secondary); border: 1px solid var(--border);
  border-radius: var(--radius-sm);
  font-size: var(--text-caption); font-weight: 500;
}
/* Quando ativo — muda para verde */
.filter-chip.active {
  background: var(--primary-8);
  border-color: var(--primary-20);
  color: var(--primary);
}
```

**Dropdown do filtro:**
```css
.fc-dropdown {
  position: absolute; top: calc(100% + 6px);
  background: var(--popover); border: 1px solid var(--popover-border);
  border-radius: var(--radius-sm); z-index: 200;
  box-shadow: var(--shadow-popover);
  min-width: 148px;
}
```

### Table head
```css
thead tr { background: var(--muted); }
thead th {
  font-size: var(--text-xs); color: var(--fg-muted);
  font-weight: 600; text-transform: uppercase;
  letter-spacing: .05em; padding: var(--space-md);
}
/* Rounded corners only nas extremidades */
thead th:first-child { border-radius: var(--radius-sm) 0 0 var(--radius-sm); }
thead th:last-child  { border-radius: 0 var(--radius-sm) var(--radius-sm) 0; }
```

### Table body
```css
tbody tr {
  border-top: 1px solid var(--border-separator);
  transition: background-color .2s var(--ease-out);
}
tbody tr:hover { background: var(--overlay-3); cursor: pointer; }
tbody td { padding: var(--space-md); font-size: var(--text-body); vertical-align: middle; }
```

### Alignment & Spacing Precision
| Seletor | Propriedade | Valor | Nota |
|---------|-------------|-------|------|
| `thead th span` | `vertical-align` | `middle` | Alinhamento vertical do texto no header |
| `tbody td` | `vertical-align` | `middle` | Alinhamento vertical de todas as células |
| `.tbl-check` | `vertical-align` | `middle` | Alinhamento do checkbox na célula |
| `.asset-cell` | `gap` | `10px` | Espaço entre ícone e texto |
| `.tbl-title-left` | `gap` | `10px` | Espaço entre título e badge count |
| `.tbl-search-full` | `height` | `40px` | Variante full-width do search |

---

## Tipos de Célula

| Tipo | Classes | Descrição |
|------|---------|-----------|
| Asset | `.asset-cell` > `.coin-icon` + `.coin-sym` + `.coin-name` | Ícone colorido 34×34px + símbolo bold + nome muted |
| Badge | `.badge.buy` / `.badge.sell` | Pill verde (buy) ou vermelho (sell) |
| Numeric | `td.mono` | `font-variant-numeric: tabular-nums` |
| Change | `.chg-pos` / `.chg-neg` / `.chg-nil` | Verde/vermelho/ghost para variação percentual |
| Status | `.status-chip` + `.s-dot` | Chip com dot colorido (.completed/.pending/.failed) — dot cor automática via CSS |
| Date | `td.tbl-date` | `color: var(--fg-muted)` para colunas de data |
| Right-align | `td.r` / `th.r` | `text-align: right` para colunas numéricas |
| Col Check | `th.tbl-col-check` | Coluna checkbox com `width: 40px` |
| Col Actions | `th.tbl-col-actions` | Coluna de ações com `width: 80px` |

### Coin icon colors (referência)
```html
<span class="coin-icon" style="background: #F7931A; color: #fff">BT</span>  <!-- Bitcoin -->
<span class="coin-icon" style="background: #627EEA; color: #fff">ET</span>  <!-- Ethereum -->
<span class="coin-icon" style="background: #9945FF; color: #fff">SO</span>  <!-- Solana -->
<span class="coin-icon" style="background: #0D1E30; color: #fff">AD</span>  <!-- Cardano -->
<span class="coin-icon" style="background: #E6007A; color: #fff">DO</span>  <!-- Polkadot -->
```

---

## Toolbar Buttons Spec

| Classe | Tamanho | Background | Hover |
|--------|---------|------------|-------|
| `.tbl-search` | h: 36px, w: auto | `var(--input)` | `border-color: var(--ring)` |
| `.tbl-filter-btn` | h: 36px | `var(--secondary)` | `var(--overlay-10)` |
| `.tbl-filter-btn.active` | — | `var(--primary-8)` | `border-color: var(--primary-20)` |
| `.tbl-export-btn` | h: 36px | `var(--secondary)` | `var(--overlay-10)` |
| `.tbl-refresh-btn` | 36×36px | `var(--secondary)` | `var(--overlay-10)` |

**Ícones nos toolbar buttons (CSS automático — não use atributos inline no SVG):**
- `.tbl-search svg` → 14px
- `.tbl-filter-btn svg` → 14px
- `.tbl-export-btn svg` → 14px
- `.tbl-refresh-btn svg` → 14px

---

## Padrão de Uso Completo

```html
<div class="table-section">
  <div class="tbl-topbar">
    <!-- Row 1: Title -->
    <div class="tbl-title-row">
      <div class="tbl-title-left">
        <div class="card-title">Recent Transactions</div>
        <span class="tbl-badge">1,247</span>
      </div>
      <div class="tbl-title-right">
        <button class="tbl-export-btn">
          <svg><!-- download icon --></svg> Export
        </button>
      </div>
    </div>

    <!-- Row 2: Toolbar -->
    <div class="tbl-toolbar-row">
      <div class="tbl-tabs">
        <button class="tbl-tab active">All</button>
        <button class="tbl-tab">Buy</button>
        <button class="tbl-tab">Sell</button>
        <button class="tbl-tab">Swap</button>
      </div>
      <div class="tbl-toolbar-spacer"></div>
      <div class="tbl-search">
        <svg><!-- search icon --></svg>
        <input type="text" placeholder="Search...">
      </div>
      <button class="tbl-filter-btn">
        <svg><!-- filter icon --></svg> Filter
      </button>
      <button class="tbl-refresh-btn">
        <svg><!-- refresh icon --></svg>
      </button>
    </div>

    <!-- Row 3: Filters (hidden by default) -->
    <div class="tbl-filters">
      <div class="filter-chip-wrap">
        <button class="filter-chip active">
          <span class="fc-label">Type:</span>
          <span class="fc-val">Buy</span>
          <span class="fc-clear">×</span>
        </button>
      </div>
      <div class="filter-chip-wrap">
        <button class="filter-chip">
          <span class="fc-label">Status</span>
          <span class="fc-chevron">▾</span>
        </button>
      </div>
      <button class="add-filter-btn">+ Add filter</button>
    </div>
  </div>

  <!-- Table (wrapped in .tbl-scroll so only the table scrolls) -->
  <div class="tbl-scroll">
  <table>
    <thead>
      <tr>
        <th>Asset</th>
        <th>Type</th>
        <th class="r">Amount</th>
        <th class="r">Price</th>
        <th class="r">Total</th>
        <th class="r">24h</th>
        <th>Status</th>
        <th class="r">Date</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>
          <div class="asset-cell">
            <span class="coin-icon" style="background:#F7931A;color:#fff">BT</span>
            <div><div class="coin-sym">BTC</div><div class="coin-name">Bitcoin</div></div>
          </div>
        </td>
        <td><span class="badge buy">Buy</span></td>
        <td class="r mono">0.4521</td>
        <td class="r mono">$43,250.00</td>
        <td class="r mono">$19,553.23</td>
        <td class="r"><span class="chg-pos">+2.41%</span></td>
        <td><span class="status-chip completed"><span class="s-dot"></span>Completed</span></td>
        <td class="r">Jan 15, 2024</td>
      </tr>
      <!-- more rows -->
    </tbody>
  </table>
  </div>

  <!-- Pagination -->
  <div class="pagination">
    <span class="page-info">Showing 1-10 of 1,247 transactions</span>
    <div class="page-btns">
      <button class="pb">‹</button>
      <button class="pb active">1</button>
      <button class="pb">2</button>
      <button class="pb">3</button>
      <button class="pb">...</button>
      <button class="pb">10</button>
      <button class="pb">›</button>
    </div>
  </div>
</div>
```

---

## Generic Cell Types

> Além das células de transação (coin, badge, change), o sistema suporta tipos genéricos para tabelas de produtos, inventário, etc.

### Product Cell

Imagem + nome + ID, reutiliza `.asset-cell` como wrapper:

```css
.prod-img  { width: 44px; height: 44px; border-radius: var(--radius-sm); object-fit: cover; flex-shrink: 0; background: var(--muted); }
.prod-name { font-size: var(--text-sm); font-weight: 600; }
.prod-id   { font-size: var(--text-xs); color: var(--fg-muted); margin-top: 1px; }
```

```html
<td>
  <div class="asset-cell">
    <div class="prod-img" style="background: var(--elevated)"></div>
    <div>
      <div class="prod-name">Flörven Chair</div>
      <div class="prod-id">ID: 098327NT</div>
    </div>
  </div>
</td>
```

### Sales Progress Bar

Barra de progresso inline com valor numérico:

```css
.sales-cell     { min-width: 160px; }
.sales-val      { font-size: var(--text-sm); font-weight: 600; margin-bottom: 4px; }
.sales-bar      { width: 120px; height: 5px; background: var(--muted); border-radius: 3px; overflow: hidden; }
.sales-bar-fill { height: 100%; border-radius: 3px; transition: width .4s var(--ease-out); }
```

```html
<td>
  <div class="sales-cell">
    <div class="sales-val">387 Sales</div>
    <div class="sales-bar">
      <div class="sales-bar-fill" style="width:58%; background:var(--primary)"></div>
    </div>
  </div>
</td>

<!-- Variantes de cor -->
<div class="sales-bar-fill" style="width:75%; background:var(--primary)"></div>     <!-- verde -->
<div class="sales-bar-fill" style="width:30%; background:var(--destructive)"></div> <!-- vermelho -->
<div class="sales-bar-fill" style="width:50%; background:var(--warning)"></div>     <!-- amarelo -->
```

### Action Buttons

Botões de ação por linha (edit, delete):

```css
.tbl-actions    { display: flex; gap: 4px; justify-content: flex-end; }
.tbl-action-btn {
  width: 32px; height: 32px; border-radius: var(--radius-xs);
  border: none; background: transparent;
  color: var(--fg-dim); cursor: pointer;
  display: flex; align-items: center; justify-content: center;
  transition: all 150ms var(--ease-out);
}
.tbl-action-btn:hover              { background: var(--overlay-8); color: var(--foreground); }
.tbl-action-btn.destructive:hover  { color: var(--destructive); background: var(--destructive-8); }
```

```html
<td class="r">
  <div class="tbl-actions">
    <button class="tbl-action-btn" title="Edit">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/>
      </svg>
    </button>
    <button class="tbl-action-btn destructive" title="Delete">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/>
        <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/>
      </svg>
    </button>
  </div>
</td>
```

### Bulk Selection Checkbox

Custom checkbox em header e rows:

```css
.tbl-check {
  width: 16px; height: 16px; border-radius: 4px;
  border: 1px solid var(--border-soft);
  background: transparent; appearance: none; -webkit-appearance: none;
  cursor: pointer; transition: all 150ms var(--ease-out);
}
.tbl-check:checked { background: var(--primary); border-color: var(--primary); }
.tbl-check:hover   { border-color: var(--ring); }
```

```html
<thead>
  <tr>
    <th class="tbl-col-check"><input type="checkbox" class="tbl-check" /></th>
    <th>Product</th>
    <th class="r">Price</th>
    <!-- ... -->
  </tr>
</thead>
<tbody>
  <tr>
    <td><input type="checkbox" class="tbl-check" /></td>
    <td><!-- product cell --></td>
    <!-- ... -->
  </tr>
</tbody>
```

### Page Size Select

Dropdown para items por página na pagination bar:

```css
.page-select {
  height: 34px; padding: 0 28px 0 12px;
  background: var(--secondary); border: 1px solid var(--border);
  border-radius: var(--radius-sm);
  color: var(--fg-secondary); font-size: var(--text-xs);
  appearance: none; -webkit-appearance: none;
  /* Custom SVG chevron */
  background-image: url("data:image/svg+xml,...");
  background-position: right 10px center;
  background-repeat: no-repeat;
}
```

```html
<div class="pagination">
  <span class="page-info">Showing 1-25 of 312 products</span>
  <div style="display:flex;align-items:center;gap:var(--space-md)">
    <select class="page-select">
      <option>10</option>
      <option selected>25</option>
      <option>50</option>
      <option>100</option>
    </select>
    <div class="page-btns">
      <button class="pb">‹</button>
      <button class="pb active">1</button>
      <button class="pb">2</button>
      <button class="pb">...</button>
      <button class="pb">13</button>
      <button class="pb">›</button>
    </div>
  </div>
</div>
```

### Product Table — Full Example

```html
<div class="table-section">
  <div class="tbl-topbar">
    <div class="tbl-title-row">
      <div class="tbl-title-left">
        <div class="card-title">Products</div>
        <span class="tbl-badge">312</span>
      </div>
      <div class="tbl-title-right">
        <button class="btn btn--solid btn--sm">+ Add Product</button>
      </div>
    </div>
    <div class="tbl-toolbar-row">
      <div class="tbl-tabs">
        <button class="tbl-tab active">All</button>
        <button class="tbl-tab">Active</button>
        <button class="tbl-tab">Draft</button>
        <button class="tbl-tab">Archived</button>
      </div>
      <div class="tbl-toolbar-spacer"></div>
      <div class="tbl-search-full">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
        </svg>
        <input type="text" placeholder="Search products..." />
      </div>
      <button class="tbl-filter-btn">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/>
        </svg>
        Filter
      </button>
    </div>
  </div>

  <div class="tbl-scroll">
  <table>
    <thead>
      <tr>
        <th class="tbl-col-check"><input type="checkbox" class="tbl-check" /></th>
        <th>Product</th>
        <th class="r">Price</th>
        <th class="r">Quantity</th>
        <th>Sales</th>
        <th class="r tbl-col-actions"></th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><input type="checkbox" class="tbl-check" /></td>
        <td>
          <div class="asset-cell">
            <div class="prod-img"></div>
            <div>
              <div class="prod-name">Flörven Chair</div>
              <div class="prod-id">ID: 098327NT</div>
            </div>
          </div>
        </td>
        <td class="r mono">$252.00</td>
        <td class="r">46</td>
        <td>
          <div class="sales-cell">
            <div class="sales-val">387 Sales</div>
            <div class="sales-bar">
              <div class="sales-bar-fill" style="width:58%;background:var(--primary)"></div>
            </div>
          </div>
        </td>
        <td class="r">
          <div class="tbl-actions">
            <button class="tbl-action-btn" title="Edit">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/></svg>
            </button>
            <button class="tbl-action-btn destructive" title="Delete">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>
            </button>
          </div>
        </td>
      </tr>
      <!-- more rows -->
    </tbody>
  </table>
  </div>

  <div class="pagination">
    <span class="page-info">Showing 1-25 of 312 products</span>
    <div style="display:flex;align-items:center;gap:var(--space-md)">
      <select class="page-select">
        <option>10</option><option selected>25</option><option>50</option><option>100</option>
      </select>
      <div class="page-btns">
        <button class="pb">‹</button>
        <button class="pb active">1</button>
        <button class="pb">2</button>
        <button class="pb">...</button>
        <button class="pb">13</button>
        <button class="pb">›</button>
      </div>
    </div>
  </div>
</div>
```

---

## Responsive — Regras Obrigatórias

> **A tabela é o componente mais usado do sistema (~80% das páginas).** Toda tabela DEVE seguir estas regras para garantir usabilidade em todas as resoluções.

### Princípio #1: Scroll isolado na tabela

O scroll **NUNCA** deve afetar o container inteiro. Apenas a `<table>` dentro de `.tbl-scroll` faz scroll. O toolbar e a paginação ficam SEMPRE visíveis.

**Estrutura HTML obrigatória:**
```html
<div class="table-section">        <!-- flex column -->
  <div class="tbl-topbar">          <!-- FIXO: sempre visível -->
    <div class="tbl-title-row">...</div>
    <div class="tbl-toolbar-row">...</div>
    <div class="tbl-filters">...</div>
  </div>
  <div class="tbl-scroll">          <!-- SCROLL: só a tabela rola -->
    <table>...</table>
  </div>
  <div class="pagination">          <!-- FIXO: sempre visível -->
    ...
  </div>
</div>
```

**CSS que garante isso:**
```css
/* Base — todas as resoluções */
.table-section { display: flex; flex-direction: column; }
.tbl-scroll    { overflow: auto; flex: 1; min-height: 0; -webkit-overflow-scrolling: touch; }

/* Mobile — força scroll horizontal na tabela */
@media (max-width: 767px) {
  .tbl-scroll table { min-width: 700px; }
}
```

> **NUNCA** colocar `overflow-x: auto` no `.table-section`. O scroll vai no `.tbl-scroll`.

### Princípio #2: Toolbar empilha no mobile

No desktop, `.tbl-toolbar-row` mostra tudo em uma linha (tabs + spacer + search + botões). No mobile, o toolbar empilha verticalmente com cada grupo ocupando sua própria linha.

```
DESKTOP:
┌─ [All|Completed|Pending|Failed]  ──────  [🔍 Search] [Filter] [↻] ─┐

MOBILE (≤ 767px):
┌─ [All] [Completed] [Pending] [Failed]  ─────────────────────────────┐
├─ [🔍 Search...                                                    ] ┤
├─ [▼ Filter]  [↓ Export]  [↻]                                       ┤
└──────────────────────────────────────────────────────────────────────┘
```

**CSS mobile:**
```css
@media (max-width: 767px) {
  .tbl-toolbar-row   { flex-wrap: wrap; gap: var(--space-sm); }
  .tbl-toolbar-spacer { display: none; }
  .tbl-tabs           { width: 100%; overflow-x: auto; -webkit-overflow-scrolling: touch; }
  .tbl-tab            { flex-shrink: 0; }
  .tbl-search         { width: 100%; order: -1; }
  .tbl-search input   { width: 100%; }
  .tbl-search-full    { width: 100%; }
  .tbl-title-row      { flex-wrap: wrap; gap: var(--space-sm); }
}
```

**Regras do empilhamento:**
1. `.tbl-tabs` → 100% width, primeira linha. Se não couber, faz scroll horizontal (`overflow-x: auto` + `flex-shrink: 0` nos tabs)
2. `.tbl-search` / `.tbl-search-full` → 100% width, linha própria via `order: -1` (fica acima dos botões)
3. Botões (filter, export, refresh) → próxima linha, lado a lado
4. `.tbl-toolbar-spacer` → `display: none` (não empurra elementos)
5. `.tbl-title-row` → faz wrap se título + badge + botões não couberem

### Princípio #3: Filter chips quebram em múltiplas linhas

Os `.tbl-filters` usam `flex-wrap: wrap` **em TODAS as resoluções** (não é regra mobile-only). Quando os chips de filtro não cabem em uma linha, eles automaticamente quebram para a próxima.

```css
/* Base — TODAS as resoluções */
.tbl-filters { flex-wrap: wrap; }
```

> Isso garante que conforme o usuário adiciona mais filtros, eles sempre ficam visíveis e organizados.

### Princípio #4: Tabs fazem scroll horizontal quando não cabem

Tanto `.tbl-tabs` (tabs da tabela) quanto `.od-tabs` (tabs de detail page) devem fazer scroll horizontal ao invés de encolher ou sumir.

```css
/* Tabs da tabela */
.tbl-tabs { overflow-x: auto; -webkit-overflow-scrolling: touch; }
.tbl-tab  { flex-shrink: 0; }  /* NUNCA encolhe */

/* Tabs de order detail */
.od-tabs { overflow-x: auto; -webkit-overflow-scrolling: touch; }
.od-tab  { flex-shrink: 0; }  /* NUNCA encolhe */
```

> A regra é: **tabs nunca encolhem**. Se não cabem, scroll horizontal. Nunca desaparecem, nunca ficam cortados.

---

## Checklist

- [ ] `<table>` envolvida em `<div class="tbl-scroll">` (scroll isolado)
- [ ] `.table-section` usa flex column (toolbar e pagination sempre visíveis)
- [ ] Toolbar empilha no mobile: tabs 100%, search 100%, botões na próxima linha
- [ ] `.tbl-tabs` faz scroll horizontal com `flex-shrink: 0` nos tabs
- [ ] `.tbl-filters` usa `flex-wrap: wrap` (todas as resoluções)
- [ ] `.tbl-search` ocupa 100% width no mobile
- [ ] `.tbl-toolbar-spacer` fica `display: none` no mobile
- [ ] Paginação sempre visível (nunca dentro de `.tbl-scroll`)
- [ ] Table-section usa `var(--card)` background
- [ ] Thead usa `var(--muted)` background com border-radius nas extremidades
- [ ] Rows usam `var(--border-separator)` como divisor (não `--border`)
- [ ] Hover de row usa `var(--overlay-3)` (overlay mais sutil)
- [ ] Colunas numéricas usam `font-variant-numeric: tabular-nums`
- [ ] Filter dropdown usa z-index 200
- [ ] Product cells usam `.asset-cell` wrapper com `.prod-img` + `.prod-name` + `.prod-id`
- [ ] Sales bar usa `.sales-bar-fill` com width dinâmico e cores por token
- [ ] Action buttons usam `.tbl-action-btn` (32×32px) com `.destructive` variant
- [ ] Toolbar SVGs sem `width`/`height` inline — CSS controla (14px)
- [ ] Status chip `.s-dot` sem inline style — cor automática via CSS
- [ ] Pagination ellipsis usa `.pb--ellipsis` (não `.pb` com inline style)
- [ ] Checkbox column usa `.tbl-col-check` (não `style="width:40px"`)
- [ ] Actions column usa `.tbl-col-actions` (não `style="width:80px"`)
- [ ] Date cells usam `.tbl-date` (não `style="color:var(--fg-muted)"`)
- [ ] Botões na mesma toolbar com mesmo tamanho (todos 36px default)
- [ ] Checkboxes usam `.tbl-check` com `appearance: none`
- [ ] Funciona em dark e light theme
