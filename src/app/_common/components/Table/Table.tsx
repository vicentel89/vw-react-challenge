import clsx from "clsx";
import { ReactNode, useId } from "react";

import styles from "./Table.module.css";
import Loader from "../Loader/Loader";

interface TableProps {
  columns: TableColumn[];
  data: Record<string, ReactNode>[];
  caption?: string;
  className?: string;
  emptyStateText?: string;
  isLoading?: boolean;
}

export interface TableColumn {
  key: string;
  header: string;
  width?: string;
}

/**
 * A responsive and accessible table component with horizontal scrolling support.
 * @param columns - Array of column definitions specifying keys, headers, and optional widths
 * @param data - Array of data rows where each row maps column keys to display values
 * @param caption - Optional table caption for accessibility
 * @param className - Additional CSS classes
 * @param emptyStateText - Text to display when no data is available
 *
 * @example
 * ```tsx
 * <Table
 *   columns={[
 *     { key: 'name', header: 'Name', width: '30%' },
 *     { key: 'email', header: 'Email' },
 *   ]}
 *   data={[
 *     { name: 'John Doe', email: 'john@example.com' }
 *   ]}
 *   caption="User table"
 *   emptyStateText="No users found"
 * />
 * ```
 */
export default function Table({
  columns,
  data,
  caption,
  className,
  emptyStateText = "No data available",
  isLoading = false,
}: TableProps) {
  const captionId = useId();
  const isEmpty = data.length === 0;

  return (
    <div className={clsx(styles.tableContainer, className)}>
      {caption && (
        <div id={captionId} className={styles.caption}>
          {caption}
        </div>
      )}
      <div className={styles.tableWrapper}>
        <table
          className={styles.table}
          role="table"
          aria-labelledby={caption ? captionId : undefined}
        >
          <thead>
            <tr>
              {columns.map((column) => (
                <th
                  key={column.key}
                  className={styles.th}
                  style={column.width ? { width: column.width } : undefined}
                  scope="col"
                >
                  {column.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody aria-live="polite" aria-busy={isLoading}>
            <BodyContent
              isLoading={isLoading}
              isEmpty={isEmpty}
              emptyStateText={emptyStateText}
              columns={columns}
              data={data}
            />
          </tbody>
        </table>
      </div>
    </div>
  );
}

interface BodyContentProps {
  isLoading: boolean;
  isEmpty: boolean;
  emptyStateText?: string;
  columns: TableColumn[];
  data: Record<string, ReactNode>[];
}

function BodyContent({
  isLoading,
  isEmpty,
  emptyStateText,
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

  if (isEmpty) {
    return (
      <tr>
        <td colSpan={columns.length} className={styles.emptyState} role="cell">
          {emptyStateText}
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
