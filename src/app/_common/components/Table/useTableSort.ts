import { useState, useMemo } from "react";

export type SortDirection = "asc" | "desc";

export interface SortConfig {
  column: string;
  direction: SortDirection;
}

export interface UseTableSortReturn<T> {
  sortedData: T[];
  sortConfig: SortConfig | null;
  sortByColumn: (column: string, direction: SortDirection) => void;
  removeSorting: () => void;
}

export function useTableSort<T extends Record<string, unknown>>(
  data: T[]
): UseTableSortReturn<T> {
  const [sortConfig, setSortConfig] = useState<SortConfig | null>(null);

  const sortedData = useMemo(() => {
    if (!sortConfig) {
      return data;
    }

    return [...data].sort((a, b) => {
      const aValue = a[sortConfig.column];
      const bValue = b[sortConfig.column];

      if (aValue === bValue) {
        return 0;
      }

      if (aValue == null) {
        return sortConfig.direction === "asc" ? -1 : 1;
      }

      if (bValue == null) {
        return sortConfig.direction === "asc" ? 1 : -1;
      }

      const comparison = aValue < bValue ? -1 : 1;
      return sortConfig.direction === "asc" ? comparison : -comparison;
    });
  }, [data, sortConfig]);

  const sortByColumn = (column: string, direction: SortDirection) => {
    setSortConfig({ column, direction });
  };

  const removeSorting = () => {
    setSortConfig(null);
  };

  return {
    sortedData,
    sortConfig,
    sortByColumn,
    removeSorting,
  };
}
