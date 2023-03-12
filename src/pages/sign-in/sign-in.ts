import tpl from './signIn.hbs';
import './signIn.scss';
import Block from '../../core/block';
import { SignUpProps } from '../sign-up';
import { Form } from '../../components/form';
import { FormInput } from '../../components/form-input';
import { Button } from '../../components/button';
import {Link} from "../../components/link";

export class SignInPage extends Block<SignUpProps> {
  constructor(props: SignUpProps) {
    props.className = [...(props.className || []), 'sign-in-page__container'];
    super(props, 'div');
  }

  render() {
    return this.compile(tpl, this.props);
  }
}

export const signInPage = new SignInPage({
  form: new Form({
    inputs: [
      new FormInput({
        label: 'Логин',
        name: 'login',
        type: 'text',
        idForLabel: 'login',
        id: 'login',
        className: ['sign-in-page__input'],
      }),
      new FormInput({
        label: 'Пароль',
        name: 'password',
        type: 'password',
        idForLabel: 'password',
        id: 'password',
        className: ['sign-in-page__input'],
      }),
    ],
    button: new Button({ text: 'Вход', type: 'submit' }),
    className: ['sign-in-page__form'],
    name: 'Sign In Form',
  }),
  link: new Link({
    label: 'Нет аккаунта?',
    to: '/sign-up'
  })
});
