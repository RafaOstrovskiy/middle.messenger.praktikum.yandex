import tpl from "./passwordUpdate.hbs";
import "./passwordUpdate.scss";

export default function(props = {}) {
    return tpl({
        ...props,
    });
}
