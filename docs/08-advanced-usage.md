# Plan de Implementación — Página: Advanced Usage

**Ruta de salida:** `apps/demo/src/pages/advanced-usage/index.tsx`  
**Tipo:** Page Type B (TOC + DynamicSectionsPage + lazy sections)  
**Ruta en el router:** `/advanced-usage`  
**Label en menú:** `Advanced Usage`

---

## Objetivo

Documentar las funcionalidades avanzadas de `@e-burgos/tucutable`:

1. Patrón Provider + Component (`DataTableProvider` + `DataTableComponent`)
2. Hook `useDataTableContext` — acceso programático al estado de la tabla
3. Zustand store (`useDataTableStore`) — persistencia y manipulación directa
4. Cache y reset (`useResetCacheVersion`) — invalidar estado persistido
5. Drag & Drop — reordenar columnas con `@dnd-kit`
6. Report Data — recolección de datos para exportación
7. Funciones de utilidad (`sortingCompareNumberFn`, `parseNumericValueForExport`, etc.)

---

## Estructura de Archivos a Crear

```
apps/demo/src/pages/advanced-usage/
├── index.tsx                          # Página principal (DynamicSectionsPage)
├── hooks/
│   └── useAdvancedDemoData.ts         # Mock data + columnas para los demos
└── sections/
    ├── ArchitectureSection.tsx        # Diagrama de arquitectura
    ├── ProviderSection.tsx            # DataTableProvider + DataTableComponent
    ├── ContextSection.tsx             # useDataTableContext — todas las propiedades
    ├── StoreSection.tsx               # useDataTableStore — Zustand
    ├── CacheSection.tsx               # useResetCacheVersion
    ├── DragDropSection.tsx            # Drag & Drop de columnas
    ├── ReportDataSection.tsx          # Report / Export data system
    └── UtilitiesSection.tsx           # Helper functions + TanstackTable re-export
```

---

## Imports Comunes en Cada Sección

```tsx
import { AutoPropsTable, PropPlayground, LazyComponentSection, CardContainer, CardTitle, Typography, Alert, CodeBlock } from '../../components';

// Demo components
import { DataTable, DataTableProvider, DataTableComponent, useDataTableContext, useDataTableStore, useResetCacheVersion } from '@e-burgos/tucutable';
```

---

## Página Principal (`index.tsx`)

```tsx
import { lazy } from 'react';
import { DynamicSectionsPage, useAnchorScroll, type TableOfContentsItem } from '../../components';
import { HeroPage } from '../../components';

const ArchitectureSection = lazy(() => import('./sections/ArchitectureSection'));
const ProviderSection = lazy(() => import('./sections/ProviderSection'));
const ContextSection = lazy(() => import('./sections/ContextSection'));
const StoreSection = lazy(() => import('./sections/StoreSection'));
const CacheSection = lazy(() => import('./sections/CacheSection'));
const DragDropSection = lazy(() => import('./sections/DragDropSection'));
const ReportDataSection = lazy(() => import('./sections/ReportDataSection'));
const UtilitiesSection = lazy(() => import('./sections/UtilitiesSection'));

const tocItems: TableOfContentsItem[] = [
  { id: 'architecture', label: 'Architecture Overview' },
  { id: 'provider', label: 'Provider Pattern' },
  { id: 'context', label: 'useDataTableContext' },
  { id: 'store', label: 'Zustand Store' },
  { id: 'cache', label: 'Cache & Reset' },
  { id: 'drag-drop', label: 'Drag & Drop' },
  { id: 'report-data', label: 'Report Data' },
  { id: 'utilities', label: 'Utilities' },
];

export function AdvancedUsagePage() {
  useAnchorScroll();
  return (
    <DynamicSectionsPage
      hero={<HeroPage title="Advanced Usage" description="Acceso programático al estado de la tabla, Zustand store, cache management, drag-and-drop y sistema de reporte/exportación." />}
      tocItems={tocItems}
      sections={[
        { id: 'architecture', component: ArchitectureSection },
        { id: 'provider', component: ProviderSection },
        { id: 'context', component: ContextSection },
        { id: 'store', component: StoreSection },
        { id: 'cache', component: CacheSection },
        { id: 'drag-drop', component: DragDropSection },
        { id: 'report-data', component: ReportDataSection },
        { id: 'utilities', component: UtilitiesSection },
      ]}
    />
  );
}
```

