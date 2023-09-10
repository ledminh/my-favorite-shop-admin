import { NextRequest, NextResponse } from "next/server";

import { CustomerMessage } from "@/types";

import { addMessage } from "@/data/customerMessages";

export default async function add(request: NextRequest) {
  const message = (await request.json()) as Omit<
    CustomerMessage,
    "status" | "createdAt"
  >;

  const newMessage = await addMessage({
    ...message,
    status: "unread",
  });

  return NextResponse.json({
    data: newMessage,
  });
}
