import API, { ChatsAPI } from '../api/ChatsAPI';
import store from '../core/Store';
import MessageService from "./message.service";

class ChatsService {
    private readonly api: ChatsAPI;

    constructor() {
        this.api = API;
    }

    async create(title: string) {
        await this.api.create(title);

        this.fetchChats();
    }

    async fetchChats() {
        const chats = await this.api.getChats();

        chats.map(async (chat) => {
            const token = await this.getToken(chat.id);

            await MessageService.connect(chat.id, token);
        });

        store.set('chats', chats);
    }

    addUserToChat(id: number, userId: number) {
        try {
            this.api.addUsers(id, [userId]);
        } catch (e) {
            console.error(e);
        }
    }
    removeUserFromChat(id: number, userId: number) {
        this.api.deleteUsers(id, [userId]);
    }

    async delete(id: number) {
        await this.api.delete(id);

        this.fetchChats();
        store.set('selectedChat', undefined);
    }

    getToken(id: number) {
        return this.api.getToken(id);
    }

    selectChat(id: number) {
        store.set('selectedChat', id);
    }
}

const chatsService = new ChatsService();

// @ts-ignore
window.chatsController = chatsService;

export default chatsService;
