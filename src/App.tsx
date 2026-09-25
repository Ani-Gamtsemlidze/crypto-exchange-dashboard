import Header from "./components/Header";
import MarketTable from "./components/MarketTable";
import { useBinancePrice } from "./hooks/useBinancePrice";

function App() {
  const { prices, socketStatus } = useBinancePrice();
  return (
    <>
      <main className="min-h-screen bg-bg py-6 text-white">
        <div className="mx-auto max-w-6xl">
          <Header socketStatus={socketStatus} />
          <MarketTable prices={prices} />
        </div>
      </main>
    </>
  );
}

export default App;
