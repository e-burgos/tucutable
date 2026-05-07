import {
  Typography,
  CardContainer,
  CardTitle,
  BasicTable,
  CodeBlock,
  Badge,
  Alert,
} from '@e-burgos/tucu-ui';

const subComponentProps = [
  {
    prop: 'row',
    type: 'Row<T>',
    description: 'The expanded TanStack Row object. Access .original for data.',
  },
  {
    prop: 'columns',
    type: 'ColumnDef<T>[]',
    description: 'The column definitions passed to the parent table.',
  },
];

const subDataTableProps = [
  {
    prop: 'columns',
    type: 'ColumnDef<any>[]',
    required: 'Yes',
    description: 'Columns for the nested table.',
  },
  {
    prop: 'data',
    type: 'T[]',
    required: 'Yes',
    description: 'Data for the nested table (typically from parent row).',
  },
  {
    prop: 'expandedColumnSize',
    type: 'number',
    required: 'No',
    description: 'Width (px) of the expand toggle column. Default: 40.',
  },
];

const propsTableColumns = [
  { key: 'prop', label: 'Prop' },
  { key: 'type', label: 'Type' },
  { key: 'description', label: 'Description' },
];

const subDataTableColumns = [
  { key: 'prop', label: 'Prop' },
  { key: 'type', label: 'Type' },
  { key: 'required', label: 'Req.' },
  { key: 'description', label: 'Description' },
];

const codeSubComponent = `import { DataTable } from '@e-burgos/tucutable';
import type { SubComponentProps } from '@e-burgos/tucutable';

type Order = {
  id: number;
  customer: string;
  total: number;
  items: OrderItem[];
};

function OrderDetail({ row }: SubComponentProps<Order>) {
  if (!row) return null;
  const order = row.original;
  return (
    <div className="p-4 bg-muted/5 space-y-2">
      <h3 className="font-semibold">Order #{order.id} Details</h3>
      <ul className="text-sm space-y-1">
        {order.items.map((item) => (
          <li key={item.id} className="flex justify-between">
            <span>{item.name}</span>
            <span>\${item.price}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function OrdersTable() {
  return (
    <DataTable
      tableId="orders-expandable"
      data={orders}
      columns={columns}
      renderSubComponent={OrderDetail}
    />
  );
}`;

const codeSubDataTable = `import { DataTable } from '@e-burgos/tucutable';
import type { IRenderSubDataTable } from '@e-burgos/tucutable';

// Sub-table column definitions
const itemColumns: TanstackTable.ColumnDef<OrderItem>[] = [
  { accessorKey: 'name', header: 'Item' },
  { accessorKey: 'qty', header: 'Qty', size: 80 },
  { accessorKey: 'price', header: 'Price', size: 100 },
];

// The sub-table config
// NOTE: data is static here; for dynamic data per row use renderSubComponent
const subTable: IRenderSubDataTable = {
  columns: itemColumns,
  data: allItems,  // or filtered per parent row in a custom wrapper
  expandedColumnSize: 40,
};

function OrdersTable() {
  return (
    <DataTable
      tableId="orders-nested"
      data={orders}
      columns={columns}
      renderSubDataTable={subTable}
    />
  );
}`;

const codeDynamicSubTable = `// For truly dynamic sub-table data (different per row), use renderSubComponent
// and render a <DataTable> inside it:
import { DataTable } from '@e-burgos/tucutable';
import type { SubComponentProps } from '@e-burgos/tucutable';

function OrderItemsSubTable({ row }: SubComponentProps<Order>) {
  if (!row) return null;
  return (
    <div className="p-4">
      <DataTable
        tableId={\`order-items-\${row.original.id}\`}
        data={row.original.items}
        columns={itemColumns}
        pagination={{ showPagination: false }}
      />
    </div>
  );
}

<DataTable
  tableId="orders-with-sub-table"
  data={orders}
  columns={orderColumns}
  renderSubComponent={OrderItemsSubTable}
/>`;

