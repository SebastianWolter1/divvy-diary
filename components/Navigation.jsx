import Link from "next/link";
import Image from "next/image";
import { getCurrentUser } from "@/app/dashboard/page";
import Cta from "./Cta";
import ThemeSwitcher from "./ThemeSwitcher";

const Navigation = async () => {
  const user = await getCurrentUser();

  return (
    <nav className="flex justify-between items-center px-6 py-2 bg-gray-700 dark:bg-gray-800 text-white">
      <div className="flex">
        <Link href="https://www.divvydiary.com/de" rel="noopener noreferrer" target="_blank">
          <div className="flex items-center">
            <Image src="/logo.svg" width={35} height={35} alt="divvyDiary" />
            <div className="ml-1 text-orange-400 hidden min-[430px]:block">
              DivvyDiary
            </div>
          </div>
        </Link>
      </div>
      {user?.name ? (
        <div className="justify-center hidden md:flex">
          <div className="inline-block text-center">
             <Link href="/dashboard">
            <span className="text-xl text-gray-300 dark:text-white font-semibold">
              Willkommen{" "}
            </span>
            <span className="text-2xl text-orange-500 font-semibold">
             {user.name}
            </span>
             </Link> 
          </div>
        </div>
      ) : null}
      <ThemeSwitcher />
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
