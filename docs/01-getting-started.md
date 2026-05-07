# Getting Started — Plan de reescritura

**Ruta objetivo:** `apps/demo/src/pages/introduction/index.tsx` (reemplazar el contenido actual)

**Tipo de página:** Type A — Overview con live demo y secciones de guía rápida

---

## Objetivo

Reescribir la página Introduction actual para que:

1. Use `HeroPage` con badges de versión y tech stack
2. Tenga sección "Why Tucutable" con `HeroCard` grid
3. Tenga sección de instalación con `CodeBlock` y `Alert`
4. Tenga un live mini-demo (DataTable básica, sin server-side)
5. Tenga guía de Quick Start paso a paso
6. Apunte a otras páginas con `NavOptions` o cards de navegación

---

## Estructura de la página

```
<Introduction>
  ├── <HeroPage>
  │     title: "Tucutable"
  │     description: "..."
  │     badges: ["v2.x", "TanStack Table v8", "Tailwind v4", "Zustand v5"]
  │     buttons: [GitHub, npm, Getting Started]
  │     backgroundAnimation: true
  │
  ├── <section id="why-tucutable">
  │     Typography h2: "Why Tucutable?"
  │     grid 3 cols: HeroCard × 6 cards
  │
  ├── <section id="installation">
  │     CardContainer
  │       CardTitle: "Installation"
  │       Alert (info): "Requires React 18+, TanStack Table v8, Tailwind CSS v4"
  │       CodeBlock (bash): pnpm install @e-burgos/tucutable
  │       CodeBlock (bash): npm install @e-burgos/tucutable
  │       CodeBlock (bash): yarn add @e-burgos/tucutable
  │       Typography: "Then import the CSS:"
  │       CodeBlock (tsx): import '@e-burgos/tucutable/styles.css'
  │
  ├── <section id="quick-start">
  │     CardContainer
  │       CardTitle: "Quick Start"
  │       Steps numbered (1-4) cada uno con CodeBlock
  │
  ├── <section id="live-demo">
  │     CardContainer
  │       CardTitle: "Live Demo"
  │       DataTable (datos mock estáticos, 5-8 columnas, 20 filas)
  │
  └── <section id="whats-next">
        Typography h2: "What's Next?"
        Grid 2x2: Cards de navegación con LucideIcons
```

---

## Sección: HeroPage

```tsx
<HeroPage
  title="Tucutable"
  description="A modern, comprehensive React data table built with TypeScript, Tailwind CSS v4, and TanStack Table v8. Features advanced column management, drag-and-drop, state persistence, and production-ready functionality."
  githubButton
  getStartedButton
  backgroundAnimation
  icon={<img src={TucuTableLogo} className="w-48 h-48 filter drop-shadow-sm" />}
/>

// Badges debajo del hero (si HeroPage no los soporta, agregarlos en la section siguiente):
<div className="flex flex-wrap gap-2 justify-center">
  <Badge color="primary">v2.x</Badge>
  <Badge color="gray">TanStack Table v8</Badge>
  <Badge color="gray">Tailwind CSS v4</Badge>
  <Badge color="gray">Zustand v5</Badge>
  <Badge color="gray">React 18+</Badge>
  <Badge color="gray">TypeScript</Badge>
</div>
```

---

## Sección: Why Tucutable (HeroCard grid)

