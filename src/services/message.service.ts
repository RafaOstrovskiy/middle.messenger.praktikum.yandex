import WSTransport, { WSTransportEvents } from '../core/ws-transport';
import store from '../core/Store';
import { ChatMessage } from '../api/api.types';

class MessageService {
  private transports: Record<number, WSTransport> = {};

  async connect(id: number, token: string) {
    if (this.transports[id]) {
      return;
    }

    const userId = store.getState().user.id;

    const wsTransport = new WSTransport(
      `wss://ya-praktikum.tech/ws/chats/${userId}/${id}/${token}`,
    );

    this.transports[id] = wsTransport;

    await wsTransport.connect();

    this.subscribe(wsTransport, id);
    this.fetchOldMessages(id);
  }

  sendMessage(id: number, message: string) {
    const transport = this.transports[id];

    if (!transport) {
      throw new Error(`Chat ${id} is not connected`);
    }

    transport.send({
      type: 'message',
      content: message,
    });
  }

  fetchOldMessages(id: number) {
    const transport = this.transports[id];

    if (!transport) {
      throw new Error(`Chat ${id} is not connected`);
    }

    transport.send({ type: 'get old', content: '0' });
  }

  closeAll() {
    Object.values(this.transports).forEach(transport => transport.close())
  }

  private onMessageReceived(id: number, messages: ChatMessage | ChatMessage[]) {
    let newMessages: ChatMessage[] = [];

    if (Array.isArray(messages)) {
      newMessages = messages.reverse();
    } else {
      newMessages.push(messages);
    }

    const currentMessages = (store.getState().messages || {})[id] || [];

    newMessages = [...currentMessages, ...newMessages];

    store.set(`messages.${id}`, newMessages);
  }

  private onConnectionClose(id: number) {
    delete this.transports[id]
  }

  private subscribe(transport: WSTransport, id: number) {

    transport.on(WSTransportEvents.MESSAGE, (message) =>
      this.onMessageReceived(id, message),
    );
    transport.on(WSTransportEvents.CLOSE, () => this.onConnectionClose(id));
  }
}

const messageService = new MessageService();

// @ts-ignore
window.messagesController = messageService;

export default messageService;
