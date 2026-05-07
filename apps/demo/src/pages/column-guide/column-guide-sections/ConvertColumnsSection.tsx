import {
  Typography,
  CardContainer,
  CardTitle,
  BasicTable,
  CodeBlock,
  Badge,
  Alert,
  LucideIcons,
} from '@e-burgos/tucu-ui';

const gridColumnsProps = [
  {
    gridProp: 'field',
    columnDefProp: 'accessorKey',
    notes: 'Direct mapping. Also sets id.',
  },
  {
    gridProp: 'headerName',
    columnDefProp: 'header',
    notes: 'Becomes a static string header.',
  },
  {
    gridProp: 'width',
    columnDefProp: 'size',
    notes: 'Pixel width — converted as-is.',
  },
  {
    gridProp: 'minWidth',
    columnDefProp: 'minSize',
    notes: 'Minimum resize width.',
  },
  {
    gridProp: 'renderCell',
    columnDefProp: 'cell',
    notes: 'Cell renderer. Params are adapted to CellContext.',
  },
  {
    gridProp: 'renderHeader',
    columnDefProp: 'header',
    notes: 'Header renderer. Params adapted to HeaderContext.',
  },
  {
    gridProp: 'sortable',
    columnDefProp: 'enableSorting',
    notes: 'Boolean mapping.',
  },
  {
    gridProp: 'resizable',
    columnDefProp: 'enableResizing',
    notes: 'Boolean mapping.',
  },
  {
    gridProp: 'hideable',
    columnDefProp: 'enableHiding',
    notes: 'Boolean mapping.',
  },
  {
    gridProp: 'pinnable',
    columnDefProp: 'enablePinning',
    notes: 'Boolean mapping.',
  },
];

const gridColumns = [
  { key: 'gridProp', label: 'GridColumns Prop' },
  { key: 'columnDefProp', label: 'ColumnDef Prop' },
  { key: 'notes', label: 'Notes' },
];

const persistenceItems = [
  {
    item: 'Column order',
    trigger: 'enableDraggable / DnD',
    storage: 'columnOrder',
  },
  {
    item: 'Column visibility',
    trigger: 'enableHiding',
    storage: 'columnVisibility',
  },
  {
    item: 'Column pinning',
    trigger: 'enablePinning',
    storage: 'columnPinning',
  },
  {
    item: 'Column sizing',
    trigger: 'enableResizing',
    storage: 'columnSizing',
  },
  {
    item: 'Column filters',
    trigger: 'enableColumnFilter',
    storage: 'columnFilters',
  },
];

const persistColumns = [
  { key: 'item', label: 'State' },
  { key: 'trigger', label: 'Trigger' },
  { key: 'storage', label: 'localStorage Key' },
];

const codeConvertBefore = `// BEFORE — MUI DataGrid GridColumns
import { GridColumns } from '@mui/x-data-grid';

const columns: GridColumns = [
  { field: 'id', headerName: 'ID', width: 60 },
  { field: 'name', headerName: 'Name', width: 200 },
  {
    field: 'status',
    headerName: 'Status',
    renderCell: ({ value }) => <span>{value ? 'Active' : 'Inactive'}</span>,
  },
];`;

const codeConvertAfter = `// AFTER — using convertColumns()
import { convertColumns } from '@e-burgos/tucutable';

const columns = convertColumns<User>([
  { field: 'id', headerName: 'ID', width: 60 },
  { field: 'name', headerName: 'Name', width: 200 },
  {
    field: 'status',
    headerName: 'Status',
    renderCell: ({ value }) => <span>{value ? 'Active' : 'Inactive'}</span>,
  },
]);
// Returns: TanstackTable.ColumnDef<User>[]`;

const codeInitialConfig = `import { DataTable } from '@e-burgos/tucutable';

<DataTable
  tableId="users-table"     // used as localStorage namespace key
  columns={columns}
  data={data}
  initialConfig={{
    pageSize: 20,            // default page size (default: 10)
    enableHideColumns: true, // show column visibility toggle (default: true)
    enableDragColumns: true, // allow column reorder via DnD (default: true)
    enablePinColumns: true,  // allow pinning (default: true)
    enableSortColumns: true, // allow sorting (default: true)
    enableResizeColumns: true, // allow resizing (default: true)
  }}
/>`;

const codePersistReset = `import { useResetCacheVersion } from '@e-burgos/tucutable';

function TableToolbar() {
  const { resetCache } = useResetCacheVersion('users-table');

  return (
    <button onClick={resetCache}>
      Reset Table Layout
    </button>
  );
}`;

