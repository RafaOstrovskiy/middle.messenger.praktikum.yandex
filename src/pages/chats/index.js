import tpl from "./chats.hbs";
import "./chats.scss";
import chatList from "../../components/chat-list";
import chatBox from "../../components/chat-box";


export default function(props = {}) {
    return tpl({
        ...props,
        chatList: chatList(),
        chatBox: chatBox()
    });
}
