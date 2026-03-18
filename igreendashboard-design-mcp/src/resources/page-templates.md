# Page Templates

> Templates HTML completos para criar novas páginas. Copie e adapte.
> Cada template inclui sidebar+topbar+body+scripts prontos.

## Template 1: Base (Esqueleto para qualquer página)

```html
<!DOCTYPE html>
<html lang="en" data-theme="dark">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>PAGE_TITLE — iGreenMCP</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
  <!-- Se usar Chart.js: -->
  <!-- <script src="https://cdn.jsdelivr.net/npm/chart.js@4.4.0/dist/chart.umd.min.js"></script> -->
  <script>
    (function(){var t=localStorage.getItem('cv-theme');if(t)document.documentElement.setAttribute('data-theme',t)})();
  </script>
  <link href="./dist/styles.css" rel="stylesheet">
</head>
<body>
<div class="app">

  <!-- SIDEBAR -->
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
      <!-- ACTIVE: Adicione class="active" no nav-item desta página -->
      <a class="nav-item" href="analytics.html">
        <div class="ni-icon"><svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><rect x="2" y="13" width="3" height="9" rx="1"/><rect x="7" y="8" width="3" height="14" rx="1"/><rect x="12" y="3" width="3" height="19" rx="1"/><rect x="17" y="10" width="3" height="12" rx="1"/></svg></div>
        <span class="nav-label">Analytics</span>
      </a>
      <a class="nav-item" href="products.html">
        <div class="ni-icon"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg></div>
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
      <div class="uc-icon"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg></div>
      <div class="uc-title">Upgrade To Pro</div>
      <div class="uc-sub">Unlock real-time signals and advanced analytics.</div>
      <button class="uc-btn">Get Started</button>
    </div>
  </aside>

  <!-- MAIN -->
  <div class="main">
    <header class="topbar">
      <button class="sidebar-toggle-btn" id="sidebarToggle" title="Toggle sidebar">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="9" y1="3" x2="9" y2="21"/></svg>
      </button>
      <div class="topbar-divider"></div>
      <div class="breadcrumb">
        <span class="bc-parent">Overview</span>
        <span class="bc-sep">&rsaquo;</span>
        <span class="bc-current">PAGE_NAME</span>
      </div>
      <div class="topbar-center">
        <div class="wallet-tag"><div class="dot dot-gray"></div>Main-coin wallet</div>
        <div class="wallet-tag"><div class="dot dot-green"></div>All Wallet (08)</div>
      </div>
      <div class="topbar-right">
        <div class="t-icon-btn">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>
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
      <!-- ═══ PAGE CONTENT HERE ═══ -->
    </div>
  </div>

</div>

<script>
// Sidebar toggle
(function(){
  const sb=document.querySelector('.sidebar'), btn=document.getElementById('sidebarToggle');
  if(localStorage.getItem('cv-sidebar')==='collapsed') sb.classList.add('collapsed');
  btn.addEventListener('click',()=>{sb.classList.toggle('collapsed');localStorage.setItem('cv-sidebar',sb.classList.contains('collapsed')?'collapsed':'expanded')});
})();
// Theme toggle
(function(){
  const root=document.documentElement, btn=document.getElementById('themeToggle');
  btn.addEventListener('click',()=>{const next=root.getAttribute('data-theme')==='dark'?'light':'dark';root.setAttribute('data-theme',next);localStorage.setItem('cv-theme',next)});
})();
</script>
</body>
</html>
```

**Para usar:** Substitua `PAGE_TITLE`, `PAGE_NAME`, e adicione `.active` no nav-item correto.

---

## Template 2: Página com Tabela (ref: products.html)

Dentro de `<div class="body">`:

