import {
  Typography,
  CardContainer,
  CardTitle,
  BasicTable,
  CodeBlock,
  Alert,
} from '@e-burgos/tucu-ui';

const controlsData = [
  {
    control: 'Column Visibility',
    prop: 'enableHideColumns',
    colLevel: 'enableHiding',
    description: 'Toggle columns on/off. State persisted in localStorage.',
  },
  {
    control: 'Pin Left',
    prop: 'enablePinLeftColumns',
    colLevel: 'enablePinning',
    description: 'Stick column to the left edge. Survives horizontal scroll.',
  },
  {
    control: 'Pin Right',
    prop: 'enablePinRightColumns',
    colLevel: 'enablePinning',
    description: 'Stick column to the right edge.',
  },
  {
    control: 'Resize',
    prop: 'enableResizeColumns',
    colLevel: 'enableResizing',
    description:
      'Drag column boundary to resize. Width persisted in localStorage.',
  },
  {
    control: 'Drag Reorder',
    prop: 'enableDragColumns',
    colLevel: 'enableDraggable',
    description: 'Drag column header to reorder. Order persisted.',
  },
];

const controlsColumns = [
  { key: 'control', label: 'Feature' },
  { key: 'prop', label: 'headerOptions prop' },
  { key: 'colLevel', label: 'ColumnDef prop' },
  { key: 'description', label: 'Description' },
];

const codeGlobal = `// Enable all controls globally
<DataTable
  tableId="full-controls"
  data={data}
  columns={columns}
  headerOptions={{
    enableHideColumns: true,
    enablePinLeftColumns: true,
    enablePinRightColumns: true,
    enableResizeColumns: true,
    enableDragColumns: true,
  }}
/>`;

const codePerColumn = `// Disable specific controls per column in ColumnDef
const columns: TanstackTable.ColumnDef<User>[] = [
  {
    accessorKey: 'id',
    header: 'ID',
    size: 60,
    enableHiding: false,    // Cannot be hidden (always visible)
    enableResizing: false,  // Fixed width
    enablePinning: false,   // Cannot be pinned
    enableDraggable: false, // Cannot be dragged
  },
  {
    accessorKey: 'name',
    header: 'Name',
    // All controls enabled by headerOptions
  },
];`;

const codePinProgrammatic = `import { useDataTableContext } from '@e-burgos/tucutable';

// Access the TanStack table instance to pin columns programmatically
function PinControls() {
  const context = useDataTableContext();
  if (!context) return null;

  const { table } = context;

  const pinLeft = (columnId: string) => {
    table.getColumn(columnId)?.pin('left');
  };

  const unpinAll = () => {
    table.resetColumnPinning();
  };

  return (
    <div className="flex gap-2">
      <button onClick={() => pinLeft('name')}>Pin Name</button>
      <button onClick={unpinAll}>Unpin All</button>
    </div>
  );
}

// Wrap in DataTableProvider to use context
<DataTableProvider tableId="pin-demo" data={data} columns={columns}>
  <PinControls />
  <DataTableComponent data={data} />
</DataTableProvider>`;

const codeHideInit = `// Set initial column visibility (hide specific columns on first load)
const columns: TanstackTable.ColumnDef<User>[] = [
  { accessorKey: 'id', header: 'ID', meta: { initialVisible: false } },
  { accessorKey: 'name', header: 'Name' },
  { accessorKey: 'email', header: 'Email' },
  // 'id' column starts hidden
];

// Or via initialConfig on the DataTable
<DataTable
  tableId="hidden-cols"
  data={data}
  columns={columns}
  initialConfig={{
    // Applied as defaults to all columns
    enableHiding: true,
  }}
/>`;

function ColumnControlsSection() {
  return (
    <div className="space-y-8">
      <div>
        <Typography tag="h2" className="text-2xl font-bold mb-2">
          Column Controls
        </Typography>
        <Typography tag="p" className="text-muted">
          Column visibility, pinning, resizing, and drag reordering are
          configured at two levels: globally via <code>headerOptions</code> and
          per-column via <code>ColumnDef</code> properties. All state is
          automatically persisted to localStorage.
        </Typography>
      </div>

      {/* Matrix */}
      <CardContainer>
        <CardTitle title="Feature Matrix">
          <div className="px-4 pb-4">
            <BasicTable
              columns={controlsColumns.map((col) => ({
                ...col,
                render: (value: unknown) => {
                  if (col.key === 'prop' || col.key === 'colLevel') {
                    return (
                      <code className="text-xs bg-muted/10 px-1 py-0.5 rounded">
                        {String(value)}
                      </code>
                    );
                  }
                  return <span className="text-sm">{String(value)}</span>;
                },
              }))}
              data={controlsData}
            />
          </div>
        </CardTitle>
      </CardContainer>

      {/* Global Enable */}
      <CardContainer>
        <CardTitle title="Enable Globally via headerOptions">
          <div className="px-4 pb-4 space-y-4">
            <Typography tag="p" className="text-sm text-muted">
              Enabling a control in <code>headerOptions</code> activates it for
              all columns. You can then disable it per column in the{' '}
              <code>ColumnDef</code>.
            </Typography>
            <CodeBlock language="tsx" code={codeGlobal} />
          </div>
        </CardTitle>
      </CardContainer>

      {/* Per Column */}
      <CardContainer>
        <CardTitle title="Override Per Column">
          <div className="px-4 pb-4 space-y-4">
            <Typography tag="p" className="text-sm text-muted">
              Disable specific controls on individual columns using{' '}
              <code>ColumnDef</code> boolean props. This overrides the global
              <code>headerOptions</code> setting for that column.
            </Typography>
            <CodeBlock language="tsx" code={codePerColumn} />
          </div>
        </CardTitle>
      </CardContainer>

      {/* Programmatic Pinning */}
      <CardContainer>
        <CardTitle title="Programmatic Pinning">
          <div className="px-4 pb-4 space-y-4">
            <Alert>
              <Typography tag="p" className="text-sm">
                Use <code>useDataTableContext()</code> to access the TanStack{' '}
                <code>table</code> instance and call column pinning methods
                programmatically. See the <strong>Advanced Guide</strong> for
                more on context usage.
              </Typography>
            </Alert>
            <CodeBlock language="tsx" code={codePinProgrammatic} />
          </div>
        </CardTitle>
      </CardContainer>

      {/* Hide Init */}
      <CardContainer>
        <CardTitle title="Initial Column Visibility">
          <div className="px-4 pb-4 space-y-4">
            <Typography tag="p" className="text-sm text-muted">
              Control which columns are visible on first render. After the user
              changes visibility manually, the state is persisted in
              localStorage and the initial value is no longer used.
            </Typography>
            <CodeBlock language="tsx" code={codeHideInit} />
          </div>
        </CardTitle>
      </CardContainer>
    </div>
  );
}

export default ColumnControlsSection;
