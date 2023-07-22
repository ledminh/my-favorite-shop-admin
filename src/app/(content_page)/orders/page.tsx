import { getOrders } from "@/data/orders";
import OrderList from "@/components/orders/OrderList";
import ControlPanel from "@/components/orders/ControlPanel";

import { itemsPerPage } from "@/config";

type Props = {
  searchParams?: {
    sortBy?: "name" | "createdAt" | "modifiedAt";
    order?: "asc" | "desc";
  };
};

export default async function OrdersPage({ searchParams }: Props) {
  const _sortBy = searchParams?.sortBy || "name";
  const _order = searchParams?.order || "asc";

  const { items: initOrders, total } = await getOrders({
    offset: 0,
    limit: itemsPerPage,
    sortedOrder: "newest",
  });

  return (
    <div className="m-4">
      <ControlPanel
        initSortBy={_sortBy}
        initOrder={_order}
        sortByOptions={sortByOptions}
      />{" "}
      <OrderList initOrders={initOrders} total={total} />
    </div>
  );
}

/***********************
 * Data
 */

const sortByOptions: {
  id: "name" | "createdAt" | "modifiedAt";
  text: string;
  orderOptions: {
    id: "asc" | "desc";
    text: string;
  }[];
}[] = [
  {
    id: "name",
    text: "Name",
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
    id: "createdAt",
    text: "Create At",
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
