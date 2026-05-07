# Column Guide — Plan de implementación

**Ruta objetivo:** `apps/demo/src/pages/column-guide/`

**Tipo de página:** Type B — Página larga con `DynamicSectionsPage` + `TableOfContents` + lazy sections

---

## Estructura de archivos

```
apps/demo/src/pages/column-guide/
├── index.tsx                         // Página principal — usa DynamicSectionsPage
├── hooks/
│   ├── useColumnGuideColumns.ts      // Definición de columnas para las demos
│   └── useColumnDemoData.ts          // Mock data para las demos
└── sections/
    ├── IntroSection.tsx              // Qué es ColumnDef, relación con TanStack
    ├── BasicColumnSection.tsx        // accessorKey, accessorFn, id, header, cell
    ├── ColumnFeaturesSection.tsx     // enableSorting, enableResizing, size/minSize/maxSize
    ├── ColumnPinningSection.tsx      // pin left/right + demo
    ├── ColumnDraggingSection.tsx     // enableColumnDragging + demo
    ├── ColumnVisibilitySection.tsx   // enableHiding, defaultVisibility
    ├── HelperColumnsSection.tsx      // ExpandedColumn, RowActionsColumn, RowSelectionColumn, OffsetColumn
    └── ConvertColumnsSection.tsx     // convertColumns utility
```

---

## Secciones del TOC

```tsx
sections: [
  { id: 'intro', label: 'Introduction' },
  {
    id: 'basic',
    label: 'Column Definition',
    children: [
      { id: 'accessorKey', label: 'accessorKey & accessorFn' },
      { id: 'header', label: 'Header & Cell Renderers' },
      { id: 'sizing', label: 'Size Configuration' },
    ],
  },
  {
    id: 'features',
    label: 'Column Features',
    children: [
      { id: 'sorting', label: 'Sorting' },
      { id: 'resizing', label: 'Resizing' },
      { id: 'pinning', label: 'Pinning' },
      { id: 'dragging', label: 'Dragging' },
      { id: 'visibility', label: 'Visibility' },
    ],
  },
  { id: 'helpers', label: 'Helper Columns' },
  { id: 'convert', label: 'convertColumns' },
];
```

---

## Borradores de secciones

### `sections/IntroSection.tsx`

```tsx
// Contenido:
// - Qué es ColumnDef (type de TanStack Table)
// - Relación con TanStack Table v8
// - Cómo tucutable extiende ColumnDef
// - Alert: "All standard TanStack Table ColumnDef options are supported"
// - CodeBlock: import básico

<CardContainer>
  <CardTitle title="Introduction">
    <Typography tag="p">
      Tucutable uses <code>ColumnDef</code> from TanStack Table v8...
    </Typography>
    <Alert variant="info">
      All standard TanStack Table v8 <code>ColumnDef</code> options are fully supported. Tucutable adds additional meta configuration for column-level features.
    </Alert>
    <CodeBlock
      language="tsx"
      code={`import type { ColumnDef } from '@e-burgos/tucutable';
// ColumnDef is re-exported from @tanstack/react-table`}
    />
  </CardTitle>
</CardContainer>
```

---

### `sections/BasicColumnSection.tsx`

```tsx
// Topics:
// 1. accessorKey vs accessorFn vs id
// 2. header: string | function
// 3. cell: function renderer con getValue()
// 4. footer
// 5. size, minSize, maxSize

// AutoPropsTable con props básicos de ColumnDef:
<AutoPropsTable
  title="Core ColumnDef Props"
  props={[
    { prop: 'accessorKey', type: 'string', required: false, description: 'Key of the data object to extract the value from' },
    { prop: 'accessorFn', type: '(row) => TValue', required: false, description: 'Custom accessor function — use when key has dots or needs transform' },
    { prop: 'id', type: 'string', required: false, description: 'Explicit column ID — required when using accessorFn without accessorKey' },
    { prop: 'header', type: 'string | HeaderContext => ReactNode', required: false, description: 'Column header content — string or render function' },
    { prop: 'cell', type: 'CellContext => ReactNode', required: false, description: 'Custom cell renderer — receives row/getValue/table context' },
    { prop: 'footer', type: 'FooterContext => ReactNode', required: false, description: 'Column footer content' },
    { prop: 'size', type: 'number', default: '150', required: false, description: 'Default column width in pixels' },
    { prop: 'minSize', type: 'number', default: '20', required: false, description: 'Minimum column width for resizing' },
    { prop: 'maxSize', type: 'number', default: 'Infinity', required: false, description: 'Maximum column width for resizing' },
  ]}
