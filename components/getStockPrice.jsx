import { formatCurrency } from "@/utils/formatCurrency";

const GetStockPrice = async ({ user }) => {
  if (!user) return;

  const comparePrices = async () => {
    const updatedUserRes = await fetch(
      `${process.env.BASE_URL}api/getUpdatedUser/${user.id}`
    );
    const updatedUser = await updatedUserRes.json();

    const fetchedData = await Promise.all(
      updatedUser.userValues.map(async (userValue) => {
        const res = await fetch(
          `${process.env.API_URL}${userValue.isin}`
        );
        if (!res.ok) {
          return null;
        }
        const data = await res.json();
        return {
          fetched: data,
          user: {
            ...userValue,
            subscriptions: updatedUser.subscriptions,
            pushed: userValue.pushed,
          },
        };
      })
    );

    const validData = fetchedData.filter((item) => item !== null);

    for (const { fetched, user } of validData) {
      if (
        parseFloat(fetched.price.toFixed(2)) ===
          parseFloat(user.price.replace(",", ".")) &&
        user.pushed === false
      ) {
        const payload = {
          title: "Preis Alarm",
          body: `${fetched.name} hat deinen Preis von ${formatCurrency(
            user.price
          )} erreicht.`,
        };
        await fetch(`${process.env.BASE_URL}api/send-push`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ subscription: user.subscriptions, payload }),
        });
        await fetch(`${process.env.BASE_URL}api/updateAlarm`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id: user.id }),
        });
      } 
    }

    setTimeout(comparePrices, 1000 * 60);
  };
  comparePrices();

  return null;
};

export default GetStockPrice;
