import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const body = await request.json();
    const { isin, price, userId } = body;

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}${body.isin}`
    );
    if (!res.ok) {
      return null;
    }
    const result = await res.json();
    const stockPrice = result.price.toFixed(2);

    let initialPrice;
    if (stockPrice > body.price) {
      initialPrice = 'lower';
    } else if (stockPrice < body.price) {
      initialPrice = 'higher';
    } else {
      initialPrice = 'equal';
    }

    const priceAlarm = await prisma.priceAlarms.create({
      data: { isin, price, userId, initialPrice },
    });
    return NextResponse.json(priceAlarm);
  } catch (error) {
    console.log({ error });
  }
}
