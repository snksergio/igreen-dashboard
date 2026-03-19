# Component: Card

> Base card container, KPI cards, stat sub-cards, allocation lists, and chart containers do Design System.

## Anatomia do Card Base

```
┌─ .card ──────────────────────────────────────────┐
│ ┌─ .card-head ─────────────────────────────────┐ │
│ │ ┌──────────────────┐  ┌─ .card-actions ────┐ │ │
│ │ │ .card-title       │  │ .ca-btn  .ca-btn   │ │ │
│ │ │ .card-sub         │  │ .more-dots         │ │ │
│ │ └──────────────────┘  └────────────────────┘ │ │
│ └──────────────────────────────────────────────┘ │
│                                                    │
│ ┌─ .perf-stats ──────────────────────────────┐   │
│ │ .pstat-card   .pstat-card   .pstat-card     │   │
│ └────────────────────────────────────────────┘   │
│                                                    │
│ ┌─ .perf-legend ─────────────────────────────┐   │
│ │ .pl-item .pl-item .pl-item .pl-item         │   │
│ └────────────────────────────────────────────┘   │
│                                                    │
│ ┌─ .chart-area ──────────────────────────────┐   │
│ │            (Chart.js canvas)                 │   │
│ └────────────────────────────────────────────┘   │
└──────────────────────────────────────────────────┘
```

## CSS Spec

### Card base
```css
.card {
  background: var(--card);
  border-radius: var(--radius-md);        /* 12px */
  padding: var(--space-xl);                /* 20px */
  display: flex; flex-direction: column;
  min-height: 0;
  box-shadow: var(--shadow-card);
  transition: box-shadow .25s var(--ease-out);
}
.card:hover { box-shadow: var(--shadow-card-hover); }
```

### Card head
```css
.card-head {
  display: flex; align-items: flex-start;
  justify-content: space-between;
  flex-shrink: 0;
  margin-bottom: var(--space-lg);          /* 16px */
}
.card-title { font-size: 15px; font-weight: 600; letter-spacing: -.1px; }
.card-sub   { font-size: var(--text-caption); color: var(--fg-muted); margin-top: 3px; }
```

### Card action buttons
```css
.card-actions { display: flex; align-items: center; gap: 7px; }

.ca-btn {
  width: 34px; height: 34px;
  background: var(--secondary); border: 1px solid var(--border);
  border-radius: var(--radius-sm);
  color: var(--secondary-foreground);
  cursor: pointer;
  transition: all .2s var(--ease-out);
}
.ca-btn:hover {
  color: var(--fg-secondary);
  background: var(--overlay-10);
  border-color: var(--border-soft);
}

.more-dots {
  width: 34px; height: 34px;
  color: var(--fg-ghost); font-size: 18px;
  cursor: pointer;
  border-radius: var(--radius-sm);
  transition: color .2s var(--ease-out);
}
.more-dots:hover { color: var(--fg-muted); }
```

---

## Anatomia do KPI Card

```
┌─ .kpi-card ──────────────────────────────────┐
│ ┌─ .kpi-left ───────┐  ┌─ .kpi-spark ─────┐ │
│ │ .kpi-label          │  │ (sparkline SVG)   │ │
│ │ .kpi-value          │  │  100 × auto       │ │
│ │ ┌─ .kpi-footer ──┐ │  │                   │ │
│ │ │ .kpi-badge      │ │  │                   │ │
│ │ │ .kpi-sub        │ │  │                   │ │
│ │ └────────────────┘ │  └───────────────────┘ │
│ └────────────────────┘                         │
└──────────────────────────────────────────────┘
```

### Grid: 4 colunas iguais
```css
.kpi-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: var(--space-lg);                    /* 16px */
}
```

