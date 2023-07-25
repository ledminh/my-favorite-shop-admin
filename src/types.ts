import { FC, ReactNode } from "react";

export type Image = {
  src: string;
  alt: string;
};

export type ComponentWithChildren = FC<{ children: ReactNode }>;

/**********************
 * Category types
 */

export type Category = {
  name: string;
  description: string;
  link: string;
  image: Image;
  createdAt: Date;
  modifiedAt: Date;
};

/**********************
 * Product types
 */
export type Promotion =
  | {
      type: "discount";
      discountPercent: number;
      description: string;
    }
  | {
      type: "sale";
      salePrice: number;
      description: string;
    };

export type Variant = {
  id: string;
  name: string;
  image: Image;
  price: number;
  shown: boolean;
  promotion?: Promotion;
};

export type Product = {
  category: WithID<Category>;
  link: string;
  name: string;
  price: number;
  intro: string;
  description: string;
  mainImageID: string;
  images: WithID<Image>[];
  promotion?: Promotion;
  variants?: Variant[];
  createdAt: Date;
  modifiedAt: Date;
};

/**********************
 * Order types
 */

export type OrderedProduct = Product & {
  quantity: number;
  selectedVariant?: Variant;
};

export type ShippingAddress = {
  firstName: string;
  lastName: string;
  streetAddress: string;
  state: string;
  city: string;
  zip: string;
  phone: string;
  email: string;
};

export type PaymentInfo = {
  cardType: "Visa" | "MasterCard" | "American Express";
  lastFourDigits: string;
  expireDate: Date;
};

export type OrderStatus = "processing" | "shipped" | "delivered";

export type Order = {
  shippingAddress: ShippingAddress;
  orderedProducts: WithID<OrderedProduct>[];
  shippingFee: number;
  taxes: number;
  paymentInfo: PaymentInfo;
  status: OrderStatus;
  createdAt: Date;
};

/***********************
 * Customer Message
 */

export type CustomerMessageStatus = "unread" | "read";

export type CustomerMessage = {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  message: string;
  status: CustomerMessageStatus;
  createdAt: Date;
};

/***********************
 * WithID
 */
export type WithID<T> = T & { id: string };

/**********************
 * Server types
 */
type ServerResponse<T> =
  | {
      errorMessage?: undefined;
      data: T;
    }
  | {
      errorMessage: string;
      data?: undefined;
    };

export type DeleteMessageResponse = ServerResponse<WithID<CustomerMessage>>;
export type UpdateMessageResponse = ServerResponse<WithID<CustomerMessage>>;

export type DeleteOrderResponse = ServerResponse<WithID<Order>>;
export type UpdateOrderResponse = ServerResponse<WithID<Order>>;

export type AddNewCategoryResponse = ServerResponse<WithID<Category>>;
