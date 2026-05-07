import {
  Typography,
  CardContainer,
  CardTitle,
  BasicTable,
  CodeBlock,
  Alert,
  Badge,
} from '@e-burgos/tucu-ui';

const visualProps = [
  {
    prop: 'title',
    type: 'string',
    default: '-',
    description: 'Title displayed in the table wrapper above the header.',
  },
  {
    prop: 'border',
    type: 'boolean',
    default: 'false',
    description: 'Adds a visible border around the table wrapper.',
  },
  {
    prop: 'smallAnatomy',
    type: 'boolean',
    default: 'false',
    description: 'Compact row height. Reduces padding for dense data display.',
  },
  {
    prop: 'showHeader',
    type: 'boolean',
    default: 'true',
    description: 'Show or hide the column header row.',
  },
  {
    prop: 'showFooter',
    type: 'boolean',
    default: 'false',
    description: 'Display a footer row repeating the column headers.',
  },
  {
    prop: 'mode',
    type: "'dark' | 'light'",
    default: 'inherited',
    description:
      'Override the color mode for this table only, independent of the app theme.',
  },
];

const propsColumns = [
  { key: 'prop', label: 'Prop' },
  { key: 'type', label: 'Type' },
  { key: 'default', label: 'Default' },
  { key: 'description', label: 'Description' },
];

const codeDensity = `// Normal density (default)
<DataTable
  tableId="normal"
  data={data}
  columns={columns}
/>

// Compact / dense rows
<DataTable
  tableId="compact"
  data={data}
  columns={columns}
  smallAnatomy={true}
  title="Compact Data View"
  border={true}
/>`;

const codeShowHide = `// Hide the header (useful for single-column or card-like displays)
<DataTable
  tableId="no-header"
  data={data}
  columns={columns}
  showHeader={false}
/>

// Show footer (repeats column headers at bottom — useful for long tables)
<DataTable
  tableId="with-footer"
  data={largeDataset}
  columns={columns}
  showFooter={true}
/>`;

const codeModeOverride = `// Force dark mode on this table even if the app is in light mode
<DataTable
  tableId="dark-table"
  data={data}
  columns={columns}
  mode="dark"
/>

// Force light mode in a dark app
<DataTable
  tableId="light-table"
  data={data}
  columns={columns}
  mode="light"
/>

// No mode prop = inherits from the app's ThemeProvider`;

const codeAllOptions = `// All visual options combined
<DataTable
  tableId="full-visual"
  data={data}
  columns={columns}
  title="Monthly Sales Report"
  border={true}
  smallAnatomy={false}
  showHeader={true}
  showFooter={true}
  mode="dark"
/>`;

function VisualOptionsSection() {
  return (
    <div className="space-y-8">
      <div>
        <Typography tag="h2" className="text-2xl font-bold mb-2">
          Visual Options
        </Typography>
        <Typography tag="p" className="text-muted">
          Control the visual density, layout, and color scheme of the table with
          straightforward boolean props. These options complement the{' '}
          <code>sx</code> prop for fine-grained style control.
        </Typography>
      </div>

      {/* Props Table */}
      <CardContainer>
        <CardTitle title="Visual Props">
          <div className="px-4 pb-4">
            <BasicTable
              columns={propsColumns.map((col) => ({
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
                  if (col.key === 'default') {
                    return (
                      <Badge className="bg-muted/20 text-muted text-xs">
                        {String(value)}
                      </Badge>
                    );
                  }
                  return (
                    <span className="text-sm">
                      {String(row['description'] ?? value)}
                    </span>
                  );
                },
              }))}
              data={visualProps}
            />
          </div>
        </CardTitle>
      </CardContainer>

      {/* Density */}
      <CardContainer>
        <CardTitle title="Density — Normal vs Compact">
          <div className="px-4 pb-4 space-y-4">
            <Typography tag="p" className="text-sm text-muted">
              <code>smallAnatomy</code> reduces row padding, ideal for
              dashboards with many rows where vertical space is at a premium.
            </Typography>
            <CodeBlock language="tsx" code={codeDensity} />
          </div>
        </CardTitle>
      </CardContainer>

      {/* Show/Hide */}
      <CardContainer>
        <CardTitle title="Header & Footer Visibility">
          <div className="px-4 pb-4 space-y-4">
            <Alert>
              <Typography tag="p" className="text-sm">
                <code>showFooter</code> repeats the column headers at the bottom
                of the table. Useful when users need to reference column names
                while scrolling through long datasets.
              </Typography>
            </Alert>
            <CodeBlock language="tsx" code={codeShowHide} />
          </div>
        </CardTitle>
      </CardContainer>

      {/* Mode Override */}
      <CardContainer>
        <CardTitle title="Mode Override (Per Table)">
          <div className="px-4 pb-4 space-y-4">
            <Typography tag="p" className="text-sm text-muted">
              Override the app's theme mode for an individual table. Useful for
              embedding a dark-themed table in a light UI or vice versa.
            </Typography>
            <CodeBlock language="tsx" code={codeModeOverride} />
          </div>
        </CardTitle>
      </CardContainer>

      {/* All Together */}
      <CardContainer>
        <CardTitle title="All Visual Options">
          <div className="px-4 pb-4 space-y-4">
            <CodeBlock language="tsx" code={codeAllOptions} />
          </div>
        </CardTitle>
      </CardContainer>
    </div>
  );
}

export default VisualOptionsSection;
