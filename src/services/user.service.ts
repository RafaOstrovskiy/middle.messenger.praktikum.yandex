import { ChangePasswordRequest, UserUpdateRequest } from '../api/api.types';
import { userApi } from '../api/UserAPI';
import router from '../core/Routing/router';
import store from '../core/store';

class UserService {
  constructor() {}

  async updateUserData(data: UserUpdateRequest): Promise<void> {
    try {
      await userApi.changeUserData(data).then((res: any) => {
        const code = res.status;

        if (code === 200) {
          store.set('user', JSON.parse(res.response));
          router.go('/profile');
        }
      });
    } catch (e: any) {
      console.error(e);
    }
  }

  async updateAvatar(data: FormData) {
    try {
      await userApi.changeUserAvatar(data);
    } catch (e: any) {
      console.error(e);
    }
  }

  updatePassword(data: ChangePasswordRequest) {
    try {
      userApi.changeUserPassword(data);
      router.go('/profile');
    } catch (e: any) {
      console.error(e);
    }
  }
}

export const userService = new UserService();
