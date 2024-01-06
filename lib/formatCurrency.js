export const formatCurrency = (numberString) => {
  const number = Number(numberString.replace(',', '.'));
  return new Intl.NumberFormat("de-DE", {
    style: "currency",
    currency: "USD",
  }).format(number);
};