import tpl from './layout.hbs';
import './layout.scss';
import Block, { Props } from '../../core/block';

export type LayoutProps = Props & {
  page: Block<any>;
};

export class BaseLayout extends Block<LayoutProps> {
  constructor(props: LayoutProps) {
    props.className = ['container'];
    super(props);
  }

  render() {
    return this.compile(tpl, this.props);
  }
}
