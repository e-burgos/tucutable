---
name: tucu-ui-docs
description: 'Build documentation pages for @e-burgos/tucutable using @e-burgos/tucu-ui components. USE WHEN: (1) creating new documentation pages for tucutable features, (2) adding sections to existing pages, (3) building introduction/overview pages, (4) creating guide pages with TOC and lazy sections, (5) writing code examples and live demos, (6) composing hero banners, feature grids, and step-by-step guides. Trigger words: documentation, docs, page, section, hero, tutorial, guide, demo page.'
---

# Skill: Tucutable Documentation with Tucu-UI

Complete guide to building **documentation pages for `@e-burgos/tucutable`** using `@e-burgos/tucu-ui` components. Covers page composition patterns, hero banners, feature grids, code examples, live table demos, table of contents, lazy-loaded sections, and consistent documentation design.

> **Companion Skills**: `tucutable-usage`, `tucutable-columns`, `tucutable-advanced`
> **Live Site**: The demo app at `apps/demo/` is the reference implementation.

---

## Reference Implementation

The tucutable workspace ships a documentation demo at `apps/demo/`. It showcases the full documentation pattern: hero banners, feature grids, code blocks, live DataTable demos, expandable rows, and step-by-step guides — all built with `@e-burgos/tucu-ui` components to document `@e-burgos/tucutable` features.

**Key principle**: All UI components (layout, cards, typography, icons, code blocks, alerts, buttons) come from `@e-burgos/tucu-ui`. The table functionality being documented comes from `@e-burgos/tucutable`.

---

## 1. Architecture Overview

The documentation site is a standalone SPA powered by tucu-ui's `ThemeProvider`:

```
+-------------------------------------------------------------+
|            Tucutable Documentation Site (SPA)               |
|                                                             |
|  ThemeProvider (@e-burgos/tucu-ui)                          |
|   +-- menuItems[] -> documentation pages                   |
|       +-- Introduction -------- Page Type A (overview)      |
|       +-- Basic Usage --------- Page Type A (live demo)     |
|       +-- Column Guide -------- Page Type B (with TOC)      |
|       +-- Advanced Usage ------ Page Type B (with TOC)      |
|       +-- ...                                              |
|                                                             |
|  UI Components:  @e-burgos/tucu-ui                         |
|  Table Library:  @e-burgos/tucutable                       |
+-------------------------------------------------------------+
```

### Page Types

| Type  | Name                       | When to use                                                                        |
| ----- | -------------------------- | ---------------------------------------------------------------------------------- |
| **A** | Introduction / Live Demo   | Landing pages, feature overviews, live table demos — no sidebar TOC                |
| **B** | Guide / Reference with TOC | Long-form content with multiple sections, sidebar navigation, lazy-loaded sections |

---

## 2. Key Components from @e-burgos/tucu-ui

All documentation UI is built with these tucu-ui exports:

| Component              | Purpose                                                                                                    |
| ---------------------- | ---------------------------------------------------------------------------------------------------------- |
| `ThemeProvider`        | App shell — sidebar, navigation, routing, dark/light mode                                                  |
| `HeroCard`             | Page hero banner — title, description, icon, CTA buttons (GitHub, docs, custom)                            |
| `TableOfContents`      | Sidebar navigation with IntersectionObserver-based active tracking, category grouping, mobile drawer       |
| `LazyComponentSection` | Viewport-aware lazy loader for sections — shows `Skeleton` fallback, integrates with TOC via custom events |
| `TableOfContentsItem`  | TypeScript interface for TOC entries: `{ id, label, category? }`                                           |
| `CardContainer`        | Base card wrapper used for demos, feature lists, code examples                                             |
| `CardTitle`            | Collapsible card header — used inside `CardContainer` for titled sections                                  |
| `CodeBlock`            | Syntax-highlighted code display with `language` and `expanded` props                                       |
| `Typography`           | Semantic text component — `tag="h1"` through `tag="headline"`                                              |
| `Badge`                | Status / count indicators                                                                                  |
| `Button`               | Action buttons for CTA, refresh, navigation                                                                |
| `Alert`                | Info/warning/error callouts for notes and tips                                                             |
| `LucideIcons`          | Unified icon system for section headers, navigation, and feature cards                                     |
| `AnchorLink`           | Link wrapper for external/internal anchors                                                                 |
| `Skeleton`             | Loading placeholder during lazy section hydration                                                          |
| `useAnchorScroll`      | Hook for automatic scroll-to-section from URL hash                                                         |
| `ScrollToTop`          | Floating button to scroll back to top                                                                      |
| `Scrollbar`            | Custom scrollbar used inside the TOC sidebar                                                               |
| `useTheme`             | Hook to access current theme mode (`dark` / `light`)                                                       |

