import tpl from './chat-list.hbs';
import './chat-list.scss';
import { chatListItemMap } from '../chat-list-item/chat-list-item';
import arrowRight from '../../../static/arrow-right.svg';
import Block, { Props } from '../../core/block';

const mockChats = [
  {
    id: 123,
    title: 'my-chat',
    avatar: '/123/avatar1.jpg',
    unread_count: 15,
    last_message: {
      user: {
        first_name: 'Petya',
        second_name: 'Pupkin',
        avatar: '/path/to/avatar.jpg',
        email: 'my@email.com',
        login: 'Petya',
        phone: '8(911)-222-33-22',
      },
      time: '23:10',
      content: 'this is message content',
    },
  },
  {
    id: 1324,
    title: 'my-chatqq',
    avatar: '/123/avatar1.jpg',
    unread_count: 0,
    last_message: {
      user: {
        first_name: 'Vasya',
        second_name: 'Pupkin',
        avatar: '/path/to/avatar.jpg',
        email: 'my@email.com',
        login: 'Vasya',
        phone: '8(911)-222-33-22',
      },
      time: '22:00',
      content: 'Hi',
    },
  },
  {
    id: 235235,
    title: 'my-chatqq',
    avatar: '/123/avatar1.jpg',
    unread_count: 0,
    last_message: {
      user: {
        first_name: 'Sasha',
        second_name: 'Pupkin',
        avatar: '/path/to/avatar.jpg',
        email: 'my@email.com',
        login: 'Sasha',
        phone: '8(911)-222-33-22',
      },
      time: '12:00',
      content:
        'China said on Saturday that it had recorded nearly 60,000 fatalities linked to the coronavirus in the month since the country',
    },
  },
  {
    id: 235235,
    title: 'my-chatqq',
    avatar: '/123/avatar1.jpg',
    unread_count: 4,
    last_message: {
      user: {
        first_name: 'Katya',
        second_name: 'Pupkina',
        avatar: '/path/to/avatar.jpg',
        email: 'my@email.com',
        login: 'Katya',
        phone: '8(911)-222-33-22',
      },
      time: 'пн',
      content:
        'The unexpected disclosure was made as the country faces mounting criticism for providing unreliable data on its latest coronavirus outbreak.',
    },
  },
];

export default function (props = {}) {
  return tpl({
    ...props,
    chats: chatListItemMap(mockChats),
    arrowRight,
  });
}

export class ChatList extends Block<Props> {
  constructor(props: Props) {
    props.className = [...(props.className || []), 'chat-aside__container'];
    super(
      {
        ...props,
        chats: chatListItemMap(mockChats),
        arrowRight,
      },
      'div',
    );
  }

  render() {
    return this.compile(tpl, this.props);
  }
}
