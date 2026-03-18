# Component: Charts

> Padrões de configuração do Chart.js 4.4.0 para o Design System. Cores, fontes, estilos de grid, tooltips e 4 patterns de legenda.

## Dependência

```html
<script src="https://cdn.jsdelivr.net/npm/chart.js@4.4.0/dist/chart.umd.min.js"></script>
```

---

## Paleta de Cores para Charts

| Token CSS | Hex (dark) | Uso |
|-----------|-----------|-----|
| `--primary` | `#2ecc71` | Linha principal, area fill, positive bars |
| `--chart-2` | `#3498db` | Segunda série (line, bar) |
| `--destructive` | `#e74c3c` | Negativo, perda, sell |
| `--warning` | `#f39c12` | Atenção, pendente |
| `--info` | `#9b59b6` | Informação, dados auxiliares |
| `--fg-ghost` | Varia | Grid lines, labels fracos |

### Opacidades para area/fill
```javascript
// Area fill gradient
const gradient = ctx.createLinearGradient(0, 0, 0, chartHeight);
gradient.addColorStop(0, 'rgba(46, 204, 113, 0.20)');  // --primary com 20%
gradient.addColorStop(1, 'rgba(46, 204, 113, 0.00)');  // fade to transparent
```

### Paleta de donut/pie (5 cores)
```javascript
const donutColors = [
  '#2ecc71',  // primary (Bitcoin)
  '#3498db',  // chart-2 (Ethereum)
  '#9b59b6',  // info (Solana)
  '#f39c12',  // warning (Cardano)
  '#e74c3c',  // destructive (Other)
];
```

---

## Tipos de Chart

### 1. Line Chart (mais usado)
```javascript
new Chart(ctx, {
  type: 'line',
  data: {
    labels: [...],
    datasets: [{
      data: [...],
      borderColor: '#2ecc71',
      backgroundColor: gradient,        // area fill
      borderWidth: 2,
      fill: true,
      tension: 0.4,                     // smooth curves
      pointRadius: 0,                   // no points by default
      pointHoverRadius: 5,
      pointHoverBackgroundColor: '#2ecc71',
      pointHoverBorderColor: '#fff',
      pointHoverBorderWidth: 2,
    }]
  },
  options: chartOptions,
});
```

### 2. Donut Chart
```javascript
new Chart(ctx, {
  type: 'doughnut',
  data: {
    labels: ['BTC', 'ETH', 'SOL', 'ADA', 'Other'],
    datasets: [{
      data: [42, 28, 15, 10, 5],
      backgroundColor: donutColors,
      borderWidth: 0,
      borderRadius: 4,                  // rounded segments
      spacing: 2,                       // gap between segments
    }]
  },
  options: {
    cutout: '72%',                      // inner hole size
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },       // always use custom legend
      tooltip: tooltipConfig,
    }
  }
});
```

### 3. Bar Chart (grouped)
```javascript
new Chart(ctx, {
  type: 'bar',
  data: {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'New Users',
        data: [...],
        backgroundColor: '#2ecc71',
        borderRadius: 4,
        barPercentage: 0.6,
      },
      {
        label: 'Returning',
        data: [...],
        backgroundColor: '#3498db',
        borderRadius: 4,
        barPercentage: 0.6,
      }
    ]
  },
  options: chartOptions,
});
```

### 4. Sparkline (mini chart inline)
```javascript
new Chart(ctx, {
  type: 'line',
  data: {
    labels: new Array(12).fill(''),
    datasets: [{
      data: [...],
      borderColor: '#2ecc71',       // or '#e74c3c' for negative
      borderWidth: 1.5,
      fill: false,
      tension: 0.4,
      pointRadius: 0,
    }]
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false }, tooltip: { enabled: false } },
    scales: { x: { display: false }, y: { display: false } },
  }
});
```

---

## Configuração Global

