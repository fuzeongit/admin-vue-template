import type { AxiosError, AxiosInstance, AxiosRequestConfig } from 'axios';
import axios from 'axios';
import { REFRESH_TOKEN_CODE } from '@/config';
import { getToken, handleAxiosError, handleResponseError, handleServiceResult, transformRequestData } from '@/utils';
import { HttpStatus } from '@/share/http';
import { handleRefreshToken } from './helpers';

/**
 * 封装axios请求类
 * @author Soybean<honghuangdc@gmail.com>
 */
export default class CustomAxiosInstance {
  instance: AxiosInstance;

  backendConfig: Service.BackendResultConfig;

  /**
   *
   * @param axiosConfig - axios配置
   * @param backendConfig - 后端返回的数据配置
   */
  constructor(
    axiosConfig: AxiosRequestConfig,
    backendConfig: Service.BackendResultConfig = {
      statusKey: 'status',
      dataKey: 'data',
      messageKey: 'message',
      successStatus: HttpStatus.OK,
      exceptionKey: 'exception'
    }
  ) {
    this.backendConfig = backendConfig;
    this.instance = axios.create(axiosConfig);
    this.setInterceptor();
  }

  /** 设置请求拦截器 */
  setInterceptor() {
    this.instance.interceptors.request.use(
      async config => {
        const handleConfig = { ...config };
        if (handleConfig.headers) {
          // 数据转换
          const contentType = handleConfig.headers['Content-Type'] as string;
          handleConfig.data = await transformRequestData(handleConfig.data, contentType as UnionKey.ContentType);
          // 设置token
          const tokenVo = getToken();
          if (tokenVo) {
            handleConfig.headers[tokenVo.tokenName] = tokenVo.tokenValue;
          }
        }
        return handleConfig;
      },
      (axiosError: AxiosError) => {
        const error = handleAxiosError(axiosError);
        return handleServiceResult(error);
      }
    );
    this.instance.interceptors.response.use(
      async response => {
        const { status } = response;

        const backend = response.data;

        if (status === 200 || status < 300 || status === 304) {
          return handleServiceResult(undefined, backend);
        }

        const error = handleResponseError(response);
        return handleServiceResult(error, backend);
      },
      (axiosError: AxiosError) => {
        // token失效，重置登录状态
        if (REFRESH_TOKEN_CODE.includes(axiosError.response!.status)) {
          handleRefreshToken();
        }
        const error = handleAxiosError(axiosError);
        return handleServiceResult(error);
      }
    );
  }
}
