import { EventBus } from './event-bus';

export enum WSTransportEvents {
  CONNECTED = 'connected',
  MESSAGE = 'message',
  CLOSE = 'close',
  ERROR = 'error',
}

export default class WSTransport extends EventBus {
  private socket: WebSocket | null = null;
  private pingInterval: number = 0;

  constructor(private url: string) {
    super();
  }

  public send(data: unknown) {
    if (!this.socket) {
      throw new Error('Socket is not connected');
    }

    this.socket.send(JSON.stringify(data));
  }

  public connect(): Promise<void> {
    this.socket = new WebSocket(this.url);

    this.subscribe(this.socket);

    this.setupPing();

    return new Promise((resolve) => {
      this.on(WSTransportEvents.CONNECTED, () => {
        resolve();
      });
    });
  }

  public close() {
    this.socket?.close();
  }

  private setupPing() {
    this.pingInterval = window.setInterval(() => {
      this.send({ type: 'ping' });
    }, 5000);

    this.on(WSTransportEvents.CLOSE, () => {
      clearInterval(this.pingInterval);

      this.pingInterval = 0;
    });
  }

  private subscribe(socket: WebSocket) {
    socket.addEventListener('open', () => {
      this.emit(WSTransportEvents.CONNECTED);
    });
    socket.addEventListener('close', () => {
      this.emit(WSTransportEvents.CLOSE);
    });

    socket.addEventListener('error', (e) => {
      this.emit(WSTransportEvents.ERROR, e);
    });

    socket.addEventListener('message', (message) => {
      const data = JSON.parse(message.data);

      if (data.type === 'pong') {
        return;
      }

      this.emit(WSTransportEvents.MESSAGE, data);
    });
  }
}
