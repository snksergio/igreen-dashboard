# Component: Drawer

> Modal lateral (620px) com slide-in da direita para detalhes de transação. Contém header, metadata grid, tabs e 4 painéis de conteúdo.

## Anatomia

```
┌─ .drawer-overlay (fixed, inset 0, z: 999) ──────────────────┐
│                                                                │
│                   ┌─ .drawer (620px, z: 1000) ──────────────┐ │
│                   │                                           │ │
│                   │  .dw-header                               │ │
│                   │  ┌─────────────────────────────────────┐ │ │
│                   │  │ .dw-coin-icon  .dw-title   .dw-close│ │ │
│                   │  │               .dw-subtitle           │ │ │
│                   │  └─────────────────────────────────────┘ │ │
│                   │                                           │ │
│                   │  .dw-meta (grid 120px + 1fr)              │ │
│                   │  ┌─────────────────────────────────────┐ │ │
│                   │  │ Type     │ Buy                       │ │ │
│                   │  │ Amount   │ 0.4521 BTC                │ │ │
│                   │  │ Price    │ $43,250.00                │ │ │
│                   │  │ Hash     │ 0x7a3f...8b2e [copy]     │ │ │
│                   │  └─────────────────────────────────────┘ │ │
│                   │                                           │ │
│                   │  .dw-tabs                                 │ │
│                   │  ┌─────────────────────────────────────┐ │ │
│                   │  │ Overview │ Comments 3│ Attach 2│ Act │ │ │
│                   │  └─────────────────────────────────────┘ │ │
│                   │                                           │ │
│                   │  .dw-body (scrollable)                    │ │
│                   │  ┌─────────────────────────────────────┐ │ │
│                   │  │ .dw-panel.active                     │ │ │
│                   │  │ (Details / Comments / Attach / Activ)│ │ │
│                   │  └─────────────────────────────────────┘ │ │
│                   │                                           │ │
│                   └──────────────────────────────────────────┘ │
└────────────────────────────────────────────────────────────────┘
```

## CSS Spec

### Overlay + Slide Animation
```css
.drawer-overlay {
  position: fixed; inset: 0; z-index: 999;
  background: rgba(0,0,0,0.45);
  opacity: 0; visibility: hidden;
  transition: opacity .3s var(--ease-out), visibility .3s;
  backdrop-filter: blur(2px);
}
.drawer-overlay.open { opacity: 1; visibility: visible; }

.drawer {
  position: fixed; top: 0; right: 0; z-index: 1000;
  width: 620px; height: 100vh;
  background: var(--card);
  border-left: 1px solid var(--border);
  box-shadow: -8px 0 40px rgba(0,0,0,0.25);
  display: flex; flex-direction: column;
  transform: translateX(100%);
  transition: transform .35s var(--ease-out);
}
.drawer.open { transform: translateX(0); }
```

### Header
```css
.dw-header {
  display: flex; align-items: flex-start; gap: var(--space-lg);
  padding: var(--space-2xl) var(--space-2xl) var(--space-xl);  /* 24px 24px 20px */
}
.dw-coin-icon { width: 48px; height: 48px; border-radius: var(--radius-md); }
.dw-title { font-size: 18px; font-weight: 700; }
.dw-subtitle { font-size: var(--text-caption); color: var(--muted-foreground); }
.dw-close { width: 34px; height: 34px; border-radius: var(--radius-sm); }
.dw-close:hover { background: var(--accent); color: var(--foreground); }
```

### Metadata Grid
```css
.dw-meta {
  display: grid;
  grid-template-columns: 120px 1fr;
  padding: var(--space-sm) var(--space-2xl) var(--space-lg);
}
.dw-row { display: contents; }
.dw-label { font-size: var(--text-sm); color: var(--muted-foreground); padding: 10px 0; }
.dw-value { font-size: var(--text-sm); color: var(--foreground); font-weight: 500; padding: 10px 0; }
```

### Tabs (underline style)
```css
.dw-tabs {
  display: flex; gap: var(--space-xs);
  padding: 0 var(--space-2xl);
  border-top: 1px solid var(--border-separator);
  border-bottom: 1px solid var(--border-separator);
}
.dw-tab {
  padding: var(--space-md);
  border-bottom: 2px solid transparent;
  font-size: var(--text-sm); font-weight: 500;
  color: var(--muted-foreground);
}
.dw-tab.active {
  color: var(--foreground);
  border-bottom-color: var(--foreground);
  font-weight: 600;
}
.dw-tab-badge {
  min-width: 20px; height: 20px;
  border-radius: var(--radius-xs);
  background: var(--muted);
  font-size: 10px; font-weight: 600;
}
.dw-tab.active .dw-tab-badge {
  background: var(--foreground);
  color: var(--card);
}
```

