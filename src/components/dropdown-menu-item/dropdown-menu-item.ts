import template from "./dropdown-menu-item.hbs";

import "./dropdown-menu-item.scss";
import Block, {Props} from "../../core/block";

export type DropdownMenuItemProps = Props & {
  type:
      | "add"
      | "remove"
      | "delete"
  title: string;
};

export class DropdownMenuItem extends Block<DropdownMenuItemProps> {
  constructor(props: DropdownMenuItemProps) {
    props.className = ["menu-item"];
    if (props.type) {
      props.className.push("with-icon", props.type);
    }
    super(props, "p");
  }

  render() {
    return this.compile(template, this.props);
  }
}
