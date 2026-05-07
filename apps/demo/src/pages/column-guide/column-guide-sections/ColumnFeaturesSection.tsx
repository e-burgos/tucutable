import {
  Typography,
  CardContainer,
  CardTitle,
  BasicTable,
  CodeBlock,
  Badge,
  Alert,
  LucideIcons,
} from '@e-burgos/tucu-ui';

const featureProps = [
  {
    prop: 'enableSorting',
    default: 'true',
    scope: 'TanStack',
    description: 'Allow sorting this column by clicking its header.',
  },
  {
    prop: 'enableResizing',
    default: 'true',
    scope: 'TanStack',
    description: 'Allow resizing the column by dragging its border.',
  },
  {
    prop: 'enablePinning',
    default: 'true',
    scope: 'TanStack',
    description: 'Allow the column to be pinned left or right.',
  },
  {
    prop: 'enableHiding',
    default: 'true',
    scope: 'TanStack',
    description: 'Allow hiding/showing via the column visibility toggle.',
  },
  {
    prop: 'enableColumnFilter',
    default: 'true',
    scope: 'TanStack',
    description: 'Allow per-column filtering in the header filter row.',
  },
  {
    prop: 'enableMultiSort',
    default: 'true',
    scope: 'TanStack',
    description: 'Allow this column to participate in multi-column sorting.',
  },
  {
    prop: 'enableDraggable',
    default: 'true',
    scope: 'tucutable',
    description:
      'Allow dragging this column to reorder it (DnD). Set false to lock position.',
  },
  {
    prop: 'enableVisible',
    default: 'true',
    scope: 'tucutable',
    description:
      'Initial visibility state. Set false to start hidden (still in visibility panel).',
  },
];

const tableColumns = [
  { key: 'prop', label: 'Prop' },
  { key: 'default', label: 'Default' },
  { key: 'scope', label: 'Scope' },
  { key: 'description', label: 'Description' },
];

const codeSort = `import { sortingCompareNumberFn, sortingCompareStringFn } from '@e-burgos/tucutable';

const columns: TanstackTable.ColumnDef<User>[] = [
  {
    accessorKey: 'name',
    header: 'Name',
    enableSorting: true,
    sortingFn: sortingCompareStringFn,   // case-insensitive string sort
  },
  {
    accessorKey: 'age',
    header: 'Age',
    enableSorting: true,
    sortingFn: sortingCompareNumberFn,   // numeric sort
  },
  {
    accessorKey: 'createdAt',
    header: 'Created',
    enableSorting: false,                // disable sorting on this column
  },
];`;

const codeResize = `const columns: TanstackTable.ColumnDef<User>[] = [
  {
    accessorKey: 'name',
    header: 'Name',
    size: 200,       // initial width
    minSize: 100,    // minimum resize limit
    maxSize: 400,    // maximum resize limit
    enableResizing: true,
  },
  {
    accessorKey: 'id',
    header: 'ID',
    size: 60,
    enableResizing: false,   // locked width
  },
];`;

const codePinDrag = `const columns: TanstackTable.ColumnDef<User>[] = [
  {
    accessorKey: 'name',
    header: 'Name',
    enablePinning: true,      // user can pin left/right
    enableDraggable: false,   // tucutable: cannot be reordered
  },
  {
    accessorKey: 'email',
    header: 'Email',
    enableDraggable: true,   // default – can be reordered via drag
  },
];`;

const codeHiding = `const columns: TanstackTable.ColumnDef<User>[] = [
  {
    accessorKey: 'name',
    header: 'Name',
    enableHiding: false,     // user cannot hide this column
  },
  {
    accessorKey: 'notes',
    header: 'Notes',
    enableVisible: false,    // tucutable: hidden by default, visible in panel
  },
];`;

