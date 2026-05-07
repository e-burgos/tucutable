import {
  Typography,
  CardContainer,
  CardTitle,
  BasicTable,
  CodeBlock,
  Alert,
} from '@e-burgos/tucu-ui';

const storeFields = [
  {
    field: 'pagination',
    type: 'PaginationState',
    persisted: 'Yes',
    description: 'Current page index and page size.',
  },
  {
    field: 'sorting',
    type: 'SortingState',
    persisted: 'Yes',
    description: 'Active sort descriptors.',
  },
  {
    field: 'columnOrder',
    type: 'ColumnOrderState',
    persisted: 'Yes',
    description: 'Column ID order after drag reordering.',
  },
  {
    field: 'columnVisibility',
    type: 'VisibilityState',
    persisted: 'Yes',
    description: 'Map of column id → visible boolean.',
  },
  {
    field: 'columnPinning',
    type: 'ColumnPinningState',
    persisted: 'Yes',
    description: 'Left/right pinned column IDs.',
  },
  {
    field: 'columnFilters',
    type: 'ColumnFiltersState',
    persisted: 'Yes',
    description: 'Active column filter values.',
  },
  {
    field: 'columnSizing',
    type: 'ColumnSizingState',
    persisted: 'Yes',
    description: 'Column widths after resizing.',
  },
  {
    field: 'totalCount',
    type: 'number',
    persisted: 'Yes',
    description: 'Total row count (server pagination).',
  },
];

const storeColumns = [
  { key: 'field', label: 'Field' },
  { key: 'type', label: 'Type' },
  { key: 'persisted', label: 'Persisted?' },
  { key: 'description', label: 'Description' },
];

const codeDirectStore = `import { useDataTableStore } from '@e-burgos/tucutable';

// Access a specific table's store directly (outside the component tree)
function TableControls() {
  const {
    tableData: { pagination, sorting, columnOrder },
    resetStoreData,
    setPagination,
    setSorting,
  } = useDataTableStore('my-table-id');

  const handleReset = () => {
    resetStoreData();
    // Clears all persisted state for this tableId
  };

  return (
    <div className="flex gap-2">
      <span>Page: {pagination.pageIndex + 1}</span>
      <span>Sort: {sorting.map(s => s.id).join(', ') || 'none'}</span>
      <button onClick={handleReset}>Reset Table</button>
    </div>
  );
}`;

const codeContextReset = `import { useDataTableContext } from '@e-burgos/tucutable';

// Reset from inside DataTableProvider via context actions
function ResetButton() {
  const context = useDataTableContext();
  if (!context) return null;

  const { actions: { resetStoreData } } = context;

  return (
    <button
      onClick={resetStoreData}
      className="text-sm text-muted hover:text-foreground"
    >
      Reset table state
    </button>
  );
}`;

const codeLocalStorage = `// The store is persisted to localStorage under the key:
// "{tableId}-datatable"

// You can inspect/clear it manually for debugging:
localStorage.getItem('my-table-id-datatable');
localStorage.removeItem('my-table-id-datatable');

// Or use useResetCacheVersion for version-based invalidation
// (see Cache Management section)`;

const codeStoreSingleton = `// Each tableId gets exactly one Zustand store instance.
// Multiple components reading the same tableId share the same state.

const storeForTable1 = useDataTableStore('table-1'); // instance A
const storeAlsoForTable1 = useDataTableStore('table-1'); // same instance A
const storeForTable2 = useDataTableStore('table-2'); // different instance B`;

function StoreSection() {
  return (
    <div className="space-y-8">
      <div>
        <Typography tag="h2" className="text-2xl font-bold mb-2">
          Zustand Store
        </Typography>
        <Typography tag="p" className="text-muted">
          Each table has a dedicated Zustand store, keyed by{' '}
          <code>tableId</code>, that persists sorting, pagination, column order,
          visibility, pinning, and sizing to localStorage. Access it directly
          via <code>useDataTableStore</code> or through context actions.
        </Typography>
      </div>

      {/* Store Shape */}
      <CardContainer>
        <CardTitle title="Store Shape — tableData">
          <div className="px-4 pb-4">
            <BasicTable
              columns={storeColumns.map((col) => ({
                ...col,
                render: (value: unknown, row: Record<string, unknown>) => {
                  if (col.key === 'field') {
                    return (
                      <code className="text-xs bg-muted/10 px-1 py-0.5 rounded">
                        {String(value)}
                      </code>
                    );
                  }
                  if (col.key === 'type') {
                    return (
                      <code className="text-xs text-brand">
                        {String(value)}
                      </code>
                    );
                  }
                  if (col.key === 'persisted') {
                    const v = String(value);
                    return (
                      <span
                        className={
                          v === 'Yes'
                            ? 'text-success text-sm font-medium'
                            : 'text-muted text-sm'
                        }
                      >
                        {v}
                      </span>
                    );
                  }
                  return (
                    <span className="text-sm">
                      {String(row['description'] ?? value)}
                    </span>
                  );
                },
              }))}
              data={storeFields}
            />
          </div>
        </CardTitle>
      </CardContainer>

      {/* Direct Store Access */}
      <CardContainer>
        <CardTitle title="Direct Store Access (useDataTableStore)">
          <div className="px-4 pb-4 space-y-4">
            <Alert>
              <Typography tag="p" className="text-sm">
                <code>useDataTableStore</code> can be called anywhere in your
                app — it does <strong>not</strong> require a{' '}
                <code>DataTableProvider</code> in the component tree.
              </Typography>
            </Alert>
            <CodeBlock language="tsx" code={codeDirectStore} />
          </div>
        </CardTitle>
      </CardContainer>

      {/* Reset via Context */}
      <CardContainer>
        <CardTitle title="Reset via Context">
          <div className="px-4 pb-4 space-y-4">
            <Typography tag="p" className="text-sm text-muted">
              Inside a <code>DataTableProvider</code> subtree, access{' '}
              <code>resetStoreData</code> via context actions.
            </Typography>
            <CodeBlock language="tsx" code={codeContextReset} />
          </div>
        </CardTitle>
      </CardContainer>

      {/* LocalStorage */}
      <CardContainer>
        <CardTitle title="LocalStorage Key Pattern">
          <div className="px-4 pb-4 space-y-4">
            <CodeBlock language="tsx" code={codeLocalStorage} />
          </div>
        </CardTitle>
      </CardContainer>

      {/* Singleton */}
      <CardContainer>
        <CardTitle title="Store Singleton Per tableId">
          <div className="px-4 pb-4 space-y-4">
            <Typography tag="p" className="text-sm text-muted">
              The store uses a singleton map keyed by <code>tableId</code>.
              Multiple calls with the same ID return the same Zustand store
              instance.
            </Typography>
            <CodeBlock language="tsx" code={codeStoreSingleton} />
          </div>
        </CardTitle>
      </CardContainer>
    </div>
  );
}

export default StoreSection;