```html
<!-- KPI Grid -->
<div class="kpi-grid">
  <div class="kpi-card">
    <div class="kpi-left">
      <div class="kpi-label">Total Items</div>
      <div class="kpi-value">248</div>
      <div class="kpi-footer">
        <span class="kpi-badge up">+12</span>
        <span class="kpi-sub">this month</span>
      </div>
    </div>
    <div class="kpi-spark">
      <svg viewBox="0 0 80 32" width="80" height="32">
        <rect x="2" y="18" width="6" height="14" rx="2" fill="var(--primary-20)"/>
        <rect x="12" y="12" width="6" height="20" rx="2" fill="var(--primary-20)"/>
        <rect x="22" y="8" width="6" height="24" rx="2" fill="var(--primary-20)"/>
        <rect x="32" y="14" width="6" height="18" rx="2" fill="var(--primary-20)"/>
        <rect x="42" y="6" width="6" height="26" rx="2" fill="var(--primary-20)"/>
        <rect x="52" y="10" width="6" height="22" rx="2" fill="var(--primary-20)"/>
        <rect x="62" y="2" width="6" height="30" rx="2" fill="var(--primary)"/>
      </svg>
    </div>
  </div>
  <!-- Repeat 3 more .kpi-card -->
</div>

<!-- Table Section -->
<div class="table-section">
  <div class="tbl-topbar">
    <div class="tbl-title-row">
      <div class="tbl-title-left">
        <span class="card-title">Items</span>
        <span class="tbl-badge">248</span>
      </div>
    </div>
    <div class="tbl-toolbar-row">
      <div class="tbl-tabs">
        <button class="tbl-tab active" data-status="all">All</button>
        <button class="tbl-tab" data-status="active">Active</button>
        <button class="tbl-tab" data-status="pending">Pending</button>
      </div>
      <div class="tbl-toolbar-spacer"></div>
      <div class="tbl-search">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
        <input type="text" placeholder="Search...">
      </div>
      <button class="tbl-filter-btn" id="filterToggle">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></svg>
        Filter
      </button>
      <button class="tbl-export-btn">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
        Export
      </button>
    </div>
  </div>

  <table>
    <thead>
      <tr>
        <th>Name</th>
        <th>Status</th>
        <th class="r">Value</th>
        <th class="r">Change</th>
        <th>Date</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><div class="asset-cell"><div class="coin-icon">BT</div><div><div class="coin-sym">BTC</div></div></div></td>
        <td><span class="badge buy">Active</span></td>
        <td class="r">$67,432.00</td>
        <td class="r"><span class="chg-pos">+2.4%</span></td>
        <td>Jan 15, 2024</td>
      </tr>
      <!-- More rows -->
    </tbody>
  </table>

  <div class="pagination">
    <span class="page-info">Showing 1-10 of 248</span>
    <div class="page-btns">
      <button class="pb" aria-label="Previous"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="15 18 9 12 15 6"/></svg></button>
      <button class="pb active">1</button>
      <button class="pb">2</button>
      <button class="pb">3</button>
      <button class="pb pb--ellipsis">...</button>
      <button class="pb">25</button>
      <button class="pb" aria-label="Next"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"/></svg></button>
    </div>
  </div>
</div>
```

---

## Template 3: Página de Detalhe (ref: order-detail.html)

Dentro de `<div class="body">`:

