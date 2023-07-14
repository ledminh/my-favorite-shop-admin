import type { WithID, Category as CategoryType } from "@/types";
import { faker } from "@faker-js/faker";

const CATEGORIES: WithID<CategoryType>[] = [
  {
    id: "cat-1",
    name: "Nail Polish",
    description: "A wide range of nail polish colors",
    link: "/shop/nail-polish",
    image: {
      src: "https://picsum.photos/seed/1/300/300",
      alt: "Nail Polish",
    },
    createdAt: faker.date.past(),
    modifiedAt: faker.date.past(),
  },
  {
    id: "cat-2",
    name: "Nail Care",
    description: "A wide range of nail care products",
    link: "/shop/nail-care",
    image: {
      src: "https://picsum.photos/seed/2/300/300",
      alt: "Nail Care",
    },
    createdAt: faker.date.past(),
    modifiedAt: faker.date.past(),
  },
  {
    id: "cat-3",
    name: "Nail Tools",
    description: "A wide range of nail tools",
    link: "/shop/nail-tools",
    image: {
      src: "https://picsum.photos/seed/3/300/300",
      alt: "Nail Tools",
    },
    createdAt: faker.date.past(),
    modifiedAt: faker.date.past(),
  },
  {
    id: "cat-4",
    name: "Nail Art",
    description: "A wide range of nail art products",
    link: "/shop/nail-art",
    image: {
      src: "https://picsum.photos/seed/4/300/300",
      alt: "Nail Art",
    },
    createdAt: faker.date.past(),
    modifiedAt: faker.date.past(),
  },
  {
    id: "5",
    name: "Nail Extensions",
    description: "A wide range of nail extensions",
    link: "/shop/nail-extensions",
    image: {
      src: "https://picsum.photos/seed/5/300/300",
      alt: "Nail Extensions",
    },
    createdAt: faker.date.past(),
    modifiedAt: faker.date.past(),
  },
  {
    id: "6",
    name: "Nail Accessories",
    description: "A wide range of nail accessories",
    link: "/shop/nail-accessories",
    image: {
      src: "https://picsum.photos/seed/6/300/300",
      alt: "Nail Accessories",
    },
    createdAt: faker.date.past(),
    modifiedAt: faker.date.past(),
  },
  {
    id: "7",
    name: "Nail Treatments",
    description: "A wide range of nail treatments",
    link: "/shop/nail-treatments",
    image: {
      src: "https://picsum.photos/seed/7/300/300",
      alt: "Nail Treatments",
    },
    createdAt: faker.date.past(),
    modifiedAt: faker.date.past(),
  },
  {
    id: "8",
    name: "Nail Polish Remover",
    description: "A wide range of nail polish removers",
    link: "/shop/nail-polish-remover",
    image: {
      src: "https://picsum.photos/seed/8/300/300",
      alt: "Nail Polish Remover",
    },
    createdAt: faker.date.past(),
    modifiedAt: faker.date.past(),
  },
  {
    id: "9",
    name: "Nail Polish Sets",
    description: "A wide range of nail polish sets",
    link: "/shop/nail-polish-sets",
    image: {
      src: "https://picsum.photos/seed/9/300/300",
      alt: "Nail Polish Sets",
    },
    createdAt: faker.date.past(),
    modifiedAt: faker.date.past(),
  },
  {
    id: "10",
    name: "Nail Polish Accessories",
    description: "A wide range of nail polish accessories",
    link: "/shop/nail-polish-accessories",
    image: {
      src: "https://picsum.photos/seed/10/300/300",
      alt: "Nail Polish Accessories",
    },
    createdAt: faker.date.past(),
    modifiedAt: faker.date.past(),
  },
  {
    id: "11",
    name: "Nail Polish Remover Accessories",
    description: "A wide range of nail polish remover accessories",
    link: "/shop/nail-polish-remover-accessories",
    image: {
      src: "https://picsum.photos/seed/11/300/300",
      alt: "Nail Polish Remover Accessories",
    },
    createdAt: faker.date.past(),
    modifiedAt: faker.date.past(),
  },
  {
    id: "12",
    name: "Nail Polish Remover Sets",
    description: "A wide range of nail polish remover sets",
    link: "/shop/nail-polish-remover-sets",
    image: {
      src: "https://picsum.photos/seed/12/300/300",
      alt: "Nail Polish Remover Sets",
    },
    createdAt: faker.date.past(),
    modifiedAt: faker.date.past(),
  },
  {
    id: "13",
    name: "Nail Polish Remover Tools",
    description: "A wide range of nail polish remover tools",
    link: "/shop/nail-polish-remover-tools",
    image: {
      src: "https://picsum.photos/seed/13/300/300",
      alt: "Nail Polish Remover Tools",
    },
    createdAt: faker.date.past(),
    modifiedAt: faker.date.past(),
  },
  {
    id: "14",
    name: "Nail Polish Remover Treatments",
    description: "A wide range of nail polish remover treatments",
    link: "/shop/nail-polish-remover-treatments",
    image: {
      src: "https://picsum.photos/seed/14/300/300",
      alt: "Nail Polish Remover Treatments",
    },
    createdAt: faker.date.past(),
    modifiedAt: faker.date.past(),
  },
  {
    id: "15",
    name: "Nail Polish Remover Accessories",
    description: "A wide range of nail polish remover accessories",
    link: "/shop/nail-polish-remover-accessories",
    image: {
      src: "https://picsum.photos/seed/15/300/300",
      alt: "Nail Polish Remover Accessories",
    },
    createdAt: faker.date.past(),
    modifiedAt: faker.date.past(),
  },
  {
    id: "16",
    name: "Nail Polish Remover Sets",
    description: "A wide range of nail polish remover sets",
    link: "/shop/nail-polish-remover-sets",
    image: {
      src: "https://picsum.photos/seed/16/300/300",
      alt: "Nail Polish Remover Sets",
    },
    createdAt: faker.date.past(),
    modifiedAt: faker.date.past(),
  },
  {
    id: "17",
    name: "Nail Polish Remover Tools",
    description: "A wide range of nail polish remover tools",
    link: "/shop/nail-polish-remover-tools",
    image: {
      src: "https://picsum.photos/seed/17/300/300",
      alt: "Nail Polish Remover Tools",
    },
    createdAt: faker.date.past(),
    modifiedAt: faker.date.past(),
  },
  {
    id: "18",
    name: "Nail Polish Remover Treatments",
    description: "A wide range of nail polish remover treatments",
    link: "/shop/nail-polish-remover-treatments",
    image: {
      src: "https://picsum.photos/seed/18/300/300",
      alt: "Nail Polish Remover Treatments",
    },
    createdAt: faker.date.past(),
    modifiedAt: faker.date.past(),
  },
  {
    id: "19",
    name: "Nail Polish Remover Accessories",
    description: "A wide range of nail polish remover accessories",
    link: "/shop/nail-polish-remover-accessories",
    image: {
      src: "https://picsum.photos/seed/19/300/300",
      alt: "Nail Polish Remover Accessories",
    },
    createdAt: faker.date.past(),
    modifiedAt: faker.date.past(),
  },
  {
    id: "20",
    name: "Nail Polish Remover Sets",
    description: "A wide range of nail polish remover sets",
    link: "/shop/nail-polish-remover-sets",
    image: {
      src: "https://picsum.photos/seed/20/300/300",
      alt: "Nail Polish Remover Sets",
    },
    createdAt: faker.date.past(),
    modifiedAt: faker.date.past(),
  },
  {
    id: "21",
    name: "Nail Polish Remover Tools",
    description: "A wide range of nail polish remover tools",
    link: "/shop/nail-polish-remover-tools",
    image: {
      src: "https://picsum.photos/seed/21/300/300",
      alt: "Nail Polish Remover Tools",
    },
    createdAt: faker.date.past(),
    modifiedAt: faker.date.past(),
  },
  {
    id: "22",
    name: "Nail Polish Remover Treatments",
    description: "A wide range of nail polish remover treatments",
    link: "/shop/nail-polish-remover-treatments",
    image: {
      src: "https://picsum.photos/seed/22/300/300",
      alt: "Nail Polish Remover Treatments",
    },
    createdAt: faker.date.past(),
    modifiedAt: faker.date.past(),
  },
];

