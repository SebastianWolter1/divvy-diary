import Link from "next/link";
import Image from "next/image";

const Navigation = ({ isLoggedIn }) => {
  return (
    <nav className="flex justify-between px-2 bg-gray-800 text-white">
      <div>
        <Link href="https://www.divvydiary.com/de">
          <Image src="/logo.svg" width={24} height={24} alt="divvyDiary" />
        </Link>
      </div>
      <div>
        {isLoggedIn ? (
          <Link href="/auth/logout">Logout</Link>
        ) : (
          <div className="flex">
            <Link className="px-2" href="/auth/login">
              Login
            </Link>
            <Link className="px-2" href="/auth/register">
              Register
            </Link>
          </div>
        )}
      </div>
      {isLoggedIn && (
        <div>
          {" "}
          <span>Welcome, User!</span>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
