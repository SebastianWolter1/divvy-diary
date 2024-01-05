import Link from "next/link";
import Image from "next/image";
import { getCurrentUser } from "@/app/dashboard/page";
import Cta from "./Cta";

const Navigation = async () => {
  const user = await getCurrentUser();

  return (
    <nav className="flex justify-between items-center px-6 py-2 bg-gray-800 text-white">
      <div className="flex">
        <Link href="https://www.divvydiary.com/de">
          <div className="flex items-center">
            <Image src="/logo.svg" width={35} height={35} alt="divvyDiary" />
            <div className="ml-1 text-orange-400 hidden min-[420px]:block">DivvyDiary</div>
          </div>
        </Link>
      </div>
        {user?.name ? (
      <div className="justify-center hidden md:flex">
          <div className="inline-block text-center">
            <span className="text-xl text-white font-semibold">Welcome </span>

            <span className="text-2xl text-orange-500 font-semibold">
              {user.name}
            </span>
          </div>
      </div>
        ) : null}
      {user?.name ? (
        <div className="flex space-x-2 items-center">
          <Cta type="subscription" />
          <Cta type="logout" />
        </div>
      ) : null}
    </nav>
  );
};

export default Navigation;
