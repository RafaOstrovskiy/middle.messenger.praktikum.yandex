import tpl from "./button.hbs";
import "./button.scss";

export default function(props = {}) {
    if (!props.type) {
        props.type = "button"
    }
    return tpl({
        ...props,
    });
}
