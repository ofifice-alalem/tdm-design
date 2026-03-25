# EXECUTION PLAN

## Projects
- **Source Logic**: `/home/hammam/Desktop/work/design`
- **Source Design**: `/home/hammam/Desktop/work/AI/design-3`
- **Output**: `/home/hammam/Desktop/work/tdm-design`

---

## Design System Extraction Plan

Extract from `design-3` into `/design-system/`:
- `tokens.css` — spacing, typography, radius, animation, glass vars
- `themes.css` — dark, light, neon, soft-glass, high-contrast
- `global.css` — reset, body, layout utilities
- `components.css` — all component CSS utilities

---

## Component Migration Order

| # | Component | Source File | Priority |
|---|-----------|-------------|----------|
| 1 | Button | `components/ui/Button.jsx` | Core |
| 2 | Modal | `components/ui/Modal.jsx` | Core |
| 3 | Select | `components/ui/Select.jsx` | Core |
| 4 | Tabs | `components/ui/Tabs.jsx` | Core |
| 5 | ActionIcons | `components/ui/ActionIcons.jsx` | Core |
| 6 | DatePicker | `components/ui/DatePicker.jsx` | Core |
| 7 | SearchField | `components/ui/SearchField.jsx` | Core |
| 8 | ViewToggle | `components/ui/ViewToggle.jsx` | Core |
| 9 | StatisticsCard | `components/cards/StatisticsCard.jsx` | Composite |
| 10 | FilterPanel | `components/filters/FilterPanel.jsx` | Composite |
| 11 | DynamicRowInput | `components/forms/DynamicRowInput.jsx` | Composite |
| 12 | Table | `components/table/Table.jsx` | Composite |

---

## Migration Strategy Per Component

1. Copy JSX logic verbatim from project 1
2. Replace Tailwind utility classes with design-system CSS classes from project 2
3. Ensure all CSS class names referenced exist in the design system
4. Validate props interface is unchanged

---

## Refactoring Plan

- All CSS lives in `/design-system/` — no inline styles, no duplicated rules
- Components import only from `lucide-react` and React
- Single CSS entry point: `design-system/index.css`
- Theme switching via `data-theme` attribute on `<html>`
- Dark mode via `.dark` class on `<html>`

---

## Completion Criteria

- `remaining_components: []` in `migration_state.json`
- All 12 components present in `/components/`
- Design system fully extracted in `/design-system/`
- `FINAL_REPORT.md` generated
