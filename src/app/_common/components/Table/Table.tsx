import clsx from "clsx";
import { ReactNode, useId } from "react";
import { PiCaretUpBold, PiCaretDownBold } from "react-icons/pi";

import styles from "./Table.module.css";
import { useTableSort, SortConfig } from "./useTableSort";
import { IconButton } from "../IconButton/IconButton";
import Loader from "../Loader/Loader";

interface TableProps {
  columns: TableColumn[];
  data: Record<string, ReactNode>[];
  caption?: string;
  actions?: ReactNode;
  className?: string;
  emptyFallback?: ReactNode;
  errorFallback?: ReactNode;
  isLoading?: boolean;
  isError?: boolean;
  isSortable?: boolean;
}

export interface TableColumn {
  key: string;
  headerText: string;
  width?: string;
  sortable?: boolean;
}

/**
 * A responsive and accessible table component with horizontal scrolling support.
 * @param columns - Array of column definitions specifying keys, headers, and optional widths
 * @param data - Array of data rows where each row maps column keys to display values
 * @param caption - Optional table caption for accessibility
 * @param className - Additional CSS classes
 * @param emptyFallback - Content to display when no data is available
 * @param errorFallback - Content to display when there's an error
 * @param isLoading - Whether data is currently loading
 * @param isError - Whether there's an error state
 *
 * @example
 * ```tsx
 * <Table
 *   columns={[
 *     { key: 'name', headerText: 'Name', width: '30%' },
 *     { key: 'email', headerText: 'Email' },
 *   ]}
 *   data={[
 *     { name: 'John Doe', email: 'john@example.com' }
 *   ]}
 *   caption="User table"
 *   emptyFallback="No users found"
 * />
 * ```
 */
export default function Table({
  columns,
  data,
  caption,
  actions,
  className,
  emptyFallback = "No data available",
  errorFallback = "An error occurred",
  isLoading = false,
  isError = false,
  isSortable = false,
}: TableProps) {
  const captionId = useId();
  const isEmpty = data.length === 0;

  const { sortedData, sortConfig, sortByColumn, removeSorting } =
    useTableSort(data);

  const handleSort = (columnKey: string) => {
    if (!isSortable) return;

    const column = columns.find((col) => col.key === columnKey);
    if (!column?.sortable) return;

    if (!sortConfig || sortConfig.column !== columnKey) {
      sortByColumn(columnKey, "asc");
    } else if (sortConfig.direction === "asc") {
      sortByColumn(columnKey, "desc");
    } else {
      removeSorting();
    }
  };

  return (
    <div className={clsx(styles.tableContainer, className)}>
      <div className={styles.header}>
        {caption && (
          <div id={captionId} className={styles.caption}>
            {caption}
          </div>
        )}
        {actions && <div className={styles.actions}>{actions}</div>}
      </div>
      <div className={styles.tableWrapper}>
        <table
          className={styles.table}
          role="table"
          aria-labelledby={caption ? captionId : undefined}
        >
          <thead>
            <tr>
              {columns.map((column) => (
                <TableHeader
                  key={column.key}
                  column={column}
                  isSortable={isSortable}
                  sortConfig={sortConfig}
                  onSort={handleSort}
                />
              ))}
            </tr>
          </thead>
          <tbody aria-live="polite" aria-busy={isLoading}>
            <BodyContent
              isLoading={isLoading}
              isEmpty={isEmpty}
              isError={isError}
              emptyFallback={emptyFallback}
              errorFallback={errorFallback}
              columns={columns}
              data={sortedData}
            />
          </tbody>
        </table>
      </div>
    </div>
  );
}

interface TableHeaderProps {
  column: TableColumn;
  isSortable: boolean;
  sortConfig: SortConfig | null;
  onSort: (columnKey: string) => void;
}

function TableHeader({
  column,
  isSortable,
  sortConfig,
  onSort,
}: TableHeaderProps) {
  const isActive = sortConfig?.column === column.key;
  const canSort = isSortable && column.sortable;
  const direction = sortConfig?.direction;

  const getSortIcon = () => {
    if (!isActive) return <PiCaretUpBold />;
    return direction === "asc" ? <PiCaretUpBold /> : <PiCaretDownBold />;
  };

  const getSortButtonLabel = () => {
    if (!isActive) {
      return `Sort by ${column.headerText} ascending`;
    }
    return direction === "asc"
      ? `Sort by ${column.headerText} descending`
      : `Remove ${column.headerText} sorting`;
  };

  return (
    <th
      className={clsx(styles.th, canSort && styles.sortableHeader)}
      style={column.width ? { width: column.width } : undefined}
      scope="col"
    >
      <div className={styles.headerContent}>
        <span>{column.headerText}</span>
        {canSort && (
          <IconButton
            icon={getSortIcon()}
            aria-label={getSortButtonLabel()}
            className={clsx(
              styles.sortButton,
              isActive && styles.sortButtonActive
            )}
            onClick={() => onSort(column.key)}
          />
        )}
      </div>
    </th>
  );
}

interface BodyContentProps {
  isLoading: boolean;
  isEmpty: boolean;
  isError: boolean;
  emptyFallback?: ReactNode;
  errorFallback?: ReactNode;
  columns: TableColumn[];
  data: Record<string, ReactNode>[];
}

function BodyContent({
  isLoading,
  isEmpty,
  isError,
  emptyFallback,
  errorFallback,
  columns,
  data,
}: BodyContentProps) {
  if (isLoading) {
    return (
      <tr>
        <td
          colSpan={columns.length}
          className={styles.loadingState}
          role="cell"
        >
          <Loader />
        </td>
      </tr>
    );
  }

  if (isError) {
    return (
      <tr>
        <td colSpan={columns.length} className={styles.errorState} role="cell">
          {errorFallback}
        </td>
      </tr>
    );
  }

  if (isEmpty) {
    return (
      <tr>
        <td colSpan={columns.length} className={styles.emptyState} role="cell">
          {emptyFallback}
        </td>
      </tr>
    );
  }

  return (
    <>
      {data.map((row, index) => (
        <tr key={index} className={styles.tr}>
          {columns.map((column) => (
            <td key={column.key} className={styles.td}>
              {row[column.key]}
            </td>
          ))}
        </tr>
      ))}
    </>
  );
}
