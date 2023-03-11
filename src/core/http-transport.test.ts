import sinon, { SinonFakeXMLHttpRequest } from 'sinon';
import HTTPTransport, { METHODS } from './http-transport';

describe('HTTPTransport', () => {
  const requests: SinonFakeXMLHttpRequest[] = [];
  let http: HTTPTransport;

  beforeEach(() => {
    sinon.useFakeXMLHttpRequest().onCreate = (request: SinonFakeXMLHttpRequest) => {
      requests.push(request);
    };
    http = new HTTPTransport('/auth');
  });

  afterEach(() => {
    requests.length = 0;
  });

  it('.get() should send GET request', () => {
    http.get('/');

    const [request] = requests;

    expect(request.method).toEqual(METHODS.GET);
  });

  it('.post() should send POST request', () => {
    http.post('/');

    const [request] = requests;

    expect(request.method).toEqual(METHODS.POST);
  });

  it('.delete() should send DELETE request', () => {
    http.delete('/');

    const [request] = requests;

    expect(request.method).toEqual(METHODS.DELETE);
  });

  it('.put() should send PUT request', () => {
    http.put('/');

    const [request] = requests;

    expect(request.method).toEqual(METHODS.PUT);
  });

  it('.patch() should send PATCH request', () => {
    http.patch('/');

    const [request] = requests;

    expect(request.method).toEqual(METHODS.PATCH);
  });
});
