import tpl from './profile.hbs';
import './profile.scss';
import Block, { Props } from '../../core/block';
import { Avatar } from '../../components/avatar/avatar';
import { Button } from '../../components/button';
import { withStore } from '../../core/store';
import { authService } from '../../services';
import {Link} from "../../components/link";
import router from "../../core/Routing/router";

export class ProfilePage extends Block<Props> {
  constructor(props: Props) {
    props.className = [...(props.className || []), 'profile__container'];
    super(
      {
        ...props,
        avatar: new Avatar({}),
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
          editProfileLink: new Link({
              label: 'Изменить данные',
              to: '/settings'
          }),
          editPasswordLink: new Link({
              label: 'Изменить пароль',
              to: '/password-update'
          }),
          backButton: new Button({ type: 'button', className: ['arrowLeftButton'], events: {
                  click: (e) => {
                      e?.preventDefault()
                      router.go('/messenger')
                  },
              }
          })
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
