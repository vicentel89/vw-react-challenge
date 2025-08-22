import clsx from "clsx";
import { ReactNode, useId } from "react";

import styles from "./Table.module.css";

interface TableProps {
  columns: TableColumn[];
  data: Record<string, ReactNode>[];
  caption?: string;
  className?: string;
  emptyStateText?: string;
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
}: TableProps) {
  const captionId = useId();

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
          <tbody>
            {data.length === 0 ? (
              <EmptyState text={emptyStateText} colSpan={columns.length} />
            ) : (
              data.map((row, index) => (
                <tr key={index} className={styles.tr}>
                  {columns.map((column) => (
                    <td key={column.key} className={styles.td}>
                      {row[column.key]}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function EmptyState({ text, colSpan }: { text: string; colSpan: number }) {
  return (
    <tr>
      <td colSpan={colSpan} className={styles.emptyState} role="cell">
        {text}
      </td>
    </tr>
  );
}
