<!-- nx configuration start-->
<!-- Leave the start & end comments to automatically receive updates. -->

## General Guidelines for working with Nx

- For navigating/exploring the workspace, invoke the `nx-workspace` skill first - it has patterns for querying projects, targets, and dependencies
- When running tasks (for example build, lint, test, e2e, etc.), always prefer running the task through `nx` (i.e. `nx run`, `nx run-many`, `nx affected`) instead of using the underlying tooling directly
- Prefix nx commands with the workspace's package manager (e.g., `pnpm nx build`, `npm exec nx test`) - avoids using globally installed CLI
- You have access to the Nx MCP server and its tools, use them to help the user
- For Nx plugin best practices, check `node_modules/@nx/<plugin>/PLUGIN.md`. Not all plugins have this file - proceed without it if unavailable.
- NEVER guess CLI flags - always check nx_docs or `--help` first when unsure

## Scaffolding & Generators

- For scaffolding tasks (creating apps, libs, project structure, setup), ALWAYS invoke the `nx-generate` skill FIRST before exploring or calling MCP tools

## When to use nx_docs

- USE for: advanced config options, unfamiliar flags, migration guides, plugin configuration, edge cases
- DON'T USE for: basic generator syntax (`nx g @nx/react:app`), standard commands, things you already know
- The `nx-generate` skill handles generator discovery internally - don't call nx_docs just to look up generator syntax

<!-- nx configuration end-->

# Tucutable Library (@e-burgos/tucutable)

This workspace contains the `@e-burgos/tucutable` library — a React data table component built on TanStack Table v8, Tailwind CSS v4, and Zustand.

## Agents

| Agent                 | File                                          | Description                                                                                                                                                                           |
| --------------------- | --------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `ci-monitor-subagent` | `.github/agents/ci-monitor-subagent.agent.md` | Polls Nx Cloud CI pipeline and self-healing status                                                                                                                                    |
| `tucutable-expert`    | `.github/agents/tucutable-expert.agent.md`    | Expert agent for @e-burgos/tucutable — knows all APIs, props, columns, hooks, context, store, theming, and can produce complete working examples for any feature                      |
| `tucu-ui-expert`      | `.github/agents/tucu-ui-expert.agent.md`      | Builds documentation pages for tucutable in apps/demo/ using tucu-ui; also a consultant for @e-burgos/tucu-ui — components, forms, design system, routing, standalone, and MFE setups |

## Skills

### Tucutable Skills

| Skill                | File                                         | Use When                                                                                                                                                                          |
| -------------------- | -------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `tucutable-usage`    | `.github/skills/tucutable-usage/SKILL.md`    | Creating DataTable components, configuring props (pagination, sorting, row actions, row selection, sub-components), styling, or asking about basic usage                          |
| `tucutable-columns`  | `.github/skills/tucutable-columns/SKILL.md`  | Defining column definitions (ColumnDef), configuring column features (sorting, resizing, pinning, dragging, visibility), migrating from DataGrid columns, or using convertColumns |
| `tucutable-advanced` | `.github/skills/tucutable-advanced/SKILL.md` | Accessing table state programmatically, using useDataTableContext, managing store/persistence, resetting cache, building custom table wrappers, or implementing drag-and-drop     |
| `tucu-ui-docs`       | `.github/skills/tucu-ui-docs/SKILL.md`       | Building documentation pages for tucutable in apps/demo/ using tucu-ui — page types, hero, TOC, lazy sections, live DataTable demos                                               |

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

## Key Paths

- Library source: `ui/tucutable/src/`
- Demo app: `apps/demo/`
- Storybook stories: `ui/tucutable/src/storybook/`
- Types: `ui/tucutable/src/common/types/index.ts`
- Context/Provider: `ui/tucutable/src/context/index.tsx`
- Hooks: `ui/tucutable/src/hooks/`
- Agents: `.github/agents/`
- Skills: `.github/skills/`
