import * as Popover from "@radix-ui/react-popover";
import { Check, ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import { CRYPTO_PAIRS } from "../../constants/cryptoPairs";
import type { CurrencyDropdownProps } from "../../types/calculator";

export default function CurrencyDropdown({
  value,
  onChange,
  excludeSymbol,
}: CurrencyDropdownProps) {
  const [open, setOpen] = useState(false);
  const selected = CRYPTO_PAIRS.find((crypto) => crypto.symbol === value);

  return (
    <Popover.Root open={open} onOpenChange={setOpen}>
      <Popover.Trigger
        aria-label="Select currency"
        className="flex items-center gap-2 rounded-md border border-border bg-surface-2 px-3 py-2 text-sm text-text-primary"
      >
        {selected && (
          <img
            src={`https://cdn.jsdelivr.net/gh/spothq/cryptocurrency-icons/svg/color/${selected.icon}.svg`}
            alt=""
            className="h-5 w-5 object-contain"
          />
        )}
        {selected?.icon.toUpperCase() ?? value}
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
          className="z-[100] min-w-[180px] rounded-md border border-border bg-surface p-1 text-sm text-text-primary shadow-lg"
        >
          {CRYPTO_PAIRS.filter((crypto) => crypto.symbol !== excludeSymbol).map((crypto) => (
            <button
              key={crypto.symbol}
              type="button"
              onClick={() => {
                onChange(crypto.symbol);
                setOpen(false);
              }}
              className={`flex w-full items-center gap-3 rounded px-3 py-2 text-left focus-visible:outline-2 focus-visible:outline-accent md:hover:bg-border ${
                value === crypto.symbol ? "bg-border dark:bg-white/10" : ""
              }`}
            >
              <div>
                <img
                  src={`https://cdn.jsdelivr.net/gh/spothq/cryptocurrency-icons/svg/color/${crypto.icon}.svg`}
                  alt=""
                  className="h-5 w-5 object-contain sm:h-8 sm:w-8"
                />
              </div>
              <span className="flex-1">{crypto.icon.toUpperCase()}</span>
              {value === crypto.symbol && <Check className="size-4" aria-hidden="true" />}
            </button>
          ))}
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}
