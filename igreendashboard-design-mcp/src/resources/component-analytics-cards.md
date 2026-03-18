# Component: Analytics Cards

> 6 card types usados em dashboards analytics: Segmentation, Order Overview, User Activity, Top Countries, Channel Revenue, Asset Overview.
> Referência: `analytics.html`

---

## 1. Customer Segmentation

### Anatomia
```
┌─ .card ──────────────────────────────────────┐
│  .card-head > .card-title                     │
│  ┌─ .seg-donut-wrap ───────────────────────┐ │
│  │     <canvas> (doughnut, cutout 72%)      │ │
│  └─────────────────────────────────────────┘ │
│  ┌─ .seg-legend ───────────────────────────┐ │
│  │  .seg-row > .seg-dot + .seg-name         │ │
│  │             + .seg-val + .seg-chg        │ │
│  └─────────────────────────────────────────┘ │
└──────────────────────────────────────────────┘
```

### Row: `.insights-row` (slot 1, 1fr)

### CSS
```css
.seg-donut-wrap { flex: 1; position: relative; min-height: 0; display: flex; align-items: center; justify-content: center; }
.seg-legend     { flex-shrink: 0; }
.seg-row        { display: flex; align-items: center; gap: var(--space-sm); padding: 6px 0; }
.seg-dot        { width: 8px; height: 8px; border-radius: 50%; flex-shrink: 0; }
.seg-name       { flex: 1; font-size: var(--text-sm); color: var(--fg-tertiary); font-weight: 500; }
.seg-val        { font-size: var(--text-sm); font-weight: 700; color: var(--fg-secondary); font-variant-numeric: tabular-nums; min-width: 42px; text-align: right; }
.seg-chg        { font-size: var(--text-xs); font-weight: 600; padding: 4px 10px; border-radius: var(--radius-pill); min-width: 48px; text-align: center; height: 24px; display: inline-flex; align-items: center; justify-content: center; line-height: 1; white-space: nowrap; }
.seg-chg.up     { background: var(--primary-10); color: var(--primary); }
.seg-chg.dn     { background: var(--destructive-10); color: var(--destructive); }
```

### HTML
```html
<div class="card">
  <div class="card-head">
    <div class="card-title">Customer Segmentation</div>
  </div>
  <div class="seg-donut-wrap">
    <canvas id="segChart"></canvas>
  </div>
  <div class="seg-legend">
    <div class="seg-row">
      <div class="seg-dot" style="background:var(--primary)"></div>
      <span class="seg-name">Small Business</span>
      <span class="seg-val">2,310</span>
      <span class="seg-chg up">+2.1%</span>
    </div>
    <div class="seg-row">
      <div class="seg-dot" style="background:#f6b51e"></div>
      <span class="seg-name">Enterprise</span>
      <span class="seg-val">800</span>
      <span class="seg-chg up">+4.2%</span>
    </div>
    <div class="seg-row">
      <div class="seg-dot" style="background:var(--primary-70)"></div>
      <span class="seg-name">Individuals</span>
      <span class="seg-val">310</span>
      <span class="seg-chg dn">-1.8%</span>
    </div>
  </div>
</div>
```

**Chart:** Doughnut, `cutout: '72%'`, `borderWidth: 0`, `borderRadius: 4`, `spacing: 2`. SEMPRE `legend: { display: false }`.

---

## 2. Order Overview

### Anatomia
```
┌─ .card ──────────────────────────────────────┐
│  .card-head > .card-title + .ov-year-select   │
│  ┌─ .ov-stats ────────────────────────────┐  │
│  │  .ov-stat      │  .ov-stat              │  │
│  │  label + val   │  label + val           │  │
│  └────────────────┴───────────────────────┘  │
│  ┌─ .ov-chart ────────────────────────────┐  │
│  │     <canvas> (grouped bar chart)        │  │
│  └────────────────────────────────────────┘  │
└──────────────────────────────────────────────┘
```

### Row: `.insights-row` (slot 2, 2fr — centro, o card mais largo)

