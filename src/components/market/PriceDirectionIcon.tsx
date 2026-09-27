import { ArrowDown, ArrowUp } from "lucide-react";
import type { PriceDirection } from "../../types/marketTable";

export default function PriceDirectionIcon({ direction }: { direction: PriceDirection }) {
  if (direction === "up") {
    return <ArrowUp aria-label="Price Increased" className="size-4 text-emerald-500" />;
  }
  if (direction === "down") {
    return <ArrowDown aria-label="Price Decreased" className="size-4 text-red-500" />;
  }
  return null;
}
