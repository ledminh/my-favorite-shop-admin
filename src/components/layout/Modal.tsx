import { Dialog } from "@headlessui/react";
import { ReactNode } from "react";

import classNames from "@/utils/classNames";

type ModalProps = {
  type?: "normal" | "attention";
  size?: "sm" | "md" | "lg";
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  title: string;
  children: ReactNode;
  additionalButtons?: {
    text: string;
    className: string;
    onClick: () => void;
    disabled?: boolean;
    disabledClassName?: string;
  }[];
  onClose?: () => void;
};

const Modal = ({
  type = "normal",
  size = "md",
  isOpen,
  setIsOpen,
  title,
  children,
  additionalButtons,
  onClose,
}: ModalProps) => {
  return (
    <Dialog
      open={isOpen}
      onClose={() => {
        onClose && onClose();
        setIsOpen(false);
      }}
      className="relative z-50"
    >
      {/* The backdrop, rendered as a fixed sibling to the panel container */}
      <div className="fixed inset-0 bg-black/80" aria-hidden="true" />

      {/* Full-screen container to center the panel */}
      <div className="fixed inset-0 flex items-center justify-center p-4">
        {/* The actual dialog panel  */}
        <Dialog.Panel
          className={classNames(
            "w-full mx-auto overflow-hidden bg-white min-w-[354px] rounded",
            size === "sm"
              ? "max-w-2xl"
              : size === "md"
              ? "max-w-4xl"
              : "max-w-6xl"
          )}
        >
          <Dialog.Title
            className={classNames(
              "p-2",
              type === "attention" ? "bg-red-950" : "bg-blue-950"
            )}
          >
            <h2 className="text-xl font-semibold text-white ">{title}</h2>
          </Dialog.Title>
          <div className="p-4">{children}</div>
          <div
            className={classNames(
              "flex gap-2 p-2 flex-start",
              type === "attention" ? "bg-red-300/80" : "bg-blue-950/80",
              "flex-start"
            )}
          >
            <ModalButton
              text="CLOSE"
              className="text-white bg-blue-950 hover:bg-blue-900 active:bg-blue-700"
              onClick={() => {
                onClose && onClose();
                setIsOpen(false);
              }}
            />
            {additionalButtons &&
              additionalButtons.map((button) => (
                <ModalButton
                  key={button.text}
                  text={button.text}
                  className={button.className}
                  disabled={button.disabled}
                  disabledClassName={button.disabledClassName}
                  onClick={() => {
                    button.onClick();
                    setIsOpen(false);
                  }}
                />
              ))}
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default Modal;

/**********************
 * Components
 */
const ModalButton = ({
  text,
  className,
  onClick,
  type = "button",
  disabled,
  disabledClassName,
}: {
  text: string;
  className: string;
  onClick: () => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  disabledClassName?: string;
}) => (
  <button
    className={`px-4 py-2 text-sm font-semibold rounded-md ${
      disabled ? disabledClassName : className
    }`}
    onClick={onClick}
    type={type}
    disabled={disabled}
  >
    {text}
  </button>
);
