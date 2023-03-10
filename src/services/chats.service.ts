import store from '../core/Store';
import MessageService from './message.service';
import { chatsApi } from '../api/ChatsAPI';

export class ChatsService {
  async create(title: string) {
    try {
      await chatsApi.create(title);

      this.fetchChats();
    } catch (e) {
      console.error(e);
    }
  }

  async fetchChats() {
    const { response } = await chatsApi.getChats();
    const chats = JSON.parse(response);

    chats.map(async (chat) => {
      const token = await this.getToken(chat.id);

      await MessageService.connect(chat.id, token);
    });

    store.set('chats', chats);
  }

  addUserToChat(id: number, userId: number) {
    try {
      chatsApi.addUsers(id, [userId]);
    } catch (e) {
      console.error(e);
    }
  }
  removeUserFromChat(id: number, userId: number) {
    chatsApi.deleteUsers(id, [userId]);
  }

  async delete(id: number) {
    try {
      await chatsApi.delete(id);

      this.fetchChats();
      store.set('selectedChat', undefined);
    } catch (e) {
      console.error(e);
    }
  }

  getToken(id: number) {
    return chatsApi.getToken(id);
  }

  selectChat(id: number) {
    store.set('selectedChat', id);
  }
}

export const chatsService = new ChatsService();
