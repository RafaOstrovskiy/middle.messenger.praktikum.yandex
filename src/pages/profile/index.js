import tpl from "./profile.hbs";
import "./profile.scss";

export default function(props = {}) {
    return tpl({
        ...props,
    });
}
