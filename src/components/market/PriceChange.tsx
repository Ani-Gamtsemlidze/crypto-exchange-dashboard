export default function PriceChange({ percentageChange }: { percentageChange: number }) {
  const sign = percentageChange > 0 ? "+" : "";
  return (
    <span
      className={`${percentageChange > 0 ? "text-emerald-500" : percentageChange < 0 ? "text-red-500" : "text-slate-400"}`}
    >
      {sign}
      {percentageChange.toFixed(2)}%
    </span>
  );
}
