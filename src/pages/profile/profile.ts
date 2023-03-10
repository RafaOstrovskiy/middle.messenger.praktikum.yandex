import tpl from './profile.hbs';
import './profile.scss';
import arrowLeft from '../../../static/rounded-arrow-left.svg';
import Block, { Props } from '../../core/block';
import { Avatar } from '../../components/avatar/avatar';
import { Button } from '../../components/button';
import { withStore } from '../../core/Store';
import { authService } from '../../services';

export class ProfilePage extends Block<Props> {
  constructor(props: Props) {
    props.className = [...(props.className || []), 'profile__container'];
    super(
      {
        ...props,
        avatar: new Avatar({}),
        arrowLeft,
        logoutBtn: new Button({
          text: 'Выйти',
          className: ['link', 'red'],
          events: {
            click: (e) => {
              e?.preventDefault();
              authService.logout();
            },
          },
        }),
      },
      'nav',
    );
  }

  render() {
    return this.compile(tpl, this.props);
  }
}

const withUser = withStore((state) => ({ ...state.user }));

const ProfilePageWithUserStore = withUser(ProfilePage);

export const profilePage = new ProfilePageWithUserStore({});