/>

// CodeBlock: accessorKey básico
// CodeBlock: accessorFn con transform
// CodeBlock: cell renderer con Badge
// Live demo: tabla con columna custom cell
```

---

### `sections/ColumnFeaturesSection.tsx`

Wrapper con sub-secciones, o usar secciones separadas vía `DynamicSectionsPage.children`.

**Para cada feature (sorting, resizing, pinning, dragging, visibility):**

```
  AutoPropsTable con las props específicas
  Alert con default/behavior
  CodeBlock con configuración mínima
  Live demo DataTable con PropPlayground (toggle on/off)
```

#### Sorting

```tsx
<AutoPropsTable
  title="Sorting Props"
  props={[
    { prop: 'enableSorting',    type: 'boolean', default: 'true',  description: 'Allow sorting this column. Set false to disable.' },
    { prop: 'sortingFn',        type: 'string | SortingFn', default: 'auto', description: 'Sorting algorithm: "auto" | "basic" | "datetime" | "alphanumeric"' },
    { prop: 'invertSorting',    type: 'boolean', default: 'false', description: 'Invert the sort order for this column' },
    { prop: 'sortUndefined',    type: '"first" | "last" | 1 | -1 | false', default: 'false', description: 'Control position of undefined values' },
  ]}
/>

<PropPlayground
  title="Sorting Playground"
  controls={[
    { type: 'boolean', prop: 'enableSorting', label: 'Enable Sorting', defaultValue: true },
    { type: 'select',  prop: 'sortingFn',     label: 'Sorting Function',
      defaultValue: 'auto', options: [
        { label: 'Auto',         value: 'auto' },
        { label: 'Basic',        value: 'basic' },
        { label: 'Alphanumeric', value: 'alphanumeric' },
        { label: 'DateTime',     value: 'datetime' },
      ],
    },
  ]}
  renderDemo={(vals) => (
    <DataTable
      tableId="sorting-demo"
      data={DEMO_DATA}
      columns={columns.map(col => ({ ...col, enableSorting: vals.enableSorting }))}
    />
  )}
  renderCode={(vals) => `const columns: ColumnDef<Row>[] = [
  {
    accessorKey: 'name',
    header: 'Name',
    enableSorting: ${vals.enableSorting},
    sortingFn: '${vals.sortingFn}',
  },
];`}
/>
```

#### Resizing

```tsx
<AutoPropsTable
  title="Resizing Props"
  props={[
    { prop: 'enableResizing', type: 'boolean', default: 'true', description: 'Allow resizing this column by dragging its edge' },
    { prop: 'size',           type: 'number',  default: '150',  description: 'Default column width in pixels' },
    { prop: 'minSize',        type: 'number',  default: '20',   description: 'Minimum width when resizing' },
    { prop: 'maxSize',        type: 'number',  default: 'Infinity', description: 'Maximum width when resizing' },
  ]}
/>

// DataTable prop level:
// columnResizeMode: "onChange" | "onEnd"  (si está documentado en IDataTableProps)
// enableColumnResizing prop de DataTable

<PropPlayground
  controls={[
    { type: 'boolean', prop: 'enableResizing', label: 'Enable Resizing', defaultValue: true },
    { type: 'number',  prop: 'size',           label: 'Default Size',    defaultValue: 150, min: 50, max: 400, step: 10 },
    { type: 'number',  prop: 'minSize',        label: 'Min Size',        defaultValue: 50,  min: 20, max: 200, step: 10 },
  ]}
  ...
/>
```

#### Pinning

```tsx
<AutoPropsTable
  title="Pinning Props"
  props={[
    { prop: 'meta.isPinned',    type: '"left" | "right" | false', default: 'false', description: 'Initial pin state for this column' },
    { prop: 'enablePinning',    type: 'boolean', default: 'true', description: 'Whether user can pin/unpin this column' },
  ]}
/>

// Nota: la API exacta de pinning en tucutable puede ser column.pin() de TanStack
// Verificar con tucutable-columns SKILL antes de implementar
<Alert variant="warning">
  Column pinning requires the table to have a defined width. Ensure the parent
  container has a fixed or max-width for pinning to work correctly.
