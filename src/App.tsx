import CalculatorBody from "./components/calculator/CalculatorBody";
import Header from "./components/Header";
import MarketTable from "./components/MarketTable";
import { useBinancePrice } from "./hooks/useBinancePrice";

function App() {
  const { prices, socketStatus } = useBinancePrice();
  return (
    <>
      <main className="min-h-screen bg-bg py-6 text-white">
        <div className="mx-auto max-w-6xl px-4">
          <Header socketStatus={socketStatus} />
          <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,2fr)_minmax(320px,1fr)]">
            <MarketTable prices={prices} />
            <CalculatorBody prices={prices} />
          </div>
        </div>
      </main>
    </>
  );
}

export default App;