export default function ConvertColumnsSection() {
  return (
    <>
      {/* Header */}
      <div className="text-center space-y-3 pb-4">
        <Typography tag="h2" className="text-2xl sm:text-3xl font-bold">
          Convert & Configure
        </Typography>
        <Typography tag="p" className="text-muted max-w-2xl mx-auto">
          Migrate from MUI DataGrid in minutes with{' '}
          <code className="text-xs bg-muted/30 px-1 py-0.5 rounded">
            convertColumns
          </code>
          , set global defaults with{' '}
          <code className="text-xs bg-muted/30 px-1 py-0.5 rounded">
            initialConfig
          </code>
          , and understand how column state is automatically persisted to
          localStorage.
        </Typography>
      </div>

      {/* convertColumns utility */}
      <CardContainer className="overflow-hidden">
        <div className="p-4 bg-linear-to-br from-blue-500/20 to-blue-600/10">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-background/80 flex items-center justify-center shrink-0">
              <LucideIcons.RefreshCcw className="w-5 h-5 text-blue-500" />
            </div>
            <div>
              <Typography tag="h3" className="text-sm font-semibold">
                convertColumns() — MUI DataGrid Migration
              </Typography>
              <Typography tag="p" className="text-xs text-muted">
                Converts <code className="font-mono">GridColumns[]</code> to{' '}
                <code className="font-mono">ColumnDef&lt;T&gt;[]</code> with
                prop mapping.
              </Typography>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x">
          <div className="p-4">
            <p className="text-xs font-semibold text-muted uppercase tracking-wide mb-3">
              Before
            </p>
            <CodeBlock language="tsx" code={codeConvertBefore} />
          </div>
          <div className="p-4">
            <p className="text-xs font-semibold text-brand uppercase tracking-wide mb-3">
              After
            </p>
            <CodeBlock language="tsx" code={codeConvertAfter} />
          </div>
        </div>
      </CardContainer>

      {/* Prop mapping table */}
      <CardContainer className="overflow-hidden">
        <CardTitle title="GridColumns → ColumnDef Prop Mapping">
          <div className="px-4 pb-4">
            <BasicTable
              columns={gridColumns.map((col) => ({
                ...col,
                render: (value: unknown, row: Record<string, unknown>) => {
                  if (col.key === 'gridProp')
                    return (
                      <code className="text-xs font-mono text-warning font-semibold">
                        {String(value ?? '')}
                      </code>
                    );
                  if (col.key === 'columnDefProp')
                    return (
                      <code className="text-xs font-mono text-brand font-semibold">
                        {String(value ?? '')}
                      </code>
                    );
                  return <span className="text-sm">{row.notes as string}</span>;
                },
              }))}
              data={gridColumnsProps}
            />
          </div>
        </CardTitle>
      </CardContainer>

      {/* initialConfig */}
      <CardContainer className="overflow-hidden">
        <div className="p-4 bg-linear-to-br from-purple-500/20 to-purple-600/10">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-background/80 flex items-center justify-center shrink-0">
              <LucideIcons.Settings2 className="w-5 h-5 text-purple-500" />
            </div>
            <div>
              <Typography tag="h3" className="text-sm font-semibold">
                initialConfig — Table-Level Defaults
              </Typography>
              <Typography tag="p" className="text-xs text-muted">
                Override global feature availability and default page size for
                the entire table.
              </Typography>
            </div>
          </div>
        </div>
        <div className="p-4">
          <CodeBlock language="tsx" code={codeInitialConfig} />
        </div>
      </CardContainer>

      {/* State persistence */}
      <CardContainer className="overflow-hidden">
        <CardTitle title="Automatic State Persistence">
          <div className="px-4 pb-4 space-y-4">
            <Alert className="border-success/30 bg-success/5">
              <div className="flex items-start gap-2">
                <LucideIcons.HardDrive className="w-4 h-4 text-success shrink-0 mt-0.5" />
                <Typography tag="p" className="text-sm text-success">
                  All column state changes are automatically saved to{' '}
                  <code className="font-mono text-xs">localStorage</code> under
                  a key derived from{' '}
                  <code className="font-mono text-xs">tableId</code>. No setup
                  needed.
                </Typography>
              </div>
            </Alert>
            <BasicTable
              columns={persistColumns.map((col) => ({
                ...col,
                render: (value: unknown, row: Record<string, unknown>) => {
                  if (col.key === 'item')
                    return (
                      <span className="text-sm font-medium">
                        {String(value ?? '')}
                      </span>
                    );
                  if (col.key === 'trigger')
                    return (
                      <code className="text-xs font-mono text-muted">
                        {String(value ?? '')}
                      </code>
                    );
                  if (col.key === 'storage')
                    return (
                      <Badge
                        size="small"
                        shape="pill"
                        className="bg-muted/30 text-muted"
                      >
                        {String(value ?? '')}
                      </Badge>
                    );
                  return <span>{row[col.key] as string}</span>;
                },
              }))}
              data={persistenceItems}
            />
          </div>
        </CardTitle>
      </CardContainer>

      {/* Reset cache */}
      <CardContainer className="overflow-hidden">
        <div className="p-4 bg-linear-to-br from-rose-500/20 to-rose-600/10">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-background/80 flex items-center justify-center shrink-0">
              <LucideIcons.RotateCcw className="w-5 h-5 text-rose-500" />
            </div>
            <div>
              <Typography tag="h3" className="text-sm font-semibold">
                useResetCacheVersion — Clear Persisted State
              </Typography>
              <Typography tag="p" className="text-xs text-muted">
                Programmatically reset all column state for a given tableId.
              </Typography>
            </div>
          </div>
        </div>
        <div className="p-4">
          <CodeBlock language="tsx" code={codePersistReset} />
        </div>
      </CardContainer>
    </>
  );
}
