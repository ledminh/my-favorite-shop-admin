import type {
  WithID,
  Category as CategoryType,
  Image as ImageType,
  CategoriesRequest,
  CategoryRequest,
} from "@/types";

import getID from "@/utils/getID";

import prismaClient from "../prismaClient";

// /*****************************************
//  * API
//  *****************************************/

type GetCategories = ({
  offset,
  limit,
  sortBy,
  order,
  searchTerm,
}: CategoriesRequest) => Promise<{
  total: number;
  items: WithID<CategoryType>[];
}>;

export const getCategories: GetCategories = async ({
  offset,
  limit,
  searchTerm,
  sortBy,
  order,
}) => {
  const categoriesDB = await prismaClient.category.findMany({
    skip: offset,
    take: limit,
    orderBy: {
      [sortBy]: order,
    },
    where: {
      name: {
        contains: searchTerm,
        mode: "insensitive",
      },
    },
  });

  const categories: WithID<CategoryType>[] = categoriesDB.map((category) => ({
    ...category,
    image: JSON.parse(category.image) as ImageType,
  }));

  const total = await prismaClient.category.count({
    where: {
      name: {
        contains: searchTerm,
      },
    },
  });

  return {
    total,
    items: categories,
  };
};

export const addCategory = async (
  category: Omit<
    CategoryType,
    "id" | "createdAt" | "modifiedAt" | "numProducts"
  >
): Promise<WithID<CategoryType>> => {
  const categoryDB = await prismaClient.category.create({
    data: {
      ...category,
      id: "category-" + getID(),
      image: JSON.stringify(category.image),
      numProducts: 0,
    },
  });

  return {
    ...categoryDB,
    image: JSON.parse(categoryDB.image) as ImageType,
  };
};

export const updateCategory = async (
  id: string,
  category: Partial<Omit<CategoryType, "id" | "createdAt" | "modifiedAt">>
): Promise<WithID<CategoryType>> => {
  const categoryDB = await prismaClient.category.update({
    where: {
      id,
    },
    data: {
      ...category,
      image: JSON.stringify(category.image),
    },
  });

  return {
    ...categoryDB,
    image: JSON.parse(categoryDB.image) as ImageType,
  };
};

export const deleteCategory = async (id: string): Promise<void> => {
  await prismaClient.category.delete({
    where: {
      id,
    },
  });
};

// /*******************************************************************
//  * getCategory
//  * @param {slug, id}
//  * @returns Promise<CategoryType>
//  * @description Returns a promise that resolves to a category that has slug or * id that matches the slug or id passed in
//  * @example
//  * const category = await getCategory("nail-polish");
//  * console.log(category);
//  * // {
//  * //   id: "1",
//  * //   name: "Nail Polish",
//  * //   description: "A wide range of nail polish",
//  * //   link: "/shop/nail-polish",
//  * //   image: {
//  * //     src: "https://picsum.photos/seed/1/300/300",
//  * //     alt: "Nail Polish",
//  * //   },
//  * // }
//  *
//  * const category = await getCategory("1");
//  * console.log(category);
//  * // {
//  * //   id: "1",
//  * //   name: "Nail Polish",
//  * //   description: "A wide range of nail polish",
//  * //   link: "/shop/nail-polish",
//  * //   image: {
//  * //     src: "https://picsum.photos/seed/1/300/300",
//  * //     alt: "Nail Polish",
//  * //   },
//  * // }
//  */

type GetCategory = (props: CategoryRequest) => Promise<WithID<CategoryType>>;

export const getCategory: GetCategory = async ({ slug, id }) => {
  const categoryDB = await prismaClient.category.findFirst({
    where: {
      OR: [
        {
          link: slug,
        },
        {
          id,
        },
      ],
    },
  });

  if (!categoryDB) {
    throw new Error("Category not found");
  }

  return {
    ...categoryDB,
    image: JSON.parse(categoryDB.image) as ImageType,
  };
};
