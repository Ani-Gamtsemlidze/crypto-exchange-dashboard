import { useState } from "react";
import type { PricePoint } from "../types/priceHistory";
import type { MarketPrice } from "../types/marketTable";

const MAX_POINTS = 50;

export function usePriceHistory(prices: Record<string, MarketPrice>) {
  const [history, setHistory] = useState<Record<string, PricePoint[]>>({});
  const [prevPrices, setPrevPrices] = useState(prices);

  if (prices !== prevPrices) {
    setPrevPrices(prices);
    const next = { ...history };

    for (const symbol in prices) {
      const price = prices[symbol]?.price;
      if (price === undefined) continue;

      const old = next[symbol] ?? [];
      if (old.at(-1)?.price === price) continue;

      next[symbol] = [...old, { time: prices[symbol].updatedAt, price }].slice(-MAX_POINTS);
    }

    setHistory(next);
  }

  return history;
}
