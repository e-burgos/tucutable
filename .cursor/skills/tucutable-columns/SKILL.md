---
name: tucutable-columns
description: 'Define and customize columns for @e-burgos/tucutable tables. USE WHEN: (1) creating column definitions (ColumnDef), (2) configuring column features like sorting, resizing, pinning, dragging, visibility, (3) migrating from DataGrid-style columns, (4) adding custom cell renderers, (5) using helper columns (ExpandedColumn, RowActionsColumn, RowSelectionColumn), (6) using convertColumns utility. Trigger words: columns, ColumnDef, accessorKey, cell renderer, column config, convertColumns.'
---

# Tucutable Columns Skill

This skill covers how to define and configure columns for `@e-burgos/tucutable` tables, which use **TanStack Table v8** `ColumnDef` format.

## Column Definition Format

Columns use TanStack Table's `ColumnDef<TData, TValue>` interface with additional tucutable-specific properties:

```typescript
import { ColumnDef } from '@tanstack/react-table';

type MyData = { name: string; age: number; status: boolean };

const columns: ColumnDef<MyData>[] = [
  {
    // REQUIRED
    id: 'name', // Unique column identifier
    accessorKey: 'name', // Key to access data from row (or use accessorFn)

    // DISPLAY
    header: 'Name', // Header text (or render function)
    footer: 'Name', // Footer text (optional)
    cell: (
      { row } // Custom cell renderer
    ) => <span>{row.original.name}</span>,

    // SIZING
    size: 200, // Fixed column width in px
    minSize: 100, // Minimum column width
    maxSize: 400, // Maximum column width

    // FEATURES (tucutable-specific extensions)
    enableSorting: true, // Allow sorting this column
    enableResizing: true, // Allow resizing this column
    enablePinning: true, // Allow pinning this column
    enableHiding: true, // Allow hiding this column
    enableColumnFilter: false, // Allow filtering this column
    enableMultiSort: true, // Allow multi-sort on this column
    enableDraggable: true, // Allow drag-and-drop reorder (tucutable extension)
    enableVisible: true, // Initial visibility state (tucutable extension)

    // SORTING
    sortingFn: 'alphanumeric', // Built-in or custom sorting function
  },
];
```

## Standard Column Properties

### Required Properties

| Property      | Type     | Description                                                  |
| ------------- | -------- | ------------------------------------------------------------ |
| `id`          | `string` | Unique column identifier. Must be unique across all columns. |
| `accessorKey` | `string` | Property key to extract cell value from row data.            |

**Alternative**: Use `accessorFn` instead of `accessorKey` for computed values:

```typescript
{
  id: 'fullName',
  accessorFn: (row) => `${row.firstName} ${row.lastName}`,
  header: 'Full Name',
}
```

### Display Properties

| Property | Type                               | Description                                                                                      |
| -------- | ---------------------------------- | ------------------------------------------------------------------------------------------------ |
| `header` | `string \| (() => ReactNode)`      | Column header content.                                                                           |
| `footer` | `string \| (() => ReactNode)`      | Column footer content.                                                                           |
| `cell`   | `(info: CellContext) => ReactNode` | Custom cell renderer. Access `info.row.original` for row data, `info.getValue()` for cell value. |

### Sizing Properties

| Property  | Type     | Default         | Description                                                           |
| --------- | -------- | --------------- | --------------------------------------------------------------------- |
| `size`    | `number` | auto-calculated | Fixed width in px. If not set, columns share available space equally. |
| `minSize` | `number` | -               | Minimum width in px.                                                  |
| `maxSize` | `number` | -               | Maximum width in px.                                                  |

### Feature Toggle Properties

| Property             | Type      | Default   | Description                                                                           |
| -------------------- | --------- | --------- | ------------------------------------------------------------------------------------- |
| `enableSorting`      | `boolean` | `true`    | Allow sorting.                                                                        |
| `enableResizing`     | `boolean` | `true`    | Allow drag-resize.                                                                    |
| `enablePinning`      | `boolean` | `true`    | Allow left/right pinning.                                                             |
| `enableHiding`       | `boolean` | `true`    | Allow toggling visibility.                                                            |
| `enableColumnFilter` | `boolean` | `false`   | Allow column filtering.                                                               |
| `enableMultiSort`    | `boolean` | inherited | Allow multi-column sorting.                                                           |
| `enableDraggable`    | `boolean` | `true`    | Allow drag-and-drop column reorder (tucutable specific).                              |
| `enableVisible`      | `boolean` | `true`    | Initial visibility state. Set `false` to hide column by default (tucutable specific). |

## Column Examples

### Basic Text Column

```typescript
{
  id: 'name',
  header: 'Name',
  accessorKey: 'name',
  cell: ({ row }) => (
    <span className="line-clamp-2 text-ellipsis overflow-hidden">
      {row.original.name}
    </span>
  ),
}
```

### Styled Column

```typescript
{
  id: 'phone',
  header: 'Phone',
  accessorKey: 'phone',
  cell: ({ row }) => (
    <span className="font-bold text-table-primary line-clamp-2">
      {row.original.phone}
    </span>
  ),
}
```

### Boolean/Status Column

```typescript
{
  id: 'isActive',
  header: 'Status',
  accessorKey: 'isActive',
  cell: ({ row }) => (
    <span className={cn(
      'border border-table-divider rounded-md px-2 py-1 text-sm',
      row.original.isActive
        ? 'text-green-500 bg-green-50'
        : 'text-red-500 bg-red-50'
    )}>
      {row.original.isActive ? 'Active' : 'Inactive'}
    </span>
  ),
}
```

