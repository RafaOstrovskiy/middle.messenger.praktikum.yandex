import Block, { Props } from './block';

export type MockBlockProps = Props & {
  text: string;
};

class MockBlock extends Block<MockBlockProps> {
  constructor(props: MockBlockProps) {
    super({ ...props }, 'div');
  }
  render(): DocumentFragment {
    return this.compile(() => 'Hello world', {});
  }
}
const mockBlock = new MockBlock({
  text: 'Test',
});

describe('core/Block', () => {
  it('Create component', () => {
    expect(mockBlock.getContent().innerHTML).toBeTruthy();
  });
  // ЮНИТ-ТЕСТ на модуль
  it('should set props', () => {
    const block = new Block({});

    block.setProps({ test: 123 });

    expect(block.props).toEqual({ test: 123 });
  });
});