---

## 4 Painéis de Conteúdo

### 1. Details Panel
- `.dw-section-title` — Uppercase, small, muted label
- `.dw-notes` — Background `var(--muted)`, padding `var(--space-lg)`, text `var(--text-sm)`
- `.dw-detail-grid` — Grid 2×2 de cards
- `.dw-detail-card` — Background `var(--muted)`, label + value

### 2. Comments Panel
- `.dw-comment-box` — Input com textarea + toolbar
  - `.dw-comment-tools` — 3 botões de ferramenta (30×30px)
  - `.dw-submit-btn` — Background `var(--primary)`, color `var(--primary-fg)`
- `.dw-comment` — Thread item com avatar + body
  - `.dw-comment-avatar` — 34px circular, colored background
  - `.dw-comment-name` + `.dw-comment-time`
  - `.dw-comment-text`
  - `.dw-comment-actions` — Like, Reply, etc.
  - `.dw-reaction` — Pill com emoji + count

### 3. Attachments Panel
- `.dw-attachment` — Row com icon + info + action
  - `.dw-att-icon` — 42×42px, colored by file type
  - `.dw-att-name` + `.dw-att-meta` (size, date)
  - `.dw-att-action` — "Download" link, hover: `var(--primary)`

### 4. Activity Timeline
- `.dw-timeline` — Vertical line via `::before`
- `.dw-tl-item` — Position relative, padding-left 28px
- `.dw-tl-dot` — 16px circle, border `var(--card)`
  - `.completed` → `var(--primary)`
  - `.pending` → `var(--warning)`
  - `.failed` → `var(--destructive)`
  - `.default` → `var(--muted-foreground)`
- `.dw-tl-title` + `.dw-tl-desc` + `.dw-tl-time`

---

## Padrão de Uso

### Abertura
```javascript
function openDrawer(transactionId) {
  document.querySelector('.drawer-overlay').classList.add('open');
  document.querySelector('.drawer').classList.add('open');
  // Populate drawer with transaction data...
}

function closeDrawer() {
  document.querySelector('.drawer-overlay').classList.remove('open');
  document.querySelector('.drawer').classList.remove('open');
}

// Close on overlay click
document.querySelector('.drawer-overlay').addEventListener('click', closeDrawer);
// Close on Escape
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeDrawer(); });
```

### Tab switching
```javascript
document.querySelectorAll('.dw-tab').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.dw-tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.dw-panel').forEach(p => p.classList.remove('active'));
    tab.classList.add('active');
    document.getElementById(tab.dataset.tab).classList.add('active');
  });
});
```

### HTML skeleton
```html
<div class="drawer-overlay"></div>
<div class="drawer">
  <div class="dw-header">
    <span class="dw-coin-icon" style="background:#F7931A;color:#fff">BTC</span>
    <div class="dw-title-wrap">
      <div class="dw-title">Buy Bitcoin</div>
      <div class="dw-subtitle">BTC/USDT · Spot Trade</div>
    </div>
    <button class="dw-close" onclick="closeDrawer()">✕</button>
  </div>

  <div class="dw-meta">
    <div class="dw-row">
      <span class="dw-label">Type</span>
      <span class="dw-value"><span class="badge buy">Buy</span></span>
    </div>
    <!-- more dw-rows -->
  </div>

  <div class="dw-tabs">
    <button class="dw-tab active" data-tab="overview">Overview</button>
    <button class="dw-tab" data-tab="comments">Comments <span class="dw-tab-badge">3</span></button>
    <button class="dw-tab" data-tab="attachments">Attachments <span class="dw-tab-badge">2</span></button>
    <button class="dw-tab" data-tab="activity">Activity</button>
  </div>

  <div class="dw-body">
    <div class="dw-panel active" id="overview"><!-- details --></div>
    <div class="dw-panel" id="comments"><!-- comments --></div>
    <div class="dw-panel" id="attachments"><!-- attachments --></div>
    <div class="dw-panel" id="activity"><!-- timeline --></div>
  </div>
</div>
```

---

## Checklist

- [ ] Overlay usa z-index 999, drawer usa 1000
- [ ] Drawer background é `var(--card)` (não `var(--background)`)
- [ ] Slide-in usa `transform: translateX(100%)` → `translateX(0)`
- [ ] Transition duration: overlay 300ms, drawer 350ms
- [ ] Close via: button, overlay click, Escape key
- [ ] Tabs usam border-bottom como indicador ativo
- [ ] Tab badges invertem cor quando ativo
- [ ] Funciona em dark e light theme
