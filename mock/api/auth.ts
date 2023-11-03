import type { MockMethod } from 'vite-plugin-mock';
import { tokenModel } from '../model';

const apis: MockMethod[] = [
  // 用户+密码 登录
  {
    url: '/mock/auth/password-login',
    method: 'post',
    response: (_options: Service.MockOption): AuthModule.TokenVo => {
      // const { userName = undefined, password = undefined } = options.body;

      const findItem = tokenModel[0];

      return findItem;
    }
  }
];

export default apis;
