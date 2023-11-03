import type { Ref } from 'vue';
import { ref, watchEffect } from 'vue';
import type { LocationQuery } from 'vue-router';
import type { SortOrder, SortState } from 'naive-ui/lib/data-table/src/interface';
import { plainToClass } from 'class-transformer';
import { Pageable, usePaging as useBasePaging } from '@/share/page';

const ORDER = {
  ascend: 'asc',
  descend: 'desc'
};

// eslint-disable-next-line max-params
export function usePaging<T, S extends Pageable>(
  fetchBuilder: (criteria: S) => Promise<Common.Pagination<T>>,
  paramsBuilder?: (searchParams: LocationQuery) => S,
  handler?: (criteria: S) => void,
  errorBuilder?: (result: Service.RestfulResult<unknown>) => void,
  validateParams?: (criteria: S) => Promise<void>
) {
  const pageList = ref<T[]>([]) as Ref<T[]>;
  const fetchParamsBuilder = (c: S) => {
    return {
      ...c,
      pageNumber: c.pageNumber - 1
    };
  };

  const listBuilder = (pagination: Common.Pagination<T>) => {
    if (pagination.pageable.pageNumber === 0) pageList.value = pagination.content;
    else pageList.value.push(...pagination.content);
  };

  const {
    defaultCriteria,
    criteria,
    loading,
    pagination,
    query,
    changePage,
    changeLimit,
    changeSort: baseChangeSort,
    resetSort,
    paging
  } = useBasePaging(
    fetchBuilder,
    fetchParamsBuilder,
    paramsBuilder ?? ((searchParams: LocationQuery) => plainToClass(Pageable, searchParams) as S),
    handler,
    errorBuilder,
    validateParams,
    listBuilder
  );
  /**
   * 改变排序
   * @param sortState
   */
  const changeSort = async (sortState: SortState, multiple: boolean) => {
    baseChangeSort(
      sortState.order ? `${sortState.columnKey},${ORDER[sortState.order]}` : `${sortState.columnKey}`,
      multiple
    );
  };

  const getOrderString = (key: string | number, sort: string[] = criteria.value.sort as string[]): SortOrder => {
    const current = sort.map(it => it.split(',')).find(([columnKey]) => columnKey === key);

    if (current) {
      const [_, type] = current;
      if (type === 'asc') return `ascend`;
      return `descend`;
    }
    return false;
  };

  const paginationProps = ref({
    page: criteria.value.pageNumber,
    pageSize: criteria.value.pageSize,
    showSizePicker: true,
    pageSizes: [3, 5],
    itemCount: 0,
    pageCount: 0,
    onChange: async (page: number) => {
      await changePage(page);
      paginationProps.value.page = page;
    },
    onUpdatePageSize: async (limit: number) => {
      await changeLimit(limit);
      paginationProps.value.page = 1;
      paginationProps.value.pageSize = limit;
    }
  });

  watchEffect(() => {
    paginationProps.value.page = (pagination.value?.pageable?.pageNumber ?? 0) + 1;
    paginationProps.value.itemCount = pagination.value?.totalElements ?? 0;
    paginationProps.value.pageCount = pagination.value?.totalPages ?? 0;
  });

  /**
   * 瀑布流改变页码，因为瀑布流下一页要先判断所以要抽离一个方法
   * @returns
   */
  const changeWaterfallPage = () => {
    const page = (pagination.value?.pageable.pageNumber ?? 0) + 1;
    if (
      loading.value ||
      (pagination.value && pagination.value.last && pagination.value?.pageable.pageNumber + 1 <= page)
    )
      return;
    changePage(page);
  };

  return {
    defaultCriteria,
    criteria,
    loading,
    pagination,
    pageList,
    query,
    changePage,
    changeLimit,
    changeSort,
    resetSort,
    getOrderString,
    paging,
    changeWaterfallPage,
    paginationProps
  };
}
