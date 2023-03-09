import API, { AuthAPI } from '../api/AuthAPI';
import store from '../core/Store';
import router from '../core/Routing/Router';
import { SignInRequest, SignUpRequest } from '../api/api.types';

class AuthService {
  private readonly api: AuthAPI;

  constructor() {
    this.api = API;
  }

  async signin(data: SignInRequest) {
    try {
      await this.api.signin(data);

      await this.fetchUser();

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
    return user;
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

export const authService = new AuthService();