---

## Hook de Mock Data (`hooks/useAdvancedDemoData.ts`)

```typescript
import { useMemo } from 'react';
import type { ColumnDef } from '@e-burgos/tucutable';

export interface AdvancedDemoRow {
  id: number;
  name: string;
  role: string;
  department: string;
  salary: number;
  active: boolean;
}

export function useAdvancedDemoData() {
  const data: AdvancedDemoRow[] = useMemo(
    () =>
      Array.from({ length: 20 }, (_, i) => ({
        id: i + 1,
        name: `User ${i + 1}`,
        role: ['Admin', 'Editor', 'Viewer'][i % 3],
        department: ['Engineering', 'Design', 'Marketing', 'Sales'][i % 4],
        salary: 40000 + i * 3500,
        active: i % 4 !== 0,
      })),
    [],
  );

  const columns: ColumnDef<AdvancedDemoRow, any>[] = useMemo(
    () => [
      { accessorKey: 'id', header: 'ID', size: 60 },
      { accessorKey: 'name', header: 'Name', size: 150 },
      { accessorKey: 'role', header: 'Role', size: 120 },
      { accessorKey: 'department', header: 'Department', size: 160 },
      {
        accessorKey: 'salary',
        header: 'Salary',
        size: 120,
        cell: ({ getValue }) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(getValue() as number),
      },
      {
        accessorKey: 'active',
        header: 'Active',
        size: 80,
        cell: ({ getValue }) => (getValue() ? '✓' : '✗'),
      },
    ],
    [],
  );

  return { data, columns };
}
```

---

## Sección 1: Architecture Overview (`ArchitectureSection.tsx`)

### Contenido

**Diagrama ASCII de la arquitectura** (dentro de un `CodeBlock` con lenguaje `text`):

```
DataTable (componente público — entrada principal)
  └── DataTableProvider (proveedor de contexto)
        ├── useReactTable()          → instancia TanStack Table
        ├── useDataTableStore()      → Zustand store (persisted)
        ├── useScrollableTable()     → detección de scroll
        └── DataTableComponent (renderiza la UI de la tabla)
              ├── DragDropTableContext   (@dnd-kit DndContext)
              │     ├── TableHead
              │     │     └── DragDropContentContext (SortableContext)
              │     └── TableBody
              │           └── DragDropContentContext (SortableContext)
              ├── StateTableHandler      (loading / error / empty)
              ├── Pagination / ManualPagination
              └── Footer
```

**Alert** explicando cuándo usar `DataTable` vs `DataTableProvider + DataTableComponent`:

> **`<DataTable>`** — El 95% de los casos. Es el componente completo.  
> **`DataTableProvider + DataTableComponent`** — Cuando necesitás incrustar componentes que usen `useDataTableContext` como hermanos del header de la tabla.

**CodeBlock** mostrando el tipo `DataTableProps`:

```tsx
interface DataTableProps<T> {
  tableId: string;
  data: T[];
  columns: ColumnDef<any, any>[];
  showHeader?: boolean;
  mode?: 'dark' | 'light';
  // + todas las props de IOptionalDataTableProps
}
```

---

## Sección 2: Provider Pattern (`ProviderSection.tsx`)

### Contenido

**Introducción** (Typography `<p>`): Separar `DataTableProvider` de `DataTableComponent` permite que cualquier componente descendiente acceda al contexto de la tabla via `useDataTableContext`.

**Live Demo** — Provider + Component con header custom:

```tsx
function ProviderDemoSection() {
  const { data, columns } = useAdvancedDemoData();
  return (
    <DataTableProvider tableId="provider-demo" data={data} columns={columns} pagination={{ showPagination: true, pageSize: 5 }}>
      {/* Header custom que accede al contexto */}
      <ProviderCustomHeader />
      <DataTableComponent data={data} />
    </DataTableProvider>
  );
}

function ProviderCustomHeader() {
  const context = useDataTableContext();
  if (!context) return null;
  const { tableState } = context;
  return (
    <div className="flex justify-between items-center p-3 bg-muted rounded-t">
      <span className="text-sm font-medium">Total rows: {tableState.pagination.pageSize * /* total pages */ 1}</span>
      <span className="text-xs text-muted-foreground">Table ID: {tableState.id}</span>
    </div>
  );
}
```

**CodeBlock** con el código completo del ejemplo anterior.

---

## Sección 3: useDataTableContext (`ContextSection.tsx`)

