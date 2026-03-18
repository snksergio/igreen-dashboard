# CryptoVault — Project Context Document

> Documento de referencia completo para entender a arquitetura, estrutura, tokens, classes e convenções do projeto.
> Destinado a ser usado como contexto em sessões de IA (Claude, etc.).

---

## 1. Visao Geral

**Projeto:** CryptoVault — Dashboard de analytics para criptomoedas.
**Stack:** HTML puro + CSS custom properties + Tailwind CSS v4 + Chart.js + JavaScript vanilla.
**Sem framework JS** — todo o projeto e stateless, com componentes CSS puros.
**Tema:** Dark (default) e Light, alternados via `data-theme` no `<html>`.
**Font:** Inter (400, 500, 600, 700) via Google Fonts.

---

## 2. Estrutura de Arquivos

```
projeto/
├── analytics.html              ← Pagina principal (dashboard completo, ~2010 linhas)
├── dashboard.html              ← Pagina secundaria
├── package.json                ← Scripts npm (dev/build Tailwind)
│
├── theme/                      ← Sistema de design (tokens + estilos)
│   ├── main.css                ← Entry point do Tailwind (importa tudo)
│   ├── tokens.css              ← Mapeamento CSS vars → @theme Tailwind
│   ├── dark.css                ← Tema escuro (default, :root)
│   ├── light.css               ← Tema claro ([data-theme="light"])
│   └── components.css          ← Todos os estilos de componentes (~1003 linhas)
│
├── components/                 ← Componentes isolados (CSS + HTML showcase)
│   └── button/
│       ├── button.css          ← Sistema de botoes (223 linhas)
│       └── index.html          ← Pagina de showcase/documentacao
│
├── dist/
│   └── styles.css              ← CSS compilado pelo Tailwind (~53KB)
│
└── node_modules/               ← @tailwindcss/cli + tailwindcss
```

---

## 3. Build Pipeline (Tailwind CSS v4)

### Configuracao

**Versao:** Tailwind CSS 4.2.1 (sem `tailwind.config.js` — usa `@theme inline` do v4)

```json
// package.json scripts
{
  "dev":   "npx @tailwindcss/cli -i ./theme/main.css -o ./dist/styles.css --watch",
  "build": "npx @tailwindcss/cli -i ./theme/main.css -o ./dist/styles.css --minify"
}
```

### Entry Point — `theme/main.css`

```css
@import "tailwindcss";
@source "../*.html";
@custom-variant dark (&:where([data-theme="dark"], [data-theme="dark"] *));
@import "./tokens.css";
@import "./dark.css";
@import "./light.css";
@import "./components.css";
```

**Fluxo:**
1. `@import "tailwindcss"` — carrega utilitarios base do Tailwind
2. `@source "../*.html"` — detecta classes Tailwind usadas nos HTMLs
3. `@custom-variant dark` — cria variante `dark:` baseada em `data-theme="dark"` (nao `prefers-color-scheme`)
4. Importa tokens → dark → light → components (nessa ordem)
5. **Output:** `dist/styles.css` (arquivo unico compilado)

### Como o CSS e carregado

```html
<!-- analytics.html -->
<link href="./dist/styles.css" rel="stylesheet">
```

O `components.css` NAO usa `@layer` — fica desacamadado (unlayered) para ter prioridade sobre as layers do Tailwind.

---

## 4. Sistema de Temas

### Mecanismo de Troca

```html
<html lang="en" data-theme="dark">
```

- **Dark:** `:root` (default, definido em `dark.css`)
- **Light:** `[data-theme="light"]` (override, definido em `light.css`)
- **Persistencia:** `localStorage.getItem('cv-theme')` — aplicado antes do render para evitar flash
- **Toggle JS:** Alterna atributo `data-theme` no `<html>` e salva no localStorage

```javascript
// Anti-flash (inline no <head>)
(function(){var t=localStorage.getItem('cv-theme');if(t)document.documentElement.setAttribute('data-theme',t)})();
```

### Icones de Tema

```css
[data-theme="dark"]  .icon-sun  { display: block; }
[data-theme="dark"]  .icon-moon { display: none; }
[data-theme="light"] .icon-sun  { display: none; }
[data-theme="light"] .icon-moon { display: block; }
```

---

## 5. Design Tokens Completos

### 5.1 Superficies (Surfaces)

| Token | Dark | Light | Uso |
|-------|------|-------|-----|
| `--bg` | `#0f1014` | `#f3f3f9` | Fundo geral da pagina |
| `--sidebar-bg` | `#0b0c10` | `#ffffff` | Fundo da sidebar |
| `--input-bg` | `#12141a` | `#f5f5fa` | Fundo de inputs |
| `--card-bg` | `#171920` | `#ffffff` | Fundo de cards |
| `--popover-bg` | `#1c1e26` | `#ffffff` | Fundo de popovers |
| `--elevated` | `#22242c` | `#ecedf2` | Superficie elevada |
| `--elevated-hover` | `#2a2c34` | `#e4e5eb` | Superficie elevada hover |
| `--nav-hover-bg` | `#14161c` | `#e8ecf1` | Hover de nav items |

