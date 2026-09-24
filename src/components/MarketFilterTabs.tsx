export interface FilterTabsProps {
  value: string;
  onChange: (value: string) => void;
}
export default function MarketFilterTabs({ value, onChange }: FilterTabsProps) {
  return (
    <div className="mr-2 flex items-center rounded-md border border-white/10 bg-slate-800 text-sm text-white">
      <button
        type="button"
        onClick={() => onChange("all")}
        className={` ${value === "all" ? "bg-accent" : "hover:bg-white/5"} h-full rounded px-6 py-1.5`}
      >
        All
      </button>
      <button
        type="button"
        onClick={() => onChange("favorites")}
        className={` ${value === "favorites" ? "bg-accent" : "hover:bg-white/5"} h-full rounded px-6 py-1.5`}
      >
        Favorites
      </button>
    </div>
  );
}
