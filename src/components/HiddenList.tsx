import { CRYPTO_PAIRS } from "../constants/cryptoPairs";
import HideButton from "./HideButton";

interface HiddenListProps {
  hidden: Record<string, boolean>;
  toggleHidden: (symbol: string) => void;
}

export default function HiddenList({ hidden, toggleHidden }: HiddenListProps) {
  return (
    <div className="mt-4">
      <p>Hidden currencies</p>
      {CRYPTO_PAIRS.filter((crypto) => hidden[crypto.symbol]).map((pair) => (
        <div key={pair.symbol}>
          <div>
            {pair.name} {pair.displaySymbol}
          </div>
          <HideButton toggleHidden={() => toggleHidden(pair.symbol)} isHidden={true} />
        </div>
      ))}
    </div>
  );
}
