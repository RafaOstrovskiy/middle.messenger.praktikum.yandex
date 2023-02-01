import tpl from './navigation.hbs';
import './navigation.scss';
import Block, { Props } from '../../core/block';

export class NavigationPage extends Block<Props> {
  constructor(props: Props) {
    props.className = [...(props.className || []), 'navigation-page__container'];
    super(
      {
        ...props,
      },
      'nav',
    );
  }

  render() {
    return this.compile(tpl, this.props);
  }
}
export const navigation = new NavigationPage({});
