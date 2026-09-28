import { useState } from "react";
import { ChevronDown, EyeOff } from "lucide-react";
import MarketCard from "./MarketCard";
import type { CryptoPair } from "../../constants/cryptoPairs";
import type { MarketPrice } from "../../types/marketTable";

interface HiddenCardListProps {
  hiddenPairs: CryptoPair[];
  prices: Record<string, MarketPrice>;
  favorites: Record<string, boolean>;
  toggleFavorite: (symbol: string) => void;
  toggleHidden: (symbol: string) => void;
}

export default function HiddenCardList({
  hiddenPairs,
  prices,
  favorites,
  toggleFavorite,
  toggleHidden,
}: HiddenCardListProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-t border-border bg-surface-2">
      <button
        type="button"
        onClick={() => setIsOpen((previous) => !previous)}
        aria-expanded={isOpen}
        className="flex w-full cursor-pointer items-center gap-2 p-4 text-left text-sm text-text-primary hover:bg-black/5 dark:hover:bg-white/5"
      >
        <EyeOff className="size-4 text-muted" />
        <span className="flex-1">Hidden currencies ({hiddenPairs.length})</span>
        <ChevronDown className={`size-4 transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </button>

      {isOpen &&
        hiddenPairs.map((pair) => (
          <MarketCard
            key={pair.symbol}
            pair={pair}
            priceData={prices[pair.symbol]}
            isFavorite={Boolean(favorites[pair.symbol])}
            isHidden={true}
            onToggleFavorite={toggleFavorite}
            onToggleHidden={toggleHidden}
          />
        ))}
    </div>
  );
}
