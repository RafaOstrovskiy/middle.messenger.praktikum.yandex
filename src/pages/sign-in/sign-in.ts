import tpl from './signIn.hbs';
import './signIn.scss';
import Block from '../../core/block';
import { SignUpProps } from '../sign-up';
import { Form } from '../../components/form';
import { FormInput } from '../../components/form-input';
import { Button } from '../../components/button';

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
});

// <form class='sign-in-page__form'>
// <div class='sign-in-page__input'>
//   <label for='login'>Логин</label>
//   <input type='text' id='login'  name='login' placeholder='' />
//   </div>
//
//   <div class='sign-in-page__input'>
//   <label for='password'>Пароль</label>
//   <input  type='password' id='password' name='password' placeholder='' />
//   </div>
