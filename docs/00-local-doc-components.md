# Componentes de Documentación — Todos de `@e-burgos/tucu-ui`

> **Corrección importante**: `AutoPropsTable`, `PropPlayground`, `DynamicSectionsPage` y `PlaygroundButton` **son componentes exportados por `@e-burgos/tucu-ui`**. No hay que crearlos localmente. El archivo `apps/demo/src/components/index.ts` los re-exporta como barrel para simplificar los imports en las páginas.

```ts
// apps/demo/src/components/index.ts
import { DynamicSectionsPage, AutoPropsTable, PropPlayground, PlaygroundButton, HeroCard, LazyComponentSection, NavOptions, TableOfContents } from '@e-burgos/tucu-ui';

export { DynamicSectionsPage, AutoPropsTable, PropPlayground, PlaygroundButton, HeroCard, LazyComponentSection, NavOptions, TableOfContents };
```

Uso desde páginas:

```tsx
// Opción A: barrel local (preferida dentro de apps/demo/)
import { AutoPropsTable, PropPlayground, DynamicSectionsPage } from '../../components';

// Opción B: directo
import { AutoPropsTable, PropPlayground } from '@e-burgos/tucu-ui';
```

---

El resto de este documento conserva las **especificaciones de prop interfaces y ejemplos de uso** de cada componente — útiles como referencia al implementar las páginas.

---

## 1. `AutoPropsTable`

**Origen:** `@e-burgos/tucu-ui` (re-exportado desde `apps/demo/src/components/index.ts`)

### Propósito

Renderiza una tabla HTML estática que documenta las props de un componente o interfaz TypeScript:

| Prop | Type | Default | Required | Description |
| ---- | ---- | ------- | -------- | ----------- |
| ...  | ...  | ...     | ...      | ...         |

### Props del componente

```tsx
export interface AutoPropsTableProps {
  /** Lista de filas de props a documentar */
  props: PropRow[];
  /** Título opcional de la tabla */
  title?: string;
  /** Clase CSS adicional para el wrapper */
  className?: string;
}

export interface PropRow {
  prop: string;
  type: string;
  default?: string;
  required?: boolean;
  description: string;
}
```

### Implementación completa

```tsx
// apps/demo/src/components/AutoPropsTable.tsx
import { CardContainer, CardTitle, Badge, Typography } from '@e-burgos/tucu-ui';
import { cn } from '@e-burgos/tucu-ui'; // si existe, o usar clsx

export interface PropRow {
  prop: string;
  type: string;
  default?: string;
  required?: boolean;
  description: string;
}

export interface AutoPropsTableProps {
  props: PropRow[];
  title?: string;
  className?: string;
}

export function AutoPropsTable({ props, title = 'Props Reference', className }: AutoPropsTableProps) {
  return (
    <CardContainer className={className}>
      <CardTitle title={title} className="mb-4 mt-6" />
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <th className="py-3 px-4 font-semibold text-gray-700 dark:text-gray-300">Prop</th>
              <th className="py-3 px-4 font-semibold text-gray-700 dark:text-gray-300">Type</th>
              <th className="py-3 px-4 font-semibold text-gray-700 dark:text-gray-300">Default</th>
              <th className="py-3 px-4 font-semibold text-gray-700 dark:text-gray-300">Req.</th>
              <th className="py-3 px-4 font-semibold text-gray-700 dark:text-gray-300">Description</th>
            </tr>
          </thead>
          <tbody>
            {props.map((row, i) => (
              <tr key={row.prop} className={i % 2 === 0 ? 'bg-gray-50 dark:bg-gray-800/50' : 'bg-white dark:bg-transparent'}>
                <td className="py-3 px-4">
                  <code className="text-xs font-mono bg-gray-100 dark:bg-gray-700 px-1.5 py-0.5 rounded text-purple-600 dark:text-purple-400">{row.prop}</code>
                </td>
                <td className="py-3 px-4">
                  <code className="text-xs font-mono text-blue-600 dark:text-blue-400">{row.type}</code>
                </td>
                <td className="py-3 px-4 text-gray-500 dark:text-gray-400 text-xs">{row.default ?? <span className="italic">—</span>}</td>
                <td className="py-3 px-4">
                  {row.required ? (
                    <Badge color="danger" size="small">
                      Required
                    </Badge>
                  ) : (
                    <Badge color="success" size="small">
                      Optional
                    </Badge>
                  )}
                </td>
                <td className="py-3 px-4 text-gray-600 dark:text-gray-400">{row.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </CardContainer>
  );
}

export default AutoPropsTable;
```

