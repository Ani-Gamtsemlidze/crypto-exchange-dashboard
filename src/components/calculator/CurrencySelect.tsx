import { ArrowDownUp, EqualApproximately } from "lucide-react";
import { useState } from "react";
import type { MarketPrice } from "../../types/marketTable";
import CurrencyInputRow from "./CurrencyInputRow";

export default function CurrencySelect({ prices }: { prices: Record<string, MarketPrice> }) {
  const [source, setSource] = useState("BTCUSDT");
  const [target, setTarget] = useState("ETHUSDT");
  const [amount, setAmount] = useState("");

  const sourcePrice = prices[source]?.price;
  const targetPrice = prices[target]?.price;

  const rate = sourcePrice && targetPrice > 0 ? sourcePrice / targetPrice : null;

  const convertedAmount =
    rate !== null && amount !== "" && Number.isFinite(Number(amount)) && Number(amount) >= 0
      ? (Number(amount) * rate).toFixed(6)
      : "";

  function handleSwitch() {
    setTarget(source);
    setSource(target);
  }

  return (
    <div className="relative flex flex-col gap-4">
      <CurrencyInputRow
        value={amount}
        onValueChange={setAmount}
        editable={true}
        currency={source}
        onCurrencyChange={setSource}
      />

      <button
        type="button"
        onClick={handleSwitch}
        className="absolute top-10 right-3/6 z-50 mx-auto my-4 flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-slate-800 backdrop-blur-xl"
      >
        <ArrowDownUp
          className="size-6 rounded-full text-accent hover:text-[#7486fa]"
          strokeWidth={3}
        />
      </button>
      <CurrencyInputRow
        value={convertedAmount}
        editable={false}
        currency={target}
        onCurrencyChange={setTarget}
      />
      <div className="mt-4 flex items-center text-muted">
        1 {source.replace("USDT", "")}{" "}
        <EqualApproximately className="mx-2 text-muted" size={16} strokeWidth={3} />{" "}
        {rate?.toFixed(4)} {target.replace("USDT", "")}
      </div>
    </div>
  );
}
