import { defineStore } from 'pinia';
import { sleep } from '@/share/utils';

interface SpinState {
  loading: boolean;
}

export const useSpinStore = defineStore('spin-store', {
  state: (): SpinState => ({
    loading: false
  }),
  actions: {
    /**
     * 重载页面
     * @param duration - 重载的延迟时间(ms)
     */
    async start(duration = 0) {
      this.loading = true;
      if (duration > 0) {
        await sleep(duration);
        this.loading = false;
      }
    },
    end() {
      this.loading = false;
    }
  }
});

export type UseSpinStore = ReturnType<typeof useSpinStore>;