### Contenido

**AutoPropsTable** — documentar todas las propiedades del contexto agrupadas:

```tsx
<AutoPropsTable
  title="useDataTableContext — Retorna"
  description="Todas las propiedades disponibles en el contexto de la tabla"
  props={[
    // TanStack instance
    { name: 'table', type: 'Table<T>', required: true, description: 'Instancia de TanStack Table v8. Acceso completo sin restricciones.' },
    // tableState
    { name: 'tableState.id', type: 'string', required: true, description: 'ID único de la tabla (= tableId prop).' },
    { name: 'tableState.pagination', type: 'PaginationState', required: true, description: 'Estado actual de paginación: pageIndex, pageSize.' },
    { name: 'tableState.sorting', type: 'SortingState', required: true, description: 'Estado de ordenamiento: array de { id, desc }.' },
    { name: 'tableState.columnOrder', type: 'ColumnOrderState', required: true, description: 'Orden actual de columnas (array de column IDs).' },
    { name: 'tableState.columnVisibility', type: 'VisibilityState', required: true, description: 'Visibilidad de columnas: Record<string, boolean>.' },
    { name: 'tableState.columnPinning', type: 'ColumnPinningState', required: true, description: 'Columnas fijadas: { left?: string[], right?: string[] }.' },
    { name: 'tableState.columnFilters', type: 'ColumnFiltersState', required: true, description: 'Filtros activos: array de { id, value }.' },
    { name: 'tableState.rowSelection', type: 'RowSelectionState', required: true, description: 'Filas seleccionadas: Record<string, boolean>.' },
    { name: 'tableState.reportData', type: 'ReportDataState', required: true, description: 'Datos recolectados para exportación.' },
    { name: 'tableState.totalCount', type: 'number | undefined', required: false, description: 'Total de registros (para paginación server-side).' },
    // actions
    { name: 'actions.setTotalCount', type: '(n: number) => void', required: true, description: 'Actualiza el total de registros.' },
    { name: 'actions.resetStoreData', type: '() => void', required: true, description: 'Resetea todo el estado al estado inicial.' },
    { name: 'actions.setColumnFilters', type: '(filters) => void', required: true, description: 'Actualiza los filtros de columnas.' },
    { name: 'actions.onSetReportCellValue', type: '(value, rowId, cellIndex, opts) => void', required: true, description: 'Registra un valor de celda para el reporte.' },
    { name: 'actions.onSetReportHeader', type: '(name, index) => void', required: true, description: 'Registra un header para el reporte.' },
    { name: 'actions.resetReportData', type: '() => void', required: true, description: 'Limpia todos los datos del reporte.' },
    // utils
    { name: 'utils.isEmpty', type: 'boolean', required: true, description: 'true cuando data.length === 0.' },
    { name: 'utils.checkState', type: 'boolean', required: true, description: 'true cuando isLoading || isError || isEmpty.' },
    { name: 'utils.isSubComponent', type: 'boolean', required: true, description: 'true cuando hay renderSubComponent o renderSubDataTable.' },
    { name: 'utils.isManualPagination', type: 'boolean', required: true, description: 'true cuando se está usando paginación manual o server-side.' },
    { name: 'utils.isRowSelection', type: 'boolean', required: true, description: 'true cuando rowSelection prop fue provisto.' },
    // scroll
    { name: 'scrollProps.isScrollable', type: 'boolean', required: true, description: 'true cuando la tabla tiene scroll horizontal.' },
    { name: 'scrollProps.scrollX', type: 'number', required: true, description: 'Posición de scroll horizontal actual (px).' },
    { name: 'tableContainerRef', type: 'RefObject<HTMLDivElement>', required: true, description: 'Ref del contenedor de la tabla.' },
    { name: 'config', type: 'Omit<DataTableProps, "data">', required: true, description: 'Props de configuración originales.' },
  ]}
/>
```

**CodeBlock** — ejemplo de uso en un componente hijo:

```tsx
function RowCounter() {
  const ctx = useDataTableContext();
  if (!ctx) return null;

  const selectedCount = ctx.table.getSelectedRowModel().rows.length;
  const totalCount = ctx.table.getRowModel().rows.length;

  return (
    <div className="text-sm text-muted-foreground">
      {selectedCount} / {totalCount} filas seleccionadas
    </div>
  );
}
```

---

