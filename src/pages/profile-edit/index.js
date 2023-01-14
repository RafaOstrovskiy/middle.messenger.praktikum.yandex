import tpl from "./profileEdit.hbs";
import "./profileEdit.scss";

export default function(props = {}) {
    return tpl({
        ...props,
    });
}
