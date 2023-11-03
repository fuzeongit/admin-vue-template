<template>
  <n-popover placement="bottom-end" trigger="click">
    <template #trigger>
      <n-button ghost type="primary">筛选列</n-button>
    </template>
    <div class="min-w-180px">
      <vue-draggable v-model="list" item-key="key">
        <template #item="{ element }">
          <div v-if="element.key" class="flex-y-center h-36px px-12px hover:bg-primary_active rounded-1">
            <icon-mdi-drag class="mr-8px text-20px cursor-move" />
            <n-checkbox v-model:checked="element.visible" :disabled="element.disabledVisible">
              <template v-if="isString(element.title)">
                {{ element.title }}
              </template>
              <component :is="element.title" v-else></component>
            </n-checkbox>
          </div>
        </template>
      </vue-draggable>
    </div>
  </n-popover>
</template>

<script setup lang="ts">
import { isString } from 'lodash';
import VueDraggable from 'vuedraggable';

type Column = {
  visible?: boolean;
  additional?: boolean;
  disabledVisible?: boolean;
};

const props = defineProps<{
  columns: Column[];
}>();

interface Emits {
  (e: 'update:columns', columns: Column[]): void;
}

const emit = defineEmits<Emits>();

const list = computed({
  get: () => props.columns,
  set: val => emit('update:columns', val)
});
</script>

<style scoped></style>