### Fixed-Width Column

```typescript
{
  id: 'actions',
  header: 'Actions',
  accessorKey: 'id',
  size: 120,
  minSize: 120,
  maxSize: 120,
  enableResizing: false,
  enableSorting: false,
  enableDraggable: false,
  cell: ({ row }) => <ActionButtons row={row} />,
}
```

### Column with Custom Sorting

```typescript
import { sortingCompareNumberFn, sortingCompareStringFn } from '@e-burgos/tucutable';

{
  id: 'price',
  header: 'Price',
  accessorKey: 'price',
  sortingFn: (rowA, rowB) => sortingCompareNumberFn(
    rowA.original.price,
    rowB.original.price
  ),
}
```

### Hidden by Default Column

```typescript
{
  id: 'internalId',
  header: 'Internal ID',
  accessorKey: 'internalId',
  enableVisible: false,        // Hidden initially, user can toggle
}
```

### Non-Draggable Column

```typescript
{
  id: 'status',
  header: 'Status',
  accessorKey: 'status',
  enableDraggable: false,      // Cannot be reordered by drag
}
```

## Auto-Calculated Column Widths

If a column does NOT have a `size` property, tucutable automatically calculates its width based on:

1. Container width
2. Offset from special columns (RowActions, RowSelection, Expanded)
3. Number of visible columns without explicit sizes
4. Formula: `(containerWidth - totalFixedWidths) / numFlexColumns`

This is handled by the `getColumns()` function in `ui/tucutable/src/hooks/useColumns.ts`.

## Special Built-in Columns

Tucutable automatically adds these columns when features are enabled:

### ExpandedColumn

- Added when `renderSubComponent` or `renderSubDataTable` is provided
- Fixed size: defined in `ui/tucutable/src/common/helpers/ExpandedColumn.tsx`
- Pinned to left
- Cannot be sorted, resized, hidden, or dragged

### RowSelectionColumn

- Added when `rowSelection` prop is provided
- Fixed size: defined in `ui/tucutable/src/common/helpers/RowSelectionColumn.tsx`
- Pinned to left
- Cannot be sorted, resized, hidden, or dragged

### RowActionsColumn

- Added when `rowActions` prop is provided
- Fixed size: 50px
- Pinned to right
- Cannot be sorted, resized, hidden, or dragged

## Converting from DataGrid-Style Columns

Use `convertColumns()` to migrate from MUI DataGrid or similar column formats:

```typescript
import { convertColumns, GridColumns } from '@e-burgos/tucutable';

const dataGridColumns: GridColumns[] = [
  {
    field: 'name',
    headerName: 'Name',
    width: 200,
    resizable: true,
    sortable: true,
    pinnable: true,
    filterable: false,
    disableReorder: false,
    renderCell: (props) => <span>{props.row.name}</span>,
  },
];

// Convert to TanStack ColumnDef format
const tanstackColumns = convertColumns<MyData>(dataGridColumns);
```

### GridColumns Interface

| Property         | Type                   | Maps To             |
| ---------------- | ---------------------- | ------------------- |
| `field`          | `string`               | `id`, `accessorKey` |
| `headerName`     | `string`               | `header`            |
| `width`          | `number`               | `size`              |
| `minWidth`       | `number`               | `minSize`           |
| `resizable`      | `boolean`              | `enableResizing`    |
| `sortable`       | `boolean`              | `enableSorting`     |
| `pinnable`       | `boolean`              | `enablePinning`     |
| `disableReorder` | `boolean`              | `!enableDraggable`  |
| `hide`           | `boolean`              | `!enableVisible`    |
| `renderCell`     | `(props) => ReactNode` | `cell`              |
| `renderHeader`   | `() => ReactNode`      | `header`            |

## Default Column Configuration

Apply defaults to all columns using `initialConfig`:

```tsx
<DataTable
  tableId="my-table"
  data={data}
  columns={columns}
  initialConfig={{
    size: 150,
    minSize: 80,
    maxSize: 500,
    enableResizing: true,
    enableSorting: true,
    enablePinning: true,
    enableHiding: true,
    enableColumnFilter: false,
  }}
/>
```

## Column State Persistence

The following column states are automatically persisted to localStorage per `tableId`:

- **Column Order** (`ColumnOrderState`) — drag-and-drop reorder
- **Column Visibility** (`VisibilityState`) — show/hide toggles
- **Column Pinning** (`ColumnPinningState`) — left/right pinning
- **Column Sizing** (`ColumnSizingState`) — resize widths
- **Column Filters** (`ColumnFiltersState`) — filter values

## File References

- Column definitions: Use TanStack Table `ColumnDef` — [TanStack Docs](https://tanstack.com/table/v8/docs/api/core/column-def)
- `getColumns` helper: `ui/tucutable/src/hooks/useColumns.ts`
- `convertColumns`: `ui/tucutable/src/common/helpers/convertColumns.ts`
- ExpandedColumn: `ui/tucutable/src/common/helpers/ExpandedColumn.tsx`
- RowActionsColumn: `ui/tucutable/src/common/helpers/RowActionsColumn.tsx`
- RowSelectionColumn: `ui/tucutable/src/common/helpers/RowSelectionColumn.tsx`
- Sorting functions: `ui/tucutable/src/common/functions/index.ts`
- Storybook data: `ui/tucutable/src/storybook/data/index.tsx`
