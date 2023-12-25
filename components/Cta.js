/* eslint-disable react/no-unescaped-entities */
"use client";

import { signOut } from "next-auth/react";
import Link from 'next/link';

const Cta = ({ type }) => {

  const handleSignOut = async () => {
    await signOut({ callbackUrl: "http://localhost:3000/auth/login" });
  };

  if (type === 'logout') {
    return (
      <button
        className="bg-orange-500 hover:bg-orange-600 text-gray-200 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        onClick={handleSignOut}
      >
        Log out
      </button>
    );
  }

  if (type === 'login') {
    return (
      <button
      className="bg-orange-300 hover:bg-orange-600 text-gray-200 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      
      >
       <Link href="/auth/login"> Already have an account? </Link>
      </button>
    );
  }

  if (type === 'register') {
    return (
      <button
      className="bg-orange-300 hover:bg-orange-600 text-gray-200 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      
      >
     <Link href="/auth/register">Don't have an account?</Link>
      </button>
    );
  }

  return null;
};

export default Cta;