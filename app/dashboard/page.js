import { getServerSession } from "next-auth/next";
import prisma from "@/lib/prisma";
import Cta from "@/components/Cta";
import { authOptions } from "../api/auth/[...nextauth]/route";
import FetchStocks from "@/lib/fetchStocks";
import PriceAlarm from "@/components/PriceAlarms";
export const dynamic = "force-dynamic";

const getCurrentUser = async () => {
  try {
    const session = await getServerSession(authOptions);
    console.log({ session });
    if (!session?.user?.email) return;
    const currentUser = await prisma.user.findUnique({
      where: { email: session.user.email },
      include: { userValues: true },
    });
    if (!currentUser) return;
    console.log({ currentUser });
    return currentUser;
  } catch (error) {
    return;
  }
};

let company = null;
const handleData = (data) => {

  company =  data;
  console.log(company.name);
  // return company
};

const Dashboard = async () => {
  const user = await getCurrentUser();
  console.log("rararara", user.userValues);




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
        <h3>Name: {user.name}</h3>
        <p>Email: {user.email}</p>
        {user.userValues.length ? (user.userValues.map((userValue) => (
          <ul key={userValue.id}>
            <li>ISIN: {userValue.isin}</li>
            <li>Price: {userValue.price}</li>
          </ul>
        ))): null}
        <Cta type="logout" />
        <FetchStocks onDataFetch={handleData} />

        {company && (
          <>
            <h2>{company.name}</h2>
            <p>{company.price}</p>
          </>
        )}
      </div>
      <PriceAlarm user={user}/>
    </>
  );
};

export default Dashboard;
