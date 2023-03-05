import tpl from "./dropdown.hbs";
import "./dropdown.scss";
import Block, {Props} from "../../core/block";
import {Button} from "../button";
import {DropdownMenu} from "../dropdown-menu";

export type DropdownProps = Props & {
  btn: Button;
  menu: DropdownMenu;
};

export class Dropdown extends Block<DropdownProps> {
  constructor(props: DropdownProps) {
    props.className = ["dropdown"];
    super(props);
    (this.children.btn as Block).setProps({
      events: {
        click: () => {
          if ((this.children.menu as Block).getContent().style.display === "none") {
            (this.children.menu as Block).show();
          } else {
            (this.children.menu as Block).hide();
          }
        }
      },
    });
    (this.children.menu as Block).hide();
  }

  render() {
    return this.compile(tpl, this.props);
  }
}