/*****************************************
 * API
 *****************************************/

/*******************************************************************
 * getCategories
 * @returns Promise<CategoryType[]>
 * @description Returns a promise that resolves to an array of
 * all categories in the database
 * @example
 * const data = await getCategories();
 * console.log(categories);
 * // {items: [
 * //   {
 * //     id: "1",
 * //     name: "Nail Polish",
 * //     description: "A wide range of nail polish",
 * //     link: "/shop/nail-polish",
 * //     image: {
 *       src: "https://picsum.photos/seed/1/300/300",
 *      alt: "Nail Polish",
 *    },
 * },
 * ...
 * ],
 * total: 22
 *
 * }
 */

type GetCategories = ({
  offset,
  limit,
  sortBy,
  sortDirection,
}: {
  offset?: number;
  limit?: number;
  sortBy: "name" | "createdAt";
  sortDirection: "asc" | "desc";
}) => Promise<{
  total: number;
  items: WithID<CategoryType>[];
}>;

export const getCategories: GetCategories = async ({
  offset,
  limit,
  sortBy,
  sortDirection,
}) => {
  let categories = [...CATEGORIES];

  if (sortBy === "name") {
    categories.sort((a, b) => {
      if (sortDirection === "asc") {
        return a.name.localeCompare(b.name);
      } else {
        return b.name.localeCompare(a.name);
      }
    });
  } else if (sortBy === "createdAt") {
    categories.sort((a, b) => {
      if (sortDirection === "asc") {
        return a.createdAt.getTime() - b.createdAt.getTime();
      } else {
        return b.createdAt.getTime() - a.createdAt.getTime();
      }
    });
  }

  const _offset = offset || 0;
  const _limit = limit || categories.length;

  categories = categories.slice(_offset, _offset + _limit);

  return new Promise((resolve) => {
    resolve({
      total: CATEGORIES.length,
      items: categories,
    });

    // setTimeout(() => {
    //   resolve({
    //     total: categories.length,
    //     items: categories,
    //   });
    // }, 0);
  });
};