### 5.2 Tokens Semanticos (Composites)

| Token | Dark | Light | Uso |
|-------|------|-------|-----|
| `--background` | `#0f1014` | `#f3f3f9` | Fundo principal |
| `--background-glass` | `rgba(15,16,20,0.75)` | `rgba(243,243,249,0.75)` | Fundo com glass effect |
| `--foreground` | `#f0f0f3` | `#1a1a2e` | Texto principal |
| `--card` | `#171920` | `#ffffff` | Card background |
| `--card-foreground` | `#f0f0f3` | `#1a1a2e` | Card text |
| `--popover` | `#1c1e26` | `#ffffff` | Popover background |
| `--popover-foreground` | `#b0b0ba` | `#555568` | Popover text |
| `--popover-border` | `#2e3040` | `#d4d6de` | Popover border |
| `--muted` | `#12141a` | `#f5f5fa` | Muted background |
| `--muted-foreground` | `#6e6e7a` | `#8b8ba0` | Muted text |
| `--accent` | `#22242c` | `#ecedf2` | Accent background |
| `--accent-foreground` | `#f0f0f3` | `#1a1a2e` | Accent text |
| `--secondary` | `#1e2028` | `#ffffff` | Secondary background |
| `--secondary-foreground` | `#8e8e9a` | `#6e6e82` | Secondary text |
| `--input` | `#12141a` | `#ffffff` | Input background |
| `--input-border` | `rgba(255,255,255,0.06)` | `#e4e5eb` | Input border |
| `--border` | `#1a1c24` | `#e4e5eb` | Border default |
| `--ring` | `#363846` | `#bbbdc6` | Focus ring |

### 5.3 Sidebar Tokens

| Token | Dark | Light |
|-------|------|-------|
| `--sidebar` | `#0b0c10` | `#ffffff` |
| `--sidebar-foreground` | `#4e4e5a` | `#8b8ba0` |
| `--sidebar-muted` | `#3e3e4a` | `#9e9eb2` |
| `--sidebar-accent` | `#14161c` | `#e8ecf1` |
| `--sidebar-border` | `#1a1c24` | `#e4e5eb` |

### 5.4 Escala de Foreground (10 niveis)

| Token | Dark | Light | Proposito |
|-------|------|-------|-----------|
| `--fg` | `#f0f0f3` | `#1a1a2e` | Texto principal (= --foreground) |
| `--fg-strong` | `#e2e2e8` | `#2a2a3e` | Enfase forte |
| `--fg-secondary` | `#c8c8d0` | `#3a3a50` | Texto secundario |
| `--fg-tooltip` | `#b0b0ba` | `#555568` | Texto de tooltips |
| `--fg-hover` | `#a0a0ac` | `#5e5e72` | Texto em hover |
| `--fg-tertiary` | `#8e8e9a` | `#6e6e82` | Texto terciario |
| `--fg-muted` | `#6e6e7a` | `#8b8ba0` | Texto atenuado |
| `--fg-dim` | `#5e5e6a` | `#9e9eb2` | Texto reduzido |
| `--fg-faint` | `#4e4e5a` | `#b0b0c0` | Texto muito sutil |
| `--fg-ghost` | `#3e3e4a` | `#c4c4d0` | Texto quase invisivel |
| `--fg-hint` | `#34343e` | `#d0d0da` | Dicas visuais |
| `--fg-decoration` | `#24242c` | `#e0e0e8` | Elementos decorativos |
| `--fg-whisper` | `#2e2e36` | `#d8d8e2` | Sussurro visual |
| `--fg-disabled` | `#282830` | `#dcdce4` | Estado desabilitado |

### 5.5 Alpha Foreground

| Token | Dark | Light |
|-------|------|-------|
| `--fg-30` | `rgba(240,240,243,0.30)` | `rgba(26,26,46,0.30)` |
| `--fg-40` | `rgba(240,240,243,0.40)` | `rgba(26,26,46,0.40)` |
| `--fg-45` | `rgba(240,240,243,0.45)` | `rgba(26,26,46,0.45)` |
| `--fg-50` | `rgba(240,240,243,0.50)` | `rgba(26,26,46,0.50)` |
| `--fg-60` | `rgba(240,240,243,0.60)` | `rgba(26,26,46,0.60)` |
| `--fg-70` | `rgba(240,240,243,0.70)` | `rgba(26,26,46,0.70)` |
| `--fg-80` | `rgba(240,240,243,0.80)` | `rgba(26,26,46,0.80)` |

### 5.6 Escala de Bordas (5 niveis)

