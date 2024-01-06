import { getServerSession } from "next-auth/next";
import prisma from "@/lib/prisma";
import Cta from "@/components/Cta";
import { authOptions } from "../api/auth/[...nextauth]/route";
import FetchStocks from "@/lib/fetchStocks";
import PriceAlarm from "@/components/PriceAlarms";
import React from "react";
import Serviceworker from "@/components/ServiceWorker";
import { formatCurrency } from "@/lib/formatCurrency";

export const getCurrentUser = async () => {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) return;
    const currentUser = await prisma.user.findUnique({
      where: { email: session.user.email },
      include: { userValues: true },
    });
    console.log(currentUser);
    if (!currentUser) return;
    return currentUser;
  } catch (error) {
    return;
  }
};

const getStockName = async (isin) => {
  const res = await fetch(`https://api.divvydiary.com/symbols/${isin}`);
  const data = await res.json();
  return data.name;
};

const Dashboard = async () => {
  const user = await getCurrentUser();

  if (!user)
    return (
      <>
        <div className="bg-gray-900 h-screen p-6 text-white flex flex-col items-center justify-start space-y-4">
          <h3 className="mb-4 text-xl font-bold text-center">
            Du bist nicht eingeloggt...
          </h3>
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
          <div className="justify-center flex md:hidden mb-4">
            <div className="inline-block text-center">
              <span className="text-2xl text-white font-semibold">
                Welcome{" "}
              </span>

              <span className="text-3xl text-orange-500 font-semibold">
                {user.name}
              </span>
            </div>
          </div>
        ) : null}
        <div className="bg-gray-900 ">
          <div className="mx-auto mt-16 w-full">
            <div className="inline-block min-w-full rounded-lg bg-gray-700 max-w-full">
              <div className="flex items-center py-12 px-4">
                <div className="w-full">
                  <h2 className="my-6 text-center text-3xl font-bold leading-9 text-white mb-4">
                    Deine Preisalarme
                  </h2>
                  <div className="text-center grid grid-cols-3 gap-2 text-white font-bold mb-4 mt-12">
  <p>Name</p>
  <p>Preis</p>
  
</div>
{user.userValues.length
  ? user.userValues.map(async (userValue, index) => {
      const stockName = await getStockName(userValue.isin);
      return (
        <React.Fragment key={userValue.id}>
          <div
            className={`text-center w-full grid grid-cols-3 gap-2 items-center rounded text-white mb-2 ${
              index % 2 === 0 ? "bg-gray-800" : ""
            }`}
          >
            <div>
              <p className="text-orange-600">{stockName}</p>
              <p className="text-[10px]">{userValue.isin}</p>
            </div>
            <p className="text-xs">{formatCurrency(userValue.price)}</p>
            <div>
              <Cta type="deleteForm" id={userValue.id} />
            </div>
          </div>
          <FetchStocks user={user} />
        </React.Fragment>
      );
    })
  : null}
                </div>
              </div>
            </div>
          </div>
        </div>
        <PriceAlarm user={user} />
      </div>
    </>
  );
};

export default Dashboard;
