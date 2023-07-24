import { Dialog } from "@headlessui/react";
import { FC, ReactNode } from "react";

type ModalLgProps = {
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

const ModalLg = ({
  isOpen,
  setIsOpen,
  title,
  children,
  additionalButtons,
  onClose,
}: ModalLgProps) => {
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
        <Dialog.Panel className="w-full max-w-4xl mx-auto overflow-hidden bg-white min-w-[354px] rounded">
          <Dialog.Title className="p-2 bg-blue-950">
            <h2 className="text-xl font-semibold text-white ">{title}</h2>
          </Dialog.Title>
          <div className="p-4">{children}</div>
          <div className="flex gap-2 p-2 bg-blue-950/80 flex-start">
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

export default ModalLg;

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
