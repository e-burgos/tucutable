import React from 'react';
import type { Meta, StoryFn } from '@storybook/react-vite';
import DataTable from '../../../components/DataTable/DataTable';
import { StoryContainer } from '../../components/StoryContainer';
import { columns, smallColumns, TABLE_DATA } from '../../data';
import TableHeaderContainer from '../../components/TableHeaderContainer';
import { useState } from 'react';
import { PaginationState } from '@tanstack/table-core';

const meta: Meta<typeof DataTable> = {
  title: 'Examples/Tucutable',
  tags: ['autodocs'],
  component: DataTable,
  parameters: {
    docs: {
      description: {
        component:
          'A modern, comprehensive React data table component library built with TypeScript, Tailwind CSS, and TanStack Table. Designed for creating production-ready data tables with advanced features like sorting, filtering, pagination, column management, drag-and-drop, and more.',
      },
    },
  },
  argTypes: {
    // Required props
    tableId: {
      control: 'text',
      description:
        'The unique identifier for the table. Used for state persistence.',
      table: {
        type: { summary: 'string' },
        category: 'Required',
      },
    },
    columns: {
      control: 'object',
      description: 'Array of column definitions for the table.',
      table: {
        type: { summary: 'ColumnDef<TData, any>[]' },
        category: 'Required',
      },
    },
    data: {
      control: 'object',
      description: 'Array of data to display in the table.',
      table: {
        type: { summary: 'TData[]' },
        category: 'Required',
      },
    },
    // Display & Layout
    showHeader: {
      control: 'boolean',
      description: 'Whether to display the table header.',
      table: {
        type: { summary: 'boolean' },
        category: 'Display & Layout',
      },
    },
    showFooter: {
      control: 'boolean',
      description: 'Whether to display the table footer.',
      table: {
        type: { summary: 'boolean' },
        category: 'Display & Layout',
      },
    },
    title: {
      control: 'text',
      description: 'Title of the data table displayed in the header.',
      table: {
        type: { summary: 'string' },
        category: 'Display & Layout',
      },
    },
    border: {
      control: 'boolean',
      description: 'Whether to display a border around the table.',
      table: {
        type: { summary: 'boolean' },
        category: 'Display & Layout',
      },
    },
    smallAnatomy: {
      control: 'boolean',
      description: 'Enables a smaller table layout with reduced spacing.',
      table: {
        type: { summary: 'boolean' },
        category: 'Display & Layout',
      },
    },
    mode: {
      control: 'select',
      description: 'The color mode of the table (dark or light theme).',
      options: ['dark', 'light'],
      table: {
        type: { summary: "'dark' | 'light'" },
        category: 'Display & Layout',
      },
    },
    sx: {
      control: 'object',
      description:
        'Custom styles for various table components (wrapper, table, row, cell, etc.).',
      table: {
        type: { summary: 'IDataTableStyles' },
        category: 'Display & Layout',
      },
    },
    // Header Options
    headerOptions: {
      control: 'object',
      description:
        'Options for configuring the table header (column visibility, pinning, sorting, resizing, dragging).',
      table: {
        type: { summary: 'IHeaderOptions' },
        category: 'Header Options',
      },
    },
    // Sorting
    enableMultiSort: {
      control: 'boolean',
      description: 'Whether multi-column sorting is enabled.',
      table: {
        type: { summary: 'boolean' },
        category: 'Sorting',
      },
    },
    manualSorting: {
      control: 'boolean',
      description: 'Whether sorting is handled manually (server-side).',
      table: {
        type: { summary: 'boolean' },
        category: 'Sorting',
      },
    },
    onSortModelChange: {
      control: false,
      description: 'Callback triggered when the sorting model changes.',
      table: {
        type: { summary: '(model: SortingState) => void' },
        category: 'Sorting',
      },
    },
    // Pagination
    pagination: {
      control: 'object',
      description:
        'Pagination options including page size, page index, server pagination, and manual pagination.',
      table: {
        type: { summary: 'IPaginationOptions' },
        category: 'Pagination',
      },
    },
    // Loading & Error States
    isLoading: {
      control: 'boolean',
      description: 'Indicates if the table is in a loading state.',
      table: {
        type: { summary: 'boolean' },
        category: 'Loading & Error States',
      },
    },
    isError: {
      control: 'boolean',
      description: 'Indicates if there was an error fetching data.',
      table: {
        type: { summary: 'boolean' },
        category: 'Loading & Error States',
      },
    },
    isFetching: {
      control: 'boolean',
      description: 'Indicates if data is currently being fetched.',
      table: {
        type: { summary: 'boolean' },
        category: 'Loading & Error States',
      },
    },
    stateMessage: {
      control: 'object',
      description:
        'Custom state messages for no data, error states, and contact support information.',
      table: {
        type: { summary: 'IDataTableStateMessage' },
        category: 'Loading & Error States',
      },
    },
    // Row Features
    rowActions: {
      control: 'object',
      description:
        'Array of actions available for each row (edit, delete, view, etc.).',
      table: {
        type: { summary: 'IRowActions<TData>[]' },
        category: 'Row Features',
      },
    },
    rowSelection: {
      control: 'object',
      description:
        'Configuration for row selection behavior (checkbox or radio).',
      table: {
        type: { summary: 'IRowSelection<TData>' },
        category: 'Row Features',
      },
    },
    forceShowMenuActions: {
      control: 'boolean',
      description: 'Forces the display of menu actions even when not needed.',
      table: {
        type: { summary: 'boolean' },
        category: 'Row Features',
      },
    },
    setCurrentRow: {
      control: false,
      description: 'Callback to set the currently selected row.',
      table: {
        type: { summary: '(row: Row<TData>) => void' },
        category: 'Row Features',
      },
    },
    // Sub Components
    renderSubComponent: {
      control: false,
      description:
        'Function to render a custom sub-component inside an expanded row.',
      table: {
        type: { summary: 'React.FC<SubComponentProps<TData>> | null' },
        category: 'Sub Components',
      },
    },
    renderSubDataTable: {
      control: 'object',
      description:
        'Function to render a nested data table inside an expanded row.',
      table: {
        type: { summary: 'IRenderSubDataTable' },
        category: 'Sub Components',
      },
    },
    // Advanced Configuration
    initialConfig: {
      control: 'object',
      description:
        'Initial configuration for the table columns (default column settings).',
      table: {
        type: { summary: 'Partial<ColumnDef<TData, unknown>>' },
        category: 'Advanced Configuration',
      },
    },
  },
  args: {
    tableId: 'data-table-id',
    columns: columns,
    data: TABLE_DATA,
    isError: false,
    isLoading: false,
    isFetching: false,
  },
};

