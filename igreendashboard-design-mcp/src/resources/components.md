# Component Patterns

> Padrões de componentes do iGreenMCP Design System. Estes são padrões visuais e estruturais — implemente na tecnologia que preferir, mantendo a aparência consistente.

## Princípio: Agnóstico de tecnologia

Estes padrões descrevem **como o componente deve parecer e se comportar**, não como implementá-lo. Use React, Vue, Svelte, HTML puro, ou qualquer framework — o resultado visual deve ser o mesmo.

---

## Card

O card é o container fundamental de conteúdo.

**Aparência:**
- Background: `--card-bg`
- Border: 1px solid `--border-structural`
- Border-radius: `--radius-md` (12px)
- Shadow: `--shadow-card`
- Padding: `--space-xl` (20px) ou `--space-2xl` (24px)

**Hover (se interativo):**
- Shadow: `--shadow-card-hover`
- Transição: 150ms `--ease-out`

**Estrutura interna:**
```
┌─────────────────────────────────┐
│ Card Header                      │
│ ┌──────────────┬──────────────┐ │
│ │ Title + Sub  │ Actions      │ │
│ └──────────────┴──────────────┘ │
│                                  │
│ Card Body                        │
│ (conteúdo livre)                 │
│                                  │
│ Card Footer (opcional)           │
└─────────────────────────────────┘
```

- **Header:** flex, justify-between, align-center
- **Title:** `--text-body` (14px), peso 600, cor `--fg`
- **Subtitle:** `--text-caption` (12px), peso 400, cor `--fg-muted`
- **Actions:** botões ghost ou icon-only, alinhados à direita

---

## KPI Card

Exibe uma métrica chave com variação e sparkline.

**Aparência:** Herda de Card, com layout específico:
```
┌──────────────────────────────────┐
│ Label (caption, muted)           │
│ $284,532.18 (display, strong)    │
│ ┌─────────────┐  ┌────────────┐ │
│ │ +$340K +14%  │  │ ▁▂▃▅▇█▅▃  │ │
│ │ badge green  │  │ sparkline  │ │
│ └─────────────┘  └────────────┘ │
└──────────────────────────────────┘
```

- **Label:** `--text-caption`, cor `--fg-muted`, uppercase
- **Value:** `--text-display` ou `--text-title`, peso 700, cor `--fg`
- **Badge de variação:** border-radius pill, font `--text-xs`
  - Positivo: texto `--primary`, background `--primary-10`
  - Negativo: texto `--destructive`, background `--destructive-10`
- **Sparkline:** SVG inline, cor `--primary` para positivo

---

## Botão (Button)

**Nomenclatura BEM-like:** `.btn`, `.btn--solid`, `.btn--ghost`, etc.

### Tamanhos

| Tamanho | Height | Padding H | Font Size | Icon Size | Gap |
|---------|--------|-----------|-----------|-----------|-----|
| xs | 26px | 8px | 11px | 12px | 4px |
| sm | 32px | 12px | 12px | 14px | 5px |
| md (default) | 36px | 16px | 13px | 16px | 6px |
| lg | 44px | 20px | 14px | 18px | 8px |

### Variantes

| Variante | Background | Texto | Borda | Hover |
|----------|-----------|-------|-------|-------|
| default | `--secondary` | `--secondary-foreground` | `--border` | bg `--overlay-8` |
| solid | `--primary` | `--primary-fg` | `--primary` | opacity 0.88 |
| outline | transparent | `--foreground` | `--border-soft` | bg `--overlay-5` |
| ghost | transparent | `--muted-foreground` | none | bg `--accent` |
| destructive | `--destructive` | #fff | `--destructive` | opacity 0.88 |
| warning | `--warning` | #000 | `--warning` | opacity 0.88 |
| info | `--info` | #fff | `--info` | opacity 0.88 |

### Modificadores
- **icon:** Quadrado (width = height), padding igual em todos os lados
- **block:** Width 100%
- **pill:** Border-radius `--radius-pill`
- **loading:** Texto invisível + spinner animado via pseudo-element `::after`
- **disabled:** opacity 0.5, pointer-events none

### Estados
- **Hover:** Específico por variante (ver tabela)
- **Active:** transform scale(0.97)
- **Focus-visible:** outline 2px solid `--ring`, outline-offset 2px
- **Disabled:** opacity 0.5, pointer-events none, cursor default

