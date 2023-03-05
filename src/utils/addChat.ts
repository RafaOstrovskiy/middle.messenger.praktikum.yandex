import {ModalProps} from "../components/modal";
import {Form} from "../components/form";
import {Button} from "../components/button";
import {FormInput} from "../components/form-input";
import chatsService from "../services/chats.service";

export function onAddChat(onSubmit: () => void = () => {}): ModalProps {
    return {
        title: "Создание чата",
        content: new Form({
            inputs: [new FormInput({ name: "title", label: "Название чата" })],
            button: new Button({ text: "Создать", type: "submit" }),
            handler: (data: {title: string}) => {
                chatsService.create(data.title);
                onSubmit();
            },
        }),
    };
}