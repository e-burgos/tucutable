import {
  Typography,
  CardContainer,
  CardTitle,
  BasicTable,
  CodeBlock,
  Badge,
  Alert,
} from '@e-burgos/tucu-ui';

const rowActionsProps = [
  {
    prop: 'action',
    type: "'view' | 'edit' | 'delete' | 'download' | 'void' | 'more' | 'open-new-tab'",
    required: 'Yes',
    description:
      'Determines the icon and semantic role. "more" shows three dots.',
  },
  {
    prop: 'label',
    type: '(row: Row<T>) => string',
    required: 'Yes',
    description: 'Dynamic label. Receives the row. Used in tooltip and menu.',
  },
  {
    prop: 'onClick',
    type: '(row: Row<T>) => void',
    required: 'Yes',
    description: 'Callback fired when the action is clicked.',
  },
  {
    prop: 'showLabelInTooltip',
    type: 'boolean',
    required: 'No',
    description: 'Show label text inside a tooltip on hover.',
  },
  {
    prop: 'hidden',
    type: '(row: Row<T>) => boolean',
    required: 'No',
    description: 'Hides the action for specific rows. Return true to hide.',
  },
  {
    prop: 'disabled',
    type: '(row: Row<T>) => boolean',
    required: 'No',
    description:
      'Disables the action for specific rows. Return true to disable.',
  },
  {
    prop: 'requiredScopes',
    type: 'string[]',
    required: 'No',
    description:
      'Scope strings required to see this action. Checked against setScopes().',
  },
];

const propsTableColumns = [
  { key: 'prop', label: 'Prop' },
  { key: 'type', label: 'Type' },
  { key: 'required', label: 'Req.' },
  { key: 'description', label: 'Description' },
];

const actionTypesData = [
  { action: 'view', icon: 'Eye', description: 'View detail of the row' },
  { action: 'edit', icon: 'Pencil', description: 'Edit row data' },
  { action: 'delete', icon: 'Trash2', description: 'Delete the row' },
  {
    action: 'download',
    icon: 'Download',
    description: 'Download related file',
  },
  { action: 'void', icon: 'Ban', description: 'Void or cancel the record' },
  {
    action: 'more',
    icon: 'MoreVertical',
    description: 'Generic action (3-dot menu)',
  },
  {
    action: 'open-new-tab',
    icon: 'ExternalLink',
    description: 'Open in a new browser tab',
  },
];

const actionTypesColumns = [
  { key: 'action', label: 'Action Value' },
  { key: 'icon', label: 'Icon' },
  { key: 'description', label: 'Description' },
];

const codeBasic = `import { DataTable } from '@e-burgos/tucutable';
import type { IRowActions } from '@e-burgos/tucutable';

type User = { id: number; name: string; isActive: boolean };

const rowActions: IRowActions<User>[] = [
  {
    action: 'view',
    label: (row) => \`View \${row.original.name}\`,
    onClick: (row) => console.log('View', row.original),
    showLabelInTooltip: true,
  },
  {
    action: 'edit',
    label: () => 'Edit',
    onClick: (row) => handleEdit(row.original),
    disabled: (row) => !row.original.isActive,
  },
  {
    action: 'delete',
    label: () => 'Delete',
    onClick: (row) => handleDelete(row.original),
    hidden: (row) => !row.original.isActive,
  },
];

<DataTable
  tableId="my-table"
  data={data}
  columns={columns}
  rowActions={rowActions}
/>`;

const codeForceShow = `// Always show action icons (not just on hover)
<DataTable
  tableId="my-table"
  data={data}
  columns={columns}
  rowActions={rowActions}
  forceShowMenuActions={true}
/>`;

const codeScopes = `import { setScopes } from '@e-burgos/tucutable';

// In your app initialization (e.g. after login)
setScopes(['read:users', 'write:users', 'delete:users']);

// In your row actions definition
const rowActions: IRowActions<User>[] = [
  {
    action: 'delete',
    label: () => 'Delete',
    onClick: (row) => handleDelete(row.original),
    // Only visible if user has the "delete:users" scope
    requiredScopes: ['delete:users'],
  },
];`;

