"use client";

import Select from "@/components/layout/Select";

type Props<SID, OID> = {
  sortByOptions: {
    id: SID;
    text: string;
    orderOptions: {
      id: OID;
      text: string;
    }[];
  }[];
  orderOptions: {
    id: OID;
    text: string;
  }[];
  setSortByID: (id: SID) => void;
  setOrderID: (id: OID) => void;
};

export default function Sorts<SID, OID>({
  sortByOptions,
  setSortByID,
  setOrderID,
  orderOptions,
}: Props<SID, OID>) {
  // Event handlers
  const sortByOnChange = (id: SID) => setSortByID(id as SID);

  const orderOnChange = (id: OID) => setOrderID(id as OID);

  return (
    <div className="flex justify-between">
      <div className="basis-[47%] flex flex-col gap-2 sm:flex-row">
        <label
          htmlFor="sortBy"
          className="hidden text-sm font-semibold sm:basis-1/3"
        >
          Sort by
        </label>
        <Select
          id="sortBy"
          options={sortByOptions}
          defaultValue={sortByOptions[0].id}
          onChange={sortByOnChange}
        />
      </div>
      <div className="basis-[47%] flex flex-col gap-2 sm:flex-row">
        <label
          htmlFor="order"
          className="hidden text-sm font-semibold sm:basis-1/3"
        >
          Order
        </label>
        <Select
          id="order"
          options={orderOptions}
          defaultValue={orderOptions[0].id}
          onChange={orderOnChange}
        />
      </div>
    </div>
  );
}
