export function calculateConversion(amount: string, sourcePrice?: number, targetPrice?: number) {
  const rate =
    sourcePrice !== undefined && targetPrice !== undefined && targetPrice > 0
      ? sourcePrice / targetPrice
      : null;

  const convertedAmount =
    rate !== null && amount !== "" && Number.isFinite(Number(amount)) && Number(amount) >= 0
      ? (Number(amount) * rate).toFixed(6)
      : "";

  return { rate, convertedAmount };
}