</Alert>
```

#### Column Dragging

```tsx
<AutoPropsTable title="Column Drag & Drop Props" props={[{ prop: 'meta.enableColumnDragging', type: 'boolean', default: 'true', description: 'Enable drag-and-drop reordering for this column' }]} />
// DataTable-level: enableColumnDragging prop
// Requiere @dnd-kit under the hood
// Alert: "Column dragging uses @dnd-kit. No additional setup required."
```

#### Visibility

```tsx
<AutoPropsTable
  title="Visibility Props"
  props={[
    { prop: 'enableHiding', type: 'boolean', default: 'true', description: 'Allow toggling visibility of this column' },
    { prop: 'meta.defaultVisibility', type: 'boolean', default: 'true', description: 'Whether column is visible by default' },
  ]}
/>
// DataTable-level: defaultColumnVisibility, showColumnsButton
```

---

### `sections/HelperColumnsSection.tsx`

```tsx
// Documenta las 4 helper columns:
// 1. ExpandedColumn     — para filas expandibles
// 2. RowActionsColumn   — acciones por fila (editar, eliminar, etc.)
// 3. RowSelectionColumn — checkbox de selección
// 4. OffsetColumn       — columna vacía para spacing

const helpers = [
  {
    name: 'ExpandedColumn',
    import: "import { ExpandedColumn } from '@e-burgos/tucutable';",
    description: 'Adds a toggle button to expand/collapse row detail',
    usage: `const columns = [
  ExpandedColumn<MyRow>(),
  { accessorKey: 'name', header: 'Name' },
  // ...
];`,
  },
  {
    name: 'RowActionsColumn',
    import: "import { RowActionsColumn } from '@e-burgos/tucutable';",
    description: 'Adds a configurable actions menu (edit, delete, custom actions) per row',
    usage: `const columns = [
  // ...
  RowActionsColumn<MyRow>({
    actions: (row) => [
      { label: 'Edit',   icon: <LucideIcons.Edit />,   onClick: () => handleEdit(row)   },
      { label: 'Delete', icon: <LucideIcons.Trash />,  onClick: () => handleDelete(row) },
    ],
  }),
];`,
  },
  {
    name: 'RowSelectionColumn',
    import: "import { RowSelectionColumn } from '@e-burgos/tucutable';",
    description: 'Adds checkbox column for row selection (pairs with rowSelection prop)',
    usage: `const columns = [
  RowSelectionColumn<MyRow>(),
  { accessorKey: 'name', header: 'Name' },
];`,
  },
  {
    name: 'OffsetColumn',
    import: "import { OffsetColumn } from '@e-burgos/tucutable';",
    description: 'Empty spacer column for visual alignment or reserved sections',
    usage: `const columns = [
  { accessorKey: 'name' },
  OffsetColumn<MyRow>({ size: 40 }),
  { accessorKey: 'actions' },
];`,
  },
];

// Renderizar cada uno con:
// - Badge: nombre del componente
// - Typography: descripción
// - CodeBlock: import + usage
```

---

### `sections/ConvertColumnsSection.tsx`

```tsx
// Documenta convertColumns — utility para migrar desde DataGrid-style columns

<AutoPropsTable
  title="convertColumns Parameters"
  props={[
    { prop: 'columns',      type: 'DataGridColumn[]', required: true,  description: 'Array of legacy DataGrid-style column objects' },
    { prop: 'options',      type: 'ConvertOptions',   required: false, description: 'Optional conversion options' },
  ]}
/>

<Alert variant="info">
  <code>convertColumns</code> is a utility for teams migrating from DataGrid-style
  column definitions to TanStack Table <code>ColumnDef</code> format.
</Alert>

<CodeBlock
  language="tsx"
  code={`import { convertColumns } from '@e-burgos/tucutable';

// Legacy DataGrid columns style
const legacyColumns = [
  { field: 'name',  headerName: 'Full Name', width: 200 },
  { field: 'email', headerName: 'Email',     width: 250 },
  { field: 'role',  headerName: 'Role',      width: 120 },
];

// Convert to ColumnDef format
const columns = convertColumns(legacyColumns);

// Result is equivalent to:
// [
//   { accessorKey: 'name',  header: 'Full Name', size: 200 },
//   { accessorKey: 'email', header: 'Email',     size: 250 },
//   { accessorKey: 'role',  header: 'Role',      size: 120 },
// ]`}
/>
```

---

## Página `index.tsx` (boceto)

```tsx
// apps/demo/src/pages/column-guide/index.tsx
import { lazy } from 'react';
import { DynamicSectionsPage } from '../../components/DynamicSectionsPage';
import HeroPage from '../../components/HeroPage';

