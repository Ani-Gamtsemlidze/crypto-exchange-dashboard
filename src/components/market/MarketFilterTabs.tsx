export interface FilterTabsProps {
  value: string;
  onChange: (value: string) => void;
}
export default function MarketFilterTabs({ value, onChange }: FilterTabsProps) {
  return (
    <div className="flex w-full items-center rounded-md border border-white/10 bg-slate-800 text-sm text-white sm:w-auto">
      <button
        type="button"
        onClick={() => onChange("all")}
        className={`h-full flex-1 rounded px-4 py-1.5 sm:flex-none sm:px-6 ${
          value === "all" ? "bg-accent" : "hover:bg-white/5"
        }`}
      >
        All
      </button>

      <button
        type="button"
        onClick={() => onChange("favorites")}
        className={`h-full flex-1 rounded px-4 py-1.5 sm:flex-none sm:px-6 ${
          value === "favorites" ? "bg-accent" : "hover:bg-white/5"
        }`}
      >
        Favorites
      </button>
    </div>
  );
}
