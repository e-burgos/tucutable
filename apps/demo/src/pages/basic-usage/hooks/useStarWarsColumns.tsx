import { useMemo } from 'react';
import { TanstackTable } from '@e-burgos/tucutable';
import type { StarWarsPerson } from '../../../queries/types';
import { LucideIcons } from '@e-burgos/tucu-ui';

export function useStarWarsColumns() {
  return useMemo(
    () =>
      [
        {
          accessorKey: 'name',
          header: 'Name',
          cell: (info: TanstackTable.CellContext<StarWarsPerson, string>) => {
            const value = info.getValue();
            return (
              <div className="flex items-center gap-2">
                <LucideIcons.User className="w-4 h-4 text-gray-500 dark:text-gray-400" />
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
                {numValue ? (
                  `${numValue} cm`
                ) : (
                  <span className="text-gray-400">Unknown</span>
                )}
              </div>
            );
          },
          enableSorting: true,
          sortingFn: (rowA: any, rowB: any) => {
            const a =
              rowA.original.height === 'unknown'
                ? 0
                : parseInt(rowA.original.height, 10);
            const b =
              rowB.original.height === 'unknown'
                ? 0
                : parseInt(rowB.original.height, 10);
            return a - b;
          },
          size: 120,
        },
        {
          accessorKey: 'mass',
          header: 'Mass (kg)',
          cell: (info: TanstackTable.CellContext<StarWarsPerson, string>) => {
            const value = info.getValue();
            const numValue =
              value === 'unknown' ? null : parseFloat(value.replace(',', ''));
            return (
              <div className="text-right">
                {numValue ? (
                  `${numValue} kg`
                ) : (
                  <span className="text-gray-400">Unknown</span>
                )}
              </div>
            );
          },
          enableSorting: true,
          sortingFn: (rowA: any, rowB: any) => {
            const a =
              rowA.original.mass === 'unknown'
                ? 0
                : parseFloat(rowA.original.mass.replace(',', ''));
            const b =
              rowB.original.mass === 'unknown'
                ? 0
                : parseFloat(rowB.original.mass.replace(',', ''));
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
                  className="w-4 h-4 rounded-full border border-gray-300 dark:border-gray-600"
                  style={{
                    backgroundColor:
                      value === 'blond'
                        ? '#fbbf24'
                        : value === 'brown'
                        ? '#92400e'
                        : value === 'black'
                        ? '#1f2937'
                        : value === 'auburn'
                        ? '#991b1b'
                        : value === 'white'
                        ? '#f3f4f6'
                        : value === 'grey'
                        ? '#6b7280'
                        : value === 'n/a' || value === 'none'
                        ? 'transparent'
                        : '#9ca3af',
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
          accessorKey: 'skin_color',
          header: 'Skin Color',
          cell: (info: TanstackTable.CellContext<StarWarsPerson, string>) => {
            const value = info.getValue();
            return <span className="capitalize">{value}</span>;
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
                  className="w-4 h-4 rounded-full border border-gray-300 dark:border-gray-600"
                  style={{
                    backgroundColor:
                      value === 'blue'
                        ? '#3b82f6'
                        : value === 'yellow'
                        ? '#eab308'
                        : value === 'red'
                        ? '#ef4444'
                        : value === 'brown'
                        ? '#92400e'
                        : value === 'orange'
                        ? '#f97316'
                        : value === 'hazel'
                        ? '#a16207'
                        : '#9ca3af',
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
                {value === 'unknown' ? (
                  <span className="text-gray-400">Unknown</span>
                ) : (
                  value
                )}
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
                {value === 'male' && (
                  <LucideIcons.User className="w-4 h-4 text-blue-500" />
                )}
                {value === 'female' && (
                  <LucideIcons.User className="w-4 h-4 text-pink-500" />
                )}
                {value === 'n/a' && (
                  <LucideIcons.Minus className="w-4 h-4 text-gray-400" />
                )}
                <span className="capitalize">
                  {value === 'n/a' ? 'N/A' : value}
                </span>
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
                <LucideIcons.Film className="w-4 h-4 text-gray-500 dark:text-gray-400" />
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
}
