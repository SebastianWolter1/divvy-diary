import { formatCurrency } from "@/utils/formatCurrency";
import { NextResponse } from "next/server";
export const dynamic = "force-dynamic";

export async function GET() {
  const comparePrices = async () => {
    const usersRes = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}api/getAllUsers`
    );
    const users = await usersRes.json();

    for (const user of users) {
      const fetchedData = await Promise.all(
        user.userValues.map(async (userValue) => {
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
              subscriptions: user.subscriptions,
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
        const userPrice = parseFloat(userData.price);
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
    }
  };
  try {
    const response = await comparePrices();
    return NextResponse.json({ response, status: 200 });
  } catch (error) {
    return NextResponse.error({ status: 500 });
  }
}
