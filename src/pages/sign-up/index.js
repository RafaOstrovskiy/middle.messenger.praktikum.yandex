import "./signUp.scss";
import tpl from "./signUp.hbs";


export default function(props = {}) {
    return tpl({
        ...props,
    });
}
