import { useEffect, useState } from "react";
import type { BinanceTickerResponse } from "../types/marketTable";

const STREAM_URL =
  "wss://stream.binance.com:9443/stream?streams=btcusdt@ticker/ethusdt@ticker/solusdt@ticker/bnbusdt@ticker/xrpusdt@ticker";

export function useBinancePrice() {
  const [prices, setPrices] = useState<Record<string, number>>({});

  useEffect(() => {
    const socket = new WebSocket(STREAM_URL);

    socket.onmessage = (event) => {
      const parsed: BinanceTickerResponse = JSON.parse(event.data);
      const price = Number(parsed.data.c);
      setPrices((prev) => ({
        ...prev,
        [parsed.data.s]: price,
      }));
    };

    return () => {
      socket.close();
    };
  }, []);

  return prices;
}
