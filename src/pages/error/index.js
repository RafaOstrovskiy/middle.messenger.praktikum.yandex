import tpl from "./error.hbs";

export default function(props = {}) {
    return tpl({
        ...props,
    });
}
