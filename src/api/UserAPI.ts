import BaseAPI from "./BaseAPI";
import {ChangePasswordRequest, UserUpdateRequest} from "./api.types";

export class UserAPI extends BaseAPI{
  constructor() {
    super('/user');
  }

  readonly baseUrl = "/user";
  readonly profileUrl = `/profile`;
  readonly avatarUrl = `/avatar`;
  readonly passwordUrl = `/password`;
  readonly findByLoginUrl = `/search`;

  getUserById(id: number) {
    return this.http.get(this.baseUrl, { data: { id } });
  }

  getUserByLogin(login: string) {
    return this.http.post(this.findByLoginUrl, { data: { login } });
  }

  changeUserData(data: UserUpdateRequest) {
    return this.http.put(this.profileUrl, { data });
  }

  changeUserPassword(data: ChangePasswordRequest) {
    return this.http.put(this.passwordUrl, { data });
  }

  changeUserAvatar(data: FormData) {
    return this.http.put(this.avatarUrl, { data });
  }

  create = undefined;
  read = undefined
  update = undefined;
  delete = undefined;
}

export default new UserAPI();
