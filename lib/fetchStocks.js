import React from "react";


let previousUserValues = [];

const FetchStocks = async ({ userValues }) => {
  if (JSON.stringify(userValues) === JSON.stringify(previousUserValues)) {
    return;
  }

  previousUserValues = userValues;


    const fetchedData = await Promise.all(userValues.map(async (userValue) => {

      const res = await fetch(`https://api.divvydiary.com/symbols/${userValue.isin}`, {
        cache: "no-cache",
      });

      if (!res.ok) {
        console.log(`Failed to fetch data for ISIN: ${userValue.isin}`);
        return null;
      }

    const data = await res.json();



    return { fetched: data, user: userValue };
  }));


  const validData = fetchedData.filter(item => item !== null);
  validData.forEach(({ fetched, user }) => {
    if (fetched.price > user.price) {
      console.log('The fetched price is higher than the user price', fetched.name);
    } else if (fetched.price < user.price) {
      console.log('The fetched price is lower than the user price', fetched.name);
    } else {
      console.log('The fetched price is equal to the user price', fetched.name);
    }
  });


  return (
    <>
    {/* {fetchedData.map((data, index) => (
      <React.Fragment key={index}>
        <h2>{data.name}</h2>
        <p>{data.price}</p>
        <p>{data.isin}</p>
      </React.Fragment>
    ))} */}
    </>
  );
};
export default FetchStocks;
