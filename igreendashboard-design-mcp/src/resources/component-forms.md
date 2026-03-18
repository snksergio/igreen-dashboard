# Component: Forms & Inputs

> Inputs, search, textarea, selects, filter chips, comment box, form layout system, table form controls e toggle do Design System.

## Input Base

### Spec
```css
/* Todos os inputs seguem este padrão */
input, select, textarea {
  background: var(--input);
  border: 1px solid var(--input-border);
  border-radius: var(--radius-sm);      /* 8px */
  color: var(--foreground);
  font-family: 'Inter', sans-serif;
  font-size: var(--text-body);           /* 14px */
  transition: border-color .2s var(--ease-out);
}
input:focus, select:focus, textarea:focus {
  outline: none;
  border-color: var(--ring);
}
input::placeholder, textarea::placeholder {
  color: var(--fg-ghost);
}
```

### Input tokens
| Token | Dark | Light |
|-------|------|-------|
| `--input` | `rgba(255,255,255,0.04)` | `#ffffff` |
| `--input-border` | `rgba(255,255,255,0.10)` | `rgba(0,0,0,0.12)` |
| `--ring` | `rgba(46,204,113,0.45)` | `rgba(39,174,96,0.45)` |

---

## Search Input (.tbl-search)

Container de busca com ícone + input:

```css
.tbl-search {
  display: flex; align-items: center; gap: 8px;
  background: var(--input);
  border: 1px solid var(--input-border);
  border-radius: var(--radius-sm);
  min-height: 36px; height: 36px;
  padding: 0 var(--space-lg);             /* 0 16px */
  transition: border-color .2s var(--ease-out);
}
.tbl-search:focus-within { border-color: var(--ring); }
.tbl-search input {
  background: none; border: none; outline: none;
  color: var(--foreground); font-size: var(--text-body);
  width: 180px; font-family: inherit;
}
.tbl-search input::placeholder { color: var(--fg-ghost); }
.tbl-search svg { width: 14px; height: 14px; }  /* ícone controlado por CSS */
```

```html
<div class="tbl-search">
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
    <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
  </svg>
  <input type="text" placeholder="Search..." />
</div>
```

> **Nota:** O SVG não precisa de `width`/`height` — o CSS `.tbl-search svg` define 14px automaticamente.

---

## Textarea / Comment Box

```css
.dw-comment-box {
  border: 1px solid var(--input-border);
  border-radius: var(--radius-sm);
  background: var(--input);
  transition: border-color .2s var(--ease-out);
}
.dw-comment-box:focus-within { border-color: var(--ring); }
.dw-comment-box textarea {
  width: 100%; resize: none;
  border: none; background: transparent;
  padding: var(--space-md) var(--space-lg) var(--space-sm);
  font-size: var(--text-sm); color: var(--foreground);
  font-family: inherit; min-height: 56px;
}
.dw-comment-box textarea:focus { outline: none; }
```

### Comment toolbar pattern
```css
.dw-comment-toolbar {
  display: flex; align-items: center; justify-content: space-between;
  padding: var(--space-xs) var(--space-md) var(--space-sm);
}
.dw-comment-tools { display: flex; gap: var(--space-xs); }
.dw-comment-tool {
  width: 30px; height: 30px;
  border-radius: var(--radius-xs);
  background: none; border: none;
  color: var(--muted-foreground);
  cursor: pointer;
}
.dw-comment-tool:hover { background: var(--accent); color: var(--foreground); }

.dw-submit-btn {
  background: var(--primary); color: var(--primary-fg);
  border: none; border-radius: var(--radius-sm);
  padding: 6px 16px; font-size: var(--text-sm); font-weight: 600;
}
.dw-submit-btn:hover { opacity: 0.85; }
```

```html
<div class="dw-comment-box">
  <textarea placeholder="Add a comment..."></textarea>
  <div class="dw-comment-toolbar">
    <div class="dw-comment-tools">
      <button class="dw-comment-tool"><!-- bold icon --></button>
      <button class="dw-comment-tool"><!-- italic icon --></button>
      <button class="dw-comment-tool"><!-- attach icon --></button>
    </div>
    <button class="dw-submit-btn">Comment</button>
  </div>
</div>
```

---

## Select (.ov-year-select)

Custom select com seta SVG embutida:

```css
.ov-year-select {
  background: var(--secondary);
  border: 1px solid var(--border);
  border-radius: var(--radius-sm);
  color: var(--fg-secondary);
  font-size: var(--text-sm); font-weight: 500;
  padding: 6px 12px;
  font-family: inherit; cursor: pointer;
  appearance: none; -webkit-appearance: none;
  /* Custom chevron arrow via SVG data URI */
  background-image: url("data:image/svg+xml,...");
  background-repeat: no-repeat;
  background-position: right 10px center;
  padding-right: 28px;
}
```

