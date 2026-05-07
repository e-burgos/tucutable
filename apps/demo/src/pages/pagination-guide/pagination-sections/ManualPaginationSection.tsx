import {
  Typography,
  CardContainer,
  CardTitle,
  CodeBlock,
  Alert,
  LucideIcons,
} from '@e-burgos/tucu-ui';

const codeManualBasic = `import { useState } from 'react';
import { DataTable, TanstackTable } from '@e-burgos/tucutable';

// Manual pagination gives you full control over what slice of data
// the table shows. Unlike serverPagination, there is no totalCount —
// you control rowCount directly.

export function ManualTable({ allData }: { allData: User[] }) {
  const [pagination, setPagination] =
    useState<TanstackTable.PaginationState>({
      pageIndex: 0,
      pageSize: 5,
    });

  // Slice data yourself — table displays only this slice
  const { pageIndex, pageSize } = pagination;
  const start = pageIndex * pageSize;
  const pageData = allData.slice(start, start + pageSize);

  return (
    <DataTable
      tableId="users-manual"
      data={pageData}              // only the current page slice
      columns={columns}
      pagination={{
        showPagination: true,
        rowsInfo: true,
        manualPagination: {
          enabled: true,
          rowCount: allData.length, // total rows — used for page count
          pagination,               // current state
          setPagination,            // called on page/size change
        },
      }}
    />
  );
}`;

const codeManualAsync = `// Manual pagination with async data slice loading
export function AsyncManualTable() {
  const [pagination, setPagination] =
    useState<TanstackTable.PaginationState>({ pageIndex: 0, pageSize: 10 });
  const [pageData, setPageData] = useState<User[]>([]);
  const [totalRows, setTotalRows] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    fetchPage(pagination.pageIndex, pagination.pageSize)
      .then(({ rows, total }) => {
        setPageData(rows);
        setTotalRows(total);
      })
      .finally(() => setIsLoading(false));
  }, [pagination.pageIndex, pagination.pageSize]);

  return (
    <DataTable
      tableId="users-manual-async"
      data={pageData}
      columns={columns}
      isLoading={isLoading}
      pagination={{
        showPagination: true,
        rowsInfo: true,
        manualPagination: {
          enabled: true,
          rowCount: totalRows,
          pagination,
          setPagination,
        },
      }}
    />
  );
}`;

const codeManualDisabled = `// Disable pagination entirely — show all rows
<DataTable
  tableId="all-rows-table"
  data={smallDataset}
  columns={columns}
  pagination={{
    showPagination: false,
  }}
/>`;

const diffTable = [
  {
    aspect: 'Who slices the data',
    client: 'tucutable (automatic)',
    server: 'Backend API',
    manual: 'You (in useEffect or memo)',
  },
  {
    aspect: 'Data passed to DataTable',
    client: 'Full array',
    server: 'API response page',
    manual: 'Pre-sliced page array',
  },
  {
    aspect: 'Total count source',
    client: 'data.length',
    server: 'serverPagination.totalCount',
    manual: 'manualPagination.rowCount',
  },
  {
    aspect: 'State required',
    client: 'None',
    server: 'useState PaginationState',
    manual: 'useState PaginationState',
  },
  {
    aspect: 'Best use case',
    client: '< 5,000 rows in memory',
    server: 'REST / GraphQL backends',
    manual: 'Custom data sources, virtualisation',
  },
];

