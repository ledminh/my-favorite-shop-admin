"use client";

import Select from "@/components/layout/Select";

export default function CategoryDropdown() {
  const categories = [
    { id: "1", text: "Category 1" },
    { id: "2", text: "Category 2" },
    { id: "3", text: "Category 3" },
    { id: "4", text: "Category 4" },
    { id: "5", text: "Category 5" },
    { id: "6", text: "Category 6" },
    { id: "7", text: "Category 7" },
    { id: "8", text: "Category 8" },
  ];

  const options = [{ id: "all", text: "All" }, ...categories];

  const onChange = (id: string) => {
    console.log(id);
  };

  return <Select options={options} defaultValue="all" onChange={onChange} />;
}
