import {
  Typography,
  CardContainer,
  CardTitle,
  BasicTable,
  CodeBlock,
  Badge,
  Alert,
} from '@e-burgos/tucu-ui';

const columnDefProps = [
  {
    property: 'id',
    type: 'string',
    required: 'No',
    description: 'Unique identifier. Required if no accessorKey.',
  },
  {
    property: 'accessorKey',
    type: 'string',
    required: 'No*',
    description: 'Key from data object. Shorthand for field access.',
  },
  {
    property: 'accessorFn',
    type: '(row) => value',
    required: 'No*',
    description: 'Function accessor. Enables computed / derived values.',
  },
  {
    property: 'header',
    type: 'string | ReactNode | fn',
    required: 'No',
    description: 'Column header label. Can be a string or render function.',
  },
  {
    property: 'cell',
    type: '(info: CellContext) => ReactNode',
    required: 'No',
    description: 'Custom cell renderer. Receives info.getValue() and info.row.',
  },
  {
    property: 'size',
    type: 'number',
    required: 'No',
    description: 'Column width in pixels. Omit for auto-width calculation.',
  },
  {
    property: 'minSize',
    type: 'number',
    required: 'No',
    description: 'Minimum column width when resizing. Default: 20.',
  },
  {
    property: 'maxSize',
    type: 'number',
    required: 'No',
    description:
      'Maximum column width when resizing. Default: Number.MAX_SAFE_INTEGER.',
  },
];

const tableColumns = [
  { key: 'property', label: 'Property' },
  { key: 'type', label: 'Type' },
  { key: 'required', label: 'Required' },
  { key: 'description', label: 'Description' },
];

const codeBasic = `import { TanstackTable } from '@e-burgos/tucutable';

type User = { id: number; name: string; email: string };

const columns: TanstackTable.ColumnDef<User>[] = [
  { accessorKey: 'id', header: 'ID', size: 60 },
  { accessorKey: 'name', header: 'Name' },
  { accessorKey: 'email', header: 'Email' },
];`;

const codeStyled = `const columns: TanstackTable.ColumnDef<User>[] = [
  {
    accessorKey: 'name',
    header: () => <span className="font-bold text-primary">Full Name</span>,
    cell: ({ getValue }) => (
      <span className="font-medium">{getValue() as string}</span>
    ),
  },
];`;

const codeStatus = `const columns: TanstackTable.ColumnDef<User>[] = [
  {
    accessorKey: 'active',
    header: 'Status',
    size: 100,
    cell: ({ getValue }) => {
      const active = getValue() as boolean;
      return (
        <span className={\`px-2 py-1 rounded-full text-xs font-medium \${
          active ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
        }\`}>
          {active ? 'Active' : 'Inactive'}
        </span>
      );
    },
  },
];`;

const codeAccessorFn = `// Computed columns with accessorFn
const columns: TanstackTable.ColumnDef<User>[] = [
  {
    id: 'fullName',       // id is required when using accessorFn
    accessorFn: (row) => \`\${row.firstName} \${row.lastName}\`,
    header: 'Full Name',
  },
  {
    id: 'shortEmail',
    accessorFn: (row) => row.email.split('@')[0],
    header: 'Username',
  },
];`;

const examples = [
  {
    step: '01',
    label: 'Basic Text Columns',
    badge: 'accessorKey',
    color: 'from-blue-500/20 to-blue-600/10',
    iconColor: 'text-blue-500',
    description:
      'Simplest form: map a data key to a column. Use size to pin width.',
    code: codeBasic,
  },
  {
    step: '02',
    label: 'Styled Header & Cell',
    badge: 'ReactNode',
    color: 'from-purple-500/20 to-purple-600/10',
    iconColor: 'text-purple-500',
    description:
      'header and cell accept React render functions for full control.',
    code: codeStyled,
  },
  {
    step: '03',
    label: 'Boolean / Status Badge',
    badge: 'cell renderer',
    color: 'from-green-500/20 to-green-600/10',
    iconColor: 'text-green-500',
    description:
      'Cast getValue() to the expected type and return a styled badge.',
    code: codeStatus,
  },
  {
    step: '04',
    label: 'Computed with accessorFn',
    badge: 'accessorFn',
    color: 'from-orange-500/20 to-orange-600/10',
    iconColor: 'text-orange-500',
    description:
      'Use accessorFn to derive a value from multiple fields. Always pair with id.',
    code: codeAccessorFn,
  },
];

