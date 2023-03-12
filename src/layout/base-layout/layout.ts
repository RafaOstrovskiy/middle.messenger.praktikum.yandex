import tpl from './layout.hbs';
import './layout.scss';
import Block, { Props } from '../../core/block';
import { ModalService } from '../../services/modal.service';

export type LayoutProps = Props & {
  page?: Block<any>;
};

export class BaseLayout extends Block<LayoutProps> {
  constructor(props: LayoutProps) {
    props.className = ['container'];
    super({
      ...props,
      overlay: ModalService.init().modalRef,
    });
  }

  render() {
    return this.compile(tpl, this.props);
  }
}
