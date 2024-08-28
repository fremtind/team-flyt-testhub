import { PropsWithChildren, RefCallback, useEffect } from "react";
import ReactDOM from "react-dom";
import {
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContainer,
    ModalHeader,
    ModalInstance,
    ModalOverlay,
    ModalTitle,
    useModal,
} from "@fremtind/jkl-modal-react";

type DialogProps = {
    title: string;
    dialogRef: RefCallback<ModalInstance>;
    onConfirm: () => void;
    onCancel: () => void;
};

export function Dialog(props: PropsWithChildren<DialogProps>) {
    const [instance, { title, overlay, container, modal, closeButton }] = useModal({
        title: props.title,
        role: "dialog",
    });

    const { dialogRef } = props;

    useEffect(() => {
        dialogRef(instance);
        return () => {
            if (!instance) {
                return;
            }

            instance.destroy();
            dialogRef(null);
        };
    }, [dialogRef, instance]);

    if (typeof window !== "undefined") {
        //  React.render(<MainWrapper />, document.getElementById("root"));

        return ReactDOM.createPortal(
            <ModalContainer {...container}>
                <ModalOverlay {...overlay} onClick={props.onCancel} />
                <Modal {...modal}>
                    <ModalHeader>
                        <ModalTitle {...title}>{props.title}</ModalTitle>
                        <ModalCloseButton {...closeButton} onClick={props.onCancel} />
                    </ModalHeader>
                    <ModalBody>{props.children}</ModalBody>
                </Modal>
            </ModalContainer>,
            document.body
        );
    }
}
