import { useState, useEffect, ChangeEvent } from "react";

import { Props } from ".";

export default function usePromotion(props: Props) {
  const { onChange } = props;

  const [enabled, setEnabled] = useState(false);

  const [selectedPromotion, setSelectedPromotion] =
    useState<_PromotionType | null>(null);

  const [discountPercent, setDiscountPercent] = useState(0);
  const [salePrice, setSalePrice] = useState(0);

  const [discountDescription, setDiscountDescription] = useState("");
  const [saleDescription, setSaleDescription] = useState("");

  const resetDiscount = () => {
    setDiscountPercent(0);
    setDiscountDescription("");
  };

  const resetSale = () => {
    setSalePrice(0);
    setSaleDescription("");
  };

  useEffect(() => {
    if (!enabled) {
      setSelectedPromotion(null);
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
          discountPercent,
          description: discountDescription,
        });
      } else if (selectedPromotion.id === "sale") {
        onChange({
          type: "sale",
          salePrice,
          description: saleDescription,
        });
      }
    }
  }, [discountPercent, salePrice, discountDescription, saleDescription]);

  const setNumValue = (numStr: string, promotionID: string) => {
    // only allow number and decimal point
    const regex = /^[0-9.]*$/;

    if (!regex.test(numStr)) {
      numStr = numStr.slice(0, -1);
    }

    if (promotionID === "discount") {
      setDiscountPercent(numStr === "" ? 0 : parseFloat(numStr));
    } else if (promotionID === "sale") {
      setSalePrice(numStr === "" ? 0 : parseFloat(numStr));
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
    numValue:
      selectedPromotion?.id === "discount" ? discountPercent : salePrice,
    setNumValue,
    description:
      selectedPromotion?.id === "discount"
        ? discountDescription
        : saleDescription,
    setDescription,
  };
}

/****************************
 * Data
 */

type _PromotionType = {
  id: "discount" | "sale";
  title: string;
  unit: {
    text: "$" | "%";
    position: "left" | "right";
  };
};

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