export default function BasicColumnsSection() {
  return (
    <>
      {/* Header */}
      <div className="text-center space-y-3 pb-4">
        <Typography tag="h2" className="text-2xl sm:text-3xl font-bold">
          Basic Column Definitions
        </Typography>
        <Typography tag="p" className="text-muted max-w-2xl mx-auto">
          Columns are defined using TanStack Table&apos;s{' '}
          <code className="text-xs bg-muted/30 px-1 py-0.5 rounded">
            ColumnDef&lt;TData&gt;
          </code>{' '}
          interface. Each column needs at least one accessor to know which data
          field to read.
        </Typography>
      </div>

      {/* Props reference table */}
      <CardContainer className="overflow-hidden">
        <CardTitle title="ColumnDef Properties">
          <div className="px-4 pb-4">
            <BasicTable
              columns={tableColumns.map((col) => ({
                ...col,
                render: (value: unknown, row: Record<string, unknown>) => {
                  if (col.key === 'property')
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
                  if (col.key === 'required') {
                    const req = String(value ?? '');
                    return (
                      <Badge
                        size="small"
                        shape="pill"
                        className={
                          req === 'No*'
                            ? 'bg-warning/15 text-warning'
                            : req === 'No'
                              ? 'bg-muted/30 text-muted'
                              : 'bg-success/15 text-success'
                        }
                      >
                        {req}
                      </Badge>
                    );
                  }
                  return (
                    <span className="text-sm">{row.description as string}</span>
                  );
                },
              }))}
              data={columnDefProps}
            />
            <p className="text-xs text-muted mt-2">
              * Either <code className="font-mono">accessorKey</code> or{' '}
              <code className="font-mono">accessorFn</code> must be provided (or{' '}
              <code className="font-mono">id</code> for display-only columns).
            </p>
          </div>
        </CardTitle>
      </CardContainer>

      {/* Code Examples */}
      <Alert className="border-brand/30 bg-brand/5">
        <Typography tag="p" className="text-sm">
          <strong>Tip:</strong> Import{' '}
          <code className="text-xs font-mono bg-muted/20 px-1 py-0.5 rounded">
            TanstackTable
          </code>{' '}
          from{' '}
          <code className="text-xs font-mono bg-muted/20 px-1 py-0.5 rounded">
            @e-burgos/tucutable
          </code>{' '}
          to get full TypeScript typings for ColumnDef, CellContext, and more.
        </Typography>
      </Alert>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {examples.map((ex) => (
          <CardContainer key={ex.step} className="overflow-hidden">
            <div className={`p-4 bg-linear-to-br ${ex.color}`}>
              <div className="flex items-center gap-3">
                <div
                  className={`w-8 h-8 rounded-lg bg-background/80 flex items-center justify-center shrink-0`}
                >
                  <span className={`text-xs font-bold ${ex.iconColor}`}>
                    {ex.step}
                  </span>
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <Typography
                      tag="h3"
                      className="text-sm font-semibold truncate"
                    >
                      {ex.label}
                    </Typography>
                    <Badge
                      size="small"
                      shape="pill"
                      className="bg-muted/30 text-muted"
                    >
                      {ex.badge}
                    </Badge>
                  </div>
                  <Typography tag="p" className="text-xs text-muted mt-0.5">
                    {ex.description}
                  </Typography>
                </div>
              </div>
            </div>
            <div className="p-4">
              <CodeBlock language="tsx" code={ex.code} />
            </div>
          </CardContainer>
        ))}
      </div>
    </>
  );
}
