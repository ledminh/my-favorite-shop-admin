import { MessagesRequest, MessagesResponse } from "@/types";

const getMessages = async (req: MessagesRequest) => {
  const { offset, limit, sortBy, order, searchTerm, filter } = req;

  const res = await fetch(
    `/api/messages?type=multiple${offset ? "&offset=" + offset : ""}${
      limit ? "&limit=" + limit : ""
    }&sortBy=${sortBy}&order=${order}${
      searchTerm ? "&searchTerm=" + searchTerm : ""
    }${filter ? "&filter=" + filter : ""}`
  );

  const { errorMessage, data } = (await res.json()) as MessagesResponse;

  if (errorMessage) {
    throw new Error(errorMessage);
  }

  if (!data) {
    throw new Error("No data returned");
  }

  return {
    messages: data.messages.map((order) => ({
      ...order,
      createdAt: new Date(order.createdAt),
    })),
    total: data.total,
  };
};

export default getMessages;
