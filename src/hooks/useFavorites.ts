import { useLocalStorage } from "./useLocalStorage";

export function useFavorites() {
  const [favorites, setFavorites] = useLocalStorage<Record<string, boolean>>("favorites", {});

  function toggleFavorite(symbol: string) {
    setFavorites((prev) => ({ ...prev, [symbol]: !prev[symbol] }));
  }

  return { favorites, toggleFavorite };
}
