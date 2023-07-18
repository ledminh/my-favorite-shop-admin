import CategoryList from "@/components/categories/CategoryList";
import { Suspense } from "react";

import { itemsPerPage } from "@/config";
import { getCategories } from "@/data/categories";
import ControlPanel from "@/components/categories/ControlPanel";

type Props = {
  params?: {
    sortBy?: "name" | "createdAt";
    order?: "asc" | "desc";
  };
};

export default async function CategoriesPage({ params }: Props) {
  const _sortBy = params?.sortBy || "name";
  const _order = params?.order || "asc";

  const { items, total } = await getCategories({
    offset: 0,
    limit: itemsPerPage,
    sortBy: _sortBy,
    order: _order,
  });

  return (
    <div className="m-4">
      <ControlPanel />
      <Suspense fallback={<div>Loading...</div>}>
        <CategoryList
          initCategories={items}
          total={total}
          sortBy={_sortBy}
          order={_order}
        />
      </Suspense>
    </div>
  );
}
