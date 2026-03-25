# Migration Log

---

## [START] Project Analysis Complete

**Timestamp**: 2025-01-01T00:00:00Z

### Source Project 1 (Logic)
- Path: `/home/hammam/Desktop/work/design`
- Stack: React 19, Tailwind CSS v4, Vite, lucide-react
- Components: 12 total (4 composite, 8 primitive)
- CSS: Tailwind @utility directives in `design-tokens.css`

### Source Project 2 (Design)
- Path: `/home/hammam/Desktop/work/AI/design-3`
- Stack: Vanilla CSS, CSS custom properties, multi-theme system
- Themes: dark, light, neon, soft-glass, high-contrast
- Design tokens: spacing, typography, radius, animation, glass effects

### Design System Mapping
- Project 1 uses `.dark` class + Tailwind utilities
- Project 2 uses `data-theme` attribute + CSS custom properties
- Merged approach: support both `.dark` class (Tailwind compat) and `data-theme` attribute
- All `@utility` directives from project 1 preserved as standard CSS classes

---

## [Button] ✅ Completed

**Timestamp**: 2025-01-01T00:01:00Z

### Files Created
- `components/ui/Button.jsx`
- `design-system/components/button.css`

### Logic (from project 1)
- Props: `variant`, `icon`, `label`, `onClick`, `className`, `children`, `...props`
- Variant map: `primary | danger | outline | ghost` → CSS class
- Icon: accepts React element or component reference
- Specular shine overlay preserved (`.btn-shine` replaces Tailwind `group-hover` approach)

### Design (from project 2)
- Base: `design-3/components/buttons.css` — padding, radius, font-weight, transition
- Variants: `design/src/design-tokens.css` — `@utility btn-primary/danger/outline/ghost`
- Dark mode: cyan glow borders + glass backgrounds for primary/outline; red glow for danger
- Tokens used: `--spacing-md`, `--spacing-2xl`, `--radius-xl`, `--speed-fast`, `--color-*-raw`

### Issues
- None

---

## [Modal] ✅ Completed

**Timestamp**: 2025-01-01T00:02:00Z

### Files Created
- `components/ui/Modal.jsx`
- `design-system/components/modal.css`

### Logic (from project 1)
- Props: `isOpen`, `onClose`, `title`, `children`, `icon`, `theme`
- Theme map: `primary | danger | warning` → panel + glow + icon color classes
- Early return when `!isOpen`
- Backdrop click closes modal

### Design (from project 2)
- Panel: glass morphism — `rgba(255,255,255,0.92)` light / `rgba(15,15,20,0.95)` dark
- Dark mode: cyan border + cyan glow box-shadow
- Glow overlays per theme (primary/danger/warning tinted gradients)
- Close button: hover turns red in both modes
- Tokens used: `--radius-xl`, `--glass-blur`, `--space-*`, `--color-*-raw`

### Issues
- Replaced Tailwind `dark:` prefixes with explicit `[data-theme="dark"]` + `html.dark` selectors

---

## [Select] ✅ Completed

**Timestamp**: 2025-01-01T00:03:00Z

### Files Created
- `components/ui/Select.jsx`
- `design-system/components/select.css`

### Logic (from project 1)
- Props: `value`, `onChange`, `options`, `placeholder`
- Click-outside detection via `useRef` + `mousedown` listener
- Controlled open/close state
- Finds selected option label for display

### Design (from project 2)
- Trigger: glass white bg light / dark rgba with cyan border
- Dropdown: frosted glass panel, fade+scale animation (`selectFadeIn`)
- Active option: blue tint light / cyan tint dark
- Chevron rotates 180° when open
- Specular shine on hover (`.select-shine`)
- Tokens used: `--radius-md`, `--spacing-*`, `--color-cyan-bright-raw`, `--gray-*`

### Issues
- Replaced all Tailwind `dark:` inline classes with explicit CSS selectors

---

## [Tabs] ✅ Completed

**Timestamp**: 2025-01-01T00:04:00Z

### Files Created
- `components/ui/Tabs.jsx`
- `design-system/components/tabs.css`

### Logic (from project 1)
- Props: `tabs`, `defaultTab`, `onChange`, `className`
- Sliding indicator: measures `offsetLeft` + `offsetWidth` of active tab via `useRef`
- `useEffect` recalculates indicator on `activeTab` or `tabs` change
- Supports `tab.icon`, `tab.hasAlert` per tab item

### Design (from project 2)
- Wrapper: frosted glass pill container with custom scrollbar
- Indicator: white pill (light) / translucent white with cyan glow (dark), spring easing `cubic-bezier(0.34,1.56,0.64,1)`
- Active tab: dark gray (light) / cyan-400 (dark)
- Inactive tab: gray-400 with hover scale-105 / active scale-95
- Alert dot: pulsing red dot via `tabAlertPulse` keyframe
- Tokens used: `--radius-lg`, `--radius-xl`, `--spacing-*`, `--color-cyan-bright-raw`, `--gray-*`