| Token | Dark | Light | Proposito |
|-------|------|-------|-----------|
| `--border-structural` | `#1a1c24` | `#e4e5eb` | Bordas estruturais (cards, divisoes) |
| `--border-focus` | `#363846` | `#bbbdc6` | Bordas de foco |
| `--border-tooltip` | `#2e3040` | `#d4d6de` | Bordas de tooltips |
| `--border-separator` | `rgba(255,255,255,0.04)` | `rgba(0,0,0,0.06)` | Separadores sutis |
| `--border-subtle` | `rgba(255,255,255,0.06)` | `rgba(0,0,0,0.08)` | Bordas discretas |
| `--border-soft` | `rgba(255,255,255,0.10)` | `rgba(0,0,0,0.12)` | Bordas suaves |
| `--border-strong` | `rgba(255,255,255,0.20)` | `rgba(0,0,0,0.20)` | Bordas fortes |

### 5.7 Overlay Alpha Scale (9 niveis)

| Token | Dark | Light |
|-------|------|-------|
| `--overlay-3` | `rgba(255,255,255,0.03)` | `rgba(26,26,46,0.02)` |
| `--overlay-4` | `rgba(255,255,255,0.04)` | `rgba(26,26,46,0.03)` |
| `--overlay-5` | `rgba(255,255,255,0.05)` | `rgba(26,26,46,0.04)` |
| `--overlay-6` | `rgba(255,255,255,0.06)` | `rgba(26,26,46,0.05)` |
| `--overlay-7` | `rgba(255,255,255,0.07)` | `rgba(26,26,46,0.06)` |
| `--overlay-8` | `rgba(255,255,255,0.08)` | `rgba(26,26,46,0.07)` |
| `--overlay-10` | `rgba(255,255,255,0.10)` | `rgba(26,26,46,0.09)` |
| `--overlay-12` | `rgba(255,255,255,0.12)` | `rgba(26,26,46,0.11)` |
| `--overlay-22` | `rgba(255,255,255,0.22)` | `rgba(26,26,46,0.20)` |

**Logica:** No dark, overlays sao brancos (clareiam). No light, sao azul-escuro (escurecem sutilmente).

### 5.8 Primary / Brand

| Token | Dark | Light |
|-------|------|-------|
| `--primary` | `#00c97a` (verde neon) | `#338449` (verde floresta) |
| `--primary-fg` | `#000000` | `#ffffff` |
| `--primary-7` | `rgba(cor,0.07)` | `rgba(cor,0.07)` |
| `--primary-8` | `rgba(cor,0.08)` | `rgba(cor,0.08)` |
| `--primary-10` | `rgba(cor,0.10)` | `rgba(cor,0.10)` |
| `--primary-12` | `rgba(cor,0.12)` | `rgba(cor,0.12)` |
| `--primary-15` | `rgba(cor,0.15)` | `rgba(cor,0.15)` |
| `--primary-20` | `rgba(cor,0.20)` | `rgba(cor,0.20)` |
| `--primary-70` | `rgba(cor,0.70)` | `rgba(cor,0.70)` |

### 5.9 Cores de Status

| Token | Dark | Light | Uso |
|-------|------|-------|-----|
| `--destructive` | `#ef4444` | `#dc2626` | Erros, exclusoes |
| `--destructive-8` | `rgba(239,68,68,0.08)` | `rgba(220,38,38,0.08)` | Background sutil |
| `--destructive-10` | `rgba(239,68,68,0.10)` | `rgba(220,38,38,0.10)` | Background sutil |
| `--warning` | `#f6b51e` | `#d97706` | Avisos |
| `--warning-8` | `rgba(246,181,30,0.08)` | `rgba(217,119,6,0.08)` | Background sutil |
| `--info` | `#8754ec` | `#7c3aed` | Informacoes |
| `--info-8` | `rgba(135,84,236,0.08)` | `rgba(124,58,237,0.08)` | Background sutil |
| `--chart-2` | `#7c6cff` | `#6c5ce7` | Cor secundaria de graficos |

### 5.10 Sombras

| Token | Dark | Light |
|-------|------|-------|
| `--shadow-card` | `0 1px 2px rgba(0,0,0,0.06), 0 4px 12px rgba(0,0,0,0.10)` | `0 1px 3px rgba(0,0,0,0.04), 0 4px 16px rgba(0,0,0,0.06)` |
| `--shadow-card-hover` | `0 4px 8px rgba(0,0,0,0.10), 0 8px 24px rgba(0,0,0,0.14)` | `0 4px 12px rgba(0,0,0,0.06), 0 8px 28px rgba(0,0,0,0.10)` |
| `--shadow-popover` | `0 8px 32px rgba(0,0,0,0.40)` | `0 8px 32px rgba(0,0,0,0.12)` |

### 5.11 Tipografia

| Token | Valor | Uso |
|-------|-------|-----|
| `--text-display` | `28px` | Titulos grandes |
| `--text-title` | `20px` | Titulos de secao |
| `--text-body` | `14px` | Texto padrao / body |
| `--text-sm` | `13px` | Texto pequeno (default de componentes) |
| `--text-caption` | `12px` | Legendas, captions |
| `--text-xs` | `11px` | Texto extra pequeno (badges, tags) |

### 5.12 Espacamento (Grid de 8px)

