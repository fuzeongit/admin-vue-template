/* eslint-disable import/order */
import { useRouterPush } from '@/composables';
import type { GithubLoginDto, PasswordLoginDto } from '@/params';
import { router } from '@/router';
import { authApis, githubApis } from '@/service';
import { clearAuthStorage, getCustomerInfo, setCustomerInfo, setToken } from '@/utils';
import { defineStore } from 'pinia';
import { unref } from 'vue';
import { useRouteStore } from '../route';
import { useTabStore } from '../tab';

interface AuthState {
  /** 用户信息 */
  info?: AuthModule.CustomerVo;
  /** 用户token */
  token?: string;
  /** 登录的加载状态 */
  loginLoading: boolean;
}

export const useAuthStore = defineStore('auth-store', {
  state: (): AuthState => ({
    info: getCustomerInfo(),
    loginLoading: false
  }),
  getters: {
    /** 是否登录 */
    isLogin(state) {
      return Boolean(state.token);
    }
  },
  actions: {
    /** 重置auth状态 */
    async resetAuthStore() {
      const { toLogin } = useRouterPush(false);
      const { resetTabStore } = useTabStore();
      const { resetRouteStore } = useRouteStore();
      const route = unref(router.currentRoute);

      clearAuthStorage();

      resetTabStore();
      resetRouteStore();

      if (route.meta.requiresAuth) {
        await toLogin();
      }
      this.$reset();
    },
    /**
     * 处理登录后成功或失败的逻辑
     * @param tokenVo - 返回的token
     */
    async handleActionAfterLogin(tokenVo: AuthModule.TokenVo) {
      const { toLoginRedirect } = useRouterPush(false);

      const loginSuccess = await this.loginByToken(tokenVo);

      if (loginSuccess) {
        // 跳转登录后的地址
        toLoginRedirect();

        // 登录成功弹出欢迎提示
        window.$notification?.success({
          title: '登录成功!',
          content: `欢迎回来，${this.info!.name}!`,
          duration: 3000
        });

        return;
      }

      // 不成功则重置状态
      this.resetAuthStore();
    },
    /**
     * 根据token进行登录
     * @param tokenVo - 返回的token
     */
    async loginByToken(tokenVo: AuthModule.TokenVo) {
      let successFlag = false;
      setToken(tokenVo);

      // 获取用户信息
      try {
        const customer = await authApis.get();
        setCustomerInfo(customer);

        // 更新状态
        this.info = customer;
        successFlag = true;
      } catch (e) {}
      return successFlag;
    },
    /**
     * 登录
     */
    async login(dto: PasswordLoginDto) {
      this.loginLoading = true;
      try {
        const tokenVo = await authApis.passwordLogin(dto);
        await this.handleActionAfterLogin(tokenVo);
      } finally {
        this.loginLoading = false;
      }
    },
    /**
     * 登录
     */
    async githubLogin(dto: GithubLoginDto) {
      this.loginLoading = true;
      try {
        const tokenVo = await githubApis.authorize(dto);
        await this.handleActionAfterLogin(tokenVo);
      } finally {
        this.loginLoading = false;
      }
    },
    /**
     * 登出
     */
    async logout() {
      await authApis.logout();
      this.resetAuthStore();
    }
  }
});
