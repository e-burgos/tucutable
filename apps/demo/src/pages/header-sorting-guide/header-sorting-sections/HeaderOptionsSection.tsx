import {
  Typography,
  CardContainer,
  CardTitle,
  BasicTable,
  CodeBlock,
  Alert,
} from '@e-burgos/tucu-ui';

const headerOptionsProps = [
  {
    prop: 'headerContainer',
    type: 'ReactNode',
    description:
      'Custom JSX rendered above the table, inside the header wrapper.',
  },
  {
    prop: 'enableHideColumns',
    type: 'boolean',
    description: 'Adds a column visibility toggle button to the toolbar.',
  },
  {
    prop: 'enablePinLeftColumns',
    type: 'boolean',
    description:
      'Adds a "pin left" control to each column header context menu.',
  },
  {
    prop: 'enablePinRightColumns',
    type: 'boolean',
    description:
      'Adds a "pin right" control to each column header context menu.',
  },
  {
    prop: 'enableSortColumns',
    type: 'boolean',
    description: 'Enables sort indicators and click-to-sort on column headers.',
  },
  {
    prop: 'enableResizeColumns',
    type: 'boolean',
    description: 'Shows a drag handle at each column boundary for resizing.',
  },
  {
    prop: 'enableDragColumns',
    type: 'boolean',
    description: 'Allows drag-and-drop column reordering via header drag.',
  },
  {
    prop: 'className',
    type: 'string',
    description:
      'Additional CSS class applied to the header container element.',
  },
];

const propsTableColumns = [
  { key: 'prop', label: 'Prop' },
  { key: 'type', label: 'Type' },
  { key: 'description', label: 'Description' },
];

const codeBasic = `<DataTable
  tableId="header-demo"
  data={data}
  columns={columns}
  headerOptions={{
    enableHideColumns: true,
    enablePinLeftColumns: true,
    enablePinRightColumns: true,
    enableSortColumns: true,
    enableResizeColumns: true,
    enableDragColumns: true,
  }}
/>`;

const codeCustomHeader = `import { DataTable } from '@e-burgos/tucutable';

function MyTable() {
  const [search, setSearch] = useState('');

  return (
    <DataTable
      tableId="custom-header"
      data={data}
      columns={columns}
      headerOptions={{
        headerContainer: (
          <div className="flex items-center justify-between p-2">
            <h2 className="text-lg font-semibold">Users</h2>
            <input
              type="search"
              placeholder="Filter..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="border border-border rounded px-3 py-1 text-sm"
            />
          </div>
        ),
        enableHideColumns: true,
      }}
    />
  );
}`;

const codeAllOff = `// Minimal table — no header controls at all
<DataTable
  tableId="minimal"
  data={data}
  columns={columns}
/>

// Or explicitly disable everything
<DataTable
  tableId="locked"
  data={data}
  columns={columns}
  headerOptions={{
    enableHideColumns: false,
    enablePinLeftColumns: false,
    enablePinRightColumns: false,
    enableSortColumns: false,
    enableResizeColumns: false,
    enableDragColumns: false,
  }}
/>`;

function HeaderOptionsSection() {
  return (
    <div className="space-y-8">
      <div>
        <Typography tag="h2" className="text-2xl font-bold mb-2">
          Header Options
        </Typography>
        <Typography tag="p" className="text-muted">
          The <code>headerOptions</code> prop (<code>IHeaderOptions</code>)
          controls the header toolbar: column visibility toggles, pinning
          controls, resize handles, drag reordering, and a custom header slot.
        </Typography>
      </div>

      {/* Props Table */}
      <CardContainer>
        <CardTitle title="IHeaderOptions Props">
          <div className="px-4 pb-4">
            <BasicTable
              columns={propsTableColumns.map((col) => ({
                ...col,
                render: (value: unknown, row: Record<string, unknown>) => {
                  if (col.key === 'prop') {
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
              data={headerOptionsProps}
            />
          </div>
        </CardTitle>
      </CardContainer>

      {/* All Controls */}
      <CardContainer>
        <CardTitle title="Enable All Controls">
          <div className="px-4 pb-4 space-y-4">
            <Typography tag="p" className="text-sm text-muted">
              Enable the full feature set with all boolean flags. Each flag can
              be individually toggled without affecting others.
            </Typography>
            <CodeBlock language="tsx" code={codeBasic} />
          </div>
        </CardTitle>
      </CardContainer>

      {/* Custom Header */}
      <CardContainer>
        <CardTitle title="Custom Header Slot">
          <div className="px-4 pb-4 space-y-4">
            <Typography tag="p" className="text-sm text-muted">
              Use <code>headerContainer</code> to inject any JSX above the table
              — search inputs, action bars, titles, filter chips, etc.
            </Typography>
            <CodeBlock language="tsx" code={codeCustomHeader} />
          </div>
        </CardTitle>
      </CardContainer>

      {/* Minimal */}
      <CardContainer>
        <CardTitle title="Minimal Table (No Controls)">
          <div className="px-4 pb-4 space-y-4">
            <Alert>
              <Typography tag="p" className="text-sm">
                All <code>headerOptions</code> flags default to{' '}
                <code>false</code> (or undefined). Omitting the prop entirely
                gives you a clean table with no toolbar controls.
              </Typography>
            </Alert>
            <CodeBlock language="tsx" code={codeAllOff} />
          </div>
        </CardTitle>
      </CardContainer>
    </div>
  );
}

export default HeaderOptionsSection;
