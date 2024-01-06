import { formatCurrency } from "@/lib/formatCurrency";

let previousUserValues = [];

const FetchStocks = ({ user }) => {
  if (JSON.stringify(user.userValues) === JSON.stringify(previousUserValues)) {
    return;
  }
  

  previousUserValues = user.userValues;

  
  const interval = setInterval(async () => {
    // console.log(user)
    let newUserValues = [...user.userValues];
    console.log("16", newUserValues)
    const fetchedData = await Promise.all(newUserValues.map(async (userValue) => {
      const res = await fetch(`https://api.divvydiary.com/symbols/${userValue.isin}`);
      if (!res.ok) {
        return null;
      }
      const data = await res.json();
      return { fetched: data, user: { ...userValue, subscriptions: user.subscriptions } };
    }));
  
    const validData = fetchedData.filter(item => item !== null);

  
    validData.forEach(async ({ fetched, user }) => {
      if (parseFloat(fetched.price.toFixed(2)) === parseFloat(user.price.replace(',', '.'))) {
        console.log(typeof user.price)
        const payload = {
          title: 'Preis Alarm',
          body: `${fetched.name} hat deinen Preis von ${formatCurrency(user.price)} erreicht.`,
        };
        await fetch('http://localhost:3000/api/send-push', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ subscription: user.subscriptions, payload }),
        });
        // Remove the userValue from newUserValues
        newUserValues = newUserValues.filter(value => value.isin !== user.isin || (value.isin === user.isin && value.price !== parseFloat(user.price.replace(',', '.'))));
        console.log("newvalues", newUserValues)
      } else {
        console.log('No match', fetched.name, fetched.price.toFixed(2));
      }
    });
  
    // Replace user.userValues with the modified newUserValues
    user.userValues = newUserValues;
    console.log("u53", user.userValues)
  }, 1000 * 20);
  
  return null;
};

export default FetchStocks;