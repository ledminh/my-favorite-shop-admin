import {
  ProductsRequest,
  ProductRequest,
  WithID,
  Product as ProductType,
  Image as ImageType,
  Variant as VariantType,
} from "@/types";

import prismaClient from "../prismaClient";

/***********************************
 * getProducts
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
  const productsPromise = await prismaClient.product.findMany({
    skip: offset,
    take: limit,
    orderBy: {
      [sortBy]: order,
    },
    where: {
      ...(catID !== "" && { categoryID: catID }),
      ...(searchTerm && {
        name: {
          contains: searchTerm,
          mode: "insensitive",
        },
      }),
      ...(filter === "with-promotion" && {
        promotion: {
          not: null,
        },
      }),
      ...(filter === "with-variants" && {
        variants: {
          isEmpty: false,
        },
      }),
    },
    include: {
      category: true,
    },
  });

  const totalPromise = prismaClient.product.count({
    where: {
      ...(catID !== "" && { categoryID: catID }),
      ...(searchTerm && {
        name: {
          contains: searchTerm,
          mode: "insensitive",
        },
      }),
      ...(filter === "with-promotion" && {
        promotion: {
          not: null,
        },
      }),
      ...(filter === "with-variants" && {
        variants: {
          isEmpty: false,
        },
      }),
    },
  });

  const [products, total] = await Promise.all([productsPromise, totalPromise]);

  return {
    total: total,
    items: products.map((product) => {
      let returnedProduct: WithID<ProductType>;

      if (product.price === null) {
        returnedProduct = {
          ...product,
          price: undefined,
          images: product.images.map(
            (image) => JSON.parse(image) as WithID<ImageType>
          ),
          promotion: undefined,
          variants: product.variants.map((variant) =>
            JSON.parse(variant)
          ) as WithID<VariantType>[],
          category: {
            ...product.category,
            image: JSON.parse(product.category.image) as ImageType,
          },
        };
      } else {
        returnedProduct = {
          ...product,
          price: product.price,
          images: product.images.map(
            (image) => JSON.parse(image) as WithID<ImageType>
          ),
          promotion: product.promotion
            ? JSON.parse(product.promotion)
            : undefined,
          variants: undefined,
          category: {
            ...product.category,
            image: JSON.parse(product.category.image) as ImageType,
          },
        };
      }

      return returnedProduct;
    }),
  };
};

/***********************************************
 * getProduct
 * @param {id: string}
 * @returns Promise<WithID<Product>>;
 */

type GetProduct = ({ id }: ProductRequest) => Promise<WithID<ProductType>>;

