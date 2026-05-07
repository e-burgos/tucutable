---
name: tucutable-usage
description: "Use the @e-burgos/tucutable library to create data tables. USE WHEN: (1) creating a new DataTable component, (2) configuring table props like pagination, sorting, row actions, row selection, sub-components, (3) questions about DataTable or DataTableComponent usage, (4) styling or theming a table, (5) using server-side or manual pagination. Trigger words: table, DataTable, tucutable, pagination, sorting, row actions, row selection."
---

# Tucutable Usage Skill

`@e-burgos/tucutable` is a React data table library built on top of **TanStack Table v8**, **Tailwind CSS v4**, and **Zustand** for state persistence. It provides a production-ready table component with sorting, pagination, column management, drag-and-drop, row actions, row selection, expandable rows, and more.

## Package Info

- **Package**: `@e-burgos/tucutable`
- **Location in workspace**: `ui/tucutable/`
- **Peer dependencies**: `react >=18`, `react-dom >=18`, `tailwindcss >=4`
- **Key dependencies**: `@tanstack/react-table ^8`, `zustand ^5`, `@dnd-kit/core ^6`, `@dnd-kit/sortable ^10`

## Main Exports

```typescript
import {
  DataTable,              // Main component (with built-in provider)
  DataTableComponent,     // Inner component (when using custom provider)
  useDataTableContext,    // Access table context (state, actions, config)
  TanstackTable,          // Re-export of @tanstack/react-table + @tanstack/table-core
  convertColumns,         // Convert GridColumns[] to ColumnDef[]
  parseNumericValueForExport, // Parse numeric values for export
  sortingCompareNumberFn, // Custom number sorting function
  sortingCompareStringFn, // Custom string sorting function
  onChangeTableState,     // State updater helper
  handleHeaderTableListener, // Header event dispatcher
  // Plus all Asset icons (ArrowIndicator, DeleteIndicator, etc.)
} from '@e-burgos/tucutable';

// Types
import type {
  TData,
  IOptionalDataTableProps,
  IPaginationOptions,
  IHeaderOptions,
  IDataTableStyles,
  IRowActions,
  IRowSelection,
  IDataTableStateMessage,
  IRenderSubDataTable,
  SubComponentProps,
  IManualPaginationOptions,
  IServerPagination,
  HeaderActionType,
  RowActionsType,
  HoverType,
  OpenType,
  EnableRows,
  DataTableProviderProps,
  Tag,
} from '@e-burgos/tucutable';
```

## Basic Usage

The `DataTable` component is the main entry point. It wraps `DataTableProvider` + `DataTableComponent` automatically.

### Required Props

| Prop | Type | Description |
|------|------|-------------|
| `tableId` | `string` | Unique identifier for the table. Used for state persistence in localStorage. |
| `data` | `Array<T>` | Array of data objects to display. |
| `columns` | `Array<ColumnDef<any, any>>` | TanStack Table column definitions. |

### Minimal Example

```tsx
import { DataTable } from '@e-burgos/tucutable';
import { ColumnDef } from '@tanstack/react-table';

type Person = { name: string; age: number; email: string };

const columns: ColumnDef<Person>[] = [
  { id: 'name', header: 'Name', accessorKey: 'name' },
  { id: 'age', header: 'Age', accessorKey: 'age' },
  { id: 'email', header: 'Email', accessorKey: 'email' },
];

const data: Person[] = [
  { name: 'John', age: 30, email: 'john@example.com' },
  { name: 'Jane', age: 25, email: 'jane@example.com' },
];

function MyTable() {
  return (
    <DataTable
      tableId="my-table"
      data={data}
      columns={columns}
    />
  );
}
```

