import tpl from "./navigation.hbs"
import "./navigation.scss"

export default function(props = {}) {
    return tpl({
        ...props
    });
}
