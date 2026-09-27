import { Toaster } from "sonner";
import CalculatorBody from "./components/calculator/CalculatorBody";
import Header from "./components/Header";
import MarketTable from "./components/MarketTable";
import { useBinancePrice } from "./hooks/useBinancePrice";
import { usePriceAlerts } from "./hooks/usePriceAlerts";

function App() {
  const { prices, socketStatus, initialPrices, error } = useBinancePrice();
  usePriceAlerts({ prices, initialPrices });

  return (
    <>
      <Toaster
        toastOptions={{
          style: {
            background: "#1e293b",
            color: "#fff",
            border: "1px solid #5267F5",
          },
          descriptionClassName: "!text-slate-300",
        }}
        position="bottom-right"
      />
      <main className="min-h-screen bg-bg py-6 text-white">
        <div className="mx-auto max-w-6xl px-4">
          <Header socketStatus={socketStatus} />
          {error && (
            <div
              role="alert"
              className="mb-4 rounded-md border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-200"
            >
              {error}
            </div>
          )}
          <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,2fr)_minmax(320px,1fr)]">
            <MarketTable prices={prices} socketStatus={socketStatus} />
            <div>
              <CalculatorBody prices={prices} />
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default App;
