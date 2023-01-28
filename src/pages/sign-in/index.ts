import tpl from './signIn.hbs';
import { Button } from '../../components/button';

import './signIn.scss';
import Block from '../../core1/block';
//
// export default function (props = {}) {
//   return tpl({
//     ...props,
//     button: button({ type: 'submit', text: 'Войти' }),
//   });
// }

interface ISignInButton {
  button: Button
}

export class SignInPage extends Block {
  constructor(props: ISignInButton) {
    super('div', props);
  }

  render() {
    const button = new Button({
      text: "Войти",
      events: {
        click: () => console.log('clicked')
      }
    })
    // return tpl({ button: button.getContent()?.outerHTML })
    return this.compile(tpl, { button: this.props.button})
  }

}
