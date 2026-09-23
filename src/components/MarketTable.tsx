import { CRYPTO_PAIRS } from "../constants/cryptoPairs";
import { useBinancePrice } from "../hooks/useBinancePrice";
import { formatPrice } from "../utils/formatPrice";

export default function MarketTable() {
  const prices = useBinancePrice();

  return (
    <div>
      {CRYPTO_PAIRS.map((pair) => {
        const price = prices[pair.symbol];

        return (
          <div key={pair.symbol} className="flex">
            <div className="flex flex-col">
              <span>{pair.displaySymbol}</span>
              <span>{pair.name}</span>
            </div>
            <span className="ml-4"> {price === undefined ? "" : formatPrice(price)}</span>
          </div>
        );
      })}
    </div>
  );
}
