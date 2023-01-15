import tpl from "./passwordUpdate.hbs";
import "./passwordUpdate.scss";
import arrowLeft from "../../../static/rounded-arrow-left.svg";
import avatar from "../../components/avatar";
import button from "../../components/button";

export default function(props = {}) {
    return tpl({
        ...props,
        arrowLeft: arrowLeft,
        button: button({type: "submit", text: "Сохранить"}),
        avatar: avatar()
    });
}
