import { getServerSession } from "next-auth/next";
import prisma from "@/lib/prisma";
import Link from "next/link";
import Cta from '@/components/Cta';
import { authOptions } from "../api/auth/[...nextauth]/route";
export const dynamic = 'force-dynamic';



const getCurrentUser = async () => {
  try {
    const session = await getServerSession(authOptions);
    console.log({ session });
    if (!session?.user?.email) return;
    const currentUser = await prisma.user.findUnique({
      where: { email: session.user.email },
    });
    if (!currentUser) return;
    console.log({ currentUser });
    return currentUser;
  } catch (error) {
    return;
  }
};



const Dashboard = async () => {
  const user = await getCurrentUser();
  console.log({ user });

  if (!user)
    return (
      <>
        <div className="bg-gray-800 h-screen p-6 text-white">
          <h3>You are currently not logged in!</h3>
          {/* <Link href="/auth/login">Login to my account</Link> */}
          <Cta type="login" />
        </div>
      </>
    );

  return (
    <>
      <div className="bg-gray-800 h-screen p-6 text-white">
        <h3>Name: {user.name}</h3>
        <p>Email: {user.email}</p>
        <Cta type="logout" />

      </div>
    </>
  );
};

export default Dashboard;
