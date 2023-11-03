import type { App } from 'vue';
import { createI18n } from 'vue-i18n';

const i18n = createI18n({
  fallbackLocale: 'zh-CN',
  legacy: false
});

export function setupI18n(app: App) {
  app.use(i18n);
}

export function t(key: string) {
  return i18n.global.t(key);
}

export function setLocale(locale: I18nType.langType) {
  i18n.global.locale.value = locale;
}

export async function loadLanguageAsync(locale: I18nType.langType) {
  const localeFile = await import(`@/locales/lang/${locale}.json`);
  // 动态加载对应的语言包
  i18n.global.setLocaleMessage(locale, localeFile.default);
  return setLocale(locale);
}
