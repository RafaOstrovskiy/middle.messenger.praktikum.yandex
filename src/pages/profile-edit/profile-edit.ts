import tpl from './profileEdit.hbs';
import './profileEdit.scss';
import arrowLeft from '../../../static/rounded-arrow-left.svg';
import {Button} from '../../components/button';
import Block, {Props} from '../../core/block';
import {Avatar} from '../../components/avatar/avatar';
import {SignUpProps} from '../sign-up';
import {withStore} from "../../core/Store";


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

    init() {
        let propps = this.props
        // @ts-ignore
        this.children.button = new Button({
            text: 'Сохранить', type: 'submit', events: {
                click: (e) => {
                    e?.preventDefault();
                    // authService.logout()
                    // eslint-disable-next-line max-len


                    // eslint-disable-next-line max-len
                    let formData = new FormData(document.querySelector('.profile-edit__form') as HTMLFormElement)

                    const output = document.getElementById("output");

                    for (const [key, value] of formData) {
                        output!.textContent += `${key}: ${value}\n`;
                    }
                    console.log(formData, 44)
                    console.log(JSON.parse(JSON.stringify(propps)))
                }
            }
        })
    }
}

// export const profileEditPage = new ProfileEditPage({})

const withUser = withStore((state) => ({...state.user}))

const ProfileEditPageWithUserStore = withUser(ProfileEditPage);

export const profileEditPage = new ProfileEditPageWithUserStore({})