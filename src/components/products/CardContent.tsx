import { Product as ProductType } from "@/types";

type Props = {
  item: ProductType;
};
const CardContent = ({ item }: Props) => {
  const { name, price } = item;

  return (
    <>
      <p className="text-sm font-semibold text-blue-900">
        <span>Price:</span> <span>${price}</span>
      </p>
      <h2 className="text-lg font-semibold">{name}</h2>
    </>
  );
};

export default CardContent;
