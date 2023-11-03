import { StorageKey } from '@/constants';
import { getLocal } from '@/share/utils';

export function getLocale() {
  const locale = getLocal<string | undefined>(StorageKey.language) ?? navigator.language;
  if (locale === 'zh-CN') {
    return 'zh-CN';
  }
  if (locale === 'zh-HK' || locale === 'zh-TW' || locale === 'zh') {
    return 'zh-HK';
  }
  return 'en-US';
}
