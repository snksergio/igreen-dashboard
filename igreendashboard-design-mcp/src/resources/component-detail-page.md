# Component: Detail Page

> Padrões de página de detalhe com tabs, grid 2 colunas, cards de seção, field grids, tags, comments, attachments e HTML template completo.
> Referência: `order-detail.html`

## Anatomia geral

```
┌─ .od-header ─────────────────────────────────────────┐
│  .od-title "Order: #95954"    .od-actions [Print][Edit]│
└──────────────────────────────────────────────────────┘
┌─ .od-tabs ───────────────────────────────────────────┐
│  [Overview] [Details] [Activity] [Comments]           │
└──────────────────────────────────────────────────────┘
┌─ .od-panel.active ───────────────────────────────────┐
│  .od-grid (2 colunas: 1fr 380px)                     │
│  ┌─ .od-main ──────────┐ ┌─ .od-side ──────────┐   │
│  │  .od-card             │ │  .od-card            │   │
│  │  .od-card             │ │  .od-card            │   │
│  └───────────────────────┘ └─────────────────────┘   │
└──────────────────────────────────────────────────────┘
```

## CSS Classes — Layout

```css
/* Header */
.od-header   { display: flex; justify-content: space-between; align-items: center; margin-bottom: var(--space-xl); }
.od-title    { font-size: var(--text-title); font-weight: 700; }
.od-title span { color: var(--fg-muted); }
.od-actions  { display: flex; gap: var(--space-sm); }

/* Tabs */
.od-tabs     { display: flex; border-bottom: 1px solid var(--border-separator); gap: 0; margin-bottom: var(--space-xl); }
.od-tab      { padding: var(--space-md) var(--space-lg); border-bottom: 2px solid transparent; cursor: pointer; color: var(--fg-muted); font-size: var(--text-sm); font-weight: 500; }
.od-tab.active { border-color: var(--foreground); color: var(--foreground); }
.od-panel    { display: none; }
.od-panel.active { display: block; }

/* Grid */
.od-grid     { display: grid; grid-template-columns: 1fr 380px; gap: var(--space-xl); align-items: start; }
.od-main     { display: flex; flex-direction: column; gap: var(--space-xl); }
.od-side     { display: flex; flex-direction: column; gap: var(--space-xl); position: sticky; top: 0; }

/* Cards */
.od-card       { background: var(--card); border-radius: var(--radius-md); padding: var(--space-xl); box-shadow: var(--shadow-card); }
.od-card-head  { display: flex; justify-content: space-between; align-items: center; margin-bottom: var(--space-lg); }
.od-card-title { font-size: var(--text-subheading); font-weight: 600; }
```

## CSS Classes — Product Items

```css
.od-product       { display: flex; align-items: center; gap: var(--space-lg); padding: var(--space-md); background: var(--muted); border-radius: var(--radius-sm); margin-bottom: var(--space-sm); }
.od-product-img   { width: 48px; height: 48px; border-radius: var(--radius-sm); background: var(--elevated); flex-shrink: 0; }
.od-product-info  { flex: 1; }
.od-product-name  { font-size: var(--text-sm); font-weight: 500; }
.od-product-id    { font-size: var(--text-xs); color: var(--fg-muted); }
.od-product-right { text-align: right; }
.od-product-price { font-size: var(--text-sm); font-weight: 600; }
.od-product-qty   { font-size: var(--text-xs); color: var(--fg-muted); }
```

## CSS Classes — Payment Summary

```css
.od-summary-row       { display: flex; justify-content: space-between; padding: 8px 0; color: var(--fg-secondary); }
.od-summary-row.total { font-weight: 600; color: var(--foreground); border-top: 1px solid var(--border-separator); padding-top: var(--space-md); margin-top: var(--space-xs); }
.od-payment-final     { display: flex; justify-content: space-between; font-size: var(--text-heading); font-weight: 700; border-top: 1px solid var(--border-structural); padding-top: var(--space-lg); margin-top: var(--space-sm); }
```

