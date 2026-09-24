import Header from "./components/Header";
import MarketTable from "./components/MarketTable";

function App() {
  return (
    <>
      <main className="min-h-screen bg-bg py-6 text-white">
        <div className="mx-auto max-w-6xl">
          <Header />

          <MarketTable />
        </div>
      </main>
    </>
  );
}

export default App;