### Import Pattern

```tsx
// UI components from tucu-ui
import { ThemeProvider, HeroCard, TableOfContents, type TableOfContentsItem, LazyComponentSection, CardContainer, CardTitle, CodeBlock, Typography, Badge, Button, Alert, LucideIcons, AnchorLink, useAnchorScroll, useTheme, type StandaloneAppRoutesMenuItem } from '@e-burgos/tucu-ui';

// Table components from tucutable (the library being documented)
import { DataTable, TanstackTable } from '@e-burgos/tucutable';
import type { IRowActions, IRowSelection } from '@e-burgos/tucutable';
```

---

## 3. App Shell Setup

The demo app uses tucu-ui's `ThemeProvider` as the app shell:

### Entry Point (app.tsx)

```tsx
import { ThemeProvider } from '@e-burgos/tucu-ui';
import { useMenuItems } from './router/menuItems';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import SwitchMode from './components/SwitchMode';

function App() {
  const queryClient = new QueryClient();
  const { menuItems } = useMenuItems();

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider
        showSettings={false}
        rightButton={<SwitchMode />}
        logo={{ name: 'Tucu', secondName: 'Table' }}
        customPaletteColor={{
          primary: '#F26522',
          darkPrimary: '#F26522',
        }}
        menuItems={menuItems}
        isAuthenticated
      />
    </QueryClientProvider>
  );
}
```

### Navigation (router/menuItems.tsx)

```tsx
import { useMemo } from 'react';
import { LucideIcons, StandaloneAppRoutesMenuItem } from '@e-burgos/tucu-ui';
import { Introduction } from '../pages/introduction';
import { BasicUsage } from '../pages/basic-usage';

export const useMenuItems = () => {
  const menuItems: StandaloneAppRoutesMenuItem[] = useMemo(
    () => [
      {
        name: 'Introduction',
        path: '/',
        icon: <LucideIcons.Home />,
        component: <Introduction />,
        isPublic: true,
      },
      {
        name: 'Basic Usage',
        path: '/basic-usage',
        icon: <LucideIcons.Table />,
        component: <BasicUsage />,
        isPublic: true,
      },
    ],
    [],
  );

  return { menuItems };
};
```

### Adding New Pages

To add a new documentation page:

1. Create the page component in `apps/demo/src/pages/<page-name>/index.tsx`
2. Add it to `menuItems` in `apps/demo/src/router/menuItems.tsx`
3. For nested pages, use `dropdownItems` on the parent menu item

---

## 4. Custom HeroPage Component

The demo app wraps tucu-ui components into a custom `HeroPage` for consistent hero banners across all documentation pages:

```tsx
// apps/demo/src/components/HeroPage.tsx
import { Button, Typography, useTheme, AnchorLink, LucideIcons } from '@e-burgos/tucu-ui';
import { GITHUB_URL } from '../utils/constants';

interface HeroPageProps {
  icon?: React.ReactNode;
  title?: string;
  description?: string;
  githubButton?: boolean;
  getStartedButton?: boolean;
  docsButton?: 'introduction' | 'examples';
  backgroundAnimation?: boolean;
  customButton?: {
    label: string;
    link: string;
    target: '_blank' | '_self' | '_parent' | '_top';
    variant: ButtonProps['variant'];
    icon?: React.ReactNode;
  };
}
```

### Hero Icon Pattern

Always use a branded image or icon in the hero:

