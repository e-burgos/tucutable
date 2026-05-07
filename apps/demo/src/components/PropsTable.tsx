import React, { useState } from 'react';
import { CardContainer, CardTitle, Typography, Badge } from '@e-burgos/tucu-ui';
import { propsRegistry, ComponentMeta } from '../generated/tucutable-props';

// ─── Manual descriptions override (from IOptionalDataTableProps JSDoc) ────────

const DESCRIPTIONS: Record<string, Record<string, string>> = {
  DataTable: {
    tableId:
      'Unique identifier for the table instance. Used for store persistence and cache management.',
    data: 'Array of data objects to display in the table rows.',
    columns: 'Array of TanStack Table column definitions (ColumnDef).',
    showHeader: 'Whether to show the table header toolbar with controls.',
    sx: 'Custom CSS-in-JS styles for each anatomical part of the table (wrapper, row, cell, pagination, etc.).',
    initialConfig:
      'Default ColumnDef configuration applied to all columns (overridable per column).',
    isLoading: 'Shows a skeleton/spinner loading state when true.',
    isError: 'Shows the error state message when true.',
    isFetching:
      'Shows a subtle loading indicator (e.g. while keeping previous data). Use with server-side pagination.',
    pagination:
      'Configuration object for client-side pagination (showPagination, pageSize, rowsInfo, etc.).',
    title: 'Optional title string displayed in the table header toolbar.',
    border: 'Whether to render a border around the entire table container.',
    headerOptions:
      'Controls which column-level actions appear in the header (sort, pin, resize, drag, visibility).',
    smallAnatomy:
      'Enables a compact/dense table layout with reduced cell padding.',
    showFooter: 'Whether to display the table footer row.',
    stateMessage:
      'Custom messages for empty and error states (noData, errorData, contactSupport, etc.).',
    rowActions:
      'Array of per-row actions shown in a dedicated actions column (view, edit, delete, download, void, more).',
    rowSelection:
      'Enables row selection with checkbox (multi-select) or radio (single-select) mode.',
    forceShowMenuActions:
      'Forces row actions to always render as a dropdown menu regardless of count.',
    renderSubComponent:
      'React component rendered inside an expanded row. Receives SubComponentProps<TData>.',
    renderSubDataTable:
      'Configuration to render a nested DataTable inside an expanded row.',
    setCurrentRow:
      'Callback invoked when a row is clicked, providing the full Row<TData> object.',
    enableMultiSort:
      'Allows sorting by multiple columns simultaneously when true.',
    manualSorting:
      'Disables client-side sorting. Use with onSortModelChange for server-side sort.',
    onSortModelChange:
      'Callback invoked when the sort state changes. Receives the new SortingState array.',
    mode: 'Forces a specific color mode ("light" | "dark") for this table instance, overriding the global theme.',
  },
};

// ─── Type badge color helper ────────────────────────────────────

function getTypeBadgeClass(type: string): string {
  if (type === 'string') return 'bg-info/15 text-info';
  if (type === 'false | true' || type === 'boolean')
    return 'bg-warning/15 text-warning';
  if (type.includes('[]') || type.includes('Array'))
    return 'bg-success/15 text-success';
  if (type.includes('=>') || type.includes('Function'))
    return 'bg-violet-500/15 text-violet-600 dark:text-violet-400';
  if (type.includes('|')) return 'bg-brand/15 text-brand';
  return 'bg-muted/40 text-muted-foreground';
}

// ─── Helpers ────────────────────────────────────────────────────

function normalizeType(type: string): string {
  // Shorten verbose generic types
  if (
    type.startsWith('Partial<ColumnDefBase') ||
    type.includes('AccessorKeyColumnDefBase')
  ) {
    return 'Partial<ColumnDef<TData, unknown>>';
  }
  if (type === 'false | true') return 'boolean';
  return type;
}

// ─── Component ─────────────────────────────────────────────────

interface PropsTableProps {
  /** Component name from the generated registry (e.g. "DataTable") */
  componentName: string;
  /** Override the title shown above the table */
  title?: string;
  /** Show a search/filter input above the table */
  searchable?: boolean;
  /** Show only required props */
  onlyRequired?: boolean;
}

