import { set } from '../utils/set';
import { EventBus } from './event-bus';
import Block from "./block";
import {ChatMessage, ChatsResponse, UserResponse} from "../api/api.types";

export enum StoreEvents {
    Updated = 'updated'
}
export interface IState {
    user: UserResponse;
    chats: ChatsResponse[];
    messages: Record<number, ChatMessage[]>;
    selectedChat?: number;
}

export class Store extends EventBus {
    constructor() {
        super();
    }
    private state: any = {};

    public set(keypath: string, data: unknown) {
        set(this.state, keypath, data);

        this.emit(StoreEvents.Updated, this.getState());
    }

    public getState() {
        return this.state;
    }
}

const store = new Store();


export function withStore(mapStateToProps: (state: IState) => any) {
    return function wrap<T extends Record<string, any>>(Component: typeof Block<T>) {
        let previousState: any;

        return class WithStore extends Component {
            constructor(props: any) {
                previousState = mapStateToProps(store.getState());
                super({ ...props, ...previousState });

                store.on(StoreEvents.Updated, () => {
                    const stateProps = mapStateToProps(store.getState());
                    previousState = stateProps;
                    this.setProps({ ...stateProps });
                });
            }
        };
    };
}

export default store;
