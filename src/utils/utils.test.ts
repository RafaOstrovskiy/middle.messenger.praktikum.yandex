import { set } from './set';

describe('utils/set', () => {
  const keypath = 'test';
  const value = 'some value';
  let obj: Record<string, unknown>;

  beforeEach(() => {
    obj = {};
  });

  it('should set a value by keypath to the object', () => {
    set(obj, keypath, value);

    expect(obj).toEqual({ test: value });
  });
  it("should return original object if it's is not an object", () => {
    const notAnObject = 'number';

    const result = set(notAnObject, keypath, value);

    expect(result).toEqual(notAnObject);
  });
  it('should throw an error if path is not a string', () => {
    const keypathNotAString = 10;

    // @ts-ignore because we want to check behaviour in runtime
    const f = () => set(obj, keypathNotAString, value);

    expect(f).toThrow(Error);
  });
});
