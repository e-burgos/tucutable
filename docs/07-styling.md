# Styling — Plan de implementación

**Ruta objetivo:** `apps/demo/src/pages/styling/`

**Tipo de página:** Type B — `DynamicSectionsPage` con `TableOfContents` + lazy sections

---

## Estructura de archivos

```
apps/demo/src/pages/styling/
├── index.tsx
└── sections/
    ├── IntroSection.tsx              // Overview: cómo funciona IDataTableStyles
    ├── TableLevelStylesSection.tsx   // Estilos de contenedores de tabla
    ├── HeaderStylesSection.tsx       // Estilos del header/toolbar
    ├── RowStylesSection.tsx          // Estilos de filas y celdas
    ├── PaginationStylesSection.tsx   // Estilos de paginación
    └── ThemeIntegrationSection.tsx   // Integración con tucu-ui ThemeProvider
```

---

## Secciones del TOC

```
intro              → Introduction
table-styles       → Table Containers
header-styles      → Header & Toolbar Styles
row-styles         → Row & Cell Styles
pagination-styles  → Pagination Styles
theme-integration  → Theme Integration
```

---

## Tipos documentados

### `IDataTableStyles`

Esta es la interfaz principal de estilos — un objeto con propiedades `className` para cada parte de la tabla:

```ts
interface IDataTableStyles {
  // Root table container
  tableContainer?: {
    className?: string;
    style?: CSSProperties;
  };
  table?: {
    className?: string;
    style?: CSSProperties;
  };

  // Header section
  header?: {
    className?: string;
    style?: CSSProperties;
  };
  headerRow?: {
    className?: string;
    style?: CSSProperties;
  };
  headerCell?: {
    className?: string;
    style?: CSSProperties;
  };

  // Body rows
  bodyRow?: {
    className?: string;
    style?: CSSProperties;
  };
  bodyCell?: {
    className?: string;
    style?: CSSProperties;
  };
  bodyRowExpanded?: {
    className?: string;
    style?: CSSProperties;
  };

  // Footer
  footer?: {
    className?: string;
    style?: CSSProperties;
  };
  footerRow?: {
    className?: string;
    style?: CSSProperties;
  };
  footerCell?: {
    className?: string;
    style?: CSSProperties;
  };

  // Pagination bar
  pagination?: {
    className?: string;
    style?: CSSProperties;
  };
}
```

> **Nota**: Verificar los nombres exactos de propiedades leyendo el skill `tucutable-usage` o el tipo `IDataTableStyles` en `ui/tucutable/src/common/types/index.ts`.

---

## Borradores de secciones

### `sections/IntroSection.tsx`

```tsx
<CardContainer>
  <CardTitle title="How Styling Works">
    <Typography tag="p">
      Tucutable exposes a <code>styles</code> prop that accepts an
      <code>IDataTableStyles</code> object — each key corresponds to a specific part of the table and accepts <code>className</code> and <code>style</code>.
    </Typography>

    <Alert variant="info">
      <strong>Tailwind CSS v4:</strong> Tucutable uses Tailwind v4 internally. You can pass any Tailwind utility class as <code>className</code>, or raw inline styles via the <code>style</code> property.
    </Alert>

    {/* Visual diagram mapping each style slot */}
    <div className="mt-4 border rounded-lg overflow-hidden font-mono text-xs">
      <div className="bg-blue-50 dark:bg-blue-900/30 border-b p-2 text-blue-700 dark:text-blue-300">styles.header (toolbar area)</div>
      <div className="bg-purple-50 dark:bg-purple-900/30 border-b p-2 text-purple-700 dark:text-purple-300">styles.headerRow → styles.headerCell × N</div>
      <div className="bg-green-50 dark:bg-green-900/30 border-b p-2 text-green-700 dark:text-green-300">styles.bodyRow → styles.bodyCell × N (× M rows)</div>
      <div className="bg-orange-50 dark:bg-orange-900/30 p-2 text-orange-700 dark:text-orange-300">styles.pagination</div>
    </div>

    <CodeBlock
      language="tsx"
      code={`<DataTable
  data={data}
  columns={columns}
  styles={{
    tableContainer: { className: 'rounded-xl shadow-lg' },
    headerRow:      { className: 'bg-primary/10' },
    headerCell:     { className: 'font-bold uppercase tracking-wide text-xs' },
    bodyRow:        { className: 'hover:bg-primary/5' },
    pagination:     { className: 'border-t-2 border-primary/20' },
  }}
/>`}
    />
  </CardTitle>
</CardContainer>
```

---

### `sections/TableLevelStylesSection.tsx`

