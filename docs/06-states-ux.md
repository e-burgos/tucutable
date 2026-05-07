# States & UX — Plan de implementación

**Ruta objetivo:** `apps/demo/src/pages/states-ux/`

**Tipo de página:** Type B — `DynamicSectionsPage` con `TableOfContents` + lazy sections

---

## Estructura de archivos

```
apps/demo/src/pages/states-ux/
├── index.tsx
└── sections/
    ├── IntroSection.tsx              // Overview de los estados
    ├── LoadingSection.tsx            // isLoading, skeleton, isFetching
    ├── ErrorSection.tsx              // isError, error handling
    ├── EmptySection.tsx              // No data — empty state
    └── StateMessagesSection.tsx      // IDataTableStateMessage — mensajes custom
```

---

## Secciones del TOC

```
intro           → Introduction
loading         → Loading State
error           → Error State
empty          → Empty State
state-messages  → Custom State Messages
```

---

## Tipos documentados

### `IDataTableStateMessage`

```ts
interface IDataTableStateMessage {
  // Loading state messages/content
  loadingTitle?: string;
  loadingDescription?: string;
  loadingComponent?: ReactNode; // custom loading component override

  // Error state messages/content
  errorTitle?: string;
  errorDescription?: string;
  errorComponent?: ReactNode; // custom error component override

  // Empty state messages/content
  emptyTitle?: string;
  emptyDescription?: string;
  emptyComponent?: ReactNode; // custom empty component override
}
```

> **Nota**: Verificar los props exactos con el tucutable-columns/tucutable-usage skill antes de implementar. Los nombres pueden variar.

---

## Borradores de secciones

### `sections/IntroSection.tsx`

```tsx
<CardContainer>
  <CardTitle title="State Management Overview">
    <Typography tag="p">Tucutable manages three UI states automatically: loading, error, and empty. Each has sensible defaults and full customization support.</Typography>

    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
      {[
        {
          title: 'Loading',
          icon: <LucideIcons.Loader2 className="w-5 h-5 animate-spin" />,
          description: 'Skeleton rows animate while data is loading',
          trigger: 'isLoading={true}',
          color: 'blue',
        },
        {
          title: 'Error',
          icon: <LucideIcons.AlertTriangle className="w-5 h-5" />,
          description: 'Error message with optional retry action',
          trigger: 'isError={true}',
          color: 'red',
        },
        {
          title: 'Empty',
          icon: <LucideIcons.Inbox className="w-5 h-5" />,
          description: 'Empty state when data array is empty',
          trigger: 'data={[]}',
          color: 'gray',
        },
      ].map((state) => (
        <CardContainer key={state.title} className="border-l-4 border-l-primary">
          <div className="p-4">
            <div className="flex items-center gap-2 mb-2">
              {state.icon}
              <Typography tag="h4" className="font-semibold">
                {state.title}
              </Typography>
            </div>
            <Typography tag="p" color="muted" className="text-sm mb-2">
              {state.description}
            </Typography>
            <code className="text-xs bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">{state.trigger}</code>
          </div>
        </CardContainer>
      ))}
    </div>
  </CardTitle>
</CardContainer>
```

---

### `sections/LoadingSection.tsx`

```tsx
// Demo con isLoading toggle
// Mostrar loading skeleton y isFetching (spinner sutil en paginación)

<PropPlayground
  title="Loading State Playground"
  controls={[
    { type: 'boolean', prop: 'isLoading',   label: 'Is Loading',   defaultValue: true  },
    { type: 'boolean', prop: 'isFetching',  label: 'Is Fetching',  defaultValue: false },
    { type: 'number',  prop: 'skeletonRows',label: 'Skeleton Rows',defaultValue: 5, min: 1, max: 20, step: 1 },
  ]}
  renderDemo={(vals) => (
    <DataTable
      tableId="loading-demo"
      data={vals.isLoading ? [] : STATES_DEMO_DATA}
      columns={statesColumns}
      isLoading={vals.isLoading as boolean}
      // isFetching si está disponible como prop
    />
  )}
  renderCode={(vals) => `<DataTable
  data={data}
  columns={columns}
  isLoading={${vals.isLoading}}
/>`}
/>

<CodeBlock
  language="tsx"
  code={`// With React Query
const { data, isLoading, isFetching } = useQuery({
  queryKey: ['users'],
  queryFn: fetchUsers,
});

return (
  <DataTable
    data={data ?? []}
    columns={columns}
    isLoading={isLoading}
    // isFetching shows subtle refresh indicator
  />
);`}
/>
```

---

### `sections/ErrorSection.tsx`

```tsx
<PropPlayground
  title="Error State Playground"
  controls={[
    { type: 'boolean', prop: 'isError', label: 'Is Error', defaultValue: true },
    { type: 'text',    prop: 'errorMsg',label: 'Error Title',  defaultValue: 'Failed to load data' },
  ]}
  renderDemo={(vals) => (
    <DataTable
      tableId="error-demo"
      data={[]}
      columns={statesColumns}
      isError={vals.isError as boolean}
      stateMessages={{
        errorTitle: vals.errorMsg as string,
        errorDescription: 'Please check your connection and try again.',
      }}
    />
  )}
/>

<CodeBlock
  language="tsx"
  code={`// Error with retry action
