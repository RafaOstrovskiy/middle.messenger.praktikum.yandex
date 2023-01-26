import tpl from './chat-list-item.hbs';
import './chat-list-item.scss';

export default function (props = {}) {
  return tpl({
    ...props,
  });
}
