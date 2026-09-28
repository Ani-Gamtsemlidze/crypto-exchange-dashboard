import { CRYPTO_PAIRS } from "../../constants/cryptoPairs";
import { useFavorites } from "../../hooks/useFavorites";
import HiddenList from "./HiddenList";
import { useHidden } from "../../hooks/useHidden";
import MarketTableRow from "./MarketTableRow";
import { useState } from "react";
import MarketSort, { type SortBy } from "./MarketSort";
import MarketSearch from "./MarketSearch";
import MarketFilterTabs from "./MarketFilterTabs";
import type { MarketPrice } from "../../types/marketTable";
import type { SocketStatus } from "../../hooks/useBinancePrice";
import MarketCard from "./MarketCard";
import HiddenCardList from "././HiddenCardList";

interface MarketTableProps {
  prices: Record<string, MarketPrice>;
  socketStatus: SocketStatus;
}

export default function MarketTable({ prices, socketStatus }: MarketTableProps) {
  const { favorites, toggleFavorite } = useFavorites();
  const { hidden, toggleHidden } = useHidden();

  const [searchQuery, setSearchQuery] = useState("");
  const [sortValue, setSortValue] = useState<SortBy>("default");
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

  const emptyMessage = searchQuery
    ? "No currencies match your search."
    : tabFilter === "favorites"
      ? "No favorites yet."
      : "No currencies to display.";

  const filteredByTab = sortData.filter((pair) => tabFilter === "all" || favorites[pair.symbol]);

  return (
    <div className="flex min-w-0 flex-col overflow-hidden rounded-xl border border-border bg-surface backdrop-blur-xl dark:border-white/10 dark:bg-slate-600/15">
      {" "}
      <div className="w-full p-4">
        <div className="flex flex-col gap-2 lg:flex-row lg:items-center">
          <MarketSearch searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

          <div className="flex w-full flex-col gap-2 sm:flex-row sm:justify-end lg:w-auto">
            <MarketFilterTabs value={tabFilter} onChange={setTabFilter} />
            <MarketSort value={sortValue} onChange={setSortValue} />
          </div>
        </div>
      </div>
      {socketStatus !== "connected" && Object.keys(prices).length > 0 && (
        <p className="px-5 py-2 text-center text-sm text-muted">
          Prices may be outdated while the connection is unavailable.
        </p>
      )}
      <div className="md:hidden">
        {filteredByTab.length !== 0 ? (
          filteredByTab.map((pair) => (
            <MarketCard
              key={pair.symbol}
              pair={pair}
              priceData={prices[pair.symbol]}
              isFavorite={Boolean(favorites[pair.symbol])}
              isHidden={false}
              onToggleFavorite={toggleFavorite}
              onToggleHidden={toggleHidden}
            />
          ))
        ) : (
          <p className="border-t border-white/10 px-4 py-6 text-center text-gray-400">
            {emptyMessage}
          </p>
        )}

        {hiddenPairs.length > 0 && (
          <HiddenCardList
            hiddenPairs={hiddenPairs}
            prices={prices}
            favorites={favorites}
            toggleFavorite={toggleFavorite}
            toggleHidden={toggleHidden}
          />
        )}
      </div>
      <div className="hidden min-w-0 overflow-x-auto md:block">
        <table className="w-full min-w-[620px] text-left">
          <thead>
            <tr className="border-b border-white/10 text-sm">
              <th className="px-5 py-3 font-medium text-gray-400">Asset</th>
              <th className="px-5 py-3 text-right font-medium text-gray-400">Price</th>
              <th className="px-5 py-3 text-right font-medium text-gray-400">24h Change</th>
              <th className="px-5 py-3 text-right font-medium text-gray-400">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredByTab.length !== 0 ? (
              filteredByTab.map((pair) => (
                <MarketTableRow
                  key={pair.symbol}
                  pair={pair}
                  priceData={prices[pair.symbol]}
                  onToggleFavorite={toggleFavorite}
                  onToggleHidden={toggleHidden}
                  isHidden={false}
                  isFavorite={Boolean(favorites[pair.symbol])}
                />
              ))
            ) : (
              <tr>
                <td colSpan={4} className="py-6 text-center text-gray-400">
                  {emptyMessage}
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
    </div>
  );
}
