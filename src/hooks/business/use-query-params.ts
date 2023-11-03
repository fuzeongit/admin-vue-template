/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */

import { computed, reactive } from 'vue';
import type { ColumnKey } from 'naive-ui/es/data-table/src/interface';

export function useQueryParams<T>(
  modelBuilder: () => QuickQuery.Model<T>,
  additionalCondition: (key: ColumnKey, type: 'column' | 'query') => boolean = () => true
) {
  const customModel = computed(() => {
    const model = modelBuilder();
    const result = {} as QuickQuery.Model<T>;
    for (const key in model) {
      result[key] = reactive(model[key]!);
    }
    return result;
  });

  const queryParamsModel = computed(() => {
    const result = {} as QuickQuery.Model<T>;
    for (const key in customModel.value) {
      const model = customModel.value[key]!;
      const additional = model.additional !== undefined ? model.additional : false;
      if (additional ? additionalCondition(key, 'query') : true) {
        result[key] = model;
      }
    }
    return result;
  });

  return {
    queryParamsModel
  };
}
