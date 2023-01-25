import tpl from "./message.hbs";
import "./message.scss";

export default function(props = {}) {
    return tpl({
        ...props,
    });
}
