# Layout & Spacing

> Sistema de layout, espaçamento, grid, z-index, responsividade e transições do Design System.

## Escala de Espaçamento (Grid de 8px)

| Token | Valor | Uso |
|-------|-------|-----|
| `--space-xs` | 4px | Gaps mínimos: entre ícone e texto, padding de badges |
| `--space-sm` | 8px | Espaçamento pequeno: gap entre items em lista, padding interno de chips |
| `--space-md` | 12px | Espaçamento médio: padding de inputs, gap entre elementos em linha |
| `--space-lg` | 16px | Espaçamento padrão: padding de cards, gap de grid principal |
| `--space-xl` | 20px | Espaçamento grande: margem entre seções, padding de containers |
| `--space-2xl` | 24px | Espaçamento extra grande: separação entre grupos de conteúdo |
| `--space-3xl` | 32px | Espaçamento máximo: margem entre seções principais |

**Regra:** Nunca use valores fora da escala (5px, 10px, 15px, 18px). Nunca misture unidades.

## Border Radius

| Token | Valor | Uso |
|-------|-------|-----|
| `--radius-xs` | 6px | Tags, chips, badges, mini-cards, filter chips |
| `--radius-sm` | 8px | Botões, inputs, dropdowns, tab items |
| `--radius-md` | 12px | Cards, modais, containers de conteúdo |
| `--radius-lg` | 16px | Containers grandes, seções de layout |
| `--radius-pill` | 9999px | Botões pill, badges arredondados, avatares |

## Estrutura Principal do Layout

```
┌──────────────────────────────────────────────────────────┐
│ <html data-theme="dark">                                  │
│ ┌──────────┬─────────────────────────────────────────┐   │
│ │ .sidebar │ .main                                    │   │
│ │ 248px    │ ┌─────────────────────────────────────┐  │   │
│ │ fixed    │ │ .topbar (glass, sticky)              │  │   │
│ │ flex-col │ ├─────────────────────────────────────┤  │   │
│ │          │ │ .body (scrollável, flex: 1)          │  │   │
│ │          │ │                                       │  │   │
│ │          │ │  .filter-bar (full-width)             │  │   │
│ │          │ │  .kpi-grid (4 cols)                   │  │   │
│ │          │ │  .ao-row (2fr + 3fr)                  │  │   │
│ │          │ │  .table-section (full-width)          │  │   │
│ │          │ │  .mid-row (3fr + 2fr)                 │  │   │
│ │          │ │  .insights-row (1fr + 2fr + 1fr)      │  │   │
│ │          │ │  .mid-row (1fr + 2fr + 1fr)           │  │   │
│ │          │ │  .geo-row (2fr + 1fr)                 │  │   │
│ │          │ └─────────────────────────────────────┘  │   │
│ └──────────┴─────────────────────────────────────────┘   │
│                                                           │
│ .drawer-overlay (z: 999)  +  .drawer (z: 1000, 620px)   │
└──────────────────────────────────────────────────────────┘
```

### CSS do Layout Principal

```css
/* Regras OBRIGATÓRIAS para qualquer página */
* { margin: 0; padding: 0; box-sizing: border-box; }
html, body { height: 100%; overflow: hidden; }
body {
  background: var(--background);
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  color: var(--foreground);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-feature-settings: 'cv11', 'ss01';
}

.app { width: 100vw; height: 100vh; display: flex; overflow: hidden; }
.sidebar { width: 248px; flex-shrink: 0; display: flex; flex-direction: column; }
.main { flex: 1; display: flex; flex-direction: column; overflow: hidden; min-width: 0; }
.topbar { /* glass, fixed at top of .main */ }
.body { flex: 1; overflow-y: auto; }
```

## Grid Patterns

Todas as grids usam `gap: var(--space-lg)` (16px) como padrão.

| Classe | Colunas | Uso |
|--------|---------|-----|
| `.kpi-grid` | `repeat(4, 1fr)` | Grid de KPI cards (4 cards iguais) |
| `.mid-row` | `3fr 2fr` | Seções de 2 cards (chart maior + card menor) |
| `.ao-row` | `2fr 3fr` | Asset overview (info + chart) |
| `.insights-row` | `1fr 2fr 1fr` | 3 seções (small + large + small) |
| `.geo-row` | `2fr 1fr` | Geographic (map + list) |
| `.dw-meta` | `120px 1fr` | Metadata do drawer (label fixo + value flexível) |
| `.dw-detail-grid` | `1fr 1fr` | Grid 2x2 de detail cards no drawer |

### Exemplo de grid implementation

```css
.kpi-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: var(--space-lg);
  flex-shrink: 0;
}

.mid-row {
  display: grid;
  grid-template-columns: 3fr 2fr;
  gap: var(--space-lg);
  height: 380px;
  flex-shrink: 0;
}
```

## Z-Index System

| Z-Index | Elemento | Classe CSS |
|---------|----------|------------|
| 1000 | Drawer (modal lateral) | `.drawer` |
| 999 | Drawer overlay (backdrop) | `.drawer-overlay` |
| 200 | Filter chip dropdown | `.fc-dropdown` |
| 10 | Table header sticky | `thead` |
| auto | Tudo mais | — |