```tsx
<AutoPropsTable
  title="Table Container Styles"
  props={[
    { prop: 'styles.tableContainer', type: '{ className?, style? }', required: false, description: 'Outermost wrapper div of the table component' },
    { prop: 'styles.table', type: '{ className?, style? }', required: false, description: 'The HTML <table> element itself' },
    { prop: 'styles.footer', type: '{ className?, style? }', required: false, description: 'Footer row area (below body rows)' },
    { prop: 'styles.footerRow', type: '{ className?, style? }', required: false, description: 'Individual footer row' },
    { prop: 'styles.footerCell', type: '{ className?, style? }', required: false, description: 'Individual footer cell' },
  ]}
/>;

// Live demo with switching between style presets
const stylePresets = {
  default: {},
  bordered: {
    table: { className: 'border-2 border-gray-300 dark:border-gray-600' },
  },
  striped: {
    bodyRow: { className: '[&:nth-child(even)]:bg-gray-50 dark:[&:nth-child(even)]:bg-gray-800/30' },
  },
  rounded: {
    tableContainer: { className: 'rounded-2xl overflow-hidden shadow-xl' },
  },
  compact: {
    bodyCell: { className: 'py-1 px-3 text-xs' },
    headerCell: { className: 'py-1 px-3 text-xs font-semibold' },
  },
};

<PropPlayground
  title="Table Container Style Playground"
  controls={[{ type: 'select', prop: 'preset', label: 'Style Preset', defaultValue: 'default', options: Object.keys(stylePresets).map((k) => ({ label: k, value: k })) }]}
  renderDemo={(vals) => <DataTable tableId="style-demo" data={STYLING_DEMO_DATA} columns={styleCols} styles={stylePresets[vals.preset as keyof typeof stylePresets]} />}
  renderCode={(vals) => `<DataTable
  styles={${JSON.stringify(stylePresets[vals.preset as keyof typeof stylePresets], null, 2)}}
/>`}
/>;
```

---

### `sections/HeaderStylesSection.tsx`

```tsx
<AutoPropsTable
  title="Header & Column Header Styles"
  props={[
    { prop: 'styles.header',     type: '{ className?, style? }', required: false, description: 'Toolbar/header bar above the column headers' },
    { prop: 'styles.headerRow',  type: '{ className?, style? }', required: false, description: 'The row containing all column header cells' },
    { prop: 'styles.headerCell', type: '{ className?, style? }', required: false, description: 'Individual column header cell (th)' },
  ]}
/>

<CodeBlock
  language="tsx"
  code={`// Modern header with gradient
styles={{
  header:     { className: 'bg-gradient-to-r from-primary to-secondary text-white rounded-t-xl px-6 py-4' },
  headerRow:  { className: 'bg-gray-900 text-white' },
  headerCell: { className: 'text-white/80 font-medium text-xs uppercase tracking-widest' },
}}`}
/>

<Alert variant="info">
  Column header styles (<code>styles.headerCell</code>) apply to all column
  header cells <em>except</em> helper columns (selection, actions) which have
  their own internal styling.
</Alert>
```

---

### `sections/RowStylesSection.tsx`

```tsx
<AutoPropsTable
  title="Row & Cell Styles"
  props={[
    { prop: 'styles.bodyRow',         type: '{ className?, style? }', required: false, description: 'Standard data row (tr)' },
    { prop: 'styles.bodyCell',        type: '{ className?, style? }', required: false, description: 'Standard data cell (td)' },
    { prop: 'styles.bodyRowExpanded', type: '{ className?, style? }', required: false, description: 'Row containing the expanded sub-component area' },
  ]}
/>

<Alert variant="warning">
  Row styles are applied to <em>all</em> rows. Use Tailwind's <code>nth-child</code>
  modifier inside className if you need alternating row colors:
  <code>[&:nth-child(even)]:bg-gray-50</code>
</Alert>

// Dynamic row styles (per-row conditional coloring)
<CodeBlock
  language="tsx"
  code={`// Per-row conditional styling via column meta or onRow
// Tucutable doesn't have onRow prop — use column cell renderer instead
{
  accessorKey: 'status',
  cell: ({ row }) => (
    <tr className={row.original.status === 'active' ? 'bg-green-50' : 'bg-red-50'}>
      ...
    </tr>
  ),
}
// Or style the status cell directly
cell: ({ getValue }) => (
  <Badge color={getValue() === 'active' ? 'success' : 'danger'}>
    {getValue() as string}
  </Badge>
)`}
/>
```

---

### `sections/ThemeIntegrationSection.tsx`

