# Responsive System

> Breakpoints e media queries para o iGreenMCP Design System.
> Abordagem: desktop-first com `max-width` breakpoints.

## Breakpoints

| Breakpoint | Media Query | Mudanças Principais |
|------------|-------------|---------------------|
| Desktop | > 1280px | Layout completo: sidebar 248px, grids nativos |
| Large tablet | ≤ 1279px | Sidebar auto-colapsa para 68px icon-only |
| Tablet | ≤ 1023px | 4-col → 2-col, 3-col → 2-col, heights auto |
| Mobile | ≤ 767px | Tudo → 1-col, sidebar offscreen com overlay |
| Small mobile | ≤ 479px | Padding reduzido, KPI → 1-col, topbar compacto |

---

## < 1280px: Sidebar Auto-Collapse

A sidebar colapsa automaticamente para 68px (icon-only). Labels, brand text e upgrade card são escondidos.

```css
@media (max-width: 1279px) {
  .sidebar { width: 68px; }
  .sidebar .brand-text,
  .sidebar .sec-label,
  .sidebar .nav-label,
  .sidebar .upgrade-card { display: none; }
  .sidebar .sidebar-brand { justify-content: center; padding: 20px 0 22px; }
  .sidebar .sidebar-section { padding: 10px 0; position: relative; }
  .sidebar .sidebar-section::after {
    content: ''; position: absolute; bottom: 0; left: 18px; right: 18px;
    height: 1px; background: var(--sidebar-border);
  }
  .sidebar .sidebar-section:last-of-type::after { display: none; }
  .sidebar .nav-item {
    justify-content: center; padding: 0;
    width: 44px; height: 44px; margin: 2px auto;
  }
  .sidebar .nav-item.active { border-radius: var(--radius-md); }
  .sidebar .nav-item.active::before { display: none; }
  .sidebar .ni-icon { width: 30px; height: 30px; }
}
```

---

## < 1024px: Grid Reflow

Grids multi-coluna colapsam para 2 colunas. Heights fixos são removidos.

```css
@media (max-width: 1023px) {
  .kpi-grid { grid-template-columns: repeat(2, 1fr); }
  .insights-row {
    grid-template-columns: 1fr 1fr;
    min-height: auto;
  }
  .insights-row > .card:last-child { grid-column: 1 / -1; }
  .geo-row { grid-template-columns: 1fr 1fr; }
  .ao-row  { grid-template-columns: 1fr 1fr; }
  .mid-row { height: auto; min-height: 320px; }

  /* Top Countries: stack map/list */
  .tc-body { flex-direction: column; }
  .tc-list { width: 100%; }
  .tc-map  { min-height: 200px; }
}
```

### O que muda em cada grid:

| Grid | Desktop | ≤ 1023px |
|------|---------|----------|
| `.kpi-grid` | `repeat(4, 1fr)` | `repeat(2, 1fr)` |
| `.mid-row` | `3fr 2fr`, height 380px | `3fr 2fr`, height auto |
| `.insights-row` | `1fr 2fr 1fr` | `1fr 1fr` (3rd card full-width) |
| `.geo-row` | `2fr 1fr` | `1fr 1fr` |
| `.ao-row` | `2fr 3fr` | `1fr 1fr` |

---

## < 768px: Mobile Layout

Todos os grids colapsam para 1 coluna. A sidebar sai da tela com overlay.

