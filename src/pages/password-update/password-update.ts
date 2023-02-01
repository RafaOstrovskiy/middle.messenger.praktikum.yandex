import tpl from './passwordUpdate.hbs';
import './passwordUpdate.scss';
import arrowLeft from '../../../static/rounded-arrow-left.svg';
import { Button } from '../../components/button';
import { Avatar } from '../../components/avatar/avatar';
import Block, { Props } from '../../core/block';

export class UpdatePasswordPage extends Block<Props> {
  constructor(props: Props) {
    props.className = [...(props.className || []), 'password-update__container'];
    super(
      {
        ...props,
        button: new Button({ type: 'submit', text: 'Сохранить' }),
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
export const updatePasswordPage = new UpdatePasswordPage({});
