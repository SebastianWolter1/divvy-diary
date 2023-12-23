import Navigation from "@/components/Navigation";
import prisma from "@/lib/prisma";

const users = await prisma.user.findMany({
  where: {
    name: "Seb",
  },
  include: {
    userValues: true,
  },
});

console.log(users);

const Home = async () => {
  return (
    <>
      <div className="h-screen bg-gray-900 text-white">
        <main className="bg-gray-900 ">
          <Navigation />
          DivvyDiary
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

//     const addUser = await prisma.user.create({
//       data: {
//         name: "Seb",
//         email: "seb@s.de",
//       },
//     });

//     const existingUser = await prisma.user.findUnique({
//       where: {
//         id: "clqgwk61r000k9q188rmioy5h"
//       },
//     });

//     console.log(existingUser);

// if (existingUser) {
//       const newUserData = await prisma.userValue.create({
//         data: {
//           isin: 432,
//           price: 993,
//           userId: existingUser.id,
//         },
//       });
//     }
