import render from '../../utils/renderToDOM';
import Block from "../block";

export default class Route {
    private _block: Block | null;
    private _pathname: string;
    private _blockClass: any;
    private _props: any;

    constructor(pathname: string, view: any, props: any) {
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
        return pathname === this._pathname
    }

    render() {
        if (!this._block) {
            this._block = new this._blockClass();
            render(this._props.rootQuery, this._block as Block);
            return;
        }

        this._block.show();
    }
}
