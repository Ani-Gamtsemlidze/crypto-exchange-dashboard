import { Toaster } from "sonner";
import CalculatorBody from "./components/calculator/CalculatorBody";
import Header from "./components/Header";
import { useBinancePrice } from "./hooks/useBinancePrice";
import { usePriceAlerts } from "./hooks/usePriceAlerts";
import MarketTable from "./components/market/MarketTable";
import { useState } from "react";
import { lazy, Suspense } from "react";
import { usePriceHistory } from "./hooks/usePriceHistory";

const PriceHistoryChart = lazy(() => import("./components/LineChart"));

function App() {
  const { prices, socketStatus, initialPrices, error } = useBinancePrice();
  usePriceAlerts({ prices, initialPrices });

  const [selectedSymbol, setSelectedSymbol] = useState("BTCUSDT");

  const priceHistory = usePriceHistory(prices);

  return (
    <>
      <Toaster
        toastOptions={{
          style: {
            background: "var(--raw-surface)",
            color: "var(--raw-text-primary)",
            border: "1px solid #5267F5",
          },
          descriptionClassName: "!text-muted",
        }}
        position="bottom-right"
      />
      <main className="min-h-screen bg-bg py-6 text-text-primary">
        <div className="mx-auto max-w-6xl px-4">
          <Header socketStatus={socketStatus} />
          {error && (
            <div
              role="alert"
              className="mb-4 rounded-md border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-700 dark:text-red-200"
            >
              {error}
            </div>
          )}
          <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,2fr)_minmax(320px,1fr)]">
            <MarketTable prices={prices} socketStatus={socketStatus} />
            <div className="w-full min-w-0">
              <CalculatorBody prices={prices} />
              <Suspense
                fallback={
                  <div className="mt-8 flex h-[280px] items-center justify-center rounded-xl border border-border bg-surface p-4 text-sm text-muted sm:p-6">
                    Loading chart...
                  </div>
                }
              >
                <PriceHistoryChart
                  symbol={selectedSymbol}
                  onSymbolChange={setSelectedSymbol}
                  priceHistory={priceHistory[selectedSymbol] ?? []}
                />
              </Suspense>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default App;
