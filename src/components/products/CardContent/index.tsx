import Variants from "./Variants";

import {
  Product as ProductType,
  Promotion as PromotionType,
  Variant as VariantType,
} from "@/types";

type Props = {
  item: ProductType;
};
const CardContent = ({ item }: Props) => {
  return (
    <>
      <Content item={item} />
      {item.variants && item.variants.length > 0 && (
        <Variants variants={item.variants} />
      )}
      {item.promotion && <Promotion promotion={item.promotion} />}
    </>
  );
};

export default CardContent;

/*********************
 * Components
 */

const Content = ({ item }: Props) => {
  return (
    <div>
      {!item.variants && (
        <p className="text-sm font-semibold text-blue-900">
          <span>Price:</span> <span>${item.price}</span>
        </p>
      )}

      <h2 className="text-lg font-semibold">{item.name}</h2>
    </div>
  );
};

const Promotion = ({ promotion }: { promotion: PromotionType }) => {
  return (
    <div className="absolute top-0 right-0 px-2 overflow-hidden text-sm text-white rounded-bl-md bg-blue-950 sm:text-base sm:bg-gray-950/80">
      {promotion.type === "discount" && (
        <p className="flex flex-col">
          <div>
            <span>Discount:</span> <span>{promotion.discountPercent}%</span>
          </div>
          <span>{promotion.description}</span>
        </p>
      )}
      {promotion.type === "sale" && (
        <p className="flex flex-col">
          <div>
            <span>Sale:</span> <span>${promotion.salePrice}</span>
          </div>
          <span>{promotion.description}</span>
        </p>
      )}
    </div>
  );
};
