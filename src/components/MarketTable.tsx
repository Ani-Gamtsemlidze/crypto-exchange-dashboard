import { CRYPTO_PAIRS } from "../constants/cryptoPairs";
import { useBinancePrice } from "../hooks/useBinancePrice";
import { formatPrice } from "../utils/formatPrice";
import PriceChange from "./PriceChange";
import PriceDirectionIcon from "./PriceDirectionIcon";

export default function MarketTable() {
  const prices = useBinancePrice();
  return (
    <div>
      {CRYPTO_PAIRS.map((pair) => {
        const priceData = prices[pair.symbol];
        return (
          <div key={pair.symbol} className="flex">
            <div className="flex">
              <span>{pair.displaySymbol}</span>
              <span>{pair.name}</span>
            </div>
            {priceData === undefined ? (
              <span className="ml-4 text-slate-400">Loading...</span>
            ) : (
              <>
                <span className="ml-4">{formatPrice(priceData.price)}</span>

                <div className="ml-4 flex items-center gap-2">
                  <PriceDirectionIcon direction={priceData.direction} />
                  <PriceChange percentageChange={priceData.percentageChange} />
                </div>
              </>
            )}
          </div>
        );
      })}
    </div>
  );
}
