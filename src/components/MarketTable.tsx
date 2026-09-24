import { CRYPTO_PAIRS } from "../constants/cryptoPairs";
import { useBinancePrice } from "../hooks/useBinancePrice";
import { formatPrice } from "../utils/formatPrice";
import PriceChange from "./PriceChange";
import PriceDirectionIcon from "./PriceDirectionIcon";
import FavoriteButton from "./FavoriteButton";
import { useFavorites } from "../hooks/useFavorites";
import HideButton from "./HideButton";
import HiddenList from "./HiddenList";
import { useHidden } from "../hooks/useHidden";

export default function MarketTable() {
  const prices = useBinancePrice();
  const { favorites, toggleFavorite } = useFavorites();
  const { hidden, toggleHidden } = useHidden();

  return (
    <div>
      {CRYPTO_PAIRS.filter((pair) => !hidden[pair.symbol]).map((pair) => {
        const priceData = prices[pair.symbol];
        return (
          <div key={pair.symbol} className="flex items-center">
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

            <FavoriteButton
              toggleFavorite={() => toggleFavorite(pair.symbol)}
              isFavorite={favorites[pair.symbol]}
            />
            <HideButton toggleHidden={() => toggleHidden(pair.symbol)} isHidden={false} />
          </div>
        );
      })}

      <HiddenList hidden={hidden} toggleHidden={toggleHidden} />
    </div>
  );
}
