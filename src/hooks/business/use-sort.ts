/* eslint-disable no-param-reassign */
import type { SortState } from 'naive-ui/lib/data-table/src/interface';

export function useSort(
  changeSort: (sortState: SortState, multiple: boolean) => Promise<void>,
  resetSort: () => Promise<string[]>,
  multiple = false
) {
  const handleSorter = async (sortState: SortState) => {
    await changeSort(sortState, multiple);
  };

  const handleResetSorter = async () => {
    await resetSort();
  };
  return { changeSort: handleSorter, resetSort: handleResetSorter };
}
