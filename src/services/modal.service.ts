import {Modal, ModalProps} from "../components/modal";


export class ModalService {
  private static instance: ModalService;
  modal: Modal;

  constructor() {
    this.modal = new Modal({});
  }

  public static getInstance(): ModalService {
    if (!ModalService.instance) {
      ModalService.instance = new ModalService();
    }

    return ModalService.instance;
  }

  openModal(props: ModalProps) {
    console.log(324234)
    this.modal.setProps({
      ...props,
    });
    this.modal.show();
  }

  closeModal() {
    this.modal.hide();
  }
}