### KPI Card
```css
.kpi-card {
  background: var(--card);
  border-radius: var(--radius-md);
  padding: var(--space-xl) var(--space-xl) var(--space-lg);
  display: flex; justify-content: space-between;
  align-items: stretch; gap: var(--space-sm);
  box-shadow: var(--shadow-card);
  transition: box-shadow .25s var(--ease-out), transform .25s var(--ease-out);
}
.kpi-card:hover {
  box-shadow: var(--shadow-card-hover);
  transform: translateY(-1px);
}
```

### KPI Values
| Elemento | Font size | Font weight | Color | Extra |
|----------|-----------|-------------|-------|-------|
| `.kpi-label` | `var(--text-sm)` (13px) | 500 | `var(--fg-tertiary)` | `letter-spacing: .1px` |
| `.kpi-value` | 22px | 700 | `var(--foreground)` | `line-height: 1; letter-spacing: -.5px` |
| `.kpi-sub` | `var(--text-caption)` (12px) | 500 | `var(--fg-muted)` | — |
| `.kpi-badge.up` | `var(--text-xs)` (11px) | 600 | `var(--primary)` on `var(--primary-10)` | `height: 24px; line-height: 1; padding: 4px 10px` |
| `.kpi-badge.dn` | `var(--text-xs)` (11px) | 600 | `var(--destructive)` on `var(--destructive-10)` | `height: 24px; line-height: 1; padding: 4px 10px` |

### KPI Layout Precision
| Elemento | Propriedades obrigatórias |
|----------|--------------------------|
| `.kpi-card` | `justify-content: space-between; align-items: stretch` |
| `.kpi-left` | `display: flex; flex-direction: column; justify-content: space-between` |
| `.kpi-spark` | `width: 100px; flex-shrink: 0; display: flex; align-items: flex-end` |

---

## Stat Sub-Cards

Usados dentro de cards maiores para mostrar métricas secundárias:

```css
.perf-stats { display: flex; gap: var(--space-sm); }

.pstat-card {
  flex: 1;
  background: var(--muted);
  border-radius: var(--radius-sm);
  padding: var(--space-md) var(--space-lg);
  transition: background .2s var(--ease-out);
}
.pstat-card:hover { background: var(--accent); }
```

| Elemento | Font size | Color | Extra |
|----------|-----------|-------|-------|
| `.pstat-label` | `var(--text-xs)` | `var(--fg-muted)`, uppercase | `letter-spacing: 0.02em` |
| `.pstat-val` | 18px, weight 700 | `var(--fg-strong)` | `line-height: 1.2; gap: 5px; align-items: baseline` |
| `.pstat-val.green` | — | `var(--primary)` | — |
| `.pstat-val.red` | — | `var(--destructive)` | — |
| `.pstat-pct` | `var(--text-sm)` | `var(--fg-muted)` | — |

---

## Allocation List

Lista vertical de alocação com dot colorido, nome, percentual e badge de mudança:

```css
.al-row {
  display: flex; align-items: center; justify-content: space-between;
  padding: 6px 0; border-top: 1px solid var(--border-separator);
}
.al-row:first-child { border-top: none; }
```

| Elemento | Descrição |
|----------|-----------|
| `.al-pip` | 8×8px dot colorido (cor do asset) |
| `.al-name` | Nome do asset, `var(--text-sm)`, `var(--fg-tertiary)` |
| `.al-pct` | Percentual, `var(--text-sm)`, weight 700 |
| `.al-chg.up` | Badge pill verde: `var(--primary-10)` bg, `var(--primary)` text |
| `.al-chg.dn` | Badge pill vermelho: `var(--destructive-10)` bg |

### Allocation Row com Progress Bar

O `.al-bar-bg` é `display: none` por padrão. Para habilitar barras de progresso inline:

```css
.al-bar-bg {
  display: flex;    /* habilitar — padrão é display: none */
  flex: 1;
  height: 5px;
  background: var(--overlay-8);
  border-radius: 2px;
  overflow: hidden;
}
.al-bar { height: 100%; border-radius: 2px; }
```

