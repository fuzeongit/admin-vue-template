<template>
  <div>
    <div un-bg="yellow" un-w="30-1.5"></div>
    <n-space :vertical="true" :size="16">
      <n-card class="shadow-sm rounded-16px">
        <query-params-input-blur
          :model="queryParamsModel"
          :default-value="defaultCriteria"
          @query="query"
          @reset-sort="resetSort"
        ></query-params-input-blur>
      </n-card>
      <n-card class="shadow-sm rounded-16px flex-1">
        <n-space :vertical="true">
          <n-space>
            <n-button type="primary" @click="test">test</n-button>
            <n-button type="primary" @click="createVueRef.show()">发布商品</n-button>
            <column-setting v-model:columns="sortColumns" />
          </n-space>
          <n-data-table
            remote
            :loading="loading"
            :bordered="false"
            :columns="columns"
            :data="pagination?.content"
            :row-key="(row: ProductModule.ProductVo) => row.id"
            :pagination="paginationProps"
            @update:sorter="changeSort"
          />
        </n-space>
      </n-card>
    </n-space>
  </div>
</template>
<script lang="tsx" setup>
import { ref } from 'vue';
import type { LocationQueryRaw } from 'vue-router';
import { useRoute, useRouter } from 'vue-router';
import type { CascaderOption } from 'naive-ui';
import { plainToClass } from 'class-transformer';
import { QueryParamsType } from '@/constants';
import { productApis } from '@/service';
import { useAsyncStore, useNaivePaging } from '@/hooks';
import { consoleLog, sleep } from '@/share/utils';
import { ProductParams } from '@/params/product';
import TitleInput from './components/title-input.vue';
const router = useRouter();
const route = useRoute();
const createVueRef = ref();
const { numMulSelOptions } = useAsyncStore();

const getOptions = (depth = 3, iterator = 1, prefix = '') => {
  const length = 12;
  const options: CascaderOption[] = [];
  for (let i = 1; i <= length; i += 1) {
    if (iterator === 1) {
      options.push({
        value: `v-${i}`,
        label: `l-${i}`,
        disabled: i % 5 === 0,
        children: getOptions(depth, iterator + 1, `${String(i)}`)
      });
    } else if (iterator === depth) {
      options.push({
        value: `v-${prefix}-${i}`,
        label: `l-${prefix}-${i}`,
        disabled: i % 5 === 0
      });
    } else {
      options.push({
        value: `v-${prefix}-${i}`,
        label: `l-${prefix}-${i}`,
        disabled: i % 5 === 0,
        children: getOptions(depth, iterator + 1, `${prefix}-${i}`)
      });
    }
  }
  return options;
};

const v = ref(1);

const test = async () => {
  v.value = Math.random();
  productApis.test().then(res => {
    consoleLog(res);
  });
};

const {
  defaultCriteria,
  criteria,
  query,
  paginationProps,
  loading,
  columns,
  pagination,
  changeSort,
  resetSort,
  sortColumns,
  queryParamsModel
} = useNaivePaging<ProductModule.ProductVo, ProductParams>({
  fetchBuilder: n => productApis.pagingSelf(n),
  paramsBuilder: n => plainToClass(ProductParams, n),
  handler: n => router.push({ path: route.fullPath, query: n as unknown as LocationQueryRaw }),
  columnsBuilder: getOrderString => [
    {
      title: () => {
        return (
          <TitleInput
            label="标题"
            defaultValue={criteria.value.strSel}
            onQuery={vv => {
              query({ strSel: vv });
            }}
          ></TitleInput>
        );
      },
      key: 'title',
      disabledVisible: true,
      sorter: true,
      sortOrder: getOrderString('title')
      // filter: true,
      // filterOptions: [
      //   {
      //     label: 'London',
      //     value: 'London'
      //   },
      //   {
      //     label: 'New York',
      //     value: 'New York'
      //   }
      // ]
    },
    {
      title: '幅度',
      key: 'step'
    }
  ],
  queryModelBuilder: () => ({
    str: {
      type: QueryParamsType.String,
      placeholder: 'str',
      hasDefault: true
    },
    num: {
      type: QueryParamsType.Number,
      placeholder: 'num'
    },
    strSel: {
      type: QueryParamsType.Select,
      placeholder: 'strSel',
      options: [
        {
          label: 'strSel1',
          value: 'strSel1'
        },
        {
          label: 'strSel2',
          value: 'strSel2'
        }
      ]
    },
    numSel: {
      type: QueryParamsType.Select,
      placeholder: 'numSel',
      options: [
        {
          label: 'numSel1',
          value: 1
        },
        {
          label: 'numSel2',
          value: 2
        }
      ]
    },
    strMulSel: {
      type: QueryParamsType.MultiSelect,
      placeholder: 'strMulSel',
      options: [
        {
          label: 'strMulSel1',
          value: 'strMulSel1'
        },
        {
          label: 'strMulSel2',
          value: 'strMulSel2'
        }
      ]
    },
    numMulSel: {
      type: QueryParamsType.MultiSelect,
      placeholder: 'numMulSel',
      options: numMulSelOptions.value,
      additional: true
    },
    dateRange: {
      type: QueryParamsType.DateRange,
      startPlaceholder: 'start',
      endPlaceholder: 'end'
    },
    date: {
      type: QueryParamsType.Date,
      placeholder: 'date'
    },
    autoComplete: {
      type: QueryParamsType.AutoComplete,
      placeholder: 'autoComplete',
      loading: false,
      options: [],
      async action(value: string) {
        this.loading = true;
        await sleep(1000);
        this.loading = false;
        this.options = [
          {
            label: 'autoComplete1',
            value: 'autoComplete1'
          },
          {
            label: 'autoComplete2',
            value: 'autoComplete2'
          }
        ].filter(it => it.label.includes(value));
      }
    },
    cascader: {
      type: QueryParamsType.Cascader,
      placeholder: 'cascader',
      options: getOptions()
    }
  }),
  rowKey: row => row.id,
  multiple: true
});
</script>
