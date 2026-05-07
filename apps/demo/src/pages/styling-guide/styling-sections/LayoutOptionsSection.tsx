import {
  Typography,
  CardContainer,
  CardTitle,
  CodeBlock,
  Alert,
} from '@e-burgos/tucu-ui';

const codeLayoutCombo = `// Compact table with border and title
<DataTable
  tableId="compact-card"
  data={data}
  columns={columns}
  title="Recent Transactions"
  border={true}
  smallAnatomy={true}
  pagination={{ showPagination: true, pageSize: 20 }}
  sx={{
    wrapper: { borderRadius: '12px', overflow: 'hidden' },
    tableContainer: { maxHeight: '400px' },
  }}
/>`;

const codeNoBorder = `// Borderless table (blends into the page background)
<DataTable
  tableId="borderless"
  data={data}
  columns={columns}
  border={false}
  sx={{
    wrapper: { boxShadow: 'none' },
  }}
/>`;

const codeFullPage = `// Full-page table that fills available height
<div style={{ height: 'calc(100vh - 120px)' }}>
  <DataTable
    tableId="full-page"
    data={data}
    columns={columns}
    sx={{
      wrapper: { height: '100%' },
      wrapperContainer: { height: '100%', display: 'flex', flexDirection: 'column' },
      tableContainer: { flex: 1, overflow: 'auto' },
    }}
    pagination={{ showPagination: true }}
  />
</div>`;

const codeSidePanel = `// Compact side panel table
<aside style={{ width: 320 }}>
  <DataTable
    tableId="side-panel"
    data={recentItems}
    columns={[
      { accessorKey: 'name', header: 'Name' },
      { accessorKey: 'value', header: 'Value', size: 80 },
    ]}
    smallAnatomy={true}
    showHeader={true}
    showFooter={false}
    pagination={{ showPagination: false }}
    sx={{
      tableContainer: { maxHeight: '300px' },
      cell: { fontSize: '12px', padding: '4px 8px' },
    }}
  />
</aside>`;

function LayoutOptionsSection() {
  return (
    <div className="space-y-8">
      <div>
        <Typography tag="h2" className="text-2xl font-bold mb-2">
          Layout Options
        </Typography>
        <Typography tag="p" className="text-muted">
          Combine <code>border</code>, <code>smallAnatomy</code>,{' '}
          <code>title</code>, and <code>sx</code> to fit the table into any
          layout context — full-page dashboards, compact cards, sidebars, or
          embedded panels.
        </Typography>
      </div>

      {/* Compact Card */}
      <CardContainer>
        <CardTitle title="Compact Card Layout">
          <div className="px-4 pb-4 space-y-4">
            <Typography tag="p" className="text-sm text-muted">
              Combine <code>smallAnatomy</code>, <code>border</code>, and a
              fixed <code>maxHeight</code> for a compact card-style table.
            </Typography>
            <CodeBlock language="tsx" code={codeLayoutCombo} />
          </div>
        </CardTitle>
      </CardContainer>

      {/* Borderless */}
      <CardContainer>
        <CardTitle title="Borderless / Inline Table">
          <div className="px-4 pb-4 space-y-4">
            <Typography tag="p" className="text-sm text-muted">
              Remove all borders for a seamless integration into page
              backgrounds or inside existing card containers.
            </Typography>
            <CodeBlock language="tsx" code={codeNoBorder} />
          </div>
        </CardTitle>
      </CardContainer>

      {/* Full Page */}
      <CardContainer>
        <CardTitle title="Full-Page Table">
          <div className="px-4 pb-4 space-y-4">
            <Alert>
              <Typography tag="p" className="text-sm">
                For full-page layout, set the wrapper height via{' '}
                <code>sx.wrapperContainer</code> with{' '}
                <code>display: flex; flex-direction: column</code> and{' '}
                <code>sx.tableContainer</code> with <code>flex: 1</code> to let
                it fill remaining space.
              </Typography>
            </Alert>
            <CodeBlock language="tsx" code={codeFullPage} />
          </div>
        </CardTitle>
      </CardContainer>

      {/* Side Panel */}
      <CardContainer>
        <CardTitle title="Side Panel / Compact Widget">
          <div className="px-4 pb-4 space-y-4">
            <Typography tag="p" className="text-sm text-muted">
              Minimalist table configuration for sidebar widgets or embedded
              data panels with constrained dimensions.
            </Typography>
            <CodeBlock language="tsx" code={codeSidePanel} />
          </div>
        </CardTitle>
      </CardContainer>
    </div>
  );
}

export default LayoutOptionsSection;
