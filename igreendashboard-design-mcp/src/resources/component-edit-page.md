# Component: Edit Page

> Template de composicao para paginas de formulario/edicao com navegacao lateral por steps, sections, field grids, toggles e footer de acoes.
> Reutiliza `.form-*` classes de `component-forms.md` e `.od-detail-section` de `component-detail-page.md`.

## Anatomia

```
┌─────────────────────────────────────────────────────────────┐
│ .topbar (glass, sticky)                                      │
├─────────────────────────────────────────────────────────────┤
│ .body (padding: var(--space-xl))                             │
│                                                               │
│  .form-page-title ─── "Add New Customer"                    │
│                                                               │
│  .form-layout ─── grid: 320px + 1fr                         │
│  ┌──────────────┬──────────────────────────────────────┐    │
│  │ .form-nav    │ .form-content                         │    │
│  │ (sticky)     │                                       │    │
│  │              │ ┌── .form-section ──────────────────┐ │    │
│  │ ┌──────────┐ │ │ .form-section-title               │ │    │
│  │ │ Step 1   │ │ │ .form-row (2 cols)                │ │    │
│  │ │ .active  │ │ │  ├ .form-group > .form-input      │ │    │
│  │ ├──────────┤ │ │  └ .form-group > .form-select     │ │    │
│  │ │ Step 2   │ │ │ .form-group (full width)           │ │    │
│  │ ├──────────┤ │ │  └ .form-input                    │ │    │
│  │ │ Step 3   │ │ └──────────────────────────────────┘ │    │
│  │ ├──────────┤ │                                       │    │
│  │ │ Step 4   │ │ ┌── .form-section ──────────────────┐ │    │
│  │ └──────────┘ │ │ .form-section-title               │ │    │
│  │              │ │ .form-toggle-group (email)         │ │    │
│  │              │ │ .form-toggle-group (sms)           │ │    │
│  │              │ │ .form-toggle-group (marketing)     │ │    │
│  │              │ └──────────────────────────────────┘ │    │
│  │              │                                       │    │
│  │              │ .form-actions ── [Cancel] [Save]      │    │
│  └──────────────┴──────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────┘
```

## CSS Reference

### Page-Level Classes

| Class | Properties | Purpose |
|-------|-----------|---------|
| `.form-page-title` | `font-size: var(--text-title); font-weight: 700; letter-spacing: -0.3px; flex-shrink: 0` | Page heading |
| `.form-layout` | `display: grid; grid-template-columns: 320px 1fr; gap: var(--space-xl); align-items: start` | 2-column layout (nav + content) |

### Step Navigation

| Class | Properties | Purpose |
|-------|-----------|---------|
| `.form-nav` | `background: var(--card); border-radius: var(--radius-md); padding: var(--space-lg); box-shadow: var(--shadow-card); position: sticky` | Sidebar nav card |
| `.form-nav-item` | `display: flex; align-items: flex-start; gap: var(--space-md); padding: var(--space-md) var(--space-lg); border-radius: var(--radius-sm); cursor: pointer` | Step item |
| `.form-nav-item.active` | `background: var(--primary-10)` | Active step highlight |
| `.form-nav-icon` | `width: 36px; height: 36px; border-radius: var(--radius-sm); background: var(--muted); color: var(--fg-muted)` | Step icon box |
| `.form-nav-item.active .form-nav-icon` | `background: var(--primary-10); color: var(--primary)` | Active icon state |
| `.form-nav-title` | `font-size: var(--text-sm); font-weight: 600; color: var(--fg-secondary)` | Step title |
| `.form-nav-desc` | `font-size: var(--text-xs); color: var(--fg-muted); margin-top: 2px` | Step description |

### Form Content

| Class | Properties | Purpose |
|-------|-----------|---------|
| `.form-content` | `display: flex; flex-direction: column; gap: var(--space-xl)` | Sections container |
| `.form-section` | `background: var(--card); border-radius: var(--radius-md); padding: var(--space-2xl); box-shadow: var(--shadow-card)` | Section card |
| `.form-section-title` | `font-size: var(--text-subheading); font-weight: 600; margin-bottom: var(--space-xl)` | Section heading |
| `.form-row` | `display: grid; grid-template-columns: 1fr 1fr; gap: var(--space-lg)` | 2-col field row |
| `.form-group` | `display: flex; flex-direction: column; gap: var(--space-sm); margin-bottom: var(--space-lg)` | Label + input group |
| `.form-label` | `font-size: var(--text-sm); font-weight: 500; color: var(--fg-secondary)` | Field label |
| `.form-input` | `height: 40px; padding: 0 var(--space-lg); background: var(--input); border: 1px solid var(--input-border); border-radius: var(--radius-sm)` | Text input |
| `.form-select` | `height: 40px; padding: 0 var(--space-lg); appearance: none; background: var(--input)` | Select dropdown |
| `.form-phone-row` | `display: grid; grid-template-columns: 120px 1fr; gap: var(--space-sm)` | Phone with country code |
| `.form-actions` | `display: flex; justify-content: flex-end; gap: var(--space-md)` | Save/cancel footer |

