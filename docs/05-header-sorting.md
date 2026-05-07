# Header & Sorting — Plan de implementación

**Ruta objetivo:** `apps/demo/src/pages/header-sorting/`

**Tipo de página:** Type B — `DynamicSectionsPage` con `TableOfContents` + lazy sections

---

## Estructura de archivos

```
apps/demo/src/pages/header-sorting/
├── index.tsx
├── hooks/
│   └── useHeaderSortingData.ts       // Mock data para demos
└── sections/
    ├── IntroSection.tsx              // Overview: qué se puede personalizar en el header
    ├── HeaderActionsSection.tsx      // IHeaderOptions — botones de toolbar
    ├── SortingSection.tsx            // Sorting: enableSorting, multi-sort, sort icons
    ├── HeaderContainerSection.tsx    // HeaderContainerProps — custom header container
    └── HeaderActionsCustomSection.tsx // HeaderActionType — acciones custom en toolbar
```

---

## Secciones del TOC

```
intro                → Introduction
header-options       → Header Options (Toolbar)
  ├── built-in       → Built-in Buttons
  └── custom-actions → Custom Header Actions
sorting              → Sorting Configuration
  ├── single-sort    → Single Column Sort
  └── multi-sort     → Multi-Column Sort
header-container     → Header Container Props
```

---

## Tipos documentados

### `IHeaderOptions`

```ts
interface IHeaderOptions {
  showHeader?: boolean; // default: true — mostrar el header/toolbar
  showColumnsButton?: boolean; // default: false — botón de visibilidad de columnas
  showFilterButton?: boolean; // default: false — botón de filtro global
  showDensityButton?: boolean; // default: false — botón de densidad (compact/normal)
  showFullscreenButton?: boolean; // default: false — botón de pantalla completa
  showRefreshButton?: boolean; // default: false — botón de refresh
  onRefresh?: () => void; // handler del botón refresh
  headerTitle?: string; // título en el lado izquierdo del header
  headerDescription?: string; // subtítulo en el lado izquierdo
  headerActions?: HeaderActionType[]; // acciones custom en el lado derecho
}
```

### `HeaderActionType`

```ts
interface HeaderActionType {
  label: string;
  icon?: ReactNode;
  onClick: () => void;
  disabled?: boolean;
  color?: 'primary' | 'white' | 'gray' | 'success' | 'warning' | 'danger';
  variant?: 'solid' | 'ghost' | 'transparent';
  tooltip?: string;
}
```

### `HeaderContainerProps`

```ts
interface HeaderContainerProps {
  headerContainer?: {
    className?: string;
    style?: React.CSSProperties;
  };
  toolbar?: {
    className?: string;
    style?: React.CSSProperties;
  };
}
```

---

## Borradores de secciones

### `sections/IntroSection.tsx`

```tsx
<CardContainer>
  <CardTitle title="Header & Toolbar Overview">
    <Typography tag="p">
      Tucutable's header (toolbar) sits above the table and provides navigation, column management, search, and custom actions. All header features are configured via the <code>headerActions</code> prop.
    </Typography>

    <Alert variant="info">
      The header is optional — set <code>headerActions.showHeader = false</code> to hide it entirely and render the table without a toolbar.
    </Alert>

    {/* Visual diagram: Left (title + description) | Right (action buttons) */}
    <div className="border border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-4 mt-4">
      <div className="flex items-center justify-between">
        <div>
          <Typography tag="caption" color="muted">
            ← headerTitle
          </Typography>
          <Typography tag="caption" color="muted">
            ← headerDescription
          </Typography>
        </div>
        <div className="flex gap-2">
          <Badge color="gray">Columns</Badge>
          <Badge color="gray">Filter</Badge>
          <Badge color="gray">Density</Badge>
          <Badge color="gray">Fullscreen</Badge>
          <Badge color="gray">Refresh</Badge>
          <Badge color="primary">Custom actions →</Badge>
        </div>
      </div>
    </div>
  </CardTitle>
</CardContainer>
```

---

### `sections/HeaderActionsSection.tsx`