### CSS
```css
.ov-stats      { display: flex; gap: 0; margin-bottom: var(--space-lg); flex-shrink: 0; }
.ov-stat       { padding-right: var(--space-xl); }
.ov-stat + .ov-stat { padding-left: var(--space-xl); border-left: 1px solid var(--border-soft); }
.ov-stat-label { font-size: var(--text-xs); color: var(--fg-muted); font-weight: 500; text-transform: uppercase; letter-spacing: .03em; margin-bottom: 4px; }
.ov-stat-val   { font-size: var(--text-lg); font-weight: 700; font-variant-numeric: tabular-nums; letter-spacing: -.5px; }
.ov-chart      { flex: 1; min-height: 0; position: relative; }
```

### HTML
```html
<div class="card">
  <div class="card-head">
    <div><div class="card-title">Order Overview</div></div>
    <select class="ov-year-select">
      <option>2026</option>
      <option>2025</option>
    </select>
  </div>
  <div class="ov-stats">
    <div class="ov-stat">
      <div class="ov-stat-label">Total Sales</div>
      <div class="ov-stat-val">$47,890</div>
    </div>
    <div class="ov-stat">
      <div class="ov-stat-label">Orders</div>
      <div class="ov-stat-val">1,680</div>
    </div>
  </div>
  <div class="ov-chart">
    <canvas id="orderChart"></canvas>
  </div>
</div>
```

**Nota:** Stats separados por border-left (`border-soft`). O `.ov-year-select` usa appearance: none com SVG chevron embutido — ver `component-forms.md`.

---

## 3. User Activity

### Anatomia
```
┌─ .card ──────────────────────────────────────┐
│  .card-head > .card-title                     │
│  ┌─ .ua-chart ────────────────────────────┐  │
│  │     <canvas> (grouped bar chart)        │  │
│  └────────────────────────────────────────┘  │
│  ┌─ .ua-legend (centered below) ──────────┐  │
│  │  .ua-legend-item   .ua-legend-item      │  │
│  │    dot + label       dot + label        │  │
│  │    BIG VALUE         BIG VALUE          │  │
│  └────────────────────────────────────────┘  │
└──────────────────────────────────────────────┘
```

### Row: `.insights-row` (slot 3, 1fr)

### CSS
```css
.ua-chart       { flex: 1; min-height: 0; position: relative; }
.ua-legend      { display: flex; justify-content: center; gap: var(--space-3xl); flex-shrink: 0; margin-top: var(--space-lg); }
.ua-legend-item { display: flex; flex-direction: column; align-items: center; gap: 4px; }
.ua-legend-label{ display: flex; align-items: center; gap: 6px; font-size: var(--text-caption); color: var(--fg-muted); font-weight: 500; }
.ua-legend-dot  { width: 8px; height: 8px; border-radius: 50%; flex-shrink: 0; }
.ua-legend-val  { font-size: var(--text-heading); font-weight: 700; font-variant-numeric: tabular-nums; letter-spacing: -.3px; }
```

### HTML
```html
<div class="card">
  <div class="card-head">
    <div class="card-title">User Activity</div>
  </div>
  <div class="ua-chart">
    <canvas id="activityChart"></canvas>
  </div>
  <div class="ua-legend">
    <div class="ua-legend-item">
      <div class="ua-legend-label"><div class="ua-legend-dot" style="background:var(--primary)"></div>Viewed</div>
      <div class="ua-legend-val">678,900</div>
    </div>
    <div class="ua-legend-item">
      <div class="ua-legend-label"><div class="ua-legend-dot" style="background:var(--primary-70)"></div>Checkout</div>
      <div class="ua-legend-val">312,420</div>
    </div>
  </div>
</div>
```

**Nota:** A legenda `.ua-legend` é similar ao padrão Value Legend (`.ch-lg-vals`) do `component-legends.md` — centrada, com big values. Pode usar o helper `valLegend()`.

---

## 4. Top Countries

### Anatomia
```
┌─ .card ──────────────────────────────────────────────┐
│  .card-head > .card-title                              │
│  ┌─ .tc-body (flex row) ────────────────────────────┐ │
│  │  ┌─ .tc-map (flex:1) ─────┐  ┌─ .tc-list ─────┐│ │
│  │  │   <svg> world dot map   │  │  .tc-item       ││ │
│  │  │   .tc-map-dot (pins)    │  │   .tc-flag      ││ │
│  │  │                         │  │   .tc-info      ││ │
│  │  │                         │  │     .tc-name    ││ │
│  │  │                         │  │     .tc-bar-wrap││ │
│  │  │                         │  │   .tc-pct       ││ │
│  │  └─────────────────────────┘  └────────────────┘│ │
│  └──────────────────────────────────────────────────┘ │
└──────────────────────────────────────────────────────┘
```

