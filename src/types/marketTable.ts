export interface BinanceTicker {
  s: string;
  c: string;
  P: string;
}

export interface BinanceTickerResponse {
  stream: string;
  data: BinanceTicker;
}

export type PriceDirection = "up" | "down" | "unchanged";

export interface MarketPrice {
  price: number;
  direction: PriceDirection;
  percentageChange: number;
}
