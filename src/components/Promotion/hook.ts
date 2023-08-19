import { useState, useEffect } from "react";

import { Props, _PromotionType } from "./types";
import { init } from "next/dist/compiled/@vercel/og/satori";

export default function usePromotion(props: Props) {
  const { onChange, initPromotion } = props;

  const initSelectedPromotion = initPromotion
    ? (promotionList.find(
        (promotion) => promotion.id === initPromotion.type
      ) as _PromotionType)
    : null;

  const initDiscountPercentStr =
    initPromotion && initPromotion.type === "discount"
      ? initPromotion.discountPercent.toString()
      : "0";
  const initSalePriceStr =
    initPromotion && initPromotion.type === "sale"
      ? initPromotion.salePrice.toString()
      : "0";

  const initDiscountDescription =
    initPromotion && initPromotion.type === "discount"
      ? initPromotion.description
      : "";
  const initSaleDescription =
    initPromotion && initPromotion.type === "sale"
      ? initPromotion.description
      : "";

  const [enabled, setEnabled] = useState(false);

  const [selectedPromotion, setSelectedPromotion] =
    useState<_PromotionType | null>(initSelectedPromotion);

  const [discountPercentStr, setDiscountPercentStr] = useState(
    initDiscountPercentStr
  );
  const [salePriceStr, setSalePriceStr] = useState(initSalePriceStr);

  const [discountDescription, setDiscountDescription] = useState(
    initDiscountDescription
  );
  const [saleDescription, setSaleDescription] = useState(initSaleDescription);

  const resetDiscount = () => {
    setDiscountPercentStr("0");
    setDiscountDescription("");
  };

  const resetSale = () => {
    setSalePriceStr("0");
    setSaleDescription("");
  };

  useEffect(() => {
    if (!enabled) {
      setSelectedPromotion(null);
      onChange(null);
      resetDiscount();
      resetSale();
    } else {
      setSelectedPromotion(promotionList[0]);
    }
  }, [enabled]);

  useEffect(() => {
    if (selectedPromotion) {
      if (selectedPromotion.id === "discount") {
        resetSale();
      } else if (selectedPromotion.id === "sale") {
        resetDiscount();
      }
    }
  }, [selectedPromotion]);

  useEffect(() => {
    if (selectedPromotion) {
      if (selectedPromotion.id === "discount") {
        onChange({
          type: "discount",
          discountPercent: parseFloat(discountPercentStr),
          description: discountDescription,
        });
      } else if (selectedPromotion.id === "sale") {
        onChange({
          type: "sale",
          salePrice: parseFloat(salePriceStr),
          description: saleDescription,
        });
      }
    }
  }, [
    discountPercentStr,
    salePriceStr,
    discountDescription,
    saleDescription,
    selectedPromotion,
  ]);

  const setNumValue = (numStr: string, promotionID: string) => {
    numStr = numStr.replace(/^0+/, "0");

    // if the first character is a dot, prepend a 0
    if (numStr[0] === ".") {
      numStr = "0" + numStr;
    }

    // if the first character is a 0 and the second character is not a dot, remove the 0
    if (numStr.length > 2 && numStr[0] === "0" && numStr[1] !== ".") {
      numStr = numStr.slice(1);
    }

    // Only allow digits and a single optional dot
    const regex = /^[0-9]*(\.[0-9]*)?$/;

    if (!regex.test(numStr)) {
      // Remove all characters that are not digits or dots
      numStr = numStr.replace(/[^\d.]/g, "");

      // Remove extra dots beyond the first one
      const dotIndex = numStr.indexOf(".");
      if (dotIndex !== -1) {
        numStr =
          numStr.slice(0, dotIndex + 1) +
          numStr.slice(dotIndex).replace(/\./g, "");
      }
    }

    if (promotionID === "discount") {
      setDiscountPercentStr(numStr);
    } else if (promotionID === "sale") {
      setSalePriceStr(numStr);
    }
  };

  const setDescription = (description: string, promotionID: string) => {
    if (promotionID === "discount") {
      setDiscountDescription(description);
    } else if (promotionID === "sale") {
      setSaleDescription(description);
    }
  };

  return {
    enabled,
    setEnabled,
    promotionList,
    selectedPromotion,
    setSelectedPromotion,
    discountPercentStr,
    salePriceStr,
    saleDescription,
    discountDescription,
    setNumValue,
    setDescription,
  };
}

/****************************
 * Data
 */

const promotionList: _PromotionType[] = [
  {
    id: "discount",
    title: "Discount",
    unit: {
      text: "%",
      position: "right",
    },
  },
  {
    id: "sale",
    title: "Sale",
    unit: {
      text: "$",
      position: "left",
    },
  },
];
