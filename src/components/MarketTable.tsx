import { CRYPTO_PAIRS } from "../constants/cryptoPairs";
import { useBinancePrice } from "../hooks/useBinancePrice";
import { useFavorites } from "../hooks/useFavorites";
import HiddenList from "./HiddenList";
import { useHidden } from "../hooks/useHidden";
import MarketTableRow from "./MarketTableRow";
import { useState } from "react";
import MarketSort from "./MarketSort";
import MarketSearch from "./MarketSearch";
import MarketFilterTabs from "./MarketFilterTabs";

export default function MarketTable() {
  const prices = useBinancePrice();
  const { favorites, toggleFavorite } = useFavorites();
  const { hidden, toggleHidden } = useHidden();

  const [searchQuery, setSearchQuery] = useState("");
  const [sortValue, setSortValue] = useState("default");
  const [tabFilter, setTabFilter] = useState("all");

  const hiddenPairs = CRYPTO_PAIRS.filter((pair) => hidden[pair.symbol]);
  const visiblePairs = CRYPTO_PAIRS.filter((pair) => !hidden[pair.symbol]);

  const query = searchQuery.trim().toLowerCase();

  const searchedPairs = visiblePairs.filter(
    (pair) =>
      pair.name.toLowerCase().includes(query) || pair.displaySymbol.toLowerCase().includes(query),
  );

  const sortData = [...searchedPairs].sort((a, b) => {
    if (sortValue === "name-asc") {
      return a.name.localeCompare(b.name);
    }
    if (sortValue === "name-desc") {
      return b.name.localeCompare(a.name);
    }
    if (sortValue === "change-high" || sortValue === "change-low") {
      const percentA = prices[a.symbol]?.percentageChange ?? 0;
      const percentB = prices[b.symbol]?.percentageChange ?? 0;
      return sortValue === "change-high" ? percentB - percentA : percentA - percentB;
    }
    if (sortValue === "price-high" || sortValue === "price-low") {
      const priceA = prices[a.symbol]?.price ?? 0;
      const priceB = prices[b.symbol]?.price ?? 0;
      return sortValue === "price-high" ? priceB - priceA : priceA - priceB;
    }
    return 0;
  });

  const filteredByTab = sortData.filter((pair) => tabFilter === "all" || favorites[pair.symbol]);
  return (
    <div className="flex flex-col rounded-xl border border-white/10 bg-slate-600/15 backdrop-blur-xl">
      <div className="mt-4 mb-4 flex items-center justify-between px-5">
        <h2 className="text-xl">Live Market</h2>
        <div className="flex">
          <MarketSearch searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
          <MarketFilterTabs value={tabFilter} onChange={setTabFilter} />
          <MarketSort value={sortValue} onChange={setSortValue} />
        </div>
      </div>

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
          {filteredByTab.length !== 0 ? (
            filteredByTab.map((pair) => {
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
            })
          ) : (
            <tr>
              <td colSpan={4} className="py-6 text-center text-gray-400">
                {searchQuery
                  ? "No currencies match your search."
                  : tabFilter === "favorites"
                    ? "No favorites yet."
                    : "No currencies to display."}
              </td>
            </tr>
          )}
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
