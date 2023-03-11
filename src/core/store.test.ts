import { Store } from './store';

describe('core/Store', () => {
  // ЮНИТ-ТЕСТ на модуль
  it('should set state', () => {
    const store = new Store();

    store.set('user', { id: 123 });

    expect(store.getState().user).toStrictEqual({ id: 123 });
  });

  // ЮНИТ-ТЕСТ на тестирования события
  it('should emit event after store was update', () => {
    // 1 Arrange
    const store = new Store();
    const mock = jest.fn();
    store.on('updated', mock);

    // 2 Act
    store.set('user', { id: 123 });

    // 3 Assert
    expect(mock).toHaveBeenCalled();
    expect(mock).toHaveBeenCalledTimes(1);
    expect(mock).toHaveBeenCalledWith({}, { user: { id: 123 } });
  });
});