### Uso

```tsx
import { AutoPropsTable } from '../../components/AutoPropsTable';

<AutoPropsTable
  title="DataTable Props"
  props={[
    {
      prop: 'data',
      type: 'TData[]',
      required: true,
      description: 'Array of data objects to render in the table',
    },
    {
      prop: 'columns',
      type: 'ColumnDef<TData>[]',
      required: true,
      description: 'Column definitions array',
    },
    {
      prop: 'pagination',
      type: 'IPaginationOptions',
      default: 'undefined',
      required: false,
      description: 'Pagination configuration',
    },
  ]}
/>;
```

---

## 2. `PropPlayground`

**Origen:** `@e-burgos/tucu-ui` (re-exportado desde `apps/demo/src/components/index.ts`)

### Propósito

Panel interactivo que permite al usuario modificar props de la tabla en tiempo real, ver el efecto y copiar el código resultante.

### Props del componente

```tsx
export type PlaygroundControl = { type: 'boolean'; prop: string; label: string; defaultValue: boolean } | { type: 'select'; prop: string; label: string; defaultValue: string; options: { label: string; value: string }[] } | { type: 'number'; prop: string; label: string; defaultValue: number; min?: number; max?: number; step?: number } | { type: 'text'; prop: string; label: string; defaultValue: string };

export interface PropPlaygroundProps {
  /** Definición de los controles disponibles */
  controls: PlaygroundControl[];
  /** Función que recibe los valores actuales y renderiza el demo */
  renderDemo: (values: Record<string, unknown>) => React.ReactNode;
  /** Función que recibe los valores y genera el código a mostrar */
  renderCode?: (values: Record<string, unknown>) => string;
  title?: string;
  className?: string;
}
```

### Implementación completa

```tsx
// apps/demo/src/components/PropPlayground.tsx
import { useState } from 'react';
import { CardContainer, CardTitle, Button, CodeBlock, Typography, LucideIcons } from '@e-burgos/tucu-ui';

export type PlaygroundControl = { type: 'boolean'; prop: string; label: string; defaultValue: boolean } | { type: 'select'; prop: string; label: string; defaultValue: string; options: { label: string; value: string }[] } | { type: 'number'; prop: string; label: string; defaultValue: number; min?: number; max?: number; step?: number } | { type: 'text'; prop: string; label: string; defaultValue: string };

export interface PropPlaygroundProps {
  controls: PlaygroundControl[];
  renderDemo: (values: Record<string, unknown>) => React.ReactNode;
  renderCode?: (values: Record<string, unknown>) => string;
  title?: string;
  className?: string;
}

export function PropPlayground({ controls, renderDemo, renderCode, title = 'Interactive Playground', className }: PropPlaygroundProps) {
  const initialValues = controls.reduce<Record<string, unknown>>((acc, c) => {
    acc[c.prop] = c.defaultValue;
    return acc;
  }, {});

  const [values, setValues] = useState<Record<string, unknown>>(initialValues);
  const [showCode, setShowCode] = useState(false);

  const update = (prop: string, value: unknown) => setValues((prev) => ({ ...prev, [prop]: value }));

  return (
    <CardContainer className={className}>
      <CardTitle title={title} className="mb-4 mt-6">
        <div className="space-y-6">
          {/* Controls panel */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
            {controls.map((control) => (
              <div key={control.prop} className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wide">{control.label}</label>

                {control.type === 'boolean' && (
                  <button onClick={() => update(control.prop, !values[control.prop])} className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${values[control.prop] ? 'bg-primary' : 'bg-gray-300 dark:bg-gray-600'}`}>
                    <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${values[control.prop] ? 'translate-x-6' : 'translate-x-1'}`} />
                  </button>
                )}

                {control.type === 'select' && (
                  <select value={values[control.prop] as string} onChange={(e) => update(control.prop, e.target.value)} className="text-sm rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-2 py-1.5 text-gray-700 dark:text-gray-300">
                    {control.options.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                )}

                {control.type === 'number' && <input type="number" value={values[control.prop] as number} min={control.min} max={control.max} step={control.step} onChange={(e) => update(control.prop, Number(e.target.value))} className="text-sm rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-2 py-1.5 w-24 text-gray-700 dark:text-gray-300" />}

                {control.type === 'text' && <input type="text" value={values[control.prop] as string} onChange={(e) => update(control.prop, e.target.value)} className="text-sm rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-2 py-1.5 text-gray-700 dark:text-gray-300" />}
              </div>
            ))}
          </div>

          {/* Live demo preview */}
          <div className="rounded-lg border border-gray-200 dark:border-gray-700 p-4">{renderDemo(values)}</div>

          {/* Toggle code */}
          {renderCode && (
            <div className="space-y-2">
              <Button size="small" color="gray" variant="ghost" onClick={() => setShowCode((prev) => !prev)}>
                <LucideIcons.Code className="w-4 h-4 mr-1.5" />
                {showCode ? 'Hide Code' : 'Show Code'}
              </Button>
              {showCode && <CodeBlock code={renderCode(values)} language="tsx" />}
            </div>
          )}

          {/* Reset button */}
          <Button size="small" color="gray" variant="transparent" onClick={() => setValues(initialValues)}>
            <LucideIcons.RotateCcw className="w-4 h-4 mr-1.5" />
            Reset
          </Button>
        </div>
      </CardTitle>
    </CardContainer>
  );
}

export default PropPlayground;
```