```tsx
<HeroPage title="Basic Usage" description="Learn how to use Tucutable with real-world data." icon={<img src={TucuTableLogo} className="w-48 h-48 text-white filter drop-shadow-sm" />} />
```

Or with a LucideIcon in a circular container:

```tsx
<HeroPage
  icon={
    <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 bg-brand/70 rounded-full flex items-center justify-center shadow-lg border border-brand/50">
      <LucideIcons.BookOpen className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 text-white filter drop-shadow-lg" />
    </div>
  }
/>
```

---

## 5. Page Type A — Introduction / Overview

Used for landing pages, feature overviews, and live demo pages. No sidebar TOC. All content renders directly.

### Structure

```tsx
import { CardContainer, Typography, LucideIcons, CodeBlock, Alert, CardTitle, Badge, Button } from '@e-burgos/tucu-ui';
import HeroPage from '../../components/HeroPage';

export function MyDocPage() {
  return (
    <div className="space-y-8 sm:space-y-12 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
      {/* Hero */}
      <HeroPage title="Page Title" description="Page description." githubButton getStartedButton backgroundAnimation icon={<img src={Logo} className="w-48 h-48" />} />

      {/* Feature Grid */}
      <section className="space-y-8">
        <div className="text-center">
          <Typography tag="h2" className="mb-4 text-2xl sm:text-3xl md:text-4xl font-bold">
            Key Features
          </Typography>
          <Typography tag="p" className="text-base sm:text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Description of features
          </Typography>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {features.map((feature, i) => (
            <CardContainer key={i} className="group hover:shadow-large transition-all duration-300 hover:-translate-y-1">
              <div className="w-full space-y-4">
                <div className="flex items-center gap-4">
                  <div className={`p-3 rounded-xl bg-gradient-to-br ${feature.color} group-hover:scale-110 transition-all duration-300 shadow-lg`}>{feature.icon}</div>
                  <Typography tag="h3" className="font-semibold text-lg">
                    {feature.title}
                  </Typography>
                </div>
                <Typography tag="p" className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  {feature.description}
                </Typography>
              </div>
            </CardContainer>
          ))}
        </div>
      </section>
    </div>
  );
}
```

### Pattern Rules

- Root container: `max-w-6xl mx-auto px-4 sm:px-6 lg:px-8` (or `max-w-7xl` for wider tables)
- Vertical spacing: `space-y-8 sm:space-y-12`
- `HeroPage` is always the first element
- Sections use centered headers (`text-center`) + responsive grids of `CardContainer`
- Feature cards use gradient icon containers: `bg-gradient-to-br from-{color}-500 to-{color}-500`

---

## 6. Page Type A with Live DataTable Demo

The most common pattern: a documentation page with a live `DataTable` from tucutable, surrounded by tucu-ui documentation components.

### Complete Example (Basic Usage Page)

