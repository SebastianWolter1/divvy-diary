import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function PUT(request) {
  try {
    const body = await request.json();
    const { id } = body;
    const priceAlarm = await prisma.priceAlarms.update({
        where: {id}, 
      data: { pushed: true },
    });
    return NextResponse.json(priceAlarm);
  } catch (error) {
    console.log({ error });
  }
}