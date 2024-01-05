import Link from "next/link";
import Image from "next/image";
import { getCurrentUser } from "@/app/dashboard/page";
import Cta from "./Cta";

const Navigation = async () => {
  const user = await getCurrentUser();
  console.log({ user });

  return (
    <nav className="flex justify-between items-center p-2 bg-gray-800 text-white">
      <div className="flex-grow-0">
        <Link href="https://www.divvydiary.com/de">
          <Image src="/logo.svg" width={40} height={40} alt="divvyDiary" />
        </Link>
      </div>
      <div className="flex-grow flex justify-center">
        {user?.name ? (
          <div className="inline-block text-center">
            <span className="text-xl text-white font-bold">Welcome </span>

            <span className="text-2xl text-orange-500 font-bold">{user.name}</span>
          </div>
        ) : null}
      </div>
      <div className="flex-grow-0 flex space-x-2 items-center">
        {user?.name ? (
          <>
            <Cta type="logout" />
            <Cta type="subscription" />
          </>
        ) : null}
      </div>
    </nav>
  );
        }

export default Navigation;
