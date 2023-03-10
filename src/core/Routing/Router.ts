import Route from './Route';
import { Props } from '../block';

class Router {
  private static __instance: Router;
  private routes: Route[] = [];
  private _currentRoute: Route | null = null;
  private history = window.history;
  constructor(private readonly _rootQuery: string) {
    if (Router.__instance) {
      return Router.__instance;
    }
    Router.__instance = this;
  }

  use(pathname: string, block: any, props: Props = {}) {
    const route = new Route(pathname, block, {
      ...props,
      rootQuery: this._rootQuery,
    });
    this.routes.push(route);
    return this;
  }

  start() {
    // Реагируем на изменения в адресной строке и вызываем перерисовку
    window.onpopstate = (event) => {
      this._onRoute((event.currentTarget as Window).location.pathname);
    };

    this._onRoute(window.location.pathname);
  }

  _onRoute(pathname: string) {
    const route = this._getRoute(pathname);
    if (!route) {
      return;
    }

    if (this._currentRoute && this._currentRoute !== route) {
      this._currentRoute.leave();
    }

    this._currentRoute = route;
    route.render();
  }

  go(pathname: string) {
    this.history.pushState({}, '', pathname);
    this._onRoute(pathname);
  }

  back() {
    window.history.back();
  }

  forward() {
    window.history.forward();
  }

  private _getRoute(pathname: string) {
    return this.routes.find((route) => route.match(pathname));
  }
}

export default new Router('#root');
