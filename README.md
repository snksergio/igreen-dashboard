# iGreen Dashboard — iGreenMCP Design System

Dashboard completo com design system e **servidor MCP** que permite agentes de IA gerarem paginas consistentes e pixel-perfect de forma autonoma.

> **Demo ao vivo:** [Ver no Vercel](https://igreen-dashboard.vercel.app)

---

## Preview

| Dashboard / Analytics | Lista de Produtos |
|:---:|:---:|
| ![Analytics](prints/Analytics.png) | ![List](prints/list.png) |

| Detalhe do Pedido | Formularios / Edicao |
|:---:|:---:|
| ![Details](prints/details.png) | ![Forms](prints/forms.png) |

| Drawer |
|:---:|
| ![Drawer](prints/drawer.png) |

---

## Paginas

| Pagina | Arquivo | Descricao |
|--------|---------|-----------|
| Dashboard | `dashboard.html` | KPI cards, graficos analytics, segmentacao, atividade, receita |
| Analytics | `analytics.html` | Mesma do Dashboard (fonte canonica) |
| Produtos | `products.html` | Grid de KPIs + tabela completa com filtros, ordenacao, paginacao |
| Detalhe do Pedido | `order-detail.html` | Pagina com 5 tabs: Overview, Details, Activity, Comments, Attachments |
| Novo Pedido | `order.html` | Formulario com navegacao por steps, validacao, toggles, footer de acoes |
| Market Trends | `market-trends.html` | Barra de filtros + grid de graficos (line, bar, doughnut, radar) |

Todas as paginas compartilham:
- Sidebar de navegacao (expansivel/colapsavel)
- Topbar com efeito glass e toggle de tema (dark/light)
- Layout responsivo com CSS custom properties (190+ design tokens)
- Chart.js 4.4.0 com legendas customizadas

---

## Design System (Arquitetura CSS)

```
theme/
├── dark.css        ← 190+ tokens (surfaces, foreground, brand, status, overlays, shadows)
├── light.css       ← Overrides do tema claro
├── components.css  ← 340+ classes (todos os componentes, estados, validacao)
├── tokens.css      ← Tokens compartilhados (spacing, radius, tipografia, z-index)
└── main.css        ← Entry point do Tailwind v4 (importa todos acima)

dist/
└── styles.css      ← CSS compilado + minificado (carregado por todas as paginas)
```

---

## Servidor MCP (v2.2.1)

A pasta `igreendashboard-design-mcp/` contem um **servidor Model Context Protocol** que expoe todo o design system para agentes de IA.

### O que o MCP oferece

| Categoria | Qtde | Exemplos |
|-----------|------|---------|
| **Resources** | 19 | Cores, tipografia, layout, estados, regras, docs de componentes, templates de paginas |
| **Tools** | 6 | `get_token`, `list_tokens`, `validate_css`, `suggest_component`, `generate_theme_css`, `get_file_structure` |
| **Prompts** | 3 | `new-page`, `new-component`, `review-ui` |
| **Tipos de componente** | 24 | card, button, table, drawer, badge, chart, detail-page, edit-page, etc. |

---

## Instalacao

### Claude Desktop

Adicione ao seu `claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "igreen-design": {
      "command": "node",
      "args": ["C:/CAMINHO/COMPLETO/igreendashboard-design-mcp/src/index.js"]
    }
  }
}
```

> **Dica:** Substitua `C:/CAMINHO/COMPLETO/` pelo caminho absoluto real do repo clonado.

### Claude Code (CLI)

```bash
# Projeto local (transporte stdio)
claude mcp add igreen-design -- node /caminho/para/igreendashboard-design-mcp/src/index.js

# Ou via HTTP (se deployado)
claude mcp add igreen-design --transport http --url https://SUA-URL-DEPLOY/mcp
```

### Cursor IDE

Adicione ao `.cursor/mcp.json` do seu projeto:

```json
{
  "mcpServers": {
    "igreen-design": {
      "command": "node",
      "args": ["/caminho/para/igreendashboard-design-mcp/src/index.js"]
    }
  }
}
```

### Windsurf / Cline / Outras IDEs

A maioria dos editores compativeis com MCP suportam transporte **stdio** ou **HTTP**:

**Stdio (local):**
```json
{
  "command": "node",
  "args": ["/caminho/para/igreendashboard-design-mcp/src/index.js"]
}
```

**HTTP (deployado):**
```
URL: https://SUA-URL-DEPLOY/mcp
```

---

## Exemplos de Uso

### Exemplo 1: Criar uma pagina nova do zero

```
Prompt para IA:
"Crie uma pagina de 'Clientes' com um grid de KPIs mostrando total de
clientes, usuarios ativos, churn rate e receita por usuario. Abaixo dos
KPIs, adicione uma tabela com colunas: Nome, Email, Status, Plano,
Ultimo Acesso, Acoes. Siga o design system iGreenMCP."

A IA vai automaticamente:
1. Ler page-templates.md → copiar Template 2 (pagina com tabela)
2. Ler component-card.md → montar KPI cards com tokens corretos
3. Ler component-table.md → montar tabela com toolbar, filtros, paginacao
4. Usar suggest_component("table") → obter classes CSS e estrutura exata
5. Usar generate_theme_css() → garantir que todos os tokens estao disponiveis
6. Aplicar rules.md → naming, spacing e estados consistentes
```

### Exemplo 2: Duplicar e customizar uma pagina existente

```
Prompt para IA:
"Duplique a pagina order-detail.html para criar uma pagina de 'Detalhe
de Fatura'. Mude as tabs para: Resumo, Itens, Historico de Pagamento,
Notas. Substitua a lista de produtos por uma tabela de itens da fatura.
Siga o design system iGreenMCP."

A IA vai:
1. Ler order-detail.html como referencia
2. Ler component-detail-page.md → entender padroes .od-*
3. Adaptar a estrutura de 5 tabs para 4 tabs customizadas
4. Reutilizar .od-grid, .od-card, .od-detail-section
5. Adicionar tabela na tab "Itens" usando padroes de component-table.md
6. Validar com validate_css() → garantir zero violacoes de design
```

### Exemplo 3: Criar pagina de formulario/edicao

```
Prompt para IA:
"Crie uma pagina de 'Editar Produto' com navegacao por steps (Info Basica,
Precos, Estoque, Imagens) e campos de formulario para cada secao.
Inclua toggles para 'Publicado' e 'Destaque'. Adicione botoes Salvar/Cancelar."

A IA vai:
1. Ler component-edit-page.md → obter padroes .form-layout, .form-nav
2. Ler component-forms.md → input, select, toggle, validacao CSS
3. Usar suggest_component("edit-page") → spec completo
4. Montar a pagina com .form-section cards e .form-row grids
5. Aplicar states.md → focus, validacao, disabled
```

### Exemplo 4: Criar dashboard de graficos

```
Prompt para IA:
"Crie uma pagina de 'Analise de Mercado' com barra de filtros
(presets 7D/30D/90D/1Y), dois graficos de linha comparando BTC e ETH,
um grafico doughnut para alocacao do portfolio, e uma stat row com
valor total, variacao 24h e volume."

A IA vai:
1. Ler page-templates.md Template 4 → estrutura de pagina com graficos
2. Ler component-charts.md → config Chart.js, paleta, tooltip styling
3. Ler component-legends.md → padroes de legenda (rich, value, simple)
4. Usar suggest_component("chart") → paleta e classes de container
5. Usar suggest_component("filter-bar") → estrutura preset/date-range
```

---

## Estrutura do Projeto

```
igreen-dashboard/
├── index.html              ← Entry point (redireciona para dashboard)
├── dashboard.html          ← Pagina principal do dashboard
├── analytics.html          ← Analytics (mesmo que dashboard)
├── products.html           ← Lista de produtos com tabela
├── order-detail.html       ← Detalhe do pedido (5 tabs)
├── order.html              ← Formulario de novo pedido
├── market-trends.html      ← Graficos e analise de mercado
│
├── dist/
│   └── styles.css          ← CSS compilado (saida do Tailwind v4)
│
├── theme/                  ← Fonte do design system
│   ├── dark.css            ← Tokens do tema escuro
│   ├── light.css           ← Overrides do tema claro
│   ├── components.css      ← Todos os estilos de componentes (340+ classes)
│   ├── tokens.css          ← Tokens compartilhados
│   └── main.css            ← Entry point do Tailwind
│
├── components/             ← 8 showcases de componentes standalone
│   ├── button/
│   ├── card/
│   ├── kpi-card/
│   ├── badge/
│   ├── pagination/
│   ├── table/
│   ├── filter-bar/
│   └── drawer/
│
├── prints/                 ← Screenshots de preview do dashboard
│
├── igreendashboard-design-mcp/   ← Servidor MCP
│   ├── src/
│   │   ├── index.js              ← Servidor (stdio + HTTP transport)
│   │   └── resources/            ← 19 documentos markdown do design
│   ├── Dockerfile
│   └── package.json
│
└── package.json            ← Root (scripts de build do Tailwind)
```

---

## Desenvolvimento

```bash
# Clonar o repo
git clone https://github.com/snksergio/igreen-dashboard.git
cd igreen-dashboard

# Instalar dependencias
npm install
cd igreendashboard-design-mcp && npm install && cd ..

# Assistir mudancas CSS (modo dev)
npm run dev

# Build CSS (producao)
npm run build

# Rodar servidor MCP localmente (stdio)
npm run mcp:start

# Rodar servidor MCP (HTTP na porta 3000)
npm run mcp:http
```

---

## Deploy

### Vercel (Dashboard Estatico)

1. Faca push deste repo para o GitHub
2. Importe o repo no [Vercel](https://vercel.com)
3. Framework preset: **Other**
4. Build command: `npm run build`
5. Output directory: `.` (root — arquivos HTML estaticos)
6. Deploy

Todas as paginas HTML serao servidas como arquivos estaticos. O `index.html` redireciona para `dashboard.html`.

### Servidor MCP (Railway / Render)

O servidor MCP pode ser deployado separadamente para acesso remoto de agentes IA:

1. Faca deploy da pasta `igreendashboard-design-mcp/` no Railway ou Render
2. Use o Dockerfile incluido
3. Configure a env var `PORT` se necessario (padrao: 3000)
4. Conecte via HTTP: `https://sua-url-deploy/mcp`

---

## Stack Tecnica

- **CSS:** Tailwind CSS v4 + Custom Properties (190+ design tokens)
- **Graficos:** Chart.js 4.4.0 com sistema de legendas customizado
- **Fontes:** Inter (Google Fonts)
- **MCP:** @modelcontextprotocol/sdk + Express (transporte duplo: stdio + HTTP)
- **Tema:** Dark/Light com persistencia via localStorage

---

## Licenca

MIT
