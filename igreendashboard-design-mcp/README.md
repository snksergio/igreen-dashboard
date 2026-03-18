# iGreen Design System — MCP Server (v2.2.1)

> Model Context Protocol server that exposes the CryptoVault Design System to AI agents.

## Quick Start

```bash
npm install
npm start          # stdio transport (for Claude Desktop / IDEs)
npm run start:http # HTTP transport on port 3000
```

## What's Included

- **19 Resources** — Colors, typography, layout, states, rules, 12 component docs, 4 page templates
- **6 Tools** — `get_token`, `list_tokens`, `validate_css`, `suggest_component`, `generate_theme_css`, `get_file_structure`
- **3 Prompts** — `new-page`, `new-component`, `review-ui`
- **24 Component Types** — card, button, table, drawer, badge, chart, detail-page, edit-page, etc.

## Installation

See the [main README](../README.md#mcp-server-v221) for installation instructions on Claude Desktop, Claude Code, Cursor, and other IDEs.

## Deploy

Uses the included `Dockerfile` for Railway, Render, or any container platform.

```bash
docker build -t igreen-design-mcp .
docker run -p 3000:3000 igreen-design-mcp
```

## License

MIT