export default function ManualPaginationSection() {
  return (
    <>
      {/* Header */}
      <div className="text-center space-y-3 pb-4">
        <Typography tag="h2" className="text-2xl sm:text-3xl font-bold">
          Manual Pagination
        </Typography>
        <Typography tag="p" className="text-muted max-w-2xl mx-auto">
          Full control mode — you slice the data array, you decide{' '}
          <code className="text-xs bg-muted/30 px-1 py-0.5 rounded">
            rowCount
          </code>
          . tucutable only renders navigation controls and calls{' '}
          <code className="text-xs bg-muted/30 px-1 py-0.5 rounded">
            setPagination
          </code>{' '}
          when the user navigates.
        </Typography>
      </div>

      {/* Comparison table */}
      <CardContainer className="overflow-hidden">
        <CardTitle title="When to Use Each Mode">
          <div className="px-4 pb-4 overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2 pr-4 font-semibold text-muted text-xs uppercase tracking-wide">
                    Aspect
                  </th>
                  <th className="text-left py-2 pr-4 font-semibold text-info text-xs uppercase tracking-wide">
                    Client
                  </th>
                  <th className="text-left py-2 pr-4 font-semibold text-violet-600 dark:text-violet-400 text-xs uppercase tracking-wide">
                    Server
                  </th>
                  <th className="text-left py-2 font-semibold text-success text-xs uppercase tracking-wide">
                    Manual
                  </th>
                </tr>
              </thead>
              <tbody>
                {diffTable.map((row, i) => (
                  <tr
                    key={i}
                    className="border-b border-muted/20 last:border-0"
                  >
                    <td className="py-2 pr-4 font-medium text-xs">
                      {row.aspect}
                    </td>
                    <td className="py-2 pr-4 text-xs text-muted">
                      {row.client}
                    </td>
                    <td className="py-2 pr-4 text-xs text-muted">
                      {row.server}
                    </td>
                    <td className="py-2 text-xs text-muted">{row.manual}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardTitle>
      </CardContainer>

      {/* Basic manual example */}
      <CardContainer className="overflow-hidden">
        <div className="p-4 bg-linear-to-br from-green-500/20 to-green-600/10">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-background/80 flex items-center justify-center shrink-0">
              <LucideIcons.HandMetal className="w-5 h-5 text-green-500" />
            </div>
            <div>
              <Typography tag="h3" className="text-sm font-semibold">
                Manual Pagination with In-Memory Slice
              </Typography>
              <Typography tag="p" className="text-xs text-muted">
                You slice the data, pass the slice + rowCount. tucutable handles
                the UI.
              </Typography>
            </div>
          </div>
        </div>
        <CardTitle title="Basic Manual Example">
          <div className="px-4 pb-4">
            <CodeBlock language="tsx" code={codeManualBasic} />
          </div>
        </CardTitle>
      </CardContainer>

      {/* Async manual example */}
      <CardContainer className="overflow-hidden">
        <div className="p-4 bg-linear-to-br from-blue-500/20 to-blue-600/10">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-background/80 flex items-center justify-center shrink-0">
              <LucideIcons.Loader className="w-5 h-5 text-blue-500" />
            </div>
            <div>
              <Typography tag="h3" className="text-sm font-semibold">
                Manual Pagination with Async Fetching
              </Typography>
              <Typography tag="p" className="text-xs text-muted">
                Using useEffect to load each page slice from a custom source.
              </Typography>
            </div>
          </div>
        </div>
        <CardTitle title="Async Manual Example">
          <div className="px-4 pb-4">
            <CodeBlock language="tsx" code={codeManualAsync} />
          </div>
        </CardTitle>
      </CardContainer>

      {/* Disable pagination */}
      <CardContainer className="overflow-hidden">
        <div className="p-4 bg-linear-to-br from-slate-500/20 to-slate-600/10">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-background/80 flex items-center justify-center shrink-0">
              <LucideIcons.Ban className="w-5 h-5 text-slate-500" />
            </div>
            <div>
              <Typography tag="h3" className="text-sm font-semibold">
                Disabling Pagination
              </Typography>
              <Typography tag="p" className="text-xs text-muted">
                Set{' '}
                <code className="font-mono text-xs">showPagination: false</code>{' '}
                or omit the prop entirely.
              </Typography>
            </div>
          </div>
        </div>
        <CardTitle title="No Pagination">
          <div className="px-4 pb-4">
            <CodeBlock language="tsx" code={codeManualDisabled} />
          </div>
        </CardTitle>
      </CardContainer>

      <Alert className="border-brand/30 bg-brand/5">
        <Typography tag="p" className="text-sm">
          <strong>Key difference from serverPagination:</strong> In{' '}
          <code className="font-mono text-xs bg-muted/20 px-1 rounded">
            serverPagination
          </code>
          , you pass the full API-fetched page directly. In{' '}
          <code className="font-mono text-xs bg-muted/20 px-1 rounded">
            manualPagination
          </code>
          , you also slice and manage the display data yourself. Use manual when
          you need custom data sources that don&apos;t map directly to a REST
          endpoint.
        </Typography>
      </Alert>
    </>
  );
}
