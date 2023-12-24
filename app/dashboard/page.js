import { getServerSession } from "next-auth/next";
import prisma from "@/lib/prisma";
import Link from "next/link";
import LogoutButton from "@/components/LogoutButton";
import { authOptions } from "../api/auth/[...nextauth]/route";

const getCurrentUser = async () => {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) return;
    const currentUser = await prisma.user.findUnique({
      where: { email: session.user.email },
    });
    if (!currentUser) return;
    return currentUser;
  } catch (error) {
    return;
  }
};

const Dashboard = async () => {
  const user = await getCurrentUser();
  setTimeout(() => {}, 1000);

  if (!user)
    return (
      <>
        <h3>You are currently not logged in!</h3>
        <Link href="/auth/login">Login to my account</Link>
      </>
    );

  return (
    <>
      <div className="bg-gray-800 h-screen p-6 text-white">
        <h3>Name: {user.name}</h3>
        <p>Email: {user.email}</p>
        <LogoutButton />
      </div>
    </>
  );
};

export default Dashboard;
