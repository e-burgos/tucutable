---
name: tucutable-advanced
description: "Advanced features of @e-burgos/tucutable: context/provider pattern, hooks, Zustand store, drag-and-drop, cache management, TanStack Table access, and report data. USE WHEN: (1) accessing table state programmatically, (2) using useDataTableContext hook, (3) managing table store/persistence, (4) resetting table state or cache, (5) building custom table wrappers, (6) using DataTableComponent with a custom provider, (7) implementing drag-and-drop, (8) accessing report data for export. Trigger words: context, provider, store, zustand, cache, reset, drag-and-drop, useDataTableContext, DataTableProvider, report, export."
---

# Tucutable Advanced Features Skill

This skill covers the internal architecture, context/provider pattern, hooks, store management, drag-and-drop, caching, and programmatic table access in `@e-burgos/tucutable`.

## Architecture Overview

```
DataTable (public component)
  └── DataTableProvider (context provider - manages all state)
        ├── useReactTable() — TanStack Table instance
        ├── useDataTableStore() — Zustand persisted store
        ├── useScrollableTable() — Scroll detection
        └── DataTableComponent (renders the table UI)
              ├── DragDropTableContext (@dnd-kit DndContext)
              │     ├── TableHead
              │     │     └── DragDropContentContext (SortableContext)
              │     └── TableBody
              │           └── DragDropContentContext (SortableContext)
              ├── StateTableHandler (loading/error/empty states)
              ├── Pagination / ManualPagination
              └── Footer
```

## Context & Provider

### DataTableProvider

The `DataTableProvider` is the core of tucutable. It creates the TanStack Table instance, manages all state, and provides it via React context.

```tsx
import { DataTableProvider, DataTableProps } from '@e-burgos/tucutable';

// DataTableProps interface:
interface DataTableProps<T> extends IOptionalDataTableProps<T> {
  tableId: string;
  data: Array<T>;
  columns: Array<ColumnDef<any, any>>;
  showHeader?: boolean;
  mode?: 'dark' | 'light';
}
```

### Custom Provider Usage

For advanced use cases (e.g., custom table UI), use `DataTableProvider` + `DataTableComponent` separately:

```tsx
import { DataTableProvider, DataTableComponent } from '@e-burgos/tucutable';

function CustomTable({ data, columns }) {
  return (
    <DataTableProvider
      tableId="custom-table"
      data={data}
      columns={columns}
      pagination={{ showPagination: true }}
    >
      {/* Access context for custom header */}
      <MyCustomHeader />
      <DataTableComponent data={data} />
    </DataTableProvider>
  );
}
```

### useDataTableContext

Access the full table context from any child of `DataTableProvider`:

```tsx
import { useDataTableContext } from '@e-burgos/tucutable';

function MyCustomComponent() {
  const context = useDataTableContext();
  if (!context) return null;

  const {
    // TanStack Table instance
    table,

    // Current table state (ITableData)
    tableState: {
      id,
      pagination,
      sorting,
      columnOrder,
      columnVisibility,
      columnPinning,
      columnFilters,
      manualPagination,
      rowSelection,
      totalCount,
      reportData,
    },

    // Initial state snapshot (ITableInitialData)
    initialState,

    // Actions
    actions: {
      setTotalCount,
      resetStoreData,       // Reset all state to initial
      setColumnFilters,
      onSetReportCellValue, // Set report cell value for export
      onSetReportHeader,    // Set report header for export
      resetReportData,      // Clear report data
    },

    // Configuration props (Omit<DataTableProps, 'data'>)
    config,

    // Scroll detection (UseScrollableTable)
    scrollProps: {
      containerWith,
      isScrollable,
      scrollX,
      handleScroll,
    },

    // DOM ref
    tableContainerRef,

    // Utility flags
    utils: {
      isEmpty,              // data.length === 0
      checkState,           // isLoading || isError || isEmpty
      handleFetch,          // !isLoading && isFetching
      isSubComponent,       // has renderSubComponent or renderSubDataTable
      isManualPagination,   // manual or server pagination enabled
      isRowSelection,       // rowSelection prop provided
    },
  } = context;

  // Access TanStack Table API directly
  const rows = table.getRowModel().rows;
  const headers = table.getHeaderGroups();
  const selectedRows = table.getSelectedRowModel().rows;

  return <div>Total rows: {rows.length}</div>;
}
```

