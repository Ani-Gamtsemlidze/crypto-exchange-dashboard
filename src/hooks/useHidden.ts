import { useLocalStorage } from "./useLocalStorage";

export function useHidden() {
  const [hidden, setHidden] = useLocalStorage<Record<string, boolean>>("hidden", {});

  function toggleHidden(symbol: string) {
    setHidden((prev) => ({ ...prev, [symbol]: !prev[symbol] }));
  }

  return { hidden, toggleHidden };
}