### Options base (reutilizar em todos os charts)
```javascript
const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  interaction: {
    mode: 'index',
    intersect: false,
  },
  plugins: {
    legend: { display: false },         // always custom legend
    tooltip: tooltipConfig,
  },
  scales: {
    x: {
      grid: {
        display: false,                 // no vertical grid lines
      },
      ticks: {
        color: 'rgba(255,255,255,0.30)',  // --fg-ghost equivalent
        font: { size: 11, family: 'Inter' },
      },
      border: { display: false },
    },
    y: {
      grid: {
        color: 'rgba(255,255,255,0.06)',  // --border-separator equivalent
        lineWidth: 1,
      },
      ticks: {
        color: 'rgba(255,255,255,0.30)',
        font: { size: 11, family: 'Inter' },
        padding: 8,
      },
      border: { display: false },
    },
  },
};
```

### Tooltip styling
```javascript
const tooltipConfig = {
  backgroundColor: 'var(--popover)',    // ou usar computed style
  titleColor: 'var(--foreground)',
  bodyColor: 'var(--foreground)',
  borderColor: 'var(--popover-border)',
  borderWidth: 1,
  padding: { x: 12, y: 8 },
  cornerRadius: 8,
  titleFont: { size: 12, weight: 600, family: 'Inter' },
  bodyFont: { size: 13, family: 'Inter' },
  displayColors: true,
  boxWidth: 8,
  boxHeight: 8,
  boxPadding: 4,
  usePointStyle: true,
  pointStyle: 'circle',
};
```

**Nota:** `var()` não funciona diretamente nas options do Chart.js. Use `getComputedStyle()`:
```javascript
const styles = getComputedStyle(document.documentElement);
const tooltipBg = styles.getPropertyValue('--popover').trim();
```

---

## 4 Patterns de Legenda

### 1. Inline legend (dentro do card head)
```html
<div class="perf-legend">
  <div class="pl-item">
    <span class="pl-line" style="background: var(--primary)"></span>
    Bitcoin
  </div>
  <div class="pl-item">
    <span class="pl-line" style="background: var(--chart-2)"></span>
    Ethereum
  </div>
</div>
```

### 2. Below-chart centered legend
```html
<div class="ua-legend">
  <div class="ua-legend-item">
    <span class="ua-legend-label">
      <span class="ua-legend-dot" style="background: var(--primary)"></span>
      New Users
    </span>
    <span class="ua-legend-val">1,247</span>
  </div>
</div>
```

### 3. Side legend (donut/pie)
```html
<div class="seg-legend">
  <div class="seg-row">
    <span class="seg-dot" style="background: var(--primary)"></span>
    <span class="seg-name">Premium</span>
    <span class="seg-val">42%</span>
    <span class="seg-chg up">+2.4%</span>
  </div>
</div>
```

### 4. Allocation list legend
```html
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
</div>
```

---

## Stat Row Pattern (indicadores acima do gráfico)

Boxes com background `var(--muted)` contendo label + valor + variação. **OBRIGATÓRIO** em chart cards com KPIs.

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

---

## Chart Card Variants

### Standard Chart Card
```html
<div class="ch-card">
  <div class="ch-head">
    <div class="card-title">Chart Title</div>
  </div>
  <div class="chart-area"><canvas id="myChart"></canvas></div>
  <div class="ch-lg-simple" id="legend"></div>
</div>
```

### Small Chart Card (`.ch-card-sm`)
Versão compacta para grids de 3-4 colunas. Menos padding, canvas menor.

### Canvas Wrap Size Variants

Use para centralizar e limitar o tamanho de gráficos circulares:

| Classe | Max-width | Uso |
|--------|-----------|-----|
| `.ch-canvas-wrap--sm` | 260px | Doughnut/polar compactos em grids 3-4 colunas |
| `.ch-canvas-wrap--md` | 320px | Radar e doughnut em grids 2 colunas |
| `.ch-canvas-wrap--gauge` | 160px | Gauge/half-donut mini |

