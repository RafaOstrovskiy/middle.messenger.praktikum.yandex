import BaseAPI from './BaseAPI';
import {ChatsResponse, ChatUserResponse} from "./api.types";

export class ChatsAPI extends BaseAPI {
  constructor() {
    super('/chats');
  }

  create(title: string) {
    return this.http.post('/', { data: {title: title }});
  }

  delete(id: number): Promise<unknown> {
    return this.http.delete('/', {data: { chatId: id }});
  }


  read(): Promise<ChatsResponse[]> {
    return this.http.get('/');
  }

  getUsers(id: number): Promise<Array<ChatUserResponse>> {
    return this.http.get(`/${id}/users`)
  }

  addUsers(id: number, users: number[]): Promise<unknown> {
    return this.http.put('/users', {data: { users, chatId: id }});
  }

  async getToken(id: number): Promise<string> {
    const response = await this.http.post<{ token: string }>(`/token/${id}`);

    return response.token;
  }

  update = undefined;
}

export default new ChatsAPI();
