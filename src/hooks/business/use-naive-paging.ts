import type { LocationQuery } from 'vue-router';
import { useRouter } from 'vue-router';
import { validateSync } from 'class-validator';
import type { ColumnKey, SortOrder, TableColumn } from 'naive-ui/es/data-table/src/interface';
import type { SortState } from 'naive-ui/lib/data-table/src/interface';
import { routeName } from '@/router';
import type { Pageable } from '@/share/page';
import { useColumn } from './use-column';
import { usePaging } from './use-paging';
import { useQueryParams } from './use-query-params';

type CustomAttribute = {
  visible?: boolean;
  additional?: boolean;
  disabledVisible?: boolean;
};

type CustomTableColumn<T> = TableColumn<T> & CustomAttribute;

type Params<T, S extends Pageable> = {
  fetchBuilder: (criteria: S) => Promise<Common.Pagination<T>>;
  paramsBuilder: (searchParams: LocationQuery) => S;
  handler?: (criteria: S) => void;
  columnsBuilder: (getOrderString: (key: ColumnKey) => SortOrder, defaultCriteria: S) => CustomTableColumn<T>[];
  additionalCondition?: (key: ColumnKey, type: 'column' | 'query') => boolean;
  rowKey: (row: T) => string | number;
  multiple: boolean;
  queryModelBuilder?: () => QuickQuery.Model<S>;
  errorBuilder?: (result: Service.RestfulResult<unknown>) => void;
};

export function useNaivePaging<T, S extends Pageable>(params: Params<T, S>) {
  const router = useRouter();
  const {
    fetchBuilder,
    paramsBuilder,
    handler,
    columnsBuilder,
    additionalCondition,
    multiple,
    queryModelBuilder,
    errorBuilder
  } = params;

  const validateParams = async (c: S) => {
    const errors = validateSync(c);
    if (errors.length > 0) {
      await router.push(routeName('404'));
      throw errors[0];
    }
  };

  const {
    defaultCriteria,
    criteria,
    loading,
    pagination,
    pageList,
    query,
    changePage,
    changeLimit,
    changeSort: baseChangeSort,
    resetSort,
    getOrderString,
    paging,
    paginationProps
  } = usePaging(fetchBuilder, paramsBuilder, handler, errorBuilder, validateParams);
  const { visibleColumns, sortColumns, columns } = useColumn(() =>
    columnsBuilder(getOrderString, defaultCriteria as S)
  );

  const changeSort = (sortState: SortState) => {
    baseChangeSort(sortState, multiple);
  };

  const { queryParamsModel } = useQueryParams<S>(queryModelBuilder ?? (() => ({})), additionalCondition);

  return {
    visibleColumns,
    sortColumns,
    columns,
    defaultCriteria,
    criteria,
    loading,
    pagination,
    pageList,
    query,
    changePage,
    changeLimit,
    getOrderString,
    paging,
    paginationProps,
    changeSort,
    resetSort,
    queryParamsModel
  };
}
