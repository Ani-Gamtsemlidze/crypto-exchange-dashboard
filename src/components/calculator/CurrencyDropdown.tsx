import * as Select from "@radix-ui/react-select";
import { Check, ChevronDown } from "lucide-react";
import type { CurrencyDropdownProps } from "../../types/calculator";
import { CRYPTO_PAIRS } from "../../constants/cryptoPairs";

export default function CurrencyDropdown({ value, onChange }: CurrencyDropdownProps) {
  return (
    <div className="flex items-center rounded-md border border-white/10 bg-slate-800 px-3 py-2 text-sm text-white">
      <div className="flex">
        <Select.Root value={value} onValueChange={onChange}>
          <Select.Trigger className="flex shrink-0 items-center gap-1" aria-label="Select currency">
            <Select.Value placeholder="BTCUSDT" />
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
                {CRYPTO_PAIRS.map((crypto) => (
                  <Select.Item
                    key={crypto.symbol}
                    value={crypto.symbol}
                    className="relative cursor-pointer rounded px-3 py-2 pr-8 outline-none"
                  >
                    <Select.ItemText>
                      <div className="flex items-center">
                        <img
                          src={`https://cdn.jsdelivr.net/gh/spothq/cryptocurrency-icons/svg/color/${crypto.icon}.svg`}
                          alt={crypto.symbol}
                          className="h-5 w-5 object-contain sm:h-8 sm:w-8"
                        />

                        <p className="font-base ml-3 sm:text-lg">{crypto.icon.toUpperCase()}</p>
                      </div>
                    </Select.ItemText>
                    <Select.ItemIndicator className="absolute top-1/2 right-2 -translate-y-1/2">
                      <Check className="size-4" />
                    </Select.ItemIndicator>
                  </Select.Item>
                ))}
              </Select.Viewport>
            </Select.Content>
          </Select.Portal>
        </Select.Root>
      </div>
    </div>
  );
}