| Token | Valor | Uso |
|-------|-------|-----|
| `--space-xs` | `4px` | Gaps minimos |
| `--space-sm` | `8px` | Espacamento pequeno |
| `--space-md` | `12px` | Espacamento medio |
| `--space-lg` | `16px` | Espacamento padrao |
| `--space-xl` | `20px` | Espacamento grande |
| `--space-2xl` | `24px` | Espacamento extra grande |
| `--space-3xl` | `32px` | Espacamento maximo |

### 5.13 Border Radius

| Token | Valor | Uso |
|-------|-------|-----|
| `--radius-xs` | `6px` | Elementos pequenos (tags, chips) |
| `--radius-sm` | `8px` | Botoes, inputs |
| `--radius-md` | `12px` | Cards, modais |
| `--radius-lg` | `16px` | Containers grandes |
| `--radius-pill` | `9999px` | Botoes pill, badges |

### 5.14 Transicao

| Token | Valor |
|-------|-------|
| `--ease-out` | `cubic-bezier(0.16, 1, 0.3, 1)` |

---

## 6. Mapeamento Tailwind (@theme)

O arquivo `tokens.css` mapeia CSS vars para o namespace `@theme inline` do Tailwind v4:

```css
@theme inline {
  /* Cores → gera classes como bg-background, text-foreground, border-border */
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-primary:    var(--primary);
  /* ... todos os tokens listados na secao 5 */

  /* Radius → gera classes como rounded-sm, rounded-md */
  --radius-xs:   6px;
  --radius-sm:   8px;
  --radius-md:   12px;
  --radius-lg:   16px;
  --radius-pill: 9999px;

  /* Shadows → gera classes como shadow-card, shadow-popover */
  --shadow-card:       var(--shadow-card);
  --shadow-card-hover: var(--shadow-card-hover);
  --shadow-popover:    var(--shadow-popover);

  /* Tipografia → gera classes como text-body, text-sm */
  --text-display: var(--text-display);
  --text-title:   var(--text-title);
  /* ... */

  /* Spacing → gera classes como p-xl, gap-md, m-2xl */
  --spacing-xs:  var(--space-xs);
  --spacing-sm:  var(--space-sm);
  /* ... */
}
```

### Classes Tailwind disponiveis (exemplos)

- **Cores:** `bg-background`, `bg-card`, `bg-primary`, `text-foreground`, `text-muted-foreground`, `border-border`, `border-border-soft`, `bg-overlay-8`, `text-fg-secondary`
- **Radius:** `rounded-xs`, `rounded-sm`, `rounded-md`, `rounded-lg`, `rounded-pill`
- **Shadows:** `shadow-card`, `shadow-card-hover`, `shadow-popover`
- **Tipografia:** `text-display`, `text-title`, `text-body`, `text-sm`, `text-caption`, `text-xs`
- **Spacing:** `p-xs`, `p-sm`, `p-md`, `p-lg`, `p-xl`, `p-2xl`, `p-3xl`, `gap-md`, `m-lg`
- **Dark variant:** `dark:bg-card`, `dark:text-foreground` (ativado por `data-theme="dark"`)

---

## 7. Componentes CSS (components.css)

### Convencoes

- **Sem BEM formal** para componentes do dashboard — usa prefixos semanticos (`.kpi-`, `.tbl-`, `.dw-`)
- **BEM-like** para componentes isolados (`.btn--solid`, `.btn--lg`)
- **Sem `@layer`** — CSS desacamadado para prioridade sobre Tailwind
- **Todas as cores via CSS vars** — nenhum valor hex hardcoded nos componentes (exceto `#fff` e `#000` pontualmente)
- **`var(--ease-out)`** para todas as transicoes

### Catalogo Completo de Classes

#### Layout Principal
| Classe | Descricao |
|--------|-----------|
| `.app` | Container root (100vw x 100vh, flex) |
| `.sidebar` | Sidebar fixa (248px, flex column) |
| `.sidebar.collapsed` | Sidebar recolhida (68px) |
| `.main` | Area principal (flex: 1, column) |
| `.topbar` | Barra superior fixa |
| `.body` | Conteudo scrollavel (flex: 1, overflow-y: auto) |

#### Sidebar
| Classe | Descricao |
|--------|-----------|
| `.sidebar-brand` | Logo + nome da marca |
| `.s-logo` | Container do logo SVG |
| `.brand-text` | Container de texto do logo |
| `.brand-name` | Nome "CryptoVault" |
| `.brand-sub` | Subtitulo "Pro Account" |
| `.sidebar-section` | Grupo de navegacao |
| `.sec-label` | Label da secao ("Main Menu", "Manage") |
| `.nav-item` | Link de navegacao |
| `.nav-item.active` | Estado ativo (borda primaria esquerda) |
| `.ni-icon` | Icone do nav item |
| `.nav-label` | Texto do nav item |
| `.sidebar-gap` | Espacador flexivel |
| `.upgrade-card` | Card de CTA na sidebar |
| `.uc-icon`, `.uc-title`, `.uc-sub`, `.uc-btn` | Partes do upgrade card |

