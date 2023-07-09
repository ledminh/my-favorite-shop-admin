import { Category as CategoryType, WithID } from "@/types";
import { getCategories } from "@/data/categories";
import Image from "next/image";

export default async function CategoryList() {
  const categories = await getCategories();

  return (
    <ul>
      {categories.map((category) => {
        return (
          <li key={category.id}>
            <CategoryTab category={category} />
          </li>
        );
      })}
    </ul>
  );
}

/******************************
 * Components
 */
type CategoryTabProps = {
  category: WithID<CategoryType>;
};

const CategoryTab = ({ category }: CategoryTabProps) => {
  const { name, image } = category;

  return (
    <div>
      <div className="relative w-20 h-20">
        <Image
          src={image.src}
          alt={image.alt}
          fill
          className="object-cover object-center"
        />
      </div>
      <h2>{name}</h2>
      <button>EDIT</button>
      <button>DELETE</button>
    </div>
  );
};
