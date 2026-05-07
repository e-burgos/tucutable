import React from 'react';
import {
  CardContainer,
  CardTitle,
  Typography,
  CodeBlock,
  Alert,
  Badge,
  LucideIcons,
} from '@e-burgos/tucu-ui';

const QUERY_CODE = `import { useQuery, useQueryClient, keepPreviousData } from '@tanstack/react-query';
import type { TanstackTable } from '@e-burgos/tucutable';

async function fetchStarWarsPeople(
  pagination: TanstackTable.PaginationState
): Promise<StarWarsApiResponse> {
  const page = pagination.pageIndex + 1;
  const res = await fetch(
    \`https://swapi.dev/api/people/?page=\${page}&format=json\`
  );
  if (!res.ok) throw new Error(\`HTTP \${res.status}\`);
  return res.json();
}

export function useStarWarsPeople({ pagination }) {
  const queryClient = useQueryClient();

  const { data, isLoading, isError, error, isFetching } = useQuery({
    queryKey: ['starWarsPeople', pagination],
    queryFn: () => fetchStarWarsPeople(pagination),
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    placeholderData: keepPreviousData, // keeps previous page visible while loading
  });

  const fetchPage = (p: TanstackTable.PaginationState) => {
    queryClient.prefetchQuery({
      queryKey: ['starWarsPeople', p],
      queryFn: () => fetchStarWarsPeople(p),
      staleTime: 5 * 60 * 1000,
    });
  };

  return {
    data: data?.results ?? [],
    totalCount: data?.count ?? 0,
    isLoading, isError,
    error: error instanceof Error ? error : null,
    isFetching, fetchPage,
  };
}`;

const COLUMNS_CODE = `import { useMemo } from 'react';
import { TanstackTable } from '@e-burgos/tucutable';
import { LucideIcons } from '@e-burgos/tucu-ui';
import type { StarWarsPerson } from '../../../queries/types';

export function useStarWarsColumns() {
  return useMemo(
    () => [
      {
        accessorKey: 'name',
        header: 'Name',
        cell: (info: TanstackTable.CellContext<StarWarsPerson, unknown>) => {
          const value = info.getValue() as string;
          return (
            <div className="flex items-center gap-2">
              <LucideIcons.User className="w-4 h-4 text-muted-foreground" />
              <span className="font-medium">{value}</span>
            </div>
          );
        },
        enableSorting: true,
        size: 200,
      },
      {
        accessorKey: 'height',
        header: 'Height (cm)',
        // Custom sortingFn — treats 'unknown' as 0 to avoid NaN sort
        sortingFn: (rowA, rowB) => {
          const a = rowA.original.height === 'unknown'
            ? 0 : parseInt(rowA.original.height, 10);
          const b = rowB.original.height === 'unknown'
            ? 0 : parseInt(rowB.original.height, 10);
          return a - b;
        },
        enableSorting: true,
        size: 120,
      },
      // hair_color, skin_color, eye_color, birth_year, gender, films ...
    ] as TanstackTable.ColumnDef<StarWarsPerson>[],
    []
  );
}`;

const SUBCOMPONENT_CODE = `export function PersonDetails({ person }: { person: StarWarsPerson }) {
  return (
    <CardContainer className="p-4 m-2">
      {/* Avatar + name */}
      <div className="flex items-center gap-3 mb-4">
        <div className="w-12 h-12 bg-linear-to-br from-yellow-500 to-orange-500
             rounded-full flex items-center justify-center">
          <LucideIcons.User className="w-6 h-6 text-white" />
        </div>
        <Typography tag="h3" className="text-xl font-bold">
          {person.name}
        </Typography>
      </div>
      {/* Detail grid */}
      <div className="grid grid-cols-2 gap-3 text-sm">
        <div>Height: {person.height} cm</div>
        <div>Mass:   {person.mass} kg</div>
        <div>Born:   {person.birth_year}</div>
        <div>Gender: {person.gender}</div>
        <div>Hair:   {person.hair_color}</div>
        <div>Eyes:   {person.eye_color}</div>
        <div>Films:  {person.films.length}</div>
        <div>Ships:  {person.starships.length}</div>
      </div>
    </CardContainer>
  );
}`;

const TABLE_CODE = `<DataTable
  tableId="star-wars-characters"   // ← key used for localStorage persistence
  data={data}
  columns={columns}

  // Async state propagation
  isLoading={isLoading}
  isError={isError}
  isFetching={isFetching}
  stateMessage={{
    noData: 'No characters found',
    errorData: error?.message || 'Failed to load',
  }}

  // Column features — each flag adds a UI control to the header
  headerOptions={{
    headerContainer: <CustomHeader />,
    enableDragColumns: true,       // drag header to reorder
    enableResizeColumns: true,     // drag border to resize
    enablePinLeftColumns: true,
    enablePinRightColumns: true,
    enableHideColumns: true,       // show/hide toggle panel
    enableSortColumns: true,       // sort direction indicators
  }}

  // Server-side pagination
  pagination={{
    showPagination: true,
    rowsInfo: true,
    serverPagination: {
      totalCount,      // total rows reported by the API
      pagination,      // { pageIndex, pageSize } React state
      setPagination,   // changing this triggers React Query refetch
    },
  }}

  enableMultiSort={true}           // Shift+click for multi-column sort

  // Expandable rows — return any React node
  renderSubComponent={({ row }) => (
    <PersonDetails person={row.original as StarWarsPerson} />
  )}
/>`;

