import CategoryList from "@/components/categories/CategoryList";
import { Suspense } from "react";

import { itemsPerPage } from "@/config";
import { getCategories } from "@/data/categories";
import ControlPanel from "@/components/categories/ControlPanel";

type Props = {
  searchParams?: {
    sortBy?: "name" | "createdAt" | "modifiedAt";
    order?: "asc" | "desc";
    searchTerm?: string;
  };
};

export default async function CategoriesPage({ searchParams }: Props) {
  const _sortBy = searchParams?.sortBy || "name";
  const _order = searchParams?.order || "asc";
  const _searchTerm = searchParams?.searchTerm || "";

  const { items: initCategories, total } = await getCategories({
    offset: 0,
    limit: itemsPerPage,
    sortBy: _sortBy,
    order: _order,
    searchTerm: _searchTerm,
  });

  return (
    <div className="m-4">
      <ControlPanel
        initSortBy={_sortBy}
        initOrder={_order}
        initSearchTerm={_searchTerm}
        sortByOptions={sortByOptions}
      />
      <Suspense fallback={<div>Loading...</div>}>
        <CategoryList
          sortBy={_sortBy}
          order={_order}
          searchTerm={_searchTerm}
          initCategories={initCategories}
          total={total}
        />
      </Suspense>
    </div>
  );
}

/***********************
 * Data
 */

const sortByOptions: {
  id: "name" | "createdAt" | "modifiedAt";
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
