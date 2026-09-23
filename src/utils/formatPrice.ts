const priceFormatter = new Intl.NumberFormat("en-Us", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

export function formatPrice(price: number) {
  return priceFormatter.format(price);
}
