import tpl from "./error.hbs";
import "./error.scss"

export default function(props = {}) {
    return tpl({
        ...props,
    });
}
