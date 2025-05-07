import { ConversionRate } from "../types";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function saveRate(rate: ConversionRate) {
  return await prisma.conversionRate.create({
    data: {
      timestamp: rate.timestamp,
      totalAssets: rate.totalAssets,
      totalSupply: rate.totalSupply,
      rate: rate.rate,
    },
  });
}

export async function getRatesFrom(from: Date | null): Promise<ConversionRate[] | null>  {
  return await prisma.conversionRate.findMany({
    where: from ? { timestamp: { gte: from } } : undefined,
    orderBy: { timestamp: "asc" },
  });
}

export async function getAllRates(): Promise<ConversionRate[] | null>  {
  return await prisma.conversionRate.findMany({
    orderBy: { timestamp: 'asc' },
  });
}

export async function getLatestRate(): Promise<ConversionRate | null>  {
  return await prisma.conversionRate.findFirst({
    orderBy: { timestamp: 'desc' },
  });
}