```tsx
import { useState } from 'react';
import { DataTable, TanstackTable } from '@e-burgos/tucutable';
import { CardContainer, Typography, LucideIcons, CodeBlock, Alert, CardTitle, Button } from '@e-burgos/tucu-ui';
import HeroPage from '../../components/HeroPage';

export function BasicUsage() {
  const [pagination, setPagination] = useState<TanstackTable.PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  const columns = useStarWarsColumns();
  const { data, isLoading, isError, error, totalCount, isFetching } = useStarWarsPeople({ pagination });

  return (
    <div className="space-y-8 sm:space-y-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
      {/* 1. Hero */}
      <HeroPage title="Basic Usage" description="Learn how to use Tucutable with real-world data." />

      {/* 2. Feature description card */}
      <section className="space-y-6">
        <CardContainer>
          <CardTitle title="Live Example: Star Wars Characters" className="mb-4 mt-6">
            <div className="space-y-4">
              <Typography tag="p" className="text-gray-600 dark:text-gray-400">
                This example demonstrates Tucutable capabilities using the Star Wars API.
              </Typography>
              <Alert variant="info" dismissible={false}>
                <Typography tag="p" className="text-sm text-gray-600 dark:text-gray-400">
                  <LucideIcons.Info className="w-4 h-4 inline mr-2" />
                  Try dragging columns to reorder them!
                </Typography>
              </Alert>
            </div>
          </CardTitle>
        </CardContainer>
      </section>

      {/* 3. Live DataTable demo */}
      <section className="space-y-6">
        <DataTable
          tableId="star-wars-characters"
          data={data}
          columns={columns}
          isLoading={isLoading}
          isError={isError}
          isFetching={isFetching}
          pagination={{ showPagination: true, rowsInfo: true, serverPagination: { totalCount, pagination, setPagination } }}
          enableMultiSort={true}
          renderSubComponent={({ row }) => {
            if (!row) return null;
            return <PersonDetails person={row.original} />;
          }}
        />
      </section>

      {/* 4. Code examples */}
      <section className="space-y-6">
        <CardContainer>
          <CardTitle title="Implementation Code" className="mt-6 mb-4">
            <div className="space-y-6">
              <div className="space-y-3">
                <Typography tag="h4" className="font-semibold text-gray-900 dark:text-white mb-2">
                  1. Installation
                </Typography>
                <CodeBlock language="bash" code="pnpm install @e-burgos/tucutable" />
              </div>
              <div className="space-y-3">
                <Typography tag="h4" className="font-semibold text-gray-900 dark:text-white mb-2">
                  2. Import Styles
                </Typography>
                <CodeBlock language="css" code="@import '@e-burgos/tucutable/styles';" />
              </div>
              <div className="space-y-3">
                <Typography tag="h4" className="font-semibold text-gray-900 dark:text-white mb-2">
                  3. Basic Usage
                </Typography>
                <CodeBlock language="tsx" code={basicUsageCode} />
              </div>
            </div>
          </CardTitle>
        </CardContainer>
      </section>
    </div>
  );
}
```

### Key Pattern: Mixing tucutable + tucu-ui

- **tucu-ui** provides the page shell: `CardContainer`, `CardTitle`, `Typography`, `CodeBlock`, `Alert`, `Badge`, `LucideIcons`, `Button`, `AnchorLink`
- **tucutable** provides the live table demo: `DataTable`, `TanstackTable` types
- The `headerContainer` prop on `DataTable` uses tucu-ui components for a custom table header
- Sub-components (`renderSubComponent`) use tucu-ui's `CardContainer`, `Typography`, `LucideIcons` for styled detail views

---

## 7. Page Type B — Guide / Reference with TOC

Used for long-form pages with many sections. Features a sidebar table of contents and lazy-loaded sections.

### Structure

```tsx
import React, { lazy } from 'react';
import { TableOfContents, type TableOfContentsItem, LazyComponentSection, LucideIcons, useAnchorScroll } from '@e-burgos/tucu-ui';
import HeroPage from '../../components/HeroPage';

// Lazy load each section
const GettingStartedSection = lazy(() => import('./sections/GettingStartedSection'));
const ColumnGuideSection = lazy(() => import('./sections/ColumnGuideSection'));
const PaginationSection = lazy(() => import('./sections/PaginationSection'));
const RowActionsSection = lazy(() => import('./sections/RowActionsSection'));
const AdvancedSection = lazy(() => import('./sections/AdvancedSection'));

export function ColumnGuidePage() {
  useAnchorScroll();

  const tocItems: TableOfContentsItem[] = [
    { id: 'getting-started', label: 'Getting Started' },
    { id: 'column-guide', label: 'Column Definitions' },
    { id: 'pagination', label: 'Pagination' },
    { id: 'row-actions', label: 'Row Actions' },
    { id: 'advanced', label: 'Advanced Usage' },
  ];

  return (
    <div className="relative scroll-smooth">
      <TableOfContents items={tocItems}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 sm:space-y-12 pt-8 lg:pt-0">
          <HeroPage title="Column Guide" description="Everything about column definitions." />

          <LazyComponentSection id="getting-started" component={GettingStartedSection} />
          <LazyComponentSection id="column-guide" component={ColumnGuideSection} />
          <LazyComponentSection id="pagination" component={PaginationSection} />
          <LazyComponentSection id="row-actions" component={RowActionsSection} />
          <LazyComponentSection id="advanced" component={AdvancedSection} />
        </div>
      </TableOfContents>
    </div>
  );
}
```

