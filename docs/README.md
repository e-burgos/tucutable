# Tucutable — Plan de Documentación

Plan de implementación incremental para la app de documentación en `apps/demo/`.
Cada archivo de este directorio describe **exactamente** qué crear, qué componentes usar y en qué orden implementar las piezas.

---

## Estructura de archivos del plan

```
docs/
├── README.md                    # Este archivo — índice maestro
├── 00-local-doc-components.md   # Componentes de documentación de @e-burgos/tucu-ui (AutoPropsTable, PropPlayground, DynamicSectionsPage, etc.)
├── 01-getting-started.md        # Reescritura de la página Introduction usando patrones tucu-ui
├── 02-column-guide.md           # Guía completa de columnas (ColumnDef, features, convertColumns)
├── 03-pagination.md             # Paginación client-side, server-side, manual
├── 04-row-features.md           # Row actions, row selection, expandable rows
├── 05-header-sorting.md         # IHeaderOptions, sorting, header actions
├── 06-states-ux.md              # Loading, error, empty states, messages
├── 07-styling.md                # IDataTableStyles — guía de estilos
└── 08-advanced-usage.md         # Context, Zustand store, cache, drag-and-drop, report data, utilities
└── 08-advanced-usage.md         # Context, hooks, Zustand store, cache, drag-and-drop, report data
```

---

## Orden de implementación recomendado

| Priority | Archivo                      | Razón                                                                       |
| -------- | ---------------------------- | --------------------------------------------------------------------------- |
| 1        | `00-local-doc-components.md` | Prerequisito: crea los componentes reutilizables que todas las páginas usan |
| 2        | `01-getting-started.md`      | Punto de entrada — debe estar pulida antes de añadir más páginas            |
| 3        | `02-column-guide.md`         | Feature central — columnas son la base de todo uso de tucutable             |
| 4        | `04-row-features.md`         | Las features más visuales — impacto inmediato en la demo                    |
| 5        | `03-pagination.md`           | Muy consultada — server-side pagination es clave                            |
| 6        | `05-header-sorting.md`       | Complementa columnas y UX de la tabla                                       |
| 7        | `07-styling.md`              | Referencia CSS — necesaria para personalización                             |
| 8        | `06-states-ux.md`            | UX polish — loading/error/empty states                                      |
| 9        | `08-advanced-usage.md`       | Para usuarios avanzados — context, store, drag-and-drop                     |

---

## Estructura de navegación en `menuItems.tsx`

La navegación actual tiene solo 2 items. El objetivo final:

