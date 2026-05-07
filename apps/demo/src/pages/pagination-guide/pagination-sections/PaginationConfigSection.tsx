import {
  Typography,
  CardContainer,
  CardTitle,
  BasicTable,
  CodeBlock,
  Alert,
  Badge,
  LucideIcons,
} from '@e-burgos/tucu-ui';

const paginationProps = [
  {
    prop: 'showPagination',
    type: 'boolean',
    default: 'false',
    description: 'Enable the pagination UI. Set false to show all rows.',
  },
  {
    prop: 'pageSize',
    type: 'number',
    default: '10',
    description:
      'Initial rows per page. User can change it via the selector (unless hideRecordsSelector).',
  },
  {
    prop: 'pageIndex',
    type: 'number',
    default: '0',
    description: 'Initial page index (0-based). Used only on first render.',
  },
  {
    prop: 'rowsInfo',
    type: 'boolean',
    default: 'false',
    description:
      'Show "Showing X–Y of Z rows" label alongside pagination controls.',
  },
  {
    prop: 'hideRecordsSelector',
    type: 'boolean',
    default: 'false',
    description: 'Hide the page-size dropdown. Useful for fixed page sizes.',
  },
  {
    prop: 'serverPagination',
    type: 'IServerPagination',
    default: '—',
    description:
      'Enable server-side mode. Pass totalCount + pagination state + setPagination.',
  },
  {
    prop: 'manualPagination',
    type: 'IManualPaginationOptions',
    default: '—',
    description:
      'Enable manual mode. Pass rowCount + your pre-sliced data + setPagination.',
  },
];

const serverPaginationProps = [
  {
    prop: 'totalCount',
    type: 'number',
    description:
      'Total number of rows on the server. Used to calculate the page count.',
  },
  {
    prop: 'pagination',
    type: 'TanstackTable.PaginationState',
    description:
      'Current { pageIndex, pageSize } state managed by your useState.',
  },
  {
    prop: 'setPagination',
    type: 'Dispatch<SetStateAction<PaginationState>>',
    description:
      'State setter. Called when the user changes page or page size.',
  },
];

const manualPaginationProps = [
  {
    prop: 'enabled',
    type: 'boolean',
    description: 'Must be true to activate manual mode.',
  },
  {
    prop: 'rowCount',
    type: 'number',
    description: 'Total rows available. Used to compute page count.',
  },
  {
    prop: 'pagination',
    type: 'TanstackTable.PaginationState',
    description: 'Current { pageIndex, pageSize } state.',
  },
  {
    prop: 'setPagination',
    type: 'Dispatch<SetStateAction<PaginationState>>',
    description: 'State setter. Called when page/size changes.',
  },
];

const propsColumns = [
  { key: 'prop', label: 'Prop' },
  { key: 'type', label: 'Type' },
  { key: 'default', label: 'Default' },
  { key: 'description', label: 'Description' },
];

const nestedColumns = [
  { key: 'prop', label: 'Prop' },
  { key: 'type', label: 'Type' },
  { key: 'description', label: 'Description' },
];

const codeCheatSheet = `// CLIENT — zero state, automatic slicing
<DataTable
  tableId="client"
  data={allData}
  columns={columns}
  pagination={{ showPagination: true, pageSize: 10, rowsInfo: true }}
/>

// SERVER — you own pagination state, backend provides page
<DataTable
  tableId="server"
  data={apiPage}
  columns={columns}
  pagination={{
    showPagination: true,
    rowsInfo: true,
    serverPagination: { totalCount: 2000, pagination, setPagination },
  }}
/>

// MANUAL — you slice, you control rowCount
<DataTable
  tableId="manual"
  data={pageData}      // your slice: allData.slice(page * size, (page+1) * size)
  columns={columns}
  pagination={{
    showPagination: true,
    rowsInfo: true,
    manualPagination: { enabled: true, rowCount: 2000, pagination, setPagination },
  }}
/>`;

