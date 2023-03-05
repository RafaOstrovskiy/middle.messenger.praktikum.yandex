import {ChangePasswordRequest, UserUpdateRequest} from "../api/api.types";
import API, {UserAPI} from "../api/UserAPI";

class UserService {
  private readonly api: UserAPI;

  constructor() {
    this.api = API;
  }

  async updateUserData(data: UserUpdateRequest) {
    const { resp } = await this.api.changeUserData(data);
  }

  async updateAvatar(data: FormData) {
    const { resp } = await this.api.changeUserAvatar(data);
  }

  updatePassword(data: ChangePasswordRequest) {
    this.api.changeUserPassword(data);
  }
}

export const userService = new UserService();
