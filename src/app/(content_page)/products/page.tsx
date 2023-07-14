import FiltersAndSorts from "@/components/FiltersAndSorts";
import SearchBar from "@/components/SearchBar";

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
    <div className="m-4">
      <FiltersAndSorts />
      <SearchBar />
      <ProductList initProducts={items} total={total} catID="111" />
    </div>
  );
}
