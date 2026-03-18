# States & Interactions

> Sistema completo de estados visuais e interações do Design System.

## Hover States

### Regra geral: Hover via overlays
Superfícies (cards, rows, items) usam overlays para hover. **Nunca** mude `background-color` diretamente.

| Overlay Token | Uso |
|---------------|-----|
| `var(--overlay-3)` | Table rows (`tbody tr:hover`) |
| `var(--overlay-5)` | Export buttons, subtle hover |
| `var(--overlay-6)` | List items (`.tc-item:hover`, `.fc-opt:hover`) |
| `var(--overlay-8)` | Icon buttons (`.icon-btn:hover`) |
| `var(--overlay-10)` | Action buttons (`.ca-btn:hover`, `.tbl-filter-btn:hover`, `.pb:hover`) |
| `var(--overlay-12)` | Tags, chips (`.ftag:hover`), scrollbar thumb hover |
| `var(--overlay-22)` | Clear/close buttons (`.fc-clear:hover`) |

### Hover via `background: var(--accent)`
Usado quando o elemento precisa de destaque mais forte:
```css
.sidebar .nav-item:hover:not(.active) { background: var(--sidebar-accent); }
.date-range-btn:hover { background: var(--accent); border-color: var(--ring); }
.dw-close:hover { background: var(--accent); color: var(--foreground); }
.dw-comment-tool:hover { background: var(--accent); }
.dw-reaction:hover { background: var(--accent); }
.dw-attachment:hover { background: var(--accent); }
.pstat-card:hover { background: var(--accent); }
```

### Hover com opacity
Para botões sólidos com cor de fundo definida:
```css
.btn--solid:hover { opacity: 0.88; }
.uc-btn:hover { opacity: 0.88; }
.dw-submit-btn:hover { opacity: 0.85; }
```

### Hover com elevação (cards)
Cards e KPI cards ganham sombra e translação no hover:
```css
.kpi-card:hover {
  box-shadow: var(--shadow-card-hover);
  transform: translateY(-1px);
}
.card:hover {
  box-shadow: var(--shadow-card-hover);
}
```

### Hover com mudança de cor de texto
Elementos que só mudam a cor do texto:
```css
.bc-parent:hover { color: var(--foreground); }
.pl-item:hover { color: var(--fg-secondary); }
.sidebar-toggle-btn:hover { color: var(--fg-secondary); }
.t-icon-btn:hover { color: var(--foreground); background: var(--accent); }
thead th:hover { color: var(--fg-secondary); }
```

---

## Active States

### Navigation active (permanent)
Itens de navegação que ficam ativos enquanto selecionados:

```css
/* Sidebar nav item */
.nav-item.active {
  background: var(--sidebar-accent);
  color: var(--accent-foreground);
  font-weight: 500;
  position: relative;
}
.nav-item.active::before {
  content: '';
  position: absolute;
  left: 0; top: 50%;
  transform: translateY(-50%);
  width: 3px; height: 24px;
  background: var(--primary);
  border-radius: 0 4px 4px 0;
}
.nav-item.active .ni-icon {
  background: var(--primary-12);
}
```

### Tab active (permanent)
```css
/* Preset/tab pills */
.preset.active {
  background: var(--surface-raised);
  color: var(--foreground);
  font-weight: 600;
  box-shadow: 0 1px 3px rgba(0,0,0,0.06);
}

/* Table tabs (same pattern) */
.tbl-tab.active {
  background: var(--surface-raised);
  color: var(--foreground);
  font-weight: 600;
  box-shadow: 0 1px 3px rgba(0,0,0,0.06);
}

/* Drawer tabs (underline) */
.dw-tab.active {
  color: var(--foreground);
  border-bottom-color: var(--foreground);
  font-weight: 600;
}
.dw-tab.active .dw-tab-badge {
  background: var(--foreground);
  color: var(--background);
}

/* Pagination active */
.pb.active {
  background: var(--primary);
  color: var(--primary-fg);
  font-weight: 700;
  border-color: var(--primary);
}
```