### Toggle Controls

| Class | Properties | Purpose |
|-------|-----------|---------|
| `.form-toggle` | `width: 44px; height: 24px; border-radius: var(--radius-pill); background: var(--muted)` | Switch input |
| `.form-toggle:checked` | `background: var(--primary)` | On state |
| `.form-toggle-group` | `display: flex; justify-content: space-between; gap: var(--space-md)` | Label + toggle row |
| `.form-toggle-label` | `font-size: var(--text-sm); font-weight: 500; color: var(--fg-secondary)` | Toggle label |
| `.form-toggle-desc` | `font-size: var(--text-xs); color: var(--fg-muted)` | Toggle description |

---

## Composition Patterns

### Pattern 1: New Entity (Add Customer)

Steps: Personal Info -> Address -> Preferences -> Review

```
form-nav (4 steps) + form-content:
  Section 1: "Personal Information"
    form-row: First Name + Last Name
    form-group: Email (full width)
    form-group: Phone (form-phone-row)
    form-group: Country (form-select)
  Section 2: "Preferences"
    form-toggle-group: Email Notifications
    form-toggle-group: SMS Alerts
    form-toggle-group: Marketing Emails
  form-actions: Cancel + Save
```

### Pattern 2: Edit Existing (Edit Order Detail)

Reutiliza `.od-detail-section` pattern:

```
form-nav (3 steps) + form-content:
  Section 1: od-detail-section with od-detail-header
    od-detail-profile area but with form-inputs instead of od-field-value
  Section 2: od-detail-section (Shipping)
    form-row: Address + City
    form-row: State + Zip Code
  form-actions: Discard + Save Changes
```

### Pattern 3: Settings Page

Sem form-nav (single column):

```
form-content only:
  Section 1: "General Settings"
    form-toggle-group: Dark Mode
    form-toggle-group: Compact View
    form-group: Language (form-select)
  Section 2: "Notifications"
    form-toggle-group: Email
    form-toggle-group: Push
    form-toggle-group: SMS
  form-actions: Reset + Save
```

---

## Full HTML Template — Add Customer

```html
<!-- Inside .body -->
<h1 class="form-page-title">Add New Customer</h1>

<div class="form-layout">
  <!-- ═══ Step Navigation ═══ -->
  <div class="form-nav">
    <div class="form-nav-item active">
      <div class="form-nav-icon">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
        </svg>
      </div>
      <div class="form-nav-text">
        <div class="form-nav-title">Personal Info</div>
        <div class="form-nav-desc">Name, email and contact</div>
      </div>
    </div>

    <div class="form-nav-item">
      <div class="form-nav-icon">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0Z"/><circle cx="12" cy="10" r="3"/>
        </svg>
      </div>
      <div class="form-nav-text">
        <div class="form-nav-title">Address</div>
        <div class="form-nav-desc">Shipping and billing</div>
      </div>
    </div>

    <div class="form-nav-item">
      <div class="form-nav-icon">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/>
        </svg>
      </div>
      <div class="form-nav-text">
        <div class="form-nav-title">Preferences</div>
        <div class="form-nav-desc">Notifications and privacy</div>
      </div>
    </div>

    <div class="form-nav-item">
      <div class="form-nav-icon">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>
        </svg>
      </div>
      <div class="form-nav-text">
        <div class="form-nav-title">Review</div>
        <div class="form-nav-desc">Confirm and submit</div>
      </div>
    </div>
  </div>

  <!-- ═══ Form Content ═══ -->
  <div class="form-content">

    <!-- Section: Personal Info -->
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
        <label class="form-label">Email Address</label>
        <input type="email" class="form-input" placeholder="john@example.com" />
      </div>

      <div class="form-group">
        <label class="form-label">Phone Number</label>
        <div class="form-phone-row">
          <select class="form-select">
            <option>+1</option>
            <option>+44</option>
            <option>+55</option>
            <option>+49</option>
          </select>
          <input type="tel" class="form-input" placeholder="(555) 123-4567" />
        </div>
      </div>

      <div class="form-row">
        <div class="form-group">
          <label class="form-label">Company</label>
          <input type="text" class="form-input" placeholder="Acme Corp" />
        </div>
        <div class="form-group">
          <label class="form-label">Role</label>
          <select class="form-select">
            <option value="">Select role...</option>
            <option>Manager</option>
            <option>Developer</option>
            <option>Designer</option>
            <option>Other</option>
          </select>
        </div>
      </div>
    </div>

    <!-- Section: Address -->
    <div class="form-section">
      <h2 class="form-section-title">Shipping Address</h2>

      <div class="form-group">
        <label class="form-label">Street Address</label>
        <input type="text" class="form-input" placeholder="123 Main Street" />
      </div>

      <div class="form-group">
        <label class="form-label">Apartment / Suite</label>
        <input type="text" class="form-input" placeholder="Apt 4B" />
      </div>

      <div class="form-row">
        <div class="form-group">
          <label class="form-label">City</label>
          <input type="text" class="form-input" placeholder="New York" />
        </div>
        <div class="form-group">
          <label class="form-label">State / Province</label>
          <input type="text" class="form-input" placeholder="NY" />
        </div>
      </div>

      <div class="form-row">
        <div class="form-group">
          <label class="form-label">Zip / Postal Code</label>
          <input type="text" class="form-input" placeholder="10001" />
        </div>
        <div class="form-group">
          <label class="form-label">Country</label>
          <select class="form-select">
            <option value="">Select country...</option>
            <option>United States</option>
            <option>United Kingdom</option>
            <option>Canada</option>
            <option>Brazil</option>
            <option>Germany</option>
          </select>
        </div>
      </div>
    </div>

    <!-- Section: Preferences -->
    <div class="form-section">
      <h2 class="form-section-title">Notification Preferences</h2>

      <div class="form-toggle-group">
        <div>
          <div class="form-toggle-label">Email Notifications</div>
          <div class="form-toggle-desc">Receive order updates and confirmations via email</div>
        </div>
        <input type="checkbox" class="form-toggle" checked />
      </div>

      <div class="form-toggle-group">
        <div>
          <div class="form-toggle-label">SMS Alerts</div>
          <div class="form-toggle-desc">Get text messages for shipping and delivery updates</div>
        </div>
        <input type="checkbox" class="form-toggle" />
      </div>

      <div class="form-toggle-group">
        <div>
          <div class="form-toggle-label">Marketing Emails</div>
          <div class="form-toggle-desc">Receive promotions, news, and product recommendations</div>
        </div>
        <input type="checkbox" class="form-toggle" />
      </div>

      <div class="form-toggle-group">
        <div>
          <div class="form-toggle-label">Two-Factor Authentication</div>
          <div class="form-toggle-desc">Require verification code on login</div>
        </div>
        <input type="checkbox" class="form-toggle" checked />
      </div>
    </div>

    <!-- Actions -->
    <div class="form-actions">
      <button class="btn btn--outline">Cancel</button>
      <button class="btn btn--solid">Save Customer</button>
    </div>
  </div>
</div>
```

