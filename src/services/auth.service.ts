import API, { AuthAPI } from '../api/AuthAPI';
import store from '../core/Store';
import router from '../core/Routing/Router';
import {SignInRequest, SignUpRequest} from "../api/api.types";

export class AuthService {
    private readonly api: AuthAPI;

    constructor() {
        this.api = API;
    }

    async signin(data: SignInRequest) {
        try {
            await this.api.signin(data);

            router.go('/profile');
        } catch (e: any) {
            console.error(e);
        }
    }

    async signup(data: SignUpRequest) {
        try {
            await this.api.signup(data);

            await this.fetchUser();

            router.go('/profile');
        } catch (e: any) {
            console.error(e.message);
        }
    }

    async fetchUser() {
        const user = await this.api.getUser();

        store.set('user', user);
    }

    async logout() {
        try {
            await this.api.logout();

            router.go('/');
        } catch (e: any) {
            console.error(e.message);
        }
    }
}

export default new AuthService();
