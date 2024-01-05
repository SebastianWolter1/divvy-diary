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
import { useRouter } from 'next/navigation';

const Cta = ({ type }) => {
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

  const handleSignOut = async () => {
    await signOut({ callbackUrl: "http://localhost:3000" });
  };

  const buttonText =
    type === "login"
      ? "Already have an account?"
      : type === "register"
      ? "Don't have an account?"
      : type === "logout"
      ? "Logout"
      : type === "loginForm"
      ? "Login"
      : type === "registerForm"
      ? "Register"
      : type === "submitForm"
      ? "Set alarm"
      : type === "subscription"
      ? (hasActivePushSubscription ? "Disable Push" : "Enable Push")
      : null;
  const buttonType = type.includes("Form") ? "submit" : null;
  const buttonLink =
    type === "login"
      ? "/auth/login"
      : type === "register"
      ? "/auth/register"
      : null;
  const buttonColor =
    type.includes("Form") || type === "logout"
      ? "bg-orange-500 hover:bg-orange-600"
      : "bg-orange-400 hover:bg-orange-500";
  const buttonAction = 
    type === "logout" 
      ? handleSignOut 
      : type === "subscription"
      ? () => setPushNotificationsEnabled(!hasActivePushSubscription)
      : null;

  return (
    <button
      className={`${buttonColor} text-gray-200 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline`}
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