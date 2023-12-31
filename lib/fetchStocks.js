// "use client"

// import { useState, useEffect } from 'react';

// const FetchStocks = ({ userValues }) => {
//   const [databasePrice, setDatabasePrice] = useState(userValues[0].price);
//   const [conditionMet, setConditionMet] = useState(false);

//   useEffect(() => {
//     const fetchStockData = async () => {
//       return await (userValues.map(async (userValue) => {
//         const res = await fetch(`https://api.divvydiary.com/symbols/${userValue.isin}`);

//         if (!res.ok) {
//           console.log(`Failed to fetch data for ISIN: ${userValue.isin}`);
//           return null;
//         }

//         const data = await res.json();
//         console.log(data.price);

//         return { fetched: data, user: userValue };
//       }));
//     };
//     fetchStockData();

//     // const checkCondition = async () => {
//     //   while (true) {
//     //     const fetchedData = await fetchStockData();
//     //     for (let stockData of fetchedData) {
//     //       const currentPrice = stockData.fetched.price;

//     //       if (currentPrice === databasePrice) {
//     //         setConditionMet(true);
//     //         break; // Exit the loop when the condition is met
//     //       }
//     //     }

//     //     // Wait for a short delay before the next iteration
//     //     await new Promise(resolve => setTimeout(resolve, 1000)); // 1 second delay
//     //   }
//     // };

//     // checkCondition();
//   }, [databasePrice, userValues]);

//   return (
//     <div>
//       {conditionMet ? (
//         <p>Condition met!</p>
//       ) : (
//         <p>Waiting for the condition to be met...</p>
//       )}
//     </div>
//   );
// };

// export default FetchStocks;


// import useSWR from 'swr';
// // import { useState } from 'react';

// // Add some delay here.
// const fetcher = (url) =>
//   fetch(url, {mode: 'no-cors'})
//     .then((res) => res.json())
//     .then((data) => {
//       console.log(data);
//       return data;
//     });

// function FetchStocks({ userValues }) {
//   const STOCK_API = `https://api.divvydiary.com/symbols/`;

//   // const [data2, setData2] = useState(null);

//   const { data, isLoading, isValidating } = useSWR(STOCK_API, fetcher, {
//     // 3s polling.
//     refreshInterval: 3000
//   });
//   // setData2(data);
// console.log(data)
//   // If it's still loading the initial data, there is nothing to display.
//   // We return a skeleton here.
//   // if (isLoading) return <div className="skeleton" />;

//   // Compare fetched price with user price
//   userValues.forEach((userValue) => {
//     if (data > userValue.price) {
//       console.log('The fetched price is higher than the user price', userValue.isin);
//     } else if (data < userValue.price) {
//       console.log('The fetched price is lower than the user price', userValue.isin);
//     } else {
//       console.log('The fetched price is equal to the user price', userValue.isin);
//     }
//   });

//   // Otherwise, display the data and a spinner that indicates a background
//   // revalidation.
//   return (
//     <>
//       <div>${data}</div>
//       {/* {isValidating ? <div className="spinner" /> : null} */}
//     </>
//   );
// }

// export default FetchStocks;

let previousUserValues = [];

const FetchStocks = ({ userValues }) => {
  if (JSON.stringify(userValues) === JSON.stringify(previousUserValues)) {
    return;
  }

  previousUserValues = userValues;

  setInterval(async () => {
    const fetchedData = await Promise.all(userValues.map(async (userValue) => {
      const res = await fetch(`https://api.divvydiary.com/symbols/${userValue.isin}`);

      if (!res.ok) {
        console.log(`Failed to fetch data for ISIN: ${userValue.isin}`);
        return null;
      }

      const data = await res.json();
      // console.log(data.price);

      return { fetched: data, user: userValue };
    }));

    const validData = fetchedData.filter(item => item !== null);

    validData.forEach(({ fetched, user }) => {
      // console.log(parseFloat(fetched.price.toFixed(2)), user.price);
      if (parseFloat(fetched.price.toFixed(2)) === user.price) {
       console.log(`The fetched price for ${fetched.name} is equal to the user price`);
      }else{
        console.log(`The fetched price for ${fetched.name} is not equal to the user price`);
      }
    });
  }, 1000 * 20); 

  return null;
};

export default FetchStocks;