export interface FilterTabsProps {
  value: string;
  onChange: (value: string) => void;
}
export default function MarketFilterTabs({ value, onChange }: FilterTabsProps) {
  return (
    <div className="flex w-full items-center rounded-md border border-border bg-surface-2 text-sm sm:w-auto">
      <button
        type="button"
        onClick={() => onChange("all")}
        className={`h-full flex-1 cursor-pointer rounded px-4 py-1.5 text-text-primary sm:flex-none sm:px-6 ${
          value === "all" ? "bg-accent text-white" : "hover:bg-black/5 dark:hover:bg-white/5"
        }`}
      >
        All
      </button>

      <button
        type="button"
        onClick={() => onChange("favorites")}
        className={`h-full flex-1 cursor-pointer rounded px-4 py-1.5 text-text-primary sm:flex-none sm:px-6 ${
          value === "favorites" ? "bg-accent text-white" : "hover:bg-black/5 dark:hover:bg-white/5"
        }`}
      >
        Favorites
      </button>
    </div>
  );
}