```tsx
// Integración con ThemeProvider de tucu-ui
// Cómo los tokens semánticos afectan a la tabla (light/dark mode)
// CSS vars de tucu-ui

<Alert variant="info">
  Tucutable respects the <code>ThemeProvider</code> from <code>@e-burgos/tucu-ui</code>.
  When dark mode is active, all default table styles automatically adapt.
</Alert>

<CodeBlock
  language="tsx"
  code={`// apps/demo/src/app.tsx — ThemeProvider already wraps the app
import { ThemeProvider } from '@e-burgos/tucu-ui';

<ThemeProvider
  theme="default"
  mode="dark"  // or "light"
  layout="admin"
  menuItems={menuItems}
>
  {/* DataTable automatically uses dark mode styles */}
  <DataTable data={data} columns={columns} />
</ThemeProvider>`}
/>

// SwitchMode component
<CodeBlock
  language="tsx"
  code={`// Toggle dark/light mode from any component
import { SwitchMode } from '../../components/SwitchMode';

// Already added to the demo app header
<SwitchMode />`}
/>

// Tokens en custom styles
<CodeBlock
  language="tsx"
  code={`// Using semantic tokens in styles (works in both light and dark mode)
styles={{
  headerCell: {
    // Good: semantic tokens
    className: 'text-primary bg-primary/5',
  },
  bodyRow: {
    // Avoid: hardcoded colors break dark mode
    className: 'bg-blue-50',  // ❌

    // Better: use dark: modifier
    className: 'bg-blue-50 dark:bg-blue-900/20',  // ✅
  },
}}`}
/>
```

---

## Página `index.tsx`

```tsx
// apps/demo/src/pages/styling/index.tsx
import { lazy } from 'react';
import { DynamicSectionsPage } from '../../components/DynamicSectionsPage';
import HeroPage from '../../components/HeroPage';

export function StylingPage() {
  return (
    <DynamicSectionsPage
      hero={<HeroPage title="Styling" description="Complete guide to customizing Tucutable's appearance using the IDataTableStyles API and tucu-ui theme integration." />}
      sections={[
        { id: 'intro', label: 'How It Works', component: lazy(() => import('./sections/IntroSection')) },
        { id: 'table-styles', label: 'Table Containers', component: lazy(() => import('./sections/TableLevelStylesSection')) },
        { id: 'header-styles', label: 'Header Styles', component: lazy(() => import('./sections/HeaderStylesSection')) },
        { id: 'row-styles', label: 'Row & Cell Styles', component: lazy(() => import('./sections/RowStylesSection')) },
        { id: 'pagination-styles', label: 'Pagination Styles', component: lazy(() => import('./sections/PaginationStylesSection')) },
        { id: 'theme-integration', label: 'Theme Integration', component: lazy(() => import('./sections/ThemeIntegrationSection')) },
      ]}
    />
  );
}
```

---

## Style presets para las demos

```tsx
// Reutilizar en múltiples secciones
export const STYLE_PRESETS = {
  default: {},
  bordered: {
    table: { className: 'border-2 border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden' },
  },
  striped: {
    bodyRow: { className: '[&:nth-child(even)]:bg-gray-50 dark:[&:nth-child(even)]:bg-gray-800/30' },
  },
  minimal: {
    headerRow: { className: 'border-b-0' },
    headerCell: { className: 'text-xs text-gray-400 uppercase font-normal' },
    bodyRow: { className: 'border-0' },
    bodyCell: { className: 'border-0 py-2' },
  },
  card: {
    tableContainer: { className: 'bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-2' },
    headerRow: { className: 'bg-gradient-to-r from-primary/10 to-secondary/10 rounded-t-lg' },
    headerCell: { className: 'text-primary font-semibold' },
    pagination: { className: 'border-t border-gray-100 dark:border-gray-700 mt-0 pt-2' },
  },
};
```

---

## Checklist de calidad

- [ ] `DynamicSectionsPage` con TOC "Intro / Table / Header / Rows / Pagination / Theme"
- [ ] `HeroPage` con título "Styling"
- [ ] `IntroSection` con diagrama visual de slots + `CodeBlock` ejemplo completo
- [ ] `TableLevelStylesSection` con `AutoPropsTable` + `PropPlayground` (5 presets)
- [ ] `HeaderStylesSection` con `AutoPropsTable` + `CodeBlock` gradient header
- [ ] `RowStylesSection` con `AutoPropsTable` + `Alert` nth-child + `CodeBlock` dynamic
- [ ] `PaginationStylesSection` con `AutoPropsTable` + `PropPlayground`
- [ ] `ThemeIntegrationSection` con `Alert` + 3 `CodeBlock` (ThemeProvider, SwitchMode, tokens)
- [ ] `STYLE_PRESETS` reutilizable en múltiples secciones
- [ ] Demos usan datos estáticos
- [ ] Responsive / dark mode
