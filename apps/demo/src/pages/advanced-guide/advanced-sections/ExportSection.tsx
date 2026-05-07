import {
  Typography,
  CardContainer,
  CardTitle,
  BasicTable,
  CodeBlock,
  Alert,
} from '@e-burgos/tucu-ui';

const reportActions = [
  {
    action: 'onSetReportCellValue',
    signature: '(value, rowId, cellIndex, options?) => void',
    description: 'Register a cell value in the report data map.',
  },
  {
    action: 'onSetReportHeader',
    signature: '(name, columnIndex) => void',
    description: 'Register a column header name at a given index.',
  },
  {
    action: 'resetReportData',
    signature: '() => void',
    description: 'Clear all collected report data.',
  },
];

const reportActionsColumns = [
  { key: 'action', label: 'Action' },
  { key: 'signature', label: 'Signature' },
  { key: 'description', label: 'Description' },
];

const codeReportCollect = `import {
  DataTableProvider,
  DataTableComponent,
  useDataTableContext,
} from '@e-burgos/tucutable';

// Register custom cell values for report
function CustomCell({ value, rowId, cellIndex }) {
  const context = useDataTableContext();

  useEffect(() => {
    if (!context) return;
    context.actions.onSetReportCellValue(
      String(value),
      rowId,
      cellIndex,
    );
  }, [value, rowId, cellIndex, context]);

  return <span>{value}</span>;
}

// Register header names
function CustomHeader({ name, index }) {
  const context = useDataTableContext();

  useEffect(() => {
    if (!context) return;
    context.actions.onSetReportHeader(name, index);
  }, [name, index, context]);

  return <th>{name}</th>;
}`;

const codeExportCSV = `import { useDataTableContext } from '@e-burgos/tucutable';

function ExportCSVButton() {
  const context = useDataTableContext();
  if (!context) return null;

  const { tableState: { reportData } } = context;

  const handleExport = () => {
    const { headers, rows } = reportData;

    // Build header row
    const headerRow = Array.from(headers.entries())
      .sort(([a], [b]) => a - b)
      .map(([, name]) => name)
      .join(',');

    // Build data rows
    const dataRows = Array.from(rows.entries()).map(([, cellMap]) =>
      Array.from(cellMap.entries())
        .sort(([a], [b]) => a - b)
        .map(([, value]) => \`"\${value}"\`)
        .join(','),
    );

    const csv = [headerRow, ...dataRows].join('\\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'export.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  return <button onClick={handleExport}>Export CSV</button>;
}`;

const codeParseNumeric = `import { parseNumericValueForExport } from '@e-burgos/tucutable';

// Parse formatted number strings for export
parseNumericValueForExport('1,234.56');                    // 1234.56
parseNumericValueForExport('45.5%', { isPercentage: true }); // 45.5
parseNumericValueForExport('$1,500.00');                   // 1500
parseNumericValueForExport('abc');                         // undefined

// Usage in report collection
const numericValue = parseNumericValueForExport(rawValue);
context.actions.onSetReportCellValue(
  numericValue !== undefined ? String(numericValue) : String(rawValue),
  rowId,
  cellIndex,
);`;

const codeSetScopes = `import { setScopes, getScopes, validateScopes } from '@e-burgos/tucutable';

// After login, set user scopes globally
async function onLoginSuccess(user) {
  const scopes = await fetchUserScopes(user.id);
  setScopes(scopes); // e.g. ['read:users', 'write:users']
}

// Check scopes programmatically
const userScopes = getScopes(); // returns string[]

// Validate against required scopes
const hasAccess = validateScopes(['delete:users']); // boolean

// Row actions with requiredScopes are checked automatically
const rowActions = [
  {
    action: 'delete',
    label: () => 'Delete',
    onClick: (row) => deleteUser(row.original),
    requiredScopes: ['delete:users'], // hidden if scope not present
  },
];`;

function ExportSection() {
  return (
    <div className="space-y-8">
      <div>
        <Typography tag="h2" className="text-2xl font-bold mb-2">
          Export & Report Data
        </Typography>
        <Typography tag="p" className="text-muted">
          Tucutable includes a structured report data system for building CSV
          or spreadsheet exports, numeric value parsing utilities, and a
          scope system for access-controlled row actions.
        </Typography>
      </div>

      {/* Report Actions */}
      <CardContainer>
        <CardTitle title="Report Context Actions">
          <div className="px-4 pb-4">
            <BasicTable
              columns={reportActionsColumns.map((col) => ({
                ...col,
                render: (value: unknown, row: Record<string, unknown>) => {
                  if (col.key === 'action') {
                    return (
                      <code className="text-xs bg-muted/10 px-1 py-0.5 rounded">
                        {String(value)}
                      </code>
                    );
                  }
                  if (col.key === 'signature') {
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
              data={reportActions}
            />
          </div>
        </CardTitle>
      </CardContainer>

      {/* Collect Report Data */}
      <CardContainer>
        <CardTitle title="Collecting Report Data">
          <div className="px-4 pb-4 space-y-4">
            <Alert>
              <Typography tag="p" className="text-sm">
                The report system collects values via cell-level callbacks.
                <code>RowActionsColumn</code>,{' '}
                <code>ExpandedColumn</code>, and{' '}
                <code>RowSelectionColumn</code> are automatically ignored in
                report data collection.
              </Typography>
            </Alert>
            <CodeBlock language="tsx" code={codeReportCollect} />
          </div>
        </CardTitle>
      </CardContainer>

      {/* CSV Export */}
      <CardContainer>
        <CardTitle title="Export to CSV">
          <div className="px-4 pb-4 space-y-4">
            <Typography tag="p" className="text-sm text-muted">
              Read <code>reportData.headers</code> and{' '}
              <code>reportData.rows</code> from context to build a CSV string
              for download.
            </Typography>
            <CodeBlock language="tsx" code={codeExportCSV} />
          </div>
        </CardTitle>
      </CardContainer>

      {/* parseNumeric */}
      <CardContainer>
        <CardTitle title="parseNumericValueForExport">
          <div className="px-4 pb-4 space-y-4">
            <Typography tag="p" className="text-sm text-muted">
              Parse formatted number strings (currency, percentages,
              thousands-separated) to raw numbers before including them in
              export data.
            </Typography>
            <CodeBlock language="tsx" code={codeParseNumeric} />
          </div>
        </CardTitle>
      </CardContainer>

      {/* Scopes */}
      <CardContainer>
        <CardTitle title="User Scopes for Row Actions">
          <div className="px-4 pb-4 space-y-4">
            <Typography tag="p" className="text-sm text-muted">
              Set user scopes once after login. Row actions with{' '}
              <code>requiredScopes</code> are automatically hidden from users
              missing those scopes.
            </Typography>
            <CodeBlock language="tsx" code={codeSetScopes} />
          </div>
        </CardTitle>
      </CardContainer>
    </div>
  );
}

export default ExportSection;
