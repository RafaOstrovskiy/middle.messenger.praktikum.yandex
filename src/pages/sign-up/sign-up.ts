import './signUp.scss';
import tpl from './signUp.hbs';
import Block, { Props } from '../../core/block';
import { Form } from '../../components/form';
import { FormInput } from '../../components/form-input';
import { Button } from '../../components/button';

export type SignUpProps = Props & {
  form?: Form;
};

export class SignUpPage extends Block<SignUpProps> {
  constructor(props: SignUpProps) {
    props.className = [...(props.className || []), 'sign-up-page__container'];
    super(props, 'div');
  }

  render() {
    return this.compile(tpl, this.props);
  }
}

export const signUpPage = new SignUpPage({
  form: new Form({
    inputs: [
      new FormInput({
        label: 'Почта',
        name: 'email',
        type: 'text',
        idForLabel: 'email',
        id: 'email',
        className: ['sign-up-page__input'],
      }),
      new FormInput({
        label: 'Логин',
        name: 'login',
        type: 'text',
        idForLabel: 'login',
        id: 'login',
        className: ['sign-up-page__input'],
      }),
      new FormInput({
        label: 'Имя',
        name: 'first_name',
        type: 'text',
        idForLabel: 'first_name',
        id: 'first_name',
        className: ['sign-up-page__input'],
      }),
      new FormInput({
        label: 'Фамилия',
        name: 'second_name',
        type: 'text',
        idForLabel: 'second_name',
        id: 'second_name',
        className: ['sign-up-page__input'],
      }),
      new FormInput({
        label: 'Пароль',
        name: 'password',
        type: 'password',
        idForLabel: 'password',
        id: 'password',
        className: ['sign-up-page__input'],
      }),
      new FormInput({
        label: 'Пароль (еще раз)',
        name: 'confirm_password',
        type: 'password',
        idForLabel: 'confirm_password',
        id: 'confirm_password',
        className: ['sign-up-page__input'],
      }),
      new FormInput({
        label: 'Телефон',
        name: 'phone',
        type: 'tel',
        idForLabel: 'phone',
        id: 'phone',
        className: ['sign-up-page__input'],
      }),
    ],
    button: new Button({ text: 'Зарегистрироваться', type: 'submit' }),
    className: ['sign-up-page__form'],
    name: 'Sign up Form',
  }),
});
