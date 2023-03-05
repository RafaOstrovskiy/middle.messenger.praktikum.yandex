import tpl from './chat-box.hbs';
import './chat-box.scss';
import dropdownImg from '../../../static/dropdown-3dots.svg';
import attachImg from '../../../static/share.svg';
import Block, { Props } from '../../core/block';
import { Form } from '../form';
import { FormInput } from '../form-input';
import { Button } from '../button';
import {Dropdown} from "../dropdown";
import {DropdownMenu} from "../dropdown-menu";
import {DropdownMenuItem} from "../dropdown-menu-item";
import {withStore} from "../../core/Store";
import {ChatMessage} from "../../api/api.types";
import {MessageComponent} from "../message";
import MessageService from "../../services/message.service";

export type ChatBoxProps = Props & {
  selectedChat: number | undefined;
  messages: ChatMessage[];
  userId: number;
};

export class ChatBoxBase extends Block<ChatBoxProps> {
  constructor(props: ChatBoxProps) {
    props.className = ['chat-box__container'];
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
        handler: (data: {message: string;}) => {
          MessageService.sendMessage(this.props.selectedChat!, data.message);
        }
      }),
      menu: new Dropdown({
        btn: new Button({ className: ["button__icon"] }),
        menu: new DropdownMenu({
          items: [
            new DropdownMenuItem({
              type: "add",
              title: "Добавить пользователя",
              // events: {
              //   click: () =>
              //       this.modalService.openModal(
              //           onAddUser(() => this.modalService.closeModal())
              //       ),
              // },
            }),
            new DropdownMenuItem({
              type: "remove",
              title: "Удалить пользователя",
              // events: {
              //   click: () =>
              //       this.modalService.openModal(
              //           onDeleteUser(() => this.modalService.closeModal())
              //       ),
              // },
            }),
            new DropdownMenuItem({
              type: "delete",
              title: "Удалить чат",
              // events: {
              //   click: () =>
              //       this.modalService.openModal(
              //           onDeleteUser(() => this.modalService.closeModal())
              //       ),
              // },
            }),
          ],
          position: ["bottom", "left"],
        }),
      }),
    });
  }

  protected init() {
    this.children.messages = this.createMessages(this.props)
  }

  protected componentDidUpdate(oldProps: ChatBoxProps, newProps: ChatBoxProps): boolean {
    this.children.messages = this.createMessages(newProps);

    return true;
  }

  private createMessages(props: ChatBoxProps) {
    return props.messages.map(data => {
      return new MessageComponent({...data, isMine: props.userId === data.user_id });
    })
  }

  render() {
    return this.compile(tpl, this.props);
  }
}

const withSelectedChatMessages = withStore(state => {
  const selectedChatId = state.selectedChat;

  if (!selectedChatId) {
    return {
      messages: [],
      selectedChat: undefined,
      userId: state.user?.id
    };
  }

  return {
    messages: (state.messages || {})[selectedChatId] || [],
    selectedChat: state.selectedChat,
    userId: state.user?.id
  };
});

export const ChatBox = withSelectedChatMessages(ChatBoxBase);