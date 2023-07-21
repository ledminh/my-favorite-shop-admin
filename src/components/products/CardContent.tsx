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
      <p className="text-sm font-semibold text-blue-900">
        <span>Price:</span> <span>${item.price}</span>
      </p>
      <h2 className="text-lg font-semibold">{item.name}</h2>
    </div>
  );
};

const Variants = ({ variants }: { variants: VariantType[] }) => {
  return (
    <div>
      {variants.map((variant: VariantType) => (
        <div key={variant.id}>
          <p className="text-sm font-semibold text-blue-900">
            <span>Price:</span> <span>${variant.price}</span>
          </p>
          <h2 className="text-lg font-semibold">{variant.name}</h2>
        </div>
      ))}
    </div>
  );
};

const Promotion = ({ promotion }: { promotion: PromotionType }) => {
  return <div>With Promotion</div>;
};
