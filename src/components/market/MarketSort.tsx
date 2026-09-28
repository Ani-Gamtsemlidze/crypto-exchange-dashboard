import * as Popover from "@radix-ui/react-popover";
import { Check, ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

export type SortBy =
  "default" | "price-high" | "price-low" | "change-high" | "change-low" | "name-asc" | "name-desc";

interface MarketSortProps {
  value: SortBy;
  onChange: (value: SortBy) => void;
}

const sortOptions: { value: SortBy; label: string; shortLabel: string }[] = [
  { value: "default", label: "Default", shortLabel: "Sort" },
  { value: "price-high", label: "Price: high to low", shortLabel: "Price: High" },
  { value: "price-low", label: "Price: low to high", shortLabel: "Price: Low" },
  { value: "change-high", label: "24h change: high to low", shortLabel: "Change: High" },
  { value: "change-low", label: "24h change: low to high", shortLabel: "Change: Low" },
  { value: "name-asc", label: "Name: A to Z", shortLabel: "Name: A-Z" },
  { value: "name-desc", label: "Name: Z to A", shortLabel: "Name: Z-A" },
];

export default function MarketSort({ value, onChange }: MarketSortProps) {
  const [open, setOpen] = useState(false);
  const selected = sortOptions.find((option) => option.value === value);

  return (
    <Popover.Root open={open} onOpenChange={setOpen}>
      <Popover.Trigger
        aria-label="Sort currencies"
        className="bold flex min-h-9 cursor-pointer items-center justify-between gap-2 rounded-md border border-border bg-surface-2 px-3 py-2 text-sm text-text-primary"
      >
        <div className="flex items-center justify-center">
          <span>{selected?.shortLabel ?? "Sort"}</span>
        </div>
        {open ? (
          <ChevronUp className="size-4 shrink-0" aria-hidden="true" />
        ) : (
          <ChevronDown className="size-4 shrink-0" />
        )}
      </Popover.Trigger>

      <Popover.Portal>
        <Popover.Content
          align="end"
          sideOffset={6}
          className="z-[100] w-max max-w-[calc(100vw-2rem)] rounded-md border border-border bg-surface p-1 text-sm text-text-primary shadow-lg"
        >
          {sortOptions.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => {
                onChange(option.value);
                setOpen(false);
              }}
              className={`flex w-full cursor-pointer items-center gap-4 rounded px-3 py-2 text-left hover:bg-border focus-visible:outline-2 focus-visible:outline-accent dark:hover:bg-white/10 ${
                value === option.value ? "bg-border dark:bg-white/10" : ""
              }`}
            >
              <span className="flex-1">{option.label}</span>
              {value === option.value && <Check className="size-4 shrink-0" aria-hidden="true" />}
            </button>
          ))}
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}
