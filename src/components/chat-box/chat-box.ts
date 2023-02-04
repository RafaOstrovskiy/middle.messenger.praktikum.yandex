import tpl from './chat-box.hbs';
import './chat-box.scss';
import dropdownImg from '../../../static/dropdown-3dots.svg';
import attachImg from '../../../static/share.svg';
import Block, { Props } from '../../core/block';
import { MessageComponent } from '../message';
import { Form } from '../form';
import { FormInput } from '../form-input';
import { Button } from '../button';

export type ChatBoxProps = Props & {
  messages: MessageComponent[];
};

export class ChatBox extends Block<ChatBoxProps> {
  constructor(props: ChatBoxProps) {
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
      }),
    });
  }

  render() {
    return this.compile(tpl, this.props);
  }
}

// <form class="chat-box__form" action="#">
// <input class="chat-box__input" type="text" name="message" placeholder="Сообщение">
// <button type="submit" class="chat-box__send">
// <img src='{{ sendImg }}' alt='arrow right'>
//   </button>
//   </form>