export default meta;

const Template: StoryFn<typeof DataTable> = (args) => (
  <StoryContainer className="">
    <DataTable {...args} />
  </StoryContainer>
);

export const Default = Template.bind({});
Default.args = {};

const WithPaginationTemplate: StoryFn<typeof DataTable> = (args) => {
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 5,
  });
  const totalCount = TABLE_DATA.length;

  const data = TABLE_DATA.slice(
    pagination.pageIndex * pagination.pageSize,
    (pagination.pageIndex + 1) * pagination.pageSize
  );

  return (
    <StoryContainer className="">
      <DataTable
        {...args}
        data={data}
        pagination={{
          showPagination: true,
          manualPagination: {
            enabled: true,
            rowCount: totalCount,
            pagination,
            setPagination,
          },
        }}
      />
    </StoryContainer>
  );
};
export const WithPagination = WithPaginationTemplate.bind({});
WithPagination.args = {};

export const WithHeader = Template.bind({});
WithHeader.args = {
  showHeader: true,
  title: 'Table Title',
};

export const WithFooter = Template.bind({});
WithFooter.args = {
  showFooter: true,
};

export const WithBorder = Template.bind({});
WithBorder.args = {
  border: true,
};

export const WithSmallAnatomy = Template.bind({});
WithSmallAnatomy.args = {
  smallAnatomy: true,
};