export default function PaginationConfigSection() {
  return (
    <>
      {/* Header */}
      <div className="text-center space-y-3 pb-4">
        <Typography tag="h2" className="text-2xl sm:text-3xl font-bold">
          Config Reference
        </Typography>
        <Typography tag="p" className="text-muted max-w-2xl mx-auto">
          Complete props reference for{' '}
          <code className="text-xs bg-muted/30 px-1 py-0.5 rounded">
            IPaginationOptions
          </code>
          ,{' '}
          <code className="text-xs bg-muted/30 px-1 py-0.5 rounded">
            IServerPagination
          </code>
          , and{' '}
          <code className="text-xs bg-muted/30 px-1 py-0.5 rounded">
            IManualPaginationOptions
          </code>
          .
        </Typography>
      </div>

      {/* IPaginationOptions */}
      <CardContainer className="overflow-hidden">
        <CardTitle title="IPaginationOptions">
          <div className="px-4 pb-4">
            <BasicTable
              columns={propsColumns.map((col) => ({
                ...col,
                render: (value: unknown, row: Record<string, unknown>) => {
                  if (col.key === 'prop')
                    return (
                      <code className="text-xs font-mono text-brand font-semibold">
                        {String(value ?? '')}
                      </code>
                    );
                  if (col.key === 'type')
                    return (
                      <code className="text-xs font-mono text-muted">
                        {String(value ?? '')}
                      </code>
                    );
                  if (col.key === 'default')
                    return (
                      <code className="text-xs font-mono text-green-600">
                        {String(value ?? '')}
                      </code>
                    );
                  return (
                    <span className="text-sm">{row.description as string}</span>
                  );
                },
              }))}
              data={paginationProps}
            />
          </div>
        </CardTitle>
      </CardContainer>

      {/* IServerPagination */}
      <CardContainer className="overflow-hidden">
        <div className="p-4 bg-linear-to-br from-purple-500/20 to-purple-600/10">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-background/80 flex items-center justify-center shrink-0">
              <LucideIcons.Server className="w-5 h-5 text-purple-500" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <Typography tag="h3" className="text-sm font-semibold">
                  IServerPagination
                </Typography>
                <Badge
                  size="small"
                  shape="pill"
                  className="bg-purple-100 text-purple-700"
                >
                  pagination.serverPagination
                </Badge>
              </div>
              <Typography tag="p" className="text-xs text-muted">
                Nested object inside{' '}
                <code className="font-mono text-xs">
                  pagination.serverPagination
                </code>
                .
              </Typography>
            </div>
          </div>
        </div>
        <CardTitle title="IServerPagination Props">
          <div className="px-4 pb-4">
            <BasicTable
              columns={nestedColumns.map((col) => ({
                ...col,
                render: (value: unknown, row: Record<string, unknown>) => {
                  if (col.key === 'prop')
                    return (
                      <code className="text-xs font-mono text-brand font-semibold">
                        {String(value ?? '')}
                      </code>
                    );
                  if (col.key === 'type')
                    return (
                      <code className="text-xs font-mono text-muted">
                        {String(value ?? '')}
                      </code>
                    );
                  return (
                    <span className="text-sm">{row.description as string}</span>
                  );
                },
              }))}
              data={serverPaginationProps}
            />
          </div>
        </CardTitle>
      </CardContainer>

      {/* IManualPaginationOptions */}
      <CardContainer className="overflow-hidden">
        <div className="p-4 bg-linear-to-br from-green-500/20 to-green-600/10">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-background/80 flex items-center justify-center shrink-0">
              <LucideIcons.HandMetal className="w-5 h-5 text-green-500" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <Typography tag="h3" className="text-sm font-semibold">
                  IManualPaginationOptions
                </Typography>
                <Badge
                  size="small"
                  shape="pill"
                  className="bg-green-100 text-green-700"
                >
                  pagination.manualPagination
                </Badge>
              </div>
              <Typography tag="p" className="text-xs text-muted">
                Nested object inside{' '}
                <code className="font-mono text-xs">
                  pagination.manualPagination
                </code>
                .
              </Typography>
            </div>
          </div>
        </div>
        <CardTitle title="IManualPaginationOptions Props">
          <div className="px-4 pb-4">
            <BasicTable
              columns={nestedColumns.map((col) => ({
                ...col,
                render: (value: unknown, row: Record<string, unknown>) => {
                  if (col.key === 'prop')
                    return (
                      <code className="text-xs font-mono text-brand font-semibold">
                        {String(value ?? '')}
                      </code>
                    );
                  if (col.key === 'type')
                    return (
                      <code className="text-xs font-mono text-muted">
                        {String(value ?? '')}
                      </code>
                    );
                  return (
                    <span className="text-sm">{row.description as string}</span>
                  );
                },
              }))}
              data={manualPaginationProps}
            />
          </div>
        </CardTitle>
      </CardContainer>

      {/* Cheat sheet */}
      <CardContainer className="overflow-hidden">
        <div className="p-4 bg-linear-to-br from-slate-500/20 to-slate-600/10">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-background/80 flex items-center justify-center shrink-0">
              <LucideIcons.BookOpen className="w-5 h-5 text-slate-500" />
            </div>
            <div>
              <Typography tag="h3" className="text-sm font-semibold">
                Quick Cheat Sheet
              </Typography>
              <Typography tag="p" className="text-xs text-muted">
                All three modes side-by-side for quick reference.
              </Typography>
            </div>
          </div>
        </div>
        <CardTitle title="All Modes at a Glance">
          <div className="px-4 pb-4">
            <CodeBlock language="tsx" code={codeCheatSheet} />
          </div>
        </CardTitle>
      </CardContainer>

      <Alert className="border-brand/30 bg-brand/5">
        <Typography tag="p" className="text-sm">
          <strong>Tip:</strong> Only one pagination mode can be active at a
          time. If you pass both
          <code className="font-mono text-xs bg-muted/20 px-1 mx-1 rounded">
            serverPagination
          </code>
          and
          <code className="font-mono text-xs bg-muted/20 px-1 mx-1 rounded">
            manualPagination
          </code>
          ,
          <code className="font-mono text-xs bg-muted/20 px-1 mx-1 rounded">
            serverPagination
          </code>
          takes precedence.
        </Typography>
      </Alert>
    </>
  );
}
