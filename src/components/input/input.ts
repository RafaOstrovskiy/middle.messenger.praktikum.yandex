import Block, { Props } from '../../core/block';

export type InputProps = Props & {
  placeholder?: string;
  type?: 'password' | 'text' | 'file' | 'email' | 'tel';
  value?: string;
  id?: string;
  name?: string;
};

const attrs = ['placeholder', 'type', 'value', 'id', 'name'];

export class Input extends Block<InputProps> {
  constructor(props: InputProps) {
    super(props, 'input');
  }

  render() {
    return this.compile(() => '', this.props);
  }

  public getName() {
    return (this.element as HTMLInputElement).name;
  }

  public getValue() {
    return (this.element as HTMLInputElement).value;
  }

  public setValue(value: string) {
    return (this.element as HTMLInputElement).value = value;
  }

  _addAttributes(): void {
    super._addAttributes();

    Object.entries(this.props).forEach(([key, value]) => {
      if (attrs.includes(key)) {
        this.element.setAttribute(key, value);
      }
    });
  }
}
