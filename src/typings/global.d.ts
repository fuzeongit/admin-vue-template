interface Window {
  $loadingBar?: import('naive-ui').LoadingBarProviderInst;
  $dialog?: import('naive-ui').DialogProviderInst;
  $message?: import('naive-ui').MessageProviderInst;
  $notification?: import('naive-ui').NotificationProviderInst;
  $spin?: import('../store/modules/spin').UseSpinStore;
}

type Nullable<T> = T | null;

/** 通用类型 */
declare namespace Common {
  /**
   * 策略模式
   * [状态, 为true时执行的回调函数]
   */
  type StrategyAction = [boolean, () => void];

  /** 选项数据 */
  type OptionWithKey<K> = { value: K; label: string };

  type QueryModel<T> = T extends import('../share/page/models').Pageable ? T : import('../share/page/models').Pageable;

  interface Pagination<T> {
    content: T[];
    empty: boolean;
    first: boolean;
    last: boolean;
    number: number;
    numberOfElements: number;
    pageable: Pageable;
    size: number;
    totalElements: number;
    totalPages: number;
  }

  interface Pageable {
    offset: number;
    pageNumber: number;
    pageSize: number;
    paged: boolean;
    unpaged: boolean;
  }
}

/** 构建时间 */
declare const PROJECT_BUILD_TIME: string;
