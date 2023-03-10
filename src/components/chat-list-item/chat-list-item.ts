import tpl from './chat-list-item.hbs';
import './chat-list-item.scss';
import Block, { Props } from '../../core/block';

export default function (props = {}) {
  return tpl({
    ...props,
  });
}

export class ChatListItem extends Block<Props> {
  constructor(props: Props) {
    props.className = [...(props.className || []), 'chat-list-item'];
    super(
      {
        ...props,
      },
      'div',
    );
  }

  render() {
    return this.compile(tpl, this.props);
  }
}