### Filter active
```css
.filter-chip.active {
  background: var(--primary-8);
  border-color: var(--primary-20);
  color: var(--primary);
}
.filter-chip.active .fc-label { color: var(--primary-70); }
.filter-chip.active .fc-clear { display: inline-flex; }

.tbl-filter-btn.active {
  color: var(--primary);
  background: var(--primary-8);
  border-color: var(--primary-20);
}
```

### Button active (momentary)
```css
.btn:active { transform: scale(0.97); }
```

---

## Focus States

### Regra obrigatória: `:focus-visible`
Todo elemento interativo DEVE ter indicador de foco visível.

```css
/* Padrão universal — aplicar a todo elemento interativo */
.element:focus-visible {
  outline: 2px solid var(--ring);
  outline-offset: 2px;
}
```

**Valores do token `--ring`:**
- Dark: `rgba(46, 204, 113, 0.45)` (verde com 45% opacity)
- Light: `rgba(39, 174, 96, 0.45)` (verde com 45% opacity)

### Focus-within (containers de input)
Para containers que envolvem inputs, use `:focus-within`:
```css
.tbl-search:focus-within { border-color: var(--ring); }
.dw-comment-box:focus-within { border-color: var(--ring); }
```

### Anti-patterns
- ❌ Nunca `outline: none` sem substituto visual
- ❌ Nunca usar apenas `:focus` (não filtra clicks de mouse)
- ❌ Nunca usar `box-shadow` como substituto (não respeita high contrast mode)

---

## Disabled State

### Regra universal
Todo elemento interativo desabilitado segue o mesmo padrão:

```css
.element[disabled],
.element--disabled {
  opacity: 0.5;
  pointer-events: none;
  cursor: default;
}
```

**Aplica-se a:** botões, inputs, chips, tabs, links, selects, checkboxes, toggles, pagination buttons.

### Implementação no button
```css
.btn[disabled],
.btn--loading {
  opacity: 0.5;
  pointer-events: none;
  cursor: default;
}
```

### Anti-patterns
- ❌ Nunca use `color: gray` para indicar disabled — use opacity
- ❌ Nunca esconda elementos disabled — mostre com opacity reduzida
- ❌ Nunca use `cursor: not-allowed` (preferimos `default` pois `pointer-events: none` já bloqueia)

---

## Loading State

### Button loading (spinner)
O botão mantém dimensões mas esconde o texto e mostra um spinner:

```css
.btn--loading {
  position: relative;
  color: transparent !important;
}
.btn--loading::after {
  content: '';
  position: absolute;
  width: 16px;
  height: 16px;
  border: 2px solid currentColor;
  border-right-color: transparent;
  border-radius: 50%;
  animation: btn-spin 0.6s linear infinite;
}

@keyframes btn-spin {
  to { transform: rotate(360deg); }
}
```

**Cores do spinner por variante:**
| Variante | Cor do spinner |
|----------|---------------|
| Default | `var(--secondary-foreground)` |
| Solid | `var(--primary-fg)` |
| Destructive / Info | `#fff` |
| Warning | `#000` |
| Ghost | `var(--muted-foreground)` |
| Outline | `var(--foreground)` |

**Tamanhos do spinner:**
| Tamanho | Dimensão | Border |
|---------|----------|--------|
| xs | 12×12px | 1.5px |
| sm | 14×14px | 1.5px |
| md (default) | 16×16px | 2px |
| lg | 18×18px | 2.5px |

### Skeleton loading pattern (recomendação para novos componentes)
Para componentes que carregam dados, use skeleton:

```css
.skeleton {
  background: linear-gradient(
    90deg,
    var(--overlay-6) 25%,
    var(--overlay-10) 50%,
    var(--overlay-6) 75%
  );
  background-size: 200% 100%;
  animation: skeleton-pulse 1.5s var(--ease-out) infinite;
  border-radius: var(--radius-xs);
}

@keyframes skeleton-pulse {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}
```

