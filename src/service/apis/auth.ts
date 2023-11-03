import type { PasswordLoginDto } from '@/params';
import { request } from '../request';

export const authApis = {
  passwordLogin(body: PasswordLoginDto) {
    return request.post<AuthModule.TokenVo>('/auth/password-login', body);
  },
  get() {
    return request.get<AuthModule.CustomerVo>('/auth/get');
  },
  getCaptcha() {
    return request.get<AuthModule.CaptchaVo>('/auth/captcha');
  },
  logout() {
    return request.post<boolean>('/auth/logout');
  }
};