---

## Edit Variant — Using od-detail-section

Para paginas de edicao de entidades existentes, combine `.form-*` com `.od-detail-section`:

```html
<h1 class="form-page-title">Edit Customer: <span style="color:var(--fg-muted)">John Doe</span></h1>

<div class="form-layout">
  <div class="form-nav">
    <!-- same nav pattern -->
  </div>

  <div class="form-content">
    <div class="form-section">
      <!-- Reuse od-detail-section pattern for header -->
      <div class="od-detail-header">
        <div class="od-detail-icon">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
          </svg>
        </div>
        <h3 class="od-detail-section-title">Personal Information</h3>
      </div>

      <!-- Profile photo + editable fields -->
      <div class="od-detail-profile">
        <div class="od-detail-photo">JD</div>
        <div style="flex:1">
          <div class="form-row">
            <div class="form-group">
              <label class="form-label">First Name</label>
              <input type="text" class="form-input" value="John" />
            </div>
            <div class="form-group">
              <label class="form-label">Last Name</label>
              <input type="text" class="form-input" value="Doe" />
            </div>
          </div>
          <div class="form-group">
            <label class="form-label">Email</label>
            <input type="email" class="form-input" value="john@example.com" />
          </div>
        </div>
      </div>
    </div>

    <div class="form-actions">
      <button class="btn btn--outline">Discard Changes</button>
      <button class="btn btn--solid">Save Changes</button>
    </div>
  </div>
</div>
```

---

## Responsividade

```css
@media (max-width: 479px) {
  .form-layout { grid-template-columns: 1fr; }
  .form-nav    { position: static; }
  .form-row    { grid-template-columns: 1fr; }
}
```

Em mobile, `.form-layout` colapsa para 1 coluna e `.form-nav` fica acima do `.form-content`.

---

## Checklist

- [ ] Page title usa `.form-page-title` com `var(--text-title)`
- [ ] Layout usa `.form-layout` com grid 320px + 1fr
- [ ] Nav steps usam `.form-nav-item` com `.active` state
- [ ] Sections usam `.form-section` com `var(--card)` background
- [ ] Fields agrupados em `.form-group` > `.form-label` + `.form-input`
- [ ] Rows de 2 colunas usam `.form-row`
- [ ] Toggles usam `.form-toggle-group` > `.form-toggle`
- [ ] Footer usa `.form-actions` com `justify-content: flex-end`
- [ ] Buttons usam `.btn--outline` (cancel) e `.btn--solid` (save)
- [ ] Funciona em dark e light theme
- [ ] Responsive: `.form-layout` colapsa em 1 coluna no mobile (≤ 767px)
- [ ] Responsive: `.form-row` colapsa campos para 1 coluna no mobile
