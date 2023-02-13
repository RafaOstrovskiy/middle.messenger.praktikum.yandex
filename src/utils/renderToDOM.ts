import Block from "../core/block";

export default function render(page: Block) {
    const root = document.querySelector('#root');

    if (!root) {
        throw new Error('Error: root not found');
    }

    root.innerHTML = '';
    root.appendChild(page.getContent());

    page.dispatchComponentDidMount();

    return root;
}