## Zustand Store (useDataTableStore)

Each table has its own Zustand store, persisted to localStorage with key `{tableId}-datatable`.

**Location**: `ui/tucutable/src/hooks/useDataTableStore.tsx`

### Store Structure

```typescript
interface DataTableStore {
  tableData: {
    id: string;
    pagination: PaginationState;
    sorting: SortingState;
    columnOrder: ColumnOrderState;
    columnVisibility: VisibilityState;
    columnPinning: ColumnPinningState;
    columnFilters: ColumnFiltersState;
    columnSizing: ColumnSizingState;
    manualPagination: ManualPaginationState;
    totalCount?: number;
  };
  // Setters
  setPagination: (value: PaginationState) => void;
  setTotalCount: (value: number) => void;
  setSorting: (value: SortingState) => void;
  setColumnOrder: (value: ColumnOrderState) => void;
  setColumnVisibility: (value: VisibilityState) => void;
  setColumnPinning: (value: ColumnPinningState) => void;
  setColumnFilters: (value: ColumnFiltersState) => void;
  setColumnSizing: (value: ColumnSizingState) => void;
  setManualPagination: (value: ManualPaginationState) => void;
  resetStoreData: () => void;
}
```

### Direct Store Usage

```typescript
import { useDataTableStore } from '@e-burgos/tucutable';

// Access store for a specific table
const { pagination, sorting, resetStoreData } = useDataTableStore('my-table-id');
```

### Store Singleton Pattern

The store uses a singleton map (`storeMap`) keyed by `tableId`. Each table has exactly one Zustand store instance, ensuring consistent state across the application.

## Cache Version Management

When your data schema changes (e.g., added/removed columns), invalidate the persisted state:

```typescript
import { useResetCacheVersion } from '@e-burgos/tucutable';

function MyTable() {
  // Returns true if cache was reset, false if version matched
  const wasReset = useResetCacheVersion('my-table-id', {
    version: 2,               // Increment when schema changes
    onSuccess: () => console.log('Cache cleared!'),
    onError: (error) => console.error('Reset failed:', error),
  });

  return <DataTable tableId="my-table-id" /* ... */ />;
}
```

**How it works**:
1. Cache versions are stored in a separate Zustand store (`datatable-cache-versions`)
2. On mount, compares `options.version` with stored version
3. If different: clears localStorage key `{tableId}-datatable` and updates version
4. If same: no-op, returns `false`

## Report Data System

Tucutable has a built-in report/export data collection system:

```typescript
const context = useDataTableContext();

// Set cell values for report
context.actions.onSetReportCellValue(
  'cell value',     // value
  'row-0',          // rowId
  2,                // cellIndex
  { hasSubTable: false }
);

// Set header names
context.actions.onSetReportHeader('Column Name', 0);

// Access collected report data
const { headers, rows } = context.tableState.reportData;
// headers: Map<number, string>       — column index → header name
// rows: Map<string, Map<number, string>> — rowId → (column index → cell value)

// Reset report data
context.actions.resetReportData();
```

**Ignored columns for reports**: `RowActionsColumn`, `ExpandedColumn`, `RowSelectionColumn` (defined in `IGNORE_REPORT_COLUMNS` constant).

## Drag-and-Drop

Tucutable uses `@dnd-kit` for column reordering:

### DragDropTableContext
- Wraps the entire table in a `DndContext` with `closestCenter` collision detection
- Modifiers: `restrictToHorizontalAxis`
- Handles `onDragEnd` to reorder `columnOrder` via `arrayMove`
- Uses Mouse, Touch, and Keyboard sensors

### DragDropContentContext
- Wraps header rows and body rows in a `SortableContext`
- Uses `horizontalListSortingStrategy`
- Items are the `columnOrder` array

### Disabling Drag

Per-column: set `enableDraggable: false` in the column definition.

Globally: set `enableDragColumns: false` in `headerOptions`.

## Pinning Styles

The `useGetCommonPinningStyles` hook returns CSS styles for pinned columns:

