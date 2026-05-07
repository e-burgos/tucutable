import {
  Typography,
  CardContainer,
  CardTitle,
  CodeBlock,
  Alert,
} from '@e-burgos/tucu-ui';

const codeSetCurrentRow = `import { DataTable } from '@e-burgos/tucutable';
import type { Row } from '@tanstack/react-table';

type Product = { id: number; name: string; price: number };

function ProductsTable() {
  const [selected, setSelected] = useState<Product | null>(null);

  const handleRowClick = (row: Row<Product>) => {
    setSelected(row.original);
  };

  return (
    <div className="grid grid-cols-3 gap-6">
      <div className="col-span-2">
        <DataTable
          tableId="products-click"
          data={products}
          columns={columns}
          setCurrentRow={handleRowClick}
        />
      </div>
      <div>
        {selected && (
          <div className="p-4 border border-border rounded-lg">
            <h3 className="font-semibold">{selected.name}</h3>
            <p className="text-muted text-sm">\${selected.price}</p>
          </div>
        )}
      </div>
    </div>
  );
}`;

const codeWithSx = `// Enhance row click with visual feedback using sx prop
<DataTable
  tableId="clickable-rows"
  data={data}
  columns={columns}
  setCurrentRow={(row) => setCurrentProduct(row.original)}
  sx={{
    row: { cursor: 'pointer' },
  }}
/>`;

const codeNavigate = `import { useNavigate } from 'react-router-dom';
import { DataTable } from '@e-burgos/tucutable';
import type { Row } from '@tanstack/react-table';

function OrdersTable() {
  const navigate = useNavigate();

  return (
    <DataTable
      tableId="orders-nav"
      data={orders}
      columns={columns}
      setCurrentRow={(row: Row<Order>) => {
        navigate(\`/orders/\${row.original.id}\`);
      }}
      sx={{ row: { cursor: 'pointer' } }}
    />
  );
}`;

const codeCombined = `// Combine setCurrentRow with row actions for different interactions
<DataTable
  tableId="combined-row"
  data={data}
  columns={columns}
  // Row click → open side panel
  setCurrentRow={(row) => openPanel(row.original)}
  // Action buttons → specific actions
  rowActions={[
    {
      action: 'edit',
      label: () => 'Edit',
      onClick: (row) => openEditModal(row.original),
    },
    {
      action: 'delete',
      label: () => 'Delete',
      onClick: (row) => confirmDelete(row.original),
    },
  ]}
  sx={{ row: { cursor: 'pointer' } }}
/>`;

function RowClickSection() {
  return (
    <div className="space-y-8">
      <div>
        <Typography tag="h2" className="text-2xl font-bold mb-2">
          Row Click (setCurrentRow)
        </Typography>
        <Typography tag="p" className="text-muted">
          The <code>setCurrentRow</code> prop fires a callback whenever the user
          clicks anywhere on a row (outside action buttons). Use it to open
          detail panels, navigate to a detail route, or populate a form.
        </Typography>
      </div>

      {/* Basic Usage */}
      <CardContainer>
        <CardTitle title="Basic — Detail Panel">
          <div className="px-4 pb-4 space-y-4">
            <Typography tag="p" className="text-sm text-muted">
              <code>setCurrentRow</code> receives the full TanStack{' '}
              <code>Row&lt;T&gt;</code>. Access <code>row.original</code> for
              raw data, or use any TanStack Row method.
            </Typography>
            <CodeBlock language="tsx" code={codeSetCurrentRow} />
          </div>
        </CardTitle>
      </CardContainer>

      {/* Cursor Pointer */}
      <CardContainer>
        <CardTitle title="Visual Feedback with sx">
          <div className="px-4 pb-4 space-y-4">
            <Alert>
              <Typography tag="p" className="text-sm">
                When using <code>setCurrentRow</code>, add{' '}
                <code>sx={'{ row: { cursor: "pointer" } }'}</code> to signal
                that rows are clickable. See the <strong>Styling Guide</strong>{' '}
                for all <code>sx</code> options.
              </Typography>
            </Alert>
            <CodeBlock language="tsx" code={codeWithSx} />
          </div>
        </CardTitle>
      </CardContainer>

      {/* Navigate */}
      <CardContainer>
        <CardTitle title="Row Click to Navigate">
          <div className="px-4 pb-4 space-y-4">
            <Typography tag="p" className="text-sm text-muted">
              Combine <code>setCurrentRow</code> with React Router's{' '}
              <code>useNavigate</code> to turn rows into navigation links.
            </Typography>
            <CodeBlock language="tsx" code={codeNavigate} />
          </div>
        </CardTitle>
      </CardContainer>

      {/* Combined */}
      <CardContainer>
        <CardTitle title="Combined with Row Actions">
          <div className="px-4 pb-4 space-y-4">
            <Typography tag="p" className="text-sm text-muted">
              <code>setCurrentRow</code> and <code>rowActions</code> work
              independently. Row click fires on the row body; action clicks fire
              only on action icons and do not bubble to{' '}
              <code>setCurrentRow</code>.
            </Typography>
            <CodeBlock language="tsx" code={codeCombined} />
          </div>
        </CardTitle>
      </CardContainer>
    </div>
  );
}

export default RowClickSection;