```html
<!-- Header -->
<div class="od-header">
  <h1 class="od-title">Order: <span>#95954</span></h1>
  <div class="od-actions">
    <button class="btn btn--outline">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 9l6 6 6-6"/></svg>
      Print
    </button>
    <button class="btn btn--solid">Edit Order</button>
  </div>
</div>

<!-- Tabs (5) -->
<div class="od-tabs">
  <button class="od-tab active" data-tab="overview">Overview</button>
  <button class="od-tab" data-tab="details">Details</button>
  <button class="od-tab" data-tab="activity">Activity</button>
  <button class="od-tab" data-tab="comments">Comments <span class="od-tab-badge">3</span></button>
  <button class="od-tab" data-tab="attachments">Attachments</button>
</div>

<!-- ═══ Panel 1: Overview ═══ -->
<div class="od-panel active" data-panel="overview">
  <div class="od-grid">
    <div class="od-main">
      <!-- Products ordered -->
      <div class="od-card">
        <div class="od-card-head">
          <span class="od-card-title">Products ordered</span>
          <span class="od-card-count">3 items</span>
        </div>
        <div class="od-product">
          <div class="od-product-img"><img src="product.png" alt=""></div>
          <div class="od-product-info">
            <div class="od-product-name">Wireless Headphones</div>
            <div class="od-product-id">#SKU-WH-001</div>
          </div>
          <div class="od-product-right">
            <div class="od-product-price">$149.00</div>
            <div class="od-product-qty">Qty: 1</div>
          </div>
        </div>
        <!-- Repeat .od-product for each item -->

        <!-- Payment summary -->
        <div class="od-summary">
          <div class="od-summary-row"><span>Subtotal</span><span>$447.00</span></div>
          <div class="od-summary-row"><span>Tax (8%)</span><span>$35.76</span></div>
          <div class="od-summary-row"><span>Shipping</span><span>$12.00</span></div>
          <div class="od-summary-row total"><span>Total</span><span>$494.76</span></div>
        </div>
      </div>
    </div>

    <div class="od-side">
      <!-- Customer card -->
      <div class="od-card">
        <div class="od-card-head"><span class="od-card-title">Customer</span></div>
        <div class="od-customer">
          <div class="od-customer-avatar">J</div>
          <div>
            <div class="od-customer-name">John Doe</div>
            <div class="od-customer-sub">11 previous orders</div>
          </div>
        </div>
        <div class="od-info-row">
          <div class="od-info-icon"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M22 7l-10 7L2 7"/></svg></div>
          <div class="od-info-text">john@example.com</div>
        </div>
        <div class="od-info-row">
          <div class="od-info-icon"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72"/></svg></div>
          <div class="od-info-text">+1 555-123-4567</div>
        </div>
      </div>

      <!-- Note card -->
      <div class="od-card">
        <div class="od-card-head"><span class="od-card-title">Note</span></div>
        <p class="od-note">Customer requested gift wrapping and a handwritten note.</p>
      </div>
    </div>
  </div>
</div>

<!-- ═══ Panel 2: Details ═══ -->
<div class="od-panel" data-panel="details">
  <div class="od-detail-section">
    <div class="od-detail-header">
      <div class="od-detail-icon">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="1" y="3" width="15" height="13" rx="2"/><path d="M16 8l5 3-5 3V8z"/></svg>
      </div>
      <span class="od-detail-title">Order Information</span>
    </div>
    <div class="od-detail-grid">
      <div class="od-detail-field">
        <div class="od-detail-label">Order ID</div>
        <div class="od-detail-value">#95954</div>
      </div>
      <div class="od-detail-field">
        <div class="od-detail-label">Status</div>
        <div class="od-detail-value"><span class="badge buy">Processing</span></div>
      </div>
      <div class="od-detail-field">
        <div class="od-detail-label">Payment Method</div>
        <div class="od-detail-value">Visa ending 4242</div>
      </div>
      <div class="od-detail-field">
        <div class="od-detail-label">Created</div>
        <div class="od-detail-value">Jan 15, 2024 at 10:30 AM</div>
      </div>
    </div>
  </div>

  <div class="od-detail-section">
    <div class="od-detail-header">
      <div class="od-detail-icon">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
      </div>
      <span class="od-detail-title">Shipping Address</span>
      <a class="od-detail-action" href="#">Edit</a>
    </div>
    <div class="od-detail-grid cols-2">
      <div class="od-detail-field">
        <div class="od-detail-label">Address</div>
        <div class="od-detail-value">123 Main St, Apt 4B</div>
      </div>
      <div class="od-detail-field">
        <div class="od-detail-label">City / ZIP</div>
        <div class="od-detail-value">New York, NY 10001</div>
      </div>
    </div>
  </div>

  <!-- Tags section -->
  <div class="od-detail-section">
    <div class="od-detail-header">
      <div class="od-detail-icon">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/></svg>
      </div>
      <span class="od-detail-title">Tags</span>
    </div>
    <div class="od-tags">
      <span class="od-tag">VIP</span>
      <span class="od-tag">Express</span>
      <button class="od-tag-add">+ Add tag</button>
    </div>
  </div>
</div>

<!-- ═══ Panel 3: Activity ═══ -->
<div class="od-panel" data-panel="activity">
  <div class="od-timeline">
    <div class="od-tl-item">
      <div class="od-tl-dot"></div>
      <div class="od-tl-content">
        <div class="od-tl-head">
          <span class="od-tl-action">Order shipped</span>
          <span class="od-tl-time">2 hours ago</span>
        </div>
        <div class="od-tl-desc">Package dispatched via FedEx. Tracking: FX-789456123</div>
      </div>
    </div>
    <div class="od-tl-item">
      <div class="od-tl-dot"></div>
      <div class="od-tl-content">
        <div class="od-tl-head">
          <span class="od-tl-action">Payment confirmed</span>
          <span class="od-tl-time">Jan 15, 2024</span>
        </div>
        <div class="od-tl-desc">$494.76 charged to Visa ending 4242</div>
      </div>
    </div>
    <div class="od-tl-item">
      <div class="od-tl-dot"></div>
      <div class="od-tl-content">
        <div class="od-tl-head">
          <span class="od-tl-action">Order created</span>
          <span class="od-tl-time">Jan 15, 2024</span>
        </div>
      </div>
    </div>
  </div>
</div>

<!-- ═══ Panel 4: Comments ═══ -->
<div class="od-panel" data-panel="comments">
  <!-- Comment input -->
  <div class="od-comment-box">
    <textarea placeholder="Write a comment..." rows="3"></textarea>
    <div class="od-comment-toolbar">
      <div class="od-comment-tools">
        <button class="dw-comment-tool" title="Attach file">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"/></svg>
        </button>
        <button class="dw-comment-tool" title="Mention">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="4"/><path d="M16 8v5a3 3 0 0 0 6 0V12a10 10 0 1 0-3.92 7.94"/></svg>
        </button>
      </div>
      <button class="btn btn--solid btn--sm">Post Comment</button>
    </div>
  </div>

  <!-- Comment list -->
  <div class="od-comment">
    <div class="od-comment-avatar">J</div>
    <div class="od-comment-body">
      <div class="od-comment-head">
        <span class="od-comment-name">John Doe</span>
        <span class="od-comment-time">2 hours ago</span>
      </div>
      <div class="od-comment-text">Customer called to confirm delivery window. Prefers morning delivery between 9-12 AM.</div>
    </div>
  </div>
  <div class="od-comment">
    <div class="od-comment-avatar">S</div>
    <div class="od-comment-body">
      <div class="od-comment-head">
        <span class="od-comment-name">Sarah M.</span>
        <span class="od-comment-time">Yesterday</span>
      </div>
      <div class="od-comment-text">Gift wrap added. Note enclosed per request.</div>
    </div>
  </div>
</div>

<!-- ═══ Panel 5: Attachments ═══ -->
<div class="od-panel" data-panel="attachments">
  <div class="od-attachment">
    <div class="od-att-icon">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
    </div>
    <div class="od-att-info">
      <div class="od-att-name">invoice-95954.pdf</div>
      <div class="od-att-meta">245 KB · Uploaded Jan 15, 2024</div>
    </div>
    <button class="od-att-action" title="Download">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
    </button>
  </div>
  <div class="od-attachment">
    <div class="od-att-icon">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
    </div>
    <div class="od-att-info">
      <div class="od-att-name">product-photo.jpg</div>
      <div class="od-att-meta">1.2 MB · Uploaded Jan 14, 2024</div>
    </div>
    <button class="od-att-action" title="Download">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
    </button>
  </div>
</div>

<script>
// Tab switching (all 5 tabs)
document.querySelectorAll('.od-tab').forEach(tab=>{
  tab.addEventListener('click',()=>{
    document.querySelectorAll('.od-tab').forEach(t=>t.classList.remove('active'));
    document.querySelectorAll('.od-panel').forEach(p=>p.classList.remove('active'));
    tab.classList.add('active');
    document.querySelector(`[data-panel="${tab.dataset.tab}"]`).classList.add('active');
  });
});
</script>
```