```html
<select class="ov-year-select">
  <option>2024</option>
  <option>2023</option>
  <option>2022</option>
</select>
```

---

## Filter Chips

### Estrutura
```html
<div class="filter-chip-wrap">
  <button class="filter-chip">
    <span class="fc-label">Type:</span>
    <span class="fc-val">Buy</span>
    <span class="fc-chevron">▾</span>
  </button>
  <!-- Dropdown aparece abaixo quando aberto -->
  <div class="fc-dropdown">
    <div class="fc-opt">All</div>
    <div class="fc-opt selected">Buy</div>
    <div class="fc-opt">Sell</div>
  </div>
</div>
```

### Estados
| Estado | CSS |
|--------|-----|
| Default | `background: var(--secondary); border: 1px solid var(--border)` |
| Hover | `background: var(--accent); color: var(--accent-foreground)` |
| Active (com filtro) | `background: var(--primary-8); border-color: var(--primary-20); color: var(--primary)` |
| Active + clear visible | `.fc-clear { display: inline-flex; }` |

---

## Padrões Gerais de Input

### Height padrão: 36px
Todos os inputs, selects e buttons de toolbar usam `min-height: 36px; height: 36px;`.

### Padding padrão
- Horizontal: `var(--space-lg)` (16px) para inputs e botões
- Vertical: implícito via height fixa

### Focus ring
Todos os containers de input que usam `:focus-within`:
```css
.container:focus-within {
  border-color: var(--ring);
}
```

### Disabled
```css
input[disabled], select[disabled], textarea[disabled] {
  opacity: 0.5;
  pointer-events: none;
  cursor: default;
}
```

---

## Form Layout System (.form-*)

> Sistema completo de layout para páginas de formulário/edição. Usa grid 2 colunas com navegação lateral por steps.

### Anatomia

```
┌─────────────────────────────────────────────────────────────┐
│ .topbar (glass, sticky)                                      │
├─────────────────────────────────────────────────────────────┤
│ .body                                                        │
│  .form-page-title ─── "Add New Customer"                    │
│  .form-layout ─── grid: 320px + 1fr                         │
│  ┌─────────────┬───────────────────────────────────────┐    │
│  │ .form-nav   │ .form-content                          │    │
│  │ (sticky)    │ ┌─────────────────────────────────────┐│    │
│  │             │ │ .form-section                        ││    │
│  │ .form-nav   │ │ .form-section-title                  ││    │
│  │  -item      │ │ .form-row (2 cols)                   ││    │
│  │  .active    │ │  ├─ .form-group + .form-label        ││    │
│  │             │ │  │  └─ .form-input                   ││    │
│  │ .form-nav   │ │  └─ .form-group + .form-label        ││    │
│  │  -item      │ │     └─ .form-select                  ││    │
│  │             │ ├─────────────────────────────────────┤│    │
│  │ .form-nav   │ │ .form-section (next section)         ││    │
│  │  -item      │ │  .form-toggle-group                  ││    │
│  │             │ ├─────────────────────────────────────┤│    │
│  │             │ │ .form-actions (save / cancel)        ││    │
│  │             │ └─────────────────────────────────────┘│    │
│  └─────────────┴───────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────┘
```

### CSS Reference

