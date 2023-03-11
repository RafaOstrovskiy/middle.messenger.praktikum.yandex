import tpl from './chat-box.hbs';
import './chat-box.scss';
import dropdownImg from '../../../static/dropdown-3dots.svg';
import attachImg from '../../../static/share.svg';
import Block, { Props } from '../../core/block';
import { Form } from '../form';
import { FormInput } from '../form-input';
import { Button } from '../button';
import { Dropdown } from '../dropdown';
import { DropdownMenu } from '../dropdown-menu';
import { DropdownMenuItem } from '../dropdown-menu-item';
import { withStore } from '../../core/store';
import { ChatMessage } from '../../api/api.types';
import { MessageComponent } from '../message';
import MessageService from '../../services/message.service';
import { ModalService } from '../../services/modal.service';
import { chatsService } from '../../services/chats.service';

export type ChatBoxProps = Props & {
  selectedChat: number | undefined;
  messages: ChatMessage[];
  userId: number;
};

export class ChatBoxBase extends Block<ChatBoxProps> {
  modalService: ModalService = ModalService.init();

  constructor(props: ChatBoxProps) {
    props.className = ['chat-box__container'];
    // @ts-ignore
    super({
      ...props,
      dropdownImg,
      attachImg,
      form: new Form({
        inputs: [
          new FormInput({
            name: 'message',
            type: 'text',
            id: 'message',
            placeholder: 'Сообщение',
            className: ['chat-box__input'],
          }),
        ],
        button: new Button({ type: 'submit', className: ['chat-box__send'] }),
        className: ['chat-box__form'],
        name: 'Chat box Form',
        handler: (data: { message: string }) => {
          MessageService.sendMessage(this.props.selectedChat!, data.message);
        },
      }),
      menu: new Dropdown({
        btn: new Button({ className: ['button__icon'] }),
        menu: new DropdownMenu({
          items: [
            new DropdownMenuItem({
              type: 'add',
              title: 'Добавить пользователя',
              events: {
                click: () => {
                  this.children.menu.children.menu.hide();
                  this.modalService.openModal({
                    title: 'Добавить пользователя в чат',
                    content: new Form({
                      inputs: [new FormInput({ name: 'userId', label: 'ID пользователя' })],
                      button: new Button({ text: 'Добавиssть', type: 'submit' }),
                      handler: (data: { userId: number }) => {
                        chatsService.addUserToChat(this.props.selectedChat!, data.userId);
                        this.modalService.closeModal();
                      },
                    }),
                  });
                },
              },
            }),
            new DropdownMenuItem({
              type: 'remove',
              title: 'Удалить пользователя',
              events: {
                click: () => {
                  this.children.menu.children.menu.hide();
                  this.modalService.openModal({
                    title: 'Удалить пользователя из чата',
                    content: new Form({
                      inputs: [new FormInput({ name: 'userId', label: 'ID пользователя' })],
                      button: new Button({ text: 'Добавить', type: 'submit' }),
                      handler: (data: { userId: number }) => {
                        chatsService.removeUserFromChat(this.props.selectedChat!, data.userId);
                        this.modalService.closeModal();
                      },
                    }),
                  });
                },
              },
            }),
            new DropdownMenuItem({
              type: 'delete',
              title: 'Удалить чат',
              events: {
                click: () => {
                  this.children.menu.children.menu.hide();
                  this.modalService.openModal({
                    title: 'Вы уверены что хотите удалить чат?',
                    content: new Button({
                      text: 'Да, удалить!',
                      type: 'submit',
                      events: {
                        click: () => {
                          console.log(this.props.selectedChat);
                          chatsService.delete(this.props.selectedChat!);

                          this.modalService.closeModal();
                        },
                      },
                    }),
                  });
                },
              },
            }),
          ],
          position: ['bottom', 'left'],
        }),
      }),
    });
  }

  protected init() {
    this.children.messages = this.createMessages(this.props);
  }

  protected componentDidUpdate(_oldProps: ChatBoxProps, newProps: ChatBoxProps): boolean {
    this.children.messages = this.createMessages(newProps);

    return true;
  }

  private createMessages(props: ChatBoxProps) {
    return props.messages.map((data) => {
      return new MessageComponent({
        ...data,
        isMine: props.userId === data.user_id,
        time: new Date(data.time ?? '').toLocaleDateString(),
      });
    });
  }

  render() {
    return this.compile(tpl, this.props);
  }
}

const withSelectedChatMessages = withStore((state) => {
  const selectedChatId = state.selectedChat;
  let chatTitle,
    chatAvatar = '';

  if (!selectedChatId) {
    return {
      messages: [],
      selectedChat: undefined,
      userId: state.user?.id,
    };
  }
  // console.log(selectedChatId, state.chats)
  for (let chat of state.chats) {
    if (chat.id === selectedChatId) {
      chatTitle = chat.title;
      chatAvatar = chat.avatar;
      break;
    }
  }

  return {
    messages: (state.messages || {})[selectedChatId] || [],
    selectedChat: state.selectedChat,
    userId: state.user?.id,
    title: chatTitle,
    avatar: chatAvatar,
  };
});

export const ChatBox = withSelectedChatMessages(ChatBoxBase);
