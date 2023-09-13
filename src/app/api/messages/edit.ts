import { NextRequest, NextResponse } from "next/server";

import { updateMessage } from "@/data/customerMessages";

import { CustomerMessageStatus } from "@/types";

export default async function edit(request: NextRequest) {
  const { id, status } = (await request.json()) as {
    id: string;
    status: CustomerMessageStatus;
  };

  const updatedMessage = await updateMessage(id, status);

  return NextResponse.json({
    data: {
      ...updatedMessage,
      createdAt: updatedMessage.createdAt.toISOString(),
    },
  });
}
