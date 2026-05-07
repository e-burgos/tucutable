# GitHub Copilot Instructions

You are an AI assistant specialized in the `tucutable` ecosystem.

## ⚠️ CRITICAL: Context Retrieval

**YOU MUST retrieve the context from these skill files:**

### Tucutable Skills

| Skill                | File                                         | Use When                                                                                                                  |
| -------------------- | -------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------- |
| `tucutable-usage`    | `.github/skills/tucutable-usage/SKILL.md`    | Creating tables, configuring props, pagination, sorting, row actions, row selection, sub-components, styling              |
| `tucutable-columns`  | `.github/skills/tucutable-columns/SKILL.md`  | Column definitions (ColumnDef), column features (sorting, resizing, pinning, dragging, visibility), convertColumns        |
| `tucutable-advanced` | `.github/skills/tucutable-advanced/SKILL.md` | Context/provider, hooks, Zustand store, drag-and-drop, cache management, TanStack Table access, report data               |
| `tucu-ui-docs`       | `.github/skills/tucu-ui-docs/SKILL.md`       | Building documentation pages for tucutable in apps/demo/ using tucu-ui — page types, hero, TOC, lazy sections, live demos |

### Tucu-UI Skills

| Skill                   | File                                            | Use When                                                                     |
| ----------------------- | ----------------------------------------------- | ---------------------------------------------------------------------------- |
| `tucu-ui`               | `.github/skills/tucu-ui/SKILL.md`               | Overview, installation, architecture modes, quick start                      |
| `tucu-ui-catalog`       | `.github/skills/tucu-ui-catalog/SKILL.md`       | Full component API reference — 70+ components, 14 hooks, utilities, types    |
| `tucu-ui-design-system` | `.github/skills/tucu-ui-design-system/SKILL.md` | Layouts, design tokens, color presets, useTheme, dark/light mode, typography |
| `tucu-ui-forms`         | `.github/skills/tucu-ui-forms/SKILL.md`         | Form component, validation schema, all input types, useFormContext patterns  |
| `tucu-ui-routing`       | `.github/skills/tucu-ui-routing/SKILL.md`       | Standalone & MFE routing, nested/dynamic routes, navigation                  |
| `tucu-ui-standalone`    | `.github/skills/tucu-ui-standalone/SKILL.md`    | Standalone architecture, menu-driven routes, auth, layouts, Vite config      |
| `tucu-ui-mfe`           | `.github/skills/tucu-ui-mfe/SKILL.md`           | MFE architecture, shell orchestrator, inter-app navigation, shared auth      |

## 🤖 Available Agents

| Agent                 | File                                          | Description                                                                                                                                                                           |
| --------------------- | --------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `ci-monitor-subagent` | `.github/agents/ci-monitor-subagent.agent.md` | Polls Nx Cloud CI pipeline and self-healing status                                                                                                                                    |
| `tucutable-expert`    | `.github/agents/tucutable-expert.agent.md`    | Expert agent for @e-burgos/tucutable — knows all APIs, props, columns, hooks, context, store, theming, and can produce complete working examples for any feature                      |
| `tucu-ui-expert`      | `.github/agents/tucu-ui-expert.agent.md`      | Builds documentation pages for tucutable in apps/demo/ using tucu-ui; also a consultant for @e-burgos/tucu-ui — components, forms, design system, routing, standalone, and MFE setups |

## 📍 Index

Refer to `AGENTS.md` in the root for a map of all available skills and agents.
