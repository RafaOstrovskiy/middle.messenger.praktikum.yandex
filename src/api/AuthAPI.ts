import { BadRequestError, SignInRequest, SignUpRequest, UserResponse } from './api.types';
import HTTPTransport from '../core/http-transport';

export type SignupResponse = SignUpRequest | BadRequestError;
export type SigninResponse = {} | BadRequestError;
export type UserData = UserResponse | BadRequestError;

export class AuthAPI {
  protected http: HTTPTransport;
  constructor() {
    this.http = new HTTPTransport('/auth');
  }

  signin(data: SignInRequest): Promise<SigninResponse> {
    return this.http.post('/signin', {
      data,
    });
  }

  signup(data: SignUpRequest): Promise<SignupResponse> {
    return this.http.post('/signup', {
      data,
    });
  }

  getUser(): Promise<UserResponse> {
    return this.http.get('/user');
  }

  logout() {
    return this.http.post('/logout');
  }
}

export const authApi = new AuthAPI();
