import {
  Typography,
  CardContainer,
  CardTitle,
  CodeBlock,
  Alert,
  Badge,
  LucideIcons,
} from '@e-burgos/tucu-ui';

const codeServerBasic = `import { useState } from 'react';
import { DataTable, TanstackTable } from '@e-burgos/tucutable';
import { useQuery } from '@tanstack/react-query';

export function ServerPaginatedTable() {
  const [pagination, setPagination] =
    useState<TanstackTable.PaginationState>({
      pageIndex: 0,
      pageSize: 10,
    });

  // Re-fetches automatically when pagination changes
  const { data, isFetching } = useQuery({
    queryKey: ['users', pagination.pageIndex, pagination.pageSize],
    queryFn: () =>
      fetch(
        \`/api/users?page=\${pagination.pageIndex}&limit=\${pagination.pageSize}\`
      ).then((r) => r.json()),
  });

  return (
    <DataTable
      tableId="users-server"
      data={data?.rows ?? []}
      columns={columns}
      isFetching={isFetching}
      pagination={{
        showPagination: true,
        rowsInfo: true,
        serverPagination: {
          totalCount: data?.total ?? 0,  // total rows on server
          pagination,                    // current pageIndex + pageSize
          setPagination,                 // called on page/size change
        },
      }}
    />
  );
}`;

const codeServerSwapi = `// Real example — paginating the Star Wars API
import { useState } from 'react';
import { DataTable, TanstackTable } from '@e-burgos/tucutable';

export function StarWarsTable() {
  const [pagination, setPagination] =
    useState<TanstackTable.PaginationState>({ pageIndex: 0, pageSize: 10 });

  const url = \`https://swapi.py4e.com/api/people/?page=\${pagination.pageIndex + 1}\`;
  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['swapi-people', pagination.pageIndex],
    queryFn: () => fetch(url).then((r) => r.json()),
    staleTime: 60_000,
  });

  return (
    <DataTable
      tableId="swapi-server"
      data={data?.results ?? []}
      columns={columns}
      isLoading={isLoading}
      isFetching={isFetching}
      pagination={{
        showPagination: true,
        rowsInfo: true,
        serverPagination: {
          totalCount: data?.count ?? 0,
          pagination,
          setPagination,
        },
      }}
    />
  );
}`;

const codeServerManualSort = `// Combine server pagination + server sorting
const [pagination, setPagination] =
  useState<TanstackTable.PaginationState>({ pageIndex: 0, pageSize: 10 });
const [sorting, setSorting] = useState<TanstackTable.SortingState>([]);

const { data } = useQuery({
  queryKey: ['users', pagination, sorting],
  queryFn: () => {
    const params = new URLSearchParams({
      page: String(pagination.pageIndex),
      limit: String(pagination.pageSize),
      sortBy: sorting[0]?.id ?? 'name',
      sortDir: sorting[0]?.desc ? 'desc' : 'asc',
    });
    return fetch(\`/api/users?\${params}\`).then((r) => r.json());
  },
});

<DataTable
  tableId="users-server-sort"
  data={data?.rows ?? []}
  columns={columns}
  manualSorting={true}
  onSortModelChange={setSorting}
  pagination={{
    showPagination: true,
    rowsInfo: true,
    serverPagination: {
      totalCount: data?.total ?? 0,
      pagination,
      setPagination,
    },
  }}
/>`;

const steps = [
  {
    n: '1',
    label: 'Create pagination state',
    text: 'Use useState with TanstackTable.PaginationState for type safety. Start at pageIndex: 0.',
    color: 'bg-blue-500',
  },
  {
    n: '2',
    label: 'Fetch using pagination state',
    text: 'Include pageIndex and pageSize in your query key so the fetch re-runs on every page change.',
    color: 'bg-purple-500',
  },
  {
    n: '3',
    label: 'Pass totalCount',
    text: 'serverPagination.totalCount is the total number of rows on the server — used to calculate page count.',
    color: 'bg-green-500',
  },
  {
    n: '4',
    label: 'Pass setPagination',
    text: 'tucutable calls setPagination when the user changes page or page size, triggering a re-fetch.',
    color: 'bg-orange-500',
  },
];

