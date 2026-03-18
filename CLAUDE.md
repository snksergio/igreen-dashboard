# iGreenMCP Design System

> Regras obrigatórias para qualquer criação de UI neste projeto.
> Claude Code carrega este arquivo automaticamente.

## Regra fundamental

**TODA interface criada neste projeto DEVE seguir o iGreenMCP Design System.**
Isso não precisa ser pedido — é o padrão. Prompts como "crie uma página com tabela" ou "adicione um card" já implicam uso completo de tokens, classes e padrões existentes.

## Tokens obrigatórios

Nunca use valores hardcoded. Sempre `var(--token)`:

- **Cores:** `theme/dark.css` (base) + `theme/light.css` (overrides)
- **Componentes:** `theme/components.css` (~1700 linhas de classes reutilizáveis)
- **Build:** `npx @tailwindcss/cli -i theme/main.css -o dist/styles.css --minify`

### Escala tipográfica (9 tokens)
| Token | Px | Uso |
|-------|-----|-----|
| `--text-display` | 28 | Títulos de página |
| `--text-lg` | 22 | Valores destaque, donut centers |
| `--text-title` | 20 | Títulos de seção |
| `--text-heading` | 18 | Stat values, drawer titles |
| `--text-subheading` | 15 | Card titles, section headings |
| `--text-body` | 14 | Texto padrão |
| `--text-sm` | 13 | Botões, labels |
| `--text-caption` | 12 | Legendas |
| `--text-xs` | 11 | Badges, tags |

### Cores de texto em fundos sólidos
- `var(--on-solid)` para texto branco em botões/badges coloridos (nunca `#fff`)

## Layout padrão

Toda página usa: `<div class="app">` → `<aside class="sidebar">` + `<div class="main">` → `<header class="topbar">` + `<div class="body">`.

Copiar sidebar+topbar de qualquer página existente (analytics.html, products.html, etc.), apenas mudando `.nav-item.active` e breadcrumb.

## Páginas de referência (exemplos práticos)

| Página | Padrão demonstrado |
|--------|--------------------|
| `analytics.html` | KPI grid, tabela com drawer, cards com gráficos, stat sub-cards |
| `products.html` | Tabela com toolbar (tabs, search, filter, export), KPI grid, pagination |
| `order-detail.html` | Tabs, grid 2 colunas, detail sections, field grids, tags, timeline |
| `market-trends.html` | Chart cards, stat rows, 3 tipos de legenda, filter bar, sparklines |

## Prefixos CSS por contexto

| Prefixo | Contexto |
|---------|----------|
| `.kpi-` | KPI cards |
| `.tbl-` | Table system |
| `.dw-` | Drawer modal |
| `.ch-` | Charts (cards, stats, legends, grids) |
| `.od-` | Order detail (tabs, grid, cards) |
| `.od-detail-` | Detail page (sections, fields, tags) |
| `.ch-lg-` | Chart legends (rich, value, simple) |
| `.btn` / `.btn--*` | Buttons |
| `.badge` / `.status-chip` | Badges |

## Regras de ouro

1. Dark theme é o default (`data-theme="dark"` no `<html>`)
2. Light theme DEVE funcionar (tudo via tokens, nunca hex hardcoded)
3. Font: Inter (Google Fonts), pesos 400-700
4. Spacing: `--space-xs` (4) a `--space-3xl` (32) — nunca valores arbitrários
5. Radius: `--radius-xs` (6) a `--radius-pill` (9999)
6. Transições: `var(--ease-out)` — nunca `ease`, `linear`, etc.
7. Focus: `outline: 2px solid var(--ring); outline-offset: 2px`
8. Ícones: SVG inline com `currentColor`
9. Charts: sempre `legend: { display: false }` + HTML legend custom
10. Stat rows: sempre com `background: var(--muted)` nos indicadores

## MCP Server

O projeto inclui um MCP server em `igreendashboard-design-mcp/`:
```json
{
  "mcpServers": {
    "cryptovault-design": {
      "command": "node",
      "args": ["igreendashboard-design-mcp/src/index.js"]
    }
  }
}
```
Recursos: tokens, componentes, templates de página, regras, validação CSS.