---

## Open / Closed States

### Drawer (slide-in modal)
```css
/* Overlay — hidden by default */
.drawer-overlay { opacity: 0; visibility: hidden; transition: opacity 300ms var(--ease-out), visibility 300ms; }
.drawer-overlay.open { opacity: 1; visibility: visible; }

/* Drawer panel — off-screen right */
.drawer { transform: translateX(100%); transition: transform 350ms var(--ease-out); }
.drawer.open { transform: translateX(0); }
```

### Filter dropdown
```css
.tbl-filters { display: none; }
.tbl-filters.open { display: flex; }

.fc-dropdown { display: none; }
.fc-dropdown.open { display: block; }
```

### Drawer tab panels
```css
.dw-panel { display: none; }
.dw-panel.active { display: block; }
```

---

## Collapsed State

### Sidebar collapsed
A sidebar colapsa de 248px para 68px com transição:

```css
.sidebar.collapsed { width: 68px; }

/* Elementos escondidos no collapsed */
.sidebar.collapsed .brand-text,
.sidebar.collapsed .sec-label,
.sidebar.collapsed .nav-label,
.sidebar.collapsed .upgrade-card { display: none; }

/* Brand centralizado */
.sidebar.collapsed .sidebar-brand { justify-content: center; padding: 20px 0 22px; }

/* Seções com separador */
.sidebar.collapsed .sidebar-section { padding: 10px 0; position: relative; }
.sidebar.collapsed .sidebar-section::after {
  /* separator line across section */
}
.sidebar.collapsed .sidebar-section:last-of-type::after { display: none; }

/* Nav items viram quadrados centralizados */
.sidebar.collapsed .nav-item {
  justify-content: center;
  padding: 0;
  width: 44px;
  height: 44px;
  margin: 2px auto;
}
.sidebar.collapsed .nav-item.active { border-radius: var(--radius-md); }
.sidebar.collapsed .nav-item.active::before { display: none; }
.sidebar.collapsed .ni-icon { width: 30px; height: 30px; }
```

---

## Empty / Error States

### Empty state (genérico)
```html
<div class="empty-state">
  <svg class="empty-icon" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/>
  </svg>
  <p class="empty-title">No items found</p>
  <p class="empty-desc">Try adjusting your filters or date range.</p>
  <button class="btn btn--outline btn--sm">Clear filters</button>
</div>
```

```css
.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: var(--space-3xl) var(--space-xl);
  text-align: center;
  gap: var(--space-sm);
}
.empty-icon { color: var(--fg-ghost); width: 48px; height: 48px; }
.empty-title { color: var(--fg-muted); font-size: var(--text-body); font-weight: 500; margin: 0; }
.empty-desc { color: var(--fg-dim); font-size: var(--text-sm); max-width: 320px; margin: 0; }
```

### Table empty (dentro de `<tbody>`)
Quando a tabela não tem dados ou o filtro não retorna resultados:
```html
<tbody>
  <tr>
    <td colspan="6">
      <div class="empty-state">
        <svg class="empty-icon" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
          <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
        </svg>
        <p class="empty-title">No results found</p>
        <p class="empty-desc">No items match your current search or filters.</p>
        <button class="btn btn--outline btn--sm">Reset filters</button>
      </div>
    </td>
  </tr>
</tbody>
```

### Error state
```html
<div class="error-state">
  <svg class="error-icon" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
    <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
  </svg>
  <p class="error-title">Something went wrong</p>
  <p class="error-desc">We couldn't load the data. Please try again.</p>
  <button class="btn btn--outline btn--sm">Retry</button>
</div>
```

