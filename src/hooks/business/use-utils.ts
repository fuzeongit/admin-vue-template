import type { FormInst } from 'naive-ui';
import { useLoading } from '../common';

export function useUtils() {
  const { loading, startLoading, endLoading } = useLoading();

  function validate(formRef: Ref<FormInst | undefined>) {
    return new Promise<void>((resolve, reject) => {
      startLoading();
      formRef.value?.validate(error => {
        if (error) {
          endLoading();
          reject(error);
        } else {
          resolve();
        }
      });
    });
  }
  return {
    loading,
    startLoading,
    endLoading,
    validate
  };
}
