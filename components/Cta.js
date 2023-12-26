/* eslint-disable react/no-unescaped-entities */
"use client";
import { signOut } from "next-auth/react";
import Link from 'next/link';

const Cta = ({ type }) => {
  const handleSignOut = async () => {
    await signOut({ callbackUrl: "http://localhost:3000" });
  };

  const buttonText = type === 'login' ? 'Already have an account?' : type === 'register' ? "Don't have an account?" : type === 'logout' ? 'Logout' : type === 'loginForm' ? 'Login' : type === 'registerForm' ? 'Register' : type === "submitForm" ? "Set alarm"  : null ;
  const buttonType = type.includes('Form') ? 'submit' : null;
  const buttonLink = type === 'login' ? '/auth/login' : type === 'register' ? '/auth/register' : null;
  const buttonColor = type.includes('Form') || type === 'logout' ? 'bg-orange-500 hover:bg-orange-600' : 'bg-orange-300 hover:bg-orange-400';
  const buttonAction = type === 'logout' ? handleSignOut : null;

  return (
    <button
      className={`${buttonColor} text-gray-200 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline`}
      type={buttonType}
      onClick={buttonAction}
    >
      {buttonType || type === 'logout' ? buttonText : <Link href={buttonLink}>{buttonText}</Link>}
    </button>
  );
};

export default Cta;