import Block from '../core/block';
import Router from '../core/Routing/Router';

export function withRouting(Component: typeof Block<any>) {
  type Props = typeof Component extends typeof Block<infer P extends Record<string, any>> ? P : any;

  return class withRouting extends Component {
    constructor(props: Props & PropsWithRouter) {
      super({ ...props, router: Router });
    }
  };
}

export interface PropsWithRouter {
  router: typeof Router;
}
