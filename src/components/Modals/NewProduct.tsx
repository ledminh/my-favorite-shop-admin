import ModalLg from "../layout/ModalLg";

type Props = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};
export default function NewProdModal({ isOpen, setIsOpen }: Props) {
  return (
    <ModalLg isOpen={isOpen} setIsOpen={setIsOpen} title="ADD NEW PRODUCT">
      <div>Category</div>
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <label htmlFor="name">Serial #</label>
          <input
            type="text"
            name="name"
            id="name"
            className="p-2 border-2 rounded-lg border-blue-950"
          />
        </div>
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
          <label htmlFor="name">Price</label>
          <input
            type="number"
            name="name"
            id="name"
            className="p-2 border-2 rounded-lg border-blue-950"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="name">Intro</label>
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
        <div>Promotion</div>
        <div>Variant</div>
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
    </ModalLg>
  );
}

/****************************
 * Components
 */