#### Topbar
| Classe | Descricao |
|--------|-----------|
| `.topbar` | Barra superior (glass effect, backdrop-filter) |
| `.sidebar-toggle-btn` | Botao hamburguer |
| `.topbar-divider` | Separador vertical (usa `--border-separator`) |
| `.breadcrumb` | Navegacao breadcrumb |
| `.bc-parent`, `.bc-sep`, `.bc-current` | Partes do breadcrumb |
| `.topbar-center` | Conteudo central |
| `.wallet-tag` | Tag de carteira conectada |
| `.dot`, `.dot-green`, `.dot-gray` | Indicadores de status |
| `.topbar-right` | Area direita (icones) |
| `.t-icon-btn` | Botao de icone no topbar |
| `.notif-badge` | Badge de notificacao (bolinha vermelha) |
| `.user-chip` | Perfil do usuario |
| `.avatar` | Avatar com gradiente |
| `.user-meta`, `.user-name`, `.user-url` | Info do usuario |

#### Filtros
| Classe | Descricao |
|--------|-----------|
| `.filter-bar` | Barra de filtros |
| `.filter-label` | "Period" / "Filters" |
| `.presets` | Grupo de presets (7D, 30D, 90D, YTD, 1Y) |
| `.preset` | Botao de preset |
| `.vdiv` | Divisor vertical (usa `--border-separator`) |
| `.date-range-btn` | Botao de seletor de data |
| `.filter-tags` | Tags de filtro ativos |
| `.ftag` | Tag individual (BTC, ETH) |
| `.icon-btn` | Botao de icone generico |
| `.export-btn` | Botao "Export Report" |

#### KPIs
| Classe | Descricao |
|--------|-----------|
| `.kpi-grid` | Grid 4 colunas |
| `.kpi-card` | Card de KPI |
| `.kpi-left` | Conteudo esquerdo |
| `.kpi-label` | Label (ex: "Total Balance") |
| `.kpi-value` | Valor principal (ex: "$284,532.18") |
| `.kpi-footer` | Rodape com mudanca % |
| `.kpi-sub` | Texto secundario |
| `.kpi-badge` | Badge de variacao (+/-%) |
| `.kpi-spark` | Sparkline SVG |

#### Cards & Mid Row
| Classe | Descricao |
|--------|-----------|
| `.mid-row` | Secao do meio (2 cards lado a lado) |
| `.card` | Card padrao (background, border, radius, shadow) |
| `.card-head` | Header do card |
| `.card-title` | Titulo do card |
| `.card-sub` | Subtitulo |
| `.card-actions` | Botoes de acao |
| `.ca-btn` | Botao de acao do card |
| `.more-dots` | Menu de 3 pontos |

#### Performance Stats
| Classe | Descricao |
|--------|-----------|
| `.perf-stats` | Container de estatisticas |
| `.pstat-card` | Card de estatistica |
| `.pstat-label`, `.pstat-val`, `.pstat-pct` | Partes do stat card |
| `.perf-legend` | Legenda do grafico |
| `.pl-item`, `.pl-line` | Items da legenda |

#### Graficos
| Classe | Descricao |
|--------|-----------|
| `.chart-area` | Area do grafico de linha |
| `.donut-area` | Area do grafico de rosca |
| `.alloc-list` | Lista de alocacao (ao lado da rosca) |
| `.al-row`, `.al-pip`, `.al-name`, `.al-pct`, `.al-bar-bg`, `.al-bar`, `.al-chg` | Partes da alocacao |

#### Tabela Principal
| Classe | Descricao |
|--------|-----------|
| `.table-section` | Secao da tabela (full-width card) |
| `.tbl-topbar` | Toolbar da tabela |
| `.tbl-title-row` | Linha de titulo |
| `.tbl-badge` | Badge ao lado do titulo |
| `.tbl-export-btn` | Botao de exportar |
| `.tbl-tabs` | Abas (All, Buy, Sell, Swap) |
| `.tbl-tab` | Aba individual |
| `.tbl-filters` | Area de filtros da tabela |
| `.filter-chip-wrap` | Wrapper do chip |
| `.filter-chip` | Chip com dropdown (Status, Asset, Type) |
| `.fc-label`, `.fc-val`, `.fc-clear`, `.fc-chevron` | Partes do chip |
| `.fc-dropdown`, `.fc-opt` | Dropdown com opcoes |
| `.add-filter-btn` | Botao "+ Add Filter" |
| `.tbl-search` | Input de busca |
| `.tbl-filter-btn` | Botao de filtro |
| `.tbl-toolbar-row` | Linha de ferramentas |
| `.tbl-refresh-btn` | Botao de atualizar |

#### Celulas da Tabela
| Classe | Descricao |
|--------|-----------|
| `.asset-cell` | Celula com icone + nome do ativo |
| `.coin-icon` | Icone da moeda (emoji) |
| `.coin-sym` | Simbolo (BTC, ETH) |
| `.coin-name` | Nome (Bitcoin, Ethereum) |
| `.badge` | Badge generico (buy/sell/swap) |
| `.status-chip` | Chip de status (completed/pending/failed) |
| `.s-dot` | Dot colorido do status |
| `.chg-pos` | Variacao positiva (verde) |
| `.chg-neg` | Variacao negativa (vermelho) |
| `.chg-nil` | Sem variacao (muted) |

