import BaseAPI from './BaseAPI';
import {BadRequestError, SignInRequest, SignUpRequest, UserResponse} from "./api.types";

export type SignupResponse = SignUpRequest | BadRequestError;
export type SigninResponse = {} | BadRequestError;
export type UserData = UserResponse | BadRequestError;

export class AuthAPI extends BaseAPI {
  constructor() {
    super('/auth');
  }

  signin(data: SignInRequest): Promise<SigninResponse> {
    return this.http.post('/signin', {
      data: data,
    });
  }


  signup(data: SignUpRequest): Promise<SignupResponse> {
    return this.http.post('/signup', {
      data: data,
    });
  }

  getUser(): Promise<UserData> {
    return this.http.get('/user');
  }

  logout() {
    return this.http.post('/logout');
  }

  create = undefined;
  read = undefined
  update = undefined;
  delete = undefined;
}

export default new AuthAPI();