## CSS Classes — Customer & Info

```css
.od-customer        { display: flex; align-items: center; gap: var(--space-md); margin-bottom: var(--space-lg); }
.od-customer-avatar { width: 44px; height: 44px; border-radius: 50%; background: linear-gradient(135deg, var(--primary), var(--primary-70)); display: flex; align-items: center; justify-content: center; color: var(--on-solid); font-weight: 700; }
.od-customer-name   { font-size: var(--text-body); font-weight: 600; }
.od-customer-sub    { font-size: var(--text-xs); color: var(--fg-muted); }
.od-info-row        { display: flex; align-items: center; gap: var(--space-md); padding: var(--space-sm) 0; border-top: 1px solid var(--border-separator); }
.od-info-text       { font-size: var(--text-sm); color: var(--fg-secondary); }
.od-address-title   { font-size: var(--text-sm); font-weight: 600; margin-bottom: var(--space-sm); padding-top: var(--space-md); border-top: 1px solid var(--border-separator); }
.od-address-line    { font-size: var(--text-sm); color: var(--fg-secondary); line-height: 1.6; }
.od-note            { background: var(--muted); border-radius: var(--radius-sm); padding: var(--space-lg); font-size: var(--text-sm); color: var(--fg-secondary); line-height: 1.6; }
```

## CSS Classes — Status Badges

```css
.od-status           { display: inline-flex; padding: 4px 10px; border-radius: var(--radius-pill); font-size: var(--text-xs); font-weight: 500; }
.od-status.paid      { background: var(--primary-10); color: var(--primary); }
.od-status.fulfilled { background: var(--primary-10); color: var(--primary); }
.od-status.pending   { background: var(--warning-8); color: var(--warning); }
```

## CSS Classes — Detail Sections (aba "Details")

```css
/* Section with icon + title + action */
.od-detail-section       { margin-bottom: var(--space-xl); }
.od-detail-header        { display: flex; align-items: center; gap: var(--space-md); margin-bottom: var(--space-lg); }
.od-detail-icon          { width: 36px; height: 36px; border-radius: var(--radius-sm); background: var(--muted); display: flex; align-items: center; justify-content: center; color: var(--fg-tertiary); }
.od-detail-section-title { font-size: var(--text-subheading); font-weight: 600; flex: 1; }
.od-detail-action        { font-size: var(--text-xs); color: var(--primary); font-weight: 500; cursor: pointer; padding: 6px 12px; border-radius: var(--radius-sm); transition: background .15s var(--ease-out); }
.od-detail-action:hover  { background: var(--primary-8); }

/* Field grids */
.od-fields   { display: grid; grid-template-columns: repeat(3, 1fr); gap: var(--space-lg) var(--space-xl); }
.od-fields-2 { display: grid; grid-template-columns: repeat(2, 1fr); gap: var(--space-lg) var(--space-xl); }
.od-field-label { font-size: var(--text-xs); color: var(--fg-muted); text-transform: uppercase; letter-spacing: 0.03em; margin-bottom: 4px; font-weight: 500; }
.od-field-value { font-size: var(--text-sm); color: var(--fg-secondary); font-weight: 500; }

/* Profile photo + fields */
.od-detail-profile { display: flex; gap: var(--space-xl); align-items: flex-start; }
.od-detail-photo   { width: 100px; height: 100px; border-radius: var(--radius-md); background: linear-gradient(135deg, var(--primary), var(--primary-70)); display: flex; align-items: center; justify-content: center; color: var(--on-solid); font-size: var(--text-lg); font-weight: 700; flex-shrink: 0; }

/* Tags */
.od-detail-tags    { display: flex; flex-wrap: wrap; gap: var(--space-sm); }
.od-detail-tags:last-child { margin-bottom: 0; }  /* auto-flush no último elemento */
.od-detail-tag     { display: inline-flex; align-items: center; gap: 6px; padding: 6px 14px; border-radius: var(--radius-pill); font-size: var(--text-caption); font-weight: 500; }
.od-detail-tag.green  { background: var(--primary-10); color: var(--primary); }
.od-detail-tag.blue   { background: var(--info-8); color: var(--info); }
.od-detail-tag.orange { background: var(--warning-8); color: var(--warning); }
.od-detail-tag.red    { background: var(--destructive-10); color: var(--destructive); }
.od-detail-tag.gray   { background: var(--overlay-8); color: var(--fg-tertiary); }
.od-detail-tag.sm     { font-size: var(--text-xs); padding: 3px 10px; }

/* Divider */
.od-detail-divider { height: 1px; background: var(--border-separator); margin: var(--space-lg) 0; }
```

