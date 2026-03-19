# Component: Navigation

> Sidebar (248px/68px), Topbar (glass effect), e Breadcrumb do Design System.

## Sidebar

### Anatomia

```
┌─ .sidebar (248px, collapsed: 68px) ──┐
│                                        │
│  .sidebar-brand                        │
│  ┌──────────────────────────────────┐ │
│  │ .s-logo (36px)  .brand-name      │ │
│  │                  .brand-sub       │ │
│  └──────────────────────────────────┘ │
│  ─── border-bottom ───                 │
│                                        │
│  .sidebar-section                      │
│  ┌──────────────────────────────────┐ │
│  │ .sec-label "OVERVIEW"             │ │
│  │ .nav-item (40px height)           │ │
│  │   .ni-icon (30×30)  .nav-label    │ │
│  │ .nav-item.active                  │ │
│  │   ::before (green bar, 2.5px)     │ │
│  │   .ni-icon (primary-12 bg)        │ │
│  └──────────────────────────────────┘ │
│                                        │
│  .sidebar-section                      │
│  .sidebar-section                      │
│                                        │
│  .sidebar-gap (flex: 1)               │
│                                        │
│  .upgrade-card                         │
│  ┌──────────────────────────────────┐ │
│  │ .uc-icon (42px, primary-10 bg)    │ │
│  │ .uc-title                         │ │
│  │ .uc-sub                           │ │
│  │ .uc-btn (primary bg, full-width)  │ │
│  └──────────────────────────────────┘ │
└────────────────────────────────────────┘
```

### CSS Spec

```css
.sidebar {
  width: 248px;
  background: var(--sidebar);
  border-right: 1px solid var(--sidebar-border);
  display: flex; flex-direction: column;
  overflow-y: auto;
  transition: width .25s var(--ease-out);
}
.sidebar::-webkit-scrollbar { width: 0; } /* Hidden scrollbar */
```

### Nav Item
```css
.nav-item {
  display: flex; align-items: center; gap: 10px;
  height: 40px; padding: 0 12px;
  border-radius: var(--radius-sm);
  color: var(--sidebar-foreground);
  font-size: var(--text-sm); font-weight: 500;
  transition: all .2s var(--ease-out);
}
.nav-item:hover:not(.active) {
  background: var(--sidebar-accent);
  color: var(--accent-foreground);
}
.nav-item.active {
  background: var(--primary-8);
  color: var(--primary);
  font-weight: 600;
}
/* Green vertical bar on active */
.nav-item.active::before {
  content: '';
  position: absolute; left: 0; top: 25%; bottom: 25%;
  width: 2.5px;
  background: var(--primary);
  border-radius: 0 2px 2px 0;
}
/* Icon background on active */
.nav-item.active .ni-icon {
  background: var(--primary-12);
}
```

### Collapsed State
```css
.sidebar.collapsed { width: 68px; }

/* Hidden elements */
.sidebar.collapsed .brand-text,
.sidebar.collapsed .sec-label,
.sidebar.collapsed .nav-label,
.sidebar.collapsed .upgrade-card { display: none; }

/* Centered square nav items */
.sidebar.collapsed .nav-item {
  justify-content: center; padding: 0;
  width: 44px; height: 44px; margin: 2px auto;
}
.sidebar.collapsed .nav-item.active { border-radius: var(--radius-md); }
.sidebar.collapsed .nav-item.active::before { display: none; }
.sidebar.collapsed .ni-icon { width: 30px; height: 30px; }
```

### Sidebar tokens
| Token | Dark | Light |
|-------|------|-------|
| `--sidebar` | `#0b0c10` | `#ffffff` |
| `--sidebar-foreground` | `#4e4e5a` | `#8b8ba0` |
| `--sidebar-border` | `#1a1c24` | `#e4e5eb` |
| `--sidebar-accent` | `#14161c` | `#e8ecf1` |
| `--sidebar-muted` | `#3e3e4a` | `#9e9eb2` |

---

## Topbar

### Anatomia

```
┌─ .topbar (glass, sticky) ──────────────────────────────────────┐
│                                                                   │
│  .sidebar-toggle-btn  .topbar-divider  .breadcrumb               │
│                                                                   │
│            ← .topbar-center (flex: 1, centered) →                │
│            .wallet-tag  .wallet-tag                               │
│                                                                   │
│  .topbar-right                                                    │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │ .t-icon-btn (notif)  .t-icon-btn (theme)  .user-chip     │   │
│  │   .notif-badge                              .avatar       │   │
│  │                                             .user-meta    │   │
│  └──────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────┘
```

### CSS Spec (Glass Effect)
```css
.topbar {
  display: flex; align-items: center;
  padding: var(--space-md) var(--space-2xl);
  gap: var(--space-lg);
  border-bottom: 1px solid var(--border);
  background: var(--background-glass);     /* rgba with 75% opacity */
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  flex-shrink: 0;
}
```

