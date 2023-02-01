import './signUp.scss';
import tpl from './signUp.hbs';
import { Button } from '../../components/button';
import Block from '../../core/block';

export class SignUpPage extends Block {
  constructor(props: any) {
    super(props, 'div');
  }

  init() {
    this.children.button = new Button({
      type: 'submit',
      text: 'Зарегистрироваться',
      events: {
        click: () => console.log('clicssked'),
      },
    });
  }

  render() {
    // return tpl({ button: button.getContent()?.outerHTML })
    return this.compile(tpl, this.props);
  }
}

export const signUpPage = new SignUpPage({});
