"use client";

import OrderMessList from "@/components/layout/OrderMessList";
import MessageTab from "@/components/MessageTab";
import MessageModal from "@/components/modals/Message";
import useMessageList from "./hooks";

import { Props } from "./types";

export default function MessageList(props: Props) {
  const { total } = props;
  const { _initMessages, onLoadMore, afterDelete, afterUpdate } =
    useMessageList(props);

  return (
    <OrderMessList
      initItems={_initMessages}
      total={total}
      onLoadMore={onLoadMore}
      afterDelete={afterDelete}
      afterUpdate={afterUpdate}
      ItemTab={MessageTab}
      ItemModal={MessageModal}
    />
  );
}
