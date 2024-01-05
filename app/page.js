import prisma from "@/lib/prisma";
import Cta from "@/components/Cta";
import Image from "next/image";

const Home = async () => {
  return (
    <>
      <div className="h-screen bg-gray-800 text-white flex flex-col items-center justify-center px-2">
        <div className="text-left">
          <h1 className="text-4xl mb-2">
            <span className="block text-white">Preisalarme</span>
            <span className="block text-orange-500">für deine Aktien</span>
          </h1>
          <p className="mb-4">Lass dich einfach per Web Push benachrichtigen.</p>
        <div className="flex space-x-2 mb-4">
          <Cta type="login" />
          <Cta type="register" />
        </div>
        </div>
        {/* <div>
          <Image src="/logo.svg" width={24} height={24} alt="Random" />
        </div> */}
      </div>
    </>
  );
};

export default Home;
