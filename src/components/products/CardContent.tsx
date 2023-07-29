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
      {item.variants && <Variants variants={item.variants} />}
      {item.promotion && <Promotion promotion={item.promotion} />}
      <Content item={item} />
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

const Variants = ({ variants }: { variants: VariantType[] }) => {
  return (
    <ul className="overflow-y-scroll border-2 border-red-800 max-h-12">
      {variants.map((variant: VariantType) => (
        <li key={variant.id} className="flex justify-between">
          <h3 className="text-sm font-semibold">{variant.name}</h3>
          <p className="text-sm font-semibold text-blue-900">
            <span>Price:</span> <span>${variant.price}</span>
          </p>
        </li>
      ))}
    </ul>
  );
};

const Promotion = ({ promotion }: { promotion: PromotionType }) => {
  return (
    <div className="absolute top-0 right-0 flex justify-between gap-2 pr-2 overflow-hidden text-sm text-white rounded-bl-md bg-blue-950/90 sm:text-base sm:bg-blue-950">
      <span className="px-2 font-bold bg-red-950/90 sm:bg-red-950">
        PROMOTION
      </span>
      {promotion.type === "discount" && (
        <p>
          <span>Discount:</span> <span>${promotion.discountPercent}%</span>
        </p>
      )}
      {promotion.type === "sale" && (
        <p>
          <span>Sale:</span> <span>${promotion.salePrice}</span>
        </p>
      )}
    </div>
  );
};