```tsx
[
  // Grupo: Getting Started
  {
    name: 'Introduction',
    path: '/',
    icon: <LucideIcons.Home />,
    component: <Introduction />,
  },
  {
    name: 'Getting Started',
    path: '/getting-started',
    icon: <LucideIcons.BookOpen />,
    component: <GettingStarted />, // Reescritura de la intro actual
  },
  {
    name: 'Basic Usage',
    path: '/basic-usage',
    icon: <LucideIcons.Table />,
    component: <BasicUsage />,
  },

  // Grupo: Columns
  {
    name: 'Column Guide',
    path: '/column-guide',
    icon: <LucideIcons.Columns />,
    component: <ColumnGuidePage />, // Page Type B con TOC
    dropdownItems: [
      { name: 'Column Definition', path: '/column-guide/column-def', component: <ColumnDefSection /> },
      { name: 'Column Features', path: '/column-guide/features', component: <ColumnFeaturesSection /> },
      { name: 'Helper Columns', path: '/column-guide/helpers', component: <HelperColumnsSection /> },
      { name: 'convertColumns', path: '/column-guide/convert', component: <ConvertColumnsSection /> },
    ],
  },

  // Grupo: Data
  {
    name: 'Pagination',
    path: '/pagination',
    icon: <LucideIcons.ChevronRight />,
    component: <PaginationPage />, // Page Type B con TOC
  },
  {
    name: 'Row Features',
    path: '/row-features',
    icon: <LucideIcons.Rows />,
    component: <RowFeaturesPage />, // Page Type B con TOC
    dropdownItems: [
      { name: 'Row Actions', path: '/row-features/actions', component: <RowActionsSection /> },
      { name: 'Row Selection', path: '/row-features/selection', component: <RowSelectionSection /> },
      { name: 'Expandable Rows', path: '/row-features/expandable', component: <ExpandableRowsSection /> },
    ],
  },

  // Grupo: Controls
  {
    name: 'Header & Sorting',
    path: '/header-sorting',
    icon: <LucideIcons.ArrowUpDown />,
    component: <HeaderSortingPage />, // Page Type B
  },
  {
    name: 'States & UX',
    path: '/states-ux',
    icon: <LucideIcons.AlertCircle />,
    component: <StatesUxPage />, // Page Type B
  },

  // Grupo: Customization
  {
    name: 'Styling',
    path: '/styling',
    icon: <LucideIcons.Palette />,
    component: <StylingPage />, // Page Type B
  },
  {
    name: 'Advanced Usage',
    path: '/advanced-usage',
    icon: <LucideIcons.Settings />,
    component: <AdvancedUsagePage />, // Page Type B con TOC profundo
    dropdownItems: [
      { name: 'Context & Provider', path: '/advanced-usage/context', component: <ContextSection /> },
      { name: 'Hooks', path: '/advanced-usage/hooks', component: <HooksSection /> },
      { name: 'Zustand Store', path: '/advanced-usage/store', component: <StoreSection /> },
      { name: 'Cache & Reset', path: '/advanced-usage/cache', component: <CacheSection /> },
      { name: 'Drag & Drop', path: '/advanced-usage/dnd', component: <DndSection /> },
      { name: 'Report Data', path: '/advanced-usage/report', component: <ReportSection /> },
    ],
  },
];
```

---

## Componentes tucu-ui disponibles para usar

### Todos del paquete `@e-burgos/tucu-ui`

> **Importante**: `AutoPropsTable`, `PropPlayground`, `DynamicSectionsPage` y `PlaygroundButton` **son exportados por `@e-burgos/tucu-ui`** — no crearlos localmente.
> Re-exportados vía `apps/demo/src/components/index.ts`.

| Componente             | Uso en documentación                                                  |
| ---------------------- | --------------------------------------------------------------------- |
| `AutoPropsTable`       | Tabla de referencia de props (name/type/default/required/description) |
| `PropPlayground`       | Panel interactivo de controles con código generado en tiempo real     |
| `DynamicSectionsPage`  | Wrapper Page Type B: TOC lateral + secciones lazy                     |
| `PlaygroundButton`     | Botón de acción dentro de playgrounds                                 |
| `HeroCard`             | Tarjetas de feature en grids de Overview                              |
| `LazyComponentSection` | Carga lazy de secciones con id de ancla                               |
| `NavOptions`           | Acciones rápidas en headers de sección                                |
| `TableOfContents`      | Sidebar de navegación en Page Type B                                  |
| `CardContainer`        | Wrapper de secciones y ejemplos de código                             |
| `CardTitle`            | Títulos de sección dentro de cards                                    |
| `CodeBlock`            | Bloques de código con syntax highlight                                |
| `Typography`           | Texto semántico (h1-h6, p, code, etc.)                                |
| `Alert`                | Notas, advertencias, tips                                             |
| `Badge`                | Etiquetas de versión, tipo, estado                                    |
| `Button`               | CTAs                                                                  |
| `LucideIcons`          | Iconografía (1500+ icons)                                             |
| `AnchorLink`           | Links ancla para TOC                                                  |
| `useAnchorScroll`      | Hook para scroll suave a anclas                                       |

**Import recomendado** (barrel local de `apps/demo/`):

```tsx
import { AutoPropsTable, PropPlayground, DynamicSectionsPage, HeroCard } from '../../components';
```