const steps = [
  {
    number: '01',
    colorClass: 'bg-blue-500',
    badgeColor: 'info' as const,
    title: 'Data Fetching Hook',
    subtitle: 'useStarWarsPeople.ts',
    Icon: LucideIcons.Download,
    badge: 'React Query',
    description:
      'React Query handles caching, background refetching, and keepPreviousData so the table never shows a blank state while paginating.',
    language: 'typescript',
    code: QUERY_CODE,
  },
  {
    number: '02',
    colorClass: 'bg-purple-500',
    badgeColor: 'warning' as const,
    title: 'Column Definitions',
    subtitle: 'useStarWarsColumns.tsx',
    Icon: LucideIcons.Columns2,
    badge: 'TanstackTable.ColumnDef',
    description:
      'Each column gets a custom cell renderer with icons and color swatches. Numeric strings (height, mass) use a custom sortingFn to sort as numbers.',
    language: 'tsx',
    code: COLUMNS_CODE,
  },
  {
    number: '03',
    colorClass: 'bg-green-500',
    badgeColor: 'success' as const,
    title: 'Expandable Sub-Component',
    subtitle: 'PersonDetails.tsx',
    Icon: LucideIcons.PanelBottomOpen,
    badge: 'renderSubComponent',
    description:
      "renderSubComponent receives the Row object. Return any React node — here a tucu-ui CardContainer with a detail grid of the character's attributes.",
    language: 'tsx',
    code: SUBCOMPONENT_CODE,
  },
  {
    number: '04',
    colorClass: 'bg-orange-500',
    badgeColor: 'danger' as const,
    title: 'DataTable Configuration',
    subtitle: 'LiveDemoSection.tsx',
    Icon: LucideIcons.Settings2,
    badge: 'DataTable',
    description:
      'All wired together with one tableId. Column state auto-persists to localStorage. Server pagination connects by passing pagination state and setter.',
    language: 'tsx',
    code: TABLE_CODE,
  },
];

const CodeExamplesSection: React.FC = () => {
  return (
    <>
      {/* Overview card with file index */}
      <CardContainer>
        <CardTitle title="Implementation Walkthrough" className="mb-4 mt-6">
          <div className="space-y-3">
            <Typography
              tag="p"
              className="text-muted-foreground leading-relaxed"
            >
              Four focused files make up this entire example. Each has a single
              responsibility — fetching, defining columns, rendering details,
              and wiring the table together.
            </Typography>
            <div className="flex flex-wrap gap-2">
              {steps.map(({ number, colorClass, subtitle }) => (
                <div
                  key={number}
                  className="inline-flex items-center gap-1.5 text-xs font-medium border border-border rounded-full px-3 py-1"
                >
                  <span className={`w-2 h-2 rounded-full ${colorClass}`} />
                  {subtitle}
                </div>
              ))}
            </div>
          </div>
        </CardTitle>
      </CardContainer>

      {/* One card per step */}
      {steps.map(
        ({
          number,
          colorClass,
          title,
          subtitle,
          Icon,
          badge,
          badgeColor,
          description,
          language,
          code,
        }) => (
          <CardContainer key={number}>
            <div className="p-5 space-y-4">
              <div className="flex items-start gap-4">
                <div
                  className={`${colorClass} w-10 h-10 rounded-xl flex items-center justify-center shrink-0 shadow-sm`}
                >
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <span className="text-xs font-black text-border">
                      {number}
                    </span>
                    <Typography tag="h4" className="font-bold">
                      {title}
                    </Typography>
                    <Badge color={badgeColor}>{badge}</Badge>
                  </div>
                  <Typography
                    tag="p"
                    className="text-xs font-mono text-muted-foreground"
                  >
                    {subtitle}
                  </Typography>
                  <Typography
                    tag="p"
                    className="text-sm text-muted-foreground mt-2 leading-relaxed"
                  >
                    {description}
                  </Typography>
                </div>
              </div>
              <CodeBlock language={language} code={code} />
            </div>
          </CardContainer>
        ),
      )}

      {/* Closing note */}
      <Alert variant="success" dismissible={false}>
        <div className="flex items-start gap-2">
          <LucideIcons.CheckCircle className="w-4 h-4 shrink-0 mt-0.5" />
          <Typography tag="p" className="text-sm leading-relaxed">
            <span className="font-semibold">That's it.</span> Four files, zero
            boilerplate beyond what you see. Column state persistence, loading
            skeletons, error boundaries, and responsive scroll are all handled
            automatically by Tucutable.
          </Typography>
        </div>
      </Alert>
    </>
  );
};

export default CodeExamplesSection;