| Class | Properties | Purpose |
|-------|-----------|---------|
| `.form-page-title` | `font-size: var(--text-title); font-weight: 700; letter-spacing: -0.3px` | Page heading |
| `.form-layout` | `display: grid; grid-template-columns: 320px 1fr; gap: var(--space-xl); align-items: start` | 2-column layout |
| `.form-nav` | `background: var(--card); border-radius: var(--radius-md); padding: var(--space-lg); box-shadow: var(--shadow-card); position: sticky` | Navigation sidebar card |
| `.form-nav-item` | `display: flex; align-items: flex-start; gap: var(--space-md); padding: var(--space-md) var(--space-lg); border-radius: var(--radius-sm); cursor: pointer` | Step item |
| `.form-nav-item.active` | `background: var(--primary-10)` | Active step |
| `.form-nav-icon` | `width: 36px; height: 36px; border-radius: var(--radius-sm); background: var(--muted); color: var(--fg-muted); display: flex; align-items: center; justify-content: center` | Step icon square |
| `.form-nav-item.active .form-nav-icon` | `background: var(--primary-10); color: var(--primary)` | Active icon |
| `.form-nav-text` | `flex: 1; min-width: 0` | Text wrapper |
| `.form-nav-title` | `font-size: var(--text-sm); font-weight: 600; color: var(--fg-secondary)` | Step title |
| `.form-nav-desc` | `font-size: var(--text-xs); color: var(--fg-muted); margin-top: 2px; line-height: 1.4` | Step description |
| `.form-content` | `display: flex; flex-direction: column; gap: var(--space-xl)` | Right column |
| `.form-section` | `background: var(--card); border-radius: var(--radius-md); padding: var(--space-2xl); box-shadow: var(--shadow-card)` | Section card |
| `.form-section-title` | `font-size: var(--text-subheading); font-weight: 600; letter-spacing: -0.1px; margin-bottom: var(--space-xl)` | Section heading |
| `.form-row` | `display: grid; grid-template-columns: 1fr 1fr; gap: var(--space-lg)` | 2-column field row |
| `.form-group` | `display: flex; flex-direction: column; gap: var(--space-sm); margin-bottom: var(--space-lg)` | Field group (label + input) |
| `.form-label` | `font-size: var(--text-sm); font-weight: 500; color: var(--fg-secondary)` | Field label |
| `.form-input` | `height: 40px; padding: 0 var(--space-lg); background: var(--input); border: 1px solid var(--input-border); border-radius: var(--radius-sm); color: var(--foreground); font-size: var(--text-body)` | Text input (40px) |
| `.form-input:focus` | `border-color: var(--ring)` | Focus state |
| `.form-select` | `height: 40px; padding: 0 var(--space-lg); padding-right: 36px; appearance: none; background: var(--input); border: 1px solid var(--input-border); border-radius: var(--radius-sm)` | Select dropdown (40px, custom SVG chevron) |
| `.form-phone-row` | `display: grid; grid-template-columns: 120px 1fr; gap: var(--space-sm)` | Country code + phone |
| `.form-actions` | `display: flex; align-items: center; justify-content: flex-end; gap: var(--space-md); padding-top: var(--space-sm)` | Save/cancel footer |

### HTML Template (Form Layout)

```html
<h1 class="form-page-title">Add New Customer</h1>

<div class="form-layout">
  <!-- Step Navigation -->
  <div class="form-nav">
    <div class="form-nav-item active">
      <div class="form-nav-icon">
        <svg width="18" height="18"><!-- user icon --></svg>
      </div>
      <div class="form-nav-text">
        <div class="form-nav-title">Personal Info</div>
        <div class="form-nav-desc">Name, email and contact</div>
      </div>
    </div>
    <div class="form-nav-item">
      <div class="form-nav-icon">
        <svg width="18" height="18"><!-- address icon --></svg>
      </div>
      <div class="form-nav-text">
        <div class="form-nav-title">Address</div>
        <div class="form-nav-desc">Shipping and billing</div>
      </div>
    </div>
    <div class="form-nav-item">
      <div class="form-nav-icon">
        <svg width="18" height="18"><!-- settings icon --></svg>
      </div>
      <div class="form-nav-text">
        <div class="form-nav-title">Preferences</div>
        <div class="form-nav-desc">Notifications and privacy</div>
      </div>
    </div>
  </div>

  <!-- Form Content -->
  <div class="form-content">
    <div class="form-section">
      <h2 class="form-section-title">Personal Information</h2>

      <div class="form-row">
        <div class="form-group">
          <label class="form-label">First Name</label>
          <input type="text" class="form-input" placeholder="John" />
        </div>
        <div class="form-group">
          <label class="form-label">Last Name</label>
          <input type="text" class="form-input" placeholder="Doe" />
        </div>
      </div>

      <div class="form-group">
        <label class="form-label">Email</label>
        <input type="email" class="form-input" placeholder="john@example.com" />
      </div>

      <div class="form-group">
        <label class="form-label">Phone</label>
        <div class="form-phone-row">
          <select class="form-select">
            <option>+1</option>
            <option>+44</option>
            <option>+55</option>
          </select>
          <input type="tel" class="form-input" placeholder="(555) 123-4567" />
        </div>
      </div>

      <div class="form-group">
        <label class="form-label">Country</label>
        <select class="form-select">
          <option value="">Select country...</option>
          <option>United States</option>
          <option>United Kingdom</option>
          <option>Brazil</option>
        </select>
      </div>
    </div>

    <div class="form-actions">
      <button class="btn btn--outline">Cancel</button>
      <button class="btn btn--solid">Save Customer</button>
    </div>
  </div>
</div>
```

### Responsividade

```css
/* ≤479px: form-layout colapsa para 1 coluna */
@media (max-width: 479px) {
  .form-layout { grid-template-columns: 1fr; }
  .form-nav    { position: static; }
}
```

---

## Table Form Controls

### Custom Checkbox (.tbl-check)