## Optional Props (IOptionalDataTableProps)

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | `string` | - | Title shown in the table wrapper. |
| `border` | `boolean` | - | Show border around the table. |
| `smallAnatomy` | `boolean` | - | Compact row height. |
| `showFooter` | `boolean` | - | Display table footer row. |
| `showHeader` | `boolean` | `true` | Display table header. |
| `mode` | `'dark' \| 'light'` | - | Color mode override. |
| `isLoading` | `boolean` | - | Show loading state. |
| `isError` | `boolean` | - | Show error state. |
| `isFetching` | `boolean` | - | Show fetching indicator (after initial load). |
| `sx` | `IDataTableStyles` | - | Custom styles for table sections. |
| `initialConfig` | `Partial<ColumnDef<T>>` | - | Default column configuration. |
| `headerOptions` | `IHeaderOptions` | - | Header feature toggles. |
| `pagination` | `IPaginationOptions` | - | Pagination configuration. |
| `rowActions` | `Array<IRowActions<T>>` | - | Row action buttons configuration. |
| `rowSelection` | `IRowSelection<T>` | - | Row selection (checkbox/radio). |
| `renderSubComponent` | `React.FC<SubComponentProps<T>>` | - | Expandable row content renderer. |
| `renderSubDataTable` | `IRenderSubDataTable` | - | Nested sub-table in expanded rows. |
| `setCurrentRow` | `(row: Row<T>) => void` | - | Callback on row click. |
| `enableMultiSort` | `boolean` | - | Enable multi-column sorting. |
| `manualSorting` | `boolean` | - | Server-side sorting mode. |
| `onSortModelChange` | `(model: SortingState) => void` | - | Sorting change callback. |
| `forceShowMenuActions` | `boolean` | - | Always show row action icons. |
| `stateMessage` | `IDataTableStateMessage` | - | Custom empty/error messages. |

## Pagination

### Client-Side Pagination

```tsx
<DataTable
  tableId="client-paginated"
  data={data}
  columns={columns}
  pagination={{
    showPagination: true,
    pageSize: 10,
    pageIndex: 0,
    rowsInfo: true,
    hideRecordsSelector: false,
  }}
/>
```

### Server-Side Pagination (serverPagination)

```tsx
const [pagination, setPagination] = useState<TanstackTable.PaginationState>({
  pageIndex: 0,
  pageSize: 10,
});

<DataTable
  tableId="server-paginated"
  data={serverData}
  columns={columns}
  pagination={{
    showPagination: true,
    rowsInfo: true,
    serverPagination: {
      totalCount: totalItems,
      pagination,
      setPagination,       // Called when page changes
    },
  }}
/>
```

### Manual Pagination

```tsx
<DataTable
  tableId="manual-paginated"
  data={data}
  columns={columns}
  pagination={{
    showPagination: true,
    manualPagination: {
      enabled: true,
      rowCount: totalRows,
      pagination: { pageIndex: 0, pageSize: 5 },
      setPagination: (value) => { /* handle change */ },
    },
  }}
/>
```

## Header Options (IHeaderOptions)

```tsx
<DataTable
  tableId="header-options"
  data={data}
  columns={columns}
  headerOptions={{
    headerContainer: <MyCustomHeader />,   // Custom JSX above the table
    enableHideColumns: true,               // Toggle column visibility
    enablePinLeftColumns: true,            // Pin columns to left
    enablePinRightColumns: true,           // Pin columns to right
    enableSortColumns: true,               // Enable column sorting
    enableResizeColumns: true,             // Enable column resizing
    enableDragColumns: true,               // Enable column drag-and-drop reorder
    className: 'custom-header-class',
  }}
/>
```

## Row Actions

```tsx
import type { IRowActions } from '@e-burgos/tucutable';

const rowActions: IRowActions<Person>[] = [
  {
    action: 'view',             // 'more' | 'open-new-tab' | 'view' | 'edit' | 'delete' | 'download' | 'void'
    label: (row) => `View ${row.original.name}`,
    onClick: (row) => handleView(row.original),
    showLabelInTooltip: true,
    hidden: (row) => row.original.isArchived,
    disabled: (row) => !row.original.isActive,
    requiredScopes: ['read:users'],   // Scope-based visibility
  },
  {
    action: 'edit',
    label: (row) => 'Edit',
    onClick: (row) => handleEdit(row.original),
  },
  {
    action: 'delete',
    label: (row) => 'Delete',
    onClick: (row) => handleDelete(row.original),
  },
];

<DataTable
  tableId="with-actions"
  data={data}
  columns={columns}
  rowActions={rowActions}
  forceShowMenuActions={true}  // Always show icons (not just on hover)
/>
```

