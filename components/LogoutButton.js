"use client";

import { signOut } from "next-auth/react";

const LogoutButton = () => {
  const handleSignOut = async () => {
    await signOut({ callbackUrl: "http://localhost:3000/auth/login" });
  };

  return (
    <button
      className="bg-orange-500 hover:bg-orange-600 text-gray-200 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      onClick={handleSignOut}
    >
      Log out
    </button>
  );
};

export default LogoutButton;
