import { CRYPTO_PAIRS } from "../constants/cryptoPairs";
import { useBinancePrice } from "../hooks/useBinancePrice";
import { useFavorites } from "../hooks/useFavorites";
import HiddenList from "./HiddenList";
import { useHidden } from "../hooks/useHidden";
import MarketTableRow from "./MarketTableRow";

export default function MarketTable() {
  const prices = useBinancePrice();
  const { favorites, toggleFavorite } = useFavorites();
  const { hidden, toggleHidden } = useHidden();

  const hiddenPairs = CRYPTO_PAIRS.filter((pair) => hidden[pair.symbol]);
  const visiblePairs = CRYPTO_PAIRS.filter((pair) => !hidden[pair.symbol]);

  return (
    <div className="flex flex-col rounded-xl border border-white/10 bg-slate-600/15 backdrop-blur-xl">
      <table className="w-full text-left">
        <thead>
          <tr className="border-b border-white/10 text-sm">
            <th className="px-5 py-3 font-medium text-gray-400">Asset</th>
            <th className="px-5 py-3 text-right font-medium text-gray-400">Price</th>
            <th className="px-5 py-3 text-right font-medium text-gray-400">Change</th>
            <th className="px-5 py-3 text-right font-medium text-gray-400">Actions</th>
          </tr>
        </thead>
        <tbody>
          {visiblePairs.map((pair) => {
            const priceData = prices[pair.symbol];
            return (
              <MarketTableRow
                key={pair.symbol}
                pair={pair}
                priceData={priceData}
                onToggleFavorite={toggleFavorite}
                onToggleHidden={toggleHidden}
                isHidden={false}
                isFavorite={favorites[pair.symbol]}
              />
            );
          })}
          <HiddenList
            hiddenPairs={hiddenPairs}
            prices={prices}
            favorites={favorites}
            toggleFavorite={toggleFavorite}
            toggleHidden={toggleHidden}
          />
        </tbody>
      </table>
    </div>
  );
}
