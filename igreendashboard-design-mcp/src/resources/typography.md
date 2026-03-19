# Typography

> Escala tipográfica e regras de uso de fonte do iGreenMCP Design System.

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
- **Margem entre heading e body:** `--space-sm` (8px) ou `--space-md` (12px)

### Line-Height por Contexto (IMPORTANTE — valores exatos)

O sistema usa **8 valores distintos** de line-height. Usar o valor errado causa diferenças visuais perceptíveis.

| Valor | Contexto | Seletores |
|-------|----------|-----------|
| `1` | Valores compactos, badges, botões | `.kpi-value`, `.kpi-badge`, `.badge`, `.status-chip`, `.btn`, `.al-chg`, `.tbl-badge`, `.fc-clear`, `.ao-val`, `.tc-flag` |
| `1.2` | Stat values (KPI secundários) | `.pstat-val`, `.ch-stat-val` |
| `1.3` | Growth labels | `.cr-growth-label` |
| `1.4` | Meta text, descrições curtas | `.user-meta`, `.form-nav-desc` |
| `1.5` | Body text, notas | `.uc-sub`, `.dw-tl-desc`, body default |
| `1.55` | Comment text | `.dw-comment-text` |
| `1.6` | Long-form text | `.od-comment-text` |
| `1.65` | Notes/descrições longas | `.dw-notes` |

**Regra:** Valores de display/KPI (font-size >= 18px) usam `line-height: 1`. Stat values secundários usam `1.2`. Body text usa `1.5`. Nunca use `line-height: normal` ou `line-height: 1.5` em valores numéricos grandes.

### Letter-Spacing por Contexto (IMPORTANTE — valores exatos)

O sistema usa **12 valores distintos** de letter-spacing organizados por contexto visual.

| Valor | Contexto | Seletores |
|-------|----------|-----------|
| `-1px` | Valores display grandes (22px+) | `.ao-val`, `.cr-growth-val` |
| `-.5px` | Valores KPI/stat (18-22px) | `.kpi-value`, `.ov-stat-val` |
| `-.3px` | Brand, valores médios | `.brand-name`, `.ua-legend-val`, `.ch-lg-val-num`, `.coin-icon` |
| `-.1px` | Títulos de card (15px) | `.card-title` |
| `-0.01em` | Títulos de drawer | `.dw-title` |
| `0` (normal) | Body text | Default — não declare |
| `.02em` | Stat labels (uppercase, 11px) | `.pstat-label` |
| `.04em` | Date labels | `.od-tl-date` |
| `.1px` | KPI labels (13px) | `.kpi-label` |
| `.2px` | Brand subtitle | `.brand-sub` |
| `.5px` | Section titles (uppercase) | `.dw-section-title` |
| `.8px` | Section labels (uppercase, 10px) | `.sec-label` |

**Regra:** Valores numéricos grandes usam letter-spacing negativo (mais apertado). Labels uppercase usam letter-spacing positivo (mais aberto). Body text não declara letter-spacing.

## Anti-patterns (Não faça)

- Nunca use fonte diferente de Inter sem aprovação
- Nunca use tamanhos fora da escala (ex: 16px, 17px, 19px, 21px, 24px)
- Nunca use peso 300 (light) ou 800/900 (extra bold)
- Nunca use text-transform: uppercase em blocos de texto (apenas em labels curtos como "MANAGE", "SETTINGS")
- Nunca use line-height menor que 1 (exceto casos documentados)
- Nunca use `line-height: 1.5` em valores numéricos de KPI (use `1`)
- Nunca omita letter-spacing em `.kpi-value` (deve ser `-.5px`) ou `.card-title` (deve ser `-.1px`)
