import tpl from './button.hbs';
import './button.scss';
import Block, { Props } from '../../core/block';

export type ButtonProps = {
  text?: string;
  type?: 'button' | 'submit';
  src?: string;
} & Props;

export class Button extends Block<ButtonProps> {
  constructor(props: ButtonProps) {
    props.className = [...(props.className || []), 'button'];
    super(props, 'button');
  }

  _addAttributes(): void {
    super._addAttributes();
    this.element.setAttribute('type', this.props.type || 'button');
    this.element.setAttribute('src', this.props.src || 'button');
  }

  render() {
    return this.compile(tpl, this.props);
  }
}
