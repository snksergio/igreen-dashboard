# Rules & Principles

> Regras obrigatórias e princípios de design que devem ser seguidos em todo projeto que use o CryptoVault Design System.

## Regras Obrigatórias (DEVE seguir)

### 1. Tokens sempre
- Nunca use valores hex/rgb hardcoded nos componentes
- Texto branco sobre fundos sólidos: use `var(--on-solid)` — **NUNCA** `#fff` ou `#ffffff`
- Toda cor deve referenciar um token CSS (`--nome-do-token`)

### 2. Tema dual obrigatório
- Todo componente deve funcionar em Dark e Light theme
- Teste em ambos os temas antes de entregar
- Use `data-theme` no `<html>` para controle de tema (não `prefers-color-scheme`)
- Anti-flash: aplique tema via localStorage antes do render

### 3. Focus visível
- Todo elemento interativo deve ter estado `:focus-visible`
- Padrão: `outline: 2px solid var(--ring); outline-offset: 2px`
- Nunca remova outline sem substituir por indicador visual equivalente

### 4. Transições consistentes
- Sempre use `var(--ease-out)` como timing function
- Durações padrão: 150ms (hover), 200ms (expand), 300ms (modal/drawer)
- Nunca use `ease`, `ease-in-out`, ou `linear` para interações de UI

### 5. Disabled state
- Padrão: `opacity: 0.5; pointer-events: none; cursor: default`
- Aplica-se a botões, inputs, chips, tabs, e qualquer elemento interativo

### 6. Bordas da escala
- Use apenas tokens da escala de bordas: `--border-separator` < `--border-subtle` < `--border-soft` < `--border-structural` < `--border-strong`
- Nunca use `1px solid #333` ou similar

### 7. Spacing da escala
- Use apenas tokens da escala: `--space-xs` (4), `--space-sm` (8), `--space-md` (12), `--space-lg` (16), `--space-xl` (20), `--space-2xl` (24), `--space-3xl` (32)
- Nunca use valores arbitrários (5px, 10px, 15px, 18px)

### 8. Typography da escala (9 tokens)
- Use apenas tamanhos da escala: `--text-display` (28), `--text-lg` (22), `--text-title` (20), `--text-heading` (18), `--text-subheading` (15), `--text-body` (14), `--text-sm` (13), `--text-caption` (12), `--text-xs` (11)
- Pesos permitidos: 400, 500, 600, 700

### 9. Stat rows com background
- Stat indicator rows (`.ch-stat-row`) devem SEMPRE usar `background: var(--muted)` nos boxes
- Nunca deixar stat boxes sem background — o contraste é necessário para hierarquia visual

### 10. Chart legends sempre custom
- Chart.js: SEMPRE `plugins: { legend: { display: false } }`
- Usar legendas HTML custom: Rich (`.ch-lg-rich`), Value (`.ch-lg-vals`), Simple (`.ch-lg-simple`)
- Nunca usar a legenda built-in do Chart.js

### 11. Ícones SVG inline
- Use SVGs inline para ícones (não icon fonts)
- Tamanho padrão: 20px para navegação, 16px para inline, 24px para destaque
- Cor herda do texto pai ou usa currentColor

### 12. Hover via overlays
- Hover em superfícies usa overlays: `--overlay-5` a `--overlay-12`
- Nunca mude a cor de fundo diretamente no hover (exceto botões com variante específica)

---

## Princípios de Design

### 1. Hierarquia por luminosidade
No dark theme, a hierarquia é criada por luminosidade crescente:
- Base (mais escuro) → Cards → Popovers → Elevated → Hover
- Quanto mais "à frente", mais claro o elemento

### 2. Informação por densidade
- KPIs e dashboards são densos: muita informação em pouco espaço
- Use tipografia e cor para criar hierarquia, não espaçamento excessivo
- Cada pixel deve servir a um propósito

### 3. Status por cor
- Verde (`--primary`): positivo, sucesso, ativo, ganho
- Vermelho (`--destructive`): negativo, erro, perda, exclusão
- Amarelo (`--warning`): atenção, pendente
- Roxo (`--info`): informação, neutro, dados auxiliares

### 4. Consistência > Criatividade
- Use os padrões existentes antes de inventar novos
- Se um card, botão, ou tabela já existe no sistema, reutilize
- Novos padrões devem ser adicionados ao sistema, não ao componente individual