#### Paginacao
| Classe | Descricao |
|--------|-----------|
| `.pagination` | Container de paginacao |
| `.page-info` | "Showing 1-10 of 24" |
| `.page-btns` | Grupo de botoes |
| `.pb` | Botao de pagina |

#### Asset Overview
| Classe | Descricao |
|--------|-----------|
| `.ao-row` | Layout 2 colunas |
| `.ao-title-row` | Titulo da secao |
| `.ao-info-wrap` | Wrapper de informacoes |
| `.ao-info` | Item de informacao |
| `.ao-val`, `.ao-dec` | Valor + decimais |
| `.ao-badge-row` | Badge de variacao |
| `.ao-sub` | Subtitulo |
| `.ao-chart` | Container do grafico de area |

#### Distribuicao
| Classe | Descricao |
|--------|-----------|
| `.dist-title` | Titulo |
| `.dist-bar` | Barra horizontal empilhada |
| `.dist-seg` | Segmento da barra |
| `.dist-list`, `.dist-item` | Lista de itens |
| `.dist-dot`, `.dist-name`, `.dist-pct`, `.dist-val` | Partes do item |

#### Insights & Segmentos
| Classe | Descricao |
|--------|-----------|
| `.insights-row` | Secao de insights |
| `.seg-donut-wrap` | Wrapper do grafico donut |
| `.seg-legend` | Legenda |
| `.seg-row`, `.seg-dot`, `.seg-name`, `.seg-val`, `.seg-chg` | Partes do segmento |

#### Overview & User Analytics
| Classe | Descricao |
|--------|-----------|
| `.ov-stats` | Estatisticas do overview |
| `.ov-stat`, `.ov-stat-label`, `.ov-stat-val` | Partes do stat |
| `.ov-chart` | Grafico de overview |
| `.ov-year-select` | Seletor de ano |
| `.ua-chart` | Grafico de user analytics |
| `.ua-legend`, `.ua-legend-item` | Legenda |
| `.ua-legend-dot`, `.ua-legend-label`, `.ua-legend-val` | Partes da legenda |

#### Traffic Conversion
| Classe | Descricao |
|--------|-----------|
| `.tc-body` | Layout do mapa + lista |
| `.tc-map`, `.tc-map-dot` | Mapa com pontos |
| `.tc-list`, `.tc-item` | Lista de paises |
| `.tc-flag`, `.tc-info`, `.tc-name` | Info do pais |
| `.tc-bar-wrap`, `.tc-bar-bg`, `.tc-bar`, `.tc-pct` | Barra de progresso |

#### Cohort Retention
| Classe | Descricao |
|--------|-----------|
| `.cr-growth`, `.cr-growth-val`, `.cr-growth-label` | Metrica de crescimento |
| `.cr-seg-bar`, `.cr-seg` | Barra segmentada |
| `.cr-seg-labels`, `.cr-seg-label` | Labels dos segmentos |
| `.cr-channels`, `.cr-channel` | Lista de canais |
| `.cr-ch-icon`, `.cr-ch-val`, `.cr-ch-name` | Partes do canal |

#### Drawer (Modal de Detalhes)
| Classe | Descricao |
|--------|-----------|
| `.drawer-overlay` | Backdrop escuro com blur |
| `.drawer` | Painel deslizante (620px, slide-in da direita) |
| `.drawer.open` | Estado aberto (translateX(0)) |
| `.dw-header` | Header com icone + titulo + fechar |
| `.dw-coin-icon` | Icone da moeda (48px) |
| `.dw-title-wrap` | Container titulo + subtitulo |
| `.dw-title` | Nome do ativo (18px) |
| `.dw-subtitle` | Info secundaria |
| `.dw-close` | Botao X de fechar |
| `.dw-meta` | Grid de metadados (2 colunas: 120px + 1fr) |
| `.dw-row` | Linha de metadado (display: contents) |
| `.dw-label` | Label do campo |
| `.dw-value` | Valor do campo |
| `.dw-hash` | Hash com truncamento |
| `.dw-copy` | Botao copiar |
| `.dw-tabs` | Navegacao de abas |
| `.dw-tab` | Aba individual |
| `.dw-tab.active` | Aba ativa (foreground color + border) |
| `.dw-tab-badge` | Badge numerico na aba |
| `.dw-body` | Conteudo das abas (scrollavel) |
| `.dw-panel` | Painel de conteudo |
| `.dw-panel.active` | Painel visivel |

