import tpl from './message.hbs';
import './message.scss';
import Block, { Props } from '../../core/block';

export class MessageComponent extends Block<MessageModel> {
  constructor(props: MessageModel) {
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
export type MessageModel = Props & {
  time: string;
  text: string;
  isMine: boolean;
};

export function messagesMap(messages: MessageModel[]): MessageComponent[] {
  return messages.map(
    (data) =>
      new MessageComponent({
        isMine: data.isMine,
        text: data.text,
        time: data.time,
      }),
  );
}
