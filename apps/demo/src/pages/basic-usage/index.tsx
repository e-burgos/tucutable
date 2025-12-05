import { useState } from 'react';
import { DataTable, TanstackTable } from '@e-burgos/tucutable';

import {
  CardContainer,
  Typography,
  LucideIcons,
  CodeBlock,
  Alert,
  CardTitle,
  Button,
} from '@e-burgos/tucu-ui';
import HeroPage from '../../components/HeroPage';
import TucuTableLogo from '../../assets/images/table-icon.png';
import { useStarWarsPeople } from '../../queries/useStarWarsPeople';
import { useStarWarsColumns } from './hooks/useStarWarsColumns';
import { PersonDetails } from './components/PersonDetails';
import type { StarWarsPerson } from '../../queries/types';

export function BasicUsage() {
  const [pagination, setPagination] = useState<TanstackTable.PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  const columns = useStarWarsColumns();

  const { data, isLoading, isError, error, totalCount, isFetching, fetchPage } =
    useStarWarsPeople({ pagination });

  return (
    <div className="space-y-8 sm:space-y-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
      {/* Hero Section */}
      <HeroPage
        title="Basic Usage"
        description="Learn how to use Tucutable with real-world data. This example demonstrates server-side pagination, sorting, filtering, and expandable rows using the Star Wars API."
        githubButton={false}
        getStartedButton={false}
        icon={
          <img
            src={TucuTableLogo}
            className="w-48 h-48 text-white filter drop-shadow-sm"
          />
        }
      />

      {/* Introduction */}
      <section className="space-y-6">
        <CardContainer>
          <CardTitle
            title="Live Example: Star Wars Characters"
            className="mb-4 mt-6"
          >
            <div className="space-y-4">
              <Typography tag="p" className="text-gray-600 dark:text-gray-400">
                This example demonstrates Tucutable's capabilities using the{' '}
                <a
                  href="https://swapi.dev/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 dark:text-blue-400 hover:underline"
                >
                  Star Wars API (SWAPI)
                </a>
                . The table features:
              </Typography>
              <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-400">
                <li>Server-side pagination with real API calls</li>
                <li>Column sorting (multi-column support)</li>
                <li>Column management (reorder, resize, pin, visibility)</li>
                <li>Expandable rows to show detailed information</li>
                <li>
                  State persistence (column preferences saved in localStorage)
                </li>
                <li>Loading and error states</li>
                <li>Responsive design with horizontal scrolling</li>
              </ul>
              <Alert variant="info" dismissible={false}>
                <Typography
                  tag="p"
                  className="text-sm text-gray-600 dark:text-gray-400"
                >
                  <LucideIcons.Info className="w-4 h-4 inline mr-2" />
                  Try dragging columns to reorder them, resizing columns,
                  pinning columns, or toggling column visibility. Your
                  preferences will be automatically saved!
                </Typography>
              </Alert>
            </div>
          </CardTitle>
        </CardContainer>
      </section>

      {/* Live Table */}
      <section className="space-y-6">
        <DataTable
          tableId="star-wars-characters"
          data={data}
          columns={columns}
          isLoading={isLoading}
          isError={isError}
          isFetching={isFetching}
          headerOptions={{
            headerContainer: (
              <div className="p-4 dark:border-gray-700 w-full">
                <div className="flex items-center justify-between">
                  <Typography
                    tag="h3"
                    className="text-table-primary-text text-lg font-semibold"
                  >
                    Star Wars Characters
                  </Typography>
                  <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                    {isFetching && (
                      <>
                        <LucideIcons.Loader2 className="w-4 h-4 animate-spin" />
                        <span>Loading...</span>
                      </>
                    )}
                    {!isFetching && totalCount > 0 && (
                      <>
                        <LucideIcons.Database className="w-4 h-4" />
                        <span>{totalCount} total characters</span>
                      </>
                    )}
                    <Button
                      shape="circle"
                      onClick={() => {
                        setPagination({
                          pageIndex: 0,
                          pageSize: pagination.pageSize,
                        });
                        fetchPage({
                          pageIndex: 0,
                          pageSize: pagination.pageSize,
                        });
                      }}
                      variant="ghost"
                      size="tiny"
                    >
                      <LucideIcons.RefreshCw className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ),
          }}
          stateMessage={{
            noData: 'No characters found',
            errorData: error?.message || 'Failed to load characters',
          }}
          pagination={{
            showPagination: true,
            rowsInfo: true,
            serverPagination: {
              totalCount,
              pagination,
              setPagination,
            },
          }}
          enableMultiSort={true}
          renderSubComponent={({ row }) => {
            if (!row) return null;
            const person = row.original as StarWarsPerson;
            return <PersonDetails person={person} />;
          }}
        />
      </section>

      {/* Code Example */}
      <section className="space-y-6">
        <CardContainer>
          <CardTitle title="Implementation Code" className="mt-6 mb-4">
            <div className="space-y-6">
              <Typography tag="p" className="text-gray-600 dark:text-gray-400">
                Here's how this example is implemented:
              </Typography>

              <div className="space-y-4">
                <div>
                  <Typography
                    tag="h4"
                    className="font-semibold text-gray-900 dark:text-white mb-2"
                  >
                    1. Custom Hook with React Query
                  </Typography>
                  <CodeBlock
                    language="typescript"
                    code={`import { useQuery, useQueryClient, keepPreviousData } from '@tanstack/react-query';
import type { TanstackTable } from '@e-burgos/tucutable';

async function fetchStarWarsPeople(
  pagination: TanstackTable.PaginationState
): Promise<StarWarsApiResponse> {
  const response = await fetch(
    \`https://swapi.dev/api/people/?page=\${pagination.pageIndex + 1}&format=json\`
  );
  if (!response.ok) {
    throw new Error(\`HTTP error! status: \${response.status}\`);
  }
  return response.json();
}

export function useStarWarsPeople({
  pagination,
}: {
  pagination: TanstackTable.PaginationState;
}) {
  const queryClient = useQueryClient();

  const { data, isLoading, isError, error, isFetching } =
    useQuery<StarWarsApiResponse>({
      queryKey: ['starWarsPeople', pagination],
      queryFn: () => fetchStarWarsPeople(pagination),
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000, // 10 minutes
      placeholderData: keepPreviousData, // Smooth transitions
    });

  const fetchPage = (pagination: TanstackTable.PaginationState) => {
    queryClient.prefetchQuery({
      queryKey: ['starWarsPeople', pagination],
      queryFn: () => fetchStarWarsPeople(pagination),
      staleTime: 5 * 60 * 1000,
    });
  };

  return {
    data: data?.results ?? [],
    isLoading,
    isError,
    error: error instanceof Error ? error : null,
    totalCount: data?.count ?? 0,
    isFetching,
    fetchPage,
  };
}`}
                  />
                </div>

                <div>
                  <Typography
                    tag="h4"
                    className="font-semibold text-gray-900 dark:text-white mb-2"
                  >
                    2. Types Definition
                  </Typography>
                  <CodeBlock
                    language="typescript"
                    code={`// queries/types.ts
export interface StarWarsPerson {
  name: string;
  height: string;
  mass: string;
  hair_color: string;
  skin_color: string;
  eye_color: string;
  birth_year: string;
  gender: string;
  homeworld: string;
  films: string[];
  species: string[];
  vehicles: string[];
  starships: string[];
  created: string;
  edited: string;
  url: string;
}

export interface StarWarsApiResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: StarWarsPerson[];
}`}
                  />
                </div>

                <div>
                  <Typography
                    tag="h4"
                    className="font-semibold text-gray-900 dark:text-white mb-2"
                  >
                    3. Column Definitions Hook
                  </Typography>
                  <CodeBlock
                    language="typescript"
                    code={`import { useMemo } from 'react';
import { TanstackTable } from '@e-burgos/tucutable';
import type { StarWarsPerson } from '../../../queries/types';
import { LucideIcons } from '@e-burgos/tucu-ui';

export function useStarWarsColumns() {
  return useMemo(
    () => [
      {
        accessorKey: 'name',
        header: 'Name',
        cell: (info: TanstackTable.CellContext<StarWarsPerson, string>) => {
          const value = info.getValue();
          return (
            <div className="flex items-center gap-2">
              <LucideIcons.User className="w-4 h-4 text-gray-500" />
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
        cell: (info: TanstackTable.CellContext<StarWarsPerson, string>) => {
          const value = info.getValue();
          const numValue = value === 'unknown' ? null : parseInt(value, 10);
          return (
            <div className="text-right">
              {numValue ? \`\${numValue} cm\` : <span className="text-gray-400">Unknown</span>}
            </div>
          );
        },
        enableSorting: true,
        sortingFn: (rowA: any, rowB: any) => {
          const a = rowA.original.height === 'unknown' ? 0 : parseInt(rowA.original.height, 10);
          const b = rowB.original.height === 'unknown' ? 0 : parseInt(rowB.original.height, 10);
          return a - b;
        },
        size: 120,
      },
      {
        accessorKey: 'mass',
        header: 'Mass (kg)',
        cell: (info: TanstackTable.CellContext<StarWarsPerson, string>) => {
          const value = info.getValue();
          const numValue = value === 'unknown' ? null : parseFloat(value.replace(',', ''));
          return (
            <div className="text-right">
              {numValue ? \`\${numValue} kg\` : <span className="text-gray-400">Unknown</span>}
            </div>
          );
        },
        enableSorting: true,
        sortingFn: (rowA: any, rowB: any) => {
          const a = rowA.original.mass === 'unknown' ? 0 : parseFloat(rowA.original.mass.replace(',', ''));
          const b = rowB.original.mass === 'unknown' ? 0 : parseFloat(rowB.original.mass.replace(',', ''));
          return a - b;
        },
        size: 120,
      },
      {
        accessorKey: 'hair_color',
        header: 'Hair Color',
        cell: (info: TanstackTable.CellContext<StarWarsPerson, string>) => {
          const value = info.getValue();
          return (
            <div className="flex items-center gap-2">
              <div
                className="w-4 h-4 rounded-full border"
                style={{
                  backgroundColor:
                    value === 'blond' ? '#fbbf24' :
                    value === 'brown' ? '#92400e' :
                    value === 'black' ? '#1f2937' : '#9ca3af',
                }}
              />
              <span className="capitalize">{value}</span>
            </div>
          );
        },
        enableSorting: true,
        size: 150,
      },
      {
        accessorKey: 'eye_color',
        header: 'Eye Color',
        cell: (info: TanstackTable.CellContext<StarWarsPerson, string>) => {
          const value = info.getValue();
          return (
            <div className="flex items-center gap-2">
              <div
                className="w-4 h-4 rounded-full border"
                style={{
                  backgroundColor:
                    value === 'blue' ? '#3b82f6' :
                    value === 'yellow' ? '#eab308' :
                    value === 'brown' ? '#92400e' : '#9ca3af',
                }}
              />
              <span className="capitalize">{value}</span>
            </div>
          );
        },
        enableSorting: true,
        size: 130,
      },
      {
        accessorKey: 'birth_year',
        header: 'Birth Year',
        cell: (info: TanstackTable.CellContext<StarWarsPerson, string>) => {
          const value = info.getValue();
          return (
            <div className="font-mono text-sm">
              {value === 'unknown' ? <span className="text-gray-400">Unknown</span> : value}
            </div>
          );
        },
        enableSorting: true,
        size: 130,
      },
      {
        accessorKey: 'gender',
        header: 'Gender',
        cell: (info: TanstackTable.CellContext<StarWarsPerson, string>) => {
          const value = info.getValue();
          return (
            <div className="flex items-center gap-2">
              {value === 'male' && <LucideIcons.User className="w-4 h-4 text-blue-500" />}
              {value === 'female' && <LucideIcons.User className="w-4 h-4 text-pink-500" />}
              {value === 'n/a' && <LucideIcons.Minus className="w-4 h-4 text-gray-400" />}
              <span className="capitalize">{value === 'n/a' ? 'N/A' : value}</span>
            </div>
          );
        },
        enableSorting: true,
        size: 120,
      },
      {
        accessorKey: 'films',
        header: 'Films',
        cell: (info: TanstackTable.CellContext<StarWarsPerson, string[]>) => {
          const films = info.getValue();
          return (
            <div className="flex items-center gap-1">
              <LucideIcons.Film className="w-4 h-4 text-gray-500" />
              <span>{films.length}</span>
            </div>
          );
        },
        enableSorting: true,
        sortingFn: (rowA: any, rowB: any) => {
          return rowA.original.films.length - rowB.original.films.length;
        },
        size: 100,
      },
    ] as TanstackTable.ColumnDef<StarWarsPerson>[],
    []
  );
}`}
                  />
                </div>

                <div>
                  <Typography
                    tag="h4"
                    className="font-semibold text-gray-900 dark:text-white mb-2"
                  >
                    4. Person Details Component
                  </Typography>
                  <CodeBlock
                    language="tsx"
                    code={`import type { StarWarsPerson } from '../../../queries/types';
import { CardContainer, Typography, LucideIcons } from '@e-burgos/tucu-ui';

interface PersonDetailsProps {
  person: StarWarsPerson;
}

export function PersonDetails({ person }: PersonDetailsProps) {
  return (
    <CardContainer className="p-4 m-2">
      <div className="space-y-4">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-full flex items-center justify-center">
            <LucideIcons.User className="w-6 h-6 text-white" />
          </div>
          <Typography tag="h3" className="text-xl font-bold">
            {person.name}
          </Typography>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <LucideIcons.Ruler className="w-4 h-4 text-gray-500" />
              <Typography tag="span" className="text-sm font-medium">Height:</Typography>
              <Typography tag="span" className="text-sm">
                {person.height === 'unknown' ? 'Unknown' : \`\${person.height} cm\`}
              </Typography>
            </div>
            <div className="flex items-center gap-2">
              <LucideIcons.Scale className="w-4 h-4 text-gray-500" />
              <Typography tag="span" className="text-sm font-medium">Mass:</Typography>
              <Typography tag="span" className="text-sm">
                {person.mass === 'unknown' ? 'Unknown' : \`\${person.mass} kg\`}
              </Typography>
            </div>
            <div className="flex items-center gap-2">
              <LucideIcons.Calendar className="w-4 h-4 text-gray-500" />
              <Typography tag="span" className="text-sm font-medium">Birth Year:</Typography>
              <Typography tag="span" className="text-sm">{person.birth_year}</Typography>
            </div>
            <div className="flex items-center gap-2">
              <LucideIcons.User className="w-4 h-4 text-gray-500" />
              <Typography tag="span" className="text-sm font-medium">Gender:</Typography>
              <Typography tag="span" className="text-sm capitalize">
                {person.gender === 'n/a' ? 'N/A' : person.gender}
              </Typography>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <LucideIcons.Palette className="w-4 h-4 text-gray-500" />
              <Typography tag="span" className="text-sm font-medium">Hair Color:</Typography>
              <Typography tag="span" className="text-sm capitalize">{person.hair_color}</Typography>
            </div>
            <div className="flex items-center gap-2">
              <LucideIcons.Palette className="w-4 h-4 text-gray-500" />
              <Typography tag="span" className="text-sm font-medium">Skin Color:</Typography>
              <Typography tag="span" className="text-sm capitalize">{person.skin_color}</Typography>
            </div>
            <div className="flex items-center gap-2">
              <LucideIcons.Eye className="w-4 h-4 text-gray-500" />
              <Typography tag="span" className="text-sm font-medium">Eye Color:</Typography>
              <Typography tag="span" className="text-sm capitalize">{person.eye_color}</Typography>
            </div>
            <div className="flex items-center gap-2">
              <LucideIcons.Film className="w-4 h-4 text-gray-500" />
              <Typography tag="span" className="text-sm font-medium">Films:</Typography>
              <Typography tag="span" className="text-sm">{person.films.length}</Typography>
            </div>
          </div>
        </div>
      </div>
    </CardContainer>
  );
}`}
                  />
                </div>

                <div>
                  <Typography
                    tag="h4"
                    className="font-semibold text-gray-900 dark:text-white mb-2"
                  >
                    5. Complete DataTable Component
                  </Typography>
                  <CodeBlock
                    language="tsx"
                    code={`import { useState } from 'react';
import { DataTable, TanstackTable } from '@e-burgos/tucutable';
import { Typography, LucideIcons, Button } from '@e-burgos/tucu-ui';
import { useStarWarsPeople } from '../../queries/useStarWarsPeople';
import { useStarWarsColumns } from './hooks/useStarWarsColumns';
import { PersonDetails } from './components/PersonDetails';
import type { StarWarsPerson } from '../../queries/types';

export function BasicUsage() {
  const [pagination, setPagination] = useState<TanstackTable.PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  const columns = useStarWarsColumns();

  const { data, isLoading, isError, error, totalCount, isFetching, fetchPage } =
    useStarWarsPeople({ pagination });

  return (
    <div className="space-y-8">
      <CardContainer className="overflow-hidden p-0 w-full">
        <DataTable
          tableId="star-wars-characters"
          data={data}
          columns={columns}
          isLoading={isLoading}
          isError={isError}
          isFetching={isFetching}
          headerOptions={{
            headerContainer: (
              <div className="p-4 w-full">
                <div className="flex items-center justify-between">
                  <Typography tag="h3" className="text-lg font-semibold">
                    Star Wars Characters
                  </Typography>
                  <div className="flex items-center gap-2 text-sm">
                    {isFetching && (
                      <>
                        <LucideIcons.Loader2 className="w-4 h-4 animate-spin" />
                        <span>Loading...</span>
                      </>
                    )}
                    {!isFetching && totalCount > 0 && (
                      <>
                        <LucideIcons.Database className="w-4 h-4" />
                        <span>{totalCount} total characters</span>
                      </>
                    )}
                    <Button
                      shape="circle"
                      onClick={() => {
                        setPagination({ pageIndex: 0, pageSize: pagination.pageSize });
                        fetchPage({ pageIndex: 0, pageSize: pagination.pageSize });
                      }}
                      variant="ghost"
                      size="tiny"
                    >
                      <LucideIcons.RefreshCw className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ),
            enableDragColumns: true,
            enableResizeColumns: true,
            enablePinLeftColumns: true,
            enablePinRightColumns: true,
            enableHideColumns: true,
            enableSortColumns: true,
          }}
          stateMessage={{
            noData: 'No characters found',
            errorData: error?.message || 'Failed to load characters',
          }}
          pagination={{
            showPagination: true,
            rowsInfo: true,
            serverPagination: {
              totalCount,
              pagination,
              setPagination,
            },
          }}
          enableMultiSort={true}
          renderSubComponent={({ row }) => {
            if (!row) return null;
            const person = row.original as StarWarsPerson;
            return <PersonDetails person={person} />;
          }}
        />
      </CardContainer>
    </div>
  );
}`}
                  />
                </div>
              </div>
            </div>
          </CardTitle>
        </CardContainer>
      </section>

      {/* Features Highlight */}
      <section className="space-y-6">
        <CardContainer>
          <CardTitle title="Key Features Demonstrated" className="mt-6 mb-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <LucideIcons.Server className="w-5 h-5 text-blue-500 mt-0.5" />
                  <div>
                    <Typography tag="h4" className="font-semibold mb-1">
                      Server-Side Pagination
                    </Typography>
                    <Typography
                      tag="p"
                      className="text-sm text-gray-600 dark:text-gray-400"
                    >
                      Data is fetched from the API on each page change, with
                      proper loading states and total count management.
                    </Typography>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <LucideIcons.ArrowUpDown className="w-5 h-5 text-green-500 mt-0.5" />
                  <div>
                    <Typography tag="h4" className="font-semibold mb-1">
                      Multi-Column Sorting
                    </Typography>
                    <Typography
                      tag="p"
                      className="text-sm text-gray-600 dark:text-gray-400"
                    >
                      Sort by multiple columns simultaneously. Click column
                      headers to sort ascending, descending, or remove sorting.
                    </Typography>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <LucideIcons.GripVertical className="w-5 h-5 text-purple-500 mt-0.5" />
                  <div>
                    <Typography tag="h4" className="font-semibold mb-1">
                      Column Management
                    </Typography>
                    <Typography
                      tag="p"
                      className="text-sm text-gray-600 dark:text-gray-400"
                    >
                      Drag to reorder, resize columns, pin left/right, and
                      toggle visibility. All preferences are persisted.
                    </Typography>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <LucideIcons.ChevronDown className="w-5 h-5 text-orange-500 mt-0.5" />
                  <div>
                    <Typography tag="h4" className="font-semibold mb-1">
                      Expandable Rows
                    </Typography>
                    <Typography
                      tag="p"
                      className="text-sm text-gray-600 dark:text-gray-400"
                    >
                      Click the expand icon to view detailed information about
                      each character in a custom sub-component.
                    </Typography>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <LucideIcons.Save className="w-5 h-5 text-cyan-500 mt-0.5" />
                  <div>
                    <Typography tag="h4" className="font-semibold mb-1">
                      State Persistence
                    </Typography>
                    <Typography
                      tag="p"
                      className="text-sm text-gray-600 dark:text-gray-400"
                    >
                      Column order, visibility, sizing, and pinning preferences
                      are automatically saved to localStorage.
                    </Typography>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <LucideIcons.Loader2 className="w-5 h-5 text-pink-500 mt-0.5" />
                  <div>
                    <Typography tag="h4" className="font-semibold mb-1">
                      Loading States
                    </Typography>
                    <Typography
                      tag="p"
                      className="text-sm text-gray-600 dark:text-gray-400"
                    >
                      Built-in loading indicators and error handling for better
                      user experience during data fetching.
                    </Typography>
                  </div>
                </div>
              </div>
            </div>
          </CardTitle>
        </CardContainer>
      </section>
    </div>
  );
}
