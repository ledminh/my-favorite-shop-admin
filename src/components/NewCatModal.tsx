import ModalLg from "./layout/ModalLg";

type Props = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function NewCatModal({ isOpen, setIsOpen }: Props) {
  return (
    <ModalLg
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      title="ADD NEW CATEGORY"
      onDelete={() => {}}
    >
      <div className="flex flex-col gap-4">
        <h1 className="text-2xl font-semibold">Add New Category</h1>
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
        </div>
        <div className="flex justify-end gap-4">
          <button className="p-2 font-semibold border-2 rounded-lg border-blue-950 text-blue-950 hover:bg-blue-950/10 hover:shadow-stone-800 hover:shadow-md active:bg-blue-950/20">
            Cancel
          </button>
          <button className="p-2 font-semibold border-2 rounded-lg border-blue-950 text-blue-950 hover:bg-blue-950/10 hover:shadow-stone-800 hover:shadow-md active:bg-blue-950/20">
            Add
          </button>
        </div>
      </div>
    </ModalLg>
  );
}
