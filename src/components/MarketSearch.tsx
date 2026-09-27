import { Search } from "lucide-react";

export interface SearchProps {
  searchQuery: string;
  setSearchQuery: (value: string) => void;
}

export default function MarketSearch({ searchQuery, setSearchQuery }: SearchProps) {
  return (
    <div className="w-full min-w-0 lg:w-auto">
      <div className="relative">
        <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted" />
        <input
          className="w-full rounded-md border border-border bg-transparent py-2 pr-4 pl-10 text-white placeholder:text-muted focus:ring-2 focus:ring-white/30 focus:outline-none lg:w-72"
          type="search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="search by symbol or name"
        />
      </div>
    </div>
  );
}
