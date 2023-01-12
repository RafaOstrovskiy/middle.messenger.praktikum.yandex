import tpl from "./chats.hbs";
import "./chats.scss";


export default function(props = {}) {
    return tpl({
        ...props
    });
}
