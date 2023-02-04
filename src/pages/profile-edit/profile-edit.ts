import tpl from './profileEdit.hbs';
import './profileEdit.scss';
import arrowLeft from '../../../static/rounded-arrow-left.svg';
import { Button } from '../../components/button';
import Block, { Props } from '../../core/block';
import { Avatar } from '../../components/avatar/avatar';
import { SignUpProps } from '../sign-up';
import { Form } from '../../components/form';
import { FormInput } from '../../components/form-input';

export class ProfileEditPage extends Block<SignUpProps> {
  constructor(props: Props) {
    props.className = [...(props.className || []), 'profile-edit__container'];
    super(
      {
        ...props,
        avatar: new Avatar({}),
        arrowLeft,
        form: props.form,
      },
      'nav',
    );
  }

  render() {
    return this.compile(tpl, this.props);
  }
}

export const profileEditPage = new ProfileEditPage({
  form: new Form({
    inputs: [
      new FormInput({
        label: 'Почта',
        name: 'email',
        type: 'text',
        idForLabel: 'email',
        id: 'email',
        value: 'pochta@yandex.ru',
        className: ['profile-edit__list-item'],
      }),
      new FormInput({
        label: 'Логин',
        name: 'login',
        type: 'text',
        idForLabel: 'login',
        id: 'login',
        value: 'ivanivanov',
        className: ['profile-edit__list-item'],
      }),
      new FormInput({
        label: 'Имя',
        name: 'first_name',
        type: 'text',
        idForLabel: 'first_name',
        id: 'first_name',
        value: 'Иван',
        className: ['profile-edit__list-item'],
      }),
      new FormInput({
        label: 'Фамилия',
        name: 'second_name',
        type: 'text',
        idForLabel: 'second_name',
        id: 'second_name',
        value: 'Иванов',
        className: ['profile-edit__list-item'],
      }),
      new FormInput({
        label: 'Имя в чате',
        name: 'display_name',
        type: 'text',
        idForLabel: 'display_name',
        id: 'display_name',
        value: 'Иванов',
        className: ['profile-edit__list-item'],
      }),
      new FormInput({
        label: 'Телефон',
        name: 'phone',
        type: 'tel',
        idForLabel: 'phone',
        id: 'phone',
        value: '+79777777777',
        className: ['profile-edit__list-item'],
      }),
    ],
    button: new Button({ text: 'Сохранить', type: 'submit' }),
    className: ['profile-edit__form'],
    name: 'Profile edit Form',
  }),
});

// <ul class="profile-edit__info-list">
// <li class="profile-edit__list-item">
//   <label for="email">Почта</label>
//   <input id="email" type="email" name="email" value="pochta@yandex.ru">
//   </li>
//   <li class="profile-edit__list-item">
//   <label for="login">Логин</label>
//   <input id="login" type="text" name="login" value="ivanivanov">
//   </li>
//   <li class="profile-edit__list-item">
//   <label for="first_name">Имя</label>
//   <input id="first_name" type="text" name="first_name" value="Иван">
//   </li>
//   <li class="profile-edit__list-item">
//   <label for="second_name">Фамилия</label>
//   <input id="second_name" type="text" name="second_name" value="Иванов">
//   </li>
//   <li class="profile-edit__list-item">
//   <label for="display_name">Имя в чате</label>
// <input id="display_name" type="text" name="display_name" value="Иванов">
//   </li>
//   <li class="profile-edit__list-item">
//   <label for="phone">Телефон</label>
//   <input id="phone" type="tel" name="phone" value="+7 (909) 967 30 30">
//   </li>
//   </ul>
