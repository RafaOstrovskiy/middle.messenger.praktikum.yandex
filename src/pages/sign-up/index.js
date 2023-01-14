import "./signUp.scss";
import tpl from "./signUp.hbs";
import button from "../../components/button";


export default function(props = {}) {
    return tpl({
        ...props,
        button: button({type: "submit", text: "Зарегистрироваться"})
    });
}
