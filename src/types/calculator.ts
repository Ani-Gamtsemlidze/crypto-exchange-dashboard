export interface CurrencyDropdownProps {
  value: string;
  onChange: (value: string) => void;
}

export interface CurrencyInputRowProps {
  value: string;
  onValueChange?: (value: string) => void;
  editable: boolean;
  currency: string;
  onCurrencyChange: (value: string) => void;
}
