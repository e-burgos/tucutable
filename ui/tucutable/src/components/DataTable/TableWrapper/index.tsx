import React, { CSSProperties } from 'react';
import { Spinner } from '../../Common/Spinner';
import { cn } from '../../../common/helpers/cn';
import { IDataTableStyles } from '../../../common/types';

/**
 * Props for the TableWrapper component.
 *
 * @category libs/datatable
 * @subcategory Components
 *
 * @property {string} tableId - The id of the table.
 * @property {string} title - The title of the table.
 * @property {boolean} border - Whether the table has a border.
 * @property {boolean} isFetching - Whether the table is fetching.
 * @property {boolean} isEmpty - Whether the table is empty.
 * @property {React.ReactNode} headerContainer - The header container of the table.
 * @property {React.ReactNode} children - The children of the table.
 * @property {IDataTableStyles} sx - The styles of the table.
 * @property {number} containerWidth - The width of the table.
 *
 * @template TData - The type of the data in the table.
 */

export interface TableWrapperProps {
  tableId: string;
  title?: string;
  border?: boolean;
  isFetching?: boolean;
  isEmpty?: boolean;
  headerContainer?: React.ReactNode;
  children: React.ReactNode;
  sx?: IDataTableStyles;
  containerWidth?: number;
  mode?: 'dark' | 'light';
}

const TableWrapper: React.FC<TableWrapperProps> = ({
  tableId,
  title,
  border,
  isFetching,
  headerContainer,
  children,
  isEmpty,
  sx,
  containerWidth,
  mode,
}) => {
  const shouldShowBorder =
    border === true || (border === undefined && (title || headerContainer));

  const shouldShowBorderRadius = border || title || headerContainer;

  return (
    <div
      id={`${tableId}-wrapper`}
      data-testid="table-wrapper"
      data-theme={mode}
      className={cn([
        'flex flex-col w-full h-fit z-0 relative overflow-hidden',
        shouldShowBorderRadius && 'rounded-xl',
        shouldShowBorder && 'border border-table-divider shadow-lg',
        mode && mode === 'dark' && 'dark',
        mode && mode === 'light' && 'light',
      ])}
      style={
        {
          backgroundColor: isEmpty
            ? undefined
            : 'var(--color-table-default-bg)',
          border: shouldShowBorder
            ? '1px solid var(--color-table-divider)'
            : 'none',
          '--table-width': `${containerWidth ?? 0}px`,
          ...sx?.wrapper,
        } as CSSProperties
      }
    >
      <div
        id={`${tableId}-wrapper-container`}
        data-testid="table-wrapper-container"
        className="flex flex-col w-full h-fit z-0 relative overflow-hidden"
        style={{
          backgroundColor: isEmpty ? undefined : 'var(--color-table-box-bg)',
          ...sx?.wrapperContainer,
        }}
      >
        {isFetching && (
          <div
            id={`${tableId}-fetching-container`}
            data-testid="table-fetching-container"
            className="flex justify-center items-center absolute w-full h-full z-100 cursor-not-allowed"
            style={{
              backgroundColor: 'var(--color-table-default-bg)',
              opacity: 0.5,
            }}
          >
            <Spinner size="lg" color="primary" />
          </div>
        )}
        {title && (
          <div
            className="flex flex-row justify-between text-table-primary-text! items-start w-full p-4 box-border z-0 h-fit"
            data-testid="table-title"
          >
            <span className="font-sans text-table-primary-text! text-lg font-bold leading-6 text-left m-0 p-0">
              {title}
            </span>
          </div>
        )}
        {headerContainer && (
          <div
            className="flex w-full z-2 h-fit"
            style={{ ...sx?.container }}
            data-testid="table-header-container"
          >
            {headerContainer}
          </div>
        )}
        {children}
      </div>
    </div>
  );
};

export default TableWrapper;
