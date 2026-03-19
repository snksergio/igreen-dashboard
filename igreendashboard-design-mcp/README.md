# iGreenMCP Design System — Servidor MCP (v2.5.0)

> Servidor Model Context Protocol que expoe o iGreenMCP Design System para agentes de IA.
> Deploy automatico via Railway a cada push na branch `main`.

## Instalacao Rapida (Cloud)

O servidor esta rodando em producao no Railway. Use um dos comandos abaixo para conectar:

### Claude Code (CLI)
```bash
claude mcp add igreen-design-mcp --transport sse https://igreen-dashboard-production.up.railway.app/sse
```

### Claude Desktop / Cursor / IDEs
Adicione ao seu `claude_desktop_config.json` ou configuracao MCP da IDE:

```json
{
  "mcpServers": {
    "igreen-design-mcp": {
      "transport": "sse",
      "url": "https://igreen-dashboard-production.up.railway.app/sse"
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

## Deploy

Usa o `Dockerfile` incluido. Auto-deploy via Railway conectado ao repo `snksergio/igreen-dashboard` (branch `main`, root `/igreendashboard-design-mcp`).

```bash
docker build -t igreen-design-mcp .
docker run -p 8080:8080 igreen-design-mcp
```

## Licenca

MIT