export const DarkMode = Template.bind({});
DarkMode.args = {
  showHeader: true,
  title: 'Dark Mode',
  mode: 'dark',
};

export const LightMode = Template.bind({});
LightMode.args = {
  showHeader: true,
  title: 'Light Mode',
  mode: 'light',
};

export const WithAllHeaderOptions = Template.bind({});
WithAllHeaderOptions.args = {
  columns: smallColumns,
  title: 'All Header Options',
  showHeader: true,
  headerOptions: {
    enablePinning: true,
    enableSorting: true,
    enableResizing: true,
    enableDragColumns: true,
    enableSortColumns: true,
    enablePinLeftColumns: true,
    enablePinRightColumns: true,
    enableHideColumns: true,
    enableResizeColumns: true,
    headerContainer: <TableHeaderContainer isResetStoreDataButton={false} />,
  },
};

export const WithHiddenColumns = Template.bind({});
WithHiddenColumns.args = {
  columns: smallColumns,
  showHeader: true,
  title: 'Hidden Columns',
  headerOptions: {
    enableHideColumns: true,
    enablePinning: false,
    enableSorting: false,
    enableResizing: false,
    enableDragColumns: false,
    enableSortColumns: false,
    enablePinLeftColumns: false,
    enablePinRightColumns: false,
    enableResizeColumns: false,
    headerContainer: <TableHeaderContainer isResetStoreDataButton={false} />,
  },
};

export const WithSortingColumns = Template.bind({});
WithSortingColumns.args = {
  columns: smallColumns,
  showHeader: true,
  title: 'Sorting Columns',
  headerOptions: {
    enableHideColumns: false,
    enablePinning: false,
    enableSorting: false,
    enableResizing: false,
    enableDragColumns: false,
    enableSortColumns: true,
    enablePinLeftColumns: false,
    enablePinRightColumns: false,
    enableResizeColumns: false,
  },
};

export const WithPinningColumns = Template.bind({});
WithPinningColumns.args = {
  columns: smallColumns,
  showHeader: true,
  title: 'Pinning Columns',
  headerOptions: {
    enableHideColumns: false,
    enablePinning: true,
    enableSorting: false,
    enableResizing: false,
    enableDragColumns: false,
    enableSortColumns: false,
    enablePinLeftColumns: true,
    enablePinRightColumns: true,
    enableResizeColumns: false,
  },
};

export const WithResizingColumns = Template.bind({});
WithResizingColumns.args = {
  columns: smallColumns,
  showHeader: true,
  title: 'Resizing Columns',
  headerOptions: {
    enableHideColumns: false,
    enablePinning: false,
    enableSorting: false,
    enableResizing: true,
    enableDragColumns: false,
    enableSortColumns: false,
    enablePinLeftColumns: false,
    enablePinRightColumns: false,
    enableResizeColumns: true,
  },
};

export const WithDragColumns = Template.bind({});
WithDragColumns.args = {
  columns: smallColumns,
  showHeader: true,
  title: 'Drag Columns',
  headerOptions: {
    enableHideColumns: false,
    enablePinning: false,
    enableSorting: false,
    enableResizing: false,
    enableDragColumns: true,
    enableSortColumns: false,
    enablePinLeftColumns: false,
    enablePinRightColumns: false,
    enableResizeColumns: false,
  },
};

export const WithOneRowActions = Template.bind({});
WithOneRowActions.args = {
  columns: smallColumns,
  showHeader: true,
  title: 'One Row Action',
  rowActions: [
    {
      action: 'edit',
      label: (row) => `Edit ${row.original.name}`,
      onClick: (row) => {
        alert(`Row data: ${JSON.stringify(row.original)}`);
      },
    },
  ],
};

