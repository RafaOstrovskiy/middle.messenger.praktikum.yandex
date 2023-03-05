import tpl from "./modal.hbs";
import "./modal.scss";
import Block, {Props} from "../../core/block";

export type ModalProps = Props & {
  title?: string;
  content?: Block<Props>;
};

export class Modal extends Block<ModalProps> {
  constructor(props: ModalProps) {
    super({
      ...props,
      className: ["modal-overlay"],
    });
    this.initEvents();
  }

  render() {
    return this.compile(tpl, this.props);
  }

  initEvents() {
    this.setProps({
      events: {
        click: (e: MouseEvent) => this.onClickOutside(e),
      },
    });
  }

  onClickOutside = (e: MouseEvent) => {
    if ((e.target as HTMLElement).classList.contains("modal-overlay")) {
      this.hide();
    }
  }
}