### Pattern Rules

- Outer wrapper: `<div className="relative scroll-smooth">`
- `TableOfContents` wraps all content and renders the sidebar
- Content wrapper inside: `max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 sm:space-y-12 pt-8 lg:pt-0`
- `HeroPage` always first inside the content wrapper
- Each section is a `LazyComponentSection` whose `id` matches `tocItems[].id`
- Always call `useAnchorScroll()` at the top of the component

### TOC with Categories

For pages with many sections, group them:

```tsx
const tocItems: TableOfContentsItem[] = [
  { id: 'basic-columns', label: 'Basic Columns', category: 'Column Definitions' },
  { id: 'custom-cells', label: 'Custom Cell Renderers', category: 'Column Definitions' },
  { id: 'sorting', label: 'Sorting', category: 'Column Features' },
  { id: 'resizing', label: 'Resizing', category: 'Column Features' },
  { id: 'pinning', label: 'Pinning', category: 'Column Features' },
  { id: 'drag-drop', label: 'Drag & Drop', category: 'Column Features' },
];
```

---

## 8. Section Composition Patterns

Each lazy-loaded section is a standalone React component exported as `default`. They follow consistent patterns.

### 8.1 Section Header (always present)

```tsx
<div className="text-center space-y-4">
  <Typography tag="h2" className="text-3xl md:text-4xl font-bold">
    Section Title
  </Typography>
  <Typography tag="p" className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
    Brief description of this section.
  </Typography>
</div>
```

### 8.2 Feature / Concept Grid Section

Grid of cards explaining tucutable concepts:

```tsx
export default function FeaturesSection() {
  const features = [
    {
      icon: <LucideIcons.GripVertical className="w-8 h-8 text-white" />,
      title: 'Drag & Drop Reordering',
      description: 'Reorder columns via drag and drop with @dnd-kit',
      color: 'from-blue-500 via-cyan-500 to-teal-500',
    },
    {
      icon: <LucideIcons.Move className="w-8 h-8 text-white" />,
      title: 'Column Resizing',
      description: 'Resize columns with min/max constraints and persistence',
      color: 'from-green-500 via-emerald-500 to-teal-500',
    },
  ];

  return (
    <>
      <div className="text-center space-y-4">
        <Typography tag="h2" className="text-3xl md:text-4xl font-bold">
          Column Management
        </Typography>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
        {features.map((item, i) => (
          <CardContainer key={i}>
            <div className="w-full space-y-4">
              <div className="flex items-center gap-4">
                <div className={`p-3 rounded-xl bg-gradient-to-br ${item.color} shadow-lg`}>{item.icon}</div>
                <Typography tag="h3" className="font-semibold text-lg">
                  {item.title}
                </Typography>
              </div>
              <Typography tag="p" className="text-gray-600 dark:text-gray-400 leading-relaxed">
                {item.description}
              </Typography>
            </div>
          </CardContainer>
        ))}
      </div>
    </>
  );
}
```

### 8.3 Live Table Demo Section

A section with a live DataTable example:

```tsx
import { DataTable, TanstackTable } from '@e-burgos/tucutable';
import { CardContainer, CardTitle, Typography, CodeBlock, Alert, LucideIcons } from '@e-burgos/tucu-ui';

export default function PaginationDemoSection() {
  const [pagination, setPagination] = useState<TanstackTable.PaginationState>({ pageIndex: 0, pageSize: 5 });
  const data = ALL_DATA.slice(pagination.pageIndex * pagination.pageSize, (pagination.pageIndex + 1) * pagination.pageSize);

  return (
    <>
      <div className="text-center space-y-4">
        <Typography tag="h2" className="text-3xl md:text-4xl font-bold">
          Pagination
        </Typography>
        <Typography tag="p" className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Client-side, server-side, and manual pagination modes.
        </Typography>
      </div>

      {/* Live demo */}
      <DataTable
        tableId="pagination-demo"
        data={data}
        columns={columns}
        pagination={{
          showPagination: true,
          manualPagination: { enabled: true, rowCount: ALL_DATA.length, pagination, setPagination },
        }}
      />

      {/* Code example */}
      <CardContainer>
        <CardTitle title="Code Example">
          <div className="p-4 sm:p-6">
            <CodeBlock language="tsx" code={paginationCode} />
          </div>
        </CardTitle>
      </CardContainer>
    </>
  );
}
```

