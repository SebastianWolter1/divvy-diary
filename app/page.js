import Navigation from "@/components/Navigation";
import prisma from "@/lib/prisma";

const Home = async () => {


    const addUser = await prisma.user.create({
      data: {
        name: "Seb",
        email: "seb@s.de",
      },
    });



    const existingUser = await prisma.user.findUnique({
      where: { 
        id: "clqgwk61r000k9q188rmioy5h"
      },
    });

    console.log(existingUser);

if (existingUser) {
      const newUserData = await prisma.userValue.create({
        data: {
          isin: 432, 
          price: 993, 
          userId: existingUser.id,
        },
      });
    }


  const users = await prisma.user.findMany({
    where: {
      name: "Seb",
    },
  });
console.log(users);

  return (
    <>
      <div className="h-screen bg-gray-900">
        <main className="bg-gray-900 text-white">
          <Navigation />
          DivvyDiary
        </main>
        <ul>
        {users ? (users.map((user) => (
          <li key={user.id}>
            <p>Name: {user.name}</p>
            <p>Email: {user.email}</p>
          </li>
        ))):null}
      </ul>
      </div>
    </>
  );
}

export default Home;