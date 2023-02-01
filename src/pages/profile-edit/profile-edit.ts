import tpl from './profileEdit.hbs';
import './profileEdit.scss';
import arrowLeft from '../../../static/rounded-arrow-left.svg';
import { Button } from '../../components/button';
import Block, { Props } from '../../core/block';
import { Avatar } from '../../components/avatar/avatar';

export class ProfileEditPage extends Block<Props> {
  constructor(props: Props) {
    props.className = [...(props.className || []), 'profile-edit__container'];
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

export const profileEditPage = new ProfileEditPage({});