```css
.error-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: var(--space-3xl) var(--space-xl);
  text-align: center;
  gap: var(--space-sm);
}
.error-state .error-icon { color: var(--destructive); width: 48px; height: 48px; }
.error-state .error-title { color: var(--foreground); font-size: var(--text-body); font-weight: 500; margin: 0; }
.error-state .error-desc { color: var(--fg-dim); font-size: var(--text-sm); max-width: 360px; margin: 0; }
```

---

## Form Validation States

### Input error
```css
.form-input.error,
.form-select.error {
  border-color: var(--destructive);
}
.form-input.error:focus,
.form-select.error:focus {
  border-color: var(--destructive);
  outline: 2px solid rgba(231, 76, 60, 0.25);
  outline-offset: 0;
}
```

### Input success
```css
.form-input.success,
.form-select.success {
  border-color: var(--primary);
}
```

### Error message
```css
.form-error {
  color: var(--destructive);
  font-size: var(--text-xs);
  margin-top: var(--space-xs);
  display: flex;
  align-items: center;
  gap: var(--space-xs);
}
```

### Required indicator
```css
.form-label.required::after {
  content: ' *';
  color: var(--destructive);
}
```

### Complete form field with validation
```html
<div class="form-group">
  <label class="form-label required">Email</label>
  <input class="form-input error" type="email" value="invalid-email">
  <span class="form-error">
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
    </svg>
    Please enter a valid email address
  </span>
</div>

<!-- Success state -->
<div class="form-group">
  <label class="form-label">Username</label>
  <input class="form-input success" type="text" value="john_doe">
</div>
```

### Regras de validação
| Estado | Borda | Outline (focus) | Mensagem |
|--------|-------|-----------------|----------|
| Neutro | var(--border-subtle) | var(--ring) | — |
| Erro | var(--destructive) | rgba(231,76,60,0.25) | .form-error abaixo |
| Sucesso | var(--primary) | var(--ring) | — |
| Disabled | var(--border-subtle) | — | opacity 0.5 |

**Anti-patterns:**
- Nunca mostre erro antes do primeiro submit ou blur
- Nunca use apenas cor para indicar erro — combine borda + mensagem
- Nunca use placeholder como label (acessibilidade)

---

## Status Chip Auto Dot Colors

Status chips usam a classe `.s-dot` para o indicador circular. As cores são **automáticas via CSS** — nunca use inline `style="background:..."`.

```css
/* Auto-coloring — definido em components.css */
.status-chip.completed .s-dot { background: var(--fg-ghost); }
.status-chip.pending .s-dot   { background: var(--warning); }
.status-chip.failed .s-dot    { background: var(--destructive); }
```

| Status | Classe no `.status-chip` | Cor do `.s-dot` |
|--------|--------------------------|-----------------|
| Completed | `.completed` | `var(--fg-ghost)` |
| Pending | `.pending` | `var(--warning)` |
| Failed | `.failed` | `var(--destructive)` |

**Anti-pattern:**
```html
<!-- ❌ ERRADO — inline style no dot -->
<span class="s-dot" style="background:var(--fg-ghost)"></span>

<!-- ✅ CORRETO — CSS auto-color via parent class -->
<span class="status-chip completed"><span class="s-dot"></span>Completed</span>
```

---

## Transition Timing Reference

| Interação | Duração | Exemplo |
|-----------|---------|---------|
| Hover (cor, opacity, background) | 150ms | `.btn:hover`, `.nav-item:hover` |
| Expand/collapse | 200ms | Sidebar collapse, accordion, filter chip expand |
| Modal/drawer | 300–350ms | `.drawer.open`, `.drawer-overlay.open` |
| Micro-interaction | 100ms | `.btn:active` scale, tooltip appear |
| Spinner | 600ms | `@keyframes btn-spin` (linear — exceção permitida) |
| Skeleton pulse | 1500ms | `@keyframes skeleton-pulse` |

**Regra:** Sempre use `var(--ease-out)` como timing function.
Exceções permitidas: `linear` para animações contínuas (spinners, progress bars).