### User Scopes

The library provides a scope system for row action visibility:

```typescript
import { setScopes, getScopes, validateScopes } from '@e-burgos/tucutable';

// Set user scopes at app initialization
setScopes(['read:users', 'write:users', 'delete:users']);

// Row actions with `requiredScopes` are automatically filtered
```

## Row Selection

```tsx
<DataTable
  tableId="with-selection"
  data={data}
  columns={columns}
  rowSelection={{
    type: 'checkbox',   // 'checkbox' | 'radio'
    getSelection: (selectedRows) => {
      console.log('Selected:', selectedRows);
    },
  }}
/>
```

## Expandable Rows (Sub-Components)

### Custom Sub-Component

```tsx
<DataTable
  tableId="expandable"
  data={data}
  columns={columns}
  renderSubComponent={({ row, columns }) => {
    if (!row) return null;
    return (
      <div className="p-4">
        <h3>{row.original.name}</h3>
        <p>{row.original.email}</p>
      </div>
    );
  }}
/>
```

### Nested Sub-DataTable

```tsx
<DataTable
  tableId="nested-table"
  data={data}
  columns={columns}
  renderSubDataTable={{
    columns: subTableColumns,
    data: subTableData,
    expandedColumnSize: 40,
  }}
/>
```

## Custom Styles (IDataTableStyles)

```tsx
<DataTable
  tableId="styled"
  data={data}
  columns={columns}
  sx={{
    wrapper: { border: '1px solid #e5e7eb' },
    wrapperContainer: {},
    tableContainer: { maxHeight: '500px' },
    table: {},
    thead: {},
    tbody: {},
    tfoot: {},
    header: {},
    row: { cursor: 'pointer' },
    rowExpanded: { backgroundColor: '#f9fafb' },
    cell: {},
    pagination: {},
    container: {},
    messageContainer: {},
  }}
/>
```

## State Messages

```tsx
<DataTable
  tableId="state-messages"
  data={data}
  columns={columns}
  isLoading={isLoading}
  isError={isError}
  stateMessage={{
    noData: 'No records found',
    noDataDescription: 'Try adjusting your filters.',
    errorData: 'Failed to load data',
    errorDataDescription: 'Please try again later.',
    contactSupport: 'Need help?',
    contactSupportLink: 'mailto:support@example.com',
    hideContactSupport: false,
    className: 'custom-message',
  }}
/>
```

## CSS Import

Always import the Tucutable styles:

```tsx
// In your app entry or global styles
import '@e-burgos/tucutable/styles';
```

Or import in CSS:
```css
@import '@e-burgos/tucutable/styles';
```

## State Persistence

Tucutable automatically persists table state (sorting, column order, visibility, pinning, pagination, filters, column sizing) to localStorage using Zustand's persist middleware. The key is `{tableId}-datatable`.

- State is restored on mount.
- Use `useResetCacheVersion` to invalidate persisted state when schema changes.

## File Structure Reference

- Components: `ui/tucutable/src/components/`
- Context & Provider: `ui/tucutable/src/context/index.tsx`
- Hooks: `ui/tucutable/src/hooks/`
- Types: `ui/tucutable/src/common/types/index.ts`
- Helpers: `ui/tucutable/src/common/helpers/`
- Functions: `ui/tucutable/src/common/functions/index.ts`
- Assets (Icons): `ui/tucutable/src/components/Assets/`
- Storybook: `ui/tucutable/src/storybook/`