### 8.4 Step-by-Step Tutorial Section

Sequential cards with numbered steps:

```tsx
export default function GettingStartedSection() {
  return (
    <>
      <div className="text-center space-y-4">
        <Typography tag="h2" className="text-3xl md:text-4xl font-bold">
          Getting Started
        </Typography>
        <Typography tag="p" className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Get up and running with Tucutable in minutes.
        </Typography>
      </div>

      <CardContainer>
        <CardTitle title="1. Install the package">
          <div className="p-4 sm:p-6 space-y-4">
            <CodeBlock language="bash" code="pnpm install @e-burgos/tucutable" />
          </div>
        </CardTitle>
      </CardContainer>

      <CardContainer>
        <CardTitle title="2. Import Styles">
          <div className="p-4 sm:p-6 space-y-4">
            <CodeBlock language="css" code="@import '@e-burgos/tucutable/styles';" />
            <Alert variant="info" dismissible={false}>
              <Typography tag="p" className="text-sm">
                Tucutable includes a complete Tailwind CSS v4 setup. No additional Tailwind installation required.
              </Typography>
            </Alert>
          </div>
        </CardTitle>
      </CardContainer>

      <CardContainer>
        <CardTitle title="3. Create your first table">
          <div className="p-4 sm:p-6 space-y-4">
            <CodeBlock language="tsx" code={firstTableCode} />
          </div>
        </CardTitle>
      </CardContainer>
    </>
  );
}
```

---

## 9. Sub-Components for Expandable Rows

When documenting `renderSubComponent`, use tucu-ui components for the detail view:

```tsx
import { CardContainer, Typography, LucideIcons } from '@e-burgos/tucu-ui';

export function PersonDetails({ person }: { person: StarWarsPerson }) {
  return (
    <CardContainer className="p-4 m-2">
      <div className="space-y-4">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-full flex items-center justify-center">
            <LucideIcons.User className="w-6 h-6 text-white" />
          </div>
          <Typography tag="h3" className="text-xl font-bold">
            {person.name}
          </Typography>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex items-center gap-2">
            <LucideIcons.Ruler className="w-4 h-4 text-gray-500" />
            <Typography tag="span" className="text-sm font-medium">
              Height:
            </Typography>
            <Typography tag="span" className="text-sm">
              {person.height} cm
            </Typography>
          </div>
        </div>
      </div>
    </CardContainer>
  );
}
```

---

## 10. Custom Table Headers

The `headerOptions.headerContainer` prop on `DataTable` accepts JSX — use tucu-ui components:

```tsx
<DataTable
  tableId="my-table"
  data={data}
  columns={columns}
  headerOptions={{
    headerContainer: (
      <div className="p-4 w-full">
        <div className="flex items-center justify-between">
          <Typography tag="h3" className="text-table-primary-text text-lg font-semibold">
            Table Title
          </Typography>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            {isFetching && <LucideIcons.Loader2 className="w-4 h-4 animate-spin" />}
            <LucideIcons.Database className="w-4 h-4" />
            <span>{totalCount} records</span>
            <Button shape="circle" onClick={handleRefresh} variant="ghost" size="tiny">
              <LucideIcons.RefreshCw className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    ),
    enableHideColumns: true,
    enableSortColumns: true,
    enableResizeColumns: true,
    enableDragColumns: true,
  }}
/>
```

---

## 11. Responsive Grid Patterns

