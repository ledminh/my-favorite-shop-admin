import { Category as CategoryType, Promotion, WithID } from "@/types";

import { useState } from "react";
import { Props } from "./";

import isFilledPromotion from "@/utils/isFilledPromotion";

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
  const [promotion, setPromotion] = useState<Promotion | null | undefined>(
    undefined
  ); // Promotion is undefined when it is enabled but user has not finished filling in the form

  const [isVariantModalOpen, setIsVariantModalOpen] = useState<boolean>(false);
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
    setIntro(intro);
  };

  const onDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const description = e.target.value;
    setDescription(description);
  };

  const onPromotionChange = (promo: Promotion | null) => {
    const _promotion =
      promo !== null ? (isFilledPromotion(promo) ? promo : undefined) : null;

    setPromotion(_promotion);
  };

  const additionalButtons = [
    {
      ...submitButton,
      disabled: isDisabled(),
      onClick: _onSubmit,
    },
  ];

  return {
    isVariantModalOpen,
    setIsVariantModalOpen,
    categoryID,
    serial,
    name,
    priceStr,
    intro,
    description,
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
  };
}