### 5. Dark-first
- Projete primeiro para o dark theme (é o default)
- O light theme é uma adaptação, não o contrário
- Muitas decisões de contraste e hierarquia são feitas pensando no dark

### 6. Glass effect com moderação
- Backdrop-filter blur apenas no topbar e overlays
- Nunca em cards ou componentes de conteúdo
- Performance: blur é caro; use apenas em elementos fixos

---

## Z-Index System

| Z-Index | Elemento | Classe CSS |
|---------|----------|------------|
| 1000 | Drawer (modal lateral) | `.drawer` |
| 999 | Drawer overlay (backdrop) | `.drawer-overlay` |
| 200 | Filter chip dropdown | `.fc-dropdown` |
| 10 | Table header sticky | `thead` |
| auto | Tudo mais | — |

### Escala z-index para novos componentes

| Faixa | Uso |
|-------|-----|
| 1–9 | Sticky elements dentro de scroll (thead) |
| 10–99 | Elevated surfaces (dropdowns inline) |
| 100–199 | Floating elements |
| 200–299 | Dropdown menus |
| 300–499 | Popovers |
| 500–699 | Tooltips |
| 700–899 | Sticky navigation |
| 900–998 | Overlays/backdrops |
| 999–1000 | Modais/drawers |

**Regra:** Novos componentes com overlay devem usar z-index dentro destas faixas. Nunca use `z-index: 9999`.

---

## Nomenclatura CSS

### Dicionário completo de prefixos semânticos (dashboard)

| Prefixo | Significado | Exemplos de classes |
|---------|-------------|---------------------|
| `.kpi-` | KPI cards (métricas principais) | `.kpi-grid`, `.kpi-card`, `.kpi-label`, `.kpi-value`, `.kpi-badge`, `.kpi-spark`, `.kpi-footer`, `.kpi-sub` |
| `.tbl-` | Table (tabela de transações) | `.tbl-topbar`, `.tbl-title-row`, `.tbl-tabs`, `.tbl-tab`, `.tbl-filters`, `.tbl-search`, `.tbl-filter-btn`, `.tbl-export-btn`, `.tbl-refresh-btn`, `.tbl-badge` |
| `.dw-` | Drawer (modal lateral de detalhe) | `.dw-header`, `.dw-close`, `.dw-coin-icon`, `.dw-title-*`, `.dw-meta`, `.dw-row`, `.dw-label`, `.dw-value`, `.dw-tabs`, `.dw-tab`, `.dw-body`, `.dw-panel`, `.dw-comment-*`, `.dw-attachment`, `.dw-timeline`, `.dw-tl-*` |
| `.ao-` | Asset Overview (visão geral de ativos) | `.ao-row`, `.ao-info-wrap`, `.ao-info`, `.ao-label`, `.ao-value`, `.ao-chart` |
| `.tc-` | Traffic/Conversion (mapa + funnel) | `.tc-section`, `.tc-map-dot`, `.tc-item`, `.tc-label`, `.tc-value`, `.tc-bar` |
| `.cr-` | Cohort Retention | `.cr-section`, `.cr-grid`, `.cr-cell` |
| `.seg-` | Segmentation/Demographics | `.seg-section`, `.seg-chg`, `.seg-bar` |
| `.ov-` | Overview/General cards | `.ov-section`, `.ov-year-select` |
| `.ua-` | User Activity | `.ua-section` |
| `.fc-` | Filter Chip (dentro de tabela) | `.fc-dropdown`, `.fc-opt`, `.fc-label`, `.fc-clear`, `.fc-arrow` |
| `.al-` | Allocation/Analytics data | `.al-chg`, `.al-pct`, `.al-row` |
| `.pl-` | Performance Legend | `.pl-item`, `.pl-dot`, `.pl-label`, `.pl-value` |
| `.od-` | Order Detail (página de detalhe) | `.od-header`, `.od-tabs`, `.od-tab`, `.od-grid`, `.od-col`, `.od-card`, `.od-payment-*` |
| `.od-detail-` | Detail Sections (dentro de od) | `.od-detail-header`, `.od-detail-icon`, `.od-detail-title`, `.od-detail-action`, `.od-detail-grid`, `.od-detail-label`, `.od-detail-value` |
| `.ch-` | Chart (cards e containers) | `.ch-card`, `.ch-card-sm`, `.ch-grid`, `.ch-grid-3`, `.ch-grid-4`, `.ch-canvas-wrap`, `.ch-stat-row`, `.ch-stat`, `.ch-stat-val` |
| `.ch-lg-` | Chart Legends (custom HTML) | `.ch-lg-rich`, `.ch-lg-row`, `.ch-lg-dot`, `.ch-lg-name`, `.ch-lg-pct`, `.ch-lg-badge`, `.ch-lg-vals`, `.ch-lg-val-item`, `.ch-lg-simple` |

