# Component: Chart Legends

> Padrões de legenda custom para Chart.js. SEMPRE desabilitar a legenda built-in do Chart.js.
> Referência: `market-trends.html`, `analytics.html`

## Regra fundamental

```javascript
// OBRIGATÓRIO em todo Chart.js:
options: {
  plugins: {
    legend: { display: false }  // NUNCA usar legenda built-in
  }
}
```

## Quando usar cada legenda

| Tipo | Classe | Uso | Exemplo |
|------|--------|-----|---------|
| Rich | `.ch-lg-rich` | Doughnuts, pies — com valores e badge de variação | Asset Allocation, Sector Exposure |
| Value | `.ch-lg-vals` | Bar charts — com valores numéricos grandes | Trading Volume, Inflow/Outflow |
| Simple | `.ch-lg-simple` | Line, radar, mixed — apenas dot + label | Price History, Radar, Scatter |
| Nenhuma | — | Sparklines, gauges, mini cards | BTC 24h, Fear & Greed |

---

## 1. Rich Legend (`.ch-lg-rich`)

Cada row: dot colorido + nome + valor percentual + badge de variação.

```html
<div class="ch-lg-rich" id="legendAllocation"></div>
```

### CSS
```css
.ch-lg-rich { margin-top: var(--space-lg); }
.ch-lg-row  { display: flex; align-items: center; gap: var(--space-sm); padding: 8px 0; border-top: 1px solid var(--border-separator); }
.ch-lg-row:first-child { border-top: none; }
.ch-lg-dot  { width: 8px; height: 8px; border-radius: 50%; flex-shrink: 0; }
.ch-lg-name { flex: 1; font-size: var(--text-sm); color: var(--fg-tertiary); font-weight: 500; }
.ch-lg-pct  { font-size: var(--text-sm); font-weight: 700; color: var(--fg-secondary); font-variant-numeric: tabular-nums; min-width: 36px; text-align: right; }
.ch-lg-badge     { font-size: var(--text-xs); font-weight: 600; padding: 3px 10px; border-radius: var(--radius-pill); min-width: 48px; text-align: center; display: inline-flex; align-items: center; justify-content: center; }
.ch-lg-badge.up  { background: var(--primary-10); color: var(--primary); }
.ch-lg-badge.dn  { background: var(--destructive-10); color: var(--destructive); }
```

### JS Helper
```javascript
function richLegend(id, items) {
  // items: [{ label, color, value, change, dir:'up'|'dn' }]
  document.getElementById(id).innerHTML = items.map(i =>
    `<div class="ch-lg-row">
      <span class="ch-lg-dot" style="background:${i.color}"></span>
      <span class="ch-lg-name">${i.label}</span>
      <span class="ch-lg-pct">${i.value}</span>
      <span class="ch-lg-badge ${i.dir}">${i.change}</span>
    </div>`
  ).join('');
}

// Uso:
richLegend('legendAllocation', [
  { label: 'Bitcoin', color: primary, value: '42%', change: '+2.1%', dir: 'up' },
  { label: 'Ethereum', color: chart2, value: '28%', change: '-1.3%', dir: 'dn' },
]);
```

---

## 2. Value Legend (`.ch-lg-vals`)

Colunas centradas: dot + label em cima, valor grande em baixo.

```html
<div class="ch-lg-vals" id="legendVolume"></div>
```

### CSS
```css
.ch-lg-vals      { display: flex; justify-content: center; gap: var(--space-3xl); margin-top: var(--space-lg); }
.ch-lg-val-item  { display: flex; flex-direction: column; align-items: center; gap: 4px; }
.ch-lg-val-label { display: flex; align-items: center; gap: 6px; font-size: var(--text-caption); color: var(--fg-muted); font-weight: 500; }
.ch-lg-val-num   { font-size: var(--text-heading); font-weight: 700; font-variant-numeric: tabular-nums; letter-spacing: -.3px; }
```

