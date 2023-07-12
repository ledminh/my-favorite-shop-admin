import { Dialog } from "@headlessui/react";
import { ReactNode } from "react";

type ModalLgProps = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  title: string;
  children: ReactNode;
  onDelete: () => void;
  additionalButtons?: {
    text: string;
    className: string;
    onClick: () => void;
  }[];
};

const ModalLg = ({
  isOpen,
  setIsOpen,
  title,
  children,
  onDelete,
  additionalButtons,
}: ModalLgProps) => {
  return (
    <Dialog
      open={isOpen}
      onClose={() => setIsOpen(false)}
      className="relative z-50"
    >
      {/* The backdrop, rendered as a fixed sibling to the panel container */}
      <div className="fixed inset-0 bg-black/80" aria-hidden="true" />

      {/* Full-screen container to center the panel */}
      <div className="fixed inset-0 flex items-center justify-center p-4">
        {/* The actual dialog panel  */}
        <Dialog.Panel className="max-w-4xl mx-auto overflow-hidden bg-white rounded">
          <Dialog.Title className="p-2 bg-blue-950">
            <h2 className="text-xl font-semibold text-white ">{title}</h2>
          </Dialog.Title>
          <div className="p-4">{children}</div>
          <div className="flex gap-6 p-2 bg-blue-950/80 flex-start">
            <ModalButton
              text="CLOSE"
              className="text-white bg-blue-950 hover:bg-blue-900 active:bg-blue-700"
              onClick={() => setIsOpen(false)}
            />
            {additionalButtons &&
              additionalButtons.map((button) => (
                <ModalButton
                  text={button.text}
                  className={button.className}
                  onClick={() => {
                    button.onClick();
                    setIsOpen(false);
                  }}
                />
              ))}
            <ModalButton
              text="DELETE"
              className="text-red-600 bg-white hover:bg-red-100"
              onClick={() => {
                onDelete();
                setIsOpen(false);
              }}
            />
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
}: {
  text: string;
  className: string;
  onClick: () => void;
}) => (
  <button
    className={`px-4 py-2 text-sm font-semibold rounded-md ${className}`}
    onClick={onClick}
  >
    {text}
  </button>
);