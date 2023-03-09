import template from "./dropdown-menu.hbs";
import "./dropdown-menu.scss";
import Block, {Props} from "../../core/block";
import {DropdownMenuItem} from "../dropdown-menu-item";

export type DropdownMenuProps = Props & {
  items: DropdownMenuItem[];
  position?: ["top" | "bottom", "right" | "left"];
};

export class DropdownMenu extends Block<DropdownMenuProps> {
  constructor(props: DropdownMenuProps) {
    props.className = [
      "dropdown-menu",
      props.position?.[0] || "bottom",
      props.position?.[1] || "right",
    ];
    super(props, "div");
  }

  render() {
    return this.compile(template, this.props);
  }
}
