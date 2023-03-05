import tpl from './chat-list.hbs';
import './chat-list.scss';
import {ChatListItem} from '../chat-list-item/chat-list-item';
import arrowRight from '../../../static/arrow-right.svg';
import Block, { Props } from '../../core/block';
import {Button} from "../button";
import {ModalService} from "../../services/modal.service";
import {onAddChat} from "../../utils/addChat";
import {ChatsResponse} from "../../api/api.types";
import {withStore} from "../../core/Store";
import ChatsService from "../../services/chats.service";

export type ChatListProps = Props & {
  chatsList: ChatsResponse[];
  isLoaded: boolean;
}

export class ChatListBase extends Block<ChatListProps> {
  modalService: ModalService = ModalService.getInstance();

  constructor(props: ChatListProps) {
    props.className = [...(props.className || []), 'chat-aside__container'];
    super(
      {
        ...props,
        arrowRight,
        button: new Button({
           text: "Создать чат", type: "button", events: {
            click: () => {
              this.modalService.openModal(
                  onAddChat(() => this.modalService.closeModal())
              )
            },
          }, className: ["add-chat-button"]
        })
      },
      'div',
    );
  }

  protected init() {
    this.children.chats = this.createChatList(this.props);
  }

  protected componentDidUpdate(oldProps: ChatListProps, newProps: ChatListProps): boolean {
    this.children.chats = this.createChatList(newProps);

    return true;
  }

  private createChatList(props: ChatListProps) {
    return props.chats.map((data: any) => {
      return new ChatListItem({
        ...data,
        events: {
          click: () => {
            ChatsService.selectChat(data.id);
          }
        }
      });
    })
  }

  render() {
    return this.compile(tpl, this.props);
  }
}

const withChats = withStore((state) => ({chats: [...(state.chats || [])]}));

export const ChatList = withChats(ChatListBase);