import { useDataTableContext, TanstackTable } from '@e-burgos/tucutable';

interface TableHeaderContainerProps {
  className?: string;
  isResetStoreDataButton?: boolean;
  showHiddenColumns?: boolean;
}

export const TableHeaderContainer = ({
  className,
  isResetStoreDataButton = true,
  showHiddenColumns = true,
}: TableHeaderContainerProps) => {
  const { tableState, actions, table } = useDataTableContext() || {};

  const toggleColumnVisibility = (id: string) => {
    table?.setColumnVisibility((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleAllColumnsVisibility = () => {
    table?.setColumnVisibility((prev) => {
      return Object.keys(prev).reduce((acc, key) => {
        acc[key] = !prev[key];
        return acc;
      }, {} as TanstackTable.VisibilityState);
    });
  };

  return (
    <div
      className={`flex flex-col items-center p-4  w-full gap-4 ${className}`}
    >
      <div className={`flex items-center justify-end w-full gap-2`}>
        {isResetStoreDataButton && (
          <button
            className="bg-table-primary/80 text-white px-4 py-2 rounded-md hover:bg-table-primary transition-all duration-200 ease-in-out hover:cursor-pointer"
            onClick={() => actions?.resetStoreData()}
          >
            Reset Column Visibility
          </button>
        )}
      </div>
      {showHiddenColumns && (
        <div className="flex items-center justify-between w-full gap-2 border border-gray-200 dark:border-gray-700 rounded-md p-2">
          <div className="flex items-center gap-2">
            <span className="text-base text-gray-500 dark:text-gray-200 font-bold">
              All Columns
            </span>
          </div>
          <div className="flex items-center gap-2">
            {Object.entries(tableState?.columnVisibility || {}).map(
              ([id, visible]) => {
                const isVisible = visible === true;
                const buttonClassName = isVisible
                  ? 'bg-table-primary/80 text-white px-2 py-1 rounded-md hover:bg-table-primary transition-all duration-200 ease-in-out hover:cursor-pointer'
                  : 'bg-table-primary/20 text-white px-2 py-1 rounded-md hover:bg-table-primary transition-all duration-200 ease-in-out hover:cursor-pointer';
                return (
                  <button
                    key={id}
                    className={buttonClassName}
                    onClick={() => toggleColumnVisibility(id)}
                  >
                    {id}
                  </button>
                );
              }
            )}
            <button
              className="bg-green-500/80 text-white px-2 py-1 rounded-md hover:bg-green-500 transition-all duration-200 ease-in-out hover:cursor-pointer"
              onClick={() => toggleAllColumnsVisibility()}
            >
              Toggle All Columns
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TableHeaderContainer;
