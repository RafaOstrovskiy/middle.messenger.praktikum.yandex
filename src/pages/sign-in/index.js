import tpl from "./signIn.hbs";

import "./signIn.scss";


export default function(props = {}) {
    return tpl({
        ...props,
    });
}