**Regra:** Novos componentes com overlay devem usar z-index entre 100-998. Tooltips: 500. Popover: 300. Dropdown: 200.

### Proposta de escala z-index para novos componentes

| Faixa | Uso |
|-------|-----|
| 1-9 | Sticky elements dentro de scroll (thead) |
| 10-99 | Elevated surfaces (dropdowns inline) |
| 100-199 | Floating elements (tooltips) |
| 200-299 | Dropdown menus |
| 300-499 | Popovers |
| 500-699 | Tooltips |
| 700-899 | Sticky navigation |
| 900-998 | Overlays/backdrops |
| 999-1000 | Modais/drawers |

## Glass Effect

Usado APENAS no topbar e overlays (nunca em cards ou conteúdo).

```css
.topbar {
  background: var(--background-glass); /* rgba com 75% opacity */
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border-bottom: 1px solid var(--border-separator);
}
```

**Performance:** `backdrop-filter` é caro. Usar apenas em elementos fixos/sticky. Nunca em elementos que fazem scroll.

## Scrollbar Styling

```css
/* Body scrollbar */
.body::-webkit-scrollbar { width: 6px; }
.body::-webkit-scrollbar-track { background: transparent; }
.body::-webkit-scrollbar-thumb {
  background: var(--fg-ghost);
  border-radius: var(--radius-pill);
}
.body::-webkit-scrollbar-thumb:hover { background: var(--fg-faint); }

/* Light theme override */
[data-theme="light"] .body::-webkit-scrollbar-thumb { background: rgba(0,0,0,0.12); }
[data-theme="light"] .body::-webkit-scrollbar-thumb:hover { background: rgba(0,0,0,0.20); }

/* Sidebar: hidden scrollbar */
.sidebar::-webkit-scrollbar { width: 0; }
```

## Padding Padrão por Contexto

| Contexto | Padding | Token |
|----------|---------|-------|
| Card body | `20px` | `var(--space-xl)` |
| Drawer header/body | `24px` horizontal | `var(--space-2xl)` |
| .body (main scroll area) | `20px` all | `var(--space-xl)` |
| Sidebar sections | `12px` horizontal | `var(--space-md)` |
| Inputs | `0 16px` | `0 var(--space-lg)` |
| Buttons (md) | `0 16px` | `0 var(--space-lg)` |
| Table cells (td, th) | `12px 16px` | `var(--space-md) var(--space-lg)` |
| Badges/chips | `2px 8px` | `2px var(--space-sm)` |
| Filter bar | `12px 20px` | `var(--space-md) var(--space-xl)` |

## Flex Order (CSS order)

Dentro do `.body`, a ordem visual dos elementos pode ser alterada:

```css
.ao-row        { order: 1; }   /* Asset Overview aparece antes da tabela */
.table-section { order: 2; }   /* Tabela vem depois */
```

## Responsividade

**Status:** Implementado. Desktop-first com 4 breakpoints via `max-width` media queries.

| Breakpoint | Media Query | Mudanças Principais |
|------------|-------------|---------------------|
| Desktop | > 1280px | Layout completo: sidebar 248px, grids nativos |
| Large tablet | ≤ 1279px | Sidebar auto-colapsa para 68px icon-only |
| Tablet | ≤ 1023px | 4-col → 2-col, 3-col → 2-col, heights auto |
| Mobile | ≤ 767px | Tudo → 1-col, sidebar offscreen com overlay |
| Small mobile | ≤ 479px | Padding reduzido, KPI → 1-col, topbar compacto |

**Sidebar collapsed (manual toggle — desktop):**
```css
.sidebar.collapsed { width: 68px; }
.sidebar.collapsed .brand-text,
.sidebar.collapsed .sec-label,
.sidebar.collapsed .nav-label,
.sidebar.collapsed .upgrade-card { display: none; }
.sidebar.collapsed .nav-item { justify-content: center; width: 44px; height: 44px; margin: 2px auto; }
```

**📖 Ver `responsive.md` para CSS completo de cada breakpoint, HTML necessário para mobile, e JavaScript de toggle.**

## Transição

| Token | Valor |
|-------|-------|
| `--ease-out` | `cubic-bezier(0.16, 1, 0.3, 1)` |

**Durações padrão:**

| Tipo | Duração | Uso |
|------|---------|-----|
| Hover | 150ms | Color changes, opacity, background |
| Expand/collapse | 200ms | Sidebar collapse, accordion, chip expand |
| Modal/drawer | 300-350ms | Drawer slide-in, modal fade-in |
| Micro-interaction | 100ms | Button active scale, tooltip show |

**Anti-patterns:**
- Nunca use `ease`, `ease-in-out`, ou `linear` para interações de UI
- Nunca use transição em `height: auto` (use max-height ou transform)
- Nunca transite `box-shadow` diretamente (use opacity em pseudo-element)
- Nunca use `transition: all` em elementos complexos (especifique propriedades)
