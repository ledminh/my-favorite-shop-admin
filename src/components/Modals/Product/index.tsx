import { OnSubmitProps as VariantData } from "../Variant/types";

import Select from "@/components/layout/Select";
import Modal from "../../layout/Modal";
import useProductModal from "./hooks";

import Promotion from "@/components/Promotion";

import NewVariantModal from "@/components/modals/NewVariant";
import EditVariantModal from "@/components/modals/EditVariant";
import RemoveVariantModal from "@/components/modals/RemoveVariant";

import {
  Category,
  WithID,
  Product as ProductType,
  Variant,
  Promotion as PromotionType,
  Image as ImageType,
} from "@/types";

import Image from "next/image";
import Variants from "./Variants";

import { Dispatch, SetStateAction } from "react";
import isImageType from "@/utils/isImageType";

export type OnSubmitProps = {
  id: string;
  categoryID: string;

  name: string;
  intro: string;
  description: string;
  promotion: PromotionType | null;
  images: (File | ImageType)[];
} & (
  | {
      price: number;
      variants?: undefined;
    }
  | {
      price?: undefined;
      variants: (WithID<Variant> | VariantData)[];
    }
);

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
  setLoading: (loading: boolean) => void;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  title: string;
  submitButton: {
    text: string;
    className: string;
    disabledClassName: string;
  };
  onSubmit: (props: OnSubmitProps) => Promise<{ data: WithID<ProductType> }>;
  afterSubmit: (product: WithID<ProductType>) => void;

  initCategoryID?: string;
  initSerial?: string;
  initName?: string;
  initPriceStr?: string;
  initIntro?: string;
  initDescription?: string;
  initPromotion?: PromotionType | null;
  initVariants?: WithID<Variant>[];
  initImages?: ImageType[];
};

export default function ProductModal(props: Props) {
  const {
    isNewVariantModalOpen,
    setIsNewVariantModalOpen,
    isEditVariantModalOpen,
    setIsEditVariantModalOpen,
    isRemoveVariantModalOpen,
    setIsRemoveVariantModalOpen,
    categoryID,
    serial,
    name,
    priceStr,
    intro,
    description,

    beingEditedVariant,
    setBeingEditedVariant,

    beingRemovedVariant,
    setBeingRemovedVariant,

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
    afterRemoveVariant,
  } = useProductModal(props);

  const { isOpen, setIsOpen, title, type, catName, categories, initPromotion } =
    props;

  if (type === "add" && categories.length === 0) {
    return (
      <Modal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        type="attention"
        title="No Categories"
      >
        <div className="flex flex-col gap-4 max-h-[70vh] overflow-y-scroll px-6">
          <div className="flex justify-center">
            <span className="text-lg font-bold text-red-500">
              NO CATEGORIES FOUND
            </span>
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="category">Category</label>
            <div className="p-2 bg-gray-300 border rounded-lg border-blue-950">
              No categories found. Please add some categories first.
            </div>
          </div>
        </div>
      </Modal>
    );
  }

  return (
    <>
      <Modal
        type={props.type === "delete" ? "attention" : "normal"}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        additionalButtons={additionalButtons}
        title={title}
      >
        <div className="flex flex-col gap-4 max-h-[70vh] overflow-y-scroll px-6">
          {props.type === "delete" && (
            <div className="flex justify-center">
              <span className="text-lg font-bold text-red-500">
                DO YOU WANT TO DELETE THIS PRODUCT?
              </span>
            </div>
          )}
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
            {(type === "edit" || type === "delete") && (
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
              className="p-2 border-2 rounded-lg border-blue-950 disabled:bg-gray-300"
              disabled={props.type === "delete" || props.type === "edit"}
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
              disabled={props.type === "delete"}
            />
          </div>
          {priceStr !== undefined && (
            <div className="flex flex-col gap-2">
              <label htmlFor="name">Price</label>
              <input
                name="price"
                id="price"
                value={priceStr}
                onChange={onPriceChange}
                className="p-2 border-2 rounded-lg border-blue-950"
                disabled={props.type === "delete"}
              />
            </div>
          )}

          <div className="flex flex-col gap-2">
            <label htmlFor="name">Intro</label>
            <input
              type="text"
              name="intro"
              id="intro"
              value={intro}
              onChange={onIntroChange}
              className="p-2 border-2 rounded-lg border-blue-950"
              disabled={props.type === "delete"}
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
              disabled={props.type === "delete"}
            />
          </div>
          <Promotion
            onChange={onPromotionChange}
            initPromotion={initPromotion}
            disabled={props.type === "delete"}
          />
          {variants !== undefined && (
            <div className="flex flex-col gap-2">
              <Variants
                initVariants={variants}
                openNewVariantModal={() => setIsNewVariantModalOpen(true)}
                opentEditVariantModal={(variant) => {
                  setBeingEditedVariant(variant);
                  setIsEditVariantModalOpen(true);
                }}
                openRemoveVariantModal={(variant) => {
                  setBeingRemovedVariant(variant);
                  setIsRemoveVariantModalOpen(true);
                }}
                disabled={props.type === "delete"}
              />
            </div>
          )}

          {!isNewVariantModalOpen ? (
            <ImagesUpload
              images={images}
              setImages={setImages}
              disabled={props.type === "delete"}
            />
          ) : null}
        </div>
        {isNewVariantModalOpen && (
          <NewVariantModal
            isOpen={isNewVariantModalOpen}
            setIsOpen={setIsNewVariantModalOpen}
            afterAdd={afterAddVariant}
          />
        )}{" "}
        {isEditVariantModalOpen && beingEditedVariant && (
          <EditVariantModal
            isOpen={isEditVariantModalOpen}
            setIsOpen={setIsEditVariantModalOpen}
            afterEdit={afterEditVariant}
            variant={beingEditedVariant}
            disabled={props.type === "delete"}
          />
        )}{" "}
        {isRemoveVariantModalOpen && beingRemovedVariant && (
          <RemoveVariantModal
            isOpen={isRemoveVariantModalOpen}
            setIsOpen={setIsRemoveVariantModalOpen}
            afterRemove={afterRemoveVariant}
            variant={beingRemovedVariant}
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
  disabled,
}: {
  images: (File | ImageType)[];
  setImages: Dispatch<SetStateAction<(File | ImageType)[]>>;
  disabled?: boolean;
}) => (
  <div className="p-4 border-2 rounded-lg border-blue-950">
    <div className="flex gap-4">
      <div className="font-bold">Images</div>
      {!disabled && (
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
      )}
    </div>

    <div className="flex justify-center">
      {images.length > 0 ? (
        <div className="flex flex-wrap gap-4 mt-4">
          {images.map((image, index) => (
            <div
              key={index}
              className="relative w-[150px] h-[150px] border rounded-lg border-blue-950"
            >
              {!disabled && (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="absolute z-10 w-6 h-6 text-white bg-black rounded-full shadow-md cursor-pointer top-1 right-1 hover:text-red-500 hover:shadow-lg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  onClick={() => {
                    const newImages = [...images];
                    newImages.splice(index, 1);
                    setImages(newImages);
                  }}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              )}

              <Image
                src={
                  isImageType(image) ? image.src : URL.createObjectURL(image)
                }
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
