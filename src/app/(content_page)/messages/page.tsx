import { getCustomerMessages } from "@/data/customerMessages";

import MessageList from "@/components/messages/MessageList";
import { itemsPerPage } from "@/config";
import ControlPanel from "@/components/messages/ControlPanel";

type Props = {
  searchParams?: {
    sortBy?: "name" | "createdAt" | "modifiedAt";
    order?: "asc" | "desc";
  };
};

export default async function MessagesPage({ searchParams }: Props) {
  const _sortBy = searchParams?.sortBy || "name";
  const _order = searchParams?.order || "asc";

  const { items, total } = await getCustomerMessages({
    offset: 0,
    limit: itemsPerPage,
    sortedBy: "createdAt",
    sortedOrder: "asc",
  });

  return (
    <div className="m-4">
      <ControlPanel
        initSortBy={_sortBy}
        initOrder={_order}
        sortByOptions={sortByOptions}
      />
      <MessageList initMessages={items} total={total} />
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
