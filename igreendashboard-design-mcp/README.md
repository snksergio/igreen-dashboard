# iGreenMCP Design System — Servidor MCP (v2.6.0)

> Servidor Model Context Protocol que expoe o iGreenMCP Design System para agentes de IA.
> Deploy automatico via Railway a cada push na branch `main`.
> Funciona com qualquer tecnologia: HTML, React, Vue, Tailwind, CSS puro.

## Instalacao Rapida (Cloud) — URL unica para o time

O servidor esta rodando em producao no Railway. Ninguem precisa clonar o repo ou configurar caminhos locais — basta conectar a URL.

### Claude Code (CLI) — mais rapido
```bash
claude mcp add igreen-design-mcp --transport http --url https://igreen-dashboard-production.up.railway.app/mcp
```

### Claude Desktop
Adicione ao `claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "igreen-design-mcp": {
      "command": "npx",
      "args": ["-y", "@anthropic-ai/mcp-proxy", "--transport", "http", "https://igreen-dashboard-production.up.railway.app/mcp"]
    }
  }
}
```

### Cursor
```json
{
  "mcpServers": {
    "igreen-design-mcp": {
      "url": "https://igreen-dashboard-production.up.railway.app/mcp"
    }
  }
}
```

### Verificar conexao
Apos adicionar, teste com:
```
Quais resources voce tem do iGreenMCP?
```

---

## Como usar — Prompts de Referencia

Depois de conectar o MCP, use estes prompts como modelo para garantir que a IA siga o design system.

### Criar uma pagina nova

```
Crie a pagina [NOME DA PAGINA] para o dashboard.

Antes de comecar, consulte os resources do MCP iGreenMCP:
- Leia `system-instructions` para as regras obrigatorias
- Leia `component-navigation` para sidebar + topbar (copie de uma pagina existente)
- Leia `responsive` para as regras de responsividade
- Leia `component-table` se a pagina tiver tabela
- Leia `page-templates` para a estrutura base

A pagina deve:
- [descreva o que a pagina faz]
- [liste as secoes: KPIs, tabela, graficos, etc.]
- [descreva dados/colunas se tiver tabela]

Siga 100% os tokens, componentes e padroes do design system.
Deve funcionar em dark/light theme e ser responsiva em todos os breakpoints.
Use o arquivo analytics.html como referencia de qualidade.
```

### Criar um componente novo

```
Crie o componente [NOME DO COMPONENTE] seguindo o iGreenMCP Design System.

Antes de comecar, consulte os resources do MCP:
- Leia `system-instructions` para regras obrigatorias (tokens, prefixos, themes)
- Leia `rules` para convencoes de nomenclatura (prefixos de classe)
- Leia `colors` e `spacing` para os tokens disponiveis
- Leia `states` para hover, focus, disabled, loading

O componente deve:
- [descreva o que ele faz e como se comporta]
- [liste as variantes: default, active, disabled, etc.]
- [descreva interacoes: click, hover, toggle, etc.]

Regras:
- Todas as cores via var(--token), nunca hardcoded
- Respeitar a escala tipografica (--text-xs ate --text-display)
- Spacing via --space-sm ate --space-3xl
- Funcionar em dark e light theme
- Ser responsivo (colapsar/empilhar no mobile)
- Se tiver tabs: flex-shrink: 0 + scroll horizontal
- Se tiver tabela: usar .tbl-scroll wrapper obrigatoriamente
- Adicionar hover/focus states em todo elemento interativo
```

### Criar uma tela com tabela (80% dos casos)

```
Crie a pagina [NOME] com foco em tabela de dados.

Consulte o MCP iGreenMCP antes de comecar:
- `system-instructions` → regras gerais + Regra #9 (tabela responsiva)
- `component-table` → anatomia completa, 5 camadas, responsive obrigatorio
- `component-navigation` → sidebar + topbar + overlay mobile
- `responsive` → breakpoints e regras de empilhamento

A tabela deve ter:
- Colunas: [liste as colunas]
- Tabs: [liste as tabs de filtro, ex: All, Active, Pending]
- Busca por [campo]
- Filtros por [campos]
- Paginacao com [X] items por pagina
- Acoes por linha: [editar, deletar, ver detalhes, etc.]

IMPORTANTE — estrutura obrigatoria da tabela:
1. <table> dentro de <div class="tbl-scroll"> (scroll isolado)
2. Toolbar (.tbl-topbar) e pagination FORA do .tbl-scroll
3. .tbl-filters com flex-wrap: wrap
4. Tabs com flex-shrink: 0 (nunca encolhem)
5. No mobile: toolbar empilha (tabs 100%, search 100%, botoes abaixo)
```

### Revisar uma tela existente

```
Revise a pagina [NOME/ARQUIVO] usando o MCP iGreenMCP.

Consulte:
- `system-instructions` para o checklist automatico
- `rules` para convencoes de nomenclatura
- `responsive` para verificar todos os breakpoints
- `component-table` se tiver tabela (verificar as 5 regras inviolaveis)

Verifique:
- Cores hardcoded (deve usar tokens)
- Inline styles desnecessarios (deve usar classes)
- Responsividade em 4 breakpoints (1279, 1023, 767, 479)
- Dark/light theme
- Tabela com .tbl-scroll wrapper
- Tabs com flex-shrink: 0
- Filter chips com flex-wrap
- Sidebar overlay no mobile
- Mobile title no topbar
```

### Prompt rapido (para quem ja conhece o sistema)

```
Crie [COMPONENTE/PAGINA]. Siga o iGreenMCP Design System do MCP.
Consulte system-instructions, responsive e os component-docs relevantes.
Use analytics.html como referencia de qualidade.
Dark/light theme, responsivo, tokens apenas.
```

---

## Instalacao Local (Desenvolvimento)

```bash
cd igreendashboard-design-mcp
npm install
npm start          # transporte stdio (para Claude Desktop / IDEs)
npm run start:http # transporte HTTP na porta 8080
```

## O que esta incluso

- **21 Resources** — Cores, tipografia, layout, spacing, estados, regras, responsive, 13 docs de componentes, templates de paginas
- **6 Tools** — `get_token`, `list_tokens`, `validate_css`, `suggest_component`, `generate_theme_css`, `get_file_structure`
- **3 Prompts** — `new-page`, `new-component`, `review-ui`
- **24+ Tipos de componente** — card, button, table, drawer, badge, chart, navigation, forms, detail-page, edit-page, legends, etc.

## Deploy Remoto — URL unica para o time (recomendado)

Ao inves de cada pessoa clonar o repo e configurar o caminho local,
faca deploy do servidor MCP uma vez e distribua a URL para o time.

### Railway (recomendado)
1. Acesse [railway.app](https://railway.app) e crie um novo projeto
2. Conecte o repositorio GitHub (`snksergio/igreen-dashboard`)
3. Configure o Root Directory como `igreendashboard-design-mcp`
4. Railway detecta o Dockerfile automaticamente
5. Apos o deploy, copie a URL gerada (ex: `https://igreen-dashboard-production.up.railway.app`)

### Distribuir para o time

Basta compartilhar o comando de instalacao:
```bash
claude mcp add igreen-design-mcp --transport http --url https://igreen-dashboard-production.up.railway.app/mcp
```

Ninguem mais precisa clonar o repo ou configurar caminhos locais.

### Docker (self-hosted)

```bash
docker build -t igreen-design-mcp .
docker run -p 8080:8080 igreen-design-mcp
```

## Multi-tecnologia

O design system funciona com qualquer tecnologia. Os resources orientam por **tokens de design** (CSS custom properties), nao apenas por classes HTML.

| Tecnologia | Como usar os tokens |
|------------|-------------------|
| HTML puro | Classes do design system (`.card`, `.btn--solid`, etc) |
| React + Tailwind | Classes arbitrarias (`bg-[var(--card)]`, etc) |
| React + CSS Modules | Custom properties no CSS (`background: var(--card)`) |
| Vue | Style binding ou CSS puro (`var(--card)`) |
| Qualquer outro | CSS custom properties diretamente |

Os prompts `new-page`, `new-component` e `review-ui` perguntam a tecnologia alvo e adaptam a orientacao automaticamente.

## Licenca

MIT
