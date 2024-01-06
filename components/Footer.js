import React from "react";
import Link from "next/link";

const Footer = () => {
  return (
    <>
      <footer className="flex justify-around text-gray-400 py-2 bg-gray-800 fixed bottom-0 w-full">
        <Link href="https://github.com/SebastianWolter1" className="hover:text-gray-200">
          {" "}
          © 2024 Sebastian Wolter
        </Link>
        <Link href="/" className="hover:text-gray-200">Home</Link>
      </footer>
    </>
  );
};

export default Footer;
