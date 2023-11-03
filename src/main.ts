import 'reflect-metadata';
import { createApp } from 'vue';
import App from './App.vue';
import AppLoading from './components/common/app-loading.vue';
import { setupDirectives } from './directives';
import { setupRouter } from './router';
import { setupAssets } from './plugins';
import { setupStore } from './store';
import { loadLanguageAsync, setupI18n } from './locales';
import { getLocale } from './utils';

async function setupApp() {
  // import assets: js、css
  setupAssets();

  // app loading
  const appLoading = createApp(AppLoading);

  appLoading.mount('#appLoading');

  const app = createApp(App);

  // store plugin: pinia
  setupStore(app);

  // vue custom directives
  setupDirectives(app);

  // vue router
  await setupRouter(app);

  setupI18n(app);

  await loadLanguageAsync(getLocale());

  appLoading.unmount();

  // mount app
  app.mount('#app');
}

setupApp();
