import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getCurrentUser } from "@/app/dashboard/page";

export const DELETE = async (req) => {
  try {
    const user = await getCurrentUser(req);
    if (!user) {
      throw Error("No user found");
    }

    await prisma.user.update({
      where: { email: user.email },
      data: { subscriptions: null },
    });
    return new NextResponse(200, {
      message: "Subscription removed successfully",
    });
  } catch (error) {
    console.error(error);
    return new NextResponse(500, { error: error.message });
  }
};
