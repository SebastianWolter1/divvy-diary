"use client";

import {
  getCurrentPushSubscription,
  registerPushNotifications,
  unregisterPushNotifications,
} from "@/notifications/pushService";
import { useState, useEffect } from "react";
import {useRouter} from "next/navigation";

export default function PushSubscriptionToggleButton() {
  const [hasActivePushSubscription, setHasActivePushSubscription] = useState();
const router = useRouter();
  useEffect(() => {
    async function getActivePushSubscription() {
      const subscription = await getCurrentPushSubscription();
      setHasActivePushSubscription(!!subscription);
    }
    getActivePushSubscription();
  }, []);

  async function setPushNotificationsEnabled(enabled) {
    try {
      if (enabled) {
        await registerPushNotifications();
      } else {
        await unregisterPushNotifications();
      }
      setHasActivePushSubscription(enabled);
      router.refresh();
    } catch (error) {
      console.error(error);
      if (enabled && Notification.permission === "denied") {
        alert("Please enable push notifications in your browser settings");
      } else {
        alert("Something went wrong. Please try again.");
      }
    }
  }

  // if (hasActivePushSubscription === undefined) return null;

  return (
    <div>
      {hasActivePushSubscription ? (
        <span title="Disable push notifications on this device">
          <button
            onClick={() => setPushNotificationsEnabled(false)}
            className="cursor-pointer"
          >
            Disable
          </button>
        </span>
      ) : (
        <span title="Enable push notifications on this device">
          <button
            onClick={() => setPushNotificationsEnabled(true)}
            className="cursor-pointer"
          >
            Enable
          </button>
        </span>
      )}
    </div>
  );
}