```tsx
// Props de HeroCard (de tucu-ui bundle — alias cs):
// Verificar props exactas con la skill catalog cuando se implemente

const features = [
  {
    icon: <LucideIcons.Columns className="w-6 h-6" />,
    title: 'Advanced Column Management',
    description: 'Drag & drop reordering, resizing, pinning, and visibility control',
    color: 'purple',
  },
  {
    icon: <LucideIcons.Layers className="w-6 h-6" />,
    title: 'State Persistence',
    description: 'Zustand-powered store with automatic cache and localStorage sync',
    color: 'blue',
  },
  {
    icon: <LucideIcons.Server className="w-6 h-6" />,
    title: 'Server-Side Pagination',
    description: 'Built-in support for remote data, manual pagination and infinite scroll',
    color: 'green',
  },
  {
    icon: <LucideIcons.Rows className="w-6 h-6" />,
    title: 'Row Selection & Actions',
    description: 'Multi-select with checkboxes, bulk actions, and per-row action menus',
    color: 'orange',
  },
  {
    icon: <LucideIcons.ChevronDown className="w-6 h-6" />,
    title: 'Expandable Rows',
    description: 'Nested sub-tables and custom expandable row content',
    color: 'pink',
  },
  {
    icon: <LucideIcons.Palette className="w-6 h-6" />,
    title: 'Fully Customizable',
    description: 'Complete CSS class overrides via IDataTableStyles for any UI system',
    color: 'teal',
  },
];

// Renderizar en grid con CardContainer o HeroCard
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
  {features.map((feature) => (
    <HeroCard key={feature.title} icon={feature.icon} title={feature.title} description={feature.description} />
    // Si HeroCard no acepta estos props, usar CardContainer manual (ver section below)
  ))}
</div>;
```

> **Nota de implementación**: Verificar los props exactos de `HeroCard` antes de usar.
> Si `HeroCard` no tiene estos props, reemplazar con:
>
> ```tsx
> <CardContainer key={feature.title}>
>   <div className="flex items-start gap-3 p-4">
>     <div className="p-2 bg-primary/10 rounded-lg">{feature.icon}</div>
>     <div>
>       <Typography tag="h4" className="font-semibold mb-1">
>         {feature.title}
>       </Typography>
>       <Typography tag="p" color="muted">
>         {feature.description}
>       </Typography>
>     </div>
>   </div>
> </CardContainer>
> ```

---

## Sección: Installation

```tsx
<section id="installation" className="scroll-mt-20 space-y-6">
  <CardContainer>
    <CardTitle title="Installation" className="mb-4 mt-6">
      <div className="space-y-4">
        <Alert variant="info">
          <strong>Requirements:</strong> React 18+, Node.js 18+, Tailwind CSS v4
        </Alert>

        <Typography tag="h4" className="font-semibold">
          Package Manager
        </Typography>

        <div className="space-y-3">
          <div>
            <Typography tag="caption" color="muted">
              pnpm
            </Typography>
            <CodeBlock code="pnpm add @e-burgos/tucutable" language="bash" />
          </div>
          <div>
            <Typography tag="caption" color="muted">
              npm
            </Typography>
            <CodeBlock code="npm install @e-burgos/tucutable" language="bash" />
          </div>
          <div>
            <Typography tag="caption" color="muted">
              yarn
            </Typography>
            <CodeBlock code="yarn add @e-burgos/tucutable" language="bash" />
          </div>
        </div>

        <Typography tag="h4" className="font-semibold">
          Import CSS
        </Typography>
        <CodeBlock
          language="tsx"
          code={`// main.tsx or App.tsx
import '@e-burgos/tucutable/styles.css';`}
        />

        <Typography tag="h4" className="font-semibold">
          Tailwind Configuration
        </Typography>
        <CodeBlock
          language="css"
          code={`/* Your tailwind.css */
@import "tailwindcss";
@import "@e-burgos/tucutable/styles.css";`}
        />
      </div>
    </CardTitle>
  </CardContainer>
</section>
```

---

## Sección: Quick Start (4 pasos)

```tsx
<section id="quick-start" className="scroll-mt-20 space-y-6">
  <CardContainer>
    <CardTitle title="Quick Start" className="mb-4 mt-6">
      <div className="space-y-8">
        {/* Paso 1: Definir columnas */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-primary flex items-center justify-center">
              <Typography tag="span" color="light" className="text-sm font-bold">
                1
              </Typography>
            </div>
            <Typography tag="h4" className="font-semibold">
              Define your columns
            </Typography>
          </div>
          <CodeBlock
            language="tsx"
            code={`import type { ColumnDef } from '@e-burgos/tucutable';

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

