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
            <label
              htmlFor="image"
              className="p-2 text-center bg-gray-300 border-2 border-black rounded-lg shadow-sm cursor-pointer hover:bg-gray-200 shadow-black w-[150px] mx-auto active:bg-gray-300 active:shadow-none"
            >
              Upload Image
            </label>
            <input hidden type="file" name="image" id="image" />
          </div>
        </div>
      </div>
    </ModalLg>
  );
}
