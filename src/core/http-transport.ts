import { queryString } from '../utils/queryStringify';

export enum METHODS {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  PATCH = 'PATCH',
  DELETE = 'DELETE',
}

type Options = {
  method?: METHODS;
  data?: unknown;
  headers?: Record<string, string>;
  timeout?: number;
};

export default class HTTPTransport {
  protected endpoint: string;
  static baseURL = 'https://ya-praktikum.tech/api/v2';
  constructor(endpoint: string) {
    this.endpoint = `${HTTPTransport.baseURL}${endpoint}`;
  }

  public get<R>(url: string, options?: Options): Promise<R> {
    if (options?.data) {
      url = url + '?' + queryString(options.data as any);
    }
    return this.request<R>(
      this.endpoint + url,
      { ...options, method: METHODS.GET },
      options?.timeout,
    );
  }

  public put<R>(url: string, options?: Options): Promise<R> {
    return this.request<R>(
      this.endpoint + url,
      { ...options, method: METHODS.PUT },
      options?.timeout,
    );
  }

  public post<R>(url: string, options?: Options): Promise<R> {
    return this.request<R>(
      this.endpoint + url,
      { ...options, method: METHODS.POST },
      options?.timeout,
    );
  }

  public patch<R>(url: string, options?: Options): Promise<R> {
    return this.request<R>(
      this.endpoint + url,
      { ...options, method: METHODS.PATCH },
      options?.timeout,
    );
  }

  delete<R>(url: string, options?: Options): Promise<R> {
    return this.request<R>(
      this.endpoint + url,
      { ...options, method: METHODS.DELETE },
      options?.timeout,
    );
  }

  request<R>(url: string, options: Options, timeout = 5000): Promise<R> {
    let { method, data } = options;
    if (!method) {
      method = METHODS.GET;
    }

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open(method!, url);
      xhr.timeout = timeout;

      xhr.withCredentials = true;

      xhr.onload = function () {
        if (xhr.status === 200) {
          // @ts-ignore
          resolve(xhr);
        } else {
          reject(xhr);
        }
      };

      xhr.onabort = reject;
      xhr.onerror = reject;
      xhr.ontimeout = reject;

      if (method === METHODS.GET || !data) {
        xhr.send();
      } else if (data instanceof FormData) {
        xhr.send(data);
      } else {
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(JSON.stringify(data));
      }
    });
  }
}
