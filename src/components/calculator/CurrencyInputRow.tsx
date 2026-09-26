import type { CurrencyInputRowProps } from "../../types/calculator";
import CurrencyDropdown from "./CurrencyDropdown";

export default function CurrencyInputRow({
  value,
  editable,
  onValueChange,
  currency,
  onCurrencyChange,
}: CurrencyInputRowProps) {
  const validAmountRegex = /^\d*\.?\d{0,8}$/;

  function handleAmountChange(val: string) {
    if (val === "") {
      onValueChange?.("");
      return;
    }
    if (!validAmountRegex.test(val)) {
      return;
    }
    const num = Number(val);
    if (!Number.isFinite(num) || num < 0) {
      return;
    }

    onValueChange?.(val);
  }
  return (
    <div className="flex items-center gap-2 rounded-md border border-white/10 bg-slate-800 px-3 py-2 text-sm text-white">
      <input
        type="text"
        inputMode="decimal"
        min={editable ? "0" : undefined}
        value={value}
        onChange={editable ? (e) => handleAmountChange?.(e.target.value) : undefined}
        readOnly={!editable}
        placeholder="0.00"
        className={`min-w-0 flex-1 [appearance:textfield] bg-transparent px-1 py-1 outline-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none ${
          editable ? "text-white" : "text-gray-300"
        }`}
      />

      <div className="h-6 w-px bg-white/10" />

      <CurrencyDropdown value={currency} onChange={onCurrencyChange} />
    </div>
  );
}
