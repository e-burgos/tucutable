import React from 'react';
import {
  CardContainer,
  CardTitle,
  Typography,
  Alert,
  CodeBlock,
} from '@e-burgos/tucu-ui';
import { PropsTable } from '../../../components/PropsTable';

const DataTablePropsSection: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Intro */}
      <CardContainer className="overflow-hidden">
        <CardTitle title="DataTable Props" className="mt-2 mb-2">
          <div className="w-full px-4 sm:px-6 pb-6">
            <Typography tag="p" className="text-sm text-muted-foreground mb-4">
              All props accepted by the{' '}
              <code className="font-mono text-brand">{`<DataTable>`}</code>{' '}
              component. Required props are shown first. Use the search filter
              to find specific props.
            </Typography>

            <Alert className="mb-4">
              <Typography tag="p" className="text-sm">
                <strong>TData</strong> is the generic data type — replace with
                your own row interface (e.g.{' '}
                <code className="font-mono text-xs">DataTable&lt;User&gt;</code>
                ).
              </Typography>
            </Alert>

            <CodeBlock
              language="tsx"
              code={`import { DataTable } from '@e-burgos/tucutable';

<DataTable<User>
  tableId="users-table"   // required — unique key for state persistence
  data={users}            // required — TData[]
  columns={columns}       // required — ColumnDef<TData>[]
  title="Users"
  border
  pagination={{ showPagination: true, pageSize: 10 }}
  headerOptions={{ enableSortColumns: true, enableHideColumns: true }}
  rowActions={[...]}
/>`}
            />
          </div>
        </CardTitle>
      </CardContainer>

      {/* Generated props table */}
      <PropsTable
        componentName="DataTable"
        title="DataTable — Full Props Reference"
        searchable
      />
    </div>
  );
};

export default DataTablePropsSection;
