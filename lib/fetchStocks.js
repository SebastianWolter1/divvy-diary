const FetchStocks = async ({ onDataFetch }) => {
  const isin = "US5949181045";
  const isin2 = "US0378331005"

  const fetchApi = async () => {
    const res = await fetch(`https://api.divvydiary.com/symbols/${isin2}`, {
      next: { revalidate: 10 },
    });
    const data = await res.json();
    console.log(data.price);
    onDataFetch(data);
  };
  fetchApi();

  return null;
};
export default FetchStocks;
