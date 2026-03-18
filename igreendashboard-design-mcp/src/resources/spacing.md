# Spacing & Layout

> Sistema de espaçamento baseado em grid de 8px e regras de layout do iGreenMCP Design System.

## Escala de Espaçamento

| Token | Valor | Uso |
|-------|-------|-----|
| `--space-xs` | 4px | Gaps mínimos: entre ícone e texto, padding de badges |
| `--space-sm` | 8px | Espaçamento pequeno: gap entre items em lista, padding interno de chips |
| `--space-md` | 12px | Espaçamento médio: padding de inputs, gap entre elementos em linha |
| `--space-lg` | 16px | Espaçamento padrão: padding de cards, gap de grid principal |
| `--space-xl` | 20px | Espaçamento grande: margem entre seções, padding de containers |
| `--space-2xl` | 24px | Espaçamento extra grande: separação entre grupos de conteúdo |
| `--space-3xl` | 32px | Espaçamento máximo: margem entre seções principais |

## Border Radius

| Token | Valor | Uso |
|-------|-------|-----|
| `--radius-xs` | 6px | Elementos pequenos: tags, chips, badges, mini-cards |
| `--radius-sm` | 8px | Botões, inputs, dropdowns, tab items |
| `--radius-md` | 12px | Cards, modais, containers de conteúdo |
| `--radius-lg` | 16px | Containers grandes, seções de layout |
| `--radius-pill` | 9999px | Botões pill, badges arredondados, avatares |

## Regras de Layout

### Estrutura principal
```
┌─────────────────────────────────────────────────┐
│ <html data-theme="dark">                         │
│ ┌──────────┬──────────────────────────────────┐  │
│ │ Sidebar  │ Main                              │  │
│ │ 248px    │ ┌──────────────────────────────┐  │  │
│ │ fixed    │ │ Topbar (glass, fixed)         │  │  │
│ │          │ ├──────────────────────────────┤  │  │
│ │          │ │ Body (scrollável)             │  │  │
│ │          │ │ - filter-bar                  │  │  │
│ │          │ │ - kpi-grid (4 cols)           │  │  │
│ │          │ │ - mid-row (2 cols)            │  │  │
│ │          │ │ - table-section (full)        │  │  │
│ │          │ │ - insights-row (3 cols)       │  │  │
│ │          │ └──────────────────────────────┘  │  │
│ └──────────┴──────────────────────────────────┘  │
└─────────────────────────────────────────────────┘
```

### Container principal
- `.app` — Flex container, 100vw × 100vh
- `.sidebar` — Width fixo 248px, flex column. Collapsed: 68px.
- `.main` — flex: 1, flex-direction: column
- `.topbar` — Fixo no topo, glass effect (backdrop-filter: blur)
- `.body` — flex: 1, overflow-y: auto (scrollável)

### Grid de conteúdo
- **KPI row:** Grid de 4 colunas iguais, gap `--space-lg` (16px)
- **Mid row:** Grid de 2 colunas (proporcional), gap `--space-lg`
- **Insights row:** Grid de 3 colunas, gap `--space-lg`
- **Full-width:** Table sections e filter bar ocupam 100%

### Padding padrão
- **Cards:** padding `--space-xl` (20px) ou `--space-2xl` (24px)
- **Body (conteúdo):** padding `--space-xl` (20px) horizontal, `--space-lg` (16px) vertical entre seções
- **Sidebar:** padding `--space-md` (12px) horizontal
- **Inputs:** padding vertical 0, horizontal `--space-lg` (16px)

### Responsividade
- Sidebar colapsa para 68px (ícones only) em telas menores
- KPI grid: 4 cols → 2 cols → 1 col
- Mid row: 2 cols → 1 col stacked

## Transição

| Token | Valor | Uso |
|-------|-------|-----|
| `--ease-out` | `cubic-bezier(0.16, 1, 0.3, 1)` | Todas as transições do sistema |

**Regra:** Sempre use `var(--ease-out)` como timing function. Duração típica: 150ms para hover, 200ms para expand/collapse, 300ms para modais/drawers.

## Anti-patterns

- ❌ Nunca use valores de spacing fora da escala (ex: 5px, 10px, 15px, 18px)
- ❌ Nunca misture unidades (px com rem com em)
- ❌ Nunca use margin negativo para compensar spacing errado
- ❌ Nunca use border-radius maior que o container (exceto pill)
- ❌ Nunca use transition timing functions diferentes de `--ease-out`