### Uso

```tsx
import { PropPlayground } from '../../components/PropPlayground';

<PropPlayground
  title="Pagination Playground"
  controls={[
    { type: 'boolean', prop: 'showPagination', label: 'Show Pagination', defaultValue: true },
    {
      type: 'select',
      prop: 'pageSize',
      label: 'Page Size',
      defaultValue: '10',
      options: [
        { label: '5', value: '5' },
        { label: '10', value: '10' },
        { label: '25', value: '25' },
      ],
    },
    { type: 'boolean', prop: 'showRowsPerPage', label: 'Rows Per Page', defaultValue: true },
  ]}
  renderDemo={(vals) => (
    <DataTable
      data={data}
      columns={columns}
      pagination={{
        showPagination: vals.showPagination as boolean,
        defaultPageSize: Number(vals.pageSize),
        showRowsPerPage: vals.showRowsPerPage as boolean,
      }}
    />
  )}
  renderCode={(vals) => `<DataTable
  data={data}
  columns={columns}
  pagination={{
    showPagination: ${vals.showPagination},
    defaultPageSize: ${vals.pageSize},
    showRowsPerPage: ${vals.showRowsPerPage},
  }}
/>`}
/>;
```

---

## 3. `DynamicSectionsPage`

**Origen:** `@e-burgos/tucu-ui` (re-exportado desde `apps/demo/src/components/index.ts`)

### Propósito

Wrapper que organiza una página Page Type B: `TableOfContents` lateral + contenedor de secciones con scroll suave. Encapsula el patrón repetitivo que se usa en todas las páginas largas.

### Props del componente

```tsx
import type { TableOfContentsItem } from '@e-burgos/tucu-ui';

export interface DynamicSection {
  id: string;
  label: string;
  component: React.ComponentType;
  /** Si tiene hijos, se muestran como sub-items en el TOC */
  children?: { id: string; label: string; component: React.ComponentType }[];
}

export interface DynamicSectionsPageProps {
  /** Secciones a renderizar y mostrar en el TOC */
  sections: DynamicSection[];
  /** Elemento hero a mostrar encima de las secciones */
  hero: React.ReactNode;
  className?: string;
}
```

### Implementación completa