```css
.tbl-check {
  width: 16px; height: 16px;
  border-radius: 4px;
  border: 1px solid var(--border-soft);
  background: transparent;
  appearance: none; -webkit-appearance: none;
  cursor: pointer;
  transition: all 150ms var(--ease-out);
}
.tbl-check:checked {
  background: var(--primary);
  border-color: var(--primary);
  /* checkmark via SVG background-image */
}
.tbl-check:hover { border-color: var(--ring); }
```

```html
<!-- Header: select all -->
<th class="tbl-col-check"><input type="checkbox" class="tbl-check" /></th>
<!-- Row: per-item -->
<td><input type="checkbox" class="tbl-check" /></td>
```

### Full-Width Search (.tbl-search-full)

Variante 40px do `.tbl-search` para toolbar mais alta:

```css
.tbl-search-full {
  display: flex; gap: 8px; align-items: center;
  background: var(--input);
  border: 1px solid var(--input-border);
  border-radius: var(--radius-sm);
  height: 40px; padding: 0 var(--space-lg);
  transition: border-color .2s var(--ease-out);
}
.tbl-search-full:focus-within { border-color: var(--ring); }
.tbl-search-full input {
  background: none; border: none; outline: none;
  color: var(--foreground); font-size: var(--text-body);
  width: 100%; font-family: inherit;
}
```

```html
<div class="tbl-search-full">
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
    <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
  </svg>
  <input type="text" placeholder="Search products..." />
</div>
```

### Page Size Select (.page-select)

```css
.page-select {
  height: 34px; padding: 0 28px 0 12px;
  background: var(--secondary);
  border: 1px solid var(--border);
  border-radius: var(--radius-sm);
  color: var(--fg-secondary);
  font-size: var(--text-xs);
  appearance: none; -webkit-appearance: none;
  cursor: pointer;
  /* Custom SVG chevron */
  background-image: url("data:image/svg+xml,...");
  background-position: right 10px center;
  background-repeat: no-repeat;
}
```

```html
<select class="page-select">
  <option>10</option>
  <option selected>25</option>
  <option>50</option>
  <option>100</option>
</select>
```

---

## Toggle / Switch (.form-toggle)

Toggle on/off com transição animada:

```css
.form-toggle {
  appearance: none; -webkit-appearance: none;
  width: 44px; height: 24px;
  border-radius: var(--radius-pill);
  background: var(--muted);
  border: none; cursor: pointer;
  position: relative; flex-shrink: 0;
  transition: background 150ms var(--ease-out);
}
.form-toggle::after {
  content: ''; position: absolute; top: 2px; left: 2px;
  width: 20px; height: 20px; border-radius: 50%;
  background: var(--on-solid, #fff);
  transition: transform 150ms var(--ease-out);
  box-shadow: 0 1px 3px rgba(0,0,0,.2);
}
.form-toggle:checked { background: var(--primary); }
.form-toggle:checked::after { transform: translateX(20px); }
.form-toggle:focus-visible { outline: 2px solid var(--ring); outline-offset: 2px; }
.form-toggle:disabled { opacity: .5; cursor: default; }
```

### Toggle Group Pattern

```css
.form-toggle-group {
  display: flex; align-items: center;
  justify-content: space-between;
  gap: var(--space-md); padding: var(--space-sm) 0;
}
.form-toggle-label {
  font-size: var(--text-sm); font-weight: 500;
  color: var(--fg-secondary);
}
.form-toggle-desc {
  font-size: var(--text-xs); color: var(--fg-muted);
  margin-top: 2px;
}
```

```html
<div class="form-toggle-group">
  <div>
    <div class="form-toggle-label">Email Notifications</div>
    <div class="form-toggle-desc">Receive order updates via email</div>
  </div>
  <input type="checkbox" class="form-toggle" checked />
</div>

<div class="form-toggle-group">
  <div>
    <div class="form-toggle-label">SMS Alerts</div>
    <div class="form-toggle-desc">Get text messages for urgent updates</div>
  </div>
  <input type="checkbox" class="form-toggle" />
</div>
```

---

## Checklist

- [ ] Input background usa `var(--input)`, nunca hardcoded
- [ ] Border usa `var(--input-border)`, nunca `1px solid #333`
- [ ] Focus usa `var(--ring)` via `:focus-within` no container
- [ ] Placeholder usa `var(--fg-ghost)`
- [ ] Height padrão 36px para toolbar inputs, 40px para form inputs
- [ ] Select usa `appearance: none` com custom SVG arrow
- [ ] Form layout usa grid 320px + 1fr, colapsa em mobile
- [ ] Toggle usa `.form-toggle` com `::after` pseudo-element
- [ ] Checkbox usa `.tbl-check` com `appearance: none`
- [ ] Funciona em dark e light theme
- [ ] Search icon SVG sem `width`/`height` inline — CSS `.tbl-search svg` controla (14px)
- [ ] Checkbox column usa `.tbl-col-check` (não `style="width:40px"`)
