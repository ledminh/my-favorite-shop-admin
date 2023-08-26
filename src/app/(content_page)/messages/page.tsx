import { getCustomerMessages } from "@/data/customerMessages";

import MessageList from "@/components/messages/MessageList";
import { smallItemsPerPage } from "@/config";
import ControlPanel from "@/components/messages/ControlPanel";
import { CustomerMessageStatus } from "@/types";

type Props = {
  searchParams?: {
    filter?: CustomerMessageStatus;
    searchTerm?: string;
    sortBy?: "customer" | "email" | "createdAt";
    order?: "asc" | "desc";
  };
};

export default async function MessagesPage({ searchParams }: Props) {
  const _sortBy = searchParams?.sortBy || "createdAt"; //TODO
  const _order = searchParams?.order || "desc";
  const _searchTerm = searchParams?.searchTerm || "";
  const _filter = searchParams?.filter || null;

  const { items, total } = await getCustomerMessages({
    offset: 0,
    limit: smallItemsPerPage,
    sortedBy: _sortBy,
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
      <MessageList
        initMessages={items}
        total={total}
        sortedBy={_sortBy}
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
  id: "customer" | "email" | "createdAt";
  text: string;
  orderOptions: {
    id: "asc" | "desc";
    text: string;
  }[];
}[] = [
  {
    id: "customer",
    text: "Customer's name",
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

const filterOptions: {
  id: CustomerMessageStatus;
  text: string;
}[] = [
  {
    id: "unread",
    text: "Unread",
  },
  {
    id: "read",
    text: "Read",
  },
];