const { data, isError, refetch } = useQuery({ ... });

<DataTable
  data={data ?? []}
  columns={columns}
  isError={isError}
  stateMessages={{
    errorTitle: 'Connection Failed',
    errorDescription: 'Unable to reach the server.',
    // errorComponent: <CustomErrorView onRetry={refetch} />
  }}
/>`}
/>
```

---

### `sections/EmptySection.tsx`

```tsx
<PropPlayground
  title="Empty State Playground"
  controls={[
    { type: 'boolean', prop: 'showEmpty', label: 'Show Empty State', defaultValue: true },
    { type: 'text', prop: 'emptyTitle', label: 'Empty Title', defaultValue: 'No results found' },
    { type: 'text', prop: 'emptyDesc', label: 'Empty Description', defaultValue: 'Try adjusting your filters' },
  ]}
  renderDemo={(vals) => (
    <DataTable
      tableId="empty-demo"
      data={vals.showEmpty ? [] : STATES_DEMO_DATA.slice(0, 3)}
      columns={statesColumns}
      stateMessages={{
        emptyTitle: vals.emptyTitle as string,
        emptyDescription: vals.emptyDesc as string,
      }}
    />
  )}
/>
```

---

### `sections/StateMessagesSection.tsx`

```tsx
<AutoPropsTable
  title="IDataTableStateMessage Reference"
  props={[
    { prop: 'loadingTitle',       type: 'string',    required: false, description: 'Custom title for loading state' },
    { prop: 'loadingDescription', type: 'string',    required: false, description: 'Custom description for loading state' },
    { prop: 'loadingComponent',   type: 'ReactNode', required: false, description: 'Fully custom loading component — replaces entire loading UI' },
    { prop: 'errorTitle',         type: 'string',    required: false, description: 'Custom title for error state' },
    { prop: 'errorDescription',   type: 'string',    required: false, description: 'Custom description for error state' },
    { prop: 'errorComponent',     type: 'ReactNode', required: false, description: 'Fully custom error component' },
    { prop: 'emptyTitle',         type: 'string',    required: false, description: 'Custom title for empty state' },
    { prop: 'emptyDescription',   type: 'string',    required: false, description: 'Custom description for empty state' },
    { prop: 'emptyComponent',     type: 'ReactNode', required: false, description: 'Fully custom empty component — useful for "No results + CTA" patterns' },
  ]}
/>

// Custom empty component example
<CodeBlock
  language="tsx"
  code={`// Custom empty state with CTA
<DataTable
  data={filteredData}
  columns={columns}
  stateMessages={{
    emptyComponent: (
      <div className="flex flex-col items-center justify-center py-16 space-y-4">
        <LucideIcons.SearchX className="w-12 h-12 text-gray-400" />
        <Typography tag="h3" color="muted">No results match your search</Typography>
        <Button onClick={clearFilters} color="primary">Clear Filters</Button>
      </div>
    ),
  }}
/>`}
/>
```

---

## Página `index.tsx`

```tsx
// apps/demo/src/pages/states-ux/index.tsx
import { lazy } from 'react';
import { DynamicSectionsPage } from '../../components/DynamicSectionsPage';
import HeroPage from '../../components/HeroPage';

export function StatesUxPage() {
  return (
    <DynamicSectionsPage
      hero={<HeroPage title="States & UX" description="Loading skeletons, error handling, empty states, and custom state messages — complete guide to Tucutable's UX states." />}
      sections={[
        { id: 'intro', label: 'Introduction', component: lazy(() => import('./sections/IntroSection')) },
        { id: 'loading', label: 'Loading State', component: lazy(() => import('./sections/LoadingSection')) },
        { id: 'error', label: 'Error State', component: lazy(() => import('./sections/ErrorSection')) },
        { id: 'empty', label: 'Empty State', component: lazy(() => import('./sections/EmptySection')) },
        { id: 'state-messages', label: 'Custom Messages', component: lazy(() => import('./sections/StateMessagesSection')) },
      ]}
    />
  );
}
```

---

## Checklist de calidad

- [ ] `DynamicSectionsPage` con TOC "Intro / Loading / Error / Empty / Messages"
- [ ] `HeroPage` con título "States & UX"
- [ ] `IntroSection` con grid 3 tarjetas (loading / error / empty)
- [ ] `LoadingSection` con `PropPlayground` toggle + `CodeBlock` React Query
- [ ] `ErrorSection` con `PropPlayground` toggle + `CodeBlock` retry
- [ ] `EmptySection` con `PropPlayground` (título/desc custom)
- [ ] `StateMessagesSection` con `AutoPropsTable` completo + `CodeBlock` custom empty component
- [ ] Demos usan datos estáticos + toggle manual para simular estados
- [ ] Responsive / dark mode