```css
@media (max-width: 767px) {
  /* Sidebar offscreen */
  .sidebar {
    position: fixed; left: 0; top: 0; bottom: 0;
    width: 248px; z-index: 1000;
    transform: translateX(-100%);
    transition: transform .3s var(--ease-out);
  }
  .sidebar.open { transform: translateX(0); }

  /* Overlay backdrop */
  .sidebar-overlay {
    display: none; position: fixed; inset: 0; z-index: 999;
    background: rgba(0,0,0,0.5); backdrop-filter: blur(4px);
  }
  .sidebar-overlay.active { display: block; }

  /* Main ocupa tela toda */
  .main { margin-left: 0; }

  /* Todas as grids → 1 coluna */
  .kpi-grid      { grid-template-columns: 1fr 1fr; }
  .mid-row       { grid-template-columns: 1fr; height: auto; }
  .insights-row  { grid-template-columns: 1fr; min-height: auto; }
  .insights-row > .card:last-child { grid-column: auto; }
  .geo-row       { grid-template-columns: 1fr; }
  .ao-row        { grid-template-columns: 1fr; }

  /* Filter bar wrap */
  .filter-bar { flex-wrap: wrap; gap: var(--space-sm); }
  .filter-spacer { display: none; }

  /* Table horizontal scroll */
  .table-section { overflow-x: auto; }
  table { min-width: 700px; }

  /* Channel revenue stack */
  .cr-channels { flex-direction: column; gap: var(--space-md); }
  .cr-channel  { flex-direction: row; justify-content: flex-start; }

  /* Mobile topbar: show only menu + title + icons */
  .topbar-center  { display: none; }
  .breadcrumb     { display: none; }
  .user-chip      { display: none; }
  .topbar-divider { display: none; }
  .topbar .mobile-title { display: block; flex: 1; }
}
```

### HTML necessário para mobile

Adicionar `<div class="sidebar-overlay" id="sidebarOverlay"></div>` **logo após** `</aside>`, antes de `<div class="main">`.

Adicionar `<span class="mobile-title">PAGE_NAME</span>` no topbar, depois do `.topbar-divider`, antes do `.breadcrumb`.

O CSS base do `.mobile-title` (fora do media query):
```css
.topbar .mobile-title {
  display: none;
  font-size: var(--text-subheading);
  font-weight: 600;
  color: var(--foreground);
}
```

No mobile, o topbar mostra apenas: botão menu, título da página (`.mobile-title`), ícone de notificações, toggle de tema.

Adicionar botão hamburger no topbar (já existe em desktop como `.sidebar-toggle-btn`). No mobile, o script muda o comportamento:

### JavaScript para toggle mobile

```javascript
(function(){
  const sb = document.querySelector('.sidebar');
  const btn = document.getElementById('sidebarToggle');
  const overlay = document.getElementById('sidebarOverlay');
  const isMobile = () => window.innerWidth <= 767;

  // Restore collapsed state (desktop only)
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

  // Fechar sidebar ao clicar no overlay
  if (overlay) {
    overlay.addEventListener('click', () => {
      sb.classList.remove('open');
      overlay.classList.remove('active');
    });
  }

  // Fechar sidebar ao redimensionar para desktop
  window.addEventListener('resize', () => {
    if (!isMobile()) {
      sb.classList.remove('open');
      if (overlay) overlay.classList.remove('active');
    }
  });
})();
```

---

## < 480px: Compact Mode

Padding reduzido e layout ultra-compacto para smartphones pequenos.

```css
@media (max-width: 479px) {
  .body { padding: var(--space-lg); }
  .kpi-grid { grid-template-columns: 1fr; }
  .card { padding: var(--space-lg); }
  .table-section { padding: var(--space-lg); }
  .filter-bar { padding: var(--space-sm) var(--space-lg); }
  .topbar { height: 48px; }
  .tbl-toolbar-row { flex-wrap: wrap; gap: var(--space-sm); }

  /* Drawer full-width */
  .drawer { width: 100%; }
}
```

---

## Checklist

- [ ] Grids colapsam corretamente em cada breakpoint
- [ ] Sidebar é offscreen no mobile com overlay
- [ ] `.sidebar-overlay` div existe no HTML (após `</aside>`, antes de `.main`)
- [ ] Toggle funciona em desktop (collapse) e mobile (offscreen)
- [ ] Mobile topbar esconde wallet-tags, breadcrumb, user-chip, topbar-divider
- [ ] `.mobile-title` mostra nome da página no mobile
- [ ] Filter bar faz wrap em telas estreitas
- [ ] Tabela tem scroll horizontal no mobile
- [ ] Channel revenue empilha verticalmente no mobile
- [ ] Drawer ocupa 100% no mobile (< 480px)
- [ ] Layout desktop (> 1280px) inalterado
- [ ] Funciona em dark e light theme em todos os breakpoints
