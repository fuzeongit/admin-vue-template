import { computedAsync } from '@vueuse/core';
import { sleep } from '@/share/utils';

export function useAsyncStore() {
  const numMulSelOptions = computedAsync(
    async () => {
      await sleep(200);
      return [
        {
          label: 'numMulSel1',
          value: 1
        },
        {
          label: 'numMulSel2',
          value: 2
        }
      ];
    },
    [],
    { lazy: true }
  );

  return {
    numMulSelOptions
  };
}
