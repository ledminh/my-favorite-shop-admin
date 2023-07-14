import FiltersAndSorts from "@/components/FiltersAndSorts";
import SearchBar from "@/components/SearchBar";

import ProductList from "@/components/products/ProductList";
import { getProducts } from "@/data/products";

import { itemsPerPage } from "@/config";

type Props = {
  params: {
    variants?: boolean;
    promotion?: boolean;
    catID?: string;
    searchTerm?: string;
    sortBy?: "name" | "price" | "createdAt" | "modifiedAt";
    order?: "asc" | "desc";
  };
};

export default async function ProductsPage({ params }: Props) {
  const { variants, promotion, catID, searchTerm, sortBy, order } = params;

  const _sortBy = sortBy || "name";
  const _order = order || "asc";

  const filters = {
    variants: variants || false,
    promotion: promotion || false,
    catID: catID || "",
    searchTerm: searchTerm || "",
  };

  const { items, total } = await getProducts({
    offset: 0,
    limit: itemsPerPage,
    sortBy: _sortBy,
    order: _order,
    filters,
  });

  return (
    <div className="m-4">
      <FiltersAndSorts />
      <SearchBar />
      <ProductList
        initProducts={items}
        total={total}
        filters={filters}
        sortBy={_sortBy}
        order={_order}
      />
    </div>
  );
}
