import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request) {

  if (!request || !request.nextUrl) {
    return NextResponse.error({ status: 400, message: 'Bad Request' });
  }

  try {
    const id = request.nextUrl.pathname.split('/').pop();

    const user = await prisma.user.findUnique({
      where: { id },
      include: { userValues: true }
    });

    if (!user) {
      return NextResponse.error({ status: 404 });
    }

    return NextResponse.json(user);
  } catch (error) {
    return NextResponse.error({ status: 500 });
  }
}