## Sección 4: Zustand Store (`StoreSection.tsx`)

### Contenido

**AutoPropsTable** para `DataTableStore`:

```tsx
<AutoPropsTable
  title="useDataTableStore(tableId)"
  description="Zustand store persistido en localStorage con key `{tableId}-datatable`"
  props={[
    { name: 'tableData.pagination', type: 'PaginationState', required: true, description: 'Estado de paginación persistido.' },
    { name: 'tableData.sorting', type: 'SortingState', required: true, description: 'Estado de ordenamiento persistido.' },
    { name: 'tableData.columnOrder', type: 'ColumnOrderState', required: true, description: 'Orden de columnas persistido.' },
    { name: 'tableData.columnVisibility', type: 'VisibilityState', required: true, description: 'Visibilidad de columnas persistida.' },
    { name: 'tableData.columnPinning', type: 'ColumnPinningState', required: true, description: 'Columnas fijadas persistidas.' },
    { name: 'tableData.columnSizing', type: 'ColumnSizingState', required: true, description: 'Tamaños de columnas persistidos.' },
    { name: 'tableData.totalCount', type: 'number | undefined', required: false, description: 'Total de registros (server-side).' },
    { name: 'setPagination', type: '(v: PaginationState) => void', required: true, description: 'Actualiza el estado de paginación en el store.' },
    { name: 'setSorting', type: '(v: SortingState) => void', required: true, description: 'Actualiza el estado de sorting en el store.' },
    { name: 'setColumnVisibility', type: '(v: VisibilityState) => void', required: true, description: 'Actualiza visibilidad de columnas.' },
    { name: 'setColumnOrder', type: '(v: ColumnOrderState) => void', required: true, description: 'Actualiza el orden de columnas.' },
    { name: 'setColumnPinning', type: '(v: ColumnPinningState) => void', required: true, description: 'Actualiza columnas fijadas.' },
    { name: 'setColumnSizing', type: '(v: ColumnSizingState) => void', required: true, description: 'Actualiza los tamaños de columna.' },
    { name: 'resetStoreData', type: '() => void', required: true, description: 'Resetea todo el store al estado inicial y limpia localStorage.' },
  ]}
/>
```

**Alert** — Patrón singleton:

> El store usa un mapa de singleton (`storeMap`) por `tableId`. Cada tabla tiene exactamente una instancia de Zustand, compartida en toda la app.

**CodeBlock** — acceso directo al store en un componente externo:

```tsx
import { useDataTableStore } from '@e-burgos/tucutable';

function TableDebugPanel() {
  const { tableData, resetStoreData } = useDataTableStore('my-table-id');

  return (
    <div>
      <pre>{JSON.stringify(tableData.sorting, null, 2)}</pre>
      <button onClick={resetStoreData}>Reset table state</button>
    </div>
  );
}
```

---

## Sección 5: Cache & Reset (`CacheSection.tsx`)

### Contenido

**Explicación** (Typography `<p>`): Cuando cambia el schema de la tabla (se agregan/eliminan columnas), el estado persistido en localStorage puede quedar inválido. `useResetCacheVersion` invalida automáticamente ese estado al montar la tabla.

**AutoPropsTable** para `useResetCacheVersion`:

```tsx
<AutoPropsTable
  title="useResetCacheVersion(tableId, options)"
  description="Hook para invalidar el estado persistido cuando el schema de la tabla cambia."
  props={[
    { name: 'tableId', type: 'string', required: true, description: 'ID de la tabla cuyo cache se quiere gestionar.' },
    { name: 'options.version', type: 'number', required: true, description: 'Versión actual del schema. Incrementar cuando cambien columnas.' },
    { name: 'options.onSuccess', type: '() => void', required: false, description: 'Callback ejecutado cuando el cache fue limpiado exitosamente.' },
    { name: 'options.onError', type: '(e: Error) => void', required: false, description: 'Callback ejecutado si el reset falla.' },
  ]}
  returns="boolean — true si el cache fue reseteado, false si la versión coincidía"
/>
```

**CodeBlock** con ejemplo:

```tsx
import { DataTable, useResetCacheVersion } from '@e-burgos/tucutable';

function VersionedTable({ data, columns }) {
  // Si la versión del schema cambió, borra el estado persistido
  const wasReset = useResetCacheVersion('versioned-table', {
    version: 3, // ← Incrementar cada vez que cambien las columnas
    onSuccess: () => console.log('Estado anterior borrado'),
  });

  if (wasReset) {
    console.log('Se detectó schema desactualizado — cache limpiado');
  }

  return <DataTable tableId="versioned-table" data={data} columns={columns} />;
}
```