### Row: `.geo-row` (slot 1, 2fr — o card mais largo)

### CSS
```css
.tc-body     { display: flex; gap: var(--space-2xl); flex: 1; min-height: 0; }
.tc-map      { flex: 1; min-width: 0; position: relative; display: flex; align-items: center; justify-content: center; opacity: .85; }
.tc-map svg  { width: 100%; height: auto; max-height: 320px; }
.tc-map-dot  { position: absolute; width: 28px; height: 28px; border-radius: 50%; background: var(--overlay-8); border: 2px solid var(--fg-ghost); transform: translate(-50%, -50%); cursor: pointer; transition: all .2s var(--ease-out); }
.tc-map-dot.sm { width: 18px; height: 18px; }
.tc-map-dot:hover, .tc-map-dot.active { background: var(--primary-20); border-color: var(--primary); }
.tc-list     { flex-shrink: 0; width: 240px; display: flex; flex-direction: column; justify-content: center; gap: var(--space-sm); }
.tc-item     { display: flex; align-items: center; gap: var(--space-sm); padding: 8px 12px; border-radius: var(--radius-sm); transition: background .15s; }
.tc-item:hover, .tc-item.highlight { background: var(--overlay-6); }
.tc-flag     { width: 28px; height: 28px; border-radius: 50%; flex-shrink: 0; display: flex; align-items: center; justify-content: center; font-size: 16px; line-height: 1; }
.tc-info     { flex: 1; min-width: 0; }
.tc-name     { font-size: var(--text-sm); font-weight: 600; margin-bottom: 3px; }
.tc-bar-wrap { display: flex; align-items: center; gap: var(--space-sm); }
.tc-bar-bg   { flex: 1; height: 5px; background: var(--overlay-8); border-radius: 3px; overflow: hidden; }
.tc-bar      { height: 100%; border-radius: 3px; background: var(--primary); }
.tc-pct      { font-size: var(--text-caption); font-weight: 600; color: var(--fg-muted); font-variant-numeric: tabular-nums; min-width: 44px; text-align: right; }
```

### HTML
```html
<div class="card">
  <div class="card-head">
    <div class="card-title">Top Countries</div>
  </div>
  <div class="tc-body">
    <div class="tc-map">
      <svg id="worldDotMap" viewBox="0 0 800 450"></svg>
      <div class="tc-map-dot" style="left:22%;top:22%"></div>
      <div class="tc-map-dot" style="left:29%;top:64%"></div>
      <div class="tc-map-dot sm" style="left:72%;top:35%"></div>
    </div>
    <div class="tc-list">
      <div class="tc-item">
        <div class="tc-flag">🇺🇸</div>
        <div class="tc-info">
          <div class="tc-name">United States</div>
          <div class="tc-bar-wrap"><div class="tc-bar-bg"><div class="tc-bar" style="width:85%"></div></div></div>
        </div>
        <span class="tc-pct">38.61%</span>
      </div>
      <div class="tc-item">
        <div class="tc-flag">🇧🇷</div>
        <div class="tc-info">
          <div class="tc-name">Brazil</div>
          <div class="tc-bar-wrap"><div class="tc-bar-bg"><div class="tc-bar" style="width:72%"></div></div></div>
        </div>
        <span class="tc-pct">32.79%</span>
      </div>
      <!-- mais tc-items -->
    </div>
  </div>
</div>
```

**Nota:** O world map pode ser um SVG de dots (público domínio) ou simplesmente removido/substituído por um placeholder. Os pins `.tc-map-dot` são posicionados em % absoluto.

---

## 5. Channel Revenue

