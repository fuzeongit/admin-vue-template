<template>
  <hover-container class="w-40px h-full" :inverted="theme.header.inverted">
    <n-dropdown :options="options" trigger="hover" :value="language" @select="handleSelect">
      <icon-cil:language class="text-18px outline-transparent" />
    </n-dropdown>
  </hover-container>
</template>

<script lang="ts" setup>
import { useI18nStore, useThemeStore } from '@/store';
import { getLocale } from '@/utils';

const theme = useThemeStore();
const i18nStore = useI18nStore();

const language = ref<I18nType.langType>(getLocale() || 'zh-CN');
const options = [
  {
    label: '中文',
    key: 'zh-CN'
  },
  {
    label: 'English',
    key: 'en-US'
  },
  {
    label: 'ភាសាខ្មែរ',
    key: 'zh-HK'
  }
];
const handleSelect = (key: I18nType.langType) => {
  i18nStore.changeLanguage(key);
};
</script>
<style scoped></style>