const columns: ColumnDef<User>[] = [
  { accessorKey: 'id',    header: 'ID'    },
  { accessorKey: 'name',  header: 'Name'  },
  { accessorKey: 'email', header: 'Email' },
  { accessorKey: 'role',  header: 'Role'  },
];`}
          />
        </div>

        {/* Paso 2: Preparar datos */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-primary flex items-center justify-center">
              <Typography tag="span" color="light" className="text-sm font-bold">
                2
              </Typography>
            </div>
            <Typography tag="h4" className="font-semibold">
              Prepare your data
            </Typography>
          </div>
          <CodeBlock
            language="tsx"
            code={`const users: User[] = [
  { id: 1, name: 'Alice Johnson', email: 'alice@example.com', role: 'Admin'  },
  { id: 2, name: 'Bob Smith',     email: 'bob@example.com',   role: 'Editor' },
  { id: 3, name: 'Carol White',   email: 'carol@example.com', role: 'Viewer' },
];`}
          />
        </div>

        {/* Paso 3: Renderizar DataTable */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-primary flex items-center justify-center">
              <Typography tag="span" color="light" className="text-sm font-bold">
                3
              </Typography>
            </div>
            <Typography tag="h4" className="font-semibold">
              Render the table
            </Typography>
          </div>
          <CodeBlock
            language="tsx"
            code={`import { DataTable } from '@e-burgos/tucutable';

export function UsersTable() {
  return (
    <DataTable
      data={users}
      columns={columns}
      tableId="users-table"
    />
  );
}`}
          />
        </div>

        {/* Paso 4: Añadir paginación */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-primary flex items-center justify-center">
              <Typography tag="span" color="light" className="text-sm font-bold">
                4
              </Typography>
            </div>
            <Typography tag="h4" className="font-semibold">
              Add pagination (optional)
            </Typography>
          </div>
          <CodeBlock
            language="tsx"
            code={`<DataTable
  data={users}
  columns={columns}
  tableId="users-table"
  pagination={{
    showPagination: true,
    defaultPageSize: 10,
    showRowsPerPage: true,
  }}
/>`}
          />
        </div>
      </div>
    </CardTitle>
  </CardContainer>
</section>
```

---

## Sección: Live Demo

```tsx
// Crear mock data directamente en el archivo de la página
// NO usar fetch externo — la demo debe funcionar offline

const MOCK_USERS = Array.from({ length: 30 }, (_, i) => ({
  id: i + 1,
  name: `User ${i + 1}`,
  email: `user${i + 1}@example.com`,
  role: ['Admin', 'Editor', 'Viewer', 'Manager'][i % 4],
  status: i % 3 === 0 ? 'inactive' : 'active',
  createdAt: new Date(2024, i % 12, (i % 28) + 1).toLocaleDateString(),
}));

// Columns hook local
function useIntroColumns() {
  return useMemo(
    () =>
      [
        { accessorKey: 'id', header: 'ID', size: 60 },
        { accessorKey: 'name', header: 'Name', size: 200 },
        { accessorKey: 'email', header: 'Email', size: 250 },
        { accessorKey: 'role', header: 'Role', size: 120 },
        { accessorKey: 'status', header: 'Status', size: 100, cell: ({ getValue }) => <Badge color={getValue() === 'active' ? 'success' : 'gray'}>{getValue() as string}</Badge> },
        { accessorKey: 'createdAt', header: 'Created', size: 130 },
      ] as ColumnDef<(typeof MOCK_USERS)[0]>[],
    [],
  );
}

// En la sección:
<section id="live-demo" className="scroll-mt-20">
  <CardContainer>
    <CardTitle title="Live Demo" className="mb-4 mt-6">
      <Typography tag="p" color="muted" className="mb-4">
        A fully functional table with 30 rows, pagination, sorting and column management. Try sorting columns, changing page size, or toggling column visibility.
      </Typography>

      <DataTable
        tableId="intro-demo"
        data={MOCK_USERS}
        columns={introColumns}
        pagination={{
          showPagination: true,
          defaultPageSize: 5,
          showRowsPerPage: true,
        }}
        headerActions={{
          showColumnsButton: true,
          showFilterButton: false,
        }}
      />
    </CardTitle>
  </CardContainer>
</section>;
```