## CSS Classes — Timeline

```css
.od-timeline         { position: relative; padding-left: 28px; }
.od-timeline::before { content: ''; position: absolute; left: 7px; top: 0; bottom: 0; width: 2px; background: var(--border-separator); }
.od-tl-item          { position: relative; padding-bottom: var(--space-xl); }
.od-tl-dot           { position: absolute; left: -28px; width: 16px; height: 16px; border-radius: 50%; top: 2px; }
.od-tl-dot.completed { background: var(--primary); }
.od-tl-dot.pending   { background: var(--info); }
.od-tl-title         { font-size: var(--text-sm); font-weight: 600; }
.od-tl-desc          { font-size: var(--text-sm); color: var(--fg-muted); }
.od-tl-time          { font-size: var(--text-xs); color: var(--fg-ghost); }
```

## CSS Classes — Comments Tab

```css
/* Comment input box */
.od-comment-box          { border: 1px solid var(--input-border); border-radius: var(--radius-sm); margin-bottom: var(--space-xl); }
.od-comment-box textarea { width: 100%; min-height: 56px; padding: var(--space-md) var(--space-lg); background: transparent; border: none; color: var(--foreground); font-size: var(--text-sm); font-family: inherit; resize: none; }
.od-comment-box textarea:focus { outline: none; }
.od-comment-box:focus-within   { border-color: var(--ring); }
.od-comment-toolbar      { display: flex; justify-content: flex-end; padding: var(--space-sm) var(--space-md); border-top: 1px solid var(--border-separator); }

/* Comment items */
.od-comment              { display: flex; gap: var(--space-md); padding: var(--space-lg) 0; border-top: 1px solid var(--border-separator); }
.od-comment-avatar       { width: 34px; height: 34px; border-radius: 50%; background: linear-gradient(135deg, var(--primary), var(--primary-70)); display: flex; align-items: center; justify-content: center; color: var(--on-solid); font-size: var(--text-xs); font-weight: 700; flex-shrink: 0; }
.od-comment-body         { flex: 1; min-width: 0; }
.od-comment-head         { display: flex; align-items: center; gap: var(--space-sm); margin-bottom: 4px; }
.od-comment-name         { font-size: var(--text-sm); font-weight: 600; }
.od-comment-time         { font-size: var(--text-xs); color: var(--fg-muted); }
.od-comment-text         { font-size: var(--text-sm); color: var(--fg-secondary); line-height: 1.55; }
```

```html
<!-- Comment input -->
<div class="od-comment-box">
  <textarea placeholder="Write a comment..."></textarea>
  <div class="od-comment-toolbar">
    <button class="btn btn--solid btn--sm">Post Comment</button>
  </div>
</div>

<!-- Comment item -->
<div class="od-comment">
  <div class="od-comment-avatar">JD</div>
  <div class="od-comment-body">
    <div class="od-comment-head">
      <span class="od-comment-name">John Doe</span>
      <span class="od-comment-time">2 hours ago</span>
    </div>
    <div class="od-comment-text">Customer requested expedited shipping for this order.</div>
  </div>
</div>
```

---