**Alert** sobre el mecanismo interno:

> Las versiones de cache se guardan en un Zustand store separado: `datatable-cache-versions`. Al montar, compara `options.version` con la versión almacenada. Si difieren, borra `localStorage["{tableId}-datatable"]` y actualiza la versión.

---

## Sección 6: Drag & Drop (`DragDropSection.tsx`)

### Contenido

**Explicación** — Tucutable usa `@dnd-kit` para reordenar columnas horizontalmente.

**PropPlayground** — Control para habilitar/deshabilitar drag global:

```tsx
<PropPlayground
  title="Drag & Drop de Columnas"
  description="Controles para habilitar drag & drop a nivel de tabla y por columna"
  controls={[
    {
      id: 'enableDragColumns',
      label: 'headerOptions.enableDragColumns',
      type: 'boolean',
      default: true,
      description: 'Habilita/deshabilita el drag de todas las columnas.',
    },
  ]}
  renderDemo={({ enableDragColumns }) => <DataTable tableId="drag-demo" data={data} columns={dragDemoColumns} headerOptions={{ enableDragColumns }} />}
/>
```

**Alert** — Desactivar drag por columna:

```tsx
// En la definición de columna:
{
  accessorKey: 'id',
  header: 'ID',
  enableDraggable: false,  // ← Esta columna no se puede arrastrar
}
```

**Diagrama de arquitectura DnD** (CodeBlock `text`):

```
DragDropTableContext (DndContext — nivel tabla)
├── TableHead
│   └── DragDropContentContext (SortableContext — estrategia horizontal)
│         └── Cada HeaderCell es un SortableItem
│               └── onDragEnd → arrayMove(columnOrder)
└── TableBody
    └── Celdas usan el mismo columnOrder para renderizar
```

**Live Demo** — DataTable con drag habilitado en columnas seleccionadas:

```tsx
<DataTable
  tableId="advanced-drag"
  data={data}
  columns={[
    { accessorKey: 'name', header: 'Name (draggable)' },
    { accessorKey: 'role', header: 'Role (draggable)' },
    { accessorKey: 'department', header: 'Dept (NO drag)', enableDraggable: false },
    { accessorKey: 'salary', header: 'Salary (draggable)' },
  ]}
  headerOptions={{ enableDragColumns: true }}
  pagination={{ showPagination: false }}
/>
```

---

## Sección 7: Report Data (`ReportDataSection.tsx`)

### Contenido

**Explicación** — sistema interno de recolección de datos para exportación. Cada celda renderizada puede registrar su valor con `onSetReportCellValue`. Los headers se registran con `onSetReportHeader`.

**AutoPropsTable** para `ReportDataState`:

```tsx
<AutoPropsTable
  title="ReportDataState"
  description="Estructura del estado de reporte en context.tableState.reportData"
  props={[
    {
      name: 'headers',
      type: 'Map<number, string>',
      required: true,
      description: 'Mapa de índice de columna → nombre del header.',
    },
    {
      name: 'rows',
      type: 'Map<string, Map<number, string>>',
      required: true,
      description: 'Mapa de rowId → (índice de columna → valor de celda como string).',
    },
  ]}
/>
```

**CodeBlock** — Leer y exportar datos del reporte:

```tsx
function ExportButton() {
  const ctx = useDataTableContext();
  if (!ctx) return null;

  const handleExport = () => {
    const { headers, rows } = ctx.tableState.reportData;

    // Construir array de filas
    const headerRow = Array.from(headers.entries())
      .sort(([a], [b]) => a - b)
      .map(([, name]) => name);

    const dataRows = Array.from(rows.entries()).map(([, cells]) =>
      Array.from(cells.entries())
        .sort(([a], [b]) => a - b)
        .map(([, val]) => val),
    );

    // Exportar como CSV
    const csv = [headerRow, ...dataRows].map((row) => row.join(',')).join('\n');

    console.log(csv);
    // O download:
    // const blob = new Blob([csv], { type: 'text/csv' });
    // const url = URL.createObjectURL(blob);
    // const a = document.createElement('a'); a.href = url; a.download = 'report.csv'; a.click();
  };

  return <button onClick={handleExport}>Export CSV</button>;
}
```

