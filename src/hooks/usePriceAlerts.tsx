import { useEffect, useRef } from "react";
import { toast } from "sonner";
import { CRYPTO_PAIRS } from "../constants/cryptoPairs";
import type { MarketPrice } from "../types/marketTable";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";

interface UsePriceAlertsParams {
  prices: Record<string, MarketPrice>;
  initialPrices: Record<string, number>;
}

export function usePriceAlerts({ prices, initialPrices }: UsePriceAlertsParams) {
  const alertedSymbols = useRef(new Set<string>());

  useEffect(() => {
    CRYPTO_PAIRS.forEach((pair) => {
      const symbol = pair.symbol;
      const currentPrice = prices[symbol]?.price;
      const initialPrice = initialPrices[symbol];

      if (
        currentPrice === undefined ||
        !Number.isFinite(currentPrice) ||
        !Number.isFinite(initialPrice) ||
        initialPrice <= 0
      ) {
        return;
      }

      const percentageChange = ((currentPrice - initialPrice) / initialPrice) * 100;
      const increased = percentageChange > 0;
      const absChange = Math.abs(percentageChange);
      const formatAlertPrice = (price: number) =>
        price < 10 ? price.toFixed(4) : price.toFixed(2);
      const change = Math.abs(percentageChange).toFixed(2);

      if (absChange >= 2 && !alertedSymbols.current.has(symbol)) {
        alertedSymbols.current.add(symbol);

        const direction = percentageChange > 0 ? "increased" : "decreased";

        toast(`${pair.displaySymbol} ${direction} by ${change}% since you opened the page`, {
          icon: increased ? (
            <ArrowUpRight className="size-5 text-green-400" />
          ) : (
            <ArrowDownRight className="size-5 text-red-400" />
          ),
          description: `${formatAlertPrice(initialPrice)} → ${formatAlertPrice(currentPrice)} USDT`,
        });
      }
    });
  }, [prices, initialPrices]);
}
