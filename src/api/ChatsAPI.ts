import BaseAPI from './BaseAPI';
import {ChatsResponse, ChatUserResponse} from "./api.types";

export const defaultChatRequestParams = {
  offset: 0,
  limit: 20,
};

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


  getChats(data = defaultChatRequestParams): Promise<ChatsResponse[]> {
    return this.http.get('/', {data: data});
  }

  getUsers(id: number): Promise<Array<ChatUserResponse>> {
    return this.http.get(`/${id}/users`)
  }

  addUsers(id: number, users: number[]): Promise<unknown> {
    return this.http.put('/users', {data: { users, chatId: id }});
  }

  deleteUsers(id: number, users: number[]) {
    return this.http.delete('/users', {data: { users, chatId: id }});
  }

  async getToken(id: number): Promise<string> {
    const response = await this.http.post<{ token: string }>(`/token/${id}`);

    return response.token;
  }

  read = undefined;
  update = undefined;
}

export default new ChatsAPI();
