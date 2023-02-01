import tpl from './chat-list-item.hbs';
import './chat-list-item.scss';
import Block, { Props } from '../../core/block';
import { MessageComponent, MessageModel } from '../message/message';

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

export type chatListItemModel = {
  id: number;
  title: string;
  avatar: string;
  unread_count: number;
  last_message: {
    user: {
      first_name: string;
      second_name: string;
      avatar: string;
      email: string;
      login: string;
      phone: string;
    };
    time: string;
    content: string;
  };
};

export function chatListItemMap(messages: chatListItemModel[]): ChatListItem[] {
  return messages.map(
    (data) =>
      new ChatListItem({
        login: data.last_message.user.login,
        content: data.last_message.content,
        time: data.last_message.time,
        unread_count: data.unread_count,
      }),
  );
}