## CSS Classes — Attachments Tab

```css
.od-attachment          { display: flex; align-items: center; gap: var(--space-lg); padding: var(--space-lg) 0; border-top: 1px solid var(--border-separator); }
.od-attachment:first-child { border-top: none; }
.od-att-icon            { width: 42px; height: 42px; border-radius: var(--radius-sm); background: var(--muted); display: flex; align-items: center; justify-content: center; color: var(--fg-tertiary); flex-shrink: 0; }
.od-att-info            { flex: 1; min-width: 0; }
.od-att-name            { font-size: var(--text-sm); font-weight: 500; }
.od-att-meta            { font-size: var(--text-xs); color: var(--fg-muted); margin-top: 2px; }
.od-att-action          { font-size: var(--text-xs); color: var(--fg-muted); font-weight: 500; cursor: pointer; padding: 6px 12px; border-radius: var(--radius-sm); transition: all .15s var(--ease-out); }
.od-att-action:hover    { color: var(--primary); background: var(--primary-8); }
```

```html
<div class="od-attachment">
  <div class="od-att-icon">
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z"/>
      <polyline points="14 2 14 8 20 8"/>
    </svg>
  </div>
  <div class="od-att-info">
    <div class="od-att-name">invoice-95954.pdf</div>
    <div class="od-att-meta">PDF • 245 KB</div>
  </div>
  <span class="od-att-action">Download</span>
</div>
```

---

## Full HTML Template — Detail Page

> Template copiável com todas as 5 abas. Substitua conteúdo conforme necessário.

