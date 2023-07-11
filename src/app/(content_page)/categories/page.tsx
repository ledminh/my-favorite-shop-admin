import CategoryList from "@/components/categories/CategoryList";
import { Suspense } from "react";

import { itemsPerPage } from "@/config";
import { getCategories } from "@/data/categories";

export default async function CategoriesPage() {
  const { items, total } = await getCategories({
    offset: 0,
    limit: itemsPerPage,
  });

  return (
    <>
      <div className="m-4 ">
        <Suspense fallback={<div>Loading...</div>}>
          <CategoryList initCategories={items} total={total} />
        </Suspense>
      </div>
    </>
  );
}
