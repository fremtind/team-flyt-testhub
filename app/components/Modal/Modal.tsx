import { CloseIcon } from "@fremtind/jkl-icons-react";
import type { FunctionComponent, PropsWithChildren, MouseEventHandler, HTMLProps } from "react";
import { useEffect, useRef } from "react";

interface Props extends Exclude<HTMLProps<HTMLDialogElement>, "onClick" | "ref"> {
    isOpen: boolean;
    header: string;
    onClose: () => void;
}

export const Modal: FunctionComponent<PropsWithChildren<Props>> = ({
    children,
    isOpen,
    onClose,
    className,
    header,
    ...props
}) => {
    const modalRef = useRef<HTMLDialogElement>(null);

    const handleDialogClick: MouseEventHandler<HTMLDialogElement> = (e) => {
        if (!modalRef.current) {
            return;
        }

        const dialogDimensions = modalRef.current.getBoundingClientRect();
        if (
            e.clientX < dialogDimensions.left ||
            e.clientX > dialogDimensions.right ||
            e.clientY < dialogDimensions.top ||
            e.clientY > dialogDimensions.bottom
        ) {
            onClose();
        }
    };

    useEffect(() => {
        if (isOpen) {
            modalRef.current?.showModal();
        } else {
            modalRef.current?.close();
        }
    }, [isOpen]);

    return (
        <dialog ref={modalRef} onClick={handleDialogClick} className={`p-24 ${className ?? ""}`} {...props}>
            <header className="flex justify-between mb-40">
                <h2 className="j-h3">{header}</h2>
                <button className="p-4" onClick={onClose}>
                    <CloseIcon />
                </button>
            </header>

            {children}
        </dialog>
    );
};
