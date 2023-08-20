import { useState, useEffect } from "react";

import { Props, _PromotionType } from "./types";

export default function usePromotion(props: Props) {
  const { onChange, initPromotion } = props;

  const [initiated, setInitiated] = useState(false);

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
    if (initPromotion) {
      setEnabled(true);
    } else {
      setEnabled(false);
    }

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

    setSelectedPromotion(initSelectedPromotion);
    setDiscountPercentStr(initDiscountPercentStr);
    setSalePriceStr(initSalePriceStr);
    setDiscountDescription(initDiscountDescription);
    setSaleDescription(initSaleDescription);

    setInitiated(true);
  }, [initPromotion]);

  useEffect(() => {
    if (!initiated) return;

    if (!enabled) {
      resetDiscount();
      resetSale();

      setSelectedPromotion(null);
      onChange(null);
    } else {
      /**
       * Where does it come from?
       * 1. user clicks on the promotion toggle when enabled === false
       *    - initPromotion is null/undefined, null when there is a product with no promotion, undefined when there is no product --> also no promotion --> selectedPromotion =  promotionList[0]
       *    - initPromotion is not null/undefined --> there is an initProduct with promotion but user already deleted it --> still selectedPromotion =  promotionList[0]
       *
       * 2. first time loading the modal and initPromotion is not null
       *  - initPromotion is not null/undefined --> there is an initProduct with promotion --> selectedPromotion = listPromotion.find(promotion => promotion.id === initPromotion.type), set description, set discountPercentStr/salePriceStr
       *
       *  how to tell if it is the first case or the second case?
       *  - if initPromotion is null/undefined --> first case
       * - if initPromotion is not null/undefined --> second case
       *   can't be, because initPromotion is either null or undefined in both cases.
       *  --> so we can't tell if it is the first case or the second case. So how?
       *
       *
       */

      if (!initPromotion) setSelectedPromotion(promotionList[0]);
      else {
        const initSelectedPromotion = promotionList.find(
          (promotion) => promotion.id === initPromotion.type
        ) as _PromotionType;

        setSelectedPromotion(initSelectedPromotion);
      }
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
