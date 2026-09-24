import * as Select from "@radix-ui/react-select";
import { ChevronDown, Check } from "lucide-react";

export type SortBy =
  "default" | "price-high" | "price-low" | "change-high" | "change-low" | "name-asc" | "name-desc";

interface MarketSortProps {
  value: string | SortBy;
  onChange: (value: SortBy) => void;
}

export default function MarketSort({ value, onChange }: MarketSortProps) {
  return (
    <Select.Root value={value} onValueChange={(next) => onChange(next as SortBy)}>
      <Select.Trigger
        aria-label="Sort currencies"
        className="flex items-center gap-2 rounded-md border border-white/10 bg-slate-800 px-3 py-2 text-sm text-white"
      >
        <Select.Value placeholder="sort" />
        <Select.Icon>
          <ChevronDown className="size-4" />
        </Select.Icon>
      </Select.Trigger>

      <Select.Portal>
        <Select.Content
          position="popper"
          sideOffset={6}
          className="z-50 rounded-md border border-white/10 bg-slate-800 p-1 text-sm text-white shadow-lg"
        >
          <Select.Viewport>
            <SortItem value="default">Default</SortItem>
            <SortItem value="price-high">Price: high to low</SortItem>
            <SortItem value="price-low">Price: low to high</SortItem>
            <SortItem value="change-low">% Change: low to high</SortItem>
            <SortItem value="change-high">% Change: high to low</SortItem>
            <SortItem value="name-asc">Name: A to Z</SortItem>
            <SortItem value="name-desc">Name: Z to A</SortItem>
          </Select.Viewport>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  );
}

function SortItem({ value, children }: { value: SortBy; children: React.ReactNode }) {
  return (
    <Select.Item
      value={value}
      className="relative cursor-pointer rounded px-3 py-2 pr-8 outline-none"
    >
      <Select.ItemText>{children}</Select.ItemText>
      <Select.ItemIndicator className="absolute top-1/2 right-2 -translate-y-1/2">
        <Check className="size-4" />
      </Select.ItemIndicator>
    </Select.Item>
  );
}
