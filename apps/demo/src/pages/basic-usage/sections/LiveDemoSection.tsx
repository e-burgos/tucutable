import React, { useState } from 'react';
import { DataTable, TanstackTable } from '@e-burgos/tucutable';
import {
  Typography,
  LucideIcons,
  Button,
  CardContainer,
  Badge,
} from '@e-burgos/tucu-ui';
import { useStarWarsPeople } from '../../../queries/useStarWarsPeople';
import { useStarWarsColumns } from '../hooks/useStarWarsColumns';
import { PersonDetails } from '../components/PersonDetails';
import type { StarWarsPerson } from '../../../queries/types';

const interactiveTips = [
  { icon: LucideIcons.GripHorizontal, label: 'Drag headers to reorder' },
  { icon: LucideIcons.ArrowLeftRight, label: 'Drag borders to resize' },
  { icon: LucideIcons.Pin, label: 'Pin columns left / right' },
  { icon: LucideIcons.EyeOff, label: 'Toggle column visibility' },
  { icon: LucideIcons.ChevronRight, label: 'Expand a row for details' },
  { icon: LucideIcons.ArrowUpDown, label: 'Shift+click multi-sort' },
];

const LiveDemoSection: React.FC = () => {
  const [pagination, setPagination] = useState<TanstackTable.PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  const columns = useStarWarsColumns();

  const { data, isLoading, isError, error, totalCount, isFetching, fetchPage } =
    useStarWarsPeople({ pagination });

  return (
    <>
      {/* Live API badge + tips */}
      <CardContainer>
        <div className="p-5 space-y-4">
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-success" />
              </span>
              <Typography
                tag="span"
                className="text-sm font-semibold text-success"
              >
                Live API
              </Typography>
            </div>
            <Badge color="info">swapi.dev</Badge>
            <Badge color="warning">Server Pagination</Badge>
            <Badge color="success">State Persisted</Badge>
          </div>
          <Typography tag="p" className="text-sm text-muted-foreground">
            Data is fetched in real-time from{' '}
            <a
              href="https://swapi.dev/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-brand hover:underline"
            >
              swapi.dev
            </a>
            . Navigate pages and watch the network request — previous page data
            stays visible while loading (
            <code className="text-xs bg-muted/40 px-1 rounded">
              keepPreviousData
            </code>
            ).
          </Typography>
          <div className="flex flex-wrap gap-2">
            {interactiveTips.map(({ icon: Icon, label }) => (
              <div
                key={label}
                className="inline-flex items-center gap-1.5 text-xs text-muted-foreground bg-muted/40 rounded-full px-3 py-1"
              >
                <Icon className="w-3.5 h-3.5" />
                {label}
              </div>
            ))}
          </div>
        </div>
      </CardContainer>

      <DataTable
        tableId="star-wars-characters"
        data={data}
        columns={columns}
        isLoading={isLoading}
        isError={isError}
        isFetching={isFetching}
        headerOptions={{
          headerContainer: (
            <div className="p-4 border-b border-border w-full">
              <div className="flex items-center justify-between">
                <Typography
                  tag="h3"
                  className="text-table-primary-text text-lg font-semibold"
                >
                  Star Wars Characters
                </Typography>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
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
    </>
  );
};

export default LiveDemoSection;
