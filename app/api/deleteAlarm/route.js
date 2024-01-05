import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function DELETE(request) {
  try {
    const body = await request.json();
    const { id } = body;
    const priceAlarm = await prisma.priceAlarms.delete({
      where: { id },
    });
    return NextResponse.json(priceAlarm);
  } catch (error) {
    console.log({ error });
  }
}
