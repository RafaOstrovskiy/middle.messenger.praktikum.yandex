import tpl from './button.hbs';
import './button.scss';
import Block from '../../core1/block';

interface IButton {
  type?: string;
  text?: string;
  events?: {
    click: () => void;
  }
}

// export default function (props: IButton = {}) {
//   if (!props.type) {
//     props.type = 'button';
//   }
//   return tpl({
//     ...props,
//   });
// }

export class Button extends Block {
  constructor(props: IButton) {
    super('button', props);
  }

  render() {
    // return tpl({ text: this.props.text })
    return this.compile(tpl, {text: this.props.text })
  }
}