### Issues
- Replaced all Tailwind `dark:` + `scale-*` inline classes with explicit CSS selectors and transforms

---

## [ActionIcons] ✅ Completed

**Timestamp**: 2025-01-01T00:05:00Z

### Files Created
- `components/ui/ActionIcons.jsx`
- `design-system/components/action-icons.css`

### Logic (from project 1)
- Props: `type`, `onClick`, `tooltip`
- `iconsMap`: 14 icon types mapped to lucide-react components
- `btnClassMap`: 4 typed variants (view/edit/delete/call), fallback to default
- `tooltipClassMap`: 4 color variants for tooltip
- Early return if icon type not found

### Design (from project 2)
- Button base: glass backdrop, border, lift on hover (`translateY(-2px)`), shrink on active (`scale(0.9)`)
- Specular shine overlay fades out on hover
- 5 variants: view (blue), edit (amber), delete (red), call (green), default (gray)
- Each variant: tinted bg + border light / solid bg + glow on hover
- Dark mode: translucent tinted bg → solid color on hover with glow
- Tooltip: CSS-only hover reveal via `.action-icon-wrapper:hover .action-tooltip`
- Tooltip arrow via border-trick on `.action-tooltip-arrow`
- Tokens used: `--bg-*`, `--color-*`, `--radius-md`, `--spacing-md`, `--shadow-xl`

### Issues
- Replaced Tailwind `group/tooltip` hover pattern with plain CSS parent hover selector

---

## [DatePicker] ✅ Completed

**Timestamp**: 2025-01-01T00:06:00Z

### Files Created
- `components/ui/DatePicker.jsx`
- `design-system/components/datepicker.css`

### Logic (from project 1)
- Props: `value` (string `YYYY-MM-DD`), `onChange`
- Splits value into year/month/day parts
- Each input strips non-digits via `/\D/g` regex
- Reconstructs and emits full date string on any field change
- Year input has `flex: 2` (wider), day/month have `flex: 1`

### Design (from project 2)
- Wrapper: flex row with gap, full width
- Separator `/`: light gray (light mode) / dark gray (dark mode)
- Input: white bg, 2px border, center-aligned text, glass backdrop
- Focus: primary color border + ring glow (light) / cyan border + cyan glow (dark)
- Hover: slightly darker border + subtle shadow
- Tokens used: `--radius-md`, `--spacing-lg`, `--color-primary-raw`, `--color-cyan-bright-raw`, `--gray-*`

### Issues
- None — straightforward component with no Tailwind group patterns

---

## [SearchField] ✅ Completed

**Timestamp**: 2025-01-01T00:07:00Z

### Files Created
- `components/ui/SearchField.jsx`
- `design-system/components/search-field.css`

### Logic (from project 1)
- Props: `placeholder`, `onChange`, `className`
- Controlled `query` state + `isFocused` state
- Clear button resets query and fires `onChange('')`
- Shortcut hint (⌘K) shown when query is empty, hidden when typing

### Design (from project 2)
- Layered architecture: absolute `.search-bg` + relative input on top (z-index 10)
- Focus state: primary border + ring glow (light) / cyan border + cyan glow (dark)
- Search icon: scales up + changes color on focus
- Clear button: rotates 90° on hover, turns red
- Shortcut hint: opacity 0.4 → 1 on wrapper hover
- Focus glow: radial cyan gradient overlay, only visible in dark mode
- Tokens used: `--radius-lg`, `--spacing-*`, `--color-primary-raw`, `--color-cyan-bright-raw`, `--gray-*`

### Issues
- Replaced Tailwind `dark:` inline classes and `group` hover pattern with explicit CSS selectors
- Focus glow simplified: rendered conditionally in JSX when `isFocused`, CSS handles dark-mode opacity

---

## [ViewToggle] ✅ Completed

**Timestamp**: 2025-01-01T00:08:00Z

### Files Created
- `components/ui/ViewToggle.jsx`
- `design-system/components/view-toggle.css`

### Logic (from project 1)
- Props: `onViewChange`, `defaultView`, `className`
- Controlled `view` state (`'table'` | `'grid'`)
- Two buttons toggle between views, fires `onViewChange` callback

### Design (from project 2)
- Wrapper: glass pill container with subtle border
- Dark mode wrapper: dark bg + cyan border + cyan glow
- Active button: white bg + primary color + shadow (light) / cyan tint + cyan border + glow (dark)
- Inactive button: transparent + gray, hover lightens color
- Tokens used: `--radius-md`, `--radius-sm`, `--spacing-xs`, `--spacing-md`, `--color-cyan-bright-raw`, `--glass-gradient-*`

### Issues
- None — simplest component in the library

---