```html
<!-- ═══ Header ═══ -->
<div class="od-header">
  <div style="display:flex;align-items:center;gap:var(--space-lg)">
    <h1 class="od-title">Order: <span>#95954</span></h1>
    <span class="od-status paid">Paid</span>
    <span class="od-status fulfilled">Fulfilled</span>
  </div>
  <div class="od-actions">
    <button class="btn btn--outline btn--sm">Restock</button>
    <button class="btn btn--outline btn--sm">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/></svg>
      Edit
    </button>
  </div>
</div>
<div class="od-meta" style="font-size:var(--text-xs);color:var(--fg-muted);margin-bottom:var(--space-xl)">March 15, 2025 at 2:34 PM</div>

<!-- ═══ Tabs ═══ -->
<div class="od-tabs">
  <div class="od-tab active" data-tab="overview">Overview</div>
  <div class="od-tab" data-tab="details">Details</div>
  <div class="od-tab" data-tab="activity">Activity</div>
  <div class="od-tab" data-tab="comments">Comments <span class="od-tab-badge">3</span></div>
  <div class="od-tab" data-tab="attachments">Attachments</div>
</div>

<!-- ═══ Overview Panel ═══ -->
<div class="od-panel active" data-panel="overview">
  <div class="od-grid">
    <div class="od-main">
      <!-- Products Card -->
      <div class="od-card">
        <div class="od-card-head"><h3 class="od-card-title">Products ordered</h3></div>
        <div class="od-product">
          <div class="od-product-img"></div>
          <div class="od-product-info">
            <div class="od-product-name">Product Name</div>
            <div class="od-product-id">SKU-12345</div>
          </div>
          <div class="od-product-right">
            <div class="od-product-price">$120.00</div>
            <div class="od-product-qty">Qty: 2</div>
          </div>
        </div>
        <!-- more .od-product items -->
      </div>

      <!-- Payment Card -->
      <div class="od-card">
        <div class="od-card-head">
          <h3 class="od-card-title">Payment</h3>
          <span class="od-status paid">Paid</span>
        </div>
        <div class="od-summary-row"><span>Subtotal</span><span>$356.00</span></div>
        <div class="od-summary-row"><span>Shipping</span><span>$15.00</span></div>
        <div class="od-summary-row"><span>Tax</span><span>$28.00</span></div>
        <div class="od-summary-row total"><span>Total</span><span>$399.00</span></div>
        <div class="od-payment-final"><span>Amount paid</span><span>$399.00</span></div>
      </div>
    </div>

    <div class="od-side">
      <!-- Customer Card -->
      <div class="od-card">
        <div class="od-card-head"><h3 class="od-card-title">Customer</h3></div>
        <div class="od-customer">
          <div class="od-customer-avatar">JD</div>
          <div>
            <div class="od-customer-name">John Doe</div>
            <div class="od-customer-sub">Premium Customer</div>
          </div>
        </div>
        <div class="od-info-row">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
          <span class="od-info-text">john@example.com</span>
        </div>
        <div class="od-info-row">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92Z"/></svg>
          <span class="od-info-text">+1 (555) 123-4567</span>
        </div>
        <div class="od-address-title">Shipping Address</div>
        <div class="od-address-line">123 Main Street</div>
        <div class="od-address-line">Apt 4B</div>
        <div class="od-address-line">New York, NY 10001</div>
        <div class="od-address-line">United States</div>
      </div>

      <!-- Note Card -->
      <div class="od-card">
        <div class="od-card-head"><h3 class="od-card-title">Note</h3></div>
        <div class="od-note">Customer requested gift wrapping for all items.</div>
      </div>
    </div>
  </div>
</div>

<!-- ═══ Details Panel ═══ -->
<div class="od-panel" data-panel="details">
  <div class="od-detail-tags">
    <span class="od-detail-tag green">Verified</span>
    <span class="od-detail-tag blue">Premium</span>
    <span class="od-detail-tag orange">Priority</span>
  </div>
  <div class="od-grid">
    <div class="od-main">
      <div class="od-card">
        <div class="od-detail-section">
          <div class="od-detail-header">
            <div class="od-detail-icon"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg></div>
            <h3 class="od-detail-section-title">Customer Information</h3>
            <span class="od-detail-action">Edit Details</span>
          </div>
          <div class="od-detail-profile">
            <div class="od-detail-photo">JD</div>
            <div class="od-fields">
              <div><div class="od-field-label">Full Name</div><div class="od-field-value">John Doe</div></div>
              <div><div class="od-field-label">Email</div><div class="od-field-value">john@example.com</div></div>
              <div><div class="od-field-label">Phone</div><div class="od-field-value">+1 (555) 123-4567</div></div>
              <div><div class="od-field-label">Company</div><div class="od-field-value">Acme Corp</div></div>
              <div><div class="od-field-label">Role</div><div class="od-field-value">Manager</div></div>
              <div><div class="od-field-label">Member Since</div><div class="od-field-value">Jan 2023</div></div>
            </div>
          </div>
        </div>
      </div>

      <div class="od-card">
        <div class="od-detail-section">
          <div class="od-detail-header">
            <div class="od-detail-icon"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0Z"/><circle cx="12" cy="10" r="3"/></svg></div>
            <h3 class="od-detail-section-title">Shipping Information</h3>
            <span class="od-detail-action">Edit Details</span>
          </div>
          <div class="od-fields-2">
            <div><div class="od-field-label">Address</div><div class="od-field-value">123 Main Street, Apt 4B</div></div>
            <div><div class="od-field-label">City</div><div class="od-field-value">New York</div></div>
            <div><div class="od-field-label">State</div><div class="od-field-value">NY</div></div>
            <div><div class="od-field-label">Zip Code</div><div class="od-field-value">10001</div></div>
          </div>
        </div>
      </div>
    </div>

    <div class="od-side">
      <div class="od-card">
        <div class="od-card-head"><h3 class="od-card-title">Order Summary</h3></div>
        <div class="od-fields-2">
          <div><div class="od-field-label">Order ID</div><div class="od-field-value">#95954</div></div>
          <div><div class="od-field-label">Date</div><div class="od-field-value">Mar 15, 2025</div></div>
          <div><div class="od-field-label">Status</div><div class="od-field-value">Completed</div></div>
          <div><div class="od-field-label">Total</div><div class="od-field-value">$399.00</div></div>
        </div>
      </div>
      <div class="od-card">
        <div class="od-card-head"><h3 class="od-card-title">Tags & Labels</h3></div>
        <div class="od-detail-tags">
          <span class="od-detail-tag green sm">Verified</span>
          <span class="od-detail-tag blue sm">Premium</span>
          <span class="od-detail-tag gray sm">Domestic</span>
        </div>
      </div>
    </div>
  </div>
</div>

<!-- ═══ Activity Panel ═══ -->
<div class="od-panel" data-panel="activity">
  <div class="od-card">
    <div class="od-card-head"><h3 class="od-card-title">Order Activity</h3></div>
    <div class="od-timeline">
      <div class="od-tl-item">
        <div class="od-tl-dot completed"></div>
        <div class="od-tl-title">Order delivered</div>
        <div class="od-tl-desc">Package delivered to customer</div>
        <div class="od-tl-time">Mar 18, 2025 • 2:15 PM</div>
      </div>
      <div class="od-tl-item">
        <div class="od-tl-dot completed"></div>
        <div class="od-tl-title">Shipped</div>
        <div class="od-tl-desc">Tracking: 1Z999AA10123456784</div>
        <div class="od-tl-time">Mar 16, 2025 • 9:00 AM</div>
      </div>
      <div class="od-tl-item">
        <div class="od-tl-dot completed"></div>
        <div class="od-tl-title">Payment confirmed</div>
        <div class="od-tl-desc">$399.00 charged via Visa ending 4242</div>
        <div class="od-tl-time">Mar 15, 2025 • 2:34 PM</div>
      </div>
      <div class="od-tl-item">
        <div class="od-tl-dot completed"></div>
        <div class="od-tl-title">Order placed</div>
        <div class="od-tl-desc">Order #95954 created by customer</div>
        <div class="od-tl-time">Mar 15, 2025 • 2:30 PM</div>
      </div>
    </div>
  </div>
</div>

<!-- ═══ Comments Panel ═══ -->
<div class="od-panel" data-panel="comments">
  <div class="od-card">
    <div class="od-card-head">
      <h3 class="od-card-title">Comments</h3>
      <span class="od-tab-badge">3</span>
    </div>
    <div class="od-comment-box">
      <textarea placeholder="Write a comment..."></textarea>
      <div class="od-comment-toolbar">
        <button class="btn btn--solid btn--sm">Post Comment</button>
      </div>
    </div>
    <div class="od-comment">
      <div class="od-comment-avatar">JD</div>
      <div class="od-comment-body">
        <div class="od-comment-head">
          <span class="od-comment-name">John Doe</span>
          <span class="od-comment-time">2 hours ago</span>
        </div>
        <div class="od-comment-text">Customer requested expedited shipping for this order.</div>
      </div>
    </div>
    <div class="od-comment">
      <div class="od-comment-avatar">SM</div>
      <div class="od-comment-body">
        <div class="od-comment-head">
          <span class="od-comment-name">Sarah Miller</span>
          <span class="od-comment-time">5 hours ago</span>
        </div>
        <div class="od-comment-text">Shipping label created and sent to warehouse.</div>
      </div>
    </div>
  </div>
</div>

<!-- ═══ Attachments Panel ═══ -->
<div class="od-panel" data-panel="attachments">
  <div class="od-card">
    <div class="od-card-head"><h3 class="od-card-title">Attachments</h3></div>
    <div class="od-attachment">
      <div class="od-att-icon">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z"/><polyline points="14 2 14 8 20 8"/></svg>
      </div>
      <div class="od-att-info">
        <div class="od-att-name">invoice-95954.pdf</div>
        <div class="od-att-meta">PDF • 245 KB</div>
      </div>
      <span class="od-att-action">Download</span>
    </div>
    <div class="od-attachment">
      <div class="od-att-icon">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></svg>
      </div>
      <div class="od-att-info">
        <div class="od-att-name">product-photo.jpg</div>
        <div class="od-att-meta">Image • 1.2 MB</div>
      </div>
      <span class="od-att-action">Download</span>
    </div>
  </div>
</div>
```

