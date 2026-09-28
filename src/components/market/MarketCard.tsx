import type { MarketCardProps } from "../../types/marketTable";
import { formatPrice } from "../../utils/formatPrice";
import FavoriteButton from "./FavoriteButton";
import HideButton from "./HideButton";
import PriceChange from "./PriceChange";
import PriceDirectionIcon from "./PriceDirectionIcon";

export default function MarketCard({
  pair,
  priceData,
  isFavorite,
  isHidden,
  onToggleFavorite,
  onToggleHidden,
}: MarketCardProps) {
  return (
    <div className="border-b border-border bg-surface p-4 last:border-b-0">
      <div className="flex items-center justify-between gap-3">
        <div className="flex min-w-0 items-center">
          <img
            src={`https://cdn.jsdelivr.net/gh/spothq/cryptocurrency-icons/svg/color/${pair.icon}.svg`}
            alt={pair.name}
            className="h-7 w-7 shrink-0 object-contain sm:h-9 sm:w-9"
          />
          <div className="ml-3 flex min-w-0 flex-col">
            <span className="font-semibold text-text-primary">{pair.displaySymbol}</span>
            <span className="text-sm text-muted">{pair.name}</span>
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-2">
          <FavoriteButton
            toggleFavorite={() => onToggleFavorite(pair.symbol)}
            isFavorite={isFavorite}
          />
          <HideButton toggleHidden={() => onToggleHidden(pair.symbol)} isHidden={isHidden} />
        </div>
      </div>

      <div className="mt-2 flex items-center justify-between lg:pl-12">
        {priceData === undefined ? (
          <>
            <div className="h-4 w-24 animate-pulse rounded bg-surface-2" />
            <div className="h-3 w-12 animate-pulse rounded bg-surface-2" />
          </>
        ) : (
          <>
            <div className="flex items-center gap-2 font-mono text-text-primary">
              {formatPrice(priceData.price)}
              <PriceDirectionIcon direction={priceData.direction} />
            </div>
            <div className="flex flex-col items-end gap-2">
              <span className="text-sm text-muted">24h</span>

              <PriceChange percentageChange={priceData.percentageChange} />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
