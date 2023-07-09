import type { Product, WithID } from "@/types";
import { faker } from "@faker-js/faker";

/*****************************
 * APIs
 *****************************/

/***********************************************
 * getProducts
 * @param {catID: string, sortBy: "name" | "price", order: "asc" |
 *  "desc", limit: number, offset: number}
 * @returns Promise<WithID<Product>[]>
 */

type GetProductsParams = (
  | {
      catID: string;
      searchTerm?: undefined;
    }
  | {
      catID?: undefined;
      searchTerm: string;
    }
) & {
  sortBy?: "name" | "price";
  order?: "asc" | "desc";
  limit?: number;
  offset?: number;
};

export async function getProducts({
  catID,
  searchTerm,
  sortBy = "name",
  order = "asc",
  limit = 10,
  offset = 0,
}: GetProductsParams): Promise<WithID<Product>[]> {
  let products = _getProducts(limit);

  // if (catID) {
  //   products = products.filter((product) => product.category.id === catID);
  // }

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
  }

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(products);
    }, 1000);
  });
}

function generateRandomNumber(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function _getProducts(num: number): WithID<Product>[] {
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
        name: faker.commerce.department(),
        description: faker.commerce.productDescription(),
        link: `/shop/nail-polish`,
        image: {
          src: `https://picsum.photos/seed/${i + 1}/300/300`,
          alt: `Category ${i + 1}`,
        },
      },
      link: `/product/${id}`,
      name: faker.commerce.productName(),
      price: Number(faker.commerce.price()) / 10,
      intro: intro,
      description: faker.commerce.productDescription(),
      mainImageID: images[0].id,
      images,
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

      products[i].variants = [
        {
          id: "variant-1",
          name: "Variant 1",
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
