import { getServerSession } from "next-auth/next";
import prisma from "@/lib/prisma";
import Cta from "@/components/Cta";
import { authOptions } from "../api/auth/[...nextauth]/route";
import FetchStocks from "@/lib/fetchStocks";
import PriceAlarm from "@/components/PriceAlarms";
import React from "react";
import Serviceworker from "@/components/ServiceWorker";
import SubscribePush from "@/components/SubscribePush";

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
        <div className="bg-gray-800 h-screen p-6 text-white">
          <h3>You are currently not logged in!</h3>
          <Cta type="login" />
          <Cta type="register" />
        </div>
      </>
    );

  return (
    <>
      <div className="bg-gray-800 h-screen p-6 text-white">
        <SubscribePush />
        <h3>Name: {user.name}</h3>
        <p>Email: {user.email}</p>
        {user.userValues.length
          ? user.userValues.map((userValue) => (
              <React.Fragment key={userValue.id}>
                <ul>
                  <li>ISINUSER: {userValue.isin}</li>
                  <li>PriceUSER: {userValue.price}</li>
                </ul>
                <FetchStocks user={user} />
                <Serviceworker />
              </React.Fragment>
            ))
          : null}
        <Cta type="logout" />
        <PriceAlarm user={user} />
      </div>
    </>
  );
};

export default Dashboard;