#### Drawer — Conteudo
| Classe | Descricao |
|--------|-----------|
| `.dw-section-title` | Titulo de secao |
| `.dw-notes` | Bloco de notas |
| `.dw-detail-grid` | Grid 2x2 de detalhes |
| `.dw-detail-card` | Card de detalhe |
| `.dw-detail-card-label`, `.dw-detail-card-val` | Partes do card |
| `.dw-comment-box` | Area de comentario |
| `.dw-comment-toolbar` | Toolbar com icones |
| `.dw-comment-tools`, `.dw-comment-tool` | Botoes da toolbar |
| `.dw-submit-btn` | Botao "Submit" |
| `.dw-comment` | Comentario individual |
| `.dw-comment-avatar` | Avatar do comentarista |
| `.dw-comment-body` | Corpo do comentario |
| `.dw-comment-head` | Header (nome + hora) |
| `.dw-comment-name`, `.dw-comment-time` | Partes do header |
| `.dw-comment-text` | Texto do comentario |
| `.dw-comment-actions` | Acoes (react, reply) |
| `.dw-comment-action` | Botao de acao |
| `.dw-reaction` | Badge de reacao (emoji) |
| `.dw-attachment` | Arquivo anexado |
| `.dw-att-icon` | Icone do arquivo |
| `.dw-att-info`, `.dw-att-name`, `.dw-att-meta` | Info do arquivo |
| `.dw-att-size` | Tamanho do arquivo |
| `.dw-att-action` | Link "Download" |

#### Drawer — Timeline
| Classe | Descricao |
|--------|-----------|
| `.dw-timeline` | Container da timeline |
| `.dw-tl-item` | Item da timeline |
| `.dw-tl-dot` | Dot da timeline (com variantes de cor) |
| `.dw-tl-title` | Titulo do evento |
| `.dw-tl-desc` | Descricao do evento |
| `.dw-tl-time` | Timestamp |

---

## 8. Componente de Botao (components/button/)

### Nomenclatura BEM-like

```
.btn                    Base (default/secondary, md size)
.btn--solid             Variante: background primary
.btn--outline           Variante: borda visivel, fundo transparente
.btn--ghost             Variante: sem borda, sem fundo
.btn--destructive       Variante: vermelho
.btn--warning           Variante: amarelo
.btn--info              Variante: roxo
.btn--xs                Tamanho: 26px
.btn--sm                Tamanho: 32px
.btn--lg                Tamanho: 44px
.btn--icon              Modificador: quadrado (icon-only)
.btn--block             Modificador: width 100%
.btn--pill              Modificador: border-radius pill
.btn--loading           Estado: spinner animado + pointer-events none
.btn[disabled]          Estado: opacity 0.5 + pointer-events none
```

### Tabela de Tamanhos

| Classe | Height | Padding | Font Size | Icon Size | Gap |
|--------|--------|---------|-----------|-----------|-----|
| `.btn--xs` | 26px | 0 8px | 11px (--text-xs) | 12px | 4px |
| `.btn--sm` | 32px | 0 12px | 12px (--text-caption) | 14px | 5px |
| `.btn` (md) | 36px | 0 16px | 13px (--text-sm) | 16px | 6px |
| `.btn--lg` | 44px | 0 20px | 14px (--text-body) | 18px | 8px |

### Tabela de Variantes

| Classe | Background | Color | Border | Hover |
|--------|-----------|-------|--------|-------|
| `.btn` (default) | `--secondary` | `--secondary-foreground` | `--border` | bg `--overlay-8` |
| `.btn--solid` | `--primary` | `--primary-fg` | `--primary` | opacity 0.88 |
| `.btn--outline` | transparent | `--foreground` | `--border-soft` | bg `--overlay-5` |
| `.btn--ghost` | transparent | `--muted-foreground` | transparent | bg `--accent` |
| `.btn--destructive` | `--destructive` | #fff | `--destructive` | opacity 0.88 |
| `.btn--warning` | `--warning` | #000 | `--warning` | opacity 0.88 |
| `.btn--info` | `--info` | #fff | `--info` | opacity 0.88 |

### Estados

- **Hover:** Especifico por variante (ver tabela)
- **Active:** `transform: scale(0.97)`
- **Focus-visible:** `outline: 2px solid var(--ring); outline-offset: 2px`
- **Disabled:** `opacity: 0.5; pointer-events: none; cursor: default`
- **Loading:** `color: transparent; pointer-events: none` + spinner `::after` animado

### Composicao

Classes podem ser combinadas livremente:
```html
<button class="btn btn--solid btn--lg btn--pill">Large Pill Primary</button>
<button class="btn btn--destructive btn--sm btn--icon">
  <svg>...</svg>
</button>
<button class="btn btn--outline btn--block btn--loading">Loading...</button>
```

---

## 9. Estrutura HTML Principal (analytics.html)

### Hierarquia

