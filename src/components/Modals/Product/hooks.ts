import {
  Variant as VariantType,
  Promotion,
  WithID,
  Image as ImageType,
} from "@/types";

import { useEffect, useState } from "react";
import { Props } from "./";

import { OnSubmitProps as VariantData } from "../Variant/types";
import isFilledPromotion from "@/utils/isFilledPromotion";
import getID from "@/utils/getID";

export default function useProductModal({
  type,
  setLoading,
  categories,
  submitButton,
  onSubmit,
  afterSubmit,
  initCategoryID,
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
    (type === "add" && categories.length > 0
      ? categories[0].id
      : initCategoryID) ?? ""
  );
  const [serial, setSerial] = useState<string>(initSerial ?? "");
  const [name, setName] = useState<string>(initName ?? "");
  const [priceStr, setPriceStr] = useState<string | undefined>(initPriceStr);
  const [intro, setIntro] = useState<string>(initIntro ?? "");
  const [description, setDescription] = useState<string>(initDescription ?? "");
  const [promotion, setPromotion] = useState<Promotion | null>(null); // initPromotion is processed in Promotion component

  const [isNewVariantModalOpen, setIsNewVariantModalOpen] =
    useState<boolean>(false);
  const [variants, setVariants] = useState<
    (WithID<VariantType> | WithID<VariantData>)[] | undefined
  >(initVariants);

  const [beingEditedVariant, setBeingEditedVariant] = useState<
    WithID<VariantType> | WithID<VariantData> | null
  >(null);
  const [isEditVariantModalOpen, setIsEditVariantModalOpen] =
    useState<boolean>(false);

  const [beingRemovedVariant, setBeingRemovedVariant] = useState<
    WithID<VariantType> | WithID<VariantData> | null
  >(null);
  const [isRemoveVariantModalOpen, setIsRemoveVariantModalOpen] =
    useState<boolean>(false);

  const [images, setImages] = useState<(File | ImageType)[]>(initImages ?? []);

  const reset = () => {
    setCategoryID(categories ? categories[0].id : "");
    setSerial("");
    setName("");
    setPriceStr(undefined);
    setIntro("");
    setDescription("");
    setPromotion(null);
    setVariants(undefined);
    setImages([]);
  };

  useEffect(() => {
    setCategoryID(
      (type === "add" && categories.length > 0
        ? categories[0].id
        : initCategoryID) ?? ""
    );
    setSerial(initSerial ?? "");
    setName(initName ?? "");
    setPriceStr(initPriceStr ?? "");
    setIntro(initIntro ?? "");
    setDescription(initDescription ?? "");
    setPromotion(null);
    setVariants(initVariants ?? []);
    setImages(initImages ?? []);
  }, [
    categories,
    initCategoryID,
    initSerial,
    initName,
    initPriceStr,
    initIntro,
    initDescription,
    initVariants,
    initImages,
  ]);

  useEffect(() => {
    if (initPriceStr === undefined && initVariants === undefined) {
      setPriceStr("");
      setVariants([]);
    }
  }, [initPriceStr, initVariants]);

  useEffect(() => {
    if (priceStr !== undefined) {
      if (priceStr === "" && promotion === null) {
        setVariants([]);
      } else {
        setVariants(undefined);
      }
    }
  }, [priceStr, promotion]);

  useEffect(() => {
    if (variants !== undefined) {
      if (variants.length === 0) {
        setPriceStr("");
      } else {
        setPriceStr(undefined);
        setPromotion(null);
      }
    }
  }, [variants, variants?.length]);

  // For submit button
  const _onSubmit = () => {
    setLoading(true);

    const dataToSubmit =
      priceStr === undefined && variants !== undefined
        ? {
            id: serial,
            categoryID,
            name,
            intro,
            description,
            promotion,
            variants,
            images,
          }
        : {
            id: serial,
            categoryID,
            name,
            price: parseFloat(priceStr as string),
            intro,
            description,
            promotion,
            images,
          };

    onSubmit(dataToSubmit)
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
      (priceStr === "" && variants && variants.length === 0) ||
      intro === "" ||
      description === "" ||
      (promotion !== null && !isFilledPromotion(promotion)) ||
      (variants && !variants.some((v) => v.shown)) ||
      images.length === 0
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
    const regex = /^\d*(\.\d*)?$/;

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
    setPromotion(promo);
  };

  const afterAddVariant = (variant: VariantData) => {
    if (!variants) {
      return;
    }
    setVariants([...variants, { ...variant, id: getID() }]);
  };

  const afterEditVariant = (variant: WithID<VariantData>) => {
    if (!variants) {
      return;
    }

    setVariants(
      variants.map((v) => {
        if (v.id === variant.id) {
          return variant;
        }
        return v;
      })
    );
  };

  const afterRemoveVariant = (variant: WithID<VariantData>) => {
    if (!variants) {
      return;
    }

    setVariants(variants.filter((v) => v.id !== variant.id));
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
  };
}