---

## Tabela (Data Table)

**Estrutura:**
```
┌────────────────────────────────────────┐
│ Toolbar                                 │
│ ┌────────┬─────────────┬─────────────┐ │
│ │ Title  │ Tabs        │ Search      │ │
│ ├────────┴─────────────┴─────────────┤ │
│ │ Filter chips + Actions              │ │
│ ├────────────────────────────────────┤ │
│ │ Table Header (sticky)               │ │
│ ├────────────────────────────────────┤ │
│ │ Row 1                               │ │
│ │ Row 2                               │ │
│ │ Row 3                               │ │
│ ├────────────────────────────────────┤ │
│ │ Pagination                          │ │
│ └────────────────────────────────────┘ │
└────────────────────────────────────────┘
```

- **Container:** Card full-width
- **Header row:** background `--overlay-3`, texto `--fg-muted`, font `--text-caption`, uppercase
- **Body rows:** border-bottom `--border-separator`, hover background `--overlay-3`
- **Cell padding:** `--space-md` (12px) vertical, `--space-lg` (16px) horizontal
- **Tabs:** Inline, com indicador na tab ativa (borda inferior `--primary`)
- **Filter chips:** background `--elevated`, border-radius `--radius-xs`, removíveis

### Células especiais
- **Asset cell:** Ícone (32px) + Nome + Símbolo em coluna
- **Badge:** Border-radius pill, cores semânticas (buy=green, sell=red, swap=info)
- **Status chip:** Dot colorido + texto, border-radius pill
- **Variação %:** Verde para positivo (`--primary`), vermelho para negativo (`--destructive`)

---

## Sidebar / Navegação

**Aparência:**
- Width: 248px (expanded), 68px (collapsed)
- Background: `--sidebar-bg`
- Border-right: 1px solid `--sidebar-border`

**Nav items:**
- Height: 40px
- Padding: 0 `--space-md`
- Border-radius: `--radius-sm`
- Texto: `--sidebar-foreground`, font `--text-sm`
- Ícone: 20px, mesma cor do texto
- Hover: background `--nav-hover-bg`
- Active: border-left 2px `--primary`, texto `--primary`, background `--primary-8`

**Seções:** Agrupadas com label uppercase `--text-xs`, cor `--sidebar-muted`

---

## Topbar

- Posição: fixed no topo do `.main`
- Background: `--background-glass` (com backdrop-filter blur)
- Border-bottom: 1px `--border-separator`
- Height: ~56px
- Layout: flex, space-between

**Elementos:** Breadcrumb, wallet tags, ícones de ação, user chip (avatar + nome)

---

## Drawer / Modal Lateral

- Width: 620px, slide-in pela direita
- Background: `--card-bg`
- Overlay: backdrop escuro com blur
- Header: ícone + título + botão fechar
- Body: scrollável com tabs
- Transição: 300ms `--ease-out`

---

## Badges & Chips

**Badge:**
- Border-radius: `--radius-pill`
- Padding: 2px 8px
- Font: `--text-xs`, peso 500
- Variantes por status (green/red/yellow/purple)

**Status Chip:**
- Dot colorido (6px) + texto
- Border-radius: `--radius-pill`
- Background: versão alpha da cor (ex: `--primary-10`)

**Filter Chip:**
- Background: `--elevated`
- Border: `--border-subtle`
- Border-radius: `--radius-xs`
- Removível com ícone X

---

## Gráficos (Charts)

**Biblioteca:** Chart.js 4.4.0

**Padrões visuais:**
- Cores de linha/área: `--primary` para série principal, `--chart-2` para secundária
- Background de área: gradiente alpha (opacity 0.15 → 0)
- Grid lines: `--border-separator`
- Labels: `--text-xs`, cor `--fg-muted`
- Tooltip: background `--popover-bg`, border `--popover-border`, shadow `--shadow-popover`

**Gráfico Donut:**
- Centrar valor total no meio
- Cores: `--primary`, `--chart-2`, `--warning`, `--info`
- Legenda: ao lado (não embaixo), com dot + nome + valor + variação %

**Gráfico de Barras:**
- Border-radius no topo: 3px
- Cor: `--primary` para principal
- Hover: opacity 0.8
