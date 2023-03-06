import {Modal, ModalProps} from "../components/modal";


export class ModalService {
  modalRef: Modal;
  private static instance: ModalService;

  constructor() {
    this.modalRef = new Modal({});
  }

  public static init(): ModalService {
    if (!ModalService.instance) {
      ModalService.instance = new ModalService();
    }

    return ModalService.instance;
  }

  openModal(props: ModalProps) {
    console.log(324234)
    this.modalRef.setProps({
      ...props,
    });
    this.modalRef.show();
  }

  closeModal() {
    this.modalRef.hide();
  }
}