export const PropsTable: React.FC<PropsTableProps> = ({
  componentName,
  title,
  searchable = true,
  onlyRequired = false,
}) => {
  const [search, setSearch] = useState('');
  const [showOnlyRequired, setShowOnlyRequired] = useState(onlyRequired);

  const meta: ComponentMeta | undefined = propsRegistry[componentName];

  if (!meta) {
    return (
      <CardContainer className="p-4">
        <Typography tag="p" className="text-danger">
          Component "{componentName}" not found in generated registry. Run{' '}
          <code className="font-mono text-sm">pnpm generate:props</code> to
          regenerate.
        </Typography>
      </CardContainer>
    );
  }

  const descriptions = DESCRIPTIONS[componentName] ?? {};

  const filtered = meta.props.filter((prop) => {
    if (showOnlyRequired && !prop.required) return false;
    if (!search) return true;
    return (
      prop.name.toLowerCase().includes(search.toLowerCase()) ||
      (descriptions[prop.name] ?? prop.description)
        .toLowerCase()
        .includes(search.toLowerCase())
    );
  });

  return (
    <CardContainer className="overflow-hidden">
      <CardTitle
        title={title ?? `${componentName} Props`}
        className="mt-2 mb-2"
      >
        <div className="w-full px-4 sm:px-6 pb-6">
          {/* Toolbar */}
          {searchable && (
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <input
                type="text"
                placeholder="Filter props..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="flex-1 min-w-[180px] max-w-xs px-3 py-1.5 text-sm rounded-lg border border-border bg-body text-heading placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-brand/40"
              />
              <label className="flex items-center gap-2 text-sm text-muted-foreground cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={showOnlyRequired}
                  onChange={(e) => setShowOnlyRequired(e.target.checked)}
                  className="w-4 h-4 accent-brand"
                />
                Required only
              </label>
              <Typography
                tag="p"
                className="text-xs text-muted-foreground ml-auto"
              >
                {filtered.length} / {meta.props.length} props
              </Typography>
            </div>
          )}

          {/* Table */}
          <div className="overflow-x-auto rounded-lg border border-border">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-muted/30 text-left">
                  <th className="px-3 py-2.5 font-semibold text-heading border-b border-border w-40">
                    Prop
                  </th>
                  <th className="px-3 py-2.5 font-semibold text-heading border-b border-border w-52">
                    Type
                  </th>
                  <th className="px-3 py-2.5 font-semibold text-heading border-b border-border w-20 text-center">
                    Required
                  </th>
                  <th className="px-3 py-2.5 font-semibold text-heading border-b border-border w-24">
                    Default
                  </th>
                  <th className="px-3 py-2.5 font-semibold text-heading border-b border-border">
                    Description
                  </th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((prop, idx) => (
                  <tr
                    key={prop.name}
                    className={`border-b border-border last:border-0 transition-colors ${
                      idx % 2 === 0 ? 'bg-body' : 'bg-muted/10'
                    } hover:bg-brand/5`}
                  >
                    {/* Prop name */}
                    <td className="px-3 py-2.5 align-top">
                      <code className="font-mono text-xs font-semibold text-brand">
                        {prop.name}
                      </code>
                    </td>

                    {/* Type */}
                    <td className="px-3 py-2.5 align-top">
                      <Badge
                        className={`font-mono text-xs truncate max-w-[200px] ${getTypeBadgeClass(
                          normalizeType(prop.type),
                        )}`}
                      >
                        {normalizeType(prop.type)}
                      </Badge>
                    </td>

                    {/* Required */}
                    <td className="px-3 py-2.5 align-top text-center">
                      {prop.required ? (
                        <Badge className="bg-danger/15 text-danger text-xs">
                          yes
                        </Badge>
                      ) : (
                        <span className="text-muted-foreground text-xs">—</span>
                      )}
                    </td>

                    {/* Default */}
                    <td className="px-3 py-2.5 align-top">
                      {prop.defaultValue ? (
                        <code className="font-mono text-xs text-muted-foreground">
                          {prop.defaultValue}
                        </code>
                      ) : (
                        <span className="text-muted-foreground text-xs">—</span>
                      )}
                    </td>

                    {/* Description */}
                    <td className="px-3 py-2.5 align-top text-muted-foreground text-xs leading-relaxed">
                      {descriptions[prop.name] ?? prop.description ?? '—'}
                    </td>
                  </tr>
                ))}

                {filtered.length === 0 && (
                  <tr>
                    <td
                      colSpan={5}
                      className="px-3 py-8 text-center text-muted-foreground text-sm"
                    >
                      No props match your filter.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </CardTitle>
    </CardContainer>
  );
};

export default PropsTable;
