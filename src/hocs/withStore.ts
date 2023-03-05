// import store, {StoreEvents} from "../core/Store";
// import {ChatMessage, ChatsResponse, UserResponse} from "../api/api.types";
//
// export interface IState {
//     user: UserResponse;
//     chats: ChatsResponse[];
//     messages: Record<number, ChatMessage[]>;
//     selectedChat?: number;
// }
//
// export function withStore(mapStateToProps: (state: IState) => any) {
//
//     return function wrap(Component:  any){
//         let previousState: any;
//
//
//         return class WithStore extends Component {
//
//             constructor(props: any) {
//                 previousState = mapStateToProps(store.getState());
//
//                 super({ ...props, ...previousState });
//
//                 store.on(StoreEvents.Updated, () => {
//                     const stateProps = mapStateToProps(store.getState());
//
//                     previousState = stateProps;
//
//                     this.setProps({ ...stateProps });
//                 });
//             }
//         }
//
//     }
//
// }
