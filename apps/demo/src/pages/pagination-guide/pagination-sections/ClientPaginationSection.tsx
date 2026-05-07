import {
  Typography,
  CardContainer,
  CardTitle,
  CodeBlock,
  Alert,
  Badge,
  LucideIcons,
} from '@e-burgos/tucu-ui';

const codeMinimal = `import { DataTable, TanstackTable } from '@e-burgos/tucutable';

type User = { id: number; name: string; email: string; role: string };

const columns: TanstackTable.ColumnDef<User>[] = [
  { accessorKey: 'id',    header: 'ID',    size: 60  },
  { accessorKey: 'name',  header: 'Name'            },
  { accessorKey: 'email', header: 'Email'           },
  { accessorKey: 'role',  header: 'Role',  size: 120 },
];

export function UsersTable({ data }: { data: User[] }) {
  return (
    <DataTable
      tableId="users-client"
      data={data}
      columns={columns}
      pagination={{
        showPagination: true,
        pageSize: 10,
      }}
    />
  );
}`;

const codeFull = `<DataTable
  tableId="users-client-full"
  data={data}
  columns={columns}
  pagination={{
    showPagination: true,
    pageSize: 20,           // rows per page (also settable via dropdown)
    pageIndex: 0,           // initial page (0-based)
    rowsInfo: true,         // show "Showing X–Y of Z" label
    hideRecordsSelector: false, // show page-size dropdown
  }}
/>`;

const codeNoSelector = `// Hide the page-size selector but keep navigation
<DataTable
  tableId="users-minimal-pagination"
  data={data}
  columns={columns}
  pagination={{
    showPagination: true,
    pageSize: 5,
    rowsInfo: true,
    hideRecordsSelector: true,  // hides the rows-per-page dropdown
  }}
/>`;

const features = [
  {
    icon: <LucideIcons.Zap className="w-5 h-5 text-blue-500" />,
    title: 'Zero configuration',
    color: 'from-blue-500/20 to-blue-600/10',
    description:
      'Set showPagination: true and pageSize — tucutable does the rest. No state management required.',
  },
  {
    icon: <LucideIcons.RefreshCcw className="w-5 h-5 text-green-500" />,
    title: 'Persisted page size',
    color: 'from-green-500/20 to-green-600/10',
    description:
      "The user's selected page size is saved to localStorage under tableId and restored on next render.",
  },
  {
    icon: <LucideIcons.SlidersHorizontal className="w-5 h-5 text-purple-500" />,
    title: 'Page-size selector',
    color: 'from-purple-500/20 to-purple-600/10',
    description:
      'A dropdown lets users switch between preset page sizes (5, 10, 20, 50, 100). Hide it with hideRecordsSelector.',
  },
  {
    icon: <LucideIcons.Info className="w-5 h-5 text-orange-500" />,
    title: 'Row count badge',
    color: 'from-orange-500/20 to-orange-600/10',
    description:
      'rowsInfo: true renders "Showing 1–10 of 230" alongside the pagination controls.',
  },
];

export default function ClientPaginationSection() {
  return (
    <>
      {/* Header */}
      <div className="text-center space-y-3 pb-4">
        <Typography tag="h2" className="text-2xl sm:text-3xl font-bold">
          Client-Side Pagination
        </Typography>
        <Typography tag="p" className="text-muted max-w-2xl mx-auto">
          The default pagination mode — tucutable slices the data array
          automatically. No external state, no fetch callbacks. Just pass{' '}
          <code className="text-xs bg-muted/30 px-1 py-0.5 rounded">
            showPagination: true
          </code>{' '}
          and you&apos;re done.
        </Typography>
      </div>

      {/* Feature grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {features.map((f) => (
          <CardContainer
            key={f.title}
            className={`overflow-hidden bg-linear-to-br ${f.color} border border-transparent hover:border-border transition-colors`}
          >
            <div className="p-5 flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-background/80 flex items-center justify-center shrink-0">
                {f.icon}
              </div>
              <div>
                <Typography tag="h3" className="text-sm font-semibold mb-1">
                  {f.title}
                </Typography>
                <Typography tag="p" className="text-xs text-muted">
                  {f.description}
                </Typography>
              </div>
            </div>
          </CardContainer>
        ))}
      </div>

      {/* Minimal example */}
      <CardContainer className="overflow-hidden">
        <CardTitle title="Minimal Setup">
          <div className="px-4 pb-4">
            <Alert className="border-brand/30 bg-brand/5 mb-4">
              <Typography tag="p" className="text-sm">
                Client-side pagination works with any in-memory data array. No
                async logic needed.
              </Typography>
            </Alert>
            <CodeBlock language="tsx" code={codeMinimal} />
          </div>
        </CardTitle>
      </CardContainer>

      {/* Full options */}
      <CardContainer className="overflow-hidden">
        <CardTitle title="All Client Pagination Options">
          <div className="px-4 pb-4 space-y-4">
            <CodeBlock language="tsx" code={codeFull} />
          </div>
        </CardTitle>
      </CardContainer>

      {/* Hide selector */}
      <CardContainer className="overflow-hidden">
        <div className="p-4 bg-linear-to-br from-slate-500/20 to-slate-600/10">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-background/80 flex items-center justify-center shrink-0">
              <LucideIcons.EyeOff className="w-5 h-5 text-slate-500" />
            </div>
            <div>
              <Typography tag="h3" className="text-sm font-semibold">
                Hiding the page-size selector
              </Typography>
              <Typography tag="p" className="text-xs text-muted">
                Use <code className="font-mono">hideRecordsSelector: true</code>{' '}
                for fixed page sizes.
              </Typography>
            </div>
          </div>
        </div>
        <CardTitle title="hideRecordsSelector Example">
          <div className="px-4 pb-4">
            <CodeBlock language="tsx" code={codeNoSelector} />
          </div>
        </CardTitle>
      </CardContainer>

      <Alert className="border-warning/30 bg-warning/5">
        <div className="flex items-start gap-2">
          <LucideIcons.AlertTriangle className="w-4 h-4 text-warning shrink-0 mt-0.5" />
          <Typography tag="p" className="text-sm text-warning">
            <strong>Large datasets:</strong> Client-side pagination loads all
            data into memory. For datasets over ~5,000 rows, switch to{' '}
            <Badge
              size="small"
              shape="pill"
              className="bg-warning/20 text-warning"
            >
              serverPagination
            </Badge>{' '}
            or{' '}
            <Badge
              size="small"
              shape="pill"
              className="bg-warning/20 text-warning"
            >
              manualPagination
            </Badge>
            .
          </Typography>
        </div>
      </Alert>
    </>
  );
}
