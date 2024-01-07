/* eslint-disable react/no-unescaped-entities */
"use client";
import { signOut } from "next-auth/react";
import Link from "next/link";
import {
  getCurrentPushSubscription,
  registerPushNotifications,
  unregisterPushNotifications,
} from "@/notifications/pushService";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const Cta = ({ type, id }) => {
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

  async function deleteAlarm() {
    await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}api/deleteAlarm`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: id }),
    });
    router.refresh();
  }

  const handleSignOut = async () => {
    await signOut({ callbackUrl: "http://localhost:3000" });
  };

  const buttonText =
    type === "login"
      ? "Login mit bestehendem Account"
      : type === "register"
      ? "Erstelle einen Account"
      : type === "logout"
      ? "Logout"
      : type === "loginForm"
      ? "Login"
      : type === "registerForm"
      ? "Account erstellen"
      : type === "submitForm"
      ? "Preisalarm erstellen"
      : type === "deleteForm"
      ? "löschen"
      : type === "subscription"
      ? hasActivePushSubscription
        ? "Push Nachrichten deaktivieren"
        : "Push Nachrichten aktivieren"
      : null;
  const buttonType = type.includes("Form") ? "submit" : null;
  const buttonLink =
    type === "login"
      ? "/auth/login"
      : type === "register"
      ? "/auth/register"
      : null;
  const buttonColor =
    type === "loginForm" ||
    type === "registerForm" ||
    type === "submitForm" ||
    (type === "subscription" && !hasActivePushSubscription)
      ? "bg-orange-700 hover:bg-orange-600 dark:bg-orange-600 dark:hover:bg-orange-500"
      : type === "deleteForm" ||
        type === "logout" ||
        (type === "subscription" && hasActivePushSubscription)
      ? "bg-orange-600 hover:bg-orange-700 dark:bg-orange-700 dark:hover:bg-orange-800"
      : "bg-orange-600 hover:bg-orange-500 dark:bg-orange-500 dark:hover:bg-orange-400";
  const buttonAction =
    type === "logout"
      ? handleSignOut
      : type === "subscription"
      ? () => setPushNotificationsEnabled(!hasActivePushSubscription)
      : type === "deleteForm"
      ? deleteAlarm
      : null;

  return (
    <button
      className={`${buttonColor} text-gray-300 dark:text-white my-2 text-xs md:text-sm  font-medium py-2 md:px-4 px-2 rounded-lg focus:outline-none focus:shadow-outline`}
      type={buttonType}
      onClick={buttonAction}
    >
      {buttonType || type === "logout" || type === "subscription" ? (
        buttonText
      ) : (
        <Link href={buttonLink}>{buttonText}</Link>
      )}
    </button>
  );
};

export default Cta;
