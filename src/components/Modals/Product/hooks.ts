import { Variant as VariantType, Promotion, WithID } from "@/types";

import { useState } from "react";
import { Props } from "./";

import { OnSubmitProps as VariantData } from "../Variant/types";

export default function useProductModal({
  type,
  categories,
  submitButton,
  onSubmit,
  afterSubmit,
  initSerial,
  initName,
  initPriceStr,
  initIntro,
  initDescription,
  initVariants,
  initImages,
}: Props) {
  /******************
   * PRIVATE
   */

  const [categoryID, setCategoryID] = useState<string>(
    type === "add" ? categories[0].id : ""
  );
  const [serial, setSerial] = useState<string>(initSerial || "");
  const [name, setName] = useState<string>(initName || "");
  const [priceStr, setPriceStr] = useState<string>(initPriceStr || "");
  const [intro, setIntro] = useState<string>(initIntro || "");
  const [description, setDescription] = useState<string>(initDescription || "");
  const [promotion, setPromotion] = useState<Promotion | null>(null); // initPromotion is processed in Promotion component
  const [isNewVariantModalOpen, setIsNewVariantModalOpen] =
    useState<boolean>(false);
  const [variants, setVariants] = useState<
    (WithID<VariantType> | VariantData)[]
  >(initVariants || []);

  const [beingEditedVariant, setBeingEditedVariant] = useState<
    WithID<VariantType> | VariantData | null
  >(null);
  const [isEditDeleteVariantModalOpen, setIsEditDeleteVariantModalOpen] =
    useState<boolean>(false);

  const [images, setImages] = useState<File[]>(initImages || []);

  const reset = () => {
    setCategoryID(categories ? categories[0].id : "");
    setSerial("");
    setName("");
    setPriceStr("");
    setIntro("");
    setDescription("");
  };

  // For submit button
  const _onSubmit = () => {
    onSubmit({
      id: serial,
      categoryID,

      name,
      price: parseFloat(priceStr),
      intro,
      description,
    })
      .then(({ data: product }) => {
        if (product) {
          afterSubmit(product);
        }
      })
      .catch((err) => {
        throw new Error(err);
      });

    reset();
  };

  const isDisabled = () => {
    return (
      serial === "" ||
      name === "" ||
      priceStr === "" ||
      intro === "" ||
      description === ""
    );
  };

  /******************
   * PUBLIC
   */
  const onCategoryChange = (id: string) => {
    setCategoryID(id);
  };
  const onSerialChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const serial = e.target.value;
    setSerial(serial);
  };
  const onNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.value;
    setName(name);
  };
  const onPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let priceStr = e.target.value.replace(/^0+/, "0");

    // Only allow digits and a single optional dot
    const regex = /^[0-9]*(\.[0-9]*)?$/;

    if (!regex.test(priceStr)) {
      // Remove all characters that are not digits or dots
      priceStr = priceStr.replace(/[^\d.]/g, "");

      // Remove extra dots beyond the first one
      const dotIndex = priceStr.indexOf(".");
      if (dotIndex !== -1) {
        priceStr =
          priceStr.slice(0, dotIndex + 1) +
          priceStr.slice(dotIndex).replace(/\./g, "");
      }
    }
    setPriceStr(priceStr);
  };

  const onIntroChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const intro = e.target.value;
    console.log(intro);
    setIntro(intro);
  };

  const onDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const description = e.target.value;
    setDescription(description);
  };

  const onPromotionChange = (promo: Promotion | null) => {
    setPromotion(promo);
  };

  const afterAddVariant = (variant: VariantData) => {
    setVariants([...variants, variant]);
  };

  const afterEditVariant = (variant: VariantData) => {
    setVariants(
      variants.map((v) => {
        if (v.name === variant.name) {
          return variant;
        }
        return v;
      })
    );
  };

  const additionalButtons = [
    {
      ...submitButton,
      disabled: isDisabled(),
      onClick: _onSubmit,
    },
  ];

  return {
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
    promotion,
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
  };
}
