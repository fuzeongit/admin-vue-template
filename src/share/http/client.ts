/* eslint-disable no-param-reassign */
/* eslint-disable no-useless-constructor */
import { stringify } from 'qs';

export interface RequestOptions extends RequestInit {
  params?: Record<string, any>;
  headers?: Headers;
}

export interface HttpClientOptions {
  // 传入工厂，因为有些值是会变的，不能在声明的时候写死
  headersFactory?: () => Headers;
}

export abstract class HttpClient<T> {
  constructor(
    readonly host: string,
    readonly httpClientOptions: HttpClientOptions
  ) {}

  static getParamsString(options: RequestOptions) {
    return options.params
      ? `?${stringify(options.params, {
          arrayFormat: 'repeat'
        })}`
      : '';
  }

  protected getHeaders(headers: Headers) {
    const defaultHeaders = this.httpClientOptions?.headersFactory?.() ?? new Headers();
    defaultHeaders.forEach((v, k) => headers.append(k, v));
    return headers;
  }

  get(url: string, options: RequestOptions = {}) {
    options.method = 'GET';
    return this.fetchPack(url, options);
  }

  post(url: string, body: any, options: RequestOptions = {}) {
    options.method = 'POST';
    options.body = JSON.stringify(body);
    return this.fetchPack(url, options);
  }

  put(url: string, body: any, options: RequestOptions = {}) {
    options.method = 'PUT';
    options.body = JSON.stringify(body);
    return this.fetchPack(url, options);
  }

  delete(url: string, options: RequestOptions = {}) {
    options.method = 'DELETE';
    return this.fetchPack(url, options);
  }

  postForm(url: string, body: FormData, options: RequestOptions = {}) {
    options.method = 'POST';
    options.body = body;
    return this.fetchPack(url, options);
  }

  //   fetch(url: string, options: RequestOptions) {
  //     return fromFetch(
  //       this.host + url + this._getParamsString(options),
  //       Object.assign(options, {
  //         headers: this._getHeaders(options?.headers ?? new Headers())
  //       })
  //     )
  //   }

  abstract fetchPack(url: string, options: RequestOptions): T;
}
