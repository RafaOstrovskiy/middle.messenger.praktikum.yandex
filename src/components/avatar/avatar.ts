import Block, { Props } from '../../core/block';
import tpl from './avatar.hbs';
import './avatar.scss';
import avatarPlaceholder from '../../../static/avatar-placeholder.png';
import { Form } from '../form';
import { FormInput } from '../form-input';
import { userService } from '../../services/user.service';
import { withStore } from '../../core/store';

class AvatarBase extends Block<Props> {
  constructor(props: Props) {
    props.className = [...(props.className || []), 'avatar-component'];
    super(
      {
        ...props,
        avatarPlaceholder,
      },
      'div',
    );
  }

  protected init() {
    this.children.form = new Form({
      className: ['avatarForm'],
      inputs: [
        new FormInput({
          name: 'avatar',
          label: 'Поменять аватар',
          idForLabel: 'avatar',
          type: 'file',
          onChange: this.onChangeAvatar,
        }),
      ],
    });
  }

  onChangeAvatar(event: InputEvent): void {
    const target = event.target as HTMLInputElement;
    if (!target || !target.files?.length) {
      return;
    }

    const form = document.querySelector('.avatarForm') as HTMLFormElement;
    if (!form) {
      return;
    }

    const formData = new FormData();
    formData.append(target.name, target.files[0]);
    userService.updateAvatar(formData);
  }

  render() {
    return this.compile(tpl, this.props);
  }
}

const withUser = withStore((state) => {
  let hasAvatar: boolean = false;
  let path: string = '';
  if (state.user && state.user.avatar) {
    hasAvatar = true;
    path = `https://ya-praktikum.tech/api/v2/resources${state.user?.avatar}`;
  } else {
    hasAvatar = false;
    path = '';
  }
  return {
    ...state.user,
    hasAvatar: hasAvatar,
    avatarSrc: path,
  };
});

export const Avatar = withUser(AvatarBase);
