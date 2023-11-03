import type { Observable } from 'rxjs';
import { catchError, map, of, switchMap } from 'rxjs';
import { ajax } from 'rxjs/ajax';
import { fromFetch } from 'rxjs/fetch';
import type { HttpClientOptions, RequestOptions } from './client';
import { HttpClient } from './client';
import { HttpStatus } from './constants';
import { RestfulResult } from './models';

export class FetchObservableClient extends HttpClient<Observable<RestfulResult<any>>> {
  constructor(
    readonly host: string,
    readonly httpClientOptions: HttpClientOptions = {}
  ) {
    super(host, httpClientOptions);
  }

  fetch(url: string, options: RequestOptions = {}) {
    return fromFetch(
      this.host + url + HttpClient.getParamsString(options),
      Object.assign(options ?? {}, {
        headers: this.getHeaders(options?.headers ?? new Headers())
      })
    );
  }

  fetchPack(url: string, options: RequestOptions = {}) {
    return this.fetch(url, options).pipe(
      switchMap(response => response.json() as Promise<RestfulResult<any>>),
      catchError(error => of(new RestfulResult(HttpStatus.INTERNAL_SERVER_ERROR, 'Internal Server Exception', error)))
    );
  }
}

export class FetchClient extends HttpClient<Promise<RestfulResult<any>>> {
  constructor(
    readonly host: string,
    readonly httpClientOptions: HttpClientOptions = {}
  ) {
    super(host, httpClientOptions);
  }

  fetch(url: string, options: RequestOptions = {}) {
    return fetch(
      this.host + url + HttpClient.getParamsString(options),
      Object.assign(options ?? {}, {
        headers: this.getHeaders(options?.headers ?? new Headers())
      })
    );
  }

  async fetchPack(url: string, options: RequestOptions = {}) {
    try {
      const response = await this.fetch(url, options);
      return response.json() as Promise<RestfulResult<any>>;
    } catch (error) {
      return new RestfulResult(HttpStatus.INTERNAL_SERVER_ERROR, 'Internal Server Exception', error);
    }
  }
}

export class AjaxObservableClient extends HttpClient<Observable<RestfulResult<any>>> {
  constructor(
    readonly host: string,
    readonly httpClientOptions: HttpClientOptions = {}
  ) {
    super(host, httpClientOptions);
  }

  fetch(url: string, options: RequestOptions = {}) {
    return ajax(
      Object.assign(options ?? {}, {
        url: this.host + url + HttpClient.getParamsString(options),
        headers: this.getHeaders(options?.headers ?? new Headers())
      })
    );
  }

  fetchPack(url: string, options: RequestOptions = {}) {
    return this.fetch(url, options).pipe(
      map(response => response.response as RestfulResult<any>),
      catchError(error => of(new RestfulResult(HttpStatus.INTERNAL_SERVER_ERROR, 'Internal Server Exception', error)))
    );
  }
}
