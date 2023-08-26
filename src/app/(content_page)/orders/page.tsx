import { getOrders } from "@/data/orders";
import OrderList from "@/components/orders/OrderList";
import ControlPanel from "@/components/orders/ControlPanel";

import { smallItemsPerPage } from "@/config";
import { OrderStatus } from "@/types";

type Props = {
  searchParams?: {
    filter?: OrderStatus;
    searchTerm?: string;
    sortBy?: "customer" | "price" | "createdAt" | "modifiedAt";
    order?: "asc" | "desc";
  };
};

export default async function OrdersPage({ searchParams }: Props) {
  const _sortBy = searchParams?.sortBy || "createdAt"; //TODO
  const _order = searchParams?.order || "desc";
  const _searchTerm = searchParams?.searchTerm || "";

  const _filter = searchParams?.filter || null;

  const { items: initOrders, total } = await getOrders({
    offset: 0,
    limit: smallItemsPerPage,
    sortBy: _sortBy,
    sortedOrder: _order,
    searchTerm: _searchTerm,
    filter: _filter,
  });

  return (
    <div className="m-4">
      <ControlPanel
        initSortBy={_sortBy}
        initOrder={_order}
        initSearchTerm={_searchTerm}
        sortByOptions={sortByOptions}
        filterOptions={filterOptions}
        initFilterID={_filter}
      />
      <OrderList
        initOrders={initOrders}
        total={total}
        sortBy={_sortBy}
        sortedOrder={_order}
        searchTerm={_searchTerm}
        filter={_filter}
      />
    </div>
  );
}

/***********************
 * Data
 */

const sortByOptions: {
  id: "customer" | "price" | "createdAt" | "modifiedAt";
  text: string;
  orderOptions: {
    id: "asc" | "desc";
    text: string;
  }[];
}[] = [
  {
    id: "customer",
    text: "Customer's Name",
    orderOptions: [
      {
        id: "asc",
        text: "A to Z",
      },
      {
        id: "desc",
        text: "Z to A",
      },
    ],
  },
  {
    id: "price",
    text: "Price",
    orderOptions: [
      {
        id: "asc",
        text: "Lowest to Highest",
      },
      {
        id: "desc",
        text: "Highest to Lowest",
      },
    ],
  },
  {
    id: "createdAt",
    text: "Created At",
    orderOptions: [
      {
        id: "asc",
        text: "Oldest to Newest",
      },
      {
        id: "desc",
        text: "Newest to Oldest",
      },
    ],
  },
  {
    id: "modifiedAt",
    text: "Modified At",
    orderOptions: [
      {
        id: "asc",
        text: "Oldest to Newest",
      },
      {
        id: "desc",
        text: "Newest to Oldest",
      },
    ],
  },
];

const filterOptions: {
  id: OrderStatus;
  text: string;
}[] = [
  {
    id: "processing",
    text: "Processing",
  },
  {
    id: "shipped",
    text: "Shipped",
  },
  {
    id: "delivered",
    text: "Delivered",
  },
];