const IntroSection = lazy(() => import('./sections/IntroSection'));
const BasicColumnSection = lazy(() => import('./sections/BasicColumnSection'));
const SortingSection = lazy(() => import('./sections/SortingSection'));
const ResizingSection = lazy(() => import('./sections/ResizingSection'));
const PinningSection = lazy(() => import('./sections/PinningSection'));
const DraggingSection = lazy(() => import('./sections/DraggingSection'));
const VisibilitySection = lazy(() => import('./sections/VisibilitySection'));
const HelperColumnsSection = lazy(() => import('./sections/HelperColumnsSection'));
const ConvertColumnsSection = lazy(() => import('./sections/ConvertColumnsSection'));

export function ColumnGuidePage() {
  return (
    <DynamicSectionsPage
      hero={<HeroPage title="Column Guide" description="Complete reference for defining, configuring, and extending columns in Tucutable. From basic accessor keys to advanced pinning and drag-and-drop." />}
      sections={[
        { id: 'intro', label: 'Introduction', component: IntroSection },
        { id: 'basic', label: 'Column Definition', component: BasicColumnSection, children: [{ id: 'accessorKey', label: 'accessorKey & accessorFn', component: BasicColumnSection }] },
        {
          id: 'features',
          label: 'Column Features',
          component: lazy(() => import('./sections/ColumnFeaturesSection')),
          children: [
            { id: 'sorting', label: 'Sorting', component: SortingSection },
            { id: 'resizing', label: 'Resizing', component: ResizingSection },
            { id: 'pinning', label: 'Pinning', component: PinningSection },
            { id: 'dragging', label: 'Dragging', component: DraggingSection },
            { id: 'visibility', label: 'Visibility', component: VisibilitySection },
          ],
        },
        { id: 'helpers', label: 'Helper Columns', component: HelperColumnsSection },
        { id: 'convert', label: 'convertColumns', component: ConvertColumnsSection },
      ]}
    />
  );
}
```

---

## Mock data para las demos

```tsx
// apps/demo/src/pages/column-guide/hooks/useColumnDemoData.ts
export interface ColumnDemoRow {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  department: string;
  salary: number;
  joinDate: string;
  status: 'active' | 'inactive' | 'pending';
}

export const COLUMN_DEMO_DATA: ColumnDemoRow[] = Array.from({ length: 25 }, (_, i) => ({
  id: i + 1,
  firstName: ['Alice', 'Bob', 'Carol', 'David', 'Eve'][i % 5],
  lastName: ['Johnson', 'Smith', 'White', 'Brown', 'Davis'][i % 5],
  email: `user${i + 1}@company.com`,
  department: ['Engineering', 'Marketing', 'Sales', 'HR', 'Finance'][i % 5],
  salary: 50000 + i * 2500,
  joinDate: new Date(2020 + (i % 4), i % 12, (i % 28) + 1).toLocaleDateString(),
  status: (['active', 'inactive', 'pending'] as const)[i % 3],
}));
```

---

## Checklist de calidad

- [ ] `DynamicSectionsPage` con TOC lateral funcional
- [ ] `HeroPage` con título "Column Guide"
- [ ] `IntroSection` con Alert sobre compatibilidad TanStack Table
- [ ] `BasicColumnSection` con `AutoPropsTable` + 3 `CodeBlock` (accessorKey, accessorFn, cell renderer)
- [ ] `SortingSection` con `AutoPropsTable` + `PropPlayground` (toggle sorting on/off)
- [ ] `ResizingSection` con `AutoPropsTable` + `PropPlayground` (toggle resize, cambiar sizes)
- [ ] `PinningSection` con `AutoPropsTable` + demo live
- [ ] `DraggingSection` con `AutoPropsTable` + demo live + Alert @dnd-kit
- [ ] `VisibilitySection` con `AutoPropsTable` + demo con showColumnsButton
- [ ] `HelperColumnsSection` con las 4 helpers documentadas + `CodeBlock` cada una
- [ ] `ConvertColumnsSection` con `AutoPropsTable` + `CodeBlock` + Alert migración
- [ ] Todas las demos usan `COLUMN_DEMO_DATA` (datos estáticos offline)
- [ ] Responsive en mobile/tablet/desktop
- [ ] Dark mode correcto
