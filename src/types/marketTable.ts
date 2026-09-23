export interface BinanceTicker {
  s: string;
  c: string;
}

export interface BinanceTickerResponse {
  stream: string;
  data: BinanceTicker;
}
