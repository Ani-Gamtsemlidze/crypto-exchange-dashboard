import type { CryptoPair } from "../constants/cryptoPairs";
import type { MarketPrice } from "../types/marketTable";
import { formatPrice } from "../utils/formatPrice";
import FavoriteButton from "./FavoriteButton";
import HideButton from "./HideButton";
import PriceChange from "./PriceChange";
import PriceDirectionIcon from "./PriceDirectionIcon";

interface MarketTableRowProps {
  pair: CryptoPair;
  priceData?: MarketPrice;
  isFavorite: boolean;
  isHidden: boolean;
  onToggleFavorite: (symbol: string) => void;
  onToggleHidden: (symbol: string) => void;
}

export default function MarketTableRow({
  pair,
  priceData,
  isFavorite,
  isHidden,
  onToggleFavorite,
  onToggleHidden,
}: MarketTableRowProps) {
  return (
    <tr className="border-line hover:bg-panel-2 border-b border-white/10">
      <td className="flex items-center px-5 py-3">
        <img
          src={`https://cdn.jsdelivr.net/gh/spothq/cryptocurrency-icons/svg/color/${pair.icon}.svg`}
          alt={pair.name}
          className="h-8 w-8 object-contain"
        />
        <div className="ml-3 flex flex-col">
          <span className="font-semibold text-white">{pair.displaySymbol}</span>
          <span className="text-text-dim text-sm text-gray-500">{pair.name}</span>
        </div>
      </td>

      {priceData === undefined ? (
        <td colSpan={2} className="text-text-dim px-5 py-3 text-right">
          Loading...
        </td>
      ) : (
        <>
          <td className="px-5 py-3 text-right font-mono text-white">
            {formatPrice(priceData.price)}
          </td>
          <td className="px-5 py-3 text-right">
            <div className="flex items-center justify-end gap-2">
              <PriceDirectionIcon direction={priceData.direction} />
              <PriceChange percentageChange={priceData.percentageChange} />
            </div>
          </td>
        </>
      )}

      <td className="px-5 py-3">
        <div className="flex items-center justify-end gap-3">
          <FavoriteButton
            toggleFavorite={() => onToggleFavorite(pair.symbol)}
            isFavorite={isFavorite}
          />
          <HideButton toggleHidden={() => onToggleHidden(pair.symbol)} isHidden={isHidden} />
        </div>
      </td>
    </tr>
  );
}
