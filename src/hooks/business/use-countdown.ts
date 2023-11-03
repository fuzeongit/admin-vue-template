import { isInteger } from 'lodash-es';
import { iif, interval, last, of, Subject, switchMap, take, tap } from 'rxjs';

/**
 * 钩子
 * 倒数计时
 * @author Zeongit
 * @param timeout 毫秒数
 * @param period 每次回调间隔
 */
export const useCountdown = (timeout: number, period: number) => {
  const count = timeout / period;
  if (!isInteger(count)) {
    throw new Error('');
  }
  /** 定义主题 */
  const subject$ = new Subject<number>();
  const loading = ref(false);
  const current = ref(timeout);

  subject$
    .pipe(
      tap(value => {
        current.value = value;
        loading.value = true;
      }),
      /** @link https://rxjs.dev/api/index/function/switchMap */
      switchMap(value =>
        /** 判断操作符 */
        iif(
          () => value > 0,
          interval(period).pipe(
            /** 取前count个 */
            take(count),
            /** 变化current的值 */
            tap(i => {
              current.value = value - period * (i + 1);
            }),
            /** 只取最后一个 */
            last()
          ),
          of(0)
        )
      )
    )
    .subscribe(() => {
      /** 当任务流结束则关闭Loading */
      loading.value = false;
    });

  const execute = (force = false) => {
    if (force) {
      subject$.next(timeout);
    } else if (!loading.value) {
      subject$.next(timeout);
    }
  };

  const stop = () => {
    /** 用0代表停止 */
    subject$.next(0);
  };

  return { current, loading, execute, stop, subject$ };
};