### Anatomia
```
┌─ .card ──────────────────────────────────────┐
│  .card-head > .card-title + .ov-year-select   │
│  ┌─ .cr-growth ───────────────────────────┐  │
│  │  .cr-growth-val "3.4%"                  │  │
│  │  .cr-growth-label "Growth Rate"         │  │
│  └────────────────────────────────────────┘  │
│  ┌─ .cr-seg-bar ──────────────────────────┐  │
│  │  ██████ .cr-seg  ██████  ██████████████ │  │
│  └────────────────────────────────────────┘  │
│  .cr-seg-labels (28% — 32% — 40%)            │
│  ┌─ .cr-channels ─────────────────────────┐  │
│  │  .cr-channel  .cr-channel  .cr-channel  │  │
│  │   icon          icon        icon        │  │
│  │   $2.9K         $2.6K       $2.1K       │  │
│  │   Online        Physical    Social      │  │
│  └────────────────────────────────────────┘  │
└──────────────────────────────────────────────┘
```

### Row: `.geo-row` (slot 2, 1fr — o card mais estreito)

### CSS
```css
.cr-growth      { display: flex; align-items: baseline; gap: var(--space-sm); margin-bottom: var(--space-lg); }
.cr-growth-val  { font-size: var(--text-display); font-weight: 700; font-variant-numeric: tabular-nums; letter-spacing: -1px; }
.cr-growth-label{ font-size: var(--text-caption); color: var(--fg-muted); font-weight: 500; line-height: 1.3; }
.cr-seg-bar     { display: flex; height: 8px; border-radius: 4px; overflow: hidden; gap: 3px; margin-bottom: var(--space-sm); }
.cr-seg         { border-radius: 4px; }
.cr-seg-labels  { display: flex; justify-content: space-between; margin-bottom: var(--space-lg); }
.cr-seg-label   { font-size: var(--text-xs); color: var(--fg-muted); font-weight: 600; font-variant-numeric: tabular-nums; }
.cr-channels    { display: flex; justify-content: space-between; gap: var(--space-lg); background: var(--muted); border-radius: var(--radius-md); padding: var(--space-lg); margin-top: auto; }
.cr-channel     { display: flex; flex-direction: column; align-items: center; gap: var(--space-sm); text-align: center; flex: 1; }
.cr-ch-icon     { width: 48px; height: 48px; border-radius: 50%; display: flex; align-items: center; justify-content: center; }
.cr-ch-val      { font-size: 16px; font-weight: 700; font-variant-numeric: tabular-nums; }
.cr-ch-name     { font-size: var(--text-xs); color: var(--fg-muted); font-weight: 500; }
```

### HTML
```html
<div class="card">
  <div class="card-head">
    <div class="card-title">Channel Revenue</div>
    <select class="ov-year-select">
      <option>Monthly</option>
      <option>Quarterly</option>
    </select>
  </div>
  <div class="cr-growth">
    <span class="cr-growth-val">3.4%</span>
    <span class="cr-growth-label">Growth<br>Rate</span>
  </div>
  <div class="cr-seg-bar">
    <div class="cr-seg" style="flex:28;background:#5b8bd4"></div>
    <div class="cr-seg" style="flex:32;background:#c4a962"></div>
    <div class="cr-seg" style="flex:40;background:var(--fg-tertiary)"></div>
  </div>
  <div class="cr-seg-labels">
    <span class="cr-seg-label">28%</span>
    <span class="cr-seg-label">32%</span>
    <span class="cr-seg-label">40%</span>
  </div>
  <div class="cr-channels">
    <div class="cr-channel">
      <div class="cr-ch-icon" style="background:rgba(91,139,212,0.15);color:#5b8bd4">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
      </div>
      <span class="cr-ch-val">$2.9K</span>
      <span class="cr-ch-name">Online store</span>
    </div>
    <div class="cr-channel">
      <div class="cr-ch-icon" style="background:rgba(196,169,98,0.15);color:#c4a962">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
      </div>
      <span class="cr-ch-val">$2.6K</span>
      <span class="cr-ch-name">Physical store</span>
    </div>
    <div class="cr-channel">
      <div class="cr-ch-icon" style="background:rgba(142,142,154,0.15);color:var(--fg-tertiary)">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/><polyline points="16 6 12 2 8 6"/><line x1="12" y1="2" x2="12" y2="15"/></svg>
      </div>
      <span class="cr-ch-val">$2.1K</span>
      <span class="cr-ch-name">Social Media</span>
    </div>
  </div>
</div>
```

---

## 6. Asset Overview / Distribution

### Anatomia (2 variantes)

