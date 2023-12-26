import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const body = await request.json();
    console.log({ body });

    const { isin, price, userId } = body;
    const priceAlarm = await prisma.priceAlarms.create({
      data: { isin, price, userId },
    });
    return NextResponse.json(priceAlarm);
  } catch (error) {
    console.log({ error });
  }
}