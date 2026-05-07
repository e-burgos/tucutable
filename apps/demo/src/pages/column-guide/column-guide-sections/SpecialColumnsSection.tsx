import {
  Typography,
  CardContainer,
  CardTitle,
  CodeBlock,
  Badge,
  Alert,
  LucideIcons,
} from '@e-burgos/tucu-ui';

const codeExpanded = `import { DataTable } from '@e-burgos/tucutable';

// ExpandedColumn is injected automatically when renderSubComponent is provided
<DataTable
  tableId="users-table"
  columns={columns}
  data={data}
  renderSubComponent={({ row }) => (
    <div className="p-4 bg-muted/5">
      <p>Details for: {row.original.name}</p>
      <p>Email: {row.original.email}</p>
    </div>
  )}
/>`;

const codeRowSelection = `import { DataTable } from '@e-burgos/tucutable';

// RowSelectionColumn is injected when rowSelection is configured
<DataTable
  tableId="users-table"
  columns={columns}
  data={data}
  rowSelection={{
    enable: true,
    enableSelectAll: true,               // header "select all" checkbox
    enableMultiRowSelection: true,       // allow selecting multiple rows
    onSelectedRowsChange: (rows) => {
      console.log('Selected:', rows);
    },
  }}
/>`;

const codeRowActions = `import { DataTable, type IRowAction } from '@e-burgos/tucutable';

const rowActions: IRowAction<User>[] = [
  {
    label: 'Edit',
    icon: <LucideIcons.Pencil className="w-4 h-4" />,
    onClick: (row) => handleEdit(row.original),
  },
  {
    label: 'Delete',
    icon: <LucideIcons.Trash2 className="w-4 h-4" />,
    variant: 'danger',
    onClick: (row) => handleDelete(row.original),
  },
];

// RowActionsColumn is injected automatically — 50px wide, pinned right
<DataTable
  tableId="users-table"
  columns={columns}
  data={data}
  rowActions={rowActions}
/>`;

const specialColumns = [
  {
    name: 'ExpandedColumn',
    trigger: 'renderSubComponent',
    size: '40px',
    pin: 'Left',
    icon: <LucideIcons.ChevronDown className="w-5 h-5 text-indigo-500" />,
    color: 'from-indigo-500/20 to-indigo-600/10',
    badge: 'Auto-injected',
    badgeColor: 'bg-info/15 text-info',
    description:
      'Chevron toggle that expands a sub-row. Injected when renderSubComponent prop is present. Cannot be disabled individually.',
    restriction:
      'Rows without sub-component data still show the chevron — handle visibility in renderSubComponent.',
    code: codeExpanded,
  },
  {
    name: 'RowSelectionColumn',
    trigger: 'rowSelection.enable',
    size: '40px',
    pin: 'Left',
    icon: <LucideIcons.CheckSquare className="w-5 h-5 text-teal-500" />,
    color: 'from-teal-500/20 to-teal-600/10',
    badge: 'Auto-injected',
    badgeColor: 'bg-success/15 text-success',
    description:
      'Checkbox column for row selection. Header checkbox selects all when enableSelectAll is true. Supports single and multi-selection.',
    restriction:
      'Use onSelectedRowsChange callback to access selected rows. Row objects are TanStack Row<TData>.',
    code: codeRowSelection,
  },
  {
    name: 'RowActionsColumn',
    trigger: 'rowActions',
    size: '50px',
    pin: 'Right',
    icon: <LucideIcons.MoreVertical className="w-5 h-5 text-rose-500" />,
    color: 'from-rose-500/20 to-rose-600/10',
    badge: 'Auto-injected',
    badgeColor: 'bg-danger/15 text-danger',
    description:
      'Fixed 50px column pinned to the right. Shows a "…" menu with your defined actions per row. Supports icon, label, and variant (danger).',
    restriction:
      'The column is always pinned right and non-draggable. Do not manually add it to your columns array.',
    code: codeRowActions,
  },
];

export default function SpecialColumnsSection() {
  return (
    <>
      {/* Header */}
      <div className="text-center space-y-3 pb-4">
        <Typography tag="h2" className="text-2xl sm:text-3xl font-bold">
          Built-in Helper Columns
        </Typography>
        <Typography tag="p" className="text-muted max-w-2xl mx-auto">
          tucutable automatically injects three special columns based on which
          props you pass to{' '}
          <code className="text-xs bg-muted/30 px-1 py-0.5 rounded">
            DataTable
          </code>
          . You never add them manually — they appear when their trigger prop is
          present.
        </Typography>
      </div>

      {/* Overview grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {specialColumns.map((col) => (
          <CardContainer
            key={col.name}
            className={`overflow-hidden bg-linear-to-br ${col.color} border border-transparent hover:border-border transition-colors`}
          >
            <div className="p-5 space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-background/80 flex items-center justify-center shrink-0">
                  {col.icon}
                </div>
                <div>
                  <code className="text-sm font-mono font-bold">
                    {col.name}
                  </code>
                  <Badge
                    size="small"
                    shape="pill"
                    className={`ml-2 ${col.badgeColor}`}
                  >
                    {col.badge}
                  </Badge>
                </div>
              </div>
              <Typography tag="p" className="text-sm text-muted">
                {col.description}
              </Typography>
              <div className="flex flex-wrap gap-2 text-xs">
                <span className="px-2 py-0.5 rounded-full bg-background/60 border">
                  Trigger: <strong>{col.trigger}</strong>
                </span>
                <span className="px-2 py-0.5 rounded-full bg-background/60 border">
                  Width: <strong>{col.size}</strong>
                </span>
                <span className="px-2 py-0.5 rounded-full bg-background/60 border">
                  Pin: <strong>{col.pin}</strong>
                </span>
              </div>
            </div>
          </CardContainer>
        ))}
      </div>

      <Alert className="border-warning/30 bg-warning/5">
        <div className="flex items-start gap-2">
          <LucideIcons.AlertTriangle className="w-4 h-4 text-warning shrink-0 mt-0.5" />
          <Typography tag="p" className="text-sm text-warning">
            <strong>Do not duplicate:</strong> Never manually add{' '}
            <code className="font-mono text-xs">ExpandedColumn</code>,{' '}
            <code className="font-mono text-xs">RowSelectionColumn</code>, or{' '}
            <code className="font-mono text-xs">RowActionsColumn</code> to your{' '}
            <code className="font-mono text-xs">columns</code> array. They are
            managed internally.
          </Typography>
        </div>
      </Alert>

      {/* Code examples per column */}
      {specialColumns.map((col) => (
        <CardContainer key={`code-${col.name}`} className="overflow-hidden">
          <div className={`p-4 bg-linear-to-br ${col.color}`}>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-background/80 flex items-center justify-center shrink-0">
                {col.icon}
              </div>
              <div>
                <Typography tag="h3" className="text-sm font-semibold">
                  {col.name}
                </Typography>
                <Typography tag="p" className="text-xs text-muted">
                  Trigger: <code className="font-mono">{col.trigger}</code> —{' '}
                  {col.restriction}
                </Typography>
              </div>
            </div>
          </div>
          <CardTitle title={`Using ${col.name}`}>
            <div className="px-4 pb-4">
              <CodeBlock language="tsx" code={col.code} />
            </div>
          </CardTitle>
        </CardContainer>
      ))}
    </>
  );
}