```html
<div class="al-row">
  <div class="al-left">
    <div class="al-pip" style="background:#f7931a"></div>
    <span class="al-name">Bitcoin</span>
  </div>
  <div class="al-right">
    <div class="al-bar-bg"><div class="al-bar" style="width:42%;background:#f7931a"></div></div>
    <span class="al-pct">42%</span>
    <span class="al-chg up">+5.2%</span>
  </div>
</div>
```

**Usado em:** `analytics.html` Asset Allocation card (mid-row, slot direito).

---

## Performance Legend

Lista horizontal de legendas de chart:

```css
.perf-legend { display: flex; gap: 4px; }
.pl-item {
  display: flex; align-items: center; gap: 6px;
  min-height: 30px; padding: 0 10px;
  border-radius: var(--radius-xs);
  font-size: var(--text-caption); color: var(--fg-muted);
  cursor: pointer; transition: color .2s;
}
.pl-item:hover { color: var(--fg-secondary); }
.pl-line { width: 14px; height: 2px; border-radius: 1px; }
```

---

## Chart Containers

```css
.chart-area { flex: 1; min-height: 0; position: relative; }
.donut-area { flex: 1; min-height: 120px; position: relative; }
```

**Regra:** O canvas do Chart.js usa `position: relative` no container pai. O chart preenche o espaço flexível restante do card.

---

## Padrões de Uso

### Card com chart (mais comum)
```html
<div class="card">
  <div class="card-head">
    <div>
      <div class="card-title">Portfolio Performance</div>
      <div class="card-sub">Last 30 days</div>
    </div>
    <div class="card-actions">
      <button class="ca-btn"><!-- icon --></button>
      <button class="more-dots">⋯</button>
    </div>
  </div>
  <div class="perf-stats">
    <div class="pstat-card">
      <div class="pstat-label">TOTAL VALUE</div>
      <div class="pstat-val">$48,352</div>
    </div>
    <!-- more pstat-cards -->
  </div>
  <div class="perf-legend">
    <div class="pl-item">
      <span class="pl-line" style="background: var(--primary)"></span>
      Bitcoin
    </div>
    <!-- more pl-items -->
  </div>
  <div class="chart-area">
    <canvas id="myChart"></canvas>
  </div>
</div>
```

### Card com allocation list
```html
<div class="card">
  <div class="card-head">
    <div><div class="card-title">Asset Allocation</div></div>
    <div class="card-actions"><button class="more-dots">⋯</button></div>
  </div>
  <div class="donut-area">
    <canvas id="donutChart"></canvas>
  </div>
  <div class="alloc-list">
    <div class="al-row">
      <div class="al-left">
        <span class="al-pip" style="background: var(--primary)"></span>
        <span class="al-name">Bitcoin</span>
      </div>
      <div class="al-right">
        <span class="al-pct">42%</span>
        <span class="al-chg up">+2.4%</span>
      </div>
    </div>
    <!-- more al-rows -->
  </div>
</div>
```

### KPI Grid
```html
<div class="kpi-grid">
  <div class="kpi-card">
    <div class="kpi-left">
      <span class="kpi-label">Total Revenue</span>
      <span class="kpi-value">$48,352.94</span>
      <div class="kpi-footer">
        <span class="kpi-badge up">+12.4%</span>
        <span class="kpi-sub">vs last month</span>
      </div>
    </div>
    <div class="kpi-spark">
      <!-- sparkline SVG or Chart.js -->
    </div>
  </div>
  <!-- 3 more kpi-cards -->
</div>
```

---

## Checklist

- [ ] Card usa `var(--card)` background (nunca hex)
- [ ] Hover usa `var(--shadow-card-hover)` (não muda background)
- [ ] KPI cards em grid de 4 colunas com `var(--space-lg)` gap
- [ ] Badges usam tokens semânticos (`--primary-10`, `--destructive-10`)
- [ ] Stat sub-cards usam `var(--muted)` background
- [ ] Chart area usa `flex: 1; min-height: 0` para preencher espaço
- [ ] Funciona em dark e light theme
