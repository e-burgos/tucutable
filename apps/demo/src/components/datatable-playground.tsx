import React from 'react';
import {
  CardContainer,
  CardTitle,
  Typography,
  Badge,
  CodeBlock,
} from '@e-burgos/tucu-ui';
import { DataTable } from '@e-burgos/tucutable';
import { AutoPropsTable } from './auto-props-table';
import { PropPlayground } from './prop-playground';

// ─── Sample data ────────────────────────────────────────────────

interface SampleRow {
  id: number;
  name: string;
  role: string;
  status: 'active' | 'inactive' | 'pending';
  score: number;
  joined: string;
}

const SAMPLE_DATA: SampleRow[] = [
  {
    id: 1,
    name: 'Leia Organa',
    role: 'Commander',
    status: 'active',
    score: 98,
    joined: '2024-01-15',
  },
  {
    id: 2,
    name: 'Han Solo',
    role: 'Pilot',
    status: 'active',
    score: 87,
    joined: '2024-02-10',
  },
  {
    id: 3,
    name: 'Luke Skywalker',
    role: 'Jedi Knight',
    status: 'active',
    score: 95,
    joined: '2024-01-20',
  },
  {
    id: 4,
    name: 'R2-D2',
    role: 'Astromech',
    status: 'pending',
    score: 72,
    joined: '2024-03-01',
  },
  {
    id: 5,
    name: 'C-3PO',
    role: 'Protocol Droid',
    status: 'inactive',
    score: 60,
    joined: '2023-11-05',
  },
  {
    id: 6,
    name: 'Chewbacca',
    role: 'Co-pilot',
    status: 'active',
    score: 91,
    joined: '2024-02-14',
  },
  {
    id: 7,
    name: 'Obi-Wan Kenobi',
    role: 'Jedi Master',
    status: 'inactive',
    score: 99,
    joined: '2023-09-01',
  },
  {
    id: 8,
    name: 'Darth Vader',
    role: 'Sith Lord',
    status: 'inactive',
    score: 85,
    joined: '2023-08-20',
  },
];

const STATUS_STYLES: Record<SampleRow['status'], string> = {
  active: 'bg-success/15 text-success',
  inactive: 'bg-danger/15 text-danger',
  pending: 'bg-warning/15 text-warning',
};

const COLUMNS = [
  { accessorKey: 'id', header: 'ID', size: 60 },
  { accessorKey: 'name', header: 'Name', size: 180 },
  { accessorKey: 'role', header: 'Role', size: 160 },
  {
    accessorKey: 'status',
    header: 'Status',
    size: 110,
    cell: ({ getValue }: { getValue: () => SampleRow['status'] }) => {
      const val = getValue();
      return (
        <Badge className={`text-xs capitalize ${STATUS_STYLES[val]}`}>
          {val}
        </Badge>
      );
    },
  },
  {
    accessorKey: 'score',
    header: 'Score',
    size: 80,
    cell: ({ getValue }: { getValue: () => number }) => {
      const val = getValue();
      const color =
        val >= 90 ? 'text-success' : val >= 75 ? 'text-warning' : 'text-danger';
      return <span className={`font-semibold ${color}`}>{val}</span>;
    },
  },
  { accessorKey: 'joined', header: 'Joined', size: 120 },
];

// ─── Props excluded from playground controls ─────────────────────
// Complex types that are wired manually in the render function.
const EXCLUDE_FROM_PLAYGROUND = [
  'columns',
  'data',
  'tableId',
  'pagination',
  'headerOptions',
  'renderSubComponent',
  'renderSubDataTable',
  'rowActions',
  'rowSelection',
  'setCurrentRow',
  'onSortModelChange',
  'stateMessage',
  'sx',
  'initialConfig',
];

// ─── Component ──────────────────────────────────────────────────

export const DataTablePlayground: React.FC = () => {
  return (
    <>
      {/* ── Page header ─────────────────────────────────── */}
      <div className="text-center space-y-4">
        <Typography tag="h2" className="text-3xl md:text-4xl font-bold">
          DataTable
        </Typography>
        <Typography
          tag="p"
          className="text-xl text-muted-foreground max-w-2xl mx-auto"
        >
          A powerful, fully-featured data table built on TanStack Table v8.
          Supports sorting, pagination, column management, expandable rows, and
          more.
        </Typography>
      </div>

      {/* ── Interactive playground ──────────────────────── */}
      <PropPlayground
        componentName="DataTable"
        defaultValues={{
          title: 'Rebel Alliance',
          border: true,
          showHeader: true,
          showFooter: true,
        }}
        excludeProps={EXCLUDE_FROM_PLAYGROUND}
      >
        {(props) => (
          <DataTable
            tableId="playground-table"
            data={SAMPLE_DATA}
            columns={COLUMNS}
            pagination={{ showPagination: true, pageSize: 5, rowsInfo: true }}
            headerOptions={{
              enableHideColumns: true,
              enablePinLeftColumns: true,
              enablePinRightColumns: true,
              enableSortColumns: true,
              enableResizeColumns: true,
              enableDragColumns: true,
            }}
            {...props}
          />
        )}
      </PropPlayground>

      {/* ── Props reference table ───────────────────────── */}
      <AutoPropsTable componentName="DataTable" />

      {/* ── Code example ────────────────────────────────── */}
      <CardContainer className="overflow-hidden">
        <CardTitle title="Code Example" className="mt-2 mb-2">
          <div className="w-full p-4 sm:p-6">
            <CodeBlock
              language="tsx"
              code={`import { DataTable } from '@e-burgos/tucutable';
import type { ColumnDef } from '@tanstack/react-table';

interface User {
  id: number;
  name: string;
  role: string;
  status: 'active' | 'inactive' | 'pending';
}

const columns: ColumnDef<User>[] = [
  { accessorKey: 'id',     header: 'ID',     size: 60  },
  { accessorKey: 'name',   header: 'Name',   size: 180 },
  { accessorKey: 'role',   header: 'Role',   size: 160 },
  { accessorKey: 'status', header: 'Status', size: 110 },
];

<DataTable
  tableId="my-table"
  data={data}
  columns={columns}
  title="My Table"
  border
  pagination={{ showPagination: true, pageSize: 10, rowsInfo: true }}
  headerOptions={{
    enableHideColumns: true,
    enableSortColumns: true,
    enableResizeColumns: true,
    enableDragColumns: true,
    enablePinLeftColumns: true,
    enablePinRightColumns: true,
  }}
  enableMultiSort
/>`}
            />
          </div>
        </CardTitle>
      </CardContainer>
    </>
  );
};

export default DataTablePlayground;
