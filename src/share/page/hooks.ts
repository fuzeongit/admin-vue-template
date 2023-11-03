/* eslint-disable max-params */
import { computed, onBeforeMount, ref, toRaw, watch } from 'vue';
import type { LocationQuery } from 'vue-router';
import { onBeforeRouteLeave, useRoute } from 'vue-router';
import { isEqual } from 'lodash-es';
import { parse, stringify } from 'qs';
import type { Pageable } from './models';

export const usePaging = <T, S extends Pageable>(
  fetchBuilder: (criteria: S) => Promise<Common.Pagination<T>>,
  fetchParamsBuilder: (criteria: S) => any,
  paramsBuilder: (searchParams: LocationQuery) => S,
  handler?: (criteria: S) => void,
  errorBuilder?: (result: Service.RestfulResult<unknown>) => void,
  validateParams?: (criteria: S) => Promise<void>,
  listBuilder?: (pagination: Common.Pagination<T>) => void
) => {
  const route = useRoute();

  // 路由参数
  const searchParams = computed(() => route.query);

  const defaultCriteria = paramsBuilder(searchParams.value);
  //
  const criteria = ref(defaultCriteria) as Ref<S>;

  const loading = ref(false);

  const pagination = ref<Common.Pagination<T>>();

  /**
   * 获取数据
   */
  const paging = async (c: S) => {
    loading.value = true;
    criteria.value = c;
    const result = await (async () => {
      return fetchBuilder(fetchParamsBuilder(c));
    })().finally(() => {
      loading.value = false;
    });
    errorBuilder?.(result as unknown as Service.RestfulResult<unknown>);
    pagination.value = result as unknown as typeof result;
    listBuilder?.(result as unknown as Common.Pagination<T>);
  };

  // 检测路由参数变化
  const watchStopHandle = watch(
    searchParams,
    n => {
      const c = paramsBuilder(n);
      criteria.value = c;
      paging(c);
    },
    {
      deep: true
    }
  );

  // 在离开当前路由的时候摧毁监听
  onBeforeRouteLeave(() => {
    watchStopHandle();
  });

  /**
   * 改变搜索条件
   * @param c
   */
  const query = async (c?: Partial<S>) => {
    const raw: S = toRaw(criteria.value);

    const targetCriteria = paramsBuilder(
      parse(
        stringify(
          {
            ...(c ?? {}),
            pageNumber: 1,
            pageSize: raw.pageSize,
            sort: raw.sort
          },
          { arrayFormat: 'repeat' }
        )
      ) as LocationQuery
    );

    if (handler && !isEqual(targetCriteria, raw)) {
      handler(targetCriteria);
    } else {
      paging(targetCriteria);
    }
  };

  /**
   * 改变页码
   * @param pageNumber
   */
  const changePage = async (pageNumber: number) => {
    const sourcePage = criteria.value.pageNumber;
    const targetCriteria = { ...criteria.value, pageNumber };
    if (handler) {
      if (sourcePage === pageNumber) {
        paging(targetCriteria);
      } else {
        handler(targetCriteria);
      }
    } else {
      paging(targetCriteria);
    }
  };

  /**
   * 改变页码分页大小
   * @param pageSize
   */
  const changeLimit = async (pageSize: number) => {
    const targetCriteria = { ...criteria.value, pageNumber: 1, pageSize };
    if (handler) {
      handler(targetCriteria);
    } else {
      paging(targetCriteria);
    }
  };
  /**
   * 改变排序
   * @param sortState
   * @param multiple
   */
  const changeSort = async (sortState: string, multiple: boolean) => {
    const [key, order] = sortState.split(',');
    const currentSorts = (criteria.value.sort as string[])
      .map((it: string) => it.split(',') as [string, string])
      .filter(([k]) => k !== key)
      .map(([k, o]) => `${k},${o}`);
    let sort: string[];
    if (multiple) {
      sort = order ? [...currentSorts, `${key},${order}`] : currentSorts;
    } else {
      sort = order ? [`${key},${order}`] : [];
    }
    const targetCriteria = {
      ...criteria.value,
      pageNumber: 1,
      sort
    };

    if (handler) {
      handler(targetCriteria);
    } else {
      paging(targetCriteria);
    }
  };

  /**
   * 重置排序
   */
  const resetSort = async () => {
    const targetCriteria = {
      ...criteria.value,
      pageNumber: 1,
      sort: paramsBuilder({}).sort
    };
    if (handler) {
      handler(targetCriteria);
    } else {
      paging(targetCriteria);
    }
  };

  onBeforeMount(() => {
    validateParams?.(criteria.value);
    paging(defaultCriteria);
  });

  return {
    defaultCriteria,
    criteria,
    loading,
    pagination,
    paging,
    query,
    changePage,
    changeLimit,
    changeSort,
    resetSort
  };
};
