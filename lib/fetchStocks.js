import { formatCurrency } from "@/lib/formatCurrency";

let previousUserValues = [];

const FetchStocks = ({ user }) => {
  if (JSON.stringify(user.userValues) === JSON.stringify(previousUserValues)) {
    return;
  }

  previousUserValues = user.userValues;
  
  const interval = setInterval(async () => {
    const fetchedData = await Promise.all(user.userValues.map(async (userValue) => {
      const res = await fetch(`https://api.divvydiary.com/symbols/${userValue.isin}`);
      if (!res.ok) {
        console.log(`Failed to fetch data for ISIN: ${userValue.isin}`);
        return null;
      }
      const data = await res.json();
      return { fetched: data, user: { ...userValue, subscriptions: user.subscriptions } };
    }));

    const validData = fetchedData.filter(item => item !== null);

    validData.forEach(async ({ fetched, user }) => {
      if (parseFloat(fetched.price.toFixed(2)) !== user.price) {

        const payload = {
          title: 'Price Alert',
          body: `The price for ${fetched.name} is now equal to ${formatCurrency(user.price)}.`,
        };
        await fetch('http://localhost:3000/api/send-push', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ subscription: user.subscriptions, payload }),
      
    });
    clearInterval(interval);
      }else{
        console.log(`The fetched price for ${fetched.name} is not equal to the user price`);
    clearInterval(interval);

      }
    });
  }, 1000 * 20); 

  return null;
};

export default FetchStocks;