**Alert** — Columnas ignoradas en el reporte:

> `RowActionsColumn`, `ExpandedColumn` y `RowSelectionColumn` son ignoradas automáticamente en el sistema de reporte (`IGNORE_REPORT_COLUMNS` constant).

**CodeBlock** — Registrar manualmente un valor de reporte en una columna custom:

```tsx
const { actions } = useDataTableContext()!;

// En el cell renderer del ColumnDef:
cell: ({ row, getValue }) => {
  const value = getValue() as number;
  const formatted = formatCurrency(value);

  // Registrar el valor formateado para el reporte
  actions.onSetReportCellValue(formatted, row.id, 4, { hasSubTable: false });

  return <span>{formatted}</span>;
},
```

---

## Sección 8: Utilities (`UtilitiesSection.tsx`)

### Contenido

#### TanStack Table Re-export

**Alert** informativa:

```tsx
// Accedé a todos los tipos de TanStack Table sin instalar @tanstack/react-table:
import { TanstackTable } from '@e-burgos/tucutable';

type MyColumnDef = TanstackTable.ColumnDef<MyData>;
type MySorting = TanstackTable.SortingState;
```

#### Sorting Helpers

**AutoPropsTable** para las funciones de sorting:

```tsx
<AutoPropsTable
  title="sortingCompareNumberFn / sortingCompareStringFn"
  props={[
    {
      name: 'sortingCompareNumberFn(a, b)',
      type: '(a: number, b: number) => number',
      required: false,
      description: 'Comparación numérica: maneja NaN → 0. Retorna -1, 0 o 1.',
    },
    {
      name: 'sortingCompareStringFn(a, b)',
      type: '(a: string, b: string) => number',
      required: false,
      description: 'Comparación de strings case-insensitive y locale-aware.',
    },
  ]}
/>
```

**CodeBlock** — uso en un ColumnDef:

```tsx
import { sortingCompareNumberFn, sortingCompareStringFn } from '@e-burgos/tucutable';

const columns: ColumnDef<Row>[] = [
  {
    accessorKey: 'salary',
    header: 'Salary',
    sortingFn: (rowA, rowB, columnId) => sortingCompareNumberFn(rowA.getValue(columnId) as number, rowB.getValue(columnId) as number),
  },
  {
    accessorKey: 'name',
    header: 'Name',
    sortingFn: (rowA, rowB, columnId) => sortingCompareStringFn(rowA.getValue(columnId) as string, rowB.getValue(columnId) as string),
  },
];
```

#### parseNumericValueForExport

**AutoPropsTable**:

```tsx
<AutoPropsTable
  title="parseNumericValueForExport(value, options?)"
  props={[
    { name: 'value', type: 'string', required: true, description: 'Valor formateado a parsear (ej: "1,234.56" → 1234.56).' },
    { name: 'options.isPercentage', type: 'boolean', required: false, description: 'Si true, trata el valor como porcentaje.' },
  ]}
  returns="number | undefined — undefined si el valor no es parseable"
/>
```

**CodeBlock** con ejemplos:

```tsx
import { parseNumericValueForExport } from '@e-burgos/tucutable';

parseNumericValueForExport('1,234.56'); // → 1234.56
parseNumericValueForExport('45.5%', { isPercentage: true }); // → 45.5
parseNumericValueForExport('not-a-number'); // → undefined
```

---

## Navegación — Agregar al menuItems

En `apps/demo/src/router/menuItems.tsx`, agregar bajo el grupo de páginas avanzadas:

```tsx
{
  id:        'advanced-usage',
  name:      'Advanced Usage',
  href:      '/advanced-usage',
  component: lazy(() =>
    import('../pages/advanced-usage').then((m) => ({ default: m.AdvancedUsagePage }))
  ),
}
```

---

## Dependencias y Consideraciones

- **`@dnd-kit/core`** y **`@dnd-kit/sortable`** ya son dependencias de `@e-burgos/tucutable` — no hace falta instalarlos.
- El sistema de reporte está diseñado para trabajar EN CONJUNTO con column definitions que llamen `onSetReportCellValue` en sus cell renderers.
- `useResetCacheVersion` debe llamarse ANTES de renderizar el `DataTable` para evitar un flash del estado anterior.
- El store de Zustand es **lazy**: se crea la primera vez que se accede a `useDataTableStore(tableId)`.