**Variante A — Distribution (esquerda, 2fr no `.ao-row`):**
```
┌─ .card ──────────────────────────────────────┐
│  .card-head > .ao-title-row                    │
│    (.card-title + .ao-info-wrap tooltip)        │
│  .ao-val $325,980 .ao-dec .65                  │
│  .ao-badge-row > .kpi-badge.up + .ao-sub       │
│  .dist-title "DISTRIBUTION"                    │
│  ┌─ .dist-bar ────────────────────────────┐   │
│  │ ████ .dist-seg ████ ████████████████████│   │
│  └────────────────────────────────────────┘   │
│  .dist-list > .dist-item                       │
│    .dist-dot + .dist-name + .dist-pct + .dist-val │
└──────────────────────────────────────────────┘
```

**Variante B — Chart (direita, 3fr no `.ao-row`):**
```
┌─ .card ──────────────────────────────────────┐
│  .card-head > .ao-title-row + .card-actions    │
│  .ao-val $270,560 .ao-dec .20                  │
│  .ao-badge-row > .kpi-badge.up + .ao-sub       │
│  ┌─ .ao-chart ────────────────────────────┐   │
│  │     <canvas> (area line chart)          │   │
│  └────────────────────────────────────────┘   │
└──────────────────────────────────────────────┘
```

### Row: `.ao-row` (2fr + 3fr). Nota: `order: 1` coloca este row visualmente ANTES da table.

### CSS
```css
.ao-title-row  { display: flex; align-items: center; gap: 7px; }
.ao-info-wrap  { position: relative; display: inline-flex; align-items: center; cursor: default; }
.ao-info-wrap::after {
  content: attr(data-tip); position: absolute; bottom: calc(100% + 7px); left: 50%; transform: translateX(-50%);
  background: var(--popover); border: 1px solid var(--popover-border); color: var(--popover-foreground);
  font-size: 12px; font-weight: 400; padding: 6px 10px; border-radius: 7px;
  white-space: nowrap; pointer-events: none; opacity: 0; transition: opacity .15s; z-index: 10;
}
.ao-info-wrap:hover::after { opacity: 1; }
.ao-info       { color: var(--fg-hint); flex-shrink: 0; transition: color .15s; }
.ao-info-wrap:hover .ao-info { color: var(--fg-dim); }
.ao-val        { font-size: var(--text-display); font-weight: 700; line-height: 1; letter-spacing: -1px; margin-top: var(--space-md); display: block; font-variant-numeric: tabular-nums; }
.ao-dec        { font-size: var(--text-title); font-weight: 400; opacity: .45; letter-spacing: 0; }
.ao-badge-row  { display: flex; align-items: center; gap: var(--space-sm); margin-top: var(--space-sm); }
.ao-sub        { font-size: var(--text-caption); color: var(--fg-muted); }
.ao-chart      { flex: 1; min-height: 120px; position: relative; margin-top: var(--space-lg); }
.dist-title    { font-size: var(--text-xs); font-weight: 600; color: var(--fg-ghost); text-transform: uppercase; letter-spacing: .7px; margin-top: var(--space-xl); margin-bottom: var(--space-sm); }
.dist-bar      { display: flex; height: 6px; border-radius: 3px; overflow: hidden; gap: 2px; }
.dist-seg      { border-radius: 3px; }
.dist-list     { margin-top: var(--space-xs); }
.dist-item     { display: flex; align-items: center; gap: 10px; padding: var(--space-sm) 0; border-top: 1px solid var(--border-separator); }
.dist-item:first-child { border-top: none; }
.dist-dot      { width: 8px; height: 8px; border-radius: 50%; flex-shrink: 0; }
.dist-name     { flex: 1; font-size: var(--text-body); color: var(--fg-tertiary); font-weight: 500; }
.dist-pct      { font-size: var(--text-caption); color: var(--fg-muted); min-width: 28px; text-align: right; }
.dist-val      { font-size: var(--text-body); font-weight: 600; color: var(--fg-secondary); font-variant-numeric: tabular-nums; min-width: 92px; text-align: right; }
```

