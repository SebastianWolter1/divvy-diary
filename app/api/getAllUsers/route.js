import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const users = await prisma.user.findMany({
      include: { userValues: true },
    });

    return NextResponse.json(users);
  } catch (error) {
    return NextResponse.error({ status: 500 });
  }
}