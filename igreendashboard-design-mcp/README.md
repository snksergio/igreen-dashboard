# iGreenMCP Design System — Servidor MCP (v2.2.1)

> Servidor Model Context Protocol que expoe o iGreenMCP Design System para agentes de IA.

## Inicio Rapido

```bash
npm install
npm start          # transporte stdio (para Claude Desktop / IDEs)
npm run start:http # transporte HTTP na porta 3000
```

## O que esta incluso

- **19 Resources** — Cores, tipografia, layout, estados, regras, 12 docs de componentes, 4 templates de paginas
- **6 Tools** — `get_token`, `list_tokens`, `validate_css`, `suggest_component`, `generate_theme_css`, `get_file_structure`
- **3 Prompts** — `new-page`, `new-component`, `review-ui`
- **24 Tipos de componente** — card, button, table, drawer, badge, chart, detail-page, edit-page, etc.

## Instalacao

Veja o [README principal](../README.md#instalacao) para instrucoes de instalacao no Claude Desktop, Claude Code, Cursor e outras IDEs.

## Deploy

Usa o `Dockerfile` incluido para Railway, Render ou qualquer plataforma de containers.

```bash
docker build -t igreen-design-mcp .
docker run -p 3000:3000 igreen-design-mcp
```

## Licenca

MIT
