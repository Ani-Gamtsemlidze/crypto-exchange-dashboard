export const CRYPTO_PAIRS = [
  { symbol: "BTCUSDT", displaySymbol: "BTC/USDT", name: "Bitcoin", icon: "btc" },
  { symbol: "ETHUSDT", displaySymbol: "ETH/USDT", name: "Ethereum", icon: "eth" },
  { symbol: "SOLUSDT", displaySymbol: "SOL/USDT", name: "Solana", icon: "sol" },
  { symbol: "BNBUSDT", displaySymbol: "BNB/USDT", name: "BNB", icon: "bnb" },
  { symbol: "XRPUSDT", displaySymbol: "XRP/USDT", name: "XRP", icon: "xrp" },
] as const;

export type CryptoPair = (typeof CRYPTO_PAIRS)[number];
