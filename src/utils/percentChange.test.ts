import { describe, expect, it } from "vitest";
import { percentChange } from "./percentChange";

describe("percentChange", () => {
  it("calculates a price increase", () => {
    expect(percentChange(100, 102)).toBeCloseTo(2);
  });
  it("calculates a price decrease ", () => {
    expect(percentChange(100, 98)).toBeCloseTo(-2);
  });
  it("rejects a zero initial price", () => {
    expect(percentChange(0, 100)).toBeNull();
  });
  it("returns 0 when the price is unchanged", () => {
    expect(percentChange(100, 100)).toBe(0);
  });
  it("returns null for a negative initial price", () => {
    expect(percentChange(-5, 100)).toBeNull();
  });
});
