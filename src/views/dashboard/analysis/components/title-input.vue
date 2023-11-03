<template>
  <n-popover trigger="click">
    <n-input v-model:value="value" @blur="query()" />
    <template #trigger>
      {{ defaultValue ?? label }}
    </template>
  </n-popover>
</template>
<script setup lang="ts">
const props = defineProps<{ defaultValue?: string; label: string }>();
const emits = defineEmits<{ (event: 'query', _?: string): void }>();
const value = ref(props.defaultValue);

const query = () => {
  emits('query', value.value);
};
</script>