---

## Sección: What's Next (navigation cards)

```tsx
const nextPages = [
  {
    title: 'Column Guide',
    description: 'ColumnDef, sorting, resizing, pinning, dragging, and helper columns',
    path: '/column-guide',
    icon: <LucideIcons.Columns className="w-8 h-8" />,
    color: 'from-purple-500 to-pink-500',
  },
  {
    title: 'Pagination',
    description: 'Client-side, server-side, and manual pagination patterns',
    path: '/pagination',
    icon: <LucideIcons.ChevronRight className="w-8 h-8" />,
    color: 'from-blue-500 to-cyan-500',
  },
  {
    title: 'Row Features',
    description: 'Row actions, multi-select, checkboxes, and expandable sub-tables',
    path: '/row-features',
    icon: <LucideIcons.Rows className="w-8 h-8" />,
    color: 'from-green-500 to-teal-500',
  },
  {
    title: 'Advanced Usage',
    description: 'Context, Zustand store, custom providers, and drag-and-drop',
    path: '/advanced-usage',
    icon: <LucideIcons.Settings className="w-8 h-8" />,
    color: 'from-orange-500 to-red-500',
  },
];

<section id="whats-next" className="scroll-mt-20 space-y-6">
  <div className="text-center">
    <Typography tag="h2" className="text-2xl font-bold mb-2">
      What's Next?
    </Typography>
    <Typography tag="p" color="muted">
      Explore all the features Tucutable has to offer
    </Typography>
  </div>

  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
    {nextPages.map((page) => (
      <CardContainer
        key={page.path}
        className="cursor-pointer hover:shadow-md transition-shadow"
        onClick={() => navigate(page.path)} // usar useNavigate de tucu-ui routing
      >
        <div className="flex items-start gap-4 p-2">
          <div className={`p-3 rounded-xl bg-gradient-to-br ${page.color} text-white flex-shrink-0`}>{page.icon}</div>
          <div>
            <Typography tag="h4" className="font-semibold mb-1">
              {page.title}
            </Typography>
            <Typography tag="p" color="muted" className="text-sm">
              {page.description}
            </Typography>
          </div>
          <LucideIcons.ArrowRight className="w-5 h-5 text-gray-400 self-center ml-auto flex-shrink-0" />
        </div>
      </CardContainer>
    ))}
  </div>
</section>;
```

---

## Archivo final esperado

```
apps/demo/src/pages/introduction/
├── index.tsx                  // Reescritura completa usando este plan
```

No se necesitan sub-carpetas `hooks/` o `components/` para Introduction — todo va inline o con data mock local.

---

## Checklist de calidad

- [ ] `HeroPage` con title "Tucutable", description, badges, buttonss GitHub + npm
- [ ] Grid de 6 `HeroCard` (o CardContainer manual) con features
- [ ] `CodeBlock` para installation (pnpm, npm, yarn + CSS import)
- [ ] `Alert` con requisitos de versión
- [ ] 4 pasos de Quick Start con `CodeBlock` cada uno
- [ ] Live demo con datos mock (sin fetch externo)
- [ ] Navigation cards al final
- [ ] Responsive en mobile/tablet/desktop
- [ ] Dark mode correcto
- [ ] Sin imports desde `lucide-react` directo — usar `LucideIcons`
