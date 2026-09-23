import { useEffect, useState } from "react";
import type { BinanceTickerResponse, MarketPrice, PriceDirection } from "../types/marketTable";
import { CRYPTO_PAIRS } from "../constants/cryptoPairs";

const STREAM_URL = `wss://stream.binance.com:9443/stream?streams=${CRYPTO_PAIRS.map((pair) => `${pair.symbol.toLowerCase()}@ticker`).join("/")}`;
export function useBinancePrice() {
  const [prices, setPrices] = useState<Record<string, MarketPrice>>({});

  useEffect(() => {
    const socket = new WebSocket(STREAM_URL);

    socket.onmessage = (event) => {
      const parsed: BinanceTickerResponse = JSON.parse(event.data);

      setPrices((prev) => {
        const oldPrice = prev[parsed.data.s]?.price;
        const newPrice = Number(parsed.data.c);
        const percentageChange = Number(parsed.data.P);

        let direction: PriceDirection = prev[parsed.data.s]?.direction ?? "unchanged";

        if (oldPrice !== undefined) {
          if (newPrice > oldPrice) {
            direction = "up";
          } else if (newPrice < oldPrice) {
            direction = "down";
          }
        }

        return {
          ...prev,
          [parsed.data.s]: { price: newPrice, direction, percentageChange },
        };
      });
    };

    return () => {
      socket.close();
    };
  }, []);

  return prices;
}