### HTML (Variante A — Distribution)
```html
<div class="card">
  <div class="card-head">
    <div class="ao-title-row">
      <div class="card-title">Total Assets</div>
      <span class="ao-info-wrap" data-tip="Valor total de todos os ativos">
        <svg class="ao-info" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/>
        </svg>
      </span>
    </div>
  </div>
  <div class="ao-val">$325,980<span class="ao-dec">.65</span></div>
  <div class="ao-badge-row">
    <span class="kpi-badge up">↑ 12%</span>
    <span class="ao-sub">+$39,117.67 in this year</span>
  </div>
  <div class="dist-title">Distribution</div>
  <div class="dist-bar">
    <div class="dist-seg" style="flex:65;background:var(--primary)"></div>
    <div class="dist-seg" style="flex:25;background:var(--chart-2)"></div>
    <div class="dist-seg" style="flex:10;background:var(--warning)"></div>
  </div>
  <div class="dist-list">
    <div class="dist-item">
      <div class="dist-dot" style="background:var(--primary)"></div>
      <span class="dist-name">Stocks</span>
      <span class="dist-pct">65%</span>
      <span class="dist-val">$211,887.42</span>
    </div>
    <div class="dist-item">
      <div class="dist-dot" style="background:var(--chart-2)"></div>
      <span class="dist-name">Bonds</span>
      <span class="dist-pct">25%</span>
      <span class="dist-val">$81,495.16</span>
    </div>
    <div class="dist-item">
      <div class="dist-dot" style="background:var(--warning)"></div>
      <span class="dist-name">Mutual Funds</span>
      <span class="dist-pct">10%</span>
      <span class="dist-val">$32,598.06</span>
    </div>
  </div>
</div>
```

---

## Patterns Adicionais

### Allocation List com Progress Bar

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

### KPI Sparkline Variantes

**1. Bar Sparkline** (7 rects com opacidade crescente):
```html
<div class="kpi-spark">
  <svg width="90" height="52" viewBox="0 0 90 52">
    <rect x="2"  y="36" width="8" height="14" rx="2" fill="var(--primary)" opacity=".25"/>
    <rect x="14" y="28" width="8" height="22" rx="2" fill="var(--primary)" opacity=".30"/>
    <rect x="26" y="32" width="8" height="18" rx="2" fill="var(--primary)" opacity=".35"/>
    <rect x="38" y="22" width="8" height="28" rx="2" fill="var(--primary)" opacity=".45"/>
    <rect x="50" y="18" width="8" height="32" rx="2" fill="var(--primary)" opacity=".55"/>
    <rect x="62" y="10" width="8" height="40" rx="2" fill="var(--primary)" opacity=".70"/>
    <rect x="74" y="2"  width="8" height="48" rx="2" fill="var(--primary)" opacity="1"/>
  </svg>
</div>
```

**2. Line Sparkline com Gradient** (curva com área preenchida):
```html
<div class="kpi-spark">
  <svg width="90" height="52" viewBox="0 0 90 52">
    <defs>
      <linearGradient id="sg-unique" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="var(--primary)" stop-opacity="0.25"/>
        <stop offset="100%" stop-color="var(--primary)" stop-opacity="0"/>
      </linearGradient>
    </defs>
    <path d="M2,40 C12,38 18,36 28,32 C38,28 42,30 50,24 C58,18 64,14 72,10 C78,7 84,5 88,3"
          fill="none" stroke="var(--primary)" stroke-width="2" stroke-linecap="round"/>
    <path d="M2,40 C12,38 18,36 28,32 C38,28 42,30 50,24 C58,18 64,14 72,10 C78,7 84,5 88,3 L88,52 L2,52 Z"
          fill="url(#sg-unique)"/>
  </svg>
</div>
```

**Regra:** Cada gradient precisa de um `id` único na página. Use `sg-[nome]` como padrão (ex: `sg-return`, `sg-pnl`).

---

## Checklist

- [ ] Segmentation card usa doughnut com cutout 72%, borderWidth 0
- [ ] Order Overview tem stats separados por `border-left: var(--border-soft)`
- [ ] User Activity legend é centrada abaixo do chart
- [ ] Top Countries usa `.tc-bar` com `var(--primary)` e `.tc-bar-bg` com `var(--overlay-8)`
- [ ] Channel Revenue `.cr-channels` tem background `var(--muted)`
- [ ] Asset Overview `.ao-val` usa `var(--text-display)` e `font-variant-numeric: tabular-nums`
- [ ] Distribution bar `.dist-bar` usa `flex` com segmentos coloridos
- [ ] Sparklines usam `var(--primary)` — nunca hex hardcoded
- [ ] Funciona em dark e light theme
