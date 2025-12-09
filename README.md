# Tucutable - Advanced Data Table Component

A modern, comprehensive React data table component library built with TypeScript, Tailwind CSS, and TanStack Table. Designed for creating production-ready data tables with advanced features like sorting, filtering, pagination, column management, drag-and-drop, and more.

## 📚 Storybook & Documentation

- **📚 [Live Documentation](https://tucutable.netlify.app/)** - Complete component documentation
- **🎨 [Interactive Storybook](https://main--6933183ea79916662a243110.chromatic.com/)** - Documentation in Storybook
- **🔧 [Component Examples](https://main--6933183ea79916662a243110.chromatic.com/?path=/story/examples-tucutable--default)** - See all variations and use cases

---

## 1. What is Tucutable?

Tucutable is a feature-rich, highly customizable data table component built on top of [TanStack Table](https://tanstack.com/table). It provides a complete solution for displaying, managing, and interacting with tabular data in React applications.

### Key Characteristics

- **Type-Safe**: Built with TypeScript for full type safety
- **Highly Customizable**: Extensive configuration options
- **Performance Optimized**: Uses React.memo, useMemo, and efficient rendering strategies
- **State Persistence**: Automatic state persistence using Zustand with localStorage
- **Accessible**: Built with accessibility in mind
- **Theme Support**: Dark and light theme support
- **Responsive**: Mobile-first design with scrollable tables

---

## 2. Component Architecture

### Core Structure

```
src/
├── components/
│   ├── DataTable/              # Main table components
│   │   ├── DataTable.tsx       # Main wrapper component
│   │   ├── DataTableComponent/ # Core table implementation
│   │   ├── TableWrapper/       # Table container wrapper
│   │   ├── TableHeader/       # Column headers with actions
│   │   ├── TableRow/          # Table rows
│   │   ├── TableCell/        # Individual cells
│   │   ├── TableHead/         # Header section
│   │   └── StateTableHandler/ # Empty/error state handler
│   ├── Assets/                # Icon components
│   ├── Common/                # Shared components (Spinner, Tooltip, etc.)
│   ├── Pagination/            # Pagination controls
│   ├── ManualPagination/     # Manual pagination component
│   ├── RowSelection/          # Row selection component
│   └── Footer/                # Table footer
├── context/
│   ├── index.tsx              # Main DataTable context provider
│   ├── DragDropTableContext.tsx  # Drag & drop for columns
│   └── DragDropContentContext.tsx # Drag & drop for content
├── hooks/
│   ├── useDataTableStore.tsx  # Zustand store for persistence
│   ├── useScrollableTable.tsx # Scroll management
│   ├── useColumns.ts          # Column processing
│   ├── useGetCommonPinningStyles.tsx # Pinning styles
│   └── useComponentEventListener.tsx # Event handling
├── common/
│   ├── types/                 # TypeScript type definitions
│   ├── helpers/               # Utility functions
│   └── constants.ts           # Constants
└── assets/
    └── css/
        └── index.css          # Tailwind configuration & styles
```

### Component Hierarchy

```
DataTable (Wrapper)
  └── DataTableProvider (Context)
      └── DataTableComponent
          ├── TableWrapper
          │   ├── TableHead
          │   │   └── TableHeader (for each column)
          │   │       ├── ColumnSort
          │   │       ├── ColumnPin
          │   │       ├── ColumnVisibility
          │   │       ├── ColumnSearcher
          │   │       └── ColumnDraggable
          │   └── TableRow (for each row)
          │       └── TableCell (for each cell)
          │           ├── RowActionsCell
          │           ├── RowSelectionCell
          │           └── ExpandedRowCell
          ├── SubComponentDataTable (optional)
          ├── StateTableHandler (empty/error states)
          ├── Pagination
          └── Footer
```

---

## 3. Tailwind CSS Integration

### Configuration

Tucutable uses Tailwind CSS v4 with a custom theme configuration defined in `assets/css/index.css`. The theme uses CSS custom properties (CSS variables) for dynamic theming.

### Theme Variables

All colors are defined as CSS custom properties:

```css
--color-table-primary: #2196f3
--color-table-secondary: #662dff
--color-table-primary-text: #ffffff
--color-table-secondary-text: #b3b3b3
--color-table-row-bg: #1a1c20
--color-table-header-bg: #2a2d31
/* ... and many more */
```

### Utility Classes

The component uses custom Tailwind utility classes:

#### Background Colors

- `bg-table-row-bg` - Default row background
- `bg-table-row-expanded-bg` - Expanded row background
- `bg-table-row-hover` - Row hover state
- `bg-table-header-bg` - Header background
- `bg-table-dragged-bg` - Dragging state background

#### Text Colors

- `text-table-primary-text` - Primary text color
- `text-table-secondary-text` - Secondary text color
- `text-table-disabled` - Disabled text color

#### Borders

- `border-table-divider` - Divider border color
- `border-table-divider-columns` - Column divider color

#### Custom Utilities

- `table-sticky-header` - Sticky header positioning
- `table-scrollable` - Scrollable container
- `table-transition` - Standard transitions
- `table-text-ellipsis` - Text truncation
- `table-row-hover-shadow` - Hover shadow effect
- `table-dropdown-shadow` - Dropdown shadow
- `table-resizer` - Column resizer styles

### Responsive Design

The component uses Tailwind's responsive utilities and custom breakpoints. Tables are scrollable on smaller screens with horizontal scrolling.

---

## 4. Features

### Core Features

1. **Data Display**

   - Render tabular data with customizable columns
   - Support for nested data structures
   - Custom cell renderers
   - Virtual scrolling support

2. **Sorting**

   - Single and multi-column sorting
   - Custom sort functions
   - Sort indicators (ascending/descending)
   - Persistent sort state

3. **Filtering**

   - Column-level filtering
   - Global search
   - Custom filter functions
   - Filter state management

4. **Pagination**

   - Client-side pagination
   - Server-side pagination
   - Manual pagination
   - Customizable page sizes
   - Page navigation controls

5. **Column Management**

   - Column visibility toggle
   - Column reordering (drag & drop)
   - Column resizing
   - Column pinning (left/right)
   - Column hiding/showing

6. **Row Features**

   - Row selection (checkbox/radio)
   - Row actions menu
   - Expandable rows
   - Sub-components per row
   - Nested tables

7. **State Management**

   - Automatic state persistence (localStorage)
   - Zustand store per table instance
   - State restoration on mount
   - Configurable persistence

8. **Export Functionality**
   - Export cell values
   - Export headers
   - Numeric value parsing
   - Percentage formatting

### Advanced Features

- **Drag & Drop**: Reorder columns via drag and drop using `@dnd-kit`
- **Theming**: Dark/light theme support with CSS variables
- **Accessibility**: ARIA labels, keyboard navigation
- **Performance**: Memoization, lazy loading, efficient re-renders
- **Customization**: Extensive prop system for styling and behavior
- **Error Handling**: Built-in error states and messages
- **Loading States**: Loading indicators and skeleton states

---

## 5. Using the Context

### DataTableProvider

The `DataTableProvider` wraps the table and provides context to all child components.

```typescript
import { DataTableProvider, useDataTableContext } from '@tucutable';

function MyTable() {
  return (
    <DataTableProvider
      tableId="my-table"
      data={data}
      columns={columns}
      // ... other props
    >
      <DataTableComponent data={data} />
    </DataTableProvider>
  );
}
```

### useDataTableContext Hook

Access the table context from any child component:

```typescript
import { useDataTableContext } from '@e-burgos/tucutable';

function MyComponent() {
  const context = useDataTableContext();

  if (!context) return null;

  const {
    tableState, // Current table state
    actions, // Table actions
    table, // TanStack Table instance
    utils, // Utility flags
    config, // Table configuration
    scrollProps, // Scroll properties
    tableContainerRef, // Container ref
  } = context;

  // Use the context...
}
```

### Context Structure

```typescript
interface DataTableStore {
  tableState: {
    id: string;
    pagination: PaginationState;
    sorting: SortingState;
    columnOrder: ColumnOrderState;
    columnVisibility: VisibilityState;
    columnPinning: ColumnPinningState;
    columnFilters: ColumnFiltersState;
    rowSelection?: RowSelectionState;
    totalCount?: number;
    reportData: ReportDataState;
  };

  actions: {
    setTotalCount?: (value: number) => void;
    resetStoreData: () => void;
    setColumnFilters: (value: ColumnFiltersState) => void;
    onSetReportCellValue: (value: string, rowId: string, cellIndex: number, options?: { hasSubTable?: boolean }) => void;
    onSetReportHeader: (value: string, cellIndex: number) => void;
    resetReportData: () => void;
  };

  utils: {
    isEmpty: boolean;
    checkState: boolean;
    handleFetch: boolean;
    isSubComponent: boolean;
    isManualPagination: boolean;
    isRowSelection: boolean;
  };

  table: Table<TData>;
  config: Omit<DataTableProps, 'data'>;
  scrollProps: UseScrollableTable;
  tableContainerRef: MutableRefObject<HTMLDivElement>;
}
```

---

## 6. Using Hooks

### Available Hooks

#### useDataTableStore

Manages persistent state using Zustand:

```typescript
import { useDataTableStore } from '@e-burgos/tucutable';

const {
  pagination,
  sorting,
  columnOrder,
  columnVisibility,
  setPagination,
  setSorting,
  // ... other state and setters
} = useDataTableStore(tableId);
```

#### useScrollableTable

Manages table scrolling:

```typescript
import { useScrollableTable } from '@e-burgos/tucutable';

const scrollProps = useScrollableTable(tableContainerRef);

// Returns:
// {
//   containerWith: number;
//   isScrollable: boolean;
//   scrollX: number;
//   handleScroll: (e: React.UIEvent) => void;
// }
```

#### useGetCommonPinningStyles

Gets styles for pinned columns:

```typescript
import { useGetCommonPinningStyles } from '@e-burgos/tucutable';

const { pinStyles, isPinned } = useGetCommonPinningStyles(column);
```

#### useComponentEventListener

Listens to component events:

```typescript
import { useComponentEventListener } from '@e-burgos/tucutable';

const { element } = useComponentEventListener(`${tableId}-container`);
```

#### useColumns

Processes and transforms columns:

```typescript
import { useColumns } from '@e-burgos/tucutable';

const processedColumns = useColumns({
  columns: defaultColumns,
  containerWidth,
  offset,
  isSubComponent,
  isRowActions,
  isRowSelection,
  columnVisibility,
});
```

---

## 7. Using Styles

### Custom Styling

#### Via Props

```typescript
<DataTable
  sx={{
    row: { backgroundColor: 'red' },
    cell: { padding: '10px' },
    wrapper: { border: '1px solid blue' },
  }}
/>
```

#### Via CSS Variables

Override theme variables:

```css
[data-theme='light'] {
  --color-table-primary: #your-color;
  --color-table-row-bg: #your-bg;
}
```

#### Via Tailwind Classes

Use custom utility classes:

```typescript
<DataTable className="bg-table-paper-bg border-table-divider" />
```

### Style Props Interface

```typescript
interface IDataTableStyles {
  wrapper?: React.CSSProperties;
  wrapperContainer?: React.CSSProperties;
  tableContainer?: React.CSSProperties;
  messageContainer?: React.CSSProperties;
  table?: React.CSSProperties;
  thead?: React.CSSProperties;
  tbody?: React.CSSProperties;
  tfoot?: React.CSSProperties;
  header?: React.CSSProperties;
  row?: React.CSSProperties;
  rowExpanded?: React.CSSProperties;
  cell?: React.CSSProperties;
  pagination?: React.CSSProperties;
  container?: React.CSSProperties;
}
```

---

## 8. Color Palette

### Primary Colors

- **Primary**: `#2196f3` (Blue)
- **Secondary**: `#662dff` (Purple)

### Dark Theme (Default)

#### Text Colors

- **Primary Text**: `#ffffff` (White)
- **Secondary Text**: `#b3b3b3` (Light Gray)
- **Disabled**: `#4d4d4d` (Dark Gray)

#### Background Colors

- **Paper BG**: `#16191f`
- **Default BG**: `#101217`
- **Box BG**: `#0a0b0d`
- **Row BG**: `#1a1c20`
- **Row Expanded BG**: `#191b24`
- **Row Pinned**: `#1d2025`
- **Row Hover**: `#292b31`
- **Header BG**: `#2a2d31`
- **Action BG**: `#1b1d22`
- **Dragged BG**: `#0a0b0d`

#### Border Colors

- **Divider**: `#333333`
- **Column Divider**: `#595959`

### Light Theme

#### Text Colors

- **Primary Text**: `#212121` (Dark Gray)
- **Secondary Text**: `#999999` (Gray)
- **Disabled**: `#9e9e9e` (Medium Gray)

#### Background Colors

- **Paper BG**: `#ebeff7`
- **Default BG**: `#f8fafc`
- **Box BG**: `#ffffff`
- **Row BG**: `#ffffff`
- **Row Expanded BG**: `#f8fafc`
- **Row Pinned**: `#f8fafc`
- **Row Hover**: `#f8fafc`
- **Header BG**: `#fafafa`
- **Action BG**: `#1b1d22`
- **Dragged BG**: `#e5ebf7`

#### Border Colors

- **Divider**: `#e0e0e0`
- **Column Divider**: `#b8b8b8`

### Theme Switching

```typescript
// Via mode prop
<DataTable mode="light" ... />

// Via data attribute
<div data-theme="light">
  <DataTable ... />
</div>

// Via class
<div className="light">
  <DataTable ... />
</div>
```

---

## 9. Icons

### Available Icon Components

All icons are exported from `@e-burgos/tucutable/components/Assets`:

- `ArrowIndicator` - Sort arrow
- `ArrowDoubleIndicator` - Multi-sort indicator
- `ArrowLongIndicator` - Long arrow
- `ArrowPaginationIndicator` - Pagination arrows
- `ColumnIndicator` - Column icon
- `DeleteIndicator` - Delete action
- `DownloadIndicator` - Download action
- `DragIndicator` - Drag handle
- `EditIndicator` - Edit action
- `FilterIndicator` - Filter icon
- `MoreIndicator` - More options (three dots)
- `OpenNewTab` - Open in new tab
- `PinIndicator` - Pin/unpin column
- `RowIndicator` - Row expand/collapse
- `ViewDetailsIndicator` - View details
- `VisibilityIndicator` - Show/hide column
- `VoidIndicator` - Void action

### Usage

```typescript
import {
  ArrowIndicator,
  PinIndicator,
  DragIndicator
} from '@e-burgos/tucutable';

<ArrowIndicator />
<PinIndicator isPinned={true} />
<DragIndicator />
```

### Icon Styling

Icons inherit color from their parent and use `currentColor` for fill/stroke. They respond to hover states and theme changes automatically.

---

## 10. Animations

### Built-in Animations

#### Fade In

```css
animation: fadeInAnimation 0.3s ease-in-out;
```

#### Slide Top

```css
animation: slideTop 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
```

#### Slide Out Top

```css
animation: slideOutTop 0.5s cubic-bezier(0.55, 0.085, 0.68, 0.53);
```

#### Spin (Loading)

```css
animation: spin 1s linear infinite;
```

### Animation Usage

Animations are applied automatically to:

- Row expansions/collapses
- Dropdown menus
- Loading spinners
- State transitions

### Custom Animations

You can add custom animations via CSS:

```css
@keyframes myAnimation {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.my-component {
  animation: myAnimation 0.3s ease-in-out;
}
```

---

## 11. Transitions

### Standard Transitions

All interactive elements use smooth transitions:

#### Background Color

```css
transition: background-color 0.2s ease-in-out;
```

#### All Properties

```css
transition: all 0.2s ease-in-out;
```

#### Transform

```css
transition: transform 0.2s ease-in-out;
```

### Transition Durations

- **Fast**: `150ms` (resizers, quick interactions)
- **Standard**: `200ms` (most UI elements)
- **Slow**: `300ms` (animations, complex transitions)

### Transition Timing Functions

- `ease-in-out` - Standard transitions
- `cubic-bezier(0.25, 0.46, 0.45, 0.94)` - Smooth animations
- `linear` - Loading spinners

### Applied To

- Row hover states
- Cell background changes
- Column drag operations
- Button hover states
- Dropdown open/close
- Icon color changes
- Resizer interactions

---

## 12. Behaviors

### Interactive Behaviors

#### Row Interactions

- **Hover**: Background color change, shadow effect
- **Click**: Row selection, expand/collapse
- **Drag**: Row reordering (if enabled)

#### Column Interactions

- **Hover**: Header highlight, resize handle appears
- **Click**: Sort toggle, pin toggle
- **Drag**: Column reordering
- **Resize**: Column width adjustment

#### Cell Interactions

- **Hover**: Background color change
- **Click**: Cell selection, action triggers
- **Focus**: Keyboard navigation

### State Behaviors

#### Loading State

- Shows spinner
- Disables interactions
- Maintains layout

#### Empty State

- Shows custom message
- Provides action buttons
- Maintains table structure

#### Error State

- Shows error message
- Provides retry option
- Maintains accessibility

#### Expanded State

- Shows sub-component
- Highlights expanded row
- Maintains scroll position

### Keyboard Navigation

- **Tab**: Navigate between interactive elements
- **Arrow Keys**: Navigate cells (if enabled)
- **Enter/Space**: Activate selected element
- **Escape**: Close dropdowns, cancel actions

---

## 13. Validations

### Type Validation

The component uses TypeScript for compile-time validation:

```typescript
interface DataTableProps<TData> {
  tableId: string; // Required
  data: Array<TData>; // Required
  columns: Array<ColumnDef<any, any>>; // Required
  // ... other props with types
}
```

### Runtime Validation

#### Required Props

- `tableId`: Must be a non-empty string
- `data`: Must be an array
- `columns`: Must be a non-empty array

#### Prop Validation

- Column definitions are validated against TanStack Table requirements
- Pagination props are validated for consistency
- Row selection props are validated for type compatibility

### Error Handling

Invalid configurations result in:

- Console warnings
- Fallback to default values
- Graceful degradation

---

## 14. Errors

### Common Errors

#### "Maximum update depth exceeded"

**Cause**: Infinite loop in state updates  
**Solution**: Fixed by deferring Zustand store updates with `queueMicrotask()`

#### "Cannot update component while rendering"

**Cause**: State updates during render  
**Solution**: All store updates are deferred to microtasks

#### "Table instance not found"

**Cause**: Using context outside provider  
**Solution**: Ensure component is wrapped in `DataTableProvider`

### Error States

The component handles errors gracefully:

```typescript
interface IDataTableStateMessage {
  errorData?: string;
  errorDataDescription?: string;
  contactSupport?: string;
  contactSupportLink?: string;
  hideContactSupport?: boolean;
}
```

### Error Display

Errors are displayed in the `StateTableHandler` component with:

- Error message
- Error description
- Support contact information
- Retry option (if applicable)

---

## 15. Warnings

### Development Warnings

#### Missing tableId

**Warning**: "Table ID is required"  
**Impact**: State persistence won't work correctly

#### Invalid Column Definition

**Warning**: "Column definition is invalid"  
**Impact**: Column may not render correctly

#### Duplicate Column IDs

**Warning**: "Duplicate column ID detected"  
**Impact**: Column behavior may be unpredictable

### Console Warnings

The component logs warnings for:

- Missing required props
- Invalid prop combinations
- Deprecated prop usage
- Performance issues

### Suppressing Warnings

Warnings can be suppressed via ESLint comments, but it's recommended to fix the underlying issues.

---

## 16. Tips

### Performance Tips

1. **Memoize Data**: Use `useMemo` for processed data

   ```typescript
   const processedData = useMemo(() => processData(rawData), [rawData]);
   ```

2. **Memoize Columns**: Prevent unnecessary re-renders

   ```typescript
   const columns = useMemo(() => columnDefs, [dependencies]);
   ```

3. **Virtual Scrolling**: Enable for large datasets

   ```typescript
   <DataTable
     // Use virtual scrolling for > 1000 rows
     enableVirtualization={data.length > 1000}
   />
   ```

4. **Lazy Loading**: Load data incrementally
   ```typescript
   const { data, isLoading } = useInfiniteQuery(...);
   ```

### Best Practices

1. **Unique tableId**: Always use unique IDs for multiple tables

   ```typescript
   <DataTable tableId={`table-${userId}-${tableType}`} />
   ```

2. **Column Definitions**: Define columns outside component or memoize

   ```typescript
   const columns = useMemo(() => [...], []);
   ```

3. **State Management**: Use context actions instead of direct state manipulation

   ```typescript
   const { actions } = useDataTableContext();
   actions?.setTotalCount(count);
   ```

4. **Styling**: Use CSS variables for theming instead of inline styles

   ```css
   :root {
     --color-table-primary: #your-color;
   }
   ```

5. **Accessibility**: Always provide proper labels and ARIA attributes
   ```typescript
   <DataTable
     aria-label="User data table"
     // ...
   />
   ```

---

## 17. Tricks

### Advanced Tricks

#### 1. Custom Cell Renderers with Context

```typescript
const columns: ColumnDef<Data>[] = [
  {
    id: 'actions',
    cell: ({ row }) => {
      const { actions } = useDataTableContext();
      return <CustomActions row={row} actions={actions} />;
    },
  },
];
```

#### 2. Conditional Column Visibility

```typescript
const columns = useMemo(() => {
  return baseColumns.filter((col) => {
    if (col.id === 'sensitive' && !hasPermission) return false;
    return true;
  });
}, [hasPermission]);
```

#### 3. Dynamic Column Ordering

```typescript
const { tableState, actions } = useDataTableContext();

useEffect(() => {
  if (userPreferences.columnOrder) {
    // Restore user's preferred column order
    actions?.setColumnOrder(userPreferences.columnOrder);
  }
}, []);
```

#### 4. Server-Side Pagination with Caching

```typescript
const { data, isLoading } = useQuery({
  queryKey: ['table-data', pageIndex, pageSize],
  queryFn: () => fetchData(pageIndex, pageSize),
  keepPreviousData: true,
});
```

#### 5. Export Functionality

```typescript
const { tableState } = useDataTableContext();

const exportToCSV = () => {
  const { reportData } = tableState;
  // Use reportData.rows and reportData.headers
  // to generate CSV
};
```

#### 6. Custom Empty State

```typescript
<DataTable
  stateMessage={{
    noData: 'No items found',
    noDataDescription: 'Try adjusting your filters',
    // Custom empty state component
  }}
/>
```

#### 7. Row Actions with Permissions

```typescript
const rowActions: IRowActions<Data>[] = [
  {
    action: 'edit',
    onClick: (row) => handleEdit(row),
    showOptions: (row) => hasPermission('edit', row),
    requiredScopes: ['edit'],
  },
];
```

#### 8. Nested Tables

```typescript
<DataTable
  renderSubDataTable={{
    columns: subColumns,
    data: (row) => row.subItems,
    expandedColumnSize: 50,
  }}
/>
```

#### 9. Custom Styling per Row

```typescript
const getRowStyle = (row: Row<Data>) => {
  if (row.original.isHighlighted) {
    return { backgroundColor: 'yellow' };
  }
  return {};
};

<DataTable
  sx={{
    row: (row) => getRowStyle(row),
  }}
/>;
```

#### 10. State Persistence per User

```typescript
// Custom storage key
const tableId = `user-${userId}-table-${tableType}`;

<DataTable
  tableId={tableId}
  // State automatically persists to localStorage
  // with key: `${tableId}-datatable`
/>;
```

---

## Quick Start

### Installation

```bash
npm install @e-burgos/tucutable
# or
yarn add @e-burgos/tucutable
# or
pnpm add @e-burgos/tucutable
```

### Basic Usage

```typescript
import { DataTable, TanstackTable } from '@e-burgos/tucutable';

interface User {
  id: string;
  name: string;
  email: string;
}

const columns: TanstackTable.ColumnDef<User>[] = [
  {
    accessorKey: 'name',
    header: 'Name',
  },
  {
    accessorKey: 'email',
    header: 'Email',
  },
];

function App() {
  const data: User[] = [
    { id: '1', name: 'John Doe', email: 'john@example.com' },
    { id: '2', name: 'Jane Smith', email: 'jane@example.com' },
  ];

  return <DataTable tableId="users-table" data={data} columns={columns} />;
}
```

---

## API Reference

### DataTable Props

See the [full API documentation](https://main--6933183ea79916662a243110.chromatic.com/?path=/docs/examples-tucutable--documentation) for complete prop definitions.

---

## Contributing

Contributions are welcome! Please read our contributing guidelines before submitting PRs.

---

## License

MIT License

---

## Support

For issues, questions, or feature requests, please open an issue on GitHub or contact support.
