<template>
  <!-- eslint-disable vue/valid-v-model -->
  <n-form ref="formRef" :label-width="80" :show-label="false" :show-feedback="false" inline>
    <template v-for="(item, key) in model" :key="key">
      <n-form-item
        :label="item.label"
        :style="{
          width:
            item.type === QueryParamsType.DateRange
              ? '250px'
              : isNumber(item.width)
              ? `${item.width}px`
              : item.width ?? '124px'
        }"
      >
        <n-auto-complete
          v-if="item.type === QueryParamsType.AutoComplete"
          v-model:value="queryParams[key] as string"
          :options="item.options"
          :loading="item.loading"
          :placeholder="item.placeholder"
          :render-label="(option: any) => option.value"
          :clearable="!item.hasDefault"
          @update:value="v => item.action(v)"
          @blur="query"
        />
        <n-input
          v-if="item.type === QueryParamsType.String"
          v-model:value="queryParams[key] as string"
          :placeholder="item.placeholder"
          :clearable="!item.hasDefault"
          @blur="query"
        />
        <n-input-number
          v-if="item.type === QueryParamsType.Number"
          v-model:value="queryParams[key] as number"
          :placeholder="item.placeholder"
          :clearable="!item.hasDefault"
          :min="item.min"
          :max="item.max"
          @blur="query"
        />
        <n-select
          v-if="item.type === QueryParamsType.Select"
          v-model:value="queryParams[key]"
          :placeholder="item.placeholder"
          :loading="item.loading"
          :options="item.options"
          :clearable="!item.hasDefault"
          :remote="item.remote"
          :filterable="item.remote"
          @search="v => item.action?.(v)"
          @update:value="e => changeQuery(key, e)"
        />
        <n-select
          v-if="item.type === QueryParamsType.MultiSelect"
          v-model:value="queryParams[key]"
          :placeholder="item.placeholder"
          :options="item.options"
          multiple
          :clearable="!item.hasDefault"
          :remote="item.remote"
          :filterable="item.remote"
          @search="v => item.action?.(v)"
          @update:value="e => changeQuery(key, e)"
        />
        <n-date-picker
          v-if="item.type === QueryParamsType.Date"
          v-model:formatted-value="queryParams[key] as string | null"
          :clearable="!item.hasDefault"
          :value-format="dateFormat"
          :placeholder="item.placeholder"
          type="date"
          @update:value="e => changeQuery(key, e)"
        />
        <n-date-picker
          v-if="item.type === QueryParamsType.DateRange"
          v-model:formatted-value="queryParams[key] as null | [string, string]"
          :clearable="!item.hasDefault"
          :value-format="dateFormat"
          :start-placeholder="item.startPlaceholder"
          :end-placeholder="item.endPlaceholder"
          type="daterange"
          @update:value="e => changeQuery(key, e)"
        />
        <n-cascader
          v-if="item.type === QueryParamsType.Cascader"
          v-model:value="queryParams[key]"
          :placeholder="item.placeholder"
          :options="item.options"
          :clearable="!item.hasDefault"
          expand-trigger="hover"
          check-strategy="child"
          :remote="item.remote"
          :on-load="item.onLoad"
          @blur="query"
        />
      </n-form-item>
    </template>
    <n-form-item>
      <n-space>
        <slot></slot>
      </n-space>
    </n-form-item>
  </n-form>
</template>

<script lang="ts" setup>
import dayjs from 'dayjs';
import type { ClassConstructor } from 'class-transformer';
import { plainToClass } from 'class-transformer';
import { isNumber } from 'lodash';
import { QueryParamsType } from '@/constants';

const props = defineProps({
  model: {
    type: Object as PropType<Record<string, QuickQuery.ModelOption>>,
    required: true
  },
  defaultValue: {
    type: Object as PropType<Record<string, any>>,
    default: () => ({})
  },
  dateFormat: {
    type: String,
    default: 'yyyy-MM-dd'
  }
});

const emits = defineEmits<{
  (event: 'query', _: QuickQuery.FormParams): void;
  (event: 'resetSort'): void;
}>();

const formatValue = (key: string, value: any) => {
  const modelOption = props.model[key];
  if (modelOption.type === QueryParamsType.Date) {
    return value ? dayjs(value).format(props.dateFormat.toUpperCase()) : null;
  }
  if (modelOption.type === QueryParamsType.DateRange) {
    return value?.some((v: Date) => v)
      ? value
          .map((v: Date) => (v ? dayjs(v).format(props.dateFormat.toUpperCase()) : undefined))
          .filter((v: string) => v)
      : null;
  }
  // if (modelOption.type === QueryParamsType.Select && modelOption.remote) {
  //   if (value !== null && value !== undefined) {
  //     modelOption.action?.(value);
  //   }
  // }
  return value ?? null;
};

const buildQueryParams = () => {
  const object: QuickQuery.FormParams = {};
  Object.keys(props.model).forEach(it => {
    object[it] = formatValue(it, props.defaultValue[it]);
  });
  return object;
};

const queryParams = ref(buildQueryParams());
const query = () => {
  const object: QuickQuery.FormParams = {};
  Object.keys(queryParams.value).forEach(it => {
    if (!(queryParams.value[it] === null || queryParams.value[it] === '')) {
      object[it] = queryParams.value[it];
    }
  });
  emits('query', object);
};

const changeQuery = (key: string, value: any) => {
  const object: QuickQuery.FormParams = {};
  const currencyParams = { ...queryParams.value, [key]: formatValue(key, value) };
  Object.keys(currencyParams).forEach(it => {
    if (!(currencyParams[it] === null || currencyParams[it] === '')) {
      object[it] = currencyParams[it];
    }
  });
  emits('query', object);
};

const reset = () => {
  const object: QuickQuery.FormParams = {};
  const defaultValue: Record<string, any> = plainToClass(props.defaultValue.constructor as ClassConstructor<any>, {});
  Object.keys(props.model).forEach(key => {
    if (props.model[key].hasDefault) {
      const value = defaultValue[key];

      if (props.model[key].type === QueryParamsType.Date) {
        object[key] = value ? dayjs(value).format(props.dateFormat.toUpperCase()) : null;
      } else if (props.model[key].type === QueryParamsType.DateRange) {
        object[key] = value?.some((v: Date) => v)
          ? value
              .map((v: Date) => (v ? dayjs(v).format(props.dateFormat.toUpperCase()) : undefined))
              .filter((v: string) => v)
          : null;
      } else {
        object[key] = value;
      }
    } else {
      object[key] = null;
    }
  });
  queryParams.value = object;
  query();
};

defineExpose({
  query() {
    query();
  },
  reset() {
    reset();
  },
  setParam(key: string, value: Nullable<QuickQuery.ParamValue>) {
    queryParams.value[key] = formatValue(key, value);
  },
  getParams() {
    return queryParams.value;
  }
});
</script>

<style lang="scss" scoped>
.n-form--inline {
  --at-apply: flex-wrap;

  :deep(.n-form-item) {
    --at-apply: my-2 mr-3;
    .n-form-item-blank {
      > .n-input {
        --at-apply: w-full;
      }
    }
  }
}

:deep(.n-form-item-blank) {
  .n-input-number,
  .n-date-picker,
  .n-input {
    --at-apply: w-full;
  }
}
</style>
