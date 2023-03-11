// import Block, {Props} from "../core/block";
// import * as components from '../components';
//
//
// type RenderBlockParams = {
//   Block: Block<Props>;
//   props: Props;
// };
//
// export async function renderBlock({
//   Block,
//   props
// }: RenderBlockParams) {
//
//   document.body.innerHTML = '<div id="app"></div>';
//
//   renderDOM(new Block({props}));
//
//   initRouter(router, store);
//
//   /**
//    * Ждем вызова componentDidMount,
//    * медота жизненного цикла компонента,
//    * который вызывается через 100мс в Block.getContent
//    */
//   await sleep();
// }
//
// export async function step(name: string, callback: () => void) {
//   console.log(`Step: ${name}`);
//   await callback();
// }
