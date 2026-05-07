import {
  Typography,
  CardContainer,
  CardTitle,
  BasicTable,
  CodeBlock,
  Alert,
} from '@e-burgos/tucu-ui';

const contextFields = [
  {
    field: 'table',
    type: 'Table<T>',
    description: 'Full TanStack Table instance — access rows, headers, state.',
  },
  {
    field: 'tableState',
    type: 'ITableData',
    description:
      'Current table state: pagination, sorting, columnOrder, visibility, etc.',
  },
  {
    field: 'initialState',
    type: 'ITableInitialData',
    description: 'Initial state snapshot at mount time.',
  },
  {
    field: 'actions',
    type: 'object',
    description:
      'setTotalCount, resetStoreData, setColumnFilters, report actions.',
  },
  {
    field: 'config',
    type: 'DataTableProps',
    description: 'All non-data props passed to the table.',
  },
  {
    field: 'scrollProps',
    type: 'UseScrollableTable',
    description: 'isScrollable, scrollX, containerWith, handleScroll.',
  },
  {
    field: 'tableContainerRef',
    type: 'RefObject<HTMLDivElement>',
    description: 'DOM ref to the scroll container.',
  },
  {
    field: 'utils',
    type: 'object',
    description:
      'isEmpty, checkState, handleFetch, isSubComponent, isManualPagination, isRowSelection.',
  },
];

const contextColumns = [
  { key: 'field', label: 'Field' },
  { key: 'type', label: 'Type' },
  { key: 'description', label: 'Description' },
];

const codeContext = `import { useDataTableContext } from '@e-burgos/tucutable';

// Must be used inside a DataTableProvider subtree
function RowCounter() {
  const context = useDataTableContext();
  if (!context) return null;

  const {
    table,
    tableState: { pagination, sorting },
    utils: { isEmpty, checkState },
  } = context;

  const rows = table.getRowModel().rows;
  const selectedRows = table.getSelectedRowModel().rows;

  return (
    <div className="text-sm text-muted">
      {rows.length} rows • {selectedRows.length} selected
      {isEmpty && ' (empty)'}
    </div>
  );
}`;

const codeProviderSplit = `import {
  DataTableProvider,
  DataTableComponent,
  useDataTableContext,
} from '@e-burgos/tucutable';

// Custom header that reads from context
function TableHeader() {
  const context = useDataTableContext();
  if (!context) return null;

  const { tableState: { pagination }, utils: { isEmpty } } = context;

  return (
    <div className="flex justify-between p-3">
      <span>Page {pagination.pageIndex + 1}</span>
      {isEmpty && <span className="text-warning">No data</span>}
    </div>
  );
}

// Split into Provider + Component for custom wrapping
function CustomTable({ data, columns }) {
  return (
    <DataTableProvider
      tableId="custom-split"
      data={data}
      columns={columns}
      pagination={{ showPagination: true }}
    >
      <TableHeader />           {/* reads context */}
      <DataTableComponent data={data} />
    </DataTableProvider>
  );
}`;

const codeTableInstance = `// Access TanStack Table API directly
function ExportButton() {
  const context = useDataTableContext();
  if (!context) return null;

  const { table } = context;

  const handleExport = () => {
    const rows = table.getFilteredRowModel().rows;
    const csv = rows.map((r) => Object.values(r.original).join(',')).join('\\n');
    downloadCSV(csv);
  };

  return (
    <button onClick={handleExport}>
      Export {table.getFilteredRowModel().rows.length} rows
    </button>
  );
}`;

function ContextHooksSection() {
  return (
    <div className="space-y-8">
      <div>
        <Typography tag="h2" className="text-2xl font-bold mb-2">
          Context & Hooks
        </Typography>
        <Typography tag="p" className="text-muted">
          <code>useDataTableContext</code> gives any child of{' '}
          <code>DataTableProvider</code> full access to the TanStack Table
          instance, state, actions, and utility flags. Use{' '}
          <code>DataTableProvider</code> + <code>DataTableComponent</code> to
          build custom table wrappers.
        </Typography>
      </div>

      {/* Context Shape */}
      <CardContainer>
        <CardTitle title="useDataTableContext — Shape">
          <div className="px-4 pb-4">
            <BasicTable
              columns={contextColumns.map((col) => ({
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
                  return (
                    <span className="text-sm">
                      {String(row['description'] ?? value)}
                    </span>
                  );
                },
              }))}
              data={contextFields}
            />
          </div>
        </CardTitle>
      </CardContainer>

      {/* Basic Context */}
      <CardContainer>
        <CardTitle title="useDataTableContext — Basic Usage">
          <div className="px-4 pb-4 space-y-4">
            <Alert>
              <Typography tag="p" className="text-sm">
                <code>useDataTableContext()</code> returns <code>null</code>{' '}
                when called outside a <code>DataTableProvider</code>. Always
                guard with a null check before accessing context fields.
              </Typography>
            </Alert>
            <CodeBlock language="tsx" code={codeContext} />
          </div>
        </CardTitle>
      </CardContainer>

      {/* Provider Split */}
      <CardContainer>
        <CardTitle title="DataTableProvider + DataTableComponent">
          <div className="px-4 pb-4 space-y-4">
            <Typography tag="p" className="text-sm text-muted">
              <code>DataTable</code> wraps Provider + Component automatically.
              Use the split form when you need to place custom components
              (headers, toolbars, footers) that read from context inside the
              provider boundary.
            </Typography>
            <CodeBlock language="tsx" code={codeProviderSplit} />
          </div>
        </CardTitle>
      </CardContainer>

      {/* TanStack Direct */}
      <CardContainer>
        <CardTitle title="Direct TanStack Table Access">
          <div className="px-4 pb-4 space-y-4">
            <Typography tag="p" className="text-sm text-muted">
              Access the TanStack <code>table</code> instance from context to
              call any Table API method directly — sorting, filtering, row
              models, selection, etc.
            </Typography>
            <CodeBlock language="tsx" code={codeTableInstance} />
          </div>
        </CardTitle>
      </CardContainer>
    </div>
  );
}

export default ContextHooksSection;
