import type { MarketPrice } from "../../types/marketTable";
import CurrencySelect from "./CurrencySelect";

export default function CalculatorBody({ prices }: { prices: Record<string, MarketPrice> }) {
  return (
    <div className="flex w-full max-w-96 flex-col rounded-xl border border-white/10 bg-slate-600/15 p-6 backdrop-blur-xl">
      <h2 className="mb-4 text-lg capitalize">currency calculator</h2>
      <CurrencySelect prices={prices} />
    </div>
  );
}
