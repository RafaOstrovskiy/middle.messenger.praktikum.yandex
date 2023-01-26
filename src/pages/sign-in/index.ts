import tpl from './signIn.hbs';
import button from '../../components/button';

import './signIn.scss';

export default function (props = {}) {
  return tpl({
    ...props,
    button: button({ type: 'submit', text: 'Войти' }),
  });
}