export const WithRowActionsTooltip = Template.bind({});
WithRowActionsTooltip.args = {
  columns: smallColumns,
  showHeader: true,
  title: 'Row Actions Tooltip',
  rowActions: [
    {
      showLabelInTooltip: true,
      action: 'edit',
      label: (row) => `Edit ${row.original.name}`,
      onClick: (row) => {
        alert(`Row data: ${JSON.stringify(row.original)}`);
      },
    },
  ],
};

export const WithRowActions = Template.bind({});
WithRowActions.args = {
  columns: smallColumns,
  showHeader: true,
  title: 'Row Actions',
  rowActions: [
    {
      action: 'edit',
      label: (row) => `Edit ${row.original.name}`,
      onClick: (row) => {
        alert(`Row data: ${JSON.stringify(row.original)}`);
      },
    },
    {
      action: 'delete',
      label: (row) => `Delete ${row.original.name}`,
      onClick: (row) => {
        alert(`Row data: ${JSON.stringify(row.original)}`);
      },
    },
    {
      action: 'view',
      label: (row) => `View ${row.original.name}`,
      onClick: (row) => {
        alert(`Row data: ${JSON.stringify(row.original)}`);
      },
    },
    {
      action: 'download',
      label: (row) => `Download ${row.original.name}`,
      onClick: (row) => {
        alert(`Row data: ${JSON.stringify(row.original)}`);
      },
    },
    {
      action: 'void',
      label: (row) => `Void ${row.original.name}`,
      onClick: (row) => {
        alert(`Row data: ${JSON.stringify(row.original)}`);
      },
    },
  ],
};

export const WithRowSelection = Template.bind({});
WithRowSelection.args = {
  columns: smallColumns,
  showHeader: true,
  title: 'Row Selection (check console for selected rows)',
  rowSelection: {
    type: 'checkbox',
    getSelection: (selectedRows) => {
      console.log('Selected rows:', selectedRows);
    },
  },
};

export const WithRadioRowSelection = Template.bind({});
WithRadioRowSelection.args = {
  columns: smallColumns,
  showHeader: true,
  title: 'Radio Row Selection (check console for selected rows)',
  rowSelection: {
    type: 'radio',
    getSelection: (selectedRows) => {
      console.log('Selected rows:', selectedRows);
    },
  },
};

export const WithForceShowMenuActions = Template.bind({});
WithForceShowMenuActions.args = {
  columns: smallColumns,
  showHeader: true,
  title: 'Force Show Menu Actions',
  forceShowMenuActions: true,
  rowActions: [
    {
      action: 'edit',
      label: (row) => `Edit ${row.original.name}`,
      onClick: (row) => {
        alert(`Row data: ${JSON.stringify(row.original)}`);
      },
    },
  ],
};

export const WithSetCurrentRow = Template.bind({});
WithSetCurrentRow.args = {
  columns: smallColumns,
  showHeader: true,
  title: 'Set Current Row',
  setCurrentRow: (row) => {
    console.log('Current row:', row);
  },
};

export const WithRenderSubComponent = Template.bind({});
WithRenderSubComponent.args = {
  columns: smallColumns,
  showHeader: true,
  title: 'Render Sub Component',
  renderSubComponent: ({ row }) => {
    return (
      <div className="p-4 bg-table-row-expanded-bg text-table-primary-text">
        Sub Component: {row.original?.name || 'No name'}
      </div>
    );
  },
};

export const WithRenderSubDataTable = Template.bind({});
WithRenderSubDataTable.args = {
  columns: columns,
  showHeader: true,
  title: 'Render Sub DataTable',
  renderSubDataTable: {
    tableId: 'sub-data-table',
    columns: smallColumns,
    data: TABLE_DATA,
    expandedColumnSize: 0,
  },
};
