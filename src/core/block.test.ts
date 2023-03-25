import Block, { Props } from './block';

export type MockBlockProps = Props & {
  text: string;
};

class MockBlock extends Block<MockBlockProps> {
  constructor(props: MockBlockProps) {
    super({ ...props }, 'div');
  }
  render(): DocumentFragment {
    return this.compile(() => '<div></div>', {});
  }
}
const mockBlock = new MockBlock({
  text: 'Test',
});

describe('core/Block', () => {
  it('check block create', () => {
    expect(mockBlock.getContent().innerHTML).toBeTruthy();
  });
  it('should set props', () => {
    const block = new Block({});

    block.setProps({ test: 123 });

    expect(block.props).toEqual({ test: 123 });
  });
  it('check dispatchComponentDidMount', () => {
    const block = new MockBlock({
      text: 'Test',
    });
    expect(block.dispatchComponentDidMount).toBeDefined();
  });
  it('check hide', () => {
    mockBlock.hide();
    expect(mockBlock.getContent()!.style.display).toStrictEqual('none');
  });
  it('check show', () => {
    mockBlock.show();
    expect(mockBlock.getContent()!.style.display).toStrictEqual('block');
  });
});
