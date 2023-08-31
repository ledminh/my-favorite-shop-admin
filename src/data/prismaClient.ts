import { PrismaClient } from "@prisma/client";

let prisma: PrismaClient | null = null;

export default async function getClient() {
  if (!prisma) {
    prisma = new PrismaClient();
  }

  await prisma.$connect();

  return prisma;
}
