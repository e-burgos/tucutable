import {
  Typography,
  CardContainer,
  CardTitle,
  BasicTable,
  CodeBlock,
  Badge,
  Alert,
} from '@e-burgos/tucu-ui';

const selectionProps = [
  {
    prop: 'type',
    type: "'checkbox' | 'radio'",
    required: 'Yes',
    description: 'Checkbox allows multi-row selection; radio restricts to one.',
  },
  {
    prop: 'getSelection',
    type: '(rows: Row<T>[]) => void',
    required: 'Yes',
    description:
      'Callback fired on every selection change. Receives selected Row objects.',
  },
];

const propsTableColumns = [
  { key: 'prop', label: 'Prop' },
  { key: 'type', label: 'Type' },
  { key: 'required', label: 'Req.' },
  { key: 'description', label: 'Description' },
];

const comparisonData = [
  {
    aspect: 'Max selected rows',
    checkbox: 'Unlimited',
    radio: 'Exactly 1',
  },
  {
    aspect: 'UI element',
    checkbox: 'MultiSelect checkbox column',
    radio: 'Single-select radio column',
  },
  {
    aspect: 'Deselect possible?',
    checkbox: 'Yes (uncheck)',
    radio: 'No (click another row)',
  },
  {
    aspect: 'Use case',
    checkbox: 'Bulk operations (delete, export)',
    radio: 'Detail panel / form population',
  },
];

const comparisonColumns = [
  { key: 'aspect', label: 'Aspect' },
  { key: 'checkbox', label: 'checkbox' },
  { key: 'radio', label: 'radio' },
];

const codeCheckbox = `import { DataTable } from '@e-burgos/tucutable';

function UsersTable() {
  const [selected, setSelected] = useState<User[]>([]);

  return (
    <>
      <DataTable
        tableId="users-multi-select"
        data={users}
        columns={columns}
        rowSelection={{
          type: 'checkbox',
          getSelection: (rows) => {
            setSelected(rows.map((r) => r.original));
          },
        }}
      />
      <p>{selected.length} users selected</p>
    </>
  );
}`;

const codeRadio = `import { DataTable } from '@e-burgos/tucutable';

function OrdersTable() {
  const [current, setCurrent] = useState<Order | null>(null);

  return (
    <div className="grid grid-cols-2 gap-4">
      <DataTable
        tableId="orders-single-select"
        data={orders}
        columns={columns}
        rowSelection={{
          type: 'radio',
          getSelection: (rows) => {
            setCurrent(rows[0]?.original ?? null);
          },
        }}
      />
      {current && <OrderDetail order={current} />}
    </div>
  );
}`;

const codeBulkAction = `import { DataTable } from '@e-burgos/tucutable';
import type { Row } from '@tanstack/react-table';

function InvoicesTable() {
  const [selectedRows, setSelectedRows] = useState<Row<Invoice>[]>([]);

  const handleBulkDelete = () => {
    const ids = selectedRows.map((r) => r.original.id);
    deleteInvoices(ids);
  };

  return (
    <div className="space-y-4">
      {selectedRows.length > 0 && (
        <div className="flex items-center gap-3 p-2 bg-muted/10 rounded">
          <span className="text-sm font-medium">
            {selectedRows.length} selected
          </span>
          <button onClick={handleBulkDelete} className="text-danger text-sm">
            Delete selected
          </button>
        </div>
      )}
      <DataTable
        tableId="invoices-bulk"
        data={invoices}
        columns={columns}
        rowSelection={{
          type: 'checkbox',
          getSelection: setSelectedRows,
        }}
      />
    </div>
  );
}`;

function RowSelectionSection() {
  return (
    <div className="space-y-8">
      <div>
        <Typography tag="h2" className="text-2xl font-bold mb-2">
          Row Selection
        </Typography>
        <Typography tag="p" className="text-muted">
          Enable checkbox or radio row selection with a single prop. The{' '}
          <code>getSelection</code> callback delivers the full TanStack{' '}
          <code>Row&lt;T&gt;</code> objects, giving access to original data, row
          index, and all table methods.
        </Typography>
      </div>

      {/* Comparison */}
      <CardContainer>
        <CardTitle title="checkbox vs radio">
          <div className="px-4 pb-4">
            <BasicTable
              columns={comparisonColumns.map((col) => ({
                ...col,
                render: (value: unknown) => (
                  <span className="text-sm">{String(value)}</span>
                ),
              }))}
              data={comparisonData}
            />
          </div>
        </CardTitle>
      </CardContainer>

      {/* Props */}
      <CardContainer>
        <CardTitle title="IRowSelection Props">
          <div className="px-4 pb-4">
            <BasicTable
              columns={propsTableColumns.map((col) => ({
                ...col,
                render: (value: unknown, row: Record<string, unknown>) => {
                  if (col.key === 'required') {
                    return (
                      <Badge className="bg-danger/15 text-danger">
                        {String(value)}
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
              data={selectionProps}
            />
          </div>
        </CardTitle>
      </CardContainer>

      {/* Checkbox */}
      <CardContainer>
        <CardTitle title="Multi-Select (checkbox)">
          <div className="px-4 pb-4 space-y-4">
            <Typography tag="p" className="text-sm text-muted">
              Suitable for bulk operations. The <code>RowSelectionColumn</code>{' '}
              is automatically prepended with a header checkbox to
              select/deselect all rows.
            </Typography>
            <CodeBlock language="tsx" code={codeCheckbox} />
          </div>
        </CardTitle>
      </CardContainer>

      {/* Radio */}
      <CardContainer>
        <CardTitle title="Single-Select (radio)">
          <div className="px-4 pb-4 space-y-4">
            <Typography tag="p" className="text-sm text-muted">
              Ideal for detail panels. Only one row can be active at a time.
              Clicking a new row deselects the previous.
            </Typography>
            <CodeBlock language="tsx" code={codeRadio} />
          </div>
        </CardTitle>
      </CardContainer>

      {/* Bulk Actions Pattern */}
      <CardContainer>
        <CardTitle title="Bulk Action Pattern">
          <div className="px-4 pb-4 space-y-4">
            <Alert>
              <Typography tag="p" className="text-sm">
                The <code>getSelection</code> callback receives the full{' '}
                <code>Row&lt;T&gt;[]</code> array — not just IDs. You can access{' '}
                <code>row.original</code>, <code>row.index</code>, or call any
                TanStack Row method.
              </Typography>
            </Alert>
            <CodeBlock language="tsx" code={codeBulkAction} />
          </div>
        </CardTitle>
      </CardContainer>
    </div>
  );
}

export default RowSelectionSection;