### JS Helper
```javascript
function valLegend(id, items) {
  // items: [{ label, color, value }]
  document.getElementById(id).innerHTML = items.map(i =>
    `<div class="ch-lg-val-item">
      <span class="ch-lg-val-label">
        <span style="width:8px;height:8px;border-radius:50%;background:${i.color};flex-shrink:0"></span>
        ${i.label}
      </span>
      <span class="ch-lg-val-num">${i.value}</span>
    </div>`
  ).join('');
}

// Uso:
valLegend('legendVolume', [
  { label: 'Buy Volume', color: primary, value: '678,900' },
  { label: 'Sell Volume', color: destructive, value: '312,420' },
]);
```

---

## 3. Simple Legend (`.ch-lg-simple`)

Inline: dot + label. Para charts onde os dados já são auto-explicativos.

```html
<div class="ch-lg-simple" id="legendPrice"></div>
```

### CSS
```css
.ch-lg-simple      { display: flex; flex-wrap: wrap; gap: var(--space-md); margin-top: var(--space-md); justify-content: center; }
.ch-lg-simple-item { display: flex; align-items: center; gap: 6px; font-size: var(--text-xs); color: var(--fg-secondary); font-weight: 500; }
```

### JS Helper
```javascript
function simpleLegend(id, items) {
  // items: [{ label, color }]
  document.getElementById(id).innerHTML = items.map(i =>
    `<div class="ch-lg-simple-item">
      <span style="width:8px;height:8px;border-radius:50%;background:${i.color};flex-shrink:0"></span>
      ${i.label}
    </div>`
  ).join('');
}

// Uso:
simpleLegend('legendPrice', [
  { label: 'BTC', color: primary },
  { label: 'ETH', color: chart2 },
]);
```

---

## Doughnut Center Label

Label absoluto posicionado no centro de doughnuts.

```html
<div class="ch-canvas-wrap" style="position:relative">
  <canvas id="chartDonut" height="220"></canvas>
  <div class="ch-donut-center">
    <div class="ch-donut-val">$458K</div>
    <div class="ch-donut-sub">Total Value</div>
  </div>
</div>
```

### CSS
```css
.ch-donut-center { position: absolute; top: 50%; left: 50%; transform: translate(-50%, -55%); text-align: center; pointer-events: none; }
.ch-donut-val    { font-size: var(--text-lg); font-weight: 700; line-height: 1.2; }
.ch-donut-sub    { font-size: var(--text-xs); color: var(--fg-muted); }
```

---

## Stat Row (indicadores acima do gráfico)

Boxes com background `var(--muted)` contendo label + valor + variação.

```html
<div class="ch-stat-row">
  <div class="ch-stat">
    <div class="ch-stat-label">BTC PRICE</div>
    <div class="ch-stat-val">$67,432</div>
    <span class="ch-stat-chg up">+12.4%</span>
  </div>
  <div class="ch-stat">
    <div class="ch-stat-label">ETH PRICE</div>
    <div class="ch-stat-val">$3,890</div>
    <span class="ch-stat-chg dn">-5.2%</span>
  </div>
</div>
```

### CSS
```css
.ch-stat-row   { display: flex; gap: var(--space-sm); margin-bottom: var(--space-lg); flex-wrap: wrap; }
.ch-stat       { flex: 1; min-width: 0; background: var(--muted); border-radius: var(--radius-sm); padding: var(--space-md) var(--space-lg); }
.ch-stat-label { font-size: var(--text-xs); color: var(--fg-muted); font-weight: 500; letter-spacing: 0.02em; text-transform: uppercase; margin-bottom: 4px; }
.ch-stat-val   { font-size: var(--text-heading); font-weight: 700; font-variant-numeric: tabular-nums; line-height: 1.2; }
.ch-stat-chg.up { color: var(--primary); }
.ch-stat-chg.dn { color: var(--destructive); }
```

**Regra:** TODA chart card com indicadores de KPI deve usar `.ch-stat-row` com background `var(--muted)`.
