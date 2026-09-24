import { useEffect, useState } from "react";

function init<T>(key: string, initialValue: T): T {
  try {
    const savedValue = localStorage.getItem(key);

    return savedValue === null ? initialValue : (JSON.parse(savedValue) as T);
  } catch {
    return initialValue;
  }
}

export function useLocalstorage<T>(key: string, initialValue: T) {
  const [value, setValue] = useState<T>(() => init(key, initialValue));
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);
  return [value, setValue] as const;
}
