import { ChangePasswordRequest, UserUpdateRequest } from './api.types';
import HTTPTransport from '../core/http-transport';

export class UserAPI {
  protected http: HTTPTransport;
  constructor() {
    this.http = new HTTPTransport('/user');
  }

  readonly profileUrl = `/profile`;
  readonly avatarUrl = `/profile/avatar`;
  readonly passwordUrl = `/password`;

  getUserById(id: number) {
    return this.http.get('/', { data: { id } });
  }

  changeUserData(data: UserUpdateRequest) {
    return this.http.put(this.profileUrl, {
      data,
    });
  }

  changeUserPassword(data: ChangePasswordRequest) {
    return this.http.put(this.passwordUrl, {
      data,
    });
  }

  changeUserAvatar(data: FormData) {
    return this.http.put(this.avatarUrl, {
      data,
    });
  }
}

export const userApi = new UserAPI();
