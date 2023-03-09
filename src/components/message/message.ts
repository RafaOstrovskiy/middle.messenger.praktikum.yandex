import tpl from './message.hbs';
import './message.scss';
import Block, { Props } from '../../core/block';

export type MessageProps = Props & {
    content: string;
    isMine: boolean;
    time: string;
}

export class MessageComponent extends Block<MessageProps> {
  constructor(props: MessageProps) {
    props.className = ['message__container'];
    if (props.isMine) {
      props.className.push('message__container_mine');
    }
    super(props, 'div');
  }

  render() {
    return this.compile(tpl, this.props);
  }
}

