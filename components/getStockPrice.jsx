import { formatCurrency } from "@/utils/formatCurrency";

const GetStockPrice = async ({ user }) => {
  if (!user) return;

  const comparePrices = async () => {
    const updatedUserRes = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}api/getUpdatedUser/${user.id}`
    );
    const updatedUser = await updatedUserRes.json();

    const fetchedData = await Promise.all(
      updatedUser.userValues.map(async (userValue) => {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}${userValue.isin}`
        );
        if (!res.ok) {
          return null;
        }
        const data = await res.json();
        return {
          fetched: data,
          userData: {
            ...userValue,
            subscriptions: updatedUser.subscriptions,
            pushed: userValue.pushed,
            initialPrice: userValue.initialPrice,
          },
        };
      })
    );

    const validData = fetchedData.filter((item) => item !== null);

    for (const { fetched, userData } of validData) {
      if (userData.pushed) {
        continue;
      }
      const fetchedPrice = parseFloat(fetched.price.toFixed(2));
      const userPrice = parseFloat(userData.price.replace(",", "."));
      if (
        (userData.initialPrice === "lower" && fetchedPrice <= userPrice) ||
        (userData.initialPrice === "higher" && fetchedPrice >= userPrice) ||
        (userData.initialPrice === "equal" && fetchedPrice === userPrice)
      ) {
        const payload = {
          title: "Preis Alarm",
          body: `${fetched.name} hat deinen Preis von ${formatCurrency(
            userData.price
          )} erreicht.`,
        };
        await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}api/send-push`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            subscription: userData.subscriptions,
            payload,
          }),
        });
        await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}api/updateAlarm`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id: userData.id }),
        });
      }
    }

    setTimeout(comparePrices, 1000 * 60);
  };
  comparePrices();

  return null;
};

export default GetStockPrice;