```typescript
import { useGetCommonPinningStyles } from '@e-burgos/tucutable';

const { pinStyles, isPinned, isLastLeftPinnedColumn, isFirstRightPinnedColumn } =
  useGetCommonPinningStyles(column);

// pinStyles includes:
// - position: sticky (when pinned)
// - left/right offset
// - boxShadow (visual separator)
// - width, minWidth, maxWidth
// - zIndex
```

## Scroll Detection

```typescript
import { useScrollableTable } from '@e-burgos/tucutable';

const { containerWith, isScrollable, scrollX, handleScroll } =
  useScrollableTable(tableContainerRef);
```

- `containerWith`: container element width in px (uses `clientWidth`)
- `isScrollable`: whether `scrollWidth > clientWidth`
- `scrollX`: current horizontal scroll position
- `handleScroll`: debounced (50ms) scroll event handler

## Component Event Listener

```typescript
import { useComponentEventListener } from '@e-burgos/tucutable';

const { width, height, position, element, scroll } =
  useComponentEventListener('element-id');
```

Tracks DOM element dimensions, position, and scroll state with resize/scroll event listeners.

## Helper Functions

### Sorting Functions

```typescript
import { sortingCompareNumberFn, sortingCompareStringFn } from '@e-burgos/tucutable';

// Number comparison (handles NaN → 0)
sortingCompareNumberFn(10, 20); // -1

// String comparison (case-insensitive, locale-aware)
sortingCompareStringFn('banana', 'Apple'); // 1
```

### onChangeTableState

Utility to apply TanStack Table updaters:

```typescript
import { onChangeTableState } from '@e-burgos/tucutable';

onChangeTableState(updaterFn, currentState, setStateFn);
```

### handleHeaderTableListener

Dispatches mouseover/mouseout events on a header element (for programmatic hover triggers):

```typescript
import { handleHeaderTableListener } from '@e-burgos/tucutable';

handleHeaderTableListener(document.getElementById('my-header'));
```

### parseNumericValueForExport

Parses formatted numbers for export:

```typescript
import { parseNumericValueForExport } from '@e-burgos/tucutable';

parseNumericValueForExport('1,234.56');              // 1234.56
parseNumericValueForExport('45.5%', { isPercentage: true }); // 45.5
parseNumericValueForExport('abc');                   // undefined
```

### cn (className utility)

```typescript
import { cn } from '@e-burgos/tucutable'; // Not exported publicly; internal use
// Combines class names, filters falsy values
cn('a', false, 'b', null, 'c'); // 'a b c'
```

## TanStack Table Re-export

Access all TanStack Table types and utilities:

```typescript
import { TanstackTable } from '@e-burgos/tucutable';

// Use any TanStack type
type MyPagination = TanstackTable.PaginationState;
type MySorting = TanstackTable.SortingState;
type MyColumnDef = TanstackTable.ColumnDef<MyData>;
```

## CSS Variables (Theming)

Tucutable uses CSS custom properties for theming. Override these in your app:

```css
/* Key CSS variables (prefixed with --table-) */
--color-table-primary
--color-table-primary-text
--color-table-secondary-text
--color-table-box-bg
--color-table-header-bg
--color-table-row-expanded-bg
--color-table-divider
```

Use `getCSSColorName(color)` to generate variable names: `getCSSColorName('primary')` → `'--table-primary'`.

## File References

- Context/Provider: `ui/tucutable/src/context/index.tsx`
- Zustand store: `ui/tucutable/src/hooks/useDataTableStore.tsx`
- Cache reset: `ui/tucutable/src/hooks/useResetCacheVersion.ts`
- Pinning styles: `ui/tucutable/src/hooks/useGetCommonPinningStyles.tsx`
- Scrollable table: `ui/tucutable/src/hooks/useScrollableTable.tsx`
- Event listener: `ui/tucutable/src/hooks/useComponentEventListener.tsx`
- Initial state: `ui/tucutable/src/hooks/useInitialState.tsx`
- DragDrop contexts: `ui/tucutable/src/context/DragDropTableContext.tsx`, `ui/tucutable/src/context/DragDropContentContext.tsx`
- Functions: `ui/tucutable/src/common/functions/index.ts`
- User scopes: `ui/tucutable/src/common/functions/user-scopes/index.ts`
- Theme helper: `ui/tucutable/src/common/helpers/theme.ts`
- Constants: `ui/tucutable/src/common/constants.ts`
