import type { GithubLoginDto } from '@/params';
import { request } from '../request';

export const githubApis = {
  getOauthUrl() {
    return request.get<string>('/github/get-oauth-url');
  },
  authorize(dto: GithubLoginDto) {
    return request.post<AuthModule.TokenVo>('/github/authorize', dto);
  }
};