function ExpandableRowsSection() {
  return (
    <div className="space-y-8">
      <div>
        <Typography tag="h2" className="text-2xl font-bold mb-2">
          Expandable Rows
        </Typography>
        <Typography tag="p" className="text-muted">
          Add expand/collapse toggles to display row detail panels or nested
          data tables. Use <code>renderSubComponent</code> for custom content or{' '}
          <code>renderSubDataTable</code> for a built-in nested table.
        </Typography>
      </div>

      {/* Which to use */}
      <CardContainer>
        <CardTitle title="renderSubComponent vs renderSubDataTable">
          <div className="px-4 pb-4 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 border border-border rounded-lg space-y-2">
                <div className="flex items-center gap-2">
                  <Badge className="bg-brand/15 text-brand">
                    renderSubComponent
                  </Badge>
                </div>
                <Typography tag="p" className="text-sm text-muted">
                  Full JSX control. Render anything: forms, charts, nested
                  DataTable with dynamic data, collapsible sections, etc.
                </Typography>
                <Typography tag="p" className="text-xs text-muted">
                  Props: <code>row</code> + <code>columns</code>
                </Typography>
              </div>
              <div className="p-4 border border-border rounded-lg space-y-2">
                <div className="flex items-center gap-2">
                  <Badge className="bg-success/15 text-success">
                    renderSubDataTable
                  </Badge>
                </div>
                <Typography tag="p" className="text-sm text-muted">
                  Quick nested table. Pass <code>columns</code> +{' '}
                  <code>data</code> and tucutable renders a sub-table
                  automatically.
                </Typography>
                <Typography tag="p" className="text-xs text-muted">
                  Best for static sub-table data.
                </Typography>
              </div>
            </div>
          </div>
        </CardTitle>
      </CardContainer>

      {/* SubComponentProps */}
      <CardContainer>
        <CardTitle title="SubComponentProps">
          <div className="px-4 pb-4">
            <BasicTable
              columns={propsTableColumns.map((col) => ({
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
                      {String(row['description'] ?? value)}
                    </span>
                  );
                },
              }))}
              data={subComponentProps}
            />
          </div>
        </CardTitle>
      </CardContainer>

      {/* renderSubComponent */}
      <CardContainer>
        <CardTitle title="renderSubComponent — Custom Detail Panel">
          <div className="px-4 pb-4 space-y-4">
            <Typography tag="p" className="text-sm text-muted">
              Pass a React component that receives{' '}
              <code>SubComponentProps&lt;T&gt;</code>. Access{' '}
              <code>row.original</code> for full row data.
            </Typography>
            <CodeBlock language="tsx" code={codeSubComponent} />
          </div>
        </CardTitle>
      </CardContainer>

      {/* IRenderSubDataTable */}
      <CardContainer>
        <CardTitle title="IRenderSubDataTable Props">
          <div className="px-4 pb-4 space-y-4">
            <BasicTable
              columns={subDataTableColumns.map((col) => ({
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
              data={subDataTableProps}
            />
            <CodeBlock language="tsx" code={codeSubDataTable} />
          </div>
        </CardTitle>
      </CardContainer>

      {/* Dynamic Sub-Table */}
      <CardContainer>
        <CardTitle title="Dynamic Sub-Table per Row">
          <div className="px-4 pb-4 space-y-4">
            <Alert>
              <Typography tag="p" className="text-sm">
                <strong>Tip:</strong> When each row needs its own sub-table data
                (e.g. different items per order), nest a full{' '}
                <code>DataTable</code> inside <code>renderSubComponent</code>.
                Use <code>tableId</code> with a row identifier to keep each
                sub-table's state isolated.
              </Typography>
            </Alert>
            <CodeBlock language="tsx" code={codeDynamicSubTable} />
          </div>
        </CardTitle>
      </CardContainer>
    </div>
  );
}

export default ExpandableRowsSection;
