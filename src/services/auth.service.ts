import { authApi } from '../api/AuthAPI';
import store from '../core/Store';
import router from '../core/Routing/Router';
import { SignInRequest, SignUpRequest } from '../api/api.types';

class AuthService {
  async signin(data: SignInRequest) {
    try {
      await authApi.signin(data);

      await this.fetchUser();

      router.go('/profile');
    } catch (e: any) {
      console.error(e);
    }
  }

  async signup(data: SignUpRequest) {
    try {
      await authApi.signup(data);

      await this.fetchUser();

      router.go('/profile');
    } catch (e: any) {
      console.error(e.message);
    }
  }

  async fetchUser() {
    const { response } = await authApi.getUser();
    store.set('user', JSON.parse(response));
  }

  async logout() {
    try {
      await authApi.logout();
      router.go('/');
    } catch (e: any) {
      console.error(e.message);
    }
  }
}

export const authService = new AuthService();
