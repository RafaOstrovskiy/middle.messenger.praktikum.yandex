import BaseAPI from './BaseAPI';
import { ChangePasswordRequest, UserUpdateRequest } from './api.types';

export class UserAPI extends BaseAPI {
  constructor() {
    super('/user');
  }

  readonly baseUrl = '/user';
  readonly profileUrl = `/profile`;
  readonly avatarUrl = `/profile/avatar`;
  readonly passwordUrl = `/password`;

  getUserById(id: number) {
    return this.http.get(this.baseUrl, { data: { id } });
  }

  changeUserData(data: UserUpdateRequest) {
    return this.http.put(this.profileUrl, {
      data: data,
    });
  }

  changeUserPassword(data: ChangePasswordRequest) {
    return this.http.put(this.passwordUrl, {
      data: data,
    });
  }

  changeUserAvatar(data: FormData) {
    return this.http.put(this.avatarUrl, {
      data: data,
    });
  }

  create = undefined;
  read = undefined;
  update = undefined;
  delete = undefined;
}

export const userApi = new UserAPI();
