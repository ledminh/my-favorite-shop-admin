import Image from "next/image";
import { Product } from "@/types";
import { getProducts } from "@/data/products";

export default async function ProductList() {
  const products = await getProducts({ catID: "1111" });

  return (
    <ul>
      {products.map((product) => (
        <li key={product.id}>
          <ProductTab product={product} />
        </li>
      ))}
    </ul>
  );
}

/*************************
 * Components
 */

type ProductTabProps = {
  product: Product;
};

const ProductTab = ({ product }: ProductTabProps) => {
  const { name, description } = product;

  const mainImage = product.images[0];

  return (
    <div>
      <div className="relative w-32 h-32">
        <Image
          src={mainImage.src}
          alt={mainImage.alt}
          fill
          className="object-cover object-center w-full h-full"
        />
      </div>
      <h3>{name}</h3>
      <p>{description}</p>
      <button>EDIT</button>
      <button>DELETE</button>
    </div>
  );
};
