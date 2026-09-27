import { useEffect, useRef, useState } from "react";
import type { BinanceTickerResponse, MarketPrice, PriceDirection } from "../types/marketTable";
import { CRYPTO_PAIRS } from "../constants/cryptoPairs";

export type SocketStatus = "loading" | "connected" | "reconnecting" | "disconnected";

const STREAM_URL = `wss://stream.binance.com:9443/stream?streams=${CRYPTO_PAIRS.map((pair) => `${pair.symbol.toLowerCase()}@ticker`).join("/")}`;

export function useBinancePrice() {
  const [prices, setPrices] = useState<Record<string, MarketPrice>>({});
  const [socketStatus, setSocketStatus] = useState<SocketStatus>("loading");
  const [initialPrices, setInitialPrices] = useState<Record<string, number>>({});
  const [error, setError] = useState<string | null>(null);

  const wsRef = useRef<WebSocket | null>(null);
  const attemptRef = useRef(0);
  const MAX_ATTEMPT = 5;
  const timeOutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const handleOffline = () => {
      const socket = wsRef.current;
      wsRef.current = null;
      clearReconnectTimer();
      socket?.close();
      setSocketStatus("disconnected");
      setError("You appear to be offline.");
    };
    const handleOnline = () => {
      clearReconnectTimer();
      if (!wsRef.current) {
        attemptRef.current = 0;
        setSocketStatus("reconnecting");
        connect();
      }
    };

    function clearReconnectTimer() {
      if (timeOutRef.current !== null) {
        clearTimeout(timeOutRef.current);
        timeOutRef.current = null;
      }
    }

    function connect() {
      const socket = new WebSocket(STREAM_URL);
      wsRef.current = socket;

      socket.onopen = () => {
        if (wsRef.current !== socket) return;
        setSocketStatus("connected");
        attemptRef.current = 0;
        setError(null);
      };

      socket.onmessage = (event) => {
        try {
          const parsed: BinanceTickerResponse = JSON.parse(event.data);
          setError(null);

          const newPrice = Number(parsed.data.c);
          const symbol = parsed.data.s;

          if (wsRef.current !== socket) return;
          setInitialPrices((previous) =>
            previous[symbol] === undefined ? { ...previous, [symbol]: newPrice } : previous,
          );
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
        } catch (err) {
          setError("Received malformed data from server.");
          console.error("Failed to parse WebSocket message:", err);
        }
      };
      socket.onclose = () => {
        if (wsRef.current !== socket) return;
        wsRef.current = null;
        attemptRef.current++;
        if (attemptRef.current > MAX_ATTEMPT) {
          setSocketStatus("disconnected");
          setError("Unable to connect to live prices.");
          return;
        }
        setSocketStatus("reconnecting");
        timeOutRef.current = setTimeout(() => {
          timeOutRef.current = null;
          connect();
        }, 5000);
        timeOutRef.current = setTimeout(() => connect(), 5000);
      };
      socket.onerror = (event) => {
        if (wsRef.current !== socket) return;
        setError("A connection error occurred.");
        console.error("Binance WebSocket error:", event);
      };
    }

    window.addEventListener("offline", handleOffline);
    window.addEventListener("online", handleOnline);

    connect();

    return () => {
      window.removeEventListener("offline", handleOffline);
      window.removeEventListener("online", handleOnline);
      const socket = wsRef.current;
      wsRef.current = null;
      clearReconnectTimer();
      socket?.close();
    };
  }, []);

  return { prices, socketStatus, initialPrices, error };
}