/*******************************************************************
 * getCategory
 * @param {slug, id}
 * @returns Promise<CategoryType>
 * @description Returns a promise that resolves to a category that has slug or * id that matches the slug or id passed in
 * @example
 * const category = await getCategory("nail-polish");
 * console.log(category);
 * // {
 * //   id: "1",
 * //   name: "Nail Polish",
 * //   description: "A wide range of nail polish",
 * //   link: "/shop/nail-polish",
 * //   image: {
 * //     src: "https://picsum.photos/seed/1/300/300",
 * //     alt: "Nail Polish",
 * //   },
 * // }
 *
 * const category = await getCategory("1");
 * console.log(category);
 * // {
 * //   id: "1",
 * //   name: "Nail Polish",
 * //   description: "A wide range of nail polish",
 * //   link: "/shop/nail-polish",
 * //   image: {
 * //     src: "https://picsum.photos/seed/1/300/300",
 * //     alt: "Nail Polish",
 * //   },
 * // }
 */

type GetCategoryProps = {
  slug?: string;
  id?: string;
};
type GetCategory = (props: GetCategoryProps) => Promise<WithID<CategoryType>>;

export const getCategory: GetCategory = async ({ slug, id }) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const category = CATEGORIES.find(
        (category) => category.id === id || category.link === "/shop/" + slug
      );
      if (category) {
        resolve(category);
      } else {
        reject(new Error("Category not found"));
      }
    }, 500);
  });
};
