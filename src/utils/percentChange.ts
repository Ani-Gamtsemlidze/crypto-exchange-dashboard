export function percentChange(initial: number, current: number): number | null {
  if (!Number.isFinite(initial) || !Number.isFinite(current) || initial <= 0) return null;
  return ((current - initial) / initial) * 100;
}