```
<html data-theme="dark">
  <body>
    <div class="app">                      ← Flex container (100vw x 100vh)

      <aside class="sidebar">              ← 248px fixo
        .sidebar-brand                      ← Logo + CryptoVault
        .sidebar-section (Main Menu)        ← Dashboard, Portfolio, Swap, Market Trends
        .sidebar-section (Manage)           ← Analytics (active), Wallets, History, Settings
        .sidebar-gap                        ← Flex spacer
        .upgrade-card                       ← CTA "Upgrade Pro"
      </aside>

      <div class="main">                   ← Flex: 1
        <header class="topbar">            ← Glass header fixo
          .sidebar-toggle-btn              ← Hamburger
          .topbar-divider
          .breadcrumb                      ← Home > Analytics
          .topbar-center                   ← Wallet tag
          .topbar-right                    ← Icons + User chip
        </header>

        <div class="body">                ← Scrollavel
          .filter-bar                      ← Periodo + filtros + export
          .kpi-grid                        ← 4 KPI cards
          .mid-row                         ← 2 cards (Performance + Allocation)
          .table-section                   ← Tabela de transacoes
          .ao-row                          ← Asset Overview (2 cols)
          .insights-row                    ← 3 cards (Distribution + Insights + Segments)
          .mid-row                         ← 2 cards (Overview + User Analytics)
          .geo-row                         ← 2 cards (Traffic + Cohort)
        </div>
      </div>

      .drawer-overlay                      ← Backdrop do drawer
      .drawer                              ← Painel de detalhes (620px)
    </div>
  </body>
</html>
```

### JavaScript

- **Chart.js 4.4.0** — Graficos (line, doughnut, bar)
- **Theme toggle** — `data-theme` + localStorage
- **Sidebar collapse** — Toggle classe `.collapsed`
- **Filter chips** — Dropdowns com seleção
- **Table tabs** — Filtro All/Buy/Sell/Swap
- **Drawer** — `openDrawer(row)` / `closeDrawer()`, tab switching, mock data
- **Paginacao** — Prev/Next
- **Copy to clipboard** — TX Hash copy

---

## 10. Overrides do Light Theme

Ajustes pontuais que nao se resolvem apenas com troca de variavel:

```css
[data-theme="light"] .upgrade-card { background: linear-gradient(145deg, #f0f1f6, #e8e9f0); }
[data-theme="light"] .s-logo svg { fill: #fff; }
[data-theme="light"] .avatar { background: linear-gradient(135deg, #2ea86a, #238c55); }
[data-theme="light"] .body::-webkit-scrollbar-thumb { background: rgba(0,0,0,0.12); }
[data-theme="light"] .body::-webkit-scrollbar-thumb:hover { background: rgba(0,0,0,0.20); }
[data-theme="light"] .tbl-search svg stroke { stroke: #999; }
[data-theme="light"] .kpi-spark svg rect { fill-opacity: 0.7; }
```

---

## 11. Convencoes e Padroes

### CSS
- **Tokens sempre** — Nunca hex hardcoded nos componentes (exceto `#fff`/`#000` em variantes semanticas)
- **Transicoes:** Sempre usar `var(--ease-out)` como timing function
- **Focus:** Sempre `outline: 2px solid var(--ring); outline-offset: 2px` em `:focus-visible`
- **Disabled:** `opacity: 0.5; pointer-events: none`
- **Hover de superficies:** Usar overlays (`--overlay-5` a `--overlay-12`) sobre o fundo existente
- **Bordas:** Escolher da escala (`--border-separator` < `--border-subtle` < `--border-soft` < `--border-strong`)
- **Sem `@layer`** no `components.css` — CSS desacamadado para prioridade sobre Tailwind

### Nomenclatura
- **Prefixos semanticos** para agrupamento: `.kpi-`, `.tbl-`, `.dw-`, `.ao-`, `.tc-`, `.cr-`
- **BEM-like** para componentes isolados: `.btn--solid`, `.btn--lg`
- **Sufixos de estado:** `.active`, `.open`, `.collapsed`, `.loading`
- **Variantes com double dash:** `--solid`, `--ghost`, `--xs`, `--lg`

### HTML
- **SVG inline** para todos os icones (nao usa icon fonts)
- **`data-theme`** para controle de tema (nao classes)
- **`data-tab` / `data-panel`** para controle de abas
- **Font:** Inter via Google Fonts (400, 500, 600, 700)

### JavaScript
- **Vanilla JS** — sem frameworks
- **IIFE pattern** para escopo isolado
- **Event delegation** mista (direta + querySelectorAll)
- **Mock data** para demonstracao (comentarios, anexos, atividades)

---

## 12. Dependencias

| Pacote | Versao | Uso |
|--------|--------|-----|
| `tailwindcss` | ^4.2.1 | Framework CSS utilitario |
| `@tailwindcss/cli` | ^4.2.1 | CLI para build |
| `chart.js` | 4.4.0 | Graficos (via CDN) |
| `Inter` | — | Font principal (via Google Fonts CDN) |

---

## 13. Como Rodar

```bash
# Instalar dependencias
npm install

# Dev mode (watch)
npm run dev

# Build producao
npm run build

# Abrir no browser
# → analytics.html (dashboard principal)
# → components/button/index.html (showcase de botoes)
```

---

## 14. Proximos Passos Possiveis

- Padronizar botoes existentes no `analytics.html` para usar classes `.btn`
- Criar mais componentes isolados em `components/` (inputs, cards, badges, modais)
- Adicionar mais paginas (Portfolio, Wallets, Settings)
- Implementar interatividade real (API, dados reais)