const codeConditional = `// Dynamic label + conditional visibility
const rowActions: IRowActions<Order>[] = [
  {
    action: 'void',
    label: (row) =>
      row.original.status === 'pending'
        ? 'Cancel Order'
        : 'Void Record',
    onClick: (row) => handleVoid(row.original),
    hidden: (row) => row.original.status === 'completed',
    disabled: (row) => row.original.status === 'processing',
  },
  {
    action: 'open-new-tab',
    label: () => 'Open in Portal',
    onClick: (row) => {
      window.open(\`/portal/orders/\${row.original.id}\`, '_blank');
    },
    showLabelInTooltip: true,
  },
];`;

function RowActionsSection() {
  return (
    <div className="space-y-8">
      <div>
        <Typography tag="h2" className="text-2xl font-bold mb-2">
          Row Actions
        </Typography>
        <Typography tag="p" className="text-muted">
          Row actions add contextual icon buttons to each row. Actions can be
          conditionally shown, hidden, or disabled per row, and restricted by
          user scopes.
        </Typography>
      </div>

      {/* Action Types */}
      <CardContainer>
        <CardTitle title="Action Types">
          <div className="px-4 pb-4">
            <Typography tag="p" className="text-sm text-muted mb-4">
              The <code>action</code> field determines the icon rendered. Each
              value maps to a semantic icon from the tucutable asset library.
            </Typography>
            <BasicTable
              columns={actionTypesColumns.map((col) => ({
                ...col,
                render: (value: unknown) => (
                  <span className="font-mono text-sm">{String(value)}</span>
                ),
              }))}
              data={actionTypesData}
            />
          </div>
        </CardTitle>
      </CardContainer>

      {/* IRowActions Props */}
      <CardContainer>
        <CardTitle title="IRowActions Props">
          <div className="px-4 pb-4">
            <BasicTable
              columns={propsTableColumns.map((col) => ({
                ...col,
                render: (value: unknown, row: Record<string, unknown>) => {
                  if (col.key === 'required') {
                    const v = String(value);
                    return (
                      <Badge
                        className={
                          v === 'Yes'
                            ? 'bg-danger/15 text-danger'
                            : 'bg-muted/20 text-muted'
                        }
                      >
                        {v}
                      </Badge>
                    );
                  }
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
                      {String(row['description'] ?? value)}
                    </span>
                  );
                },
              }))}
              data={rowActionsProps}
            />
          </div>
        </CardTitle>
      </CardContainer>

      {/* Basic Usage */}
      <CardContainer>
        <CardTitle title="Basic Usage">
          <div className="px-4 pb-4 space-y-4">
            <Typography tag="p" className="text-sm text-muted">
              Define an array of <code>IRowActions</code> and pass it to the{' '}
              <code>rowActions</code> prop. Actions appear as icon buttons on
              each row on hover.
            </Typography>
            <CodeBlock language="tsx" code={codeBasic} />
          </div>
        </CardTitle>
      </CardContainer>

      {/* Force Show */}
      <CardContainer>
        <CardTitle title="Always Visible Actions">
          <div className="px-4 pb-4 space-y-4">
            <Typography tag="p" className="text-sm text-muted">
              By default, action icons appear only on row hover. Set{' '}
              <code>forceShowMenuActions</code> to always show them.
            </Typography>
            <CodeBlock language="tsx" code={codeForceShow} />
          </div>
        </CardTitle>
      </CardContainer>

      {/* Conditional Actions */}
      <CardContainer>
        <CardTitle title="Conditional Visibility & Dynamic Labels">
          <div className="px-4 pb-4 space-y-4">
            <Typography tag="p" className="text-sm text-muted">
              Both <code>label</code>, <code>hidden</code>, and{' '}
              <code>disabled</code> receive the full TanStack{' '}
              <code>Row&lt;T&gt;</code> object, enabling row-level conditional
              logic.
            </Typography>
            <CodeBlock language="tsx" code={codeConditional} />
          </div>
        </CardTitle>
      </CardContainer>

      {/* Scopes */}
      <CardContainer>
        <CardTitle title="Scope-Based Visibility">
          <div className="px-4 pb-4 space-y-4">
            <Alert>
              <Typography tag="p" className="text-sm">
                <strong>setScopes()</strong> should be called once after the
                user authenticates. Scopes are stored in memory and checked
                against <code>requiredScopes</code> at render time.
              </Typography>
            </Alert>
            <CodeBlock language="tsx" code={codeScopes} />
          </div>
        </CardTitle>
      </CardContainer>
    </div>
  );
}

export default RowActionsSection;
