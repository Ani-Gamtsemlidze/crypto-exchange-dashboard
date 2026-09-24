import { useLocalstorage } from "./useLocalstorage";

export function useFavorites() {
  const [favorites, setFavorites] = useLocalstorage<Record<string, boolean>>("favorites", {});

  function toggleFavorite(symbol: string) {
    setFavorites((prev) => ({ ...prev, [symbol]: !prev[symbol] }));
  }

  return { favorites, toggleFavorite };
}