export const getProduct: GetProduct = async ({ id }) => {
  const product = await prismaClient.product.findUnique({
    where: {
      id,
    },
    include: {
      category: true,
    },
  });

  if (!product) {
    throw new Error("Product not found");
  }

  let returnedProduct: WithID<ProductType>;

  if (product.price === null) {
    returnedProduct = {
      ...product,
      price: undefined,
      images: product.images.map(
        (image) => JSON.parse(image) as WithID<ImageType>
      ),
      promotion: undefined,
      variants: product.variants.map((variant) =>
        JSON.parse(variant)
      ) as WithID<VariantType>[],

      category: {
        ...product.category,
        image: JSON.parse(product.category.image) as ImageType,
      },
    };
  } else {
    returnedProduct = {
      ...product,
      price: product.price,
      images: product.images.map(
        (image) => JSON.parse(image) as WithID<ImageType>
      ),
      promotion: product.promotion ? JSON.parse(product.promotion) : undefined,
      variants: undefined,

      category: {
        ...product.category,
        image: JSON.parse(product.category.image) as ImageType,
      },
    };
  }

  return returnedProduct;
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
  const category = await prismaClient.category.findUnique({
    where: {
      id: product.categoryID,
    },
  });

  if (!category) {
    throw new Error("Category not found");
  }

  const [_, productDB] = await prismaClient.$transaction([
    prismaClient.category.update({
      where: {
        id: product.categoryID,
      },
      data: {
        numProducts: {
          increment: 1,
        },
      },
    }),
    prismaClient.product.create({
      data: {
        category: {
          connect: {
            id: product.categoryID,
          },
        },
        id: product.id,
        name: product.name,
        price: product.price,
        intro: product.intro,
        description: product.description,
        mainImageID: product.mainImageID,
        images: product.images.map((image) => JSON.stringify(image)),
        promotion: product.promotion
          ? JSON.stringify(product.promotion)
          : undefined,
        variants: product.variants
          ? product.variants.map((variant) => JSON.stringify(variant))
          : [],
        link: `${product.id}`,
      },
    }),
  ]);

  let returnedProduct: WithID<ProductType>;

  if (productDB.price === null) {
    returnedProduct = {
      ...productDB,
      price: undefined,
      images: productDB.images.map(
        (image) => JSON.parse(image) as WithID<ImageType>
      ),
      promotion: undefined,
      variants: productDB.variants.map((variant) =>
        JSON.parse(variant)
      ) as WithID<VariantType>[],

      category: {
        ...category,
        image: JSON.parse(category.image) as ImageType,
      },
    };
  } else {
    returnedProduct = {
      ...productDB,
      price: productDB.price,
      images: productDB.images.map(
        (image) => JSON.parse(image) as WithID<ImageType>
      ),
      promotion: productDB.promotion
        ? JSON.parse(productDB.promotion)
        : undefined,
      variants: undefined,

      category: {
        ...category,
        image: JSON.parse(category.image) as ImageType,
      },
    };
  }

  return returnedProduct;
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
  const category = await prismaClient.category.findUnique({
    where: {
      id: product.categoryID,
    },
  });

  if (!category) {
    throw new Error("Category not found");
  }

  const productDB = await prismaClient.product.update({
    where: {
      id: product.id,
    },
    data: {
      id: product.id,
      name: product.name,
      price: product.price ? product.price : null,
      intro: product.intro,
      description: product.description,
      mainImageID: product.mainImageID,
      category: {
        connect: {
          id: product.categoryID,
        },
      },
      images: product.images.map((image) => JSON.stringify(image)),
      promotion: product.promotion ? JSON.stringify(product.promotion) : null,
      variants: product.variants
        ? product.variants.map((variant) => JSON.stringify(variant))
        : [],
    },
  });

  let returnedProduct: WithID<ProductType>;

  if (productDB.price === null) {
    returnedProduct = {
      ...productDB,
      price: undefined,
      images: productDB.images.map(
        (image) => JSON.parse(image) as WithID<ImageType>
      ),
      promotion: undefined,
      variants: productDB.variants.map((variant) =>
        JSON.parse(variant)
      ) as WithID<VariantType>[],

      category: {
        ...category,
        image: JSON.parse(category.image) as ImageType,
      },
    };
  } else {
    returnedProduct = {
      ...productDB,
      price: productDB.price,
      images: productDB.images.map(
        (image) => JSON.parse(image) as WithID<ImageType>
      ),
      promotion: productDB.promotion
        ? JSON.parse(productDB.promotion)
        : undefined,
      variants: undefined,
      category: {
        ...category,
        image: JSON.parse(category.image) as ImageType,
      },
    };
  }

  return returnedProduct;
};

/**********************************
 * deleteProduct
 * @param {id: string}
 */

export const deleteProduct = async (id: string) => {
  const product = await prismaClient.product.findUnique({
    where: {
      id,
    },
  });

  if (!product) {
    throw new Error("Product not found");
  }

  await prismaClient.$transaction([
    prismaClient.product.delete({
      where: {
        id,
      },
    }),
    prismaClient.category.update({
      where: {
        id: product.categoryID,
      },
      data: {
        numProducts: {
          decrement: 1,
        },
      },
    }),
  ]);
};
