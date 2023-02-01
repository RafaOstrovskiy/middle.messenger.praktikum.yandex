import tpl from './chat-box.hbs';
import './chat-box.scss';
import dropdownImg from '../../../static/dropdown-3dots.svg';
import attachImg from '../../../static/share.svg';
import sendImg from '../../../static/rounded-arrow-right.svg';
import Block, { Props } from '../../core/block';
import { MessageComponent } from '../message';

export type ChatBoxProps = Props & {
  messages: MessageComponent[];
};

export class ChatBox extends Block<ChatBoxProps> {
  constructor(props: ChatBoxProps) {
    console.log(props.messages);
    super({
      ...props,
      dropdownImg,
      attachImg,
      sendImg,
    });
  }

  render() {
    return this.compile(tpl, this.props);
  }
}
