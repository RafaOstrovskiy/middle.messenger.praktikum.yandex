import tpl from './avatar.hbs';
import './avatar.scss';
import avatarPlaceholder from '../../../static/avatar-placeholder.png';

export default function (props = {}) {
  return tpl({
    ...props,
    avatarPlaceholder,
  });
}