### Topbar Elements
| Elemento | Spec |
|----------|------|
| `.sidebar-toggle-btn` | 24×24px, `var(--fg-muted)`, hover → `var(--fg-secondary)` |
| `.topbar-divider` | 1×20px, `var(--border-separator)` |
| `.bc-parent` | `var(--text-sm)`, `var(--muted-foreground)`, hover → `var(--foreground)` |
| `.bc-sep` | `var(--border)`, 15px |
| `.bc-current` | 15px, weight 700 |
| `.t-icon-btn` | 36×36px circle, `var(--secondary)` bg, 1px `var(--border)`, pill radius |
| `.notif-badge` | 7×7px absolute, `var(--destructive)` background |
| `.avatar` | 34×34px, `var(--radius-sm)`, gradient `#00c97a → #00a866` |
| `.user-name` | `var(--text-sm)`, weight 600 |
| `.user-url` | 10px, `var(--sidebar-foreground)` |

---

## Breadcrumb

```html
<div class="breadcrumb">
  <span class="bc-parent">Dashboard</span>
  <span class="bc-sep">/</span>
  <span class="bc-current">Analytics</span>
</div>
```

---

## Padrão de toggle sidebar

```javascript
const sidebar = document.querySelector('.sidebar');
const toggleBtn = document.querySelector('.sidebar-toggle-btn');

toggleBtn.addEventListener('click', () => {
  sidebar.classList.toggle('collapsed');
});
```

---

## HTML Template Copiável (Sidebar + Topbar + Scripts)

Use este template como base para **toda nova página**. Altere apenas: `<title>`, breadcrumb, e `.active` no nav-item correto.

```html
<aside class="sidebar">
  <div class="sidebar-brand">
    <div class="s-logo">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
        <rect x="2" y="12" width="3.5" height="8" rx="1.2"/>
        <rect x="7.5" y="7" width="3.5" height="13" rx="1.2"/>
        <rect x="13" y="3" width="3.5" height="17" rx="1.2"/>
        <rect x="18.5" y="9" width="3.5" height="11" rx="1.2"/>
      </svg>
    </div>
    <div class="brand-text">
      <div class="brand-name">iGreenMCP</div>
      <div class="brand-sub">Pro Account</div>
    </div>
  </div>

  <div class="sidebar-section">
    <div class="sec-label">Main Menu</div>
    <a class="nav-item" href="dashboard.html">
      <div class="ni-icon"><svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/></svg></div>
      <span class="nav-label">Dashboard</span>
    </a>
    <a class="nav-item" href="#">
      <div class="ni-icon"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/></svg></div>
      <span class="nav-label">Portfolio</span>
    </a>
    <a class="nav-item" href="#">
      <div class="ni-icon"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><polyline points="17 1 21 5 17 9"/><path d="M3 11V9a4 4 0 0 1 4-4h14"/><polyline points="7 23 3 19 7 15"/><path d="M21 13v2a4 4 0 0 1-4 4H3"/></svg></div>
      <span class="nav-label">Swap</span>
    </a>
    <a class="nav-item" href="market-trends.html">
      <div class="ni-icon"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg></div>
      <span class="nav-label">Market Trends</span>
    </a>
  </div>

  <div class="sidebar-section">
    <div class="sec-label">Manage</div>
    <a class="nav-item" href="analytics.html">
      <div class="ni-icon"><svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><rect x="2" y="13" width="3" height="9" rx="1"/><rect x="7" y="8" width="3" height="14" rx="1"/><rect x="12" y="3" width="3" height="19" rx="1"/><rect x="17" y="10" width="3" height="12" rx="1"/></svg></div>
      <span class="nav-label">Analytics</span>
    </a>
    <a class="nav-item" href="products.html">
      <div class="ni-icon"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg></div>
      <span class="nav-label">Reports</span>
    </a>
    <a class="nav-item" href="#">
      <div class="ni-icon"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg></div>
      <span class="nav-label">Calendar</span>
    </a>
  </div>

  <div class="sidebar-section">
    <div class="sec-label">Settings</div>
    <a class="nav-item" href="order.html">
      <div class="ni-icon"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg></div>
      <span class="nav-label">Settings</span>
    </a>
    <a class="nav-item" href="#">
      <div class="ni-icon"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg></div>
      <span class="nav-label">Security</span>
    </a>
    <a class="nav-item" href="#">
      <div class="ni-icon"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg></div>
      <span class="nav-label">Log Out</span>
    </a>
  </div>

  <div class="sidebar-gap"></div>

  <div class="upgrade-card">
    <div class="uc-icon">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
    </div>
    <div class="uc-title">Upgrade To Pro</div>
    <div class="uc-sub">Unlock real-time signals and advanced analytics.</div>
    <button class="uc-btn">Get Started</button>
  </div>
</aside>

<div class="sidebar-overlay" id="sidebarOverlay"></div>

<div class="main">
  <header class="topbar">
    <button class="sidebar-toggle-btn" id="sidebarToggle" title="Toggle sidebar">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="9" y1="3" x2="9" y2="21"/></svg>
    </button>
    <div class="topbar-divider"></div>
    <span class="mobile-title">PAGE_NAME</span>  <!-- ← MUDAR (mesmo texto do bc-current) -->
    <div class="breadcrumb">
      <span class="bc-parent">Overview</span>
      <span class="bc-sep">›</span>
      <span class="bc-current">PAGE_NAME</span>  <!-- ← MUDAR -->
    </div>
    <div class="topbar-center">
      <div class="wallet-tag"><div class="dot dot-gray"></div>Main-coin wallet</div>
      <div class="wallet-tag"><div class="dot dot-green"></div>All Wallet (08)</div>
    </div>
    <div class="topbar-right">
      <div class="t-icon-btn">
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>
        <div class="notif-badge"></div>
      </div>
      <div class="t-icon-btn" id="themeToggle" title="Toggle theme">
        <svg class="icon-sun" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>
        <svg class="icon-moon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
      </div>
      <div class="user-chip">
        <div class="avatar">S</div>
        <div class="user-meta">
          <div class="user-name">Simson wili</div>
          <div class="user-url"><svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg> Simsonwit.com</div>
        </div>
      </div>
    </div>
  </header>

  <div class="body">
    <!-- ← CONTEÚDO DA PÁGINA AQUI -->
  </div>
</div>
```

