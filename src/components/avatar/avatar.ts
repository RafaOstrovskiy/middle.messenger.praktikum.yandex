import Block, { Props } from '../../core/block';
import tpl from './avatar.hbs';
import './avatar.scss';
import avatarPlaceholder from '../../../static/avatar-placeholder.png';

export class Avatar extends Block<Props> {
  constructor(props: Props) {
    props.className = [...(props.className || []), 'avatar-component'];
    super(
      {
        ...props,
        avatarPlaceholder,
      },
      'div',
    );
  }

  render() {
    return this.compile(tpl, this.props);
  }
}
