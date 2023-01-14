import tpl from "./message.hbs";
import "./message.scss";

export default function(props = {}) {
    console.log(props, 3)
    return tpl({
        ...props,
    });
}