```html
<!-- Doughnut compacto -->
<div class="ch-canvas-wrap ch-canvas-wrap--sm">
  <canvas id="chartDoughnut"></canvas>
  <div class="ch-donut-center">...</div>
</div>

<!-- Radar -->
<div class="ch-canvas-wrap ch-canvas-wrap--md">
  <canvas id="chartRadar"></canvas>
</div>

<!-- Gauge mini -->
<div class="ch-canvas-wrap ch-canvas-wrap--gauge">
  <canvas id="chartGauge"></canvas>
</div>
```

**Anti-pattern:** Nunca use `style="max-width:260px;margin:0 auto"` — use a classe `--sm/--md/--gauge`.

### Grid Layouts
```css
.ch-grid   { display: grid; gap: var(--space-2xl); }
.ch-grid-2 { grid-template-columns: repeat(2, 1fr); }  /* 2 colunas */
.ch-grid-3 { grid-template-columns: repeat(3, 1fr); }  /* 3 colunas */
.ch-grid-4 { grid-template-columns: repeat(4, 1fr); }  /* 4 colunas — apenas sparklines/mini */

/* Espaçamento automático entre grids adjacentes */
.ch-grid + .ch-grid-3,
.ch-grid + .ch-grid-4,
.ch-grid-3 + .ch-grid-3,
.ch-grid-4 + .ch-grid-4 { margin-top: var(--space-xl); }
```

**Nota:** Grids adjacentes recebem `margin-top` automaticamente via CSS. Não adicione `style="margin-top:..."` manualmente.

---

## Containers de Chart

```css
/* Line/area/bar charts */
.chart-area { flex: 1; min-height: 0; position: relative; }

/* Donut charts */
.donut-area { flex: 1; min-height: 120px; position: relative; }

/* Asset overview chart */
.ao-chart { flex: 1; min-height: 120px; position: relative; margin-top: var(--space-lg); }

/* Order overview chart */
.ov-chart { flex: 1; min-height: 0; position: relative; }

/* User activity chart */
.ua-chart { flex: 1; min-height: 0; position: relative; }
```

**Regra:** Todo container de chart usa `position: relative` e `flex: 1; min-height: 0` para preencher o espaço flexível do card.

---

## Theme-aware Charts

Para adaptar as cores do chart ao tema ativo:

```javascript
function getChartColors() {
  const styles = getComputedStyle(document.documentElement);
  return {
    primary: styles.getPropertyValue('--primary').trim(),
    destructive: styles.getPropertyValue('--destructive').trim(),
    warning: styles.getPropertyValue('--warning').trim(),
    info: styles.getPropertyValue('--info').trim(),
    gridColor: styles.getPropertyValue('--border-separator').trim(),
    tickColor: styles.getPropertyValue('--fg-ghost').trim(),
  };
}

// Re-render charts on theme change
document.querySelector('.theme-toggle').addEventListener('click', () => {
  const colors = getChartColors();
  // Update chart configurations...
  chart.update();
});
```

---

## Checklist

- [ ] Chart.js 4.4.0 via CDN ou npm
- [ ] Legend sempre custom (`.perf-legend`, `.ua-legend`, etc.) — nunca `legend: { display: true }`
- [ ] Grid vertical desligado (`x.grid.display: false`)
- [ ] Grid horizontal usa `--border-separator` como cor
- [ ] Ticks usam font Inter, size 11px
- [ ] Tooltip usa `--popover` background com border
- [ ] Area fill usa gradient de 20% → 0% opacity
- [ ] Sparklines sem axes, legend, ou tooltip
- [ ] Donut usa `cutout: '72%'` e `borderRadius: 4`
- [ ] Cores atualizam quando tema muda
- [ ] Canvas wrap usa size modifier (`--sm`, `--md`, `--gauge`) em vez de inline max-width
- [ ] Grids adjacentes sem `margin-top` manual (CSS automático via adjacent sibling)
