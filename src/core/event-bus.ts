export class EventBus {
  private readonly _listeners: Record<string, Array<(e: any) => void>>;

  constructor() {
    this._listeners = {};
  }

  // analogue - addEventListener
  on(event: string, callback: (e: any) => void) {
    if (!this._listeners[event]) {
      this._listeners[event] = [];
    }

    this._listeners[event].push(callback);
  }

  // analogue - removeEventListener
  off(event: string | number, callback: (e: any) => void) {
    if (!this._listeners[event]) {
      return;
    }

    this._listeners[event] = this._listeners[event].filter((listener) => listener !== callback);
  }

  // analogue - dispatchEvent
  emit(event: string, ...args: unknown[]) {
    if (!this._listeners[event]) {
      return;
    }

    this._listeners[event]!.forEach((listener) => {
      // @ts-ignore
      listener(...args);
    });
  }
}
