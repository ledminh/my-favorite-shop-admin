import ProductList from "@/components/products/ProductList";
import { getProducts } from "@/data/products";

import { itemsPerPage } from "@/config";

export default async function ProductsPage() {
  const { items, total } = await getProducts({
    catID: "1",
    offset: 0,
    limit: itemsPerPage,
  });

  return (
    <>
      <ProductList initProducts={items} total={total} catID="111" />
    </>
  );
}
