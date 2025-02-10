function formatToUSD(amount: number) {
  const format = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format;
  return format(amount / 100);
}

export { formatToUSD };
