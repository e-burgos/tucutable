# Row Features — Plan de implementación

**Ruta objetivo:** `apps/demo/src/pages/row-features/`

**Tipo de página:** Type B — `DynamicSectionsPage` con `TableOfContents` + lazy sections

---

## Estructura de archivos

```
apps/demo/src/pages/row-features/
├── index.tsx
├── hooks/
│   ├── useRowFeaturesColumns.ts     // Columnas base para todas las demos
│   └── useRowFeaturesData.ts        // Mock data
└── sections/
    ├── IntroSection.tsx             // Overview de row features
    ├── RowActionsSection.tsx        // IRowActions, RowActionsType, RowActionsColumn
    ├── RowSelectionSection.tsx      // IRowSelection, RowSelectionColumn, EnableRows
    ├── ExpandableRowsSection.tsx    // IRenderSubDataTable, SubComponentProps
    ├── HoverSection.tsx             // HoverType — hover styling
    └── OpenTypeSection.tsx          // OpenType — control de expansión
```

---

## Secciones del TOC

```
intro              → Introduction
row-actions        → Row Actions
  ├── action-types    → Action Types
  └── custom-actions  → Custom Actions
row-selection      → Row Selection
  ├── multi-select    → Multi-Select
  └── single-select   → Single-Select
expandable-rows    → Expandable Rows
  ├── sub-table       → Sub-Table
  └── custom-content  → Custom Content
hover              → Hover Behavior
open-type          → Expand Control (OpenType)
```

---

## Tipos documentados

### `RowActionsType`

```ts
type RowActionsType = 'dropdown' | 'inline' | 'both';
```

### `IRowActions<TData>`

```ts
interface IRowActions<TData> {
  type?: RowActionsType; // 'dropdown' | 'inline' | 'both'
  actions: (row: TData) => {
    label: string;
    icon?: ReactNode;
    onClick: (row: TData) => void;
    disabled?: boolean;
    hidden?: boolean;
    color?: 'default' | 'danger' | 'warning' | 'success';
    divider?: boolean; // separador visual en dropdown
  }[];
  showOnHover?: boolean; // mostrar acciones solo al hacer hover
  dropdownLabel?: string; // texto del botón de dropdown
}
```

### `IRowSelection`

```ts
interface IRowSelection {
  enabled: boolean;
  type?: 'single' | 'multi'; // default: 'multi'
  onSelectionChange?: (rows: Row[]) => void;
  showSelectAll?: boolean; // default: true (para multi)
  getRowId?: (row: TData) => string; // custom row ID extractor
}
```

### `EnableRows`

```ts
type EnableRows = {
  enableRowSelection?: boolean | ((row: Row<TData>) => boolean);
  enableMultiRowSelection?: boolean;
  enableSubRowSelection?: boolean;
};
```

### `HoverType`

```ts
type HoverType = 'row' | 'cell' | 'none';
```

### `OpenType`

```ts
type OpenType = 'click' | 'icon' | 'none';
```

### `IRenderSubDataTable<TData>`

```ts
interface IRenderSubDataTable<TData> {
  renderSubComponent: (props: SubComponentProps<TData>) => ReactNode;
  getRowCanExpand?: (row: Row<TData>) => boolean;
  openType?: OpenType; // default: 'icon'
}
```

### `SubComponentProps<TData>`

```ts
interface SubComponentProps<TData> {
  row: Row<TData>; // TanStack Row object
  data: TData; // The row's data
}
```

---

## Borradores de secciones

### `sections/RowActionsSection.tsx`

