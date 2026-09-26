import { Toaster } from "sonner";
import CalculatorBody from "./components/calculator/CalculatorBody";
import Header from "./components/Header";
import MarketTable from "./components/MarketTable";
import { useBinancePrice } from "./hooks/useBinancePrice";
import { usePriceAlerts } from "./hooks/usePriceAlerts";

function App() {
  const { prices, socketStatus, initialPrices } = useBinancePrice();
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
          <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,2fr)_minmax(320px,1fr)]">
            <MarketTable prices={prices} />
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
