# Color Tokens

> Paleta de cores do iGreenMCP Design System. Todas as cores devem ser usadas via CSS custom properties (variáveis). Nunca use valores hex hardcoded nos componentes.

## Regra principal
- Todas as cores devem ser referenciadas via tokens (CSS variables)
- O sistema suporta Dark (default) e Light theme
- A troca de tema é feita via `data-theme` no elemento `<html>`
- Dark theme usa superfícies escuras com overlays brancos para hierarquia
- Light theme usa superfícies claras com overlays escuros sutis

## Superfícies (Backgrounds)

| Token | Dark | Light | Quando usar |
|-------|------|-------|-------------|
| `--bg` | `#0f1014` | `#f3f3f9` | Fundo geral da página |
| `--sidebar-bg` | `#0b0c10` | `#ffffff` | Fundo da sidebar/navegação lateral |
| `--input-bg` | `#12141a` | `#f5f5fa` | Fundo de inputs e campos de formulário |
| `--card-bg` | `#171920` | `#ffffff` | Fundo de cards e containers de conteúdo |
| `--popover-bg` | `#1c1e26` | `#ffffff` | Fundo de popovers, dropdowns, tooltips |
| `--elevated` | `#22242c` | `#ecedf2` | Superfície elevada (hover states, destaques) |
| `--elevated-hover` | `#2a2c34` | `#e4e5eb` | Superfície elevada em hover |
| `--nav-hover-bg` | `#14161c` | `#e8ecf1` | Hover de itens de navegação |

### Hierarquia de superfícies (do mais escuro ao mais claro no dark):
```
--bg (base) → --sidebar-bg → --input-bg → --card-bg → --popover-bg → --elevated → --elevated-hover
```

## Cores Semânticas (Compostas)

| Token | Uso |
|-------|-----|
| `--background` | Fundo principal (= --bg) |
| `--foreground` | Texto principal sobre o background |
| `--card` / `--card-foreground` | Card background e texto |
| `--popover` / `--popover-foreground` | Popover background e texto |
| `--muted` / `--muted-foreground` | Background e texto atenuado |
| `--surface-raised` | Superfície elevada genérica sobre --muted (tabs ativos, pills selecionadas). Dark: `#20232b`, Light: `#ffffff` |
| `--accent` / `--accent-foreground` | Background e texto de destaque |
| `--secondary` / `--secondary-foreground` | Background e texto secundário |
| `--input` / `--input-border` | Input background e borda |
| `--border` | Borda padrão |
| `--ring` | Focus ring |

## Escala de Foreground (Texto) — 14 níveis

Do mais visível ao mais sutil:

| Token | Propósito | Quando usar |
|-------|-----------|-------------|
| `--fg` | Texto principal | Títulos, valores importantes, texto de leitura |
| `--fg-strong` | Ênfase forte | Headers de seção, valores de KPI |
| `--fg-secondary` | Texto secundário | Subtítulos, descrições |
| `--fg-tooltip` | Texto de tooltip | Tooltips, popovers |
| `--fg-hover` | Texto em hover | Estados de hover em links/botões |
| `--fg-tertiary` | Texto terciário | Labels de formulário, texto auxiliar |
| `--fg-muted` | Texto atenuado | Placeholders, dicas |
| `--fg-dim` | Texto reduzido | Informação de baixa prioridade |
| `--fg-faint` | Texto muito sutil | Metadados, timestamps |
| `--fg-ghost` | Texto quase invisível | Decoração, separadores textuais |
| `--fg-hint` | Dicas visuais | Hints em formulários |
| `--fg-decoration` | Decorativo | Elementos puramente decorativos |
| `--fg-whisper` | Sussurro visual | Background text, watermarks |
| `--fg-disabled` | Desabilitado | Texto em estados disabled |

### Escala Alpha de Foreground
Para opacidades intermediárias: `--fg-30`, `--fg-40`, `--fg-45`, `--fg-50`, `--fg-60`, `--fg-70`, `--fg-80`

## Cores de Marca / Primary

| Token | Dark | Light | Uso |
|-------|------|-------|-----|
| `--primary` | `#00c97a` (verde neon) | `#338449` (verde floresta) | Ações primárias, CTAs, estados ativos |
| `--primary-fg` | `#000000` | `#ffffff` | Texto sobre fundo primary |

Escalas alpha para backgrounds sutis: `--primary-7`, `--primary-8`, `--primary-10`, `--primary-12`, `--primary-15`, `--primary-20`, `--primary-70`

## Cores de Status

| Token | Dark | Light | Uso |
|-------|------|-------|-----|
| `--destructive` | `#ef4444` | `#dc2626` | Erros, exclusões, quedas |
| `--warning` | `#f6b51e` | `#d97706` | Avisos, alertas |
| `--info` | `#8754ec` | `#7c3aed` | Informações, dados auxiliares |
| `--chart-2` | `#7c6cff` | `#6c5ce7` | Cor secundária de gráficos |

Cada cor de status tem versão alpha para backgrounds sutis (ex: `--destructive-8`, `--warning-8`, `--info-8`)

## Overlays (9 níveis)

Para criar hierarquia sobre superfícies existentes:
`--overlay-3` → `--overlay-4` → `--overlay-5` → `--overlay-6` → `--overlay-7` → `--overlay-8` → `--overlay-10` → `--overlay-12` → `--overlay-22`

**Lógica:** No dark theme, overlays são brancos (clareiam a superfície). No light theme, são azul-escuro (escurecem sutilmente).

## Bordas (7 níveis)

Do mais sutil ao mais forte:

| Token | Propósito |
|-------|-----------|
| `--border-separator` | Separadores sutis entre itens |
| `--border-subtle` | Bordas discretas (inputs, cards secundários) |
| `--border-soft` | Bordas suaves (contornos visíveis) |
| `--border-structural` | Bordas estruturais (divisões de layout) |
| `--border-strong` | Bordas fortes (ênfase, foco) |
| `--border-focus` | Borda de foco (= --ring) |
| `--border-tooltip` | Borda de tooltips/popovers |

## Texto sobre Fundos Sólidos

| Token | Valor | Quando usar |
|-------|-------|-------------|
| `--on-solid` | `#ffffff` | Texto branco sobre fundos sólidos coloridos (botões primary, badges, avatares). **NUNCA use `#fff` ou `#ffffff` diretamente** — sempre `var(--on-solid)` |

**Regra:** Qualquer texto branco sobre fundo colorido (ex: botão verde, badge vermelho) deve usar `color: var(--on-solid)`. Isso garante consistência e permite ajustes futuros.

---

## Sombras

| Token | Uso |
|-------|-----|
| `--shadow-card` | Sombra padrão de cards |
| `--shadow-card-hover` | Sombra de card em hover (mais pronunciada) |
| `--shadow-popover` | Sombra de popovers/modais (mais forte) |
