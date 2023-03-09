import { ChangePasswordRequest, UserUpdateRequest } from '../api/api.types';
import { userApi } from '../api/UserAPI';

class UserService {
  constructor() {}

  async updateUserData(data: UserUpdateRequest) {
    try {
      await userApi.changeUserData(data);
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
    } catch (e: any) {
      console.error(e);
    }
  }
}

export const userService = new UserService();
