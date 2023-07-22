import { getCustomerMessages } from "@/data/customerMessages";

import MessageList from "@/components/messages/MessageList";
import { itemsPerPage } from "@/config";
import ControlPanel from "@/components/messages/ControlPanel";

type Props = {
  searchParams?: {
    sortBy?: "firstName" | "lastName" | "createdAt" | "email";
    order?: "asc" | "desc";
  };
};

export default async function MessagesPage({ searchParams }: Props) {
  const _sortBy = searchParams?.sortBy || "createdAt";
  const _order = searchParams?.order || "asc";

  const { items, total } = await getCustomerMessages({
    offset: 0,
    limit: itemsPerPage,
    sortedBy: _sortBy,
    sortedOrder: _order,
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
  id: "firstName" | "lastName" | "createdAt" | "email";
  text: string;
  orderOptions: {
    id: "asc" | "desc";
    text: string;
  }[];
}[] = [
  {
    id: "firstName",
    text: "First name",
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
    id: "lastName",
    text: "Last name",
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
    id: "email",
    text: "Email",
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
];
