import enUS from './en-US.json';
import zhCN from './zh-CN.json';
import zhHK from './zh-HK.json';

const messages = {
  'zh-CN': zhCN,
  'zh-HK': zhHK,
  'en-US': enUS
};

export type LocaleKey = keyof typeof messages;

export default messages;