```tsx
// Contenido:
// 1. Descripción: qué son row actions
// 2. AutoPropsTable IRowActions
// 3. 3 tipos: 'dropdown', 'inline', 'both'
// 4. PropPlayground: toggle type + showOnHover
// 5. CodeBlock: uso con RowActionsColumn helper

<AutoPropsTable
  title="IRowActions Props"
  props={[
    { prop: 'type',         type: '"dropdown" | "inline" | "both"', default: '"dropdown"', description: 'How actions are displayed in the row' },
    { prop: 'actions',      type: '(row: TData) => Action[]',       required: true,         description: 'Function that returns the actions for a given row' },
    { prop: 'showOnHover',  type: 'boolean',                        default: 'false',       description: 'Show action buttons only when hovering the row' },
    { prop: 'dropdownLabel',type: 'string',                         default: '"Actions"',   description: 'Label for the dropdown trigger button' },
  ]}
/>

<PropPlayground
  title="Row Actions Playground"
  controls={[
    { type: 'select',  prop: 'type',        label: 'Actions Type',
      defaultValue: 'dropdown', options: [
        { label: 'Dropdown', value: 'dropdown' },
        { label: 'Inline',   value: 'inline'   },
        { label: 'Both',     value: 'both'     },
      ],
    },
    { type: 'boolean', prop: 'showOnHover', label: 'Show on Hover', defaultValue: false },
  ]}
  renderDemo={(vals) => (
    <DataTable
      tableId="row-actions-demo"
      data={ROW_DEMO_DATA}
      columns={[
        ...baseColumns,
        RowActionsColumn<RowDemoRow>({
          type: vals.type as RowActionsType,
          showOnHover: vals.showOnHover as boolean,
          actions: (row) => [
            { label: 'Edit',   icon: <LucideIcons.Edit  className="w-4 h-4" />, onClick: (r) => alert(`Edit: ${r.name}`)   },
            { label: 'Delete', icon: <LucideIcons.Trash className="w-4 h-4" />, onClick: (r) => alert(`Delete: ${r.name}`), color: 'danger' },
          ],
        }),
      ]}
    />
  )}
  renderCode={(vals) => `<DataTable
  data={data}
  columns={[
    ...columns,
    RowActionsColumn({
      type: '${vals.type}',
      showOnHover: ${vals.showOnHover},
      actions: (row) => [
        { label: 'Edit',   onClick: (r) => handleEdit(r)   },
        { label: 'Delete', onClick: (r) => handleDelete(r), color: 'danger' },
      ],
    }),
  ]}
/>`}
/>

<CodeBlock
  language="tsx"
  code={`// Custom action with divider
RowActionsColumn<User>({
  actions: (row) => [
    { label: 'View Profile', icon: <LucideIcons.Eye />,   onClick: openProfile },
    { label: 'Edit',         icon: <LucideIcons.Edit />,  onClick: openEdit    },
    { divider: true },                                     // Visual separator
    { label: 'Delete',       icon: <LucideIcons.Trash />, onClick: deleteUser,
      color: 'danger', disabled: row.role === 'admin' },
  ],
})`}
/>
```

---

### `sections/RowSelectionSection.tsx`

```tsx
<AutoPropsTable
  title="IRowSelection Props"
  props={[
    { prop: 'enabled',            type: 'boolean',                required: true,  description: 'Enable row selection mode' },
    { prop: 'type',               type: '"single" | "multi"',     default: '"multi"', description: 'Single or multi-row selection' },
    { prop: 'onSelectionChange',  type: '(rows: Row[]) => void',  required: false, description: 'Callback fired when selection changes — receives selected rows array' },
    { prop: 'showSelectAll',      type: 'boolean',                default: 'true', description: 'Show "Select All" checkbox in header (multi only)' },
    { prop: 'getRowId',           type: '(row: TData) => string', required: false, description: 'Custom row ID function for stable selections across page changes' },
  ]}
/>

<PropPlayground
  title="Row Selection Playground"
  controls={[
    { type: 'select',  prop: 'type',          label: 'Selection Type',
      defaultValue: 'multi', options: [
        { label: 'Multi',  value: 'multi'  },
        { label: 'Single', value: 'single' },
      ],
    },
    { type: 'boolean', prop: 'showSelectAll', label: 'Show Select All', defaultValue: true },
  ]}
  renderDemo={(vals) => {
    const [selected, setSelected] = useState([]);
    return (
      <div className="space-y-3">
        {selected.length > 0 && (
          <Alert variant="info">{selected.length} row(s) selected</Alert>
        )}
        <DataTable
          tableId="selection-demo"
          data={ROW_DEMO_DATA}
          columns={[RowSelectionColumn(), ...baseColumns]}
          rowSelection={{
            enabled: true,
            type: vals.type as 'single' | 'multi',
            showSelectAll: vals.showSelectAll as boolean,
            onSelectionChange: setSelected,
          }}
        />
      </div>
    );
  }}
/>

// Alert: server-side + selection
<Alert variant="warning">
  When using server-side pagination with row selection, pass <code>getRowId</code>
  to maintain stable selections across page changes.
</Alert>
```

