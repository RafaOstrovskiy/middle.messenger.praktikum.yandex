import Block, { Props } from '../../core/block';
import tpl from './avatar.hbs';
import './avatar.scss';
import avatarPlaceholder from '../../../static/avatar-placeholder.png';
import {Form} from "../form";
import {FormInput} from "../form-input";
import {userService} from "../../services/user.service";
import {withStore} from "../../core/Store";
import {ChatBoxProps} from "../chat-box";

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
            // eslint-disable-next-line max-len
            inputs: [new FormInput({name: "avatar", label: "Поменять аватар", idForLabel: 'avatar', type: 'file', onChange: this.onChangeAvatar})],
        })
    }


    onChangeAvatar(event: InputEvent): void {
        console.log(424234234)
        const target = event.target as HTMLInputElement;
        console.log(target.files, 4444)
        if (!target || !target.files?.length) {
            return;
        }

        const form = document.querySelector('.avatarForm') as HTMLFormElement;
        console.log(form)
        if (!form) {
            return;
        }

        const formData = new FormData();
        // const formData = new FormData();
        formData.append(target.name, target.files[0]);
        console.log(formData, 454)
        formData.forEach(el => console.log(el, 33))
        userService.updateAvatar(formData)
    }

    // protected componentDidUpdate(_oldProps: any, newProps: any): boolean {
    //     this.props.avatarSrc = newProps.avatarSrc
    //
    //     return true;
    // }
  render() {
    return this.compile(tpl, this.props);
  }
}

const withUser = withStore((state) => {
    let hasAvatar: boolean = false;
    let path: string = ''
    if (state.user && state.user.avatar) {
        hasAvatar = true
        path = `https://ya-praktikum.tech/api/v2/resources${state.user?.avatar}`
    } else  {
        hasAvatar = false
        path = ''
    }
    return {
        ...state.user,
        hasAvatar: hasAvatar,
        avatarSrc: path
    }})

export const Avatar = withUser(AvatarBase);