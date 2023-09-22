import { useEffect, useState } from "react";

import {
  Image as ImageType,
  Promotion as PromotionType,
  WithID,
} from "@/types";

import { Props, OnSubmitProps } from "./types";

import isFilledPromotion from "@/utils/isFilledPromotion";

export default function useVariantModal(props: Props) {
  /***********************
   * PRIVATE
   */

  // States
  const {
    id,
    initShown,
    initName,
    initPriceStr,
    initPromotion,
    initImage,
    submitButton,
    onSubmit,
    afterSubmit,
    disabled,
  } = props;

  const [shown, setShown] = useState(initShown ?? false);
  const [name, setName] = useState(initName ?? "");
  const [priceStr, setPriceStr] = useState(initPriceStr ?? "");

  const [promotion, setPromotion] = useState<PromotionType | null | undefined>(
    initPromotion ?? null
  ); // Promotion is undefined when it is enabled but user has not finished filling in the form
  const [image, setImage] = useState<File | ImageType | null>(
    initImage ?? null
  );

  useEffect(() => {
    setName(initName ?? "");
    setImage(initImage ?? null);
  }, [initName, initImage]);

  // Functions
  const onClose = () => {
    setImage(null);
  };

  const reset = () => {
    setName("");
    setImage(null);
  };

  const _onSubmit = () => {
    const dataToSubmit: WithID<OnSubmitProps> = {
      id: id ?? "",
      shown,
      name,
      price: parseFloat(priceStr),
      image: image as File | ImageType,
    };

    if (promotion) {
      dataToSubmit.promotion = promotion;
    }

    onSubmit(dataToSubmit)
      .then(({ data: variant }) => {
        if (variant) {
          afterSubmit(variant);
        }
      })
      .catch((err) => {
        throw new Error(err);
      });

    reset();
  };

  const isDisabled = () => {
    return (
      name === "" ||
      Number.isNaN(parseFloat(priceStr)) ||
      promotion === undefined ||
      !image
    );
  };

  /***********************
   * PUBLIC
   */

  const onNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
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

  const onPromotionChange = (promo: PromotionType | null) => {
    const _promotion =
      promo !== null ? (isFilledPromotion(promo) ? promo : undefined) : null;

    setPromotion(_promotion);
  };

  const onImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const files = e.target.files;
    if (files && files.length > 0) {
      setImage(files[0]);
    }
  };

  const additionalButtons: {
    text: string;
    className: string;
    disabledClassName?: string;
    onClick: () => void;
    disabled?: boolean;
  }[] = disabled
    ? []
    : [
        {
          ...submitButton,
          disabled: isDisabled(),
          onClick: _onSubmit,
        },
      ];

  return {
    shown,
    setShown,
    image,
    name,
    onClose,
    onNameChange,
    priceStr,
    onPriceChange,
    onPromotionChange,
    onImageChange,
    additionalButtons,
  };
}