```tsx
<AutoPropsTable
  title="IHeaderOptions Reference"
  props={[
    { prop: 'showHeader',           type: 'boolean',              default: 'true',  description: 'Show or hide the entire header/toolbar' },
    { prop: 'showColumnsButton',    type: 'boolean',              default: 'false', description: 'Show "Columns" button — opens column visibility panel' },
    { prop: 'showFilterButton',     type: 'boolean',              default: 'false', description: 'Show global filter/search input' },
    { prop: 'showDensityButton',    type: 'boolean',              default: 'false', description: 'Show density toggle (compact ↔ normal rows)' },
    { prop: 'showFullscreenButton', type: 'boolean',              default: 'false', description: 'Show fullscreen toggle button' },
    { prop: 'showRefreshButton',    type: 'boolean',              default: 'false', description: 'Show refresh button — requires onRefresh handler' },
    { prop: 'onRefresh',            type: '() => void',           required: false,  description: 'Callback fired when refresh button is clicked' },
    { prop: 'headerTitle',          type: 'string',               required: false,  description: 'Title text on the left side of the toolbar' },
    { prop: 'headerDescription',    type: 'string',               required: false,  description: 'Subtitle text below the title in the toolbar' },
    { prop: 'headerActions',        type: 'HeaderActionType[]',   required: false,  description: 'Custom action buttons on the right side of the toolbar' },
  ]}
/>

<PropPlayground
  title="Header Options Playground"
  controls={[
    { type: 'boolean', prop: 'showHeader',           label: 'Show Header',      defaultValue: true  },
    { type: 'boolean', prop: 'showColumnsButton',    label: 'Columns Button',   defaultValue: false },
    { type: 'boolean', prop: 'showFilterButton',     label: 'Filter Button',    defaultValue: false },
    { type: 'boolean', prop: 'showDensityButton',    label: 'Density Button',   defaultValue: false },
    { type: 'boolean', prop: 'showFullscreenButton', label: 'Fullscreen Button',defaultValue: false },
    { type: 'boolean', prop: 'showRefreshButton',    label: 'Refresh Button',   defaultValue: false },
    { type: 'text',    prop: 'headerTitle',          label: 'Header Title',     defaultValue: 'Data Table' },
  ]}
  renderDemo={(vals) => (
    <DataTable
      tableId="header-options-demo"
      data={HEADER_DEMO_DATA}
      columns={headerColumns}
      headerActions={{
        showHeader:           vals.showHeader           as boolean,
        showColumnsButton:    vals.showColumnsButton    as boolean,
        showFilterButton:     vals.showFilterButton     as boolean,
        showDensityButton:    vals.showDensityButton    as boolean,
        showFullscreenButton: vals.showFullscreenButton as boolean,
        showRefreshButton:    vals.showRefreshButton    as boolean,
        headerTitle:          vals.headerTitle          as string,
        onRefresh: () => alert('Refresh clicked!'),
      }}
    />
  )}
  renderCode={(vals) => `<DataTable
  data={data}
  columns={columns}
  headerActions={{
    showHeader:           ${vals.showHeader},
    showColumnsButton:    ${vals.showColumnsButton},
    showFilterButton:     ${vals.showFilterButton},
    showDensityButton:    ${vals.showDensityButton},
    showFullscreenButton: ${vals.showFullscreenButton},
    headerTitle:          "${vals.headerTitle}",
  }}
/>`}
/>
```

---

### `sections/HeaderActionsCustomSection.tsx`

```tsx
<AutoPropsTable
  title="HeaderActionType Reference"
  props={[
    { prop: 'label',   type: 'string',                              required: true,  description: 'Button label text' },
    { prop: 'icon',    type: 'ReactNode',                           required: false, description: 'Icon to show before the label' },
    { prop: 'onClick', type: '() => void',                          required: true,  description: 'Click handler' },
    { prop: 'disabled',type: 'boolean',                             default: 'false',description: 'Disable the button' },
    { prop: 'color',   type: '"primary"|"white"|"gray"|"success"|"warning"|"danger"', default: '"gray"', description: 'Button color variant' },
    { prop: 'variant', type: '"solid"|"ghost"|"transparent"',        default: '"ghost"', description: 'Button visual variant' },
    { prop: 'tooltip', type: 'string',                              required: false, description: 'Tooltip text on hover' },
  ]}
/>

<CodeBlock
  language="tsx"
  code={`<DataTable
  data={data}
  columns={columns}
  headerActions={{
    headerTitle: 'Users',
    headerActions: [
      {
        label: 'Export',
        icon: <LucideIcons.Download className="w-4 h-4" />,
        onClick: handleExport,
        color: 'primary',
        variant: 'solid',
        tooltip: 'Export to CSV',
      },
      {
        label: 'Import',
        icon: <LucideIcons.Upload className="w-4 h-4" />,
        onClick: handleImport,
        color: 'gray',
        variant: 'ghost',
      },
    ],
  }}
/>`}
/>
```

---

### `sections/SortingSection.tsx`