### Para componentes isolados (BEM-like)

| Pattern | Significado | Exemplo |
|---------|-------------|---------|
| `.component` | Base do componente | `.btn`, `.card`, `.badge` |
| `.component--variant` | Variante (double dash) | `.btn--solid`, `.btn--ghost`, `.badge--up` |
| `.component--size` | Tamanho | `.btn--sm`, `.btn--lg`, `.btn--xs` |
| `.component--modifier` | Modificador | `.btn--icon`, `.btn--loading` |

### Classes de estado (state classes)

| Classe | Significado | Contexto |
|--------|-------------|----------|
| `.active` | Selecionado/ativo | Tabs, nav items, pagination, filter chips |
| `.open` | Expandido/visível | Drawer, dropdowns, filter panels |
| `.collapsed` | Recolhido | Sidebar |
| `.loading` | Em carregamento | Buttons |
| `.highlight` | Destaque temporário | Table rows, list items |

### Data attributes

| Atributo | Uso |
|----------|-----|
| `data-theme` | Controle de tema (`"dark"` / `"light"`) |
| `data-tab` | ID da tab (vincula botão ao painel) |
| `data-panel` | ID do painel de conteúdo da tab |

---

## Icon Sizes

| Contexto | Tamanho | Uso |
|----------|---------|-----|
| Tiny inline | 12px | Indicadores mínimos (setas de sort) |
| Small inline | 14px | Dentro de badges, chips, botões xs/sm |
| Default inline | 16px | Ícones dentro de texto, botões, inputs |
| Navigation | 18–20px | Sidebar nav items (`.ni-icon` = 20px) |
| Topbar actions | 20px | Ícones do topbar (notificação, tema, usuário) |
| Feature/highlight | 24px | Ícones de destaque em cards, KPIs |
| Empty state | 48px | Ilustrações de empty/error state |

**Regras:**
- Ícones SVG inline, nunca icon fonts
- `color: currentColor` para herdar cor do contexto
- `flex-shrink: 0` para evitar compressão em containers flex
- `viewBox` deve estar presente para escalabilidade

---

## Checklist de Qualidade

Antes de entregar qualquer componente, verifique:

- [ ] Funciona em dark theme?
- [ ] Funciona em light theme?
- [ ] Todos os valores de cor vêm de tokens?
- [ ] Spacing usa a escala do sistema?
- [ ] Tipografia usa a escala do sistema?
- [ ] Border-radius usa tokens?
- [ ] Estados hover/focus/active/disabled implementados?
- [ ] Transições usam `--ease-out`?
- [ ] Ícones são SVG inline?
- [ ] Layout é responsivo?

---

## Organização de Arquivos (IMPORTANTE)

### Regra fundamental: CSS do design system é SEMPRE um arquivo separado

Ao iniciar qualquer projeto novo, o PRIMEIRO passo é:
1. Chamar a tool `generate_theme_css` para gerar o arquivo de tokens/variáveis
2. Chamar a tool `get_file_structure` com o framework sendo usado para saber onde colocar
3. Salvar o CSS gerado no caminho correto (ex: `src/styles/design-system.css`)
4. Importar este arquivo ANTES de qualquer outro CSS

### O que vai no arquivo de design system (separado):
- Todas as CSS custom properties (variáveis de cor, spacing, radius, typography, shadows, transitions)
- Dark theme e Light theme variables
- Reset/normalize base
- Focus-visible global
- Font import (Inter)

### O que vai nos arquivos de componente (junto com o componente):
- Estilos específicos do componente (layout, display, position)
- Classes que usam `var(--token)` para cores e spacing
- Estados específicos (hover, active, loading)
- Media queries do componente

### O que NUNCA deve acontecer:
- ❌ Variáveis do design system inline no HTML
- ❌ Tokens duplicados em cada arquivo de componente
- ❌ Valores hex hardcoded em vez de var(--token)
- ❌ Arquivo de tokens misturado com estilos de componente
