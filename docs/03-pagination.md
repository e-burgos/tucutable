# Pagination — Plan de implementación

**Ruta objetivo:** `apps/demo/src/pages/pagination/`

**Tipo de página:** Type B — `DynamicSectionsPage` con `TableOfContents` + lazy sections

---

## Estructura de archivos

```
apps/demo/src/pages/pagination/
├── index.tsx
├── hooks/
│   └── usePaginationDemoData.ts    // Mock data estático para demos
└── sections/
    ├── IntroSection.tsx            // Tipos de paginación, comparativa
    ├── ClientSideSection.tsx       // Paginación automática de tucutable
    ├── ServerSideSection.tsx       // IManualPaginationOptions + hook externo
    ├── ManualSection.tsx           // ManualPaginationState + control manual
    └── ConfigReferenceSection.tsx  // AutoPropsTable completo de IPaginationOptions
```

---

## Secciones del TOC

```
intro                → Introduction
client-side          → Client-Side Pagination
server-side          → Server-Side (Manual) Pagination
  ├── server-setup   → Setting Up Manual Pagination
  └── server-state   → State Management
manual               → Fully Manual Pagination
config-reference     → Configuration Reference
```

---

## Tipos de datos documentados

De `ui/tucutable/src/common/types/index.ts`:

### `IPaginationOptions`

```ts
interface IPaginationOptions {
  showPagination?: boolean; // default: true
  defaultPageSize?: number; // default: 10
  showRowsPerPage?: boolean; // default: true
  pageSizeOptions?: number[]; // default: [5, 10, 25, 50, 100]
  showFirstButton?: boolean; // default: true
  showLastButton?: boolean; // default: true
  showPreviousButton?: boolean; // default: true
  showNextButton?: boolean; // default: true
  showPageNumbers?: boolean; // default: true
  showPageCount?: boolean; // default: true
  showCurrentPage?: boolean; // default: true
  showTotalCount?: boolean; // default: true
}
```

### `IManualPaginationOptions`

```ts
interface IManualPaginationOptions {
  enabled: boolean; // required: true to activate manual pagination
  totalCount: number; // required: total number of records (for page count)
  pageCount?: number; // optional: explicit page count override
  paginationState?: PaginationState; // optional: external pagination state
  onPaginationChange?: OnChangeFn<PaginationState>; // optional: state change handler
}
```

### `IServerPagination`

```ts
interface IServerPagination {
  manualPagination: IManualPaginationOptions;
  pagination?: IPaginationOptions; // display configuration still applies
}
```

### `ManualPaginationState`

```ts
interface ManualPaginationState {
  pageIndex: number;
  pageSize: number;
}
```

---

## Borradores de secciones

### `sections/IntroSection.tsx`

```tsx
<CardContainer>
  <CardTitle title="Pagination Overview">
    <Typography tag="p">Tucutable supports three pagination modes — each designed for a different data access pattern.</Typography>

    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
      {[
        {
          title: 'Client-Side',
          icon: <LucideIcons.Monitor />,
          description: 'All data loaded upfront. Table handles page splits automatically.',
          when: 'Best for < 1,000 rows',
        },
        {
          title: 'Server-Side',
          icon: <LucideIcons.Server />,
          description: 'Data fetched per page. Table sends pageIndex + pageSize to your API.',
          when: 'Best for large datasets',
        },
        {
          title: 'Manual',
          icon: <LucideIcons.Settings />,
          description: 'You control the pagination state entirely. Full control.',
          when: 'Best for custom APIs',
        },
      ]}
    </div>

    <Alert variant="info">
      The pagination display (buttons, page count, rows-per-page selector) is the same regardless of pagination mode — configured via <code>pagination</code> prop.
    </Alert>
  </CardTitle>
</CardContainer>
```

---

### `sections/ClientSideSection.tsx`

```tsx
// Contenido:
// - Cómo funciona (data completa, tucutable pagina internamente)
// - PropPlayground con todos los controles visuales
// - AutoPropsTable con IPaginationOptions

<PropPlayground
  title="Client-Side Pagination Playground"
  controls={[
    { type: 'boolean', prop: 'showPagination',  label: 'Show Pagination',  defaultValue: true  },
    { type: 'number',  prop: 'defaultPageSize', label: 'Page Size',        defaultValue: 5, min: 3, max: 20, step: 1 },
    { type: 'boolean', prop: 'showRowsPerPage', label: 'Rows Per Page',    defaultValue: true  },
    { type: 'boolean', prop: 'showFirstButton', label: 'First/Last Buttons', defaultValue: true },
    { type: 'boolean', prop: 'showPageCount',   label: 'Page Count',       defaultValue: true  },
    { type: 'boolean', prop: 'showTotalCount',  label: 'Total Count',      defaultValue: true  },
  ]}
  renderDemo={(vals) => (
    <DataTable
      tableId="client-pagination-demo"
      data={PAGINATION_DEMO_DATA}
      columns={paginationColumns}
      pagination={{
        showPagination:  vals.showPagination  as boolean,
        defaultPageSize: vals.defaultPageSize as number,
        showRowsPerPage: vals.showRowsPerPage as boolean,
        showFirstButton: vals.showFirstButton as boolean,
        showPageCount:   vals.showPageCount   as boolean,
        showTotalCount:  vals.showTotalCount  as boolean,
      }}
    />
  )}
  renderCode={(vals) => `<DataTable
  data={data}
  columns={columns}
  pagination={{
    showPagination:  ${vals.showPagination},
    defaultPageSize: ${vals.defaultPageSize},
    showRowsPerPage: ${vals.showRowsPerPage},
    showFirstButton: ${vals.showFirstButton},
    showPageCount:   ${vals.showPageCount},
    showTotalCount:  ${vals.showTotalCount},
  }}
