import { ChevronDown, EyeOff } from "lucide-react";

import { useState } from "react";
import MarketTableRow from "./MarketTableRow";
import type { MarketPrice } from "../../types/marketTable";
import type { CryptoPair } from "../../constants/cryptoPairs";

interface HiddenListProps {
  hiddenPairs: CryptoPair[];
  prices: Record<string, MarketPrice>;
  favorites: Record<string, boolean>;
  toggleFavorite: (symbol: string) => void;
  toggleHidden: (symbol: string) => void;
}
export default function HiddenList({
  hiddenPairs,
  prices,
  favorites,
  toggleFavorite,
  toggleHidden,
}: HiddenListProps) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <tr className="border-t border-border bg-surface-2">
        <td colSpan={4} className="p-2">
          <button
            type="button"
            onClick={() => setIsOpen((previous) => !previous)}
            aria-expanded={isOpen}
            className="flex w-full items-center gap-2 rounded-md p-2 text-left text-text-primary hover:bg-white/5"
          >
            <EyeOff className="size-4 text-muted" />

            <span className="flex-1">Hidden currencies ({hiddenPairs.length})</span>

            <ChevronDown className={`size-4 transition-transform ${isOpen ? "rotate-180" : ""}`} />
          </button>
        </td>
      </tr>
      {isOpen &&
        hiddenPairs.map((pair) => (
          <MarketTableRow
            key={pair.symbol}
            pair={pair}
            priceData={prices[pair.symbol]}
            isHidden
            isFavorite={Boolean(favorites[pair.symbol])}
            onToggleFavorite={() => toggleFavorite(pair.symbol)}
            onToggleHidden={() => toggleHidden(pair.symbol)}
          />
        ))}
    </>
  );
}
