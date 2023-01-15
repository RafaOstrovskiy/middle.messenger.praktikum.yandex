import tpl from "./profile.hbs";
import "./profile.scss";
import arrowLeft from "../../../static/rounded-arrow-left.svg";
import avatar from "../../components/avatar";

export default function(props = {}) {
    return tpl({
        ...props,
        arrowLeft: arrowLeft,
        avatar: avatar()
    });
}
