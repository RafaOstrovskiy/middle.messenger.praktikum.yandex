import tpl from './profileEdit.hbs';
import './profileEdit.scss';
import arrowLeft from '../../../static/rounded-arrow-left.svg';
import {Button} from '../../components/button';
import Block, {Props} from '../../core/block';
import {Avatar} from '../../components/avatar/avatar';
import {SignUpProps} from '../sign-up';
import {withStore} from "../../core/Store";
import {FormInput} from "../../components/form-input";
import {Form} from "../../components/form";
import {UserResponse} from "../../api/api.types";
import {userService} from "../../services/user.service";


export class ProfileEditPage extends Block<SignUpProps> {
    constructor(props: Props) {
        props.className = [...(props.className || []), 'profile-edit__container'];
        super(
            {
                ...props,
                avatar: new Avatar({}),
                arrowLeft
            },
            'nav',
        );
    }

    render() {
        return this.compile(tpl, this.props);
    }
    protected componentDidUpdate(_oldProps: UserResponse, newProps: UserResponse): boolean {
        /**
         * Обновляем детей
         */


        this.children.form = new Form({
            inputs: [
                new FormInput({
                    label: 'Почта',
                    name: 'email',
                    type: 'text',
                    idForLabel: 'email',
                    id: 'email',
                    value: newProps.email,
                    className: ['profile-edit__list-item'],
                }),
                new FormInput({
                    label: 'Логин',
                    name: 'login',
                    type: 'text',
                    idForLabel: 'login',
                    id: 'login',
                    value: newProps.login,
                    className: ['profile-edit__list-item'],
                }),
                new FormInput({
                    label: 'Имя',
                    name: 'first_name',
                    type: 'text',
                    idForLabel: 'first_name',
                    id: 'first_name',
                    value: newProps.first_name,
                    className: ['profile-edit__list-item'],
                }),
                new FormInput({
                    label: 'Фамилия',
                    name: 'second_name',
                    type: 'text',
                    idForLabel: 'second_name',
                    id: 'second_name',
                    value: newProps.second_name,
                    className: ['profile-edit__list-item'],
                }),
                new FormInput({
                    label: 'Имя в чате',
                    name: 'display_name',
                    type: 'text',
                    idForLabel: 'display_name',
                    id: 'display_name',
                    value: newProps.display_name,
                    className: ['profile-edit__list-item'],
                }),
                new FormInput({
                    label: 'Телефон',
                    name: 'phone',
                    type: 'tel',
                    idForLabel: 'phone',
                    id: 'phone',
                    value: newProps.phone,
                    className: ['profile-edit__list-item'],
                }),
            ],
            button: new Button({ text: 'Сохранить', type: 'submit' }),
            className: ['profile-edit__form'],
            name: 'Profile edit Form',
            handler: userService.updateUserData
        })

        return true;
    }


}


const withUser = withStore((state) =>
    {
            return {
                ...state.user
            }
    }
)

const ProfileEditPageWithUserStore = withUser(ProfileEditPage);

export const profileEditPage = new ProfileEditPageWithUserStore({
})