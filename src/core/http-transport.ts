enum METHODS  {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  PATCH = 'PATCH',
  DELETE = 'DELETE'
}

type Options = {
  method: METHODS;
  data?: any;
  headers?: Record<string, string>;
  timeout?: number;
};

type HTTPMethod = (
  url: string,
  options: Options
) => Promise<XMLHttpRequest>;

function queryStringify(data: { [key: string | number]: string }) {
  // Можно делать трансформацию GET-параметров в отдельной функции
  if (typeof data !== 'object') {
    throw new Error('Incorrect data type, has to be object');
  }

  const arr = [];
  for (let el in data) {
    arr.push(`${el}=${data[el]}`)
  }
  return "?" + arr.join('&')
}

class HTTPTransport {
  get: HTTPMethod = (url, options ) => {
    if (options.data) {
      url = url + queryStringify(options.data)
    }
    return this.request(url, {...options, method: METHODS.GET}, options.timeout);
  };


  put: HTTPMethod = (url, options) => {
    return this.request(url, {...options, method: METHODS.PUT}, options.timeout);
  };

  post: HTTPMethod = (url, options) => {
    return this.request(url, {...options, method: METHODS.POST}, options.timeout);
  };

  delete: HTTPMethod = (url, options) => {
    return this.request(url, {...options, method: METHODS.DELETE}, options.timeout);
  };


  request = (url: string, options: Options, timeout = 5000): Promise<XMLHttpRequest> => {
    const {method, data, headers = {}} = options;

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open(method, url);
      xhr.timeout = timeout;

      Object.keys(headers).forEach(([key,value]) => {
        xhr.setRequestHeader(key, value);
      });

      xhr.onload = function() {
        resolve(xhr);
      };

      xhr.onabort = reject;
      xhr.onerror = reject;
      xhr.ontimeout = reject;

      if (method === METHODS.GET || !data) {
        xhr.send();
      } else {
        xhr.send(data);
      }
    });
  };
}
