import router from './router';
import sinon from 'sinon';
import Block, { Props } from '../block';

describe('core/Router', () => {
  const getContentFake = sinon.fake.returns(document.createElement('div'));

  const BlockMock = class {
    getContent = getContentFake;
  } as unknown as Block<Props>;

  it('use() should return Router instance', () => {
    const result = router.use('/', BlockMock);

    expect(result).toEqual(router);
  });

  it('should back in history', () => {
    window.history.pushState({}, '', '/route1');
    window.history.pushState({}, '', '/route2');

    router.back();

    window.onpopstate = (_event: PopStateEvent) => {
      expect(window.location.pathname).toBe('/route1');
    };
  });

  it('should forward in history', () => {
    window.history.pushState({}, '', '/route1');
    window.history.pushState({}, '', '/route2');

    router.back();
    router.forward();

    window.onpopstate = (_event: PopStateEvent) => {
      expect(window.location.pathname).toBe('/route2');
    };
  });
});