### Componente `HeroPage` local

Ya existe en `apps/demo/src/components/HeroPage.tsx` — usar para todos los banners de página.

---

## Tipos e interfaces documentados

De `ui/tucutable/src/common/types/index.ts`:

| Interfaz / Tipo                                                          | Página donde se documenta           |
| ------------------------------------------------------------------------ | ----------------------------------- |
| `ColumnDef` (TanStack re-export)                                         | Column Guide                        |
| `TData`                                                                  | Column Guide                        |
| `HoverType`, `OpenType`                                                  | Row Features                        |
| `RowActionsType`, `IRowActions`                                          | Row Features                        |
| `IRowSelection`, `EnableRows`                                            | Row Features                        |
| `HeaderActionType`, `IHeaderOptions`                                     | Header & Sorting                    |
| `IPaginationOptions`                                                     | Pagination                          |
| `IManualPaginationOptions`, `IServerPagination`, `ManualPaginationState` | Pagination                          |
| `IDataTableStyles`                                                       | Styling                             |
| `IDataTableStateMessage`                                                 | States & UX                         |
| `IRenderSubDataTable`, `SubComponentProps`, `SubComponentDataTableProps` | Row Features                        |
| `IOptionalDataTableProps`                                                | Getting Started + todas las páginas |
| `DataTableProviderProps`, `ReportDataState`                              | Advanced Usage                      |

---

## Patrones de página empleados

### Page Type A — Overview / Live Demo

Estructura: `HeroPage → Feature Grid (HeroCard) → Live DataTable → Code Examples`

- Sin TOC lateral
- Ideal para: Introduction, Basic Usage, páginas cortas
- Ver detalle en `01-getting-started.md`

### Page Type B — Guía larga con TOC

Estructura: `TableOfContents sidebar ↔ HeroPage + LazyComponentSection[]`

- TOC lateral fija en desktop, colapsable en mobile
- Cada sección: ancla `#id`, `LazyComponentSection`, carga lazy con `React.lazy()`
- Ideal para: Column Guide, Pagination, Row Features, Advanced Usage
- Ver patrón en `02-column-guide.md`

### Nested Routing (sub-secciones)

Para páginas con `dropdownItems`:

- La ruta padre renderiza un índice visual (NavOptions + cards)
- Las rutas hijas renderizan la sección específica
- `NavOptions` provee navegación rápida entre sub-secciones

---

## Criterios de calidad por página

Cada página implementada debe cumplir:

- [ ] Banner con `HeroPage` (title, description, badges de versión/tech)
- [ ] Al menos 1 demo live con `DataTable` real con datos
- [ ] Al menos 1 `CodeBlock` con ejemplo copy-paste listo
- [ ] Props documentadas con `AutoPropsTable` (una vez creado el componente)
- [ ] Alert o nota de tip/warning donde aplique
- [ ] Responsive en mobile, tablet y desktop
- [ ] Dark mode correcto (usar tokens semánticos, no colores Tailwind estáticos)
- [ ] Imports desde `@e-burgos/tucutable` y `@e-burgos/tucu-ui` únicamente

---

## Notas técnicas

- **Siempre importar** desde `@e-burgos/tucu-ui` (single entry point) — NO desde sub-paths
- **Iconos** vía `LucideIcons.IconName` del namespace, NO desde `lucide-react` separado
- **Colores** con tokens semánticos: `bg-primary`, `text-muted`, etc. — NO `bg-blue-500`
- **Formularios** (si hay filtros): usar `Form` + `validationSchema` de tucu-ui
- **Routing**: usar `StandaloneAppRoutesMenuItem[]` del sistema tucu-ui, NO raw `react-router`
- **Lazy imports**: `const Section = lazy(() => import('./sections/SectionName'))`
- **Datos de demo**: reutilizar el fetch de Star Wars existente o crear datos mock locales
- **Anchor IDs**: camelCase, ej: `id="columnDefinition"`, no guiones
