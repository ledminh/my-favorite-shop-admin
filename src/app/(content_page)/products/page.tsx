import Category from "@/components/products/Category";

import ProductList from "@/components/products/ProductList";
import { getProducts } from "@/data/products";
import { getCategories } from "@/data/categories";

import { itemsPerPage } from "@/config";
import ControlPanel from "@/components/products/ControlPanel";

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

  const { items: categories } = await getCategories({
    sortBy: "name",
    order: "asc",
  });

  const { items, total } = await getProducts({
    offset: 0,
    limit: itemsPerPage,
    sortBy: _sortBy,
    order: _order,
    filters,
  });

  return (
    <div className="m-4">
      <Category categories={categories} />
      <ControlPanel />
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
