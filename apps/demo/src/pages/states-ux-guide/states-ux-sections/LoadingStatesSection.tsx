import {
  Typography,
  CardContainer,
  CardTitle,
  BasicTable,
  CodeBlock,
  Alert,
  Badge,
} from '@e-burgos/tucu-ui';

const statesData = [
  {
    prop: 'isLoading',
    type: 'boolean',
    behavior: 'Full-table loading overlay with spinner. No data shown.',
  },
  {
    prop: 'isError',
    type: 'boolean',
    behavior: 'Error state overlay. Uses stateMessage.errorData text.',
  },
  {
    prop: 'isFetching',
    type: 'boolean',
    behavior: 'Subtle loading indicator. Data remains visible while refreshing.',
  },
];

const statesColumns = [
  { key: 'prop', label: 'Prop' },
  { key: 'type', label: 'Type' },
  { key: 'behavior', label: 'Behavior' },
];

const codeLoading = `import { DataTable } from '@e-burgos/tucutable';
import { useQuery } from '@tanstack/react-query';

function UsersTable() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['users'],
    queryFn: fetchUsers,
  });

  return (
    <DataTable
      tableId="users-states"
      data={data ?? []}
      columns={columns}
      isLoading={isLoading}   // full overlay on initial load
      isError={isError}       // error overlay on failure
    />
  );
}`;

const codeFetching = `// isFetching — use for background refetches (data still visible)
function ProductsTable({ page }: { page: number }) {
  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['products', page],
    queryFn: () => fetchProducts(page),
    placeholderData: keepPreviousData,
  });

  return (
    <DataTable
      tableId="products"
      data={data?.items ?? []}
      columns={columns}
      isLoading={isLoading}    // true only on first load (no cache)
      isFetching={isFetching}  // true while any fetch is in progress
    />
  );
}

// Tip: when isFetching=true and isLoading=false, tucutable shows
// a slim progress bar without hiding the existing data.`;

const codeChain = `// Real-world pattern with React Query
const { data, isLoading, isFetching, isError, refetch } = useQuery({ /* ... */ });

// Priority:
// 1. isLoading → full spinner overlay
// 2. isError   → error overlay
// 3. isFetching (without isLoading) → slim fetch indicator
// 4. none      → data displayed normally

<DataTable
  tableId="smart-states"
  data={data?.rows ?? []}
  columns={columns}
  isLoading={isLoading}
  isFetching={isFetching}
  isError={isError}
/>`;

function LoadingStatesSection() {
  return (
    <div className="space-y-8">
      <div>
        <Typography tag="h2" className="text-2xl font-bold mb-2">
          Loading States
        </Typography>
        <Typography tag="p" className="text-muted">
          Tucutable has three state flags: <code>isLoading</code> for initial
          loads, <code>isError</code> for fetch failures, and{' '}
          <code>isFetching</code> for background refetches. Use them together
          for a polished data fetching experience.
        </Typography>
      </div>

      {/* Props Comparison */}
      <CardContainer>
        <CardTitle title="State Props">
          <div className="px-4 pb-4">
            <BasicTable
              columns={statesColumns.map((col) => ({
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
                      {String(row['behavior'] ?? value)}
                    </span>
                  );
                },
              }))}
              data={statesData}
            />
          </div>
        </CardTitle>
      </CardContainer>

      {/* isLoading + isError */}
      <CardContainer>
        <CardTitle title="isLoading & isError">
          <div className="px-4 pb-4 space-y-4">
            <Alert>
              <Typography tag="p" className="text-sm">
                When <code>isLoading</code> is true, pass an empty array to{' '}
                <code>data</code> (e.g. <code>data ?? []</code>) to avoid
                rendering stale rows under the loading overlay.
              </Typography>
            </Alert>
            <CodeBlock language="tsx" code={codeLoading} />
          </div>
        </CardTitle>
      </CardContainer>

      {/* isFetching */}
      <CardContainer>
        <CardTitle title="isFetching — Background Refetch">
          <div className="px-4 pb-4 space-y-4">
            <Typography tag="p" className="text-sm text-muted">
              <code>isFetching</code> is perfect for pagination or
              background refreshes where you want to keep existing data
              visible while loading new data. Combine with React Query's{' '}
              <code>keepPreviousData</code>.
            </Typography>
            <CodeBlock language="tsx" code={codeFetching} />
          </div>
        </CardTitle>
      </CardContainer>

      {/* Priority */}
      <CardContainer>
        <CardTitle title="State Priority & React Query Pattern">
          <div className="px-4 pb-4 space-y-4">
            <Typography tag="p" className="text-sm text-muted">
              Tucutable evaluates states in this order: loading → error →
              fetching → normal. Use all three together for the smoothest UX.
            </Typography>
            <CodeBlock language="tsx" code={codeChain} />
          </div>
        </CardTitle>
      </CardContainer>
    </div>
  );
}

export default LoadingStatesSection;
