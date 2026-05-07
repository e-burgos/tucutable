import {
  Typography,
  CardContainer,
  CardTitle,
  BasicTable,
  CodeBlock,
  Alert,
} from '@e-burgos/tucu-ui';

const sxKeysData = [
  {
    key: 'wrapper',
    targets: 'Outer wrapper div',
    notes: 'Outermost container element.',
  },
  {
    key: 'wrapperContainer',
    targets: 'Inner wrapper div',
    notes: 'Inside the wrapper, wraps table + pagination.',
  },
  {
    key: 'tableContainer',
    targets: 'Scrollable div',
    notes: 'The scrollable region. Set maxHeight for fixed height.',
  },
  { key: 'table', targets: '<table>', notes: 'The <table> element itself.' },
  { key: 'thead', targets: '<thead>', notes: 'Header group rows.' },
  { key: 'tbody', targets: '<tbody>', notes: 'Body rows container.' },
  {
    key: 'tfoot',
    targets: '<tfoot>',
    notes: 'Footer rows (requires showFooter).',
  },
  {
    key: 'header',
    targets: 'Header toolbar',
    notes: 'The toolbar above the table.',
  },
  { key: 'row', targets: '<tr> (body)', notes: 'Applies to every data row.' },
  {
    key: 'rowExpanded',
    targets: 'Expanded <tr>',
    notes: 'Row in expanded state (sub-component open).',
  },
  { key: 'cell', targets: '<td>', notes: 'Data cells.' },
  {
    key: 'pagination',
    targets: 'Pagination wrapper',
    notes: 'The pagination bar at the bottom.',
  },
  {
    key: 'container',
    targets: 'Root container',
    notes: 'Outermost root element.',
  },
  {
    key: 'messageContainer',
    targets: 'State message wrapper',
    notes: 'Loading / error / empty state overlay.',
  },
];

const sxColumns = [
  { key: 'key', label: 'sx key' },
  { key: 'targets', label: 'Targets' },
  { key: 'notes', label: 'Notes' },
];

const codeBasicSx = `import { DataTable } from '@e-burgos/tucutable';
import type { IDataTableStyles } from '@e-burgos/tucutable';

const tableStyles: IDataTableStyles = {
  wrapper: { borderRadius: '12px', overflow: 'hidden' },
  tableContainer: { maxHeight: '500px' },
  row: { cursor: 'pointer' },
  rowExpanded: { backgroundColor: 'var(--color-table-row-expanded-bg)' },
  cell: { fontSize: '13px' },
  pagination: { borderTop: '1px solid var(--color-table-divider)' },
};

<DataTable
  tableId="styled-table"
  data={data}
  columns={columns}
  sx={tableStyles}
/>`;

const codeFixedHeight = `// Fixed height table with vertical scroll
<DataTable
  tableId="fixed-height"
  data={largeDataset}
  columns={columns}
  sx={{
    tableContainer: {
      maxHeight: '400px',
      overflowY: 'auto',
    },
  }}
  pagination={{ showPagination: true, pageSize: 50 }}
/>`;

const codeStickyHeader = `// Sticky header inside a fixed-height container
<DataTable
  tableId="sticky-header"
  data={data}
  columns={columns}
  sx={{
    tableContainer: { maxHeight: '500px', overflowY: 'auto' },
    thead: { position: 'sticky', top: 0, zIndex: 10 },
  }}
/>`;

const codeRows = `// Highlight rows and add click cursor
<DataTable
  tableId="interactive-rows"
  data={data}
  columns={columns}
  setCurrentRow={(row) => setSelected(row.original)}
  sx={{
    row: {
      cursor: 'pointer',
      transition: 'background-color 150ms ease',
    },
    rowExpanded: {
      backgroundColor: 'rgba(var(--color-brand), 0.05)',
    },
  }}
/>`;

function SxStylesSection() {
  return (
    <div className="space-y-8">
      <div>
        <Typography tag="h2" className="text-2xl font-bold mb-2">
          sx Prop — Custom Styles
        </Typography>
        <Typography tag="p" className="text-muted">
          The <code>sx</code> prop accepts an <code>IDataTableStyles</code>{' '}
          object that maps named slots to React <code>CSSProperties</code>.
          Target the wrapper, container, header, rows, cells, and pagination
          without overriding global Tailwind classes.
        </Typography>
      </div>

      {/* sx Keys */}
      <CardContainer>
        <CardTitle title="IDataTableStyles Keys">
          <div className="px-4 pb-4">
            <BasicTable
              columns={sxColumns.map((col) => ({
                ...col,
                render: (value: unknown, row: Record<string, unknown>) => {
                  if (col.key === 'key') {
                    return (
                      <code className="text-xs bg-muted/10 px-1 py-0.5 rounded">
                        {String(value)}
                      </code>
                    );
                  }
                  return (
                    <span className="text-sm">
                      {String(row[col.key] ?? value)}
                    </span>
                  );
                },
              }))}
              data={sxKeysData}
            />
          </div>
        </CardTitle>
      </CardContainer>

      {/* Basic */}
      <CardContainer>
        <CardTitle title="Basic sx Usage">
          <div className="px-4 pb-4 space-y-4">
            <Alert>
              <Typography tag="p" className="text-sm">
                Each <code>sx</code> key accepts a plain{' '}
                <code>React.CSSProperties</code> object — any valid inline style
                or CSS variable. Values take precedence over tucutable's default
                Tailwind classes.
              </Typography>
            </Alert>
            <CodeBlock language="tsx" code={codeBasicSx} />
          </div>
        </CardTitle>
      </CardContainer>

      {/* Fixed Height */}
      <CardContainer>
        <CardTitle title="Fixed Height & Scroll">
          <div className="px-4 pb-4 space-y-4">
            <Typography tag="p" className="text-sm text-muted">
              Constrain table height and enable vertical scrolling with{' '}
              <code>sx.tableContainer</code>.
            </Typography>
            <CodeBlock language="tsx" code={codeFixedHeight} />
          </div>
        </CardTitle>
      </CardContainer>

      {/* Sticky */}
      <CardContainer>
        <CardTitle title="Sticky Header">
          <div className="px-4 pb-4 space-y-4">
            <CodeBlock language="tsx" code={codeStickyHeader} />
          </div>
        </CardTitle>
      </CardContainer>

      {/* Row Click */}
      <CardContainer>
        <CardTitle title="Interactive Row Styles">
          <div className="px-4 pb-4 space-y-4">
            <Typography tag="p" className="text-sm text-muted">
              Use <code>sx.row</code> to signal clickability and{' '}
              <code>sx.rowExpanded</code> to style expanded rows.
            </Typography>
            <CodeBlock language="tsx" code={codeRows} />
          </div>
        </CardTitle>
      </CardContainer>
    </div>
  );
}

export default SxStylesSection;
