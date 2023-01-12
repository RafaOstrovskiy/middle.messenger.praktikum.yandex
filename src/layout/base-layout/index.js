import tpl from "./layout.hbs";
import "./layout.scss";

export default function (props) {
    return tpl({
        ...props,
    });
}