---

## Tokens de Design

Use estes tokens independente da tecnologia (HTML, React, Vue, etc):

| Propriedade | Token | Uso |
|-------------|-------|-----|
| Fundo do card | `--card` | Background dos cards de seção |
| Divisores | `--border-separator` | Bordas entre rows, seções e tabs |
| Títulos | `--foreground` | Cor de títulos e valores principais |
| Labels | `--fg-muted` | Cor de labels, subtítulos, datas |
| Fundo de campos | `--muted` | Background de product rows e field grids |
| Título de seção | `--text-subheading` | Font size de títulos de card (15px) |
| Labels de campo | `--text-sm` | Font size de labels e valores (13px) |
| Valores de campo | `--text-body` | Font size de textos principais (14px) |
| Título da página | `--text-title` | Font size do header (20px) |
| Gap do grid | `--space-xl` | Espaçamento entre cards e colunas (20px) |
| Raio de borda | `--radius-md` | Border radius dos cards (12px) |
| Sombra | `--shadow-card` | Sombra dos cards de seção |
| Tab ativa | `--foreground` | Cor e border-bottom da tab ativa |
| Tab inativa | `--fg-muted` | Cor do texto das tabs inativas |

### Como usar por tecnologia

**HTML (classes do design system):**
```html
<div class="od-grid">
  <div class="od-main">
    <div class="od-card">
      <div class="od-card-head"><h3 class="od-card-title">Seção</h3></div>
      <div class="od-fields">
        <div>
          <div class="od-field-label">Label</div>
          <div class="od-field-value">Valor</div>
        </div>
      </div>
    </div>
  </div>
</div>
```

