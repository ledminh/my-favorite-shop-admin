import { NextRequest, NextResponse } from "next/server";

import { deleteMessage } from "@/data/customerMessages";

export default async function del(request: NextRequest) {
  const { id } = await request.json();

  const oldMessage = await deleteMessage(id);

  return NextResponse.json({
    data: oldMessage,
  });
}