```tsx
// Contenido:
// 1. Cómo funciona el sorting por defecto
// 2. enableSorting a nivel de DataTable
// 3. Multi-sort (shift + click)
// 4. sortingFn options
// 5. Controlled sorting state

<AutoPropsTable
  title="Sorting Configuration"
  props={[
    { prop: 'enableSorting',       type: 'boolean',                    default: 'true',  description: 'Enable sorting for all columns (override per column with ColumnDef)' },
    { prop: 'enableMultiSort',     type: 'boolean',                    default: 'true',  description: 'Allow sorting by multiple columns (Shift+Click)' },
    { prop: 'maxMultiSortColCount',type: 'number',                     default: 'Infinity', description: 'Maximum number of columns that can be sorted simultaneously' },
    { prop: 'manualSorting',       type: 'boolean',                    default: 'false', description: 'Disable automatic sorting — use with server-side sorting' },
    { prop: 'onSortingChange',     type: 'OnChangeFn<SortingState>',   required: false,  description: 'Callback for controlled sorting state — receive new sort state' },
    { prop: 'state.sorting',       type: 'SortingState',               required: false,  description: 'External sorting state (controlled mode)' },
  ]}
/>

<PropPlayground
  title="Sorting Playground"
  controls={[
    { type: 'boolean', prop: 'enableSorting',   label: 'Enable Sorting',   defaultValue: true },
    { type: 'boolean', prop: 'enableMultiSort', label: 'Multi-Sort',       defaultValue: true },
  ]}
  renderDemo={(vals) => (
    <DataTable
      tableId="sorting-demo"
      data={HEADER_DEMO_DATA}
      columns={headerColumns}
    />
    // Nota: enableSorting y enableMultiSort son props de nivel tabla
    // De ser necesario ajustar pasar estos como props del DataTable cuando se documente
  )}
/>

<Alert variant="info">
  Multi-sort is enabled by default. Users can hold <kbd>Shift</kbd> and click
  additional column headers to sort by multiple columns simultaneously.
</Alert>

<CodeBlock
  language="tsx"
  code={`// Controlled sorting (server-side)
import { useState } from 'react';
import type { TanstackTable } from '@e-burgos/tucutable';

const [sorting, setSorting] = useState<TanstackTable.SortingState>([]);

<DataTable
  data={data}
  columns={columns}
  // Pass to TanStack Table options if exposed via DataTable
  // Check tucutable-advanced skill for table state access
/>`}
/>
```

---

## Página `index.tsx`

```tsx
// apps/demo/src/pages/header-sorting/index.tsx
import { lazy } from 'react';
import { DynamicSectionsPage } from '../../components/DynamicSectionsPage';
import HeroPage from '../../components/HeroPage';

export function HeaderSortingPage() {
  return (
    <DynamicSectionsPage
      hero={<HeroPage title="Header & Sorting" description="Configure the table toolbar with built-in buttons, custom actions, and full sorting control." />}
      sections={[
        { id: 'intro', label: 'Introduction', component: lazy(() => import('./sections/IntroSection')) },
        {
          id: 'header-options',
          label: 'Header Options',
          component: lazy(() => import('./sections/HeaderActionsSection')),
          children: [
            { id: 'built-in', label: 'Built-in Buttons', component: lazy(() => import('./sections/HeaderActionsSection')) },
            { id: 'custom-actions', label: 'Custom Actions', component: lazy(() => import('./sections/HeaderActionsCustomSection')) },
          ],
        },
        {
          id: 'sorting',
          label: 'Sorting',
          component: lazy(() => import('./sections/SortingSection')),
          children: [
            { id: 'single-sort', label: 'Single Column Sort', component: lazy(() => import('./sections/SortingSection')) },
            { id: 'multi-sort', label: 'Multi-Column Sort', component: lazy(() => import('./sections/SortingSection')) },
          ],
        },
        { id: 'header-container', label: 'Header Container', component: lazy(() => import('./sections/HeaderContainerSection')) },
      ]}
    />
  );
}
```

---

## Mock data

```tsx
// apps/demo/src/pages/header-sorting/hooks/useHeaderSortingData.ts
export interface HeaderDemoRow {
  id: number;
  name: string;
  title: string;
  department: string;
  manager: string;
  hireDate: string;
  performance: 'excellent' | 'good' | 'average' | 'poor';
}

export const HEADER_DEMO_DATA: HeaderDemoRow[] = Array.from({ length: 30 }, (_, i) => ({
  id: i + 1,
  name: `Employee ${i + 1}`,
  title: ['Senior Dev', 'Designer', 'PM', 'QA Lead', 'DevOps'][i % 5],
  department: ['Engineering', 'Product', 'Marketing', 'Finance'][i % 4],
  manager: `Manager ${(i % 5) + 1}`,
  hireDate: new Date(2018 + (i % 6), i % 12, 1).toLocaleDateString(),
  performance: (['excellent', 'good', 'average', 'poor'] as const)[i % 4],
}));
```

---

## Checklist de calidad

- [ ] `DynamicSectionsPage` con TOC funcional
- [ ] `HeroPage` con título "Header & Sorting"
- [ ] `IntroSection` con diagrama visual de toolbar (left/right sections)
- [ ] `HeaderActionsSection` con `AutoPropsTable` completo + `PropPlayground` con todos los botones
- [ ] `HeaderActionsCustomSection` con `AutoPropsTable` + `CodeBlock` (export/import buttons)
- [ ] `SortingSection` con `AutoPropsTable` + `PropPlayground` + `Alert` sobre Shift+Click + `Alert` sobre multi-sort
- [ ] `HeaderContainerSection` con `AutoPropsTable` + `CodeBlock` de customización CSS
- [ ] Todas las demos usan `HEADER_DEMO_DATA` estáticos
- [ ] Responsive / dark mode