**React + Tailwind (classes arbitrarias):**
```jsx
<div className="bg-[var(--card)] rounded-[var(--radius-md)] p-[var(--space-xl)] shadow-[var(--shadow-card)]">
  <h3 className="text-[var(--text-subheading)] text-[var(--foreground)] font-semibold">Seção</h3>
  <div className="text-[var(--text-sm)] text-[var(--fg-muted)]">LABEL</div>
  <div className="text-[var(--text-body)] text-[var(--foreground)]">Valor</div>
</div>
```

**Vue / CSS puro (custom properties):**
```css
.meu-detail-card {
  background: var(--card);
  border-radius: var(--radius-md);
  padding: var(--space-xl);
  box-shadow: var(--shadow-card);
}
.meu-detail-title {
  font-size: var(--text-subheading);
  color: var(--foreground);
  font-weight: 600;
}
.meu-field-label {
  font-size: var(--text-sm);
  color: var(--fg-muted);
  text-transform: uppercase;
}
.meu-field-value {
  font-size: var(--text-body);
  color: var(--foreground);
}
```

---

## JavaScript — Tab switching

```javascript
document.querySelectorAll('.od-tab').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.od-tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.od-panel').forEach(p => p.classList.remove('active'));
    tab.classList.add('active');
    document.querySelector(`[data-panel="${tab.dataset.tab}"]`).classList.add('active');
  });
});
```

---

## Responsive (Mobile)

No mobile (≤ 767px), o layout de 2 colunas colapsa para 1 coluna. As regras já estão no CSS global (`components.css`):

- `.od-grid` → `grid-template-columns: 1fr` (main e side empilham)
- `.od-fields` → `1fr 1fr` (no mobile), `1fr` (≤ 479px)
- `.od-fields-2` → `1fr`
- `.od-tabs` → scroll horizontal se necessário
- `.od-header` → `flex-direction: column`

Não é necessário adicionar CSS inline. Basta usar as classes padrão.
