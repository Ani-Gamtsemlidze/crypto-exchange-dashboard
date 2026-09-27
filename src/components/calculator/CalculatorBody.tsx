import type { MarketPrice } from "../../types/marketTable";
import CurrencySelect from "./CurrencySelect";

export default function CalculatorBody({ prices }: { prices: Record<string, MarketPrice> }) {
  return (
    <div className="flex w-full min-w-0 flex-col rounded-xl border border-white/10 bg-slate-600/15 p-4 backdrop-blur-xl sm:p-6">
      <h2 className="mb-4 text-center text-lg lg:text-left">Currency Calculator</h2>

      <div className="mx-auto w-full max-w-md lg:mx-0">
        <CurrencySelect prices={prices} />
      </div>
    </div>
  );
}
