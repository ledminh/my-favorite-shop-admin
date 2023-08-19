import Select from "@/components/layout/Select";
import Modal from "../../layout/Modal";
import useProductModal from "./hooks";

import Promotion from "@/components/Promotion";

import NewVariantModal from "@/components/modals/NewVariant";
import EditVariantModal from "@/components/modals/EditVariant";

import {
  Category,
  WithID,
  Product as ProductType,
  Variant,
  Promotion as PromotionType,
} from "@/types";

import Image from "next/image";
import Variants from "./Variants";

import { Dispatch, SetStateAction } from "react";

export type OnSubmitProps = {
  id: string;
  categoryID: string;

  name: string;
  price: number;
  intro: string;
  description: string;
};

export type Props = (
  | {
      // Add New Product (user can choose category)
      type: "add";
      catName?: undefined;
      categories: WithID<Category>[];
    }
  | {
      // Edit Product (user cannot change category)
      type: "edit" | "delete";
      catName: string;
      categories?: undefined;
    }
) & {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  title: string;
  submitButton: {
    text: string;
    className: string;
    disabledClassName: string;
  };
  onSubmit: (props: OnSubmitProps) => Promise<{ data: WithID<ProductType> }>;
  afterSubmit: (category: WithID<ProductType>) => void;

  initSerial?: string;
  initName?: string;
  initPriceStr?: string;
  initIntro?: string;
  initDescription?: string;
  initPromotion?: PromotionType | null;
  initVariants?: WithID<Variant>[];
  initImages?: File[];
};

export default function ProductModal(props: Props) {
  const {
    isNewVariantModalOpen,
    setIsNewVariantModalOpen,
    isEditDeleteVariantModalOpen,
    setIsEditDeleteVariantModalOpen,
    categoryID,
    serial,
    name,
    priceStr,
    intro,
    description,
    beingEditedVariant,
    setBeingEditedVariant,

    images,
    onCategoryChange,
    onSerialChange,
    onNameChange,
    onPriceChange,
    onIntroChange,
    onDescriptionChange,
    onPromotionChange,
    setImages,
    additionalButtons,
    variants,
    afterAddVariant,
    afterEditVariant,
  } = useProductModal(props);

  const { isOpen, setIsOpen, title, type, catName, categories, initPromotion } =
    props;

  return (
    <>
      <Modal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        additionalButtons={additionalButtons}
        title={title}
      >
        <div className="flex flex-col gap-4 max-h-[70vh] overflow-y-scroll px-6">
          <div className="flex flex-col gap-2">
            <label htmlFor="category">Category</label>
            {type === "add" && (
              <Select
                id="category"
                options={categories.map((category) => ({
                  id: category.id,
                  text: category.name,
                }))}
                defaultValue={categories[0].id}
                value={categoryID}
                onChange={onCategoryChange}
              />
            )}
            {type === "edit" && (
              <input
                type="text"
                name="category"
                id="category"
                value={catName}
                disabled
                className="p-2 bg-gray-300 border rounded-lg border-blue-950"
              />
            )}
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="name">Serial #</label>
            <input
              type="text"
              name="serial"
              id="serial"
              value={serial}
              onChange={onSerialChange}
              className="p-2 border-2 rounded-lg border-blue-950"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              name="name"
              id="name"
              value={name}
              onChange={onNameChange}
              className="p-2 border-2 rounded-lg border-blue-950"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="name">Price</label>
            <input
              name="price"
              id="price"
              value={priceStr}
              onChange={onPriceChange}
              className="p-2 border-2 rounded-lg border-blue-950"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="name">Intro</label>
            <input
              type="text"
              name="intro"
              id="intro"
              value={intro}
              onChange={onIntroChange}
              className="p-2 border-2 rounded-lg border-blue-950"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="description">Description</label>
            <textarea
              name="description"
              id="description"
              value={description}
              onChange={onDescriptionChange}
              className="p-2 border-2 rounded-lg border-blue-950"
            />
          </div>
          <Promotion
            onChange={onPromotionChange}
            initPromotion={initPromotion}
          />
          <div className="flex flex-col gap-2">
            <Variants
              initVariants={variants}
              openNewVariantModal={() => setIsNewVariantModalOpen(true)}
              opentEditDeleteVariantModal={(variant) => {
                setBeingEditedVariant(variant);
                setIsEditDeleteVariantModalOpen(true);
              }}
            />
          </div>
          {!isNewVariantModalOpen && variants.length === 0 ? (
            <ImagesUpload images={images} setImages={setImages} />
          ) : null}
        </div>
        {isNewVariantModalOpen && (
          <NewVariantModal
            isOpen={isNewVariantModalOpen}
            setIsOpen={setIsNewVariantModalOpen}
            afterAdd={afterAddVariant}
          />
        )}{" "}
        {isEditDeleteVariantModalOpen && beingEditedVariant && (
          <EditVariantModal
            isOpen={isEditDeleteVariantModalOpen}
            setIsOpen={setIsEditDeleteVariantModalOpen}
            afterEdit={afterEditVariant}
            variant={beingEditedVariant}
          />
        )}{" "}
      </Modal>
    </>
  );
}

/***********************
 * Components
 */

const ImagesUpload = ({
  images,
  setImages,
}: {
  images: File[];
  setImages: Dispatch<SetStateAction<File[]>>;
}) => (
  <div className="p-4 border-2 rounded-lg border-blue-950">
    <div className="flex gap-4">
      <div className="font-bold">Images</div>
      <div>
        <label
          htmlFor="image"
          className="px-2 py-1 text-center bg-blue-950 border text-white border-black rounded-lg shadow-sm cursor-pointer hover:bg-blue-950/80 shadow-black w-[150px] mx-auto active:bg-blue-950/60 active:shadow-none"
        >
          Add Image(s)
        </label>
        <input
          hidden
          id="image"
          name="image"
          type="file"
          accept="image/*"
          multiple
          onChange={(e) => {
            e.preventDefault();
            if (e.target.files) {
              // get files array from e.target.files
              // and set it to images state
              const files = Array.from(e.target.files);
              setImages([...images, ...files]);
            }
          }}
        />
      </div>
    </div>

    <div className="flex justify-center">
      {images.length > 0 ? (
        <div className="flex flex-wrap gap-4 mt-4">
          {images.map((image, index) => (
            <div
              key={index}
              className="relative w-[150px] h-[150px] border rounded-lg border-blue-950"
            >
              <Image
                src={URL.createObjectURL(image)}
                alt="product image"
                fill
                className="object-fill rounded-lg"
              />
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center gap-2 mt-4">
          <div className="text-2xl font-bold">No Images</div>
          <div className="text-sm text-gray-500">Please add some images</div>
        </div>
      )}
    </div>
  </div>
);
