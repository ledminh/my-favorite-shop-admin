import { useState, useEffect } from "react";

import { Props, _PromotionType } from "./types";

export default function usePromotion(props: Props) {
  const { onChange } = props;

  const [enabled, setEnabled] = useState(false);

  const [selectedPromotion, setSelectedPromotion] =
    useState<_PromotionType | null>(null);

  const [discountPercentStr, setDiscountPercentStr] = useState("0");
  const [salePriceStr, setSalePriceStr] = useState("0");

  const [discountDescription, setDiscountDescription] = useState("");
  const [saleDescription, setSaleDescription] = useState("");

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
