import { ref } from 'vue';
import type { Ref } from 'vue';
import type { AxiosInstance, AxiosRequestConfig } from 'axios';
import { useLoading, useBoolean } from '@/hooks';
import CustomAxiosInstance from './instance';

type RequestMethod = 'get' | 'post' | 'put' | 'delete';

interface RequestParam {
  url: string;
  method?: RequestMethod;
  data?: any;
  axiosConfig?: AxiosRequestConfig;
}

// eslint-disable-next-line max-params
async function getRequestResponse(
  instance: AxiosInstance,
  method: RequestMethod,
  url: string,
  data?: any,
  config?: AxiosRequestConfig
) {
  let res: any;
  if (method === 'get' || method === 'delete') {
    res = await instance[method](url, config);
  } else {
    res = await instance[method](url, data, config);
  }
  return res;
}

/**
 * 创建请求
 * @param axiosConfig - axios配置
 * @param backendConfig - 后端接口字段配置
 */
export function createRequest(axiosConfig: AxiosRequestConfig, backendConfig?: Service.BackendResultConfig) {
  const customInstance = new CustomAxiosInstance(axiosConfig, backendConfig);

  /**
   * 异步promise请求
   * @param param - 请求参数
   * - url: 请求地址
   * - method: 请求方法(默认get)
   * - data: 请求的body的data
   * - axiosConfig: axios配置
   */
  async function asyncRequest<T>(param: RequestParam): Promise<T> {
    const { url } = param;
    const method = param.method || 'get';
    const { instance } = customInstance;
    const res = (await getRequestResponse(instance, method, url, param.data, param.axiosConfig)) as T;

    return res;
  }

  /**
   * get请求
   * @param url - 请求地址
   * @param config - axios配置
   */
  function get<T>(url: string, config?: AxiosRequestConfig) {
    return asyncRequest<T>({ url, method: 'get', axiosConfig: config });
  }

  /**
   * post请求
   * @param url - 请求地址
   * @param data - 请求的body的data
   * @param config - axios配置
   */
  function post<T>(url: string, data?: any, config?: AxiosRequestConfig) {
    return asyncRequest<T>({ url, method: 'post', data, axiosConfig: config });
  }
  /**
   * put请求
   * @param url - 请求地址
   * @param data - 请求的body的data
   * @param config - axios配置
   */
  function put<T>(url: string, data?: any, config?: AxiosRequestConfig) {
    return asyncRequest<T>({ url, method: 'put', data, axiosConfig: config });
  }

  /**
   * delete请求
   * @param url - 请求地址
   * @param config - axios配置
   */
  function handleDelete<T>(url: string, config: AxiosRequestConfig) {
    return asyncRequest<T>({ url, method: 'delete', axiosConfig: config });
  }

  return {
    get,
    post,
    put,
    delete: handleDelete
  };
}

type RequestResultHook<T = any> = {
  data: Ref<T | undefined>;
  error: Ref<Service.RequestError | undefined>;
  loading: Ref<boolean>;
  network: Ref<boolean>;
};

/**
 * 创建hooks请求
 * @param axiosConfig - axios配置
 * @param backendConfig - 后端接口字段配置
 */
export function createHookRequest(axiosConfig: AxiosRequestConfig, backendConfig?: Service.BackendResultConfig) {
  const customInstance = new CustomAxiosInstance(axiosConfig, backendConfig);

  /**
   * hooks请求
   * @param param - 请求参数
   * - url: 请求地址
   * - method: 请求方法(默认get)
   * - data: 请求的body的data
   * - axiosConfig: axios配置
   */
  function useRequest<T>(param: RequestParam): RequestResultHook<T> {
    const { loading, startLoading, endLoading } = useLoading();
    const { bool: network, setBool: setNetwork } = useBoolean(window.navigator.onLine);

    startLoading();
    const data = ref<T | undefined>();
    const error = ref<Service.RequestError | undefined>();

    function handleRequestResult(response: any) {
      data.value = response as T;
      endLoading();
      setNetwork(window.navigator.onLine);
    }

    const { url } = param;
    const method = param.method || 'get';
    const { instance } = customInstance;

    getRequestResponse(instance, method, url, param.data, param.axiosConfig).then(handleRequestResult);

    return {
      data,
      error,
      loading,
      network
    };
  }

  /**
   * get请求
   * @param url - 请求地址
   * @param config - axios配置
   */
  function get<T>(url: string, config?: AxiosRequestConfig) {
    return useRequest<T>({ url, method: 'get', axiosConfig: config });
  }

  /**
   * post请求
   * @param url - 请求地址
   * @param data - 请求的body的data
   * @param config - axios配置
   */
  function post<T>(url: string, data?: any, config?: AxiosRequestConfig) {
    return useRequest<T>({ url, method: 'post', data, axiosConfig: config });
  }
  /**
   * put请求
   * @param url - 请求地址
   * @param data - 请求的body的data
   * @param config - axios配置
   */
  function put<T>(url: string, data?: any, config?: AxiosRequestConfig) {
    return useRequest<T>({ url, method: 'put', data, axiosConfig: config });
  }

  /**
   * delete请求
   * @param url - 请求地址
   * @param config - axios配置
   */
  function handleDelete<T>(url: string, config: AxiosRequestConfig) {
    return useRequest<T>({ url, method: 'delete', axiosConfig: config });
  }

  return {
    get,
    post,
    put,
    delete: handleDelete
  };
}
