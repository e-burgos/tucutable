import {
  Typography,
  CardContainer,
  CardTitle,
  BasicTable,
  CodeBlock,
  Alert,
} from '@e-burgos/tucu-ui';

const sortingPropsData = [
  {
    prop: 'manualSorting',
    type: 'boolean',
    description:
      'Disables client-side sorting. You handle sorting server-side.',
  },
  {
    prop: 'onSortModelChange',
    type: '(model: SortingState) => void',
    description:
      'Callback fired when sort order changes. Receives TanStack SortingState.',
  },
  {
    prop: 'enableMultiSort',
    type: 'boolean',
    description:
      'Allow sorting by multiple columns simultaneously (Shift+click).',
  },
];

const sortingStateData = [
  {
    field: 'id',
    type: 'string',
    description: 'Column id as defined in ColumnDef.',
  },
  {
    field: 'desc',
    type: 'boolean',
    description: 'true = descending, false = ascending.',
  },
];

const propsColumns = [
  { key: 'prop', label: 'Prop' },
  { key: 'type', label: 'Type' },
  { key: 'description', label: 'Description' },
];

const stateColumns = [
  { key: 'field', label: 'Field' },
  { key: 'type', label: 'Type' },
  { key: 'description', label: 'Description' },
];

const codeClientSort = `// Client-side sorting (default — no config needed)
// Just enable the header sort control per-column via headerOptions
<DataTable
  tableId="client-sort"
  data={data}
  columns={columns}
  headerOptions={{ enableSortColumns: true }}
/>

// Or enable sorting per column in ColumnDef
const columns: TanstackTable.ColumnDef<User>[] = [
  {
    accessorKey: 'name',
    header: 'Name',
    enableSorting: true,        // enable on this column
    sortingFn: 'alphanumeric',  // built-in: 'alphanumeric' | 'text' | 'datetime' | 'basic'
  },
  {
    accessorKey: 'age',
    header: 'Age',
    enableSorting: true,
  },
];`;

const codeServerSort = `import { useState } from 'react';
import type { TanstackTable } from '@e-burgos/tucutable';
import { DataTable } from '@e-burgos/tucutable';

function ServerSortedTable() {
  const [sortModel, setSortModel] = useState<TanstackTable.SortingState>([]);

  // Build your API query from sortModel
  // e.g. sortModel = [{ id: 'name', desc: false }]
  const { data } = useQuery({
    queryKey: ['users', sortModel],
    queryFn: () => fetchUsers({ sort: sortModel }),
  });

  return (
    <DataTable
      tableId="server-sorted"
      data={data ?? []}
      columns={columns}
      manualSorting={true}
      onSortModelChange={setSortModel}
      headerOptions={{ enableSortColumns: true }}
    />
  );
}`;

const codeMultiSort = `// Enable Shift+click to sort by multiple columns
<DataTable
  tableId="multi-sort"
  data={data}
  columns={columns}
  enableMultiSort={true}
  headerOptions={{ enableSortColumns: true }}
/>

// SortingState with multiple columns:
// [{ id: 'lastName', desc: false }, { id: 'firstName', desc: false }]`;

const codeCustomFn = `import { sortingCompareNumberFn, sortingCompareStringFn } from '@e-burgos/tucutable';

const columns: TanstackTable.ColumnDef<Product>[] = [
  {
    accessorKey: 'price',
    header: 'Price',
    sortingFn: (rowA, rowB) =>
      sortingCompareNumberFn(
        rowA.original.price,
        rowB.original.price,
      ),
  },
  {
    accessorKey: 'name',
    header: 'Name',
    sortingFn: (rowA, rowB) =>
      sortingCompareStringFn(
        rowA.original.name,
        rowB.original.name,
      ),
  },
];`;

function SortingSection() {
  return (
    <div className="space-y-8">
      <div>
        <Typography tag="h2" className="text-2xl font-bold mb-2">
          Sorting
        </Typography>
        <Typography tag="p" className="text-muted">
          Tucutable supports client-side sorting out of the box and server-side
          sorting via <code>manualSorting</code> +{' '}
          <code>onSortModelChange</code>. Enable multi-column sorting with a
          single boolean flag.
        </Typography>
      </div>

      {/* Props */}
      <CardContainer>
        <CardTitle title="Sorting Props">
          <div className="px-4 pb-4">
            <BasicTable
              columns={propsColumns.map((col) => ({
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
              data={sortingPropsData}
            />
          </div>
        </CardTitle>
      </CardContainer>

      {/* SortingState shape */}
      <CardContainer>
        <CardTitle title="TanstackTable.SortingState Shape">
          <div className="px-4 pb-4 space-y-4">
            <Typography tag="p" className="text-sm text-muted">
              <code>SortingState</code> is an array of sort descriptors. Each
              element has:
            </Typography>
            <BasicTable
              columns={stateColumns.map((col) => ({
                ...col,
                render: (value: unknown, row: Record<string, unknown>) => {
                  if (col.key === 'field') {
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
              data={sortingStateData}
            />
          </div>
        </CardTitle>
      </CardContainer>

      {/* Client Sort */}
      <CardContainer>
        <CardTitle title="Client-Side Sorting">
          <div className="px-4 pb-4 space-y-4">
            <Alert>
              <Typography tag="p" className="text-sm">
                Client-side sorting is the default. Enable it per column with{' '}
                <code>enableSorting: true</code> in the <code>ColumnDef</code>,
                or globally via <code>headerOptions.enableSortColumns</code>.
              </Typography>
            </Alert>
            <CodeBlock language="tsx" code={codeClientSort} />
          </div>
        </CardTitle>
      </CardContainer>

      {/* Server Sort */}
      <CardContainer>
        <CardTitle title="Server-Side Sorting">
          <div className="px-4 pb-4 space-y-4">
            <Typography tag="p" className="text-sm text-muted">
              Set <code>manualSorting</code> to prevent tucutable from sorting
              data locally. Use <code>onSortModelChange</code> to receive
              sorting state and pass it to your API.
            </Typography>
            <CodeBlock language="tsx" code={codeServerSort} />
          </div>
        </CardTitle>
      </CardContainer>

      {/* Multi Sort */}
      <CardContainer>
        <CardTitle title="Multi-Column Sorting">
          <div className="px-4 pb-4 space-y-4">
            <Typography tag="p" className="text-sm text-muted">
              With <code>enableMultiSort</code>, users can hold{' '}
              <strong>Shift</strong> and click additional column headers to sort
              by multiple columns at once.
            </Typography>
            <CodeBlock language="tsx" code={codeMultiSort} />
          </div>
        </CardTitle>
      </CardContainer>

      {/* Custom Sort Fn */}
      <CardContainer>
        <CardTitle title="Custom Sort Functions">
          <div className="px-4 pb-4 space-y-4">
            <Typography tag="p" className="text-sm text-muted">
              Use tucutable's built-in helpers{' '}
              <code>sortingCompareNumberFn</code> and{' '}
              <code>sortingCompareStringFn</code> for correct numeric and
              locale-aware string comparisons.
            </Typography>
            <CodeBlock language="tsx" code={codeCustomFn} />
          </div>
        </CardTitle>
      </CardContainer>
    </div>
  );
}

export default SortingSection;