| Grid                                                       | Use case                              |
| ---------------------------------------------------------- | ------------------------------------- |
| `grid-cols-1 sm:grid-cols-2`                               | Feature/principle cards (2-column)    |
| `grid-cols-1 md:grid-cols-2`                               | Live demos side-by-side, detail grids |
| `grid-cols-1 md:grid-cols-3`                               | Technology cards, category cards      |
| `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3`                | Feature catalogs, key features        |
| `grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4` | Compact feature categories            |
| `grid-cols-2`                                              | Inline feature lists inside cards     |

All grids use `gap-4 sm:gap-6` for consistent spacing.

---

## 12. Typography Hierarchy

| Purpose             | Component               | Classes                                                      |
| ------------------- | ----------------------- | ------------------------------------------------------------ |
| Page title          | `HeroPage title`        | Handled internally (responsive h1 with brand color)          |
| Section heading     | `Typography tag="h2"`   | `text-3xl md:text-4xl font-bold` or `text-2xl sm:text-3xl`   |
| Section subtitle    | `Typography tag="p"`    | `text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto` |
| Sub-section heading | `Typography tag="h3"`   | `text-lg font-semibold` or `text-xl font-bold`               |
| Step heading        | `Typography tag="h4"`   | `font-semibold text-gray-900 dark:text-white`                |
| Card heading        | `CardTitle title="..."` | Handled internally                                           |
| Body text           | `Typography tag="p"`    | `text-gray-600 dark:text-gray-400` or `text-sm`              |
| Small label         | `Typography tag="p"`    | `text-xs text-gray-500 dark:text-gray-400`                   |
| Inline data label   | `Typography tag="span"` | `text-sm font-medium`                                        |

---

## 13. Color Palette for Feature Icons

Use distinct gradients for each tucutable feature section:

| Feature Section   | Gradient for Icon Container                    |
| ----------------- | ---------------------------------------------- |
| Column Management | `from-purple-500 via-purple-600 to-pink-500`   |
| Performance       | `from-orange-500 via-yellow-500 to-amber-500`  |
| Developer Tools   | `from-blue-500 via-cyan-500 to-teal-500`       |
| Responsive        | `from-green-500 via-emerald-500 to-teal-500`   |
| Theming           | `from-indigo-500 via-purple-500 to-violet-500` |
| State Persistence | `from-red-500 via-pink-500 to-rose-500`        |
| Accessibility     | `from-teal-500 via-cyan-500 to-blue-500`       |
| Rich Features     | `from-amber-500 via-yellow-500 to-orange-500`  |
| Data Management   | `from-blue-500 to-cyan-500`                    |
| Sorting           | `from-green-500 to-emerald-500`                |
| Pagination        | `from-orange-500 to-amber-500`                 |
| Row Actions       | `from-red-500 to-pink-500`                     |
| Drag and Drop     | `from-blue-500 to-cyan-500`                    |
| Column Pinning    | `from-orange-500 to-amber-500`                 |
| Column Visibility | `from-purple-500 to-violet-500`                |

Apply to containers: `<div className="p-3 rounded-xl bg-gradient-to-br from-... to-... shadow-lg">`

---

## 14. Constants and External Links

Centralize all URLs in a constants file:

```tsx
// apps/demo/src/utils/constants.ts
export const DOCUMENTATION_URL = import.meta.env.VITE_APP_STORYBOOK_URL;
export const GITHUB_URL = 'https://github.com/e-burgos/tucutable';
export const INTRODUCTION_DOCS_URL = `${DOCUMENTATION_URL}?path=/docs/documentation-introduction--documentation`;
export const EXAMPLES_DOCS_URL = `${DOCUMENTATION_URL}?path=/story/examples-tucutable--default`;
```

---

## 15. Performance Patterns

### Lazy Loading Sections

Every section in Page Type B should be lazy-loaded:

```tsx
const MySection = lazy(() => import('./sections/MySection'));
```

`LazyComponentSection` handles:

- **Viewport detection**: IntersectionObserver with 800px rootMargin
- **TOC integration**: Listens for `forceLoadSection` custom events when TOC items are clicked
- **Hash navigation**: Loads immediately if URL hash matches section id
- **Skeleton fallback**: Shows `Skeleton` placeholders while loading

### NavOptions Component

For the theme switch in navigation:

