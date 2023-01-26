import tpl from './button.hbs';
import './button.scss';

interface IButton {
  type?: string;
  text?: string;
}

export default function (props: IButton = {}) {
  if (!props.type) {
    props.type = 'button';
  }
  return tpl({
    ...props,
  });
}
