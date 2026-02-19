"use client";

import { useRef, useEffect, type ReactNode } from "react";

type ModalProps = {
  id: string;
  title: string;
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  renderTrigger: (open: () => void) => ReactNode;
  children: ReactNode;
  className?: string;
  modalBoxClassName?: string;
};

export const Modal = ({
  id,
  title,
  isOpen,
  onOpen,
  onClose,
  renderTrigger,
  children,
  className,
  modalBoxClassName,
}: ModalProps) => {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    const handleClose = () => {
      onClose();
    };

    dialog.addEventListener("close", handleClose);
    return () => dialog.removeEventListener("close", handleClose);
  }, [onClose]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog || !isOpen) return;
    dialog.showModal();
  }, [isOpen]);

  return (
    <>
      {renderTrigger(onOpen)}
      {isOpen && (
        <dialog
          ref={dialogRef}
          id={id}
          className={`modal !transition-none duration-0 [&[open]]:!transition-none [&[open]]:duration-0 ${className ?? ""}`.trim()}
          aria-labelledby={`${id}-title`}
        >
          <div
            className={`modal-box !transition-none duration-0 ${modalBoxClassName ?? ""}`.trim()}
          >
            <form method="dialog">
              <button
                type="submit"
                className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                aria-label="Close"
              >
                ✕
              </button>
            </form>
            <h3 id={`${id}-title`} className="font-bold text-lg">
              {title}
            </h3>
            <div className="py-4">{children}</div>
          </div>
          <form method="dialog" className="modal-backdrop">
            <button type="submit">close</button>
          </form>
        </dialog>
      )}
    </>
  );
};
