# Typography

> Escala tipográfica e regras de uso de fonte do CryptoVault Design System.

## Fonte

**Font family:** Inter (Google Fonts)
**Pesos disponíveis:** 400 (regular), 500 (medium), 600 (semibold), 700 (bold)
**Fallback:** system-ui, -apple-system, sans-serif

```html
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
```

## Escala Tipográfica (9 tokens)

| Token | Tamanho | Uso | Peso típico |
|-------|---------|-----|-------------|
| `--text-display` | 28px | Títulos grandes de página, hero values | 700 |
| `--text-lg` | 22px | Valores destaque, donut centers, overview stats | 700 |
| `--text-title` | 20px | Títulos de seção, headings de card | 600 |
| `--text-heading` | 18px | Stat values, drawer titles, legend numbers | 700 |
| `--text-subheading` | 15px | Card titles, section headings, brand name | 600 |
| `--text-body` | 14px | Texto padrão, parágrafos, body text | 400 |
| `--text-sm` | 13px | Texto pequeno, default de componentes (botões, labels) | 500 |
| `--text-caption` | 12px | Legendas, captions, metadados | 400 |
| `--text-xs` | 11px | Texto extra pequeno, badges, tags | 500 |

## Regras de Uso

### Hierarquia visual
1. **Display (28px/700)** — Apenas 1 por página. Valor principal ou título da seção hero.
2. **Large (22px/700)** — Valores de destaque: donut centers, overview stats. Máximo 2-3 por viewport.
3. **Title (20px/600)** — Títulos de cards ou seções. Máximo 3-5 por viewport.
4. **Heading (18px/700)** — Stat values, drawer titles, legend numbers. Valores numéricos de KPI.
5. **Subheading (15px/600)** — Card titles, section headings. Usado em headers de cards internos.
6. **Body (14px/400)** — Texto de leitura. Cor `--fg` ou `--fg-secondary`.
7. **Small (13px/500)** — Componentes interativos: botões, chips, labels de input.
8. **Caption (12px/400)** — Informação auxiliar: timestamps, legendas de gráfico, "Showing 1-10 of 24".
9. **Extra Small (11px/500)** — Badges, tags, indicadores compactos.

### Pesos por contexto
- **400 (regular):** Texto de leitura, parágrafos, descrições
- **500 (medium):** Labels de componentes, botões, tabs, valores de tabela
- **600 (semibold):** Títulos de card, headings de seção, nomes em listas
- **700 (bold):** Valores de KPI, display numbers, títulos de página

### Cores por hierarquia
- **Texto principal:** `--fg` (cor mais forte)
- **Texto secundário:** `--fg-secondary` ou `--fg-tertiary`
- **Labels:** `--fg-muted` ou `--fg-tertiary`
- **Placeholders:** `--fg-dim` ou `--fg-faint`
- **Disabled:** `--fg-disabled`

### Espaçamento entre texto
- **Line-height padrão:** 1.5 para body text, 1.2 para headings
- **Letter-spacing:** Normal para body, -0.01em para display/title
- **Margem entre heading e body:** `--space-sm` (8px) ou `--space-md` (12px)

## Anti-patterns (Não faça)

- ❌ Nunca use fonte diferente de Inter sem aprovação
- ❌ Nunca use tamanhos fora da escala (ex: 16px, 17px, 19px, 21px, 24px)
- ❌ Nunca use peso 300 (light) ou 800/900 (extra bold)
- ❌ Nunca use text-transform: uppercase em blocos de texto (apenas em labels curtos como "MANAGE", "SETTINGS")
- ❌ Nunca use line-height menor que 1.2
