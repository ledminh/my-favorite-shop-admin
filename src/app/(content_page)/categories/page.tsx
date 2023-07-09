import CategoryList from "@/components/categories/CategoryList";
import { Suspense } from "react";

export default async function CategoriesPage() {
  return (
    <>
      <div className="m-4 ">
        <Suspense fallback={<div>Loading...</div>}>
          <CategoryList />
        </Suspense>
      </div>
    </>
  );
}