const features = [
  {
    icon: <LucideIcons.ArrowUpDown className="w-5 h-5 text-blue-500" />,
    title: 'Sorting',
    badge: 'TanStack',
    color: 'from-blue-500/20 to-blue-600/10',
    description:
      'Use enableSorting + custom sortingFn. Two built-in helpers: sortingCompareStringFn / sortingCompareNumberFn.',
    code: codeSort,
  },
  {
    icon: <LucideIcons.Move3d className="w-5 h-5 text-purple-500" />,
    title: 'Resizing',
    badge: 'TanStack',
    color: 'from-purple-500/20 to-purple-600/10',
    description:
      'Combine size, minSize, maxSize with enableResizing for fine-grained width control.',
    code: codeResize,
  },
  {
    icon: <LucideIcons.Pin className="w-5 h-5 text-green-500" />,
    title: 'Pinning & Drag',
    badge: 'tucutable',
    color: 'from-green-500/20 to-green-600/10',
    description:
      'enablePinning (TanStack) sticks a column to left/right. enableDraggable (tucutable) controls column reorder via DnD.',
    code: codePinDrag,
  },
  {
    icon: <LucideIcons.EyeOff className="w-5 h-5 text-orange-500" />,
    title: 'Visibility',
    badge: 'tucutable',
    color: 'from-orange-500/20 to-orange-600/10',
    description:
      'enableHiding lets the user toggle visibility. enableVisible sets initial state (tucutable-specific).',
    code: codeHiding,
  },
];

export default function ColumnFeaturesSection() {
  return (
    <>
      {/* Header */}
      <div className="text-center space-y-3 pb-4">
        <Typography tag="h2" className="text-2xl sm:text-3xl font-bold">
          Column Feature Toggles
        </Typography>
        <Typography tag="p" className="text-muted max-w-2xl mx-auto">
          Each column can opt in or out of interactive features. Most are
          inherited from TanStack Table — a few marked{' '}
          <strong>tucutable</strong> are extensions exclusive to this library.
        </Typography>
      </div>

      {/* Props reference table */}
      <CardContainer className="overflow-hidden">
        <CardTitle title="Feature Toggle Props">
          <div className="px-4 pb-4">
            <BasicTable
              columns={tableColumns.map((col) => ({
                ...col,
                render: (value: unknown, row: Record<string, unknown>) => {
                  if (col.key === 'prop')
                    return (
                      <code className="text-xs font-mono text-brand font-semibold">
                        {String(value ?? '')}
                      </code>
                    );
                  if (col.key === 'default')
                    return (
                      <code className="text-xs font-mono text-success font-medium">
                        {String(value ?? '')}
                      </code>
                    );
                  if (col.key === 'scope') {
                    const scope = String(value ?? '');
                    return (
                      <Badge
                        size="small"
                        shape="pill"
                        className={
                          scope === 'tucutable'
                            ? 'bg-brand/15 text-brand'
                            : 'bg-muted/30 text-muted'
                        }
                      >
                        {scope}
                      </Badge>
                    );
                  }
                  return (
                    <span className="text-sm">{row.description as string}</span>
                  );
                },
              }))}
              data={featureProps}
            />
          </div>
        </CardTitle>
      </CardContainer>

      {/* Alert */}
      <Alert className="border-brand/30 bg-brand/5">
        <Typography tag="p" className="text-sm">
          <strong>State persistence:</strong> Column order, visibility, pinning,
          sizing, and filters are automatically saved to{' '}
          <code className="text-xs font-mono bg-muted/20 px-1 rounded">
            localStorage
          </code>{' '}
          keyed by{' '}
          <code className="text-xs font-mono bg-muted/20 px-1 rounded">
            tableId
          </code>
          . No extra configuration needed.
        </Typography>
      </Alert>

      {/* Feature cards with code */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {features.map((f) => (
          <CardContainer key={f.title} className="overflow-hidden">
            <div className={`p-4 bg-linear-to-br ${f.color}`}>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-background/80 flex items-center justify-center shrink-0">
                  {f.icon}
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <Typography tag="h3" className="text-sm font-semibold">
                      {f.title}
                    </Typography>
                    <Badge
                      size="small"
                      shape="pill"
                      className={
                        f.badge === 'tucutable'
                          ? 'bg-brand/15 text-brand'
                          : 'bg-muted/30 text-muted'
                      }
                    >
                      {f.badge}
                    </Badge>
                  </div>
                  <Typography tag="p" className="text-xs text-muted mt-0.5">
                    {f.description}
                  </Typography>
                </div>
              </div>
            </div>
            <div className="p-4">
              <CodeBlock language="tsx" code={f.code} />
            </div>
          </CardContainer>
        ))}
      </div>
    </>
  );
}
