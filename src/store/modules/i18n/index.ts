import { defineStore } from 'pinia';
import { dateEnUS, dateZhCN, dateZhTW, enUS, zhCN, zhTW } from 'naive-ui';
import { StorageKey } from '@/constants';
// import { setLocale } from '@/locales';
import { setLocal } from '@/share/utils';
import { getLocale } from '@/utils/locale';

interface AuthState {
  language: I18nType.langType;
}

export const useI18nStore = defineStore('i18n-store', {
  state: (): AuthState => ({
    language: getLocale()
  }),
  getters: {
    naiveLocale(state) {
      if (state.language === 'zh-CN') {
        return {
          locale: zhCN,
          dateLocale: dateZhCN
        };
      }
      if (state.language === 'zh-HK') {
        return {
          locale: zhTW,
          dateLocale: dateZhTW
        };
      }
      if (state.language === 'en-US') {
        return {
          locale: enUS,
          dateLocale: dateEnUS
        };
      }
    }
  },
  actions: {
    changeLanguage(language: I18nType.langType) {
      // setLocale(language);
      // this.$state.language = language;
      setLocal(StorageKey.language, language);
      window.location.reload();
    }
  }
});
