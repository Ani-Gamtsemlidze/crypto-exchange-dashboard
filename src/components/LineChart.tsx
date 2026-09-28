import { LineChart, Line, XAxis, YAxis, Tooltip } from "recharts";
import CurrencyDropdown from "./calculator/CurrencyDropdown";
import type { PricePoint } from "../types/priceHistory";

export default function PriceHistoryChart({
  priceHistory,
  symbol,
  onSymbolChange,
}: {
  priceHistory: PricePoint[];
  symbol: string;
  onSymbolChange: (value: string) => void;
}) {
  const formatTime = (value: unknown) =>
    typeof value === "number" ? new Date(value).toLocaleTimeString() : "";
  const formatPrice = (value: number) =>
    value >= 1000
      ? value.toLocaleString(undefined, { maximumFractionDigits: 0 })
      : value >= 1
        ? value.toFixed(2)
        : value.toFixed(4);
  return (
    <div className="mt-8 min-w-0 rounded-xl border border-border bg-surface p-4 sm:p-6">
      <div className="flex items-center justify-between">
        <h2 className="mb-4 text-lg text-text-primary">price history</h2>
        <div className="mb-4">
          <CurrencyDropdown value={symbol} onChange={onSymbolChange} />
        </div>
      </div>

      <div className="mx-auto w-full max-w-md">
        {priceHistory.length < 2 ? (
          <p className="py-16 text-center text-sm text-muted">Collecting price data...</p>
        ) : (
          <LineChart
            data={priceHistory}
            responsive
            style={{ width: "100%", height: 180 }}
            margin={{ top: 10, right: 65, bottom: 10, left: 0 }}
          >
            <XAxis
              dataKey="time"
              minTickGap={40}
              tickFormatter={formatTime}
              tick={{ fontSize: 12 }}
            />
            <YAxis
              tickCount={3}
              domain={["dataMin", "dataMax"]}
              width={65}
              tick={{ fontSize: 12 }}
              tickFormatter={formatPrice}
            />
            <Tooltip labelFormatter={formatTime} />
            <Line
              type="monotone"
              dataKey="price"
              stroke="#536af6"
              strokeWidth={2}
              dot={priceHistory.length === 1}
              isAnimationActive={false}
            />
          </LineChart>
        )}
      </div>
    </div>
  );
}
