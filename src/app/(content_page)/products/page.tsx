import Category from "@/components/products/Category";

import ProductList from "@/components/products/ProductList";
import { getProducts } from "@/data/products";
import { getCategories } from "@/data/categories";

import { itemsPerPage } from "@/config";
import ControlPanel from "@/components/products/ControlPanel";

type Props = {
  searchParams?: {
    variants?: boolean;
    promotion?: boolean;
    catID?: string;
    searchTerm?: string;
    sortBy?: "name" | "price" | "createdAt" | "modifiedAt";
    order?: "asc" | "desc";
  };
};

export default async function ProductsPage({ searchParams }: Props) {
  const { variants, promotion, catID, searchTerm, sortBy, order } =
    searchParams || {};

  const _sortBy = sortBy || "name";
  const _order = order || "asc";

  const filters = {
    variants: variants || false,
    promotion: promotion || false,
    catID: catID || "",
    searchTerm: searchTerm || "",
  };

  const categoriesPromise = await getCategories({
    sortBy: "name",
    order: "asc",
  });

  const productsPromise = getProducts({
    offset: 0,
    limit: itemsPerPage,
    sortBy: _sortBy,
    order: _order,
    filters,
  });

  const [{ items: categories }, { items: initProducts, total }] =
    await Promise.all([categoriesPromise, productsPromise]);

  return (
    <div className="m-4">
      <div className="mb-8">
        <Category categories={categories} />
      </div>
      <div className="mb-8">
        <ControlPanel
          initSortBy={_sortBy}
          initOrder={_order}
          sortByOptions={sortByOptions}
        />
      </div>
      <ProductList
        initProducts={initProducts}
        total={total}
        filters={filters}
        sortBy={_sortBy}
        order={_order}
      />
    </div>
  );
}

/***********************
 * Data
 */

const sortByOptions: {
  id: "name" | "price" | "createdAt" | "modifiedAt";
  text: string;
  orderOptions: {
    id: "asc" | "desc";
    text: string;
  }[];
}[] = [
  {
    id: "name",
    text: "Name",
    orderOptions: [
      {
        id: "asc",
        text: "A to Z",
      },
      {
        id: "desc",
        text: "Z to A",
      },
    ],
  },
  {
    id: "price",
    text: "Price",
    orderOptions: [
      {
        id: "asc",
        text: "Low to High",
      },
      {
        id: "desc",
        text: "High to Low",
      },
    ],
  },
  {
    id: "createdAt",
    text: "Create At",
    orderOptions: [
      {
        id: "asc",
        text: "Oldest to Newest",
      },
      {
        id: "desc",
        text: "Newest to Oldest",
      },
    ],
  },
  {
    id: "modifiedAt",
    text: "Modified At",
    orderOptions: [
      {
        id: "asc",
        text: "Oldest to Newest",
      },
      {
        id: "desc",
        text: "Newest to Oldest",
      },
    ],
  },
];