---

### `sections/ExpandableRowsSection.tsx`

```tsx
// Contenido:
// 1. Descripción: sub-tables y custom content
// 2. AutoPropsTable IRenderSubDataTable
// 3. CodeBlock: sub-table básica (DataTable dentro de DataTable)
// 4. CodeBlock: custom content (CardContainer con detalles)
// 5. PropPlayground: openType control
// 6. Live demo con sub-tabla

<AutoPropsTable
  title="IRenderSubDataTable Props"
  props={[
    { prop: 'renderSubComponent', type: '(props: SubComponentProps<TData>) => ReactNode', required: true,  description: 'Function that renders the expanded row content' },
    { prop: 'getRowCanExpand',    type: '(row: Row<TData>) => boolean',                   required: false, description: 'Predicate to determine if a row can be expanded — defaults to all rows' },
    { prop: 'openType',           type: '"click" | "icon" | "none"',                       default: '"icon"', description: 'How expansion is triggered' },
  ]}
/>

<CodeBlock
  language="tsx"
  code={`// Sub-DataTable example
import { DataTable, ExpandedColumn } from '@e-burgos/tucutable';

function MyTable() {
  const columns = [
    ExpandedColumn<Order>(),
    { accessorKey: 'orderId', header: 'Order ID' },
    { accessorKey: 'total',   header: 'Total'    },
  ];

  return (
    <DataTable
      tableId="orders-table"
      data={orders}
      columns={columns}
      renderSubDataTable={{
        renderSubComponent: ({ row }) => (
          <DataTable
            tableId={\`order-items-\${row.original.orderId}\`}
            data={row.original.items}
            columns={itemColumns}
          />
        ),
        getRowCanExpand: (row) => row.original.items.length > 0,
        openType: 'icon',
      }}
    />
  );
}`}
/>

<CodeBlock
  language="tsx"
  code={`// Custom content example
renderSubComponent: ({ row }) => (
  <CardContainer className="m-4">
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4">
      <div>
        <Typography tag="caption" color="muted">Email</Typography>
        <Typography tag="p">{row.original.email}</Typography>
      </div>
      <div>
        <Typography tag="caption" color="muted">Phone</Typography>
        <Typography tag="p">{row.original.phone}</Typography>
      </div>
    </div>
  </CardContainer>
)`}
/>

<PropPlayground
  title="openType Playground"
  controls={[
    { type: 'select', prop: 'openType', label: 'Open Type',
      defaultValue: 'icon', options: [
        { label: 'Icon (chevron)',  value: 'icon'  },
        { label: 'Row click',      value: 'click' },
        { label: 'None (manual)',  value: 'none'  },
      ],
    },
  ]}
  ...
/>
```

---

### `sections/HoverSection.tsx`

```tsx
<AutoPropsTable
  title="HoverType Values"
  props={[
    { prop: 'hover', type: '"row" | "cell" | "none"', default: '"row"', description: 'Controls which element receives hover highlight — row, individual cell, or no highlight' },
  ]}
/>

<PropPlayground
  title="Hover Playground"
  controls={[
    { type: 'select', prop: 'hover', label: 'Hover Type',
      defaultValue: 'row', options: [
        { label: 'Row hover',  value: 'row'  },
        { label: 'Cell hover', value: 'cell' },
        { label: 'None',       value: 'none' },
      ],
    },
  ]}
  renderDemo={(vals) => (
    <DataTable
      tableId="hover-demo"
      data={ROW_DEMO_DATA.slice(0, 5)}
      columns={baseColumns}
      hover={vals.hover as HoverType}
    />
  )}
/>
```

---

## Página `index.tsx`

```tsx
// apps/demo/src/pages/row-features/index.tsx
import { lazy } from 'react';
import { DynamicSectionsPage } from '../../components/DynamicSectionsPage';
import HeroPage from '../../components/HeroPage';

const IntroSection = lazy(() => import('./sections/IntroSection'));
const RowActionsSection = lazy(() => import('./sections/RowActionsSection'));
const RowSelectionSection = lazy(() => import('./sections/RowSelectionSection'));
const ExpandableSection = lazy(() => import('./sections/ExpandableRowsSection'));
const HoverSection = lazy(() => import('./sections/HoverSection'));
const OpenTypeSection = lazy(() => import('./sections/OpenTypeSection'));

export function RowFeaturesPage() {
  return (
    <DynamicSectionsPage
      hero={<HeroPage title="Row Features" description="Complete guide to row actions, multi-select, expandable sub-tables, and hover behavior." />}
      sections={[
        { id: 'intro', label: 'Introduction', component: IntroSection },
        {
          id: 'row-actions',
          label: 'Row Actions',
          component: RowActionsSection,
          children: [
            { id: 'action-types', label: 'Action Types', component: RowActionsSection },
            { id: 'custom-actions', label: 'Custom Actions', component: RowActionsSection },
          ],
        },
        {
          id: 'row-selection',
          label: 'Row Selection',
          component: RowSelectionSection,
          children: [
            { id: 'multi-select', label: 'Multi-Select', component: RowSelectionSection },
            { id: 'single-select', label: 'Single-Select', component: RowSelectionSection },
          ],
        },
        { id: 'expandable-rows', label: 'Expandable Rows', component: ExpandableSection },
        { id: 'hover', label: 'Hover Behavior', component: HoverSection },
        { id: 'open-type', label: 'Expand Control', component: OpenTypeSection },
      ]}
    />
  );
}
```

---

## Mock data

```tsx
export interface RowDemoRow {
  id: number;
  name: string;
  role: string;
  department: string;
  status: 'active' | 'inactive';
  salary: number;
  // Para sub-tabla
  projects?: { id: number; name: string; status: string }[];
}

export const ROW_DEMO_DATA: RowDemoRow[] = Array.from({ length: 20 }, (_, i) => ({
  id: i + 1,
  name: `Employee ${i + 1}`,
  role: ['Developer', 'Designer', 'Manager', 'QA', 'DevOps'][i % 5],
  department: ['Engineering', 'Product', 'HR', 'Finance'][i % 4],
  status: i % 4 === 0 ? 'inactive' : 'active',
  salary: 60000 + i * 3000,
  projects:
    i % 3 !== 0
      ? [
          { id: i * 10 + 1, name: `Project A-${i}`, status: 'in-progress' },
          { id: i * 10 + 2, name: `Project B-${i}`, status: 'completed' },
        ]
      : [],
}));
```

---

## Checklist de calidad

- [ ] `DynamicSectionsPage` con TOC "Intro / Row Actions / Row Selection / Expandable / Hover / Open Type"
- [ ] `HeroPage` con título "Row Features"
- [ ] `RowActionsSection` con `AutoPropsTable` + `PropPlayground` (tipo dropdown/inline/both) + `CodeBlock` con divider
- [ ] `RowSelectionSection` con `AutoPropsTable` + `PropPlayground` + `Alert` sobre getRowId
- [ ] `ExpandableRowsSection` con sub-table `CodeBlock` + custom content `CodeBlock` + `PropPlayground` openType
- [ ] `HoverSection` con `PropPlayground` (row/cell/none)
- [ ] `OpenTypeSection` con `AutoPropsTable` + `PropPlayground`
- [ ] Todas las demos usan `ROW_DEMO_DATA` estáticos
- [ ] Demo de expandable rows funcional (sub-tabla con datos del row)
- [ ] Responsive / dark mode
