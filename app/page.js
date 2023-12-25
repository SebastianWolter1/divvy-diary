import Navigation from "@/components/Navigation";
import prisma from "@/lib/prisma";

const users = await prisma.user.findMany({
  where: {
    name: "Test",
  },
  include: {
    userValues: true,
  },
});

console.log(users);

const Home = async () => {
  return (
    <>
      <div className="h-screen bg-gray-800 text-white">
        <main className="">
        
        </main>
        {users
          ? users.map((user) => (
              <ul key={user.id}>
                <li>Name: {user.name}</li>
                <li>Email: {user.email}</li>
                <ul>
                  {user.userValues.map((userValue) => (
                    <ul key={userValue.id}>
                      <li>ISIN: {userValue.isin}</li>
                      <li>Price: {userValue.price}</li>
                    </ul>
                  ))}
                </ul>
              </ul>
            ))
          : null}
      </div>
    </>
  );
};

export default Home;
