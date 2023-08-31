import type {
  Product,
  ProductRequest,
  Product as ProductType,
  ProductsRequest,
  WithID,
} from "@/types";
import { faker } from "@faker-js/faker";

import { getCategory } from "../categories";

const PRODUCTS: WithID<ProductType>[] = _getProducts(50);

/*****************************
 * APIs
 *****************************/

/***********************************************
 * getProducts
 * @param {catID: string, sortBy: "name" | "price", order: "asc" |
 *  "desc", limit: number, offset: number}
 * @returns Promise<{
 *  total: number;
 *  items: WithID<Product>[];
 * }>;
 */

type GetProducts = (req: ProductsRequest) => Promise<{
  total: number;
  items: WithID<ProductType>[];
}>;

export const getProducts: GetProducts = async ({
  offset = 0,
  limit = 10,
  sortBy,
  order,
  catID,
  searchTerm,
  filter,
}) => {
  let products = PRODUCTS;

  if (filter === "with-variants") {
    products = products.filter((product) => product.variants);
  }

  if (filter === "with-promotion") {
    products = products.filter((product) => product.promotion);
  }

  if (catID) {
    products = products.filter((product) => product.category.id === catID);
  }

  if (searchTerm) {
    products = products.filter((product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  if (sortBy === "name") {
    products.sort((a, b) => {
      if (a.name > b.name) {
        return order === "asc" ? 1 : -1;
      } else if (a.name < b.name) {
        return order === "asc" ? -1 : 1;
      } else {
        return 0;
      }
    });
  } else if (sortBy === "price") {
    products.sort((a, b) => {
      if (a.price > b.price) {
        return order === "asc" ? 1 : -1;
      } else if (a.price < b.price) {
        return order === "asc" ? -1 : 1;
      } else {
        return 0;
      }
    });
  } else if (sortBy === "createdAt") {
    products.sort((a, b) => {
      if (a.createdAt > b.createdAt) {
        return order === "asc" ? 1 : -1;
      } else if (a.createdAt < b.createdAt) {
        return order === "asc" ? -1 : 1;
      } else {
        return 0;
      }
    });
  } else if (sortBy === "modifiedAt") {
    products.sort((a, b) => {
      if (a.modifiedAt > b.modifiedAt) {
        return order === "asc" ? 1 : -1;
      } else if (a.modifiedAt < b.modifiedAt) {
        return order === "asc" ? -1 : 1;
      } else {
        return 0;
      }
    });
  }

  const total = products.length;
  products = products.slice(offset, offset + limit);

  return new Promise((resolve) => {
    resolve({
      total: total,
      items: products,
    });
  });
};

/***********************************************
 * getProduct
 * @param {id: string}
 * @returns Promise<WithID<Product>>;
 */

type GetProduct = ({ id }: ProductRequest) => Promise<WithID<ProductType>>;

export const getProduct: GetProduct = async ({ id }) => {
  return new Promise((resolve, reject) => {
    const product = PRODUCTS.find((product) => product.id === id);

    if (!product) {
      return reject(new Error("Product not found"));
    }

    resolve(product);
  });
};

/**********************************
 * addProduct
 */

export const addProduct = async (
  product: Omit<
    WithID<ProductType>,
    "category" | "link" | "createdAt" | "modifiedAt"
  > & {
    categoryID: string;
  }
): Promise<WithID<ProductType>> => {
  return new Promise(async (resolve) => {
    const category = await getCategory({ id: product.categoryID });

    const newProduct = {
      ...product,
      category,
      link: `/product/${product.id}`,
      createdAt: new Date(),
      modifiedAt: new Date(),
    };

    PRODUCTS.push(newProduct);

    resolve(newProduct);
  });
};

/**********************************
 * updateProduct
 * @param {id: string}
 * @returns Promise<WithID<Product>>;
 */
export const updateProduct = async (
  product: Omit<
    WithID<ProductType>,
    "category" | "link" | "createdAt" | "modifiedAt"
  > & {
    categoryID: string;
  }
): Promise<WithID<ProductType>> => {
  return new Promise(async (resolve, reject) => {
    const oldProductPromise = getProduct({ id: product.id });

    const categoryPromise = getCategory({ id: product.categoryID });

    const [oldProduct, category] = await Promise.all([
      oldProductPromise,
      categoryPromise,
    ]);

    const updatedProduct = {
      ...product,
      category,
      link: `/product/${product.id}`,
      createdAt: oldProduct.createdAt,
      modifiedAt: new Date(),
    };

    const index = PRODUCTS.findIndex((p) => p.id === product.id);

    if (index === -1) {
      return reject(new Error("Product not found"));
    }

    PRODUCTS[index] = updatedProduct;

    resolve(updatedProduct);
  });
};

/**********************************
 * deleteProduct
 * @param {id: string}
 * @returns Promise<WithID<Product>>;
 */

export const deleteProduct = async (id: string) => {
  return new Promise(async (resolve, reject) => {
    const index = PRODUCTS.findIndex((p) => p.id === id);

    if (index === -1) {
      return reject(new Error("Product not found"));
    }

    PRODUCTS.splice(index, 1);

    resolve(null);
  });
};

/*****************************
 * Helpers
 *****************************/
function generateRandomNumber(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function _getProducts(num: number): WithID<Product>[] {
  const products: WithID<Product>[] = [];

  for (let i = 0; i < num; i++) {
    const id = `${generateRandomNumber(1000, 999999)}`;

    const images: { id: string; src: string; alt: string }[] = [];

    for (let j = 0; j < 3; j++) {
      images.push({
        id: `image-${generateRandomNumber(1000, 999999)}`,
        src: `https://picsum.photos/seed/${j + 1}/300/300`,
        alt: `Nail Polish ${i + 1} - ${j}`,
      });
    }

    const introLength = generateRandomNumber(50, 100);
    const intro = faker.commerce.productDescription().slice(0, introLength);

    products.push({
      id,
      category: {
        id: "cat-1-nail-polish",
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
      link: `/product/${id}`,
      name: faker.commerce.productName(),
      price: Number(faker.commerce.price()) / 10,
      intro: intro,
      description: faker.commerce.productDescription(),
      mainImageID: images[0].id,
      images,
      createdAt: new Date(),
      modifiedAt: new Date(),
    });

    // Add promotion
    if (i % 3 === 0) {
      products[i].promotion = {
        type: "discount",
        discountPercent: 20,
        description: "Independent day discount: 20%",
      };
    }

    if (i === 10) {
      products[i].promotion = {
        type: "sale",
        salePrice: 10,
        description: "Sale $10",
      };
    }

    // Add variants
    if (i === 0) {
      products[i].id = "product-1";
      products[i].name = "AAAAAAAAA";

      products[i].variants = [
        {
          id: "variant-1",
          name: "A very long name variant, too long to display in only 1 line",
          price: 10,
          image: {
            src: `https://picsum.photos/seed/${i + 1}/300/300`,
            alt: `variant 1`,
          },

          promotion: {
            type: "discount",
            discountPercent: 20,
            description: "Independent day discount var 1: 20%",
          },

          shown: true,
        },
        {
          id: "variant-2",
          name: "Variant 2",
          price: 20,
          image: {
            src: `https://picsum.photos/seed/${i + 1}/300/300`,
            alt: `variant 2`,
          },

          shown: true,
        },
        {
          id: "variant-3",
          name: "Variant 3",
          price: 30,
          image: {
            src: `https://picsum.photos/seed/${i + 1}/300/300`,
            alt: `variant 3`,
          },

          promotion: {
            type: "sale",
            salePrice: 10,
            description: "Sale var 3 $10",
          },

          shown: true,
        },
      ];
    }
  }

  return products;
}