```tsx
import SwitchMode from './components/SwitchMode';

<ThemeProvider
  rightButton={<SwitchMode />}
  menuItems={menuItems}
  // ...
/>;
```

---

## 16. Implementation Checklist

When creating a new documentation page for a tucutable feature:

1. **Choose page type**: Type A for overviews/demos, Type B for long guides with TOC
2. **Create the page** in `apps/demo/src/pages/<page-name>/index.tsx`
3. **Add to menuItems** in `apps/demo/src/router/menuItems.tsx`
4. **Add HeroPage** with title, description, and icon
5. **For live demos**: Import `DataTable` from `@e-burgos/tucutable` and render with sample data
6. **For code examples**: Wrap in `CardContainer > CardTitle > CodeBlock`
7. **For feature descriptions**: Use `CardContainer` grids with gradient icons
8. **For tips/notes**: Use `Alert` with `variant="info"` and `LucideIcons.Info`
9. **For step-by-step guides**: Numbered `CardTitle` items with `CodeBlock`
10. **For sub-components**: Create in `pages/<page-name>/components/` using tucu-ui components
11. **For column definitions**: Create hooks in `pages/<page-name>/hooks/` returning `TanstackTable.ColumnDef[]`
12. **For Page Type B**: Add TOC items, lazy-load sections, call `useAnchorScroll()`
13. **Build and test**: Run `pnpm nx serve demo` to verify

---

## 17. Recommended Project Structure

```text
apps/demo/src/
|-- app.tsx                              # ThemeProvider + QueryClient
|-- main.tsx                             # Entry point
|-- router/
|   +-- menuItems.tsx                    # StandaloneAppRoutesMenuItem[]
|-- components/
|   |-- HeroPage.tsx                     # Custom hero component (wraps tucu-ui)
|   +-- SwitchMode.tsx                   # Theme toggle
|-- pages/
|   |-- introduction/
|   |   +-- index.tsx                    # Page Type A - landing
|   |-- basic-usage/
|   |   |-- index.tsx                    # Page Type A - live table demo
|   |   |-- components/
|   |   |   +-- PersonDetails.tsx        # Sub-component (tucu-ui styled)
|   |   +-- hooks/
|   |       +-- useStarWarsColumns.tsx   # Column definitions hook
|   |-- column-guide/                    # (example) Page Type B
|   |   |-- index.tsx                    # TOC + lazy sections
|   |   +-- sections/
|   |       |-- BasicColumnsSection.tsx
|   |       |-- CustomCellsSection.tsx
|   |       +-- ColumnFeaturesSection.tsx
|   +-- advanced-usage/                  # (example) Page Type B
|       |-- index.tsx
|       +-- sections/
|           |-- ContextSection.tsx
|           |-- StoreSection.tsx
|           +-- DragDropSection.tsx
|-- queries/
|   |-- types.ts                         # API response types
|   +-- useStarWarsPeople.ts             # React Query hook
|-- utils/
|   +-- constants.ts                     # External URLs
+-- assets/
    +-- images/                          # Logos and images
```

---

## 18. Agent Guidelines

1. **Two packages, clear roles**: `@e-burgos/tucu-ui` is for UI/documentation shell; `@e-burgos/tucutable` is for the data tables being documented
2. **Page Type A for overviews**: Use for landing, feature overviews, and live demo pages
3. **Page Type B for depth**: Use `TableOfContents` + `LazyComponentSection` for pages with 3+ sections
4. **One section = one file**: Each lazy-loaded section should be its own file with a `default` export
5. **Consistent section headers**: Every section starts with centered `h2` + `p` subtitle
6. **CodeBlock for examples**: Always wrap in `CardContainer > CardTitle title="Code Example"`
7. **Feature cards with gradients**: Use unique gradient colors per feature for visual distinction
8. **Lazy load everything**: On Type B pages, never render sections directly — always use `LazyComponentSection`
9. **TOC categories**: When a page has 10+ sections, group with `category` in `TableOfContentsItem`
10. **Read companion skills**: Before writing code examples, read `tucutable-usage`, `tucutable-columns`, or `tucutable-advanced` skills for correct API usage