/>`}
/>

<AutoPropsTable
  title="IPaginationOptions Reference"
  props={[
    { prop: 'showPagination',    type: 'boolean',  default: 'true', description: 'Show or hide the pagination bar entirely' },
    { prop: 'defaultPageSize',   type: 'number',   default: '10',   description: 'Initial page size' },
    { prop: 'showRowsPerPage',   type: 'boolean',  default: 'true', description: 'Show rows-per-page dropdown' },
    { prop: 'pageSizeOptions',   type: 'number[]', default: '[5,10,25,50,100]', description: 'Available page size options' },
    { prop: 'showFirstButton',   type: 'boolean',  default: 'true', description: 'Show "First page" button' },
    { prop: 'showLastButton',    type: 'boolean',  default: 'true', description: 'Show "Last page" button' },
    { prop: 'showPreviousButton',type: 'boolean',  default: 'true', description: 'Show "Previous page" button' },
    { prop: 'showNextButton',    type: 'boolean',  default: 'true', description: 'Show "Next page" button' },
    { prop: 'showPageNumbers',   type: 'boolean',  default: 'true', description: 'Show numbered page buttons' },
    { prop: 'showPageCount',     type: 'boolean',  default: 'true', description: 'Show "Page X of Y" indicator' },
    { prop: 'showCurrentPage',   type: 'boolean',  default: 'true', description: 'Show current page number in header' },
    { prop: 'showTotalCount',    type: 'boolean',  default: 'true', description: 'Show total row count' },
  ]}
/>
```

---

### `sections/ServerSideSection.tsx`

```tsx
// Contenido:
// - Explicación de flujo: tabla emite pageIndex+pageSize → fetch → tabla recibe datos
// - Diagrama de flujo (usando Typography + list o mermaid-style con CSS)
// - CodeBlock: React.useState para pagination state
// - CodeBlock: hook de fetch con paginationState como dependencia
// - CodeBlock: DataTable con serverPagination prop
// - Demo live usando la Star Wars API (ya existe en basic-usage)
//   → Reutilizar useStarWarsPeople hook existente

<Alert variant="warning">
  For server-side pagination, you must pass <code>totalCount</code> to
  <code>serverPagination.manualPagination</code> — without it the page count
  cannot be calculated.
</Alert>

<CodeBlock
  language="tsx"
  code={`import { useState } from 'react';
import { DataTable, TanstackTable } from '@e-burgos/tucutable';

function ServerPaginatedTable() {
  const [pagination, setPagination] = useState<TanstackTable.PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  const { data, totalCount, isLoading } = useMyRemoteData({ pagination });

  return (
    <DataTable
      tableId="server-table"
      data={data ?? []}
      columns={columns}
      isLoading={isLoading}
      serverPagination={{
        manualPagination: {
          enabled: true,
          totalCount: totalCount,
          paginationState: pagination,
          onPaginationChange: setPagination,
        },
      }}
      pagination={{
        showPagination: true,
        defaultPageSize: 10,
      }}
    />
  );
}`}
/>

// AutoPropsTable con IManualPaginationOptions
<AutoPropsTable
  title="IManualPaginationOptions Reference"
  props={[
    { prop: 'enabled',           type: 'boolean',               required: true,  description: 'Must be true to activate server-side pagination mode' },
    { prop: 'totalCount',        type: 'number',                required: true,  description: 'Total number of records across all pages (from API)' },
    { prop: 'pageCount',         type: 'number',                required: false, description: 'Explicit page count override — if omitted, calculated from totalCount ÷ pageSize' },
    { prop: 'paginationState',   type: 'PaginationState',       required: false, description: 'External pagination state (pageIndex, pageSize) to sync with component state' },
    { prop: 'onPaginationChange',type: 'OnChangeFn<PaginationState>', required: false, description: 'Callback fired when table changes page or page size' },
  ]}
/>
```

---

### `sections/ManualSection.tsx`

```tsx
// Contenido:
// - Diferencia entre server-side y fully manual
// - Cuándo usar: cuando quieres controlar absolutamente todo
// - CodeBlock: control manual sin onPaginationChange callback
// - Alert: tip sobre useEffect con fetchPage

<Alert variant="info">
  Fully manual pagination is useful when your data fetching is event-driven
  (e.g., websockets, polling) and you prefer to push state to the table rather
  than react to table state changes.
</Alert>

<CodeBlock
  language="tsx"
  code={`// Fully manual: you push data + page state, table just renders