---

## Template 4: Página de Gráficos (ref: market-trends.html)

Dentro de `<div class="body">`:

```html
<!-- Filter Bar -->
<div class="filter-bar">
  <span class="filter-label">Period:</span>
  <div class="presets">
    <button class="preset">7D</button>
    <button class="preset active">30D</button>
    <button class="preset">90D</button>
    <button class="preset">1Y</button>
  </div>
  <div class="vdiv"></div>
  <button class="date-range-btn">
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
    Jan 15 – Feb 14, 2024
  </button>
</div>

<!-- Chart Grid (2 columns) -->
<div class="ch-grid">
  <div class="ch-card">
    <div class="ch-card-head">
      <div>
        <div class="ch-card-title">Chart Title</div>
        <div class="ch-card-sub">Subtitle description</div>
      </div>
    </div>
    <div class="ch-stat-row">
      <div class="ch-stat">
        <div class="ch-stat-label">METRIC</div>
        <div class="ch-stat-val">$67,432</div>
        <span class="ch-stat-chg up">+12.4%</span>
      </div>
      <div class="ch-stat">
        <div class="ch-stat-label">METRIC 2</div>
        <div class="ch-stat-val">$3,890</div>
        <span class="ch-stat-chg dn">-5.2%</span>
      </div>
    </div>
    <div class="ch-canvas-wrap">
      <canvas id="chartExample" height="220"></canvas>
    </div>
    <div class="ch-lg-simple" id="legendExample"></div>
  </div>
</div>

<!-- Para doughnut com center label: -->
<div class="ch-card">
  <div class="ch-card-head">
    <div><div class="ch-card-title">Allocation</div></div>
  </div>
  <div class="ch-canvas-wrap ch-canvas-wrap--sm">
    <canvas id="chartDonut"></canvas>
    <div class="ch-donut-center">
      <div class="ch-donut-val">$458K</div>
      <div class="ch-donut-sub">Total Value</div>
    </div>
  </div>
  <div class="ch-lg-rich" id="legendDonut"></div>
</div>

<script>
// Chart colors from tokens
const cs = getComputedStyle(document.documentElement);
const primary = cs.getPropertyValue('--primary').trim();
const destructive = cs.getPropertyValue('--destructive').trim();
const warning = cs.getPropertyValue('--warning').trim();
const info = cs.getPropertyValue('--info').trim();
const chart2 = cs.getPropertyValue('--chart-2').trim();
const borderSep = cs.getPropertyValue('--border-separator').trim();
const fgGhost = cs.getPropertyValue('--fg-ghost').trim();

// Legend helpers
function simpleLegend(id, items) {
  document.getElementById(id).innerHTML = items.map(i =>
    `<div class="ch-lg-simple-item"><span style="width:8px;height:8px;border-radius:50%;background:${i.color};flex-shrink:0"></span>${i.label}</div>`
  ).join('');
}
function richLegend(id, items) {
  document.getElementById(id).innerHTML = items.map(i =>
    `<div class="ch-lg-row"><span class="ch-lg-dot" style="background:${i.color}"></span><span class="ch-lg-name">${i.label}</span><span class="ch-lg-pct">${i.value}</span><span class="ch-lg-badge ${i.dir}">${i.change}</span></div>`
  ).join('');
}
function valLegend(id, items) {
  document.getElementById(id).innerHTML = items.map(i =>
    `<div class="ch-lg-val-item"><span class="ch-lg-val-label"><span style="width:8px;height:8px;border-radius:50%;background:${i.color};flex-shrink:0"></span>${i.label}</span><span class="ch-lg-val-num">${i.value}</span></div>`
  ).join('');
}

// ALWAYS disable Chart.js legend:
// options: { plugins: { legend: { display: false } } }
</script>
```

---

## Personalização por página

| Propriedade | Onde mudar |
|-------------|-----------|
| Título da aba | `<title>PAGE — iGreenMCP</title>` |
| Nav ativo | Adicionar `class="active"` no `.nav-item` correto |
| Breadcrumb | `.bc-parent` (link) e `.bc-current` (nome) |
| Grid de charts | `.ch-grid` (2col), `.ch-grid-3` (3col), `.ch-grid-4` (4col) |
| Card compacto | `.ch-card-sm` (padding menor, título menor) |

## Nav items por página (referência)

| Página | Nav Active | Breadcrumb |
|--------|-----------|------------|
| analytics.html | Analytics | Overview › Analytics |
| products.html | Reports | Reports › Products |
| order.html | Settings | Orders › New Order |
| order-detail.html | Reports | Products › Order #95954 |
| market-trends.html | Market Trends | Market › Trends & Analysis |
