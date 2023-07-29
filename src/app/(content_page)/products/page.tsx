import Category from "@/components/products/Category";

import ProductList from "@/components/products/ProductList";
import { getProducts } from "@/data/products";
import { getCategories } from "@/data/categories";

import { itemsPerPage } from "@/config";
import ControlPanel from "@/components/products/ControlPanel";

type Props = {
  searchParams?: {
    filter?: "with-variants" | "with-promotion";
    catID?: string;
    searchTerm?: string;
    sortBy?: "name" | "price" | "createdAt" | "modifiedAt";
    order?: "asc" | "desc";
  };
};

export default async function ProductsPage({ searchParams }: Props) {
  const _sortBy = searchParams?.sortBy || "name";
  const _order = searchParams?.order || "asc";
  const _searchTerm = searchParams?.searchTerm || "";
  const _catID = searchParams?.catID || "";

  const _filter = searchParams?.filter || null;

  const categoriesPromise = await getCategories({
    sortBy: "name",
    order: "asc",
  });

  const productsPromise = getProducts({
    offset: 0,
    limit: itemsPerPage,
    sortBy: _sortBy,
    order: _order,
    catID: _catID,
    searchTerm: _searchTerm,
    filter: _filter,
  });

  const [{ items: categories }, { items: initProducts, total }] =
    await Promise.all([categoriesPromise, productsPromise]);

  return (
    <div className="m-4">
      <div className="mb-8">
        <Category categories={categories} initCatID={_catID} />
      </div>
      <div className="mb-8">
        <ControlPanel
          initSortBy={_sortBy}
          initOrder={_order}
          initSearchTerm={_searchTerm}
          sortByOptions={sortByOptions}
          filterOptions={filterOptions}
          initFilterID={_filter}
        />
      </div>
      <ProductList
        initProducts={initProducts}
        total={total}
        catID={_catID}
        searchTerm={_searchTerm}
        filter={_filter}
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

const filterOptions: {
  id: "with-variants" | "with-promotion";
  text: string;
}[] = [
  {
    id: "with-variants",
    text: "With Variants",
  },
  {
    id: "with-promotion",
    text: "With Promotion",
  },
];
