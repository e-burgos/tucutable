import {
  Typography,
  CardContainer,
  CardTitle,
  BasicTable,
  CodeBlock,
  Badge,
} from '@e-burgos/tucu-ui';

const messageProps = [
  {
    prop: 'noData',
    context: 'empty',
    type: 'string',
    description: 'Title when data array is empty.',
  },
  {
    prop: 'noDataDescription',
    context: 'empty',
    type: 'string',
    description: 'Subtitle/description for the empty state.',
  },
  {
    prop: 'errorData',
    context: 'error',
    type: 'string',
    description: 'Title shown when isError=true.',
  },
  {
    prop: 'errorDataDescription',
    context: 'error',
    type: 'string',
    description: 'Subtitle/description for the error state.',
  },
  {
    prop: 'contactSupport',
    context: 'error',
    type: 'string',
    description: 'Support link label.',
  },
  {
    prop: 'contactSupportLink',
    context: 'error',
    type: 'string',
    description: 'URL or mailto for the support link.',
  },
  {
    prop: 'hideContactSupport',
    context: 'error',
    type: 'boolean',
    description: 'Hide the support link entirely.',
  },
  {
    prop: 'className',
    context: 'both',
    type: 'string',
    description: 'Custom CSS class for the message container.',
  },
];

const msgColumns = [
  { key: 'prop', label: 'Prop' },
  { key: 'context', label: 'When' },
  { key: 'type', label: 'Type' },
  { key: 'description', label: 'Description' },
];

const codeBasic = `<DataTable
  tableId="state-messages"
  data={filteredItems}
  columns={columns}
  isError={queryFailed}
  stateMessage={{
    noData: 'No results found',
    noDataDescription: 'Try clearing your filters or search query.',
    errorData: 'Failed to load data',
    errorDataDescription: 'An unexpected error occurred. Please try again.',
    contactSupport: 'Contact Support',
    contactSupportLink: 'mailto:support@myapp.com',
  }}
/>`;

const codeContextual = `// Context-aware messages based on filter state
function FilteredTable({ filters }) {
  const hasFilters = Object.keys(filters).length > 0;

  return (
    <DataTable
      tableId="filtered-table"
      data={filteredData}
      columns={columns}
      isError={isError}
      stateMessage={{
        noData: hasFilters
          ? 'No results match your filters'
          : 'No records yet',
        noDataDescription: hasFilters
          ? 'Try adjusting or clearing your filters.'
          : 'Add your first record to get started.',
        errorData: 'Could not load records',
        errorDataDescription:
          'Your network connection may be interrupted.',
        contactSupport: 'Get help',
        contactSupportLink: '/support',
        hideContactSupport: false,
      }}
    />
  );
}`;

const codeHideSupport = `// Hide support link for non-critical errors
<DataTable
  tableId="internal-tool"
  data={data}
  columns={columns}
  isError={isError}
  stateMessage={{
    errorData: 'Data unavailable',
    errorDataDescription: 'The service is temporarily down.',
    hideContactSupport: true,  // No support link
  }}
/>`;

function StateMessagesSection() {
  return (
    <div className="space-y-8">
      <div>
        <Typography tag="h2" className="text-2xl font-bold mb-2">
          State Messages
        </Typography>
        <Typography tag="p" className="text-muted">
          Customize the text shown in empty-data and error states. The{' '}
          <code>stateMessage</code> prop (<code>IDataTableStateMessage</code>)
          controls titles, descriptions, and support link visibility.
        </Typography>
      </div>

      {/* Props */}
      <CardContainer>
        <CardTitle title="IDataTableStateMessage Props">
          <div className="px-4 pb-4">
            <BasicTable
              columns={msgColumns.map((col) => ({
                ...col,
                render: (value: unknown, row: Record<string, unknown>) => {
                  if (col.key === 'prop') {
                    return (
                      <code className="text-xs bg-muted/10 px-1 py-0.5 rounded">
                        {String(value)}
                      </code>
                    );
                  }
                  if (col.key === 'context') {
                    const v = String(value);
                    return (
                      <Badge
                        className={
                          v === 'empty'
                            ? 'bg-muted/20 text-muted'
                            : v === 'error'
                              ? 'bg-danger/15 text-danger'
                              : 'bg-brand/15 text-brand'
                        }
                      >
                        {v}
                      </Badge>
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
              data={messageProps}
            />
          </div>
        </CardTitle>
      </CardContainer>

      {/* Basic */}
      <CardContainer>
        <CardTitle title="Basic State Messages">
          <div className="px-4 pb-4 space-y-4">
            <Typography tag="p" className="text-sm text-muted">
              Provide messages for both empty and error states. The correct
              message is shown automatically based on <code>isError</code> and
              whether <code>data</code> is empty.
            </Typography>
            <CodeBlock language="tsx" code={codeBasic} />
          </div>
        </CardTitle>
      </CardContainer>

      {/* Contextual */}
      <CardContainer>
        <CardTitle title="Contextual Empty States">
          <div className="px-4 pb-4 space-y-4">
            <Typography tag="p" className="text-sm text-muted">
              Differentiate empty state messaging based on whether the user has
              applied filters, providing more actionable feedback.
            </Typography>
            <CodeBlock language="tsx" code={codeContextual} />
          </div>
        </CardTitle>
      </CardContainer>

      {/* Hide Support */}
      <CardContainer>
        <CardTitle title="Hide Support Link">
          <div className="px-4 pb-4 space-y-4">
            <Typography tag="p" className="text-sm text-muted">
              For internal tools or non-critical errors, hide the support link
              with <code>hideContactSupport: true</code>.
            </Typography>
            <CodeBlock language="tsx" code={codeHideSupport} />
          </div>
        </CardTitle>
      </CardContainer>
    </div>
  );
}

export default StateMessagesSection;
