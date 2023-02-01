import tpl from './signIn.hbs';
import { Button } from '../../components/button';

import './signIn.scss';
import Block from '../../core/block';

export class SignInPage extends Block {
  constructor(props: any) {
    super(props, 'div');
  }

  init() {
    this.children.button = new Button({
      text: 'Bxод',
      events: {
        click: () => console.log('clicked'),
      },
    });
  }

  render() {
    // return tpl({ button: button.getContent()?.outerHTML })
    return this.compile(tpl, this.props);
  }
}

export const signInPage = new SignInPage({});
