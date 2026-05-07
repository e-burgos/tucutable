import React from 'react';
import {
  CardContainer,
  CardTitle,
  Typography,
  CodeBlock,
  Badge,
} from '@e-burgos/tucu-ui';

// ─── Generic props table ────────────────────────────────────────

interface TypeField {
  name: string;
  type: string;
  required?: boolean;
  description: string;
}

const FieldTable: React.FC<{ fields: TypeField[] }> = ({ fields }) => (
  <div className="overflow-x-auto rounded-lg border border-border">
    <table className="w-full text-sm border-collapse">
      <thead>
        <tr className="bg-muted/30 text-left">
          <th className="px-3 py-2.5 font-semibold text-heading border-b border-border w-44">
            Field
          </th>
          <th className="px-3 py-2.5 font-semibold text-heading border-b border-border w-48">
            Type
          </th>
          <th className="px-3 py-2.5 font-semibold text-heading border-b border-border">
            Description
          </th>
        </tr>
      </thead>
      <tbody>
        {fields.map((f, i) => (
          <tr
            key={f.name}
            className={`border-b border-border last:border-0 ${i % 2 === 0 ? 'bg-body' : 'bg-muted/10'}`}
          >
            <td className="px-3 py-2.5 align-top">
              <code className="font-mono text-xs font-semibold text-brand">
                {f.name}
              </code>
              {f.required && (
                <Badge className="ml-1.5 bg-danger/15 text-danger text-xs">
                  req
                </Badge>
              )}
            </td>
            <td className="px-3 py-2.5 align-top">
              <code className="font-mono text-xs text-muted-foreground">
                {f.type}
              </code>
            </td>
            <td className="px-3 py-2.5 align-top text-xs text-muted-foreground leading-relaxed">
              {f.description}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

// ─── Type sections ──────────────────────────────────────────────

const IHeaderOptionsFields: TypeField[] = [
  {
    name: 'headerContainer',
    type: 'ReactNode | null',
    description:
      'Custom React node to replace the default header toolbar entirely.',
  },
  {
    name: 'enableHideColumns',
    type: 'boolean',
    description:
      'Adds a visibility toggle per column in the column header dropdown.',
  },
  {
    name: 'enablePinLeftColumns',
    type: 'boolean',
    description: 'Allows pinning columns to the left edge of the table.',
  },
  {
    name: 'enablePinRightColumns',
    type: 'boolean',
    description: 'Allows pinning columns to the right edge of the table.',
  },
  {
    name: 'enableSortColumns',
    type: 'boolean',
    description:
      'Enables click-to-sort on column headers with asc/desc/none cycling.',
  },
  {
    name: 'enableResizeColumns',
    type: 'boolean',
    description: 'Adds a drag handle on column borders to resize column width.',
  },
  {
    name: 'enableDragColumns',
    type: 'boolean',
    description: 'Enables drag-and-drop reordering of columns via @dnd-kit.',
  },
  {
    name: 'className',
    type: 'string',
    description:
      'Additional CSS class applied to the header container element.',
  },
];

const IPaginationOptionsFields: TypeField[] = [
  {
    name: 'showPagination',
    type: 'boolean',
    required: true,
    description: 'Whether to render pagination controls below the table.',
  },
  {
    name: 'rowsInfo',
    type: 'boolean',
    description: 'Displays "1–10 of 45 rows" info text alongside pagination.',
  },
  {
    name: 'pageIndex',
    type: 'number',
    description: 'Initial page index (0-based). Defaults to 0.',
  },
  {
    name: 'pageSize',
    type: 'number',
    description: 'Number of rows per page. Defaults to 10.',
  },
  {
    name: 'totalCount',
    type: 'number',
    description:
      'Total row count for display in rowsInfo. Usually set for server-side pagination.',
  },
  {
    name: 'hideRecordsSelector',
    type: 'boolean',
    description: 'Hides the per-page selector dropdown.',
  },
  {
    name: 'manualPagination',
    type: 'IManualPaginationOptions',
    description:
      'Full manual pagination config — enabled, rowCount, pagination state, setPagination callback.',
  },
  {
    name: 'serverPagination',
    type: 'IServerPagination',
    description:
      'Server-side pagination config — totalCount, pagination state, setPagination, optional searchFilter.',
  },
  {
    name: 'takeDefaultPagination',
    type: 'boolean',
    description: 'Uses the library default pagination settings as base.',
  },
];

const IRowActionsFields: TypeField[] = [
  {
    name: 'action',
    type: "'view' | 'edit' | 'delete' | 'download' | 'void' | 'more' | 'open-new-tab'",
    required: true,
    description: 'Action type — determines the icon and default tooltip.',
  },
  {
    name: 'label',
    type: '(row: Row<TData>) => string',
    required: true,
    description: 'Function returning the action label. Can be dynamic per row.',
  },
  {
    name: 'onClick',
    type: '(row: Row<TData>) => void',
    required: true,
    description: 'Callback invoked when the action is triggered.',
  },
  {
    name: 'showOptions',
    type: '(row: Row<TData>) => boolean',
    description: 'When false, this action is completely hidden for that row.',
  },
  {
    name: 'requiredScopes',
    type: 'string | string[]',
    description:
      'Permission scopes required to show the action. Checked via validateScopes().',
  },
  {
    name: 'disabled',
    type: '(row: Row<TData>) => boolean',
    description:
      'Returns true to render the action as disabled (grayed out, not clickable).',
  },
  {
    name: 'hidden',
    type: '(row: Row<TData>) => boolean',
    description: 'Returns true to hide the action entirely for that row.',
  },
  {
    name: 'showLabelInTooltip',
    type: 'boolean',
    description: 'Shows the label as a tooltip instead of inline text.',
  },
];

const IDataTableStylesFields: TypeField[] = [
  {
    name: 'wrapper',
    type: 'CSSProperties',
    description: 'Outermost container wrapping the entire component.',
  },
  {
    name: 'wrapperContainer',
    type: 'CSSProperties',
    description: 'Inner container inside the wrapper.',
  },
  {
    name: 'tableContainer',
    type: 'CSSProperties',
    description: 'The scrollable container that holds the <table> element.',
  },
  {
    name: 'table',
    type: 'CSSProperties',
    description: 'The <table> element itself.',
  },
  { name: 'thead', type: 'CSSProperties', description: 'The <thead> element.' },
  { name: 'tbody', type: 'CSSProperties', description: 'The <tbody> element.' },
  { name: 'tfoot', type: 'CSSProperties', description: 'The <tfoot> element.' },
  {
    name: 'header',
    type: 'CSSProperties',
    description: 'The header toolbar above the table (title, column controls).',
  },
  {
    name: 'row',
    type: 'CSSProperties',
    description: 'Every <tr> in the body.',
  },
  {
    name: 'rowExpanded',
    type: 'CSSProperties',
    description: '<tr> of an expanded sub-component/sub-table row.',
  },
  {
    name: 'cell',
    type: 'CSSProperties',
    description: 'Every <td> in the body.',
  },
  {
    name: 'pagination',
    type: 'CSSProperties',
    description: 'The pagination controls bar at the bottom.',
  },
  {
    name: 'container',
    type: 'CSSProperties',
    description:
      'Outer page-level container (useful for fixed-height layouts).',
  },
  {
    name: 'messageContainer',
    type: 'CSSProperties',
    description: 'Container for empty/error state messages.',
  },
];

const IDataTableStateMessageFields: TypeField[] = [
  {
    name: 'noData',
    type: 'string',
    description: 'Heading shown when data array is empty.',
  },
  {
    name: 'noDataDescription',
    type: 'string',
    description: 'Sub-text shown below the noData heading.',
  },
  {
    name: 'errorData',
    type: 'string',
    description: 'Heading shown when isError is true.',
  },
  {
    name: 'errorDataDescription',
    type: 'string',
    description: 'Sub-text shown below the errorData heading.',
  },
  {
    name: 'contactSupport',
    type: 'string',
    description: 'Custom "contact support" link text.',
  },
  {
    name: 'contactSupportLink',
    type: 'string',
    description: 'URL for the contact support link.',
  },
  {
    name: 'hideContactSupport',
    type: 'boolean',
    description: 'Hides the contact support link entirely.',
  },
  {
    name: 'className',
    type: 'string',
    description: 'Additional CSS class for the message container.',
  },
];

// ─── Component ─────────────────────────────────────────────────

const TypesSection: React.FC = () => {
  return (
    <div className="space-y-8">
      {/* IHeaderOptions */}
      <CardContainer className="overflow-hidden">
        <CardTitle title="IHeaderOptions" className="mt-2 mb-2">
          <div className="w-full px-4 sm:px-6 pb-6">
            <Typography tag="p" className="text-sm text-muted-foreground mb-4">
              Controls which column-level actions are available in each column's
              header menu. Passed as{' '}
              <code className="font-mono text-brand text-xs">
                headerOptions
              </code>{' '}
              prop.
            </Typography>
            <FieldTable fields={IHeaderOptionsFields} />
            <CodeBlock
              language="tsx"
              code={`<DataTable
  headerOptions={{
    enableSortColumns: true,
    enableHideColumns: true,
    enablePinLeftColumns: true,
    enableResizeColumns: true,
    enableDragColumns: true,
  }}
/>`}
            />
          </div>
        </CardTitle>
      </CardContainer>

      {/* IPaginationOptions */}
      <CardContainer className="overflow-hidden">
        <CardTitle title="IPaginationOptions" className="mt-2 mb-2">
          <div className="w-full px-4 sm:px-6 pb-6">
            <Typography tag="p" className="text-sm text-muted-foreground mb-4">
              Configures client-side pagination. For server-side or manual
              pagination, use the nested{' '}
              <code className="font-mono text-brand text-xs">
                serverPagination
              </code>{' '}
              or{' '}
              <code className="font-mono text-brand text-xs">
                manualPagination
              </code>{' '}
              objects.
            </Typography>
            <FieldTable fields={IPaginationOptionsFields} />
            <CodeBlock
              language="tsx"
              code={`// Client-side (built-in)
<DataTable pagination={{ showPagination: true, pageSize: 20, rowsInfo: true }} />

// Server-side
<DataTable
  pagination={{
    showPagination: true,
    serverPagination: {
      totalCount: 500,
      pagination: { pageIndex, pageSize },
      setPagination,
    },
  }}
/>`}
            />
          </div>
        </CardTitle>
      </CardContainer>

      {/* IRowActions */}
      <CardContainer className="overflow-hidden">
        <CardTitle title="IRowActions<TData>" className="mt-2 mb-2">
          <div className="w-full px-4 sm:px-6 pb-6">
            <Typography tag="p" className="text-sm text-muted-foreground mb-4">
              Defines a single action in the per-row actions column. The{' '}
              <code className="font-mono text-brand text-xs">rowActions</code>{' '}
              prop accepts an array of these.
            </Typography>
            <FieldTable fields={IRowActionsFields} />
            <CodeBlock
              language="tsx"
              code={`<DataTable
  rowActions={[
    {
      action: 'view',
      label: () => 'View details',
      onClick: (row) => navigate(\`/users/\${row.original.id}\`),
    },
    {
      action: 'delete',
      label: () => 'Delete',
      onClick: (row) => handleDelete(row.original.id),
      hidden: (row) => !row.original.canDelete,
      requiredScopes: 'admin:write',
    },
  ]}
/>`}
            />
          </div>
        </CardTitle>
      </CardContainer>

      {/* IDataTableStyles */}
      <CardContainer className="overflow-hidden">
        <CardTitle title="IDataTableStyles (sx)" className="mt-2 mb-2">
          <div className="w-full px-4 sm:px-6 pb-6">
            <Typography tag="p" className="text-sm text-muted-foreground mb-4">
              CSS-in-JS styles applied to each anatomical part of the table.
              Passed as the{' '}
              <code className="font-mono text-brand text-xs">sx</code> prop.
              Each key accepts a standard{' '}
              <code className="font-mono text-xs">React.CSSProperties</code>{' '}
              object.
            </Typography>
            <FieldTable fields={IDataTableStylesFields} />
            <CodeBlock
              language="tsx"
              code={`<DataTable
  sx={{
    tableContainer: { maxHeight: '500px', overflowY: 'auto' },
    row: { cursor: 'pointer' },
    cell: { fontSize: '13px' },
    header: { position: 'sticky', top: 0, zIndex: 10 },
  }}
/>`}
            />
          </div>
        </CardTitle>
      </CardContainer>

      {/* IDataTableStateMessage */}
      <CardContainer className="overflow-hidden">
        <CardTitle title="IDataTableStateMessage" className="mt-2 mb-2">
          <div className="w-full px-4 sm:px-6 pb-6">
            <Typography tag="p" className="text-sm text-muted-foreground mb-4">
              Customizes the text shown in empty and error states. Passed as the{' '}
              <code className="font-mono text-brand text-xs">stateMessage</code>{' '}
              prop.
            </Typography>
            <FieldTable fields={IDataTableStateMessageFields} />
            <CodeBlock
              language="tsx"
              code={`<DataTable
  isError={hasError}
  stateMessage={{
    noData: 'No results found',
    noDataDescription: 'Try adjusting your search filters.',
    errorData: 'Failed to load data',
    errorDataDescription: 'Please try again or contact support.',
    hideContactSupport: true,
  }}
/>`}
            />
          </div>
        </CardTitle>
      </CardContainer>
    </div>
  );
};

export default TypesSection;