### Scripts obrigatórios (antes de `</body>`)
```html
<script>
// ─── SIDEBAR TOGGLE (desktop + mobile) ───
(function(){
  const sb = document.querySelector('.sidebar');
  const btn = document.getElementById('sidebarToggle');
  const overlay = document.getElementById('sidebarOverlay');
  const isMobile = () => window.innerWidth <= 767;

  if (!isMobile() && localStorage.getItem('cv-sidebar') === 'collapsed') {
    sb.classList.add('collapsed');
  }

  btn.addEventListener('click', () => {
    if (isMobile()) {
      sb.classList.toggle('open');
      overlay.classList.toggle('active');
    } else {
      sb.classList.toggle('collapsed');
      localStorage.setItem('cv-sidebar',
        sb.classList.contains('collapsed') ? 'collapsed' : 'expanded');
    }
  });

  if (overlay) {
    overlay.addEventListener('click', () => {
      sb.classList.remove('open');
      overlay.classList.remove('active');
    });
  }

  window.addEventListener('resize', () => {
    if (!isMobile()) {
      sb.classList.remove('open');
      if (overlay) overlay.classList.remove('active');
    }
  });
})();

// ─── THEME TOGGLE ───
(function() {
  const root = document.documentElement;
  const btn  = document.getElementById('themeToggle');
  const saved = localStorage.getItem('cv-theme') || 'dark';
  root.setAttribute('data-theme', saved);
  btn.addEventListener('click', () => {
    const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', next);
    localStorage.setItem('cv-theme', next);
  });
})();
</script>
```

### Nav Items — qual `.active` usar por página

| Página | Nav item active | Breadcrumb |
|--------|----------------|------------|
| `analytics.html` | Analytics | Overview › Analytics |
| `products.html` | Reports | Overview › Reports |
| `order.html` / `order-detail.html` | Settings | Overview › Settings |
| `market-trends.html` | Market Trends | Overview › Market Trends |
| `dashboard.html` | Dashboard | Overview › Dashboard |

---

## Checklist

- [ ] Sidebar usa `var(--sidebar)` background (diferente de `var(--background)`)
- [ ] Nav item active tem barra verde `::before` de 2.5px
- [ ] Sidebar collapsed esconde labels e mostra só ícones em 44×44px
- [ ] Topbar usa glass effect (`backdrop-filter: blur(12px)`)
- [ ] Glass effect APENAS no topbar, nunca em cards
- [ ] Toggle button esconde sidebar com transição de width
- [ ] `.sidebar-overlay` div existe no HTML (após `</aside>`, antes de `.main`)
- [ ] Sidebar toggle JS lida com desktop (collapse) E mobile (overlay)
- [ ] Sidebar no mobile abre FULL (248px com labels), não collapsed (68px icons)
- [ ] Mobile topbar esconde wallet-tags, breadcrumb, user-chip (título permanece)
- [ ] `.mobile-title` mostra nome da página no mobile
- [ ] Funciona em dark e light theme
