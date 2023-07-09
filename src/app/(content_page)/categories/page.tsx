import CategoryList from "@/components/categories/CategoryList";
import { Suspense } from "react";

export default async function CategoriesPage() {
  return (
    <>
      <h1>Categories</h1>
      <Suspense fallback={<div>Loading...</div>}>
        <CategoryList />
      </Suspense>
    </>
  );
}
