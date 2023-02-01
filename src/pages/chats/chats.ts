import tpl from './chats.hbs';
import './chats.scss';
import { ChatList } from '../../components/chat-list/chat-list';
import { ChatBox } from '../../components/chat-box/chat-box';
import Block, { Props } from '../../core/block';
import { MessageModel, messagesMap } from '../../components/message';

const mockChatHistory = [
  {
    user: {
      first_name: 'Sasha',
      second_name: 'Pupkin',
      avatar: '/path/to/avatar.jpg',
      email: 'my@email.com',
      login: 'Sasha',
      phone: '8(911)-222-33-22',
    },
    time: '12:00',
    text: 'Until Saturday, China had reported a total of just 5,241 Covid deaths since the pandemic began in the city of Wuhan in late 2019. That measure was narrowly defined as deaths from pneumonia or respiratory failure caused by Covid. The new figure released Saturday included those who had Covid, but also died from other underlying illnesses.',
    isMine: false,
  },
  {
    user: {
      first_name: 'Sasha',
      second_name: 'Pupkin',
      avatar: '/path/to/avatar.jpg',
      email: 'my@email.com',
      login: 'Sasha',
      phone: '8(911)-222-33-22',
    },
    time: '12:40',
    text: 'China has faced mounting criticism from other countries and from the World Health Organization for not providing reliable data about the extent of its Covid',
    isMine: true,
  },
  {
    user: {
      first_name: 'Sasha',
      second_name: 'Pupkin',
      avatar: '/path/to/avatar.jpg',
      email: 'my@email.com',
      login: 'Sasha',
      phone: '8(911)-222-33-22',
    },
    time: '13:00',
    text: 'Yes.',
    isMine: false,
  },
];

export class Chats extends Block<Props> {
  constructor(props: Props) {
    props.className = [...(props.className || []), 'chats-page'];
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

console.log(messagesMap(mockChatHistory as MessageModel[]), 555);

export const chatsPage = new Chats({
  chatList: new ChatList({}),
  chatBox: new ChatBox({
    messages: messagesMap(mockChatHistory as MessageModel[]),
  }),
});
