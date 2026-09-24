import { useLocalstorage } from "./useLocalstorage";

export function useHidden() {
  const [hidden, setHidden] = useLocalstorage<Record<string, boolean>>("hidden", {});

  function toggleHidden(symbol: string) {
    setHidden((prev) => ({ ...prev, [symbol]: !prev[symbol] }));
  }

  return { hidden, toggleHidden };
}
