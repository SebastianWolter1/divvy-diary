import { getServerSession } from "next-auth/next";
import prisma from "@/lib/prisma";
import Cta from "@/components/Cta";
import { authOptions } from "../api/auth/[...nextauth]/route";
import FetchStocks from "@/lib/fetchStocks";
import PriceAlarm from "@/components/PriceAlarms";
import React from "react";
import Serviceworker from "@/components/ServiceWorker";

export const getCurrentUser = async () => {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) return;
    const currentUser = await prisma.user.findUnique({
      where: { email: session.user.email },
      include: { userValues: true },
    });
    if (!currentUser) return;
    return currentUser;
  } catch (error) {
    return;
  }
};

const Dashboard = async () => {
  const user = await getCurrentUser();

  if (!user)
  return (
    <>
      <div className="bg-gray-900 h-screen p-6 text-white flex flex-col items-center justify-start space-y-4">
        <h3 className="mb-4 text-xl font-bold text-center">Du bist nicht eingeloggt...</h3>
        <Cta type="login" className="mb-2" />
        <Cta type="register" />
      </div>
    </>
  );

  return (
    <>
      <div className="bg-gray-900 h-screen p-6 text-white">
        <Serviceworker />
        {user?.name ? (
      <div className="justify-center flex md:hidden">
          <div className="inline-block text-center">
            <span className="text-xl text-white font-semibold">Welcome </span>

            <span className="text-2xl text-orange-500 font-semibold">
              {user.name}
            </span>
          </div>
      </div>
        ) : null}
        {user.userValues.length
          ? user.userValues.map((userValue) => (
              <React.Fragment key={userValue.id}>
                <ul>
                  <li>ISINUSER: {userValue.isin}</li>
                  <li>PriceUSER: {userValue.price}</li>
                  <Cta type="deleteForm" id={userValue.id} />
                </ul>
                <FetchStocks user={user} />
              </React.Fragment>
            ))
          : null}
        <PriceAlarm user={user} />
      </div>
    </>
  );
};

export default Dashboard;
