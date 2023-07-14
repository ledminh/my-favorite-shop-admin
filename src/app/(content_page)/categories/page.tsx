import CategoryList from "@/components/categories/CategoryList";
import { Suspense } from "react";

import { itemsPerPage } from "@/config";
import { getCategories } from "@/data/categories";
import FiltersAndSorts from "@/components/FiltersAndSorts";
import SearchBar from "@/components/SearchBar";

type Props = {
  params: {
    sortBy?: "name" | "createdAt";
    sortDirection?: "asc" | "desc";
  };
};

export default async function CategoriesPage({ params }: Props) {
  const { sortBy, sortDirection } = params;

  const _sortBy = sortBy || "name";
  const _sortDirection = sortDirection || "asc";

  const { items, total } = await getCategories({
    offset: 0,
    limit: itemsPerPage,
    sortBy: _sortBy,
    sortDirection: _sortDirection,
  });

  return (
    <>
      <div className="m-4 ">
        <FiltersAndSorts />
        <SearchBar />
        <Suspense fallback={<div>Loading...</div>}>
          <CategoryList initCategories={items} total={total} />
        </Suspense>
      </div>
    </>
  );
}
