import tpl from './chats.hbs';
import './chats.scss';
import { ChatList } from '../../components/chat-list/chat-list';
import { ChatBox } from '../../components/chat-box/chat-box';
import Block, { Props } from '../../core/block';
import { chatsService } from '../../services';

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
    chatsService
      .fetchChats()
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        (this.children.chatList as Block).setProps({
          isLoaded: true,
        });
      });
    return this.compile(tpl, this.props);
  }
}

export const chatsPage = new Chats({
  chatList: new ChatList({ isLoaded: false }),
  chatBox: new ChatBox({}),
});
