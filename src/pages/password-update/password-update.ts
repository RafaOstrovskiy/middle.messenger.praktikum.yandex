import tpl from './passwordUpdate.hbs';
import './passwordUpdate.scss';
import arrowLeft from '../../../static/rounded-arrow-left.svg';
import { Button } from '../../components/button';
import { Avatar } from '../../components/avatar/avatar';
import Block, { Props } from '../../core/block';
import { Form } from '../../components/form';
import { FormInput } from '../../components/form-input';
import {userService} from "../../services/user.service";

export class UpdatePasswordPage extends Block<Props> {
  constructor(props: Props) {
    props.className = [...(props.className || []), 'password-update__container'];
    super(
      {
        ...props,
        avatar: new Avatar({}),
        arrowLeft,
      },
      'nav',
    );
  }

  render() {
    return this.compile(tpl, this.props);
  }
}
export const updatePasswordPage = new UpdatePasswordPage({
  form: new Form({
    inputs: [
      new FormInput({
        label: 'Старый пароль',
        name: 'oldPassword',
        type: 'password',
        idForLabel: 'oldPassword',
        id: 'oldPassword',
        className: ['password-update__list-item'],
      }),
      new FormInput({
        label: 'Новый пароль',
        name: 'newPassword',
        type: 'password',
        idForLabel: 'newPassword',
        id: 'newPassword',
        className: ['password-update__list-item'],
      }),
      new FormInput({
        label: 'Повторите новый пароль',
        name: 'newPasswordConfirm',
        type: 'password',
        idForLabel: 'newPasswordConfirm',
        id: 'newPasswordConfirm',
        className: ['password-update__list-item'],
      }),
    ],
    button: new Button({ text: 'Сохранить', type: 'submit' }),
    className: ['password-update__form'],
    name: 'Profile edit Form',
    handler: userService.updatePassword
  }),
});

// <form action="#" class="password-update__form">
// <ul class="password-update__info-list">
// <li class="password-update__list-item">
//   <label for="oldPassword">Старый пароль</label>
// <input id="oldPassword" type="password" name="oldPassword">
//   </li>
//   <li class="password-update__list-item">
//   <label for="newPassword">Новый пароль</label>
// <input id="newPassword" type="password" name="newPassword">
//   </li>
//   <li class="password-update__list-item">
//   <label for="newPasswordConfirm">Повторите новый пароль</label>
// <input id="newPasswordConfirm" type="password" name="newPasswordConfirm">
//   </li>
//   </ul>
//
// {{{ button }}}
//
// </form>
