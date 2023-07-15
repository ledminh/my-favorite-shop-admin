import ModalLg from "../layout/ModalLg";

type Props = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function NewCatModal({ isOpen, setIsOpen }: Props) {
  const additionalButtons = [
    {
      text: "Add",
      className: "bg-white text-blue-950 hover:bg-blue-950 hover:text-white",
      onClick: () => {},
    },
  ];
  return (
    <ModalLg
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      title="ADD NEW CATEGORY"
      additionalButtons={additionalButtons}
    >
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              name="name"
              id="name"
              className="p-2 border-2 rounded-lg border-blue-950"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="description">Description</label>
            <textarea
              name="description"
              id="description"
              className="p-2 border-2 rounded-lg border-blue-950"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="image">Image</label>
            <input
              type="file"
              name="image"
              id="image"
              className="p-2 border-2 rounded-lg border-blue-950"
            />
          </div>
        </div>
      </div>
    </ModalLg>
  );
}
