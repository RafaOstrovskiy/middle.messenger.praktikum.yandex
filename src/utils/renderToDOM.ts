import Block from '../core/block';

export default function render(query: string, page: Block) {
  const root = document.querySelector(query);

  if (!root) {
    throw new Error('Error: root not found');
  }

  root.innerHTML = '';
  root.appendChild(page.getContent());

  page.dispatchComponentDidMount();

  return root;
}
