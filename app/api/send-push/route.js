import { NextResponse } from "next/server";
import webpush from "web-push";

const vapidKeys = {
  publicKey: process.env.NEXT_PUBLIC_WEB_PUSH_PUBLIC_KEY,
  privateKey: process.env.WEB_PUSH_PRIVATE_KEY,
};

webpush.setVapidDetails(
  "mailto:seb@techtakel.berlin",
  vapidKeys.publicKey,
  vapidKeys.privateKey
);

export const POST = async (req) => {
  try {
    const { subscription, payload } = await req.json();

    if (!subscription || !payload) {
      throw Error("No subscription or payload received");
    }

    await webpush.sendNotification(subscription, JSON.stringify(payload));
    return new NextResponse(200, { message: "Notification sent successfully" });
  } catch (error) {
    console.error(error);
    return new NextResponse(500, { error: error.message });
  }
};
