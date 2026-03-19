import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { readFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import { z } from "zod";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// ── Transport mode: stdio (default for IDEs) or http (for remote deploy) ──
const useHttp = process.argv.includes("--http") || process.env.MCP_TRANSPORT === "http";

// ── Load resource files ──────────────────────────────────────────────
function loadResource(filename) {
  return readFileSync(join(__dirname, "resources", filename), "utf-8");
}

const RESOURCES = {
  // Foundation
  colors: { content: loadResource("colors.md"), name: "Color tokens", description: "Paleta de cores, superfícies, foregrounds (14 níveis), bordas, overlays, status, sombras, --on-solid" },
  typography: { content: loadResource("typography.md"), name: "Typography", description: "Escala tipográfica (9 tokens: 11-28px), pesos 400-700, regras de uso de fonte Inter" },
  layout: { content: loadResource("layout.md"), name: "Layout & Spacing", description: "Spacing scale, border radius, grid patterns, z-index, glass effect, scroll, responsive, transitions" },
  rules: { content: loadResource("rules.md"), name: "Rules & Principles", description: "15 regras obrigatórias, 6 princípios, z-index system, naming dictionary, icon size hierarchy, anti-patterns de inline style, checklist" },
  states: { content: loadResource("states.md"), name: "States & Interactions", description: "Hover, active, focus, disabled, loading, open/closed, collapsed, empty/error, form validation, status chip auto-color states" },
  // Components
  "components-overview": { content: loadResource("components-overview.md"), name: "Components Overview", description: "Catálogo completo de componentes com referências cruzadas entre folders e MCP resources" },
  "component-card": { content: loadResource("component-card.md"), name: "Card Component", description: "Card base, KPI card, stat sub-cards, allocation list, chart containers, padrões de uso" },
  "component-table": { content: loadResource("component-table.md"), name: "Table Component", description: "5-layer anatomy, cell types, toolbar buttons, filter chip system, pagination" },
  "component-drawer": { content: loadResource("component-drawer.md"), name: "Drawer Component", description: "620px slide-in modal, overlay, metadata grid, tabs, 4 panel types (details/comments/attachments/activity)" },
  "component-navigation": { content: loadResource("component-navigation.md"), name: "Navigation Components", description: "Sidebar (248px/68px collapsed), topbar (glass effect), breadcrumb" },
  "component-forms": { content: loadResource("component-forms.md"), name: "Forms & Inputs", description: "Input base, search, textarea, comment box, select, filter chips" },
  "component-charts": { content: loadResource("component-charts.md"), name: "Chart Patterns", description: "Chart.js 4.4.0 config, palette, 4 chart types, tooltips, stat rows, chart card variants" },
  // New resources (v2.0)
  "system-instructions": { content: loadResource("system-instructions.md"), name: "System Instructions", description: "Regras enraizadas que dispensam instrução do user — aplicadas automaticamente em todo prompt" },
  "page-templates": { content: loadResource("page-templates.md"), name: "Page Templates", description: "4 templates HTML completos copiáveis: base, tabela, detalhe, gráficos" },
  "component-detail-page": { content: loadResource("component-detail-page.md"), name: "Detail Page Patterns", description: "Padrões .od-* e .od-detail-*: tabs, grid 2 colunas, detail sections, timeline, tags" },
  "component-legends": { content: loadResource("component-legends.md"), name: "Chart Legends", description: "3 padrões de legenda (rich, value, simple), doughnut center, stat row, JS helpers" },
  // New resources (v2.1)
  "component-analytics-cards": { content: loadResource("component-analytics-cards.md"), name: "Analytics Card Types", description: "6 analytics card types: Segmentation, Order Overview, User Activity, Top Countries, Channel Revenue, Asset Overview — anatomia, CSS, HTML templates" },
  "responsive": { content: loadResource("responsive.md"), name: "Responsive System", description: "4 breakpoints desktop-first (1279/1023/767/479px), sidebar auto-collapse, mobile offscreen, grid reflow, JS toggle" },
  // New resources (v2.2)
  "component-edit-page": { content: loadResource("component-edit-page.md"), name: "Edit Page Template", description: "Form page composition: step nav (.form-nav), form sections, field patterns (input/select/toggle), action footer — full HTML template copiável" },
};

// ── Token lookup data ────────────────────────────────────────────────
const TOKEN_DB = {
  // ── Surfaces ──
  "--bg": { dark: "#0f1014", light: "#f3f3f9", category: "surface", usage: "Fundo geral da página" },
  "--background": { dark: "#0f1014", light: "#f3f3f9", category: "surface", usage: "Fundo principal (alias de --bg)" },
  "--background-glass": { dark: "rgba(15,16,20,0.75)", light: "rgba(243,243,249,0.75)", category: "surface", usage: "Fundo com glass effect (topbar, overlays)" },
  "--card-bg": { dark: "#171920", light: "#ffffff", category: "surface", usage: "Fundo de cards" },
  "--card": { dark: "#171920", light: "#ffffff", category: "surface", usage: "Card background (alias)" },
  "--sidebar-bg": { dark: "#0b0c10", light: "#ffffff", category: "surface", usage: "Fundo da sidebar" },
  "--sidebar": { dark: "#0b0c10", light: "#ffffff", category: "surface", usage: "Sidebar background (alias)" },
  "--input-bg": { dark: "#12141a", light: "#f5f5fa", category: "surface", usage: "Fundo de inputs" },
  "--input": { dark: "#12141a", light: "#ffffff", category: "surface", usage: "Input background (alias)" },
  "--popover-bg": { dark: "#1c1e26", light: "#ffffff", category: "surface", usage: "Fundo de popovers" },
  "--popover": { dark: "#1c1e26", light: "#ffffff", category: "surface", usage: "Popover background (alias)" },
  "--elevated": { dark: "#22242c", light: "#ecedf2", category: "surface", usage: "Superfície elevada" },
  "--elevated-hover": { dark: "#2a2c34", light: "#e4e5eb", category: "surface", usage: "Superfície elevada em hover" },
  "--nav-hover-bg": { dark: "#14161c", light: "#e8ecf1", category: "surface", usage: "Hover de itens de navegação" },
  "--muted": { dark: "#12141a", light: "#f5f5fa", category: "surface", usage: "Muted background" },
  "--accent": { dark: "#22242c", light: "#ecedf2", category: "surface", usage: "Accent background" },
  "--surface-raised": { dark: "#20232b", light: "#ffffff", category: "surface", usage: "Superfície elevada genérica sobre --muted (tabs ativos, pills selecionadas)" },
  "--secondary": { dark: "#1e2028", light: "#ffffff", category: "surface", usage: "Secondary background" },

  // ── Semantic foreground ──
  "--foreground": { dark: "#f0f0f3", light: "#1a1a2e", category: "foreground", usage: "Texto principal (= --fg)" },
  "--card-foreground": { dark: "#f0f0f3", light: "#1a1a2e", category: "foreground", usage: "Texto em cards" },
  "--popover-foreground": { dark: "#b0b0ba", light: "#555568", category: "foreground", usage: "Texto em popovers" },
  "--muted-foreground": { dark: "#6e6e7a", light: "#8b8ba0", category: "foreground", usage: "Texto atenuado (muted)" },
  "--accent-foreground": { dark: "#f0f0f3", light: "#1a1a2e", category: "foreground", usage: "Texto em accent" },
  "--secondary-foreground": { dark: "#8e8e9a", light: "#6e6e82", category: "foreground", usage: "Texto secundário (em secondary bg)" },

  // ── Foreground scale (14 níveis) ──
  "--fg": { dark: "#f0f0f3", light: "#1a1a2e", category: "foreground", usage: "Texto principal" },
  "--fg-strong": { dark: "#e2e2e8", light: "#2a2a3e", category: "foreground", usage: "Ênfase forte" },
  "--fg-secondary": { dark: "#c8c8d0", light: "#3a3a50", category: "foreground", usage: "Texto secundário" },
  "--fg-tooltip": { dark: "#b0b0ba", light: "#555568", category: "foreground", usage: "Texto de tooltips" },
  "--fg-hover": { dark: "#a0a0ac", light: "#5e5e72", category: "foreground", usage: "Texto em hover" },
  "--fg-tertiary": { dark: "#8e8e9a", light: "#6e6e82", category: "foreground", usage: "Texto terciário" },
  "--fg-muted": { dark: "#6e6e7a", light: "#8b8ba0", category: "foreground", usage: "Texto atenuado" },
  "--fg-dim": { dark: "#5e5e6a", light: "#9e9eb2", category: "foreground", usage: "Texto reduzido (placeholders)" },
  "--fg-faint": { dark: "#4e4e5a", light: "#b0b0c0", category: "foreground", usage: "Texto muito sutil (timestamps)" },
  "--fg-ghost": { dark: "#3e3e4a", light: "#c4c4d0", category: "foreground", usage: "Texto quase invisível" },
  "--fg-hint": { dark: "#34343e", light: "#d0d0da", category: "foreground", usage: "Dicas visuais" },
  "--fg-decoration": { dark: "#24242c", light: "#e0e0e8", category: "foreground", usage: "Elementos decorativos" },
  "--fg-whisper": { dark: "#2e2e36", light: "#d8d8e2", category: "foreground", usage: "Sussurro visual" },
  "--fg-disabled": { dark: "#282830", light: "#dcdce4", category: "foreground", usage: "Estado desabilitado" },

  // ── Foreground alpha ──
  "--fg-30": { dark: "rgba(240,240,243,0.30)", light: "rgba(26,26,46,0.30)", category: "foreground", usage: "Foreground 30% opacity" },
  "--fg-40": { dark: "rgba(240,240,243,0.40)", light: "rgba(26,26,46,0.40)", category: "foreground", usage: "Foreground 40% opacity" },
  "--fg-50": { dark: "rgba(240,240,243,0.50)", light: "rgba(26,26,46,0.50)", category: "foreground", usage: "Foreground 50% opacity" },
  "--fg-60": { dark: "rgba(240,240,243,0.60)", light: "rgba(26,26,46,0.60)", category: "foreground", usage: "Foreground 60% opacity" },
  "--fg-70": { dark: "rgba(240,240,243,0.70)", light: "rgba(26,26,46,0.70)", category: "foreground", usage: "Foreground 70% opacity" },
  "--fg-80": { dark: "rgba(240,240,243,0.80)", light: "rgba(26,26,46,0.80)", category: "foreground", usage: "Foreground 80% opacity" },

  // ── Brand / Primary ──
  "--primary": { dark: "#00c97a", light: "#338449", category: "brand", usage: "Ações primárias, CTAs, estados ativos" },
  "--primary-fg": { dark: "#000000", light: "#ffffff", category: "brand", usage: "Texto sobre fundo primary" },
  "--primary-7": { dark: "rgba(0,201,122,0.07)", light: "rgba(51,132,73,0.07)", category: "brand", usage: "Primary 7% — background sutil" },
  "--primary-8": { dark: "rgba(0,201,122,0.08)", light: "rgba(51,132,73,0.08)", category: "brand", usage: "Primary 8% — nav item ativo" },
  "--primary-10": { dark: "rgba(0,201,122,0.10)", light: "rgba(51,132,73,0.10)", category: "brand", usage: "Primary 10% — badge positivo bg" },
  "--primary-12": { dark: "rgba(0,201,122,0.12)", light: "rgba(51,132,73,0.12)", category: "brand", usage: "Primary 12% — background hover" },
  "--primary-15": { dark: "rgba(0,201,122,0.15)", light: "rgba(51,132,73,0.15)", category: "brand", usage: "Primary 15% — destaque forte" },
  "--primary-20": { dark: "rgba(0,201,122,0.20)", light: "rgba(51,132,73,0.20)", category: "brand", usage: "Primary 20% — destaque máximo" },
  "--primary-70": { dark: "rgba(0,201,122,0.70)", light: "rgba(51,132,73,0.70)", category: "brand", usage: "Primary 70% — texto semi-transparente" },

  // ── Status ──
  "--destructive": { dark: "#ef4444", light: "#dc2626", category: "status", usage: "Erros, exclusões, quedas" },
  "--destructive-8": { dark: "rgba(239,68,68,0.08)", light: "rgba(220,38,38,0.08)", category: "status", usage: "Destructive background sutil" },
  "--destructive-10": { dark: "rgba(239,68,68,0.10)", light: "rgba(220,38,38,0.10)", category: "status", usage: "Destructive badge background" },
  "--warning": { dark: "#f6b51e", light: "#d97706", category: "status", usage: "Avisos, alertas" },
  "--warning-8": { dark: "rgba(246,181,30,0.08)", light: "rgba(217,119,6,0.08)", category: "status", usage: "Warning background sutil" },
  "--warning-10": { dark: "rgba(246,181,30,0.10)", light: "rgba(217,119,6,0.10)", category: "status", usage: "Warning badge background" },
  "--info": { dark: "#8754ec", light: "#7c3aed", category: "status", usage: "Informações, dados auxiliares" },
  "--info-8": { dark: "rgba(135,84,236,0.08)", light: "rgba(124,58,237,0.08)", category: "status", usage: "Info background sutil" },
  "--info-10": { dark: "rgba(135,84,236,0.10)", light: "rgba(124,58,237,0.10)", category: "status", usage: "Info badge background" },
  "--chart-2": { dark: "#7c6cff", light: "#6c5ce7", category: "status", usage: "Cor secundária de gráficos" },

  // ── Borders ──
  "--border": { dark: "#1a1c24", light: "#e4e5eb", category: "border", usage: "Borda padrão" },
  "--border-separator": { dark: "rgba(255,255,255,0.04)", light: "rgba(0,0,0,0.06)", category: "border", usage: "Separadores sutis" },
  "--border-subtle": { dark: "rgba(255,255,255,0.06)", light: "rgba(0,0,0,0.08)", category: "border", usage: "Bordas discretas" },
  "--border-soft": { dark: "rgba(255,255,255,0.10)", light: "rgba(0,0,0,0.12)", category: "border", usage: "Bordas suaves" },
  "--border-structural": { dark: "#1a1c24", light: "#e4e5eb", category: "border", usage: "Bordas estruturais (cards, divisões)" },
  "--border-strong": { dark: "rgba(255,255,255,0.20)", light: "rgba(0,0,0,0.20)", category: "border", usage: "Bordas fortes" },
  "--border-focus": { dark: "#363846", light: "#bbbdc6", category: "border", usage: "Bordas de foco" },
  "--border-tooltip": { dark: "#2e3040", light: "#d4d6de", category: "border", usage: "Bordas de tooltips" },
  "--input-border": { dark: "rgba(255,255,255,0.06)", light: "#e4e5eb", category: "border", usage: "Borda de inputs" },
  "--popover-border": { dark: "#2e3040", light: "#d4d6de", category: "border", usage: "Borda de popovers" },
  "--sidebar-border": { dark: "#1a1c24", light: "#e4e5eb", category: "border", usage: "Borda da sidebar" },
  "--ring": { dark: "#363846", light: "#bbbdc6", category: "border", usage: "Focus ring (outline de foco)" },

  // ── Overlays ──
  "--overlay-3": { dark: "rgba(255,255,255,0.03)", light: "rgba(26,26,46,0.02)", category: "overlay", usage: "Overlay mínimo (table header, row hover)" },
  "--overlay-4": { dark: "rgba(255,255,255,0.04)", light: "rgba(26,26,46,0.03)", category: "overlay", usage: "Overlay sutil" },
  "--overlay-5": { dark: "rgba(255,255,255,0.05)", light: "rgba(26,26,46,0.04)", category: "overlay", usage: "Hover de outline buttons" },
  "--overlay-6": { dark: "rgba(255,255,255,0.06)", light: "rgba(26,26,46,0.05)", category: "overlay", usage: "Overlay médio" },
  "--overlay-7": { dark: "rgba(255,255,255,0.07)", light: "rgba(26,26,46,0.06)", category: "overlay", usage: "Overlay médio-forte" },
  "--overlay-8": { dark: "rgba(255,255,255,0.08)", light: "rgba(26,26,46,0.07)", category: "overlay", usage: "Hover de default buttons" },
  "--overlay-10": { dark: "rgba(255,255,255,0.10)", light: "rgba(26,26,46,0.09)", category: "overlay", usage: "Overlay forte" },
  "--overlay-12": { dark: "rgba(255,255,255,0.12)", light: "rgba(26,26,46,0.11)", category: "overlay", usage: "Overlay máximo" },
  "--overlay-22": { dark: "rgba(255,255,255,0.22)", light: "rgba(26,26,46,0.20)", category: "overlay", usage: "Overlay extra forte" },

  // ── Shadows ──
  "--shadow-card": { value: "0 1px 2px rgba(0,0,0,0.06), 0 4px 12px rgba(0,0,0,0.10)", category: "shadow", usage: "Sombra padrão de cards" },
  "--shadow-card-hover": { value: "0 4px 8px rgba(0,0,0,0.10), 0 8px 24px rgba(0,0,0,0.14)", category: "shadow", usage: "Sombra de card em hover" },
  "--shadow-popover": { value: "0 8px 32px rgba(0,0,0,0.40)", category: "shadow", usage: "Sombra de popovers e modais" },

  // ── Spacing ──
  "--space-xs": { value: "4px", category: "spacing", usage: "Gaps mínimos" },
  "--space-sm": { value: "8px", category: "spacing", usage: "Espaçamento pequeno" },
  "--space-md": { value: "12px", category: "spacing", usage: "Espaçamento médio" },
  "--space-lg": { value: "16px", category: "spacing", usage: "Espaçamento padrão" },
  "--space-xl": { value: "20px", category: "spacing", usage: "Espaçamento grande" },
  "--space-2xl": { value: "24px", category: "spacing", usage: "Extra grande" },
  "--space-3xl": { value: "32px", category: "spacing", usage: "Máximo" },

  // ── Radius ──
  "--radius-xs": { value: "6px", category: "radius", usage: "Tags, chips, badges" },
  "--radius-sm": { value: "8px", category: "radius", usage: "Botões, inputs" },
  "--radius-md": { value: "12px", category: "radius", usage: "Cards, modais" },
  "--radius-lg": { value: "16px", category: "radius", usage: "Containers grandes" },
  "--radius-pill": { value: "9999px", category: "radius", usage: "Pills, avatares" },

  // ── Typography (9 tokens) ──
  "--text-display": { value: "28px", category: "typography", usage: "Títulos grandes de página, hero values" },
  "--text-lg": { value: "22px", category: "typography", usage: "Valores destaque, donut centers, overview stats" },
  "--text-title": { value: "20px", category: "typography", usage: "Títulos de seção, headings de card" },
  "--text-heading": { value: "18px", category: "typography", usage: "Stat values, drawer titles, legend numbers" },
  "--text-subheading": { value: "15px", category: "typography", usage: "Card titles, section headings, brand name" },
  "--text-body": { value: "14px", category: "typography", usage: "Texto padrão, parágrafos" },
  "--text-sm": { value: "13px", category: "typography", usage: "Texto pequeno (botões, labels)" },
  "--text-caption": { value: "12px", category: "typography", usage: "Legendas, captions, metadados" },
  "--text-xs": { value: "11px", category: "typography", usage: "Badges, tags, indicadores compactos" },

  // ── On-solid ──
  "--on-solid": { value: "#ffffff", category: "foreground", usage: "Texto branco sobre fundos sólidos coloridos (botões, badges). NUNCA use #fff — sempre var(--on-solid)" },

  // ── Transition ──
  "--ease-out": { value: "cubic-bezier(0.16, 1, 0.3, 1)", category: "transition", usage: "Timing function para todas as transições" },

  // ── Sidebar tokens ──
  "--sidebar-foreground": { dark: "#4e4e5a", light: "#8b8ba0", category: "sidebar", usage: "Texto da sidebar" },
  "--sidebar-muted": { dark: "#3e3e4a", light: "#9e9eb2", category: "sidebar", usage: "Texto muted da sidebar" },
  "--sidebar-accent": { dark: "#14161c", light: "#e8ecf1", category: "sidebar", usage: "Accent da sidebar" },
};

// ── Create MCP Server ────────────────────────────────────────────────
const server = new McpServer({
  name: "iGreenMCP Design System",
  version: "2.4.0",
  description: "Style guide MCP server para garantir consistência visual em projetos criados com IA. 19 resources, 6 tools, 3 prompts. Transport: stdio (IDEs) + HTTP (deploy)."
});

// ── Resources ────────────────────────────────────────────────────────
// Resources são fontes de dados que o agente pode ler

for (const [key, resource] of Object.entries(RESOURCES)) {
  server.resource(
    key,
    `design://${key}`,
    { description: resource.description, mimeType: "text/markdown" },
    async () => ({
      contents: [{
        uri: `design://${key}`,
        mimeType: "text/markdown",
        text: resource.content
      }]
    })
  );
}

// Full guide resource (all combined)
server.resource(
  "full-guide",
  "design://full-guide",
  { description: "Guia completo do design system (todos os recursos combinados)", mimeType: "text/markdown" },
  async () => ({
    contents: [{
      uri: "design://full-guide",
      mimeType: "text/markdown",
      text: Object.values(RESOURCES).map(r => r.content).join("\n\n---\n\n")
    }]
  })
);

// ── Tools ────────────────────────────────────────────────────────────

// Tool 1: Lookup a specific token
server.tool(
  "get_token",
  "Busca informações sobre um token de design específico (cor, spacing, radius, tipografia). Retorna valores dark/light, categoria e uso recomendado.",
  { token_name: z.string().describe("Nome do token CSS, ex: --primary, --space-lg, --radius-md") },
  async ({ token_name }) => {
    const name = token_name.startsWith("--") ? token_name : `--${token_name}`;
    const token = TOKEN_DB[name];
    if (!token) {
      const suggestions = Object.keys(TOKEN_DB)
        .filter(k => k.includes(token_name.replace("--", "")))
        .slice(0, 5);
      return {
        content: [{
          type: "text",
          text: `Token "${name}" não encontrado.\n\nTokens similares:\n${suggestions.map(s => `- ${s}`).join("\n") || "Nenhum encontrado. Use list_tokens para ver categorias disponíveis."}`
        }]
      };
    }
    const info = [`**${name}**`, `- Categoria: ${token.category}`, `- Uso: ${token.usage}`];
    if (token.dark) info.push(`- Dark: ${token.dark}`, `- Light: ${token.light}`);
    if (token.value) info.push(`- Valor: ${token.value}`);
    return { content: [{ type: "text", text: info.join("\n") }] };
  }
);

// Tool 2: List tokens by category
server.tool(
  "list_tokens",
  "Lista todos os tokens de design de uma categoria específica.",
  { category: z.enum(["surface", "brand", "status", "foreground", "border", "spacing", "radius", "typography", "overlay", "shadow", "transition", "sidebar"]).describe("Categoria de tokens") },
  async ({ category }) => {
    const tokens = Object.entries(TOKEN_DB)
      .filter(([, v]) => v.category === category)
      .map(([name, v]) => {
        const val = v.value ? v.value : `dark: ${v.dark} | light: ${v.light}`;
        return `| \`${name}\` | ${val} | ${v.usage} |`;
      });
    const header = "| Token | Valor | Uso |\n|-------|-------|-----|";
    return {
      content: [{ type: "text", text: `## Tokens: ${category}\n\n${header}\n${tokens.join("\n")}` }]
    };
  }
);

// Tool 3: Validate CSS against design system
server.tool(
  "validate_css",
  "Analisa um trecho de CSS e identifica violações das regras do design system (cores hardcoded, spacing fora da escala, radius incorreto, etc).",
  { css_code: z.string().describe("Trecho de CSS para validar") },
  async ({ css_code }) => {
    const issues = [];

    // Check for hardcoded hex colors
    const hexMatches = css_code.match(/#[0-9a-fA-F]{3,8}\b/g) || [];
    const allowedHex = ["#000", "#000000"];
    for (const hex of hexMatches) {
      const lower = hex.toLowerCase();
      if (lower === "#fff" || lower === "#ffffff") {
        issues.push(`⚠️ Branco hardcoded: ${hex} — Use var(--on-solid) para texto sobre fundos sólidos, ou var(--fg) para texto geral`);
      } else if (!allowedHex.includes(lower)) {
        issues.push(`⚠️ Cor hardcoded encontrada: ${hex} — Use um token CSS (ex: var(--fg), var(--primary))`);
      }
    }

    // Check for hardcoded pixel values in spacing contexts
    const spacingProps = ["padding", "margin", "gap"];
    for (const prop of spacingProps) {
      const regex = new RegExp(`${prop}[^:]*:\\s*([^;]+)`, "gi");
      const matches = [...css_code.matchAll(regex)];
      for (const match of matches) {
        const val = match[1].trim();
        if (/\d+px/.test(val) && !val.includes("var(")) {
          const pxValues = val.match(/(\d+)px/g) || [];
          const validPx = ["0px", "4px", "8px", "12px", "16px", "20px", "24px", "32px"];
          for (const px of pxValues) {
            if (!validPx.includes(px) && px !== "0px") {
              issues.push(`⚠️ Spacing fora da escala: ${prop}: ${val} — Use tokens (--space-xs a --space-3xl)`);
              break;
            }
          }
        }
      }
    }

    // Check for wrong border-radius values
    const radiusRegex = /border-radius:\s*([^;]+)/gi;
    const radiusMatches = [...css_code.matchAll(radiusRegex)];
    for (const match of radiusMatches) {
      const val = match[1].trim();
      if (/\d+px/.test(val) && !val.includes("var(")) {
        const validRadius = ["0px", "6px", "8px", "12px", "16px", "9999px"];
        const pxVal = val.match(/(\d+)px/);
        if (pxVal && !validRadius.includes(pxVal[0])) {
          issues.push(`⚠️ Border-radius fora da escala: ${val} — Use tokens (--radius-xs a --radius-pill)`);
        }
      }
    }

    // Check for wrong transition timing
    const transitionRegex = /transition[^:]*:[^;]+/gi;
    const transMatches = [...css_code.matchAll(transitionRegex)];
    for (const match of transMatches) {
      const val = match[0];
      if ((val.includes("ease-in") || val.includes("ease-out") || val.includes("linear")) && !val.includes("var(--ease-out)")) {
        issues.push(`⚠️ Timing function incorreta: "${val}" — Use var(--ease-out)`);
      }
    }

    // Check for font-size outside scale
    const fontRegex = /font-size:\s*(\d+)px/gi;
    const fontMatches = [...css_code.matchAll(fontRegex)];
    const validFontSizes = [11, 12, 13, 14, 15, 18, 20, 22, 28];
    for (const match of fontMatches) {
      const size = parseInt(match[1]);
      if (!validFontSizes.includes(size)) {
        issues.push(`⚠️ Font-size fora da escala: ${size}px — Tamanhos válidos: 11, 12, 13, 14, 15, 18, 20, 22, 28px (use tokens --text-xs a --text-display)`);
      }
    }

    if (issues.length === 0) {
      return { content: [{ type: "text", text: "✅ Nenhuma violação encontrada! O CSS segue as regras do design system." }] };
    }
    return {
      content: [{ type: "text", text: `Encontradas ${issues.length} violação(ões):\n\n${issues.join("\n\n")}` }]
    };
  }
);

// Tool 4: Suggest component implementation
server.tool(
  "suggest_component",
  "Sugere a implementação visual de um componente baseado nos padrões do design system. Retorna tokens, espaçamento, cores e estrutura recomendada.",
  { component_type: z.enum(["card", "button", "table", "kpi", "sidebar", "topbar", "drawer", "badge", "chip", "input", "filter-bar", "pagination", "chart", "detail-page", "stat-row", "legend", "page-layout", "segmentation", "order-overview", "user-activity", "top-countries", "channel-revenue", "asset-overview", "edit-page"]).describe("Tipo de componente") },
  async ({ component_type }) => {
    const specs = {
      card: `## Card

**Background:** var(--card-bg)
**Border:** 1px solid var(--border-structural)
**Border-radius:** var(--radius-md) → 12px
**Shadow:** var(--shadow-card)
**Padding:** var(--space-xl) → 20px
**Hover shadow:** var(--shadow-card-hover)

**Estrutura:**
- Header: flex, space-between, margin-bottom var(--space-md)
- Title: font-size var(--text-body), weight 600, color var(--fg)
- Subtitle: font-size var(--text-caption), weight 400, color var(--fg-muted)
- Actions: buttons ghost/icon no header à direita`,

      button: `## Button

**Tamanhos:**
| Size | Class | Height | Padding | Font |
|------|-------|--------|---------|------|
| xs | .btn--xs | 28px | 0 10px | 11px |
| sm | .btn--sm | 32px | 0 12px | 12px |
| md | (default) | 36px | 0 16px | 13px |
| lg | .btn--lg | 42px | 0 20px | 14px |

**Border-radius:** var(--radius-sm) → 8px
**Transition:** all 150ms var(--ease-out)
**Font-weight:** 500

**Variantes (7):**
| Variant | Class | Background | Text | Border |
|---------|-------|-----------|------|--------|
| Default | .btn | var(--secondary) | var(--secondary-foreground) | var(--border) |
| Solid | .btn--solid | var(--primary) | var(--primary-fg) | none |
| Outline | .btn--outline | transparent | var(--foreground) | var(--border-soft) |
| Ghost | .btn--ghost | transparent | var(--muted-foreground) | none |
| Destructive | .btn--destructive | var(--destructive) | #fff | none |
| Warning | .btn--warning | var(--warning) | #000 | none |
| Info | .btn--info | var(--info) | #fff | none |

**Icon button:** .btn--icon → square (36×36 default), padding 0, display flex center
**Icon + text:** <svg> + <span> dentro do .btn (gap 6px)

**Estados:**
- Hover solid: opacity 0.88
- Hover outline/default: border-color var(--border-soft), bg var(--overlay-5)
- Hover ghost: bg var(--overlay-8)
- Active: transform scale(0.97)
- Focus: outline 2px solid var(--ring), offset 2px
- Disabled: opacity 0.5, pointer-events none
- Loading: .btn--loading (text transparent, spinner ::after 16px)

\`\`\`html
<button class="btn btn--solid">Save</button>
<button class="btn btn--outline btn--sm">Cancel</button>
<button class="btn btn--icon"><svg>...</svg></button>
<button class="btn btn--solid btn--loading">Saving...</button>
\`\`\``,

      table: `## Data Table

**Container:** Card full-width
**Header:** bg var(--overlay-3), text var(--fg-muted), font var(--text-caption), uppercase
**Row:** border-bottom var(--border-separator), hover bg var(--overlay-3)
**Cell padding:** var(--space-md) vertical, var(--space-lg) horizontal
**Tabs:** border-bottom 2px var(--primary) na tab ativa
**Filter chips:** bg var(--elevated), radius var(--radius-xs)`,

      kpi: `## KPI Card

Herda de Card +
**Label:** var(--text-caption), var(--fg-muted), uppercase
**Value:** var(--text-display) ou var(--text-title), weight 700, var(--fg)
**Badge positivo:** text var(--primary), bg var(--primary-10), radius pill
**Badge negativo:** text var(--destructive), bg var(--destructive-10), radius pill
**Sparkline:** SVG inline, stroke var(--primary)`,

      sidebar: `## Sidebar

**Width:** 248px (expanded), 68px (collapsed)
**Background:** var(--sidebar-bg)
**Border-right:** 1px solid var(--sidebar-border)

**Nav item:**
- Height: 40px, padding 0 var(--space-md), radius var(--radius-sm)
- Text: var(--sidebar-foreground), var(--text-sm)
- Hover: bg var(--nav-hover-bg)
- Active: border-left 2px var(--primary), text var(--primary), bg var(--primary-8)`,

      topbar: `## Topbar

**Position:** fixed, topo da área main
**Background:** var(--background-glass) + backdrop-filter: blur(16px)
**Border-bottom:** 1px var(--border-separator)
**Height:** ~56px
**Layout:** flex, space-between, align-center`,

      drawer: `## Drawer

**Width:** 620px, posição fixa à direita
**Background:** var(--card-bg)
**Border-left:** 1px var(--border-structural)
**Overlay:** bg rgba(0,0,0,0.5), backdrop-filter blur
**Transition:** transform 300ms var(--ease-out)
**Header:** flex, icon + title + close button
**Body:** overflow-y auto, com tabs`,

      badge: `## Badge / Status Chip

**Border-radius:** var(--radius-pill) → 999px
**Padding:** 2px 8px (badge) | 4px 10px (status-chip)
**Font:** var(--text-xs) → 11px, weight 500

**Badge de transação (.badge):**
| Class | Background | Text | Uso |
|-------|-----------|------|-----|
| .badge.buy | var(--primary-10) | var(--primary) | Active, Buy, Success |
| .badge.sell | var(--destructive-10) | var(--destructive) | Inactive, Sell, Error |
| .badge.hold | var(--warning-10) | var(--warning) | Pending, Hold, Warning |

**Status chip (.status-chip):**
| Class | Uso |
|-------|-----|
| .status-chip.s-delivered | Delivered (green dot + text) |
| .status-chip.s-shipped | Shipped (blue dot + text) |
| .status-chip.s-pending | Pending (yellow dot + text) |
| .status-chip.s-cancelled | Cancelled (red dot + text) |

Dot: .s-dot (6×6px, border-radius 50%, inline before text)

**Change indicators:**
| Class | Text Color | Prefix |
|-------|-----------|--------|
| .chg-pos | var(--primary) | +/▲ |
| .chg-neg | var(--destructive) | -/▼ |
| .al-chg.up / .seg-chg.up | var(--primary) | + |
| .al-chg.dn / .seg-chg.dn | var(--destructive) | - |

\`\`\`html
<span class="badge buy">Active</span>
<span class="status-chip s-delivered"><span class="s-dot"></span>Delivered</span>
<span class="chg-pos">+2.4%</span>
\`\`\``,

      chip: `## Filter Chip

**Background:** var(--elevated)
**Border:** 1px var(--border-subtle)
**Border-radius:** var(--radius-xs) → 6px
**Padding:** var(--space-xs) var(--space-sm)
**Font:** var(--text-caption), var(--fg-secondary)
**Hover:** bg var(--elevated-hover)
**Removível:** ícone X, 12px`,

      input: `## Input

**Height:** 36px
**Background:** var(--input-bg)
**Border:** 1px var(--input-border)
**Border-radius:** var(--radius-sm) → 8px
**Padding:** 0 var(--space-lg)
**Font:** var(--text-sm), var(--fg)
**Placeholder:** var(--fg-dim)
**Focus:** border var(--ring), outline none
**Disabled:** opacity 0.5`,

      "filter-bar": `## Filter Bar

**Background:** var(--card), radius var(--radius-md), shadow var(--shadow-card)
**Padding:** var(--space-md) var(--space-xl)
**Layout:** flex, align-center, gap var(--space-md)

**Elementos:**
- .filter-label: caption size, fg-muted
- .presets: pill group, bg var(--muted), active has card bg + shadow
- .vdiv: 1px × 22px vertical divider
- .date-range-btn: h-32px, secondary bg, border, hover ring
- .filter-tags: pill tags, bg overlay-8, hover overlay-12
- .icon-btn: 36×36px square icon button
- .export-btn: labeled action button

📖 Ver resource: component-forms.md para filter chips`,

      pagination: `## Pagination

**Container (.pagination):**
- Layout: flex, space-between, align-center
- Border-top: 1px solid var(--border-separator)
- Margin-top: var(--space-lg), padding-top: var(--space-lg)

**Page info (.page-info):** var(--text-caption), var(--fg-muted)
**Page buttons (.pb):** 34×34px, radius-sm, border var(--border-subtle), bg var(--secondary)
**Active (.pb.active):** bg var(--primary), color var(--primary-fg), weight 700, border var(--primary)
**Hover (.pb:hover):** bg var(--overlay-10), border-color var(--border-soft)
**Arrows:** .pb com <svg> (chevron 14×14), aria-label="Previous"/"Next"
**Ellipsis:** .pb com "..." (pointer-events: none)

**Page size select (.page-select):**
- Height: 34px, padding 0 28px 0 10px
- Background: var(--secondary), border var(--border-subtle), radius-sm
- Custom chevron via background-image SVG
- Options: 10, 25, 50, 100

\`\`\`html
<div class="pagination">
  <span class="page-info">Showing 1-10 of 248</span>
  <div class="page-btns">
    <button class="pb" aria-label="Previous"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="15 18 9 12 15 6"/></svg></button>
    <button class="pb active">1</button>
    <button class="pb">2</button>
    <button class="pb">3</button>
    <button class="pb">...</button>
    <button class="pb">25</button>
    <button class="pb" aria-label="Next"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"/></svg></button>
  </div>
</div>
\`\`\``,

      chart: `## Chart (Chart.js 4.4.0)

**Paleta:** --primary (#2ecc71), --chart-2 (#3498db), --destructive, --warning, --info
**Area fill:** gradient primary 20% → 0% opacity
**Grid:** x hidden, y usa --border-separator, lineWidth 1
**Ticks:** Inter 11px, --fg-ghost color
**Tooltip:** --popover bg, --popover-border, radius 8px
**Legend:** sempre custom (nunca Chart.js built-in)

**Tipos:** line (tension 0.4), doughnut (cutout 72%), bar (borderRadius 4), sparkline (sem axes)
**Containers:** .chart-area, .donut-area, .ao-chart, .ov-chart, .ua-chart

📖 Ver resource: component-charts.md para configuração completa`,

      "detail-page": `## Detail Page (Order Detail pattern)

**Layout:** .od-header + .od-tabs + .od-grid (2 colunas)
**Prefixos:** .od-* (layout), .od-detail-* (seções internas)

**Componentes:**
- .od-header: flex, breadcrumb + title + actions
- .od-tabs: pill tabs (como .tbl-tabs)
- .od-grid: display grid, 2 colunas, gap --space-2xl
- .od-card: card bg, radius-md, shadow-card, padding --space-2xl
- .od-detail-header: icon (34px) + title + action link
- .od-detail-grid: 3 colunas (ou 2), label/value pairs
- .od-detail-label: text-caption, fg-muted
- .od-detail-value: text-sm, weight 500

📖 Ver resource: component-detail-page.md para HTML completo`,

      "stat-row": `## Stat Row (indicadores acima de gráficos)

**Container:** .ch-stat-row — flex, gap --space-sm, flex-wrap
**Box:** .ch-stat — flex: 1, background var(--muted), radius-sm, padding md/lg
**Label:** .ch-stat-label — text-xs, fg-muted, uppercase, letter-spacing 0.02em
**Value:** .ch-stat-val — text-heading (18px), weight 700, tabular-nums
**Change:** .ch-stat-chg.up (--primary), .ch-stat-chg.dn (--destructive)

**Regra:** TODA chart card com KPIs deve usar .ch-stat-row com background var(--muted).

📖 Ver resource: component-charts.md e component-legends.md`,

      legend: `## Chart Legends (3 tipos)

**OBRIGATÓRIO:** plugins: { legend: { display: false } } em TODO Chart.js

**1. Rich (.ch-lg-rich)** — Doughnuts, pies
- Row: dot + nome + valor + badge de variação
- JS: richLegend(id, items)

**2. Value (.ch-lg-vals)** — Bar charts
- Colunas centradas: dot + label + valor grande
- JS: valLegend(id, items)

**3. Simple (.ch-lg-simple)** — Line, radar
- Inline: dot + label apenas
- JS: simpleLegend(id, items)

**Doughnut Center:** .ch-donut-center — absolute centered, text-lg value + text-xs subtitle

📖 Ver resource: component-legends.md para CSS e JS helpers completos`,

      "page-layout": `## Page Layout (sidebar + topbar + body)

**Estrutura obrigatória:**
\`\`\`
<div class="app">
  <aside class="sidebar">...</aside>
  <div class="main">
    <header class="topbar">...</header>
    <div class="body">CONTEÚDO</div>
  </div>
</div>
\`\`\`

**Sidebar:** 248px (68px collapsed), var(--sidebar) bg
**Topbar:** glass effect (backdrop-filter blur), sticky
**Body:** overflow-y auto, padding --space-3xl --space-2xl

**Regra:** TODA página usa este layout. Copie o template HTML de component-navigation.md ou page-templates.md

📖 Ver resources: component-navigation.md (HTML template), page-templates.md (4 templates completos)`,

      segmentation: `## Customer Segmentation Card

**Row:** .insights-row (1fr — coluna esquerda)
**Prefixo:** .seg-*

**Estrutura:** Card com header + donut chart + lista de segmentos
**Donut center:** .seg-center (absolute centered, value + subtitle)
**Lista:** .seg-list com .seg-row (dot + nome + porcentagem + badge de mudança)
**Badge:** .seg-chg.up (--primary), .seg-chg.dn (--destructive)

📖 Ver resource: component-analytics-cards.md para CSS e HTML completo`,

      "order-overview": `## Order Overview Card

**Row:** .insights-row (2fr — coluna central, a maior)
**Prefixo:** .ov-*

**Estrutura:** Card com header (título + year select) + stat boxes + bar chart
**Stats:** .ov-stat-row com 3× .ov-stat-box (label + value grande + badge)
**Select:** .ov-year-select (mini dropdown inline)
**Chart:** .ov-chart com bar chart (Chart.js)
**Legend:** .ch-lg-vals

📖 Ver resource: component-analytics-cards.md para CSS e HTML completo`,

      "user-activity": `## User Activity Card

**Row:** .insights-row (1fr — coluna direita)
**Prefixo:** .ua-*

**Estrutura:** Card com header + stat compacto + line chart
**Stat:** .ua-stat (value grande + badge inline)
**Chart:** .ua-chart (flex: 1, min-height: 80px)

📖 Ver resource: component-analytics-cards.md para CSS e HTML completo`,

      "top-countries": `## Top Countries Card

**Row:** .geo-row (2fr — coluna esquerda)
**Prefixo:** .tc-*

**Estrutura:** Card com header + body split (mapa + lista)
**Body:** .tc-body (flex row) = .tc-map (flex 1) + .tc-list (240px)
**Lista:** .tc-row com flag + nome + valor + badge de mudança
**Mapa:** SVG ou imagem do mapa-múndi

📖 Ver resource: component-analytics-cards.md para CSS e HTML completo`,

      "channel-revenue": `## Channel Revenue Card

**Row:** .geo-row (1fr — coluna direita)
**Prefixo:** .cr-*

**Estrutura:** Card com header + total + channel list
**Total:** .cr-total (font-size 26px, weight 700)
**Canais:** .cr-channels (flex column, gap 16px)
**Cada canal:** .cr-channel (icon + info + value) com .cr-bar progress

📖 Ver resource: component-analytics-cards.md para CSS e HTML completo`,

      "asset-overview": `## Asset Overview / Distribution Card

**Row:** .ao-row (2fr info + 3fr chart)
**Prefixo:** .ao-*, .dist-*

**Estrutura (slot esquerdo):** Total Assets + distribution list
**Distribution:** .dist-row com dot + label + porcentagem + barra de progresso
**Estrutura (slot direito):** Total Investments chart (line/bar)
**Chart:** .ao-chart-area com legends + canvas

📖 Ver resource: component-analytics-cards.md para CSS e HTML completo`,
      "edit-page": `## Edit / Form Page

**Layout:** .form-layout (grid: 320px nav + 1fr content)
**Nav:** .form-nav com .form-nav-item steps (icon + title + desc)
**Sections:** .form-section (card) com .form-section-title
**Fields:** .form-row (2-col) > .form-group > .form-label + .form-input (40px)
**Select:** .form-select (40px, custom chevron SVG)
**Phone:** .form-phone-row (120px code + 1fr number)
**Toggle:** .form-toggle (44x24px switch) em .form-toggle-group
**Footer:** .form-actions (flex-end: Cancel + Save)
**Responsive:** Colapsa para 1 coluna em ≤479px

Patterns: New entity (Add Customer), Edit existing (reutiliza .od-detail-section), Settings (sem nav)

📖 Ver resource: component-edit-page.md para CSS, anatomia e HTML template completo
📖 Ver resource: component-forms.md para todos os inputs, checkbox, toggle e page-select`
    };

    return {
      content: [{ type: "text", text: specs[component_type] || "Componente não encontrado." }]
    };
  }
);

// Tool 5: Generate complete theme CSS
server.tool(
  "generate_theme_css",
  "Gera o arquivo CSS completo com todas as variáveis do design system (tokens de cor, tipografia, spacing, radius, shadows, transitions). Pronto para salvar como arquivo separado no projeto. Use este tool sempre que iniciar um projeto novo para criar o arquivo de theme base.",
  { include_light_theme: z.boolean().default(true).describe("Incluir variáveis do light theme") },
  async ({ include_light_theme }) => {
    const css = `/* ============================================
   iGreen Design System — Theme Variables
   Gerado via MCP: igreen-design
   ============================================ */

/* ── Base (Dark Theme — Default) ── */
:root {
  /* Surfaces */
  --bg: #0f1014;
  --background: #0f1014;
  --background-glass: rgba(15, 16, 20, 0.75);
  --card-bg: #171920;
  --card: #171920;
  --sidebar-bg: #0b0c10;
  --sidebar: #0b0c10;
  --input-bg: #12141a;
  --input: #12141a;
  --popover-bg: #1c1e26;
  --popover: #1c1e26;
  --elevated: #22242c;
  --elevated-hover: #2a2c34;
  --nav-hover-bg: #14161c;
  --muted: #12141a;
  --surface-raised: #20232b;
  --accent: #22242c;
  --secondary: #1e2028;

  /* Foreground scale */
  --fg: #f0f0f3;
  --foreground: #f0f0f3;
  --fg-strong: #e2e2e8;
  --fg-secondary: #c8c8d0;
  --fg-tooltip: #b0b0ba;
  --fg-hover: #a0a0ac;
  --fg-tertiary: #8e8e9a;
  --fg-muted: #6e6e7a;
  --fg-dim: #5e5e6a;
  --fg-faint: #4e4e5a;
  --fg-ghost: #3e3e4a;
  --fg-hint: #34343e;
  --fg-decoration: #24242c;
  --fg-whisper: #2e2e36;
  --fg-disabled: #282830;

  /* Semantic foreground */
  --card-foreground: #f0f0f3;
  --popover-foreground: #b0b0ba;
  --muted-foreground: #6e6e7a;
  --accent-foreground: #f0f0f3;
  --secondary-foreground: #8e8e9a;

  /* Foreground alpha */
  --fg-30: rgba(240, 240, 243, 0.30);
  --fg-40: rgba(240, 240, 243, 0.40);
  --fg-45: rgba(240, 240, 243, 0.45);
  --fg-50: rgba(240, 240, 243, 0.50);
  --fg-60: rgba(240, 240, 243, 0.60);
  --fg-70: rgba(240, 240, 243, 0.70);
  --fg-80: rgba(240, 240, 243, 0.80);

  /* Primary / Brand */
  --primary: #00c97a;
  --primary-fg: #000000;
  --primary-7: rgba(0, 201, 122, 0.07);
  --primary-8: rgba(0, 201, 122, 0.08);
  --primary-10: rgba(0, 201, 122, 0.10);
  --primary-12: rgba(0, 201, 122, 0.12);
  --primary-15: rgba(0, 201, 122, 0.15);
  --primary-20: rgba(0, 201, 122, 0.20);
  --primary-70: rgba(0, 201, 122, 0.70);

  /* Status */
  --destructive: #ef4444;
  --destructive-8: rgba(239, 68, 68, 0.08);
  --destructive-10: rgba(239, 68, 68, 0.10);
  --warning: #f6b51e;
  --warning-8: rgba(246, 181, 30, 0.08);
  --warning-10: rgba(246, 181, 30, 0.10);
  --info: #8754ec;
  --info-8: rgba(135, 84, 236, 0.08);
  --info-10: rgba(135, 84, 236, 0.10);
  --chart-2: #7c6cff;

  /* Borders */
  --border: #1a1c24;
  --border-structural: #1a1c24;
  --border-separator: rgba(255, 255, 255, 0.04);
  --border-subtle: rgba(255, 255, 255, 0.06);
  --border-soft: rgba(255, 255, 255, 0.10);
  --border-strong: rgba(255, 255, 255, 0.20);
  --border-focus: #363846;
  --border-tooltip: #2e3040;
  --input-border: rgba(255, 255, 255, 0.06);
  --popover-border: #2e3040;
  --sidebar-border: #1a1c24;
  --ring: #363846;

  /* Overlays (white in dark = lighten) */
  --overlay-3: rgba(255, 255, 255, 0.03);
  --overlay-4: rgba(255, 255, 255, 0.04);
  --overlay-5: rgba(255, 255, 255, 0.05);
  --overlay-6: rgba(255, 255, 255, 0.06);
  --overlay-7: rgba(255, 255, 255, 0.07);
  --overlay-8: rgba(255, 255, 255, 0.08);
  --overlay-10: rgba(255, 255, 255, 0.10);
  --overlay-12: rgba(255, 255, 255, 0.12);
  --overlay-22: rgba(255, 255, 255, 0.22);

  /* Shadows */
  --shadow-card: 0 1px 2px rgba(0,0,0,0.06), 0 4px 12px rgba(0,0,0,0.10);
  --shadow-card-hover: 0 4px 8px rgba(0,0,0,0.10), 0 8px 24px rgba(0,0,0,0.14);
  --shadow-popover: 0 8px 32px rgba(0,0,0,0.40);

  /* Sidebar */
  --sidebar-foreground: #4e4e5a;
  --sidebar-muted: #3e3e4a;
  --sidebar-accent: #14161c;

  /* Typography (9 tokens) */
  --text-display: 28px;
  --text-lg: 22px;
  --text-title: 20px;
  --text-heading: 18px;
  --text-subheading: 15px;
  --text-body: 14px;
  --text-sm: 13px;
  --text-caption: 12px;
  --text-xs: 11px;

  /* On-solid (texto branco sobre fundos sólidos) */
  --on-solid: #ffffff;

  /* Spacing (8px grid) */
  --space-xs: 4px;
  --space-sm: 8px;
  --space-md: 12px;
  --space-lg: 16px;
  --space-xl: 20px;
  --space-2xl: 24px;
  --space-3xl: 32px;

  /* Border Radius */
  --radius-xs: 6px;
  --radius-sm: 8px;
  --radius-md: 12px;
  --radius-lg: 16px;
  --radius-pill: 9999px;

  /* Transition */
  --ease-out: cubic-bezier(0.16, 1, 0.3, 1);
}
${include_light_theme ? `
/* ── Light Theme ── */
[data-theme="light"] {
  --bg: #f3f3f9;
  --background: #f3f3f9;
  --background-glass: rgba(243, 243, 249, 0.75);
  --card-bg: #ffffff;
  --card: #ffffff;
  --sidebar-bg: #ffffff;
  --sidebar: #ffffff;
  --input-bg: #f5f5fa;
  --input: #ffffff;
  --popover-bg: #ffffff;
  --popover: #ffffff;
  --elevated: #ecedf2;
  --elevated-hover: #e4e5eb;
  --nav-hover-bg: #e8ecf1;
  --muted: #f5f5fa;
  --surface-raised: #ffffff;
  --accent: #ecedf2;
  --secondary: #ffffff;

  --fg: #1a1a2e;
  --foreground: #1a1a2e;
  --fg-strong: #2a2a3e;
  --fg-secondary: #3a3a50;
  --fg-tooltip: #555568;
  --fg-hover: #5e5e72;
  --fg-tertiary: #6e6e82;
  --fg-muted: #8b8ba0;
  --fg-dim: #9e9eb2;
  --fg-faint: #b0b0c0;
  --fg-ghost: #c4c4d0;
  --fg-hint: #d0d0da;
  --fg-decoration: #e0e0e8;
  --fg-whisper: #d8d8e2;
  --fg-disabled: #dcdce4;

  --card-foreground: #1a1a2e;
  --popover-foreground: #555568;
  --muted-foreground: #8b8ba0;
  --accent-foreground: #1a1a2e;
  --secondary-foreground: #6e6e82;

  --fg-30: rgba(26, 26, 46, 0.30);
  --fg-40: rgba(26, 26, 46, 0.40);
  --fg-45: rgba(26, 26, 46, 0.45);
  --fg-50: rgba(26, 26, 46, 0.50);
  --fg-60: rgba(26, 26, 46, 0.60);
  --fg-70: rgba(26, 26, 46, 0.70);
  --fg-80: rgba(26, 26, 46, 0.80);

  --primary: #338449;
  --primary-fg: #ffffff;
  --primary-7: rgba(51, 132, 73, 0.07);
  --primary-8: rgba(51, 132, 73, 0.08);
  --primary-10: rgba(51, 132, 73, 0.10);
  --primary-12: rgba(51, 132, 73, 0.12);
  --primary-15: rgba(51, 132, 73, 0.15);
  --primary-20: rgba(51, 132, 73, 0.20);
  --primary-70: rgba(51, 132, 73, 0.70);

  --destructive: #dc2626;
  --destructive-8: rgba(220, 38, 38, 0.08);
  --destructive-10: rgba(220, 38, 38, 0.10);
  --warning: #d97706;
  --warning-8: rgba(217, 119, 6, 0.08);
  --warning-10: rgba(217, 119, 6, 0.10);
  --info: #7c3aed;
  --info-8: rgba(124, 58, 237, 0.08);
  --info-10: rgba(124, 58, 237, 0.10);
  --chart-2: #6c5ce7;

  --border: #e4e5eb;
  --border-structural: #e4e5eb;
  --border-separator: rgba(0, 0, 0, 0.06);
  --border-subtle: rgba(0, 0, 0, 0.08);
  --border-soft: rgba(0, 0, 0, 0.12);
  --border-strong: rgba(0, 0, 0, 0.20);
  --border-focus: #bbbdc6;
  --border-tooltip: #d4d6de;
  --input-border: #e4e5eb;
  --popover-border: #d4d6de;
  --sidebar-border: #e4e5eb;
  --ring: #bbbdc6;

  --overlay-3: rgba(26, 26, 46, 0.02);
  --overlay-4: rgba(26, 26, 46, 0.03);
  --overlay-5: rgba(26, 26, 46, 0.04);
  --overlay-6: rgba(26, 26, 46, 0.05);
  --overlay-7: rgba(26, 26, 46, 0.06);
  --overlay-8: rgba(26, 26, 46, 0.07);
  --overlay-10: rgba(26, 26, 46, 0.09);
  --overlay-12: rgba(26, 26, 46, 0.11);
  --overlay-22: rgba(26, 26, 46, 0.20);

  --shadow-card: 0 1px 3px rgba(0,0,0,0.04), 0 4px 16px rgba(0,0,0,0.06);
  --shadow-card-hover: 0 4px 12px rgba(0,0,0,0.06), 0 8px 28px rgba(0,0,0,0.10);
  --shadow-popover: 0 8px 32px rgba(0,0,0,0.12);

  --sidebar-foreground: #8b8ba0;
  --sidebar-muted: #9e9eb2;
  --sidebar-accent: #e8ecf1;
}` : ''}

/* ── Base Styles ── */
*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: 'Inter', system-ui, -apple-system, sans-serif;
  font-size: var(--text-body);
  color: var(--fg);
  background-color: var(--bg);
  line-height: 1.5;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

/* ── Focus & Accessibility ── */
:focus-visible {
  outline: 2px solid var(--ring);
  outline-offset: 2px;
}

/* ── Anti-flash (aplique inline no <head>) ── */
/* <script>(function(){var t=localStorage.getItem('app-theme');if(t)document.documentElement.setAttribute('data-theme',t)})()</script> */
`;

    return {
      content: [{
        type: "text",
        text: `Aqui está o CSS completo do design system. Salve em um arquivo separado (ex: \`theme.css\`, \`tokens.css\`, ou \`src/styles/design-system.css\`):\n\n\`\`\`css\n${css}\n\`\`\`\n\n**Instruções de uso:**\n- Importe este arquivo como primeiro CSS do projeto\n- Em React: \`import './styles/design-system.css'\` no entry point\n- Em HTML: \`<link href="./theme.css" rel="stylesheet">\` antes dos outros CSS\n- Todos os componentes devem referenciar estas variáveis (nunca hex hardcoded)\n- Para trocar tema: \`document.documentElement.setAttribute('data-theme', 'light')\``
      }]
    };
  }
);

// Tool 6: Get file organization guide
server.tool(
  "get_file_structure",
  "Retorna a estrutura de arquivos recomendada para organizar o design system no projeto. Adapta para a tecnologia sendo usada.",
  { framework: z.enum(["html", "react", "vue", "svelte", "nextjs", "angular", "other"]).describe("Framework/tecnologia do projeto") },
  async ({ framework }) => {
    const structures = {
      html: `## Estrutura recomendada — HTML + CSS

\`\`\`
projeto/
├── index.html
├── styles/
│   ├── design-system.css    ← Tokens + variáveis (gerado via generate_theme_css)
│   ├── components.css       ← Estilos de componentes reutilizáveis
│   └── pages/
│       └── dashboard.css    ← Estilos específicos da página
├── dist/
│   └── styles.css           ← CSS compilado (se usar Tailwind)
└── js/
    └── main.js
\`\`\`

**Regra:** \`design-system.css\` é importado primeiro, nunca editado por páginas individuais. Componentes e páginas consomem via \`var(--token)\`.`,

      react: `## Estrutura recomendada — React

\`\`\`
src/
├── styles/
│   ├── design-system.css    ← Tokens + variáveis (gerado via generate_theme_css)
│   ├── globals.css          ← Reset + estilos base
│   └── components/          ← CSS Modules por componente (opcional)
├── components/
│   ├── ui/                  ← Componentes base (Button, Card, Badge, Input)
│   │   ├── Button.tsx
│   │   ├── Button.module.css  ← Usa var(--token), não hex
│   │   ├── Card.tsx
│   │   └── ...
│   └── features/            ← Componentes de feature
├── layouts/
│   ├── DashboardLayout.tsx  ← Sidebar + Topbar + Body
│   └── AuthLayout.tsx
├── pages/
│   ├── Analytics.tsx
│   └── Settings.tsx
└── App.tsx                  ← import './styles/design-system.css' aqui
\`\`\`

**Entry point (App.tsx ou main.tsx):**
\`\`\`tsx
import './styles/design-system.css'  // ← PRIMEIRO import
import './styles/globals.css'
\`\`\`

**Regra:** Componentes usam \`var(--token)\` no CSS. Nunca hex hardcoded. O design-system.css é o single source of truth.`,

      vue: `## Estrutura recomendada — Vue

\`\`\`
src/
├── assets/
│   ├── design-system.css    ← Tokens + variáveis (gerado via generate_theme_css)
│   └── globals.css
├── components/
│   ├── ui/                  ← Componentes base
│   │   ├── BaseButton.vue
│   │   ├── BaseCard.vue
│   │   └── ...
│   └── features/
├── layouts/
│   └── DashboardLayout.vue
├── views/
│   └── Analytics.vue
└── main.ts                  ← import './assets/design-system.css'
\`\`\`

**Em \`<style scoped>\` dos componentes:** Use \`var(--token)\` normalmente — CSS vars atravessam scoped styles.`,

      nextjs: `## Estrutura recomendada — Next.js

\`\`\`
src/
├── styles/
│   ├── design-system.css    ← Tokens + variáveis (gerado via generate_theme_css)
│   └── globals.css
├── components/
│   ├── ui/
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   └── ...
│   └── features/
├── app/
│   ├── layout.tsx           ← import '@/styles/design-system.css' aqui
│   ├── page.tsx
│   └── dashboard/
│       └── page.tsx
└── lib/
    └── theme.ts             ← Helpers de tema (toggle, persist)
\`\`\`

**layout.tsx:**
\`\`\`tsx
import '@/styles/design-system.css'  // ← Tokens primeiro
import '@/styles/globals.css'
\`\`\``,

      svelte: `## Estrutura recomendada — Svelte/SvelteKit

\`\`\`
src/
├── lib/
│   ├── styles/
│   │   └── design-system.css
│   └── components/
│       ├── Button.svelte
│       ├── Card.svelte
│       └── ...
├── routes/
│   ├── +layout.svelte       ← import '$lib/styles/design-system.css'
│   └── dashboard/
│       └── +page.svelte
└── app.css
\`\`\``,

      angular: `## Estrutura recomendada — Angular

\`\`\`
src/
├── styles/
│   ├── design-system.css    ← Tokens (referenciado em angular.json)
│   └── globals.css
├── app/
│   ├── shared/
│   │   └── components/      ← Componentes UI base
│   ├── features/
│   │   └── dashboard/
│   └── layouts/
└── angular.json             ← styles: ["src/styles/design-system.css", ...]
\`\`\``,

      other: `## Estrutura recomendada — Genérica

\`\`\`
projeto/
├── styles/
│   ├── design-system.css    ← Tokens + variáveis (gerado via generate_theme_css)
│   ├── components.css       ← Estilos de componentes reutilizáveis
│   └── [page].css           ← Estilos específicos por página
├── components/              ← Componentes UI
└── pages/                   ← Páginas
\`\`\`

**Regra universal:** O \`design-system.css\` é sempre o primeiro CSS carregado e nunca é editado por componentes individuais. Tudo consome via \`var(--token)\`.`
    };

    return {
      content: [{ type: "text", text: structures[framework] || structures.other }]
    };
  }
);

// ── Prompts ──────────────────────────────────────────────────────────

server.prompt(
  "new-page",
  "Template para criar uma nova página seguindo o design system",
  { page_name: z.string().describe("Nome da página (ex: Portfolio, Settings, Reports)") },
  ({ page_name }) => ({
    messages: [{
      role: "user",
      content: {
        type: "text",
        text: `Crie uma nova página chamada "${page_name}" para o dashboard iGreenMCP.

REGRAS OBRIGATÓRIAS:
1. Copie o HTML da sidebar+topbar do resource 'component-navigation' (seção "HTML Template Copiável") — EXATAMENTE como está
2. Altere apenas: <title>, breadcrumb (.bc-current), e classe .active no nav-item correspondente
3. Todas as cores via CSS custom properties (tokens) — NUNCA hex hardcoded
4. Texto branco sobre fundos sólidos: var(--on-solid) — NUNCA #fff
5. Dark theme como default, light theme deve funcionar
6. Font Inter, escala tipográfica: --text-display(28), --text-lg(22), --text-title(20), --text-heading(18), --text-subheading(15), --text-body(14), --text-sm(13), --text-caption(12), --text-xs(11)
7. Spacing da escala: --space-xs(4) a --space-3xl(32) — nenhum valor arbitrário
8. Cards com var(--card), border var(--border-structural), var(--radius-md), var(--shadow-card)
9. SVG inline para ícones (currentColor)
10. Transições com var(--ease-out)
11. Focus-visible em todos os elementos interativos
12. Chart legends SEMPRE custom HTML (nunca Chart.js built-in)
13. Stat rows com background var(--muted)
14. Inclua scripts de sidebar toggle e theme toggle antes de </body>

TEMPLATES DE REFERÊNCIA (consulte resources):
- 'page-templates': 4 templates HTML completos (base, tabela, detalhe, gráficos)
- 'component-navigation': HTML copiável da sidebar+topbar
- 'system-instructions': Regras completas do design system
- 'rules': 15 regras obrigatórias + naming conventions + anti-patterns

PÁGINAS DE REFERÊNCIA (padrões reais):
- analytics.html: KPI grid + tabela + drawer + chart cards
- products.html: Tabela com toolbar (tabs, search, filter, export) + pagination
- order-detail.html: Tabs + grid 2 colunas + detail sections
- market-trends.html: Filter bar + chart cards + 3 tipos de legenda`
      }
    }]
  })
);

server.prompt(
  "new-component",
  "Template para criar um novo componente seguindo o design system",
  { component_name: z.string().describe("Nome do componente (ex: Tag, Tooltip, Dropdown)") },
  ({ component_name }) => ({
    messages: [{
      role: "user",
      content: {
        type: "text",
        text: `Crie o componente "${component_name}" seguindo o iGreenMCP Design System.

REGRAS:
1. Consulte os resources do MCP para tokens e padrões existentes
2. Use nomenclatura BEM-like: .${component_name.toLowerCase()} base, .${component_name.toLowerCase()}--variant
3. Tamanhos: xs, sm, md (default), lg
4. Cores via tokens (nunca hex hardcoded)
5. Estados: default, hover, active, focus-visible, disabled
6. Dark + Light theme
7. Transições com var(--ease-out)
8. Border-radius da escala do sistema
9. Spacing da escala do sistema

Entregue:
- CSS do componente
- HTML de exemplo/showcase
- Documentação de variantes e props`
      }
    }]
  })
);

server.prompt(
  "review-ui",
  "Revisa código UI contra o design system e sugere correções",
  { code_description: z.string().describe("Descreva o que o código faz ou cole o código") },
  ({ code_description }) => ({
    messages: [{
      role: "user",
      content: {
        type: "text",
        text: `Revise o seguinte código/componente contra o iGreenMCP Design System:

${code_description}

Use a tool 'validate_css' se houver CSS para validar.
Consulte os resources para verificar se segue:
1. Tokens de cor corretos
2. Escala tipográfica
3. Escala de spacing
4. Border-radius da escala
5. Padrões de componentes
6. Nomenclatura correta
7. Estados interativos (hover, focus, disabled)
8. Suporte dark/light theme
9. Transições com --ease-out

Liste todas as violações encontradas e sugira correções específicas.`
      }
    }]
  })
);

// ── Server Startup ──────────────────────────────────────────────────

if (useHttp) {
  // ── HTTP mode (remote deploy: Railway, Render, etc.) ──
  const { StreamableHTTPServerTransport } = await import("@modelcontextprotocol/sdk/server/streamableHttp.js");
  const express = (await import("express")).default;
  const cors = (await import("cors")).default;

  const app = express();
  app.use(cors());
  app.use(express.json());

  app.get("/", (req, res) => {
    res.json({
      name: "iGreenMCP Design System MCP",
      version: "2.4.0",
      status: "running",
      transport: "http",
      resources: Object.keys(RESOURCES).length,
      endpoints: { mcp: "/mcp", health: "/" }
    });
  });

  // Stateless mode: create a new transport per request
  app.post("/mcp", async (req, res) => {
    try {
      const transport = new StreamableHTTPServerTransport({ sessionIdGenerator: undefined });
      res.on("close", () => transport.close());
      await server.connect(transport);
      await transport.handleRequest(req, res, req.body);
    } catch (err) {
      console.error("MCP error:", err);
      if (!res.headersSent) {
        res.status(500).json({ jsonrpc: "2.0", error: { code: -32603, message: "Internal server error" }, id: null });
      }
    }
  });

  // Stateless mode: no sessions to manage
  app.get("/mcp", (req, res) => res.status(405).json({ error: "Method not allowed. Use POST." }));
  app.delete("/mcp", (req, res) => res.status(405).json({ error: "Method not allowed. Stateless mode." }));

  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.error(`🎨 iGreenMCP Design MCP running on port ${PORT} (HTTP mode)`);
    console.error(`   Health: http://localhost:${PORT}/`);
    console.error(`   MCP:    http://localhost:${PORT}/mcp`);
  });

} else {
  // ── stdio mode (default — for Claude Code, Cursor, Antigravity, etc.) ──
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("🎨 iGreenMCP Design MCP running (stdio mode)");
}