function ManualTable() {
  const [page, setPage] = useState(0);
  const [data, setData] = useState<Row[]>([]);
  const [total, setTotal] = useState(0);

  const fetchPage = async (pageIndex: number) => {
    const result = await api.getPage(pageIndex, 10);
    setData(result.rows);
    setTotal(result.total);
    setPage(pageIndex);
  };

  useEffect(() => { fetchPage(0); }, []);

  return (
    <DataTable
      tableId="manual-table"
      data={data}
      columns={columns}
      serverPagination={{
        manualPagination: {
          enabled: true,
          totalCount: total,
          paginationState: { pageIndex: page, pageSize: 10 },
          onPaginationChange: (updater) => {
            const next = typeof updater === 'function'
              ? updater({ pageIndex: page, pageSize: 10 })
              : updater;
            fetchPage(next.pageIndex);
          },
        },
      }}
    />
  );
}`}
/>
```

---

### `sections/ConfigReferenceSection.tsx`

```tsx
// Full props reference con AutoPropsTable para:
// 1. IPaginationOptions (completo)
// 2. IManualPaginationOptions (completo)
// 3. IServerPagination (wrapper que combina ambos)

// Tabla comparativa: "Which pagination mode should I use?"
<CardContainer>
  <CardTitle title="Choosing a Pagination Mode">
    <table>
      <thead>...</thead>
      <tbody>
        <tr>
          <td>Client-Side</td>
          <td>
            Pass <code>pagination</code> only
          </td>
          <td>All data available upfront</td>
          <td>&lt; 1,000 rows</td>
        </tr>
        <tr>
          <td>Server-Side</td>
          <td>
            <code>serverPagination.manualPagination.enabled: true</code>
          </td>
          <td>Data fetched per page change</td>
          <td>Any large dataset with API</td>
        </tr>
      </tbody>
    </table>
  </CardTitle>
</CardContainer>
```

---

## Página `index.tsx`

```tsx
// apps/demo/src/pages/pagination/index.tsx
import { lazy } from 'react';
import { DynamicSectionsPage } from '../../components/DynamicSectionsPage';
import HeroPage from '../../components/HeroPage';

const IntroSection = lazy(() => import('./sections/IntroSection'));
const ClientSideSection = lazy(() => import('./sections/ClientSideSection'));
const ServerSideSection = lazy(() => import('./sections/ServerSideSection'));
const ManualSection = lazy(() => import('./sections/ManualSection'));
const ConfigRefSection = lazy(() => import('./sections/ConfigReferenceSection'));

export function PaginationPage() {
  return (
    <DynamicSectionsPage
      hero={<HeroPage title="Pagination" description="Complete guide to client-side, server-side, and manual pagination in Tucutable. Includes live examples and full configuration reference." />}
      sections={[
        { id: 'intro', label: 'Introduction', component: IntroSection },
        { id: 'client-side', label: 'Client-Side Pagination', component: ClientSideSection },
        { id: 'server-side', label: 'Server-Side Pagination', component: ServerSideSection, children: [{ id: 'server-setup', label: 'Setup', component: ServerSideSection }] },
        { id: 'manual', label: 'Manual Pagination', component: ManualSection },
        { id: 'config-reference', label: 'Configuration Reference', component: ConfigRefSection },
      ]}
    />
  );
}
```

---

## Mock data

```tsx
// apps/demo/src/pages/pagination/hooks/usePaginationDemoData.ts
export interface PaginationDemoRow {
  id: number;
  product: string;
  category: string;
  price: number;
  stock: number;
  sku: string;
}

export const PAGINATION_DEMO_DATA: PaginationDemoRow[] = Array.from({ length: 100 }, (_, i) => ({
  id: i + 1,
  product: `Product ${i + 1}`,
  category: ['Electronics', 'Clothing', 'Food', 'Books', 'Toys'][i % 5],
  price: parseFloat((9.99 + i * 5.5).toFixed(2)),
  stock: Math.floor(Math.random() * 500),
  sku: `SKU-${String(i + 1).padStart(5, '0')}`,
}));
```

---

## Checklist de calidad

- [ ] `DynamicSectionsPage` con TOC "Introduction / Client-Side / Server-Side / Manual / Reference"
- [ ] `HeroPage` con título "Pagination"
- [ ] `IntroSection` con comparativa visual de los 3 modos
- [ ] `ClientSideSection` con `PropPlayground` (6+ controles) + `AutoPropsTable`
- [ ] `ServerSideSection` con diagrama de flujo + `CodeBlock` completo + `Alert`
- [ ] `ManualSection` con `CodeBlock` + `Alert` de cuándo usar
- [ ] `ConfigReferenceSection` con las 3 tablas de AutoPropsTable
- [ ] Live demo en `ClientSideSection` con 100 filas de datos estáticos
- [ ] Live demo en `ServerSideSection` reutilizando Star Wars API hook
- [ ] Responsive / dark mode
