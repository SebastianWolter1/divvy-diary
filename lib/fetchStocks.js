const FetchStocks = async ({onDataFetch}) => {
  const isin = "US5949181045";

  const fetchApi = async () =>{
  const res = await fetch(`https://api.divvydiary.com/symbols/${isin}`, {
    next: { revalidate: 2 },
  });
  const data = await res.json();
//   console.log(data);
  onDataFetch(data);

// return data;
}
fetchApi();

return null

}
export default FetchStocks;