export default function ServerPaginationSection() {
  return (
    <>
      {/* Header */}
      <div className="text-center space-y-3 pb-4">
        <Typography tag="h2" className="text-2xl sm:text-3xl font-bold">
          Server-Side Pagination
        </Typography>
        <Typography tag="p" className="text-muted max-w-2xl mx-auto">
          Use{' '}
          <code className="text-xs bg-muted/30 px-1 py-0.5 rounded">
            serverPagination
          </code>{' '}
          when the data lives on a backend. You own the state — tucutable calls{' '}
          <code className="text-xs bg-muted/30 px-1 py-0.5 rounded">
            setPagination
          </code>{' '}
          and your fetch re-runs automatically.
        </Typography>
      </div>

      {/* How it works steps */}
      <CardContainer className="overflow-hidden">
        <CardTitle title="How It Works">
          <div className="px-4 pb-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {steps.map((s) => (
                <div
                  key={s.n}
                  className="flex items-start gap-3 p-3 rounded-xl bg-muted/5 border"
                >
                  <div
                    className={`w-7 h-7 rounded-full ${s.color} flex items-center justify-center shrink-0`}
                  >
                    <span className="text-xs font-bold text-white">{s.n}</span>
                  </div>
                  <div>
                    <Typography tag="h4" className="text-sm font-semibold">
                      {s.label}
                    </Typography>
                    <Typography tag="p" className="text-xs text-muted mt-0.5">
                      {s.text}
                    </Typography>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardTitle>
      </CardContainer>

      {/* Basic example */}
      <CardContainer className="overflow-hidden">
        <div className="p-4 bg-linear-to-br from-blue-500/20 to-blue-600/10">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-background/80 flex items-center justify-center shrink-0">
              <LucideIcons.Server className="w-5 h-5 text-blue-500" />
            </div>
            <div>
              <Typography tag="h3" className="text-sm font-semibold">
                Basic Server Pagination with React Query
              </Typography>
              <Typography tag="p" className="text-xs text-muted">
                The pagination state drives both the fetch and the table
                simultaneously.
              </Typography>
            </div>
          </div>
        </div>
        <CardTitle title="Implementation">
          <div className="px-4 pb-4">
            <CodeBlock language="tsx" code={codeServerBasic} />
          </div>
        </CardTitle>
      </CardContainer>

      {/* Real-world SWAPI example */}
      <CardContainer className="overflow-hidden">
        <div className="p-4 bg-linear-to-br from-purple-500/20 to-purple-600/10">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-background/80 flex items-center justify-center shrink-0">
              <LucideIcons.Globe className="w-5 h-5 text-purple-500" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <Typography tag="h3" className="text-sm font-semibold">
                  Real Example — Star Wars API
                </Typography>
                <Badge
                  size="small"
                  shape="pill"
                  className="bg-violet-500/15 text-violet-600 dark:text-violet-400"
                >
                  swapi.dev
                </Badge>
              </div>
              <Typography tag="p" className="text-xs text-muted">
                This demo app uses swapi.dev as a live server — see Basic Usage
                for the full working implementation.
              </Typography>
            </div>
          </div>
        </div>
        <CardTitle title="SWAPI Pagination Example">
          <div className="px-4 pb-4">
            <CodeBlock language="tsx" code={codeServerSwapi} />
          </div>
        </CardTitle>
      </CardContainer>

      {/* Server pagination + sorting */}
      <CardContainer className="overflow-hidden">
        <div className="p-4 bg-linear-to-br from-green-500/20 to-green-600/10">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-background/80 flex items-center justify-center shrink-0">
              <LucideIcons.ArrowUpDown className="w-5 h-5 text-green-500" />
            </div>
            <div>
              <Typography tag="h3" className="text-sm font-semibold">
                Combined: Server Pagination + Server Sorting
              </Typography>
              <Typography tag="p" className="text-xs text-muted">
                Use{' '}
                <code className="font-mono text-xs">
                  manualSorting + onSortModelChange
                </code>{' '}
                alongside serverPagination.
              </Typography>
            </div>
          </div>
        </div>
        <CardTitle title="Server Pagination with Sorting">
          <div className="px-4 pb-4">
            <CodeBlock language="tsx" code={codeServerManualSort} />
          </div>
        </CardTitle>
      </CardContainer>

      <Alert className="border-brand/30 bg-brand/5">
        <Typography tag="p" className="text-sm">
          <strong>isFetching vs isLoading:</strong> Use{' '}
          <code className="font-mono text-xs bg-muted/20 px-1 rounded">
            isLoading
          </code>{' '}
          for the initial load (shows full loading skeleton) and{' '}
          <code className="font-mono text-xs bg-muted/20 px-1 rounded">
            isFetching
          </code>{' '}
          for background re-fetches (shows a subtle indicator without replacing
          the table).
        </Typography>
      </Alert>
    </>
  );
}