```tsx
// apps/demo/src/components/DynamicSectionsPage.tsx
import { lazy, Suspense } from 'react';
import { TableOfContents, useAnchorScroll, type TableOfContentsItem } from '@e-burgos/tucu-ui';

// Skeleton loader para secciones lazy
function SectionSkeleton() {
  return (
    <div className="animate-pulse space-y-4 py-6">
      <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/3" />
      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-2/3" />
      <div className="h-48 bg-gray-200 dark:bg-gray-700 rounded" />
    </div>
  );
}

export interface DynamicSection {
  id: string;
  label: string;
  component: React.ComponentType;
  children?: { id: string; label: string; component: React.ComponentType }[];
}

export interface DynamicSectionsPageProps {
  sections: DynamicSection[];
  hero: React.ReactNode;
  className?: string;
}

export function DynamicSectionsPage({ sections, hero, className }: DynamicSectionsPageProps) {
  useAnchorScroll();

  // Construir TOC items (soporta anidamiento 1 nivel)
  const tocItems: TableOfContentsItem[] = sections.map((section) => ({
    id: section.id,
    label: section.label,
    ...(section.children
      ? {
          children: section.children.map((child) => ({
            id: child.id,
            label: child.label,
          })),
        }
      : {}),
  }));

  return (
    <div className={`relative scroll-smooth ${className ?? ''}`}>
      <TableOfContents items={tocItems}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 pt-8 lg:pt-0">
          {/* Hero banner */}
          {hero}

          {/* Secciones principales */}
          {sections.map((section) => (
            <div key={section.id}>
              <section id={section.id} className="scroll-mt-20">
                <Suspense fallback={<SectionSkeleton />}>
                  <section.component />
                </Suspense>
              </section>

              {/* Sub-secciones si las hay */}
              {section.children?.map((child) => (
                <section key={child.id} id={child.id} className="scroll-mt-20 mt-6">
                  <Suspense fallback={<SectionSkeleton />}>
                    <child.component />
                  </Suspense>
                </section>
              ))}
            </div>
          ))}
        </div>
      </TableOfContents>
    </div>
  );
}

export default DynamicSectionsPage;
```

### Uso típico (Page Type B)

```tsx
import { lazy } from 'react';
import { DynamicSectionsPage } from '../../components/DynamicSectionsPage';
import HeroPage from '../../components/HeroPage';

const IntroSection = lazy(() => import('./sections/IntroSection'));
const BasicSection = lazy(() => import('./sections/BasicSection'));
const AdvancedSection = lazy(() => import('./sections/AdvancedSection'));

export function ColumnGuidePage() {
  return (
    <DynamicSectionsPage
      hero={<HeroPage title="Column Guide" description="Everything about column definitions, features, and helpers." />}
      sections={[
        { id: 'intro', label: 'Introduction', component: IntroSection },
        { id: 'basic', label: 'Basic ColumnDef', component: BasicSection },
        {
          id: 'advanced',
          label: 'Column Features',
          component: AdvancedSection,
          children: [
            { id: 'sorting', label: 'Sorting', component: lazy(() => import('./sections/SortingSection')) },
            { id: 'resizing', label: 'Resizing', component: lazy(() => import('./sections/ResizingSection')) },
            { id: 'pinning', label: 'Pinning', component: lazy(() => import('./sections/PinningSection')) },
          ],
        },
      ]}
    />
  );
}
```

---

## Notas de implementación

- Crear los 3 componentes **antes** de construir cualquier página
- Exportar desde `apps/demo/src/components/index.ts` (crear este barrel si no existe)
- `AutoPropsTable` es puramente estático — los datos se pasan como prop, no se generan desde tipos en runtime
- `PropPlayground` gestiona su propio estado local — no necesita Zustand ni context
- `DynamicSectionsPage` usa `TableOfContents` de tucu-ui (confirmado en bundle) + `useAnchorScroll`
- Para el `TableOfContents`, verificar si `TableOfContentsItem` tiene soporte nativo de `children` en el tipo exportado. Si no, usar la versión plana (sin anidamiento en el sidebar).

### Orden de implementación

Al ser componentes de tucu-ui no hay que crearlos. Solo asegurarse de:

1. Que `apps/demo/src/components/index.ts` esté completo con todos los re-exports (ver arriba)
2. Leer `.github/skills/tucu-ui-docs/SKILL.md` para ver los props exactos de cada componente antes de usarlos
3. Si TypeScript reporta error de import, verificar que la versión de `@e-burgos/tucu-ui` instalada exporte estos componentes
