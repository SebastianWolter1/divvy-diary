import { getCurrentUser } from "@/app/dashboard/page";
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export const POST = async (req) => {
  try {
    const newSubscription = await req.json();
    if (!newSubscription) {
      throw Error("No subscription received");
    }

    const user = await getCurrentUser();

    if (user) {
      await prisma.user.update({
        where: { email: user.email },
        data: { subscriptions: newSubscription },
      });
      return new NextResponse(200, {
        message: "Subscription updated successfully",
      });
    } else {
      return new NextResponse(400, { error: "No user found" });
    }
  } catch (error) {
    console.error(error);
    return new NextResponse(500, { error: error.message });
  }
};
