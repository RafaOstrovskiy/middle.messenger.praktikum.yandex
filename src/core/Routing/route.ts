import render from '../../utils/renderToDOM';
import Block, { Props } from '../block';

export default class Route {
  private _block: Block<Props> | null;
  private _pathname: string;
  private _blockClass: any;
  private _props: Props;

  constructor(pathname: string, view: Block<Props>, props: Props) {
    this._pathname = pathname;
    this._blockClass = view;
    this._block = null;
    this._props = props;
  }

  navigate(pathname: string) {
    if (this.match(pathname)) {
      this._pathname = pathname;
      this.render();
    }
  }

  leave() {
    if (this._block) {
      this._block.hide();
    }
  }

  match(pathname: string) {
    return pathname === this._pathname;
  }

  render() {
    if (!this._block) {
      this._block = new this._blockClass(this._props);
      render(this._block as Block);
      return;
    }

    this._block.show();
  }
}
