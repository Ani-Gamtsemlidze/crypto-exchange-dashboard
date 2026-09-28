import { describe, expect, it } from "vitest";
import { calculateConversion } from "./calculateConversion";

describe("calculateConversion", () => {
  it("converts the entered amount using the current prices", () => {
    expect(calculateConversion("0.5", 100, 25)).toEqual({
      rate: 4,
      convertedAmount: "2.000000",
    });
  });

  it("returns an empty result when the source price is unavailable", () => {
    expect(calculateConversion("1", undefined, 25)).toEqual({
      rate: null,
      convertedAmount: "",
    });
  });

  it("returns an empty result when the target price is unavailable", () => {
    expect(calculateConversion("1", 100, undefined)).toEqual({
      rate: null,
      convertedAmount: "",
    });
  });

  it("returns an empty amount for an empty input", () => {
    expect(calculateConversion("", 100, 25)).toEqual({
      rate: 4,
      convertedAmount: "",
    });
  });

  it("converts zero to zero", () => {
    expect(calculateConversion("0", 100, 25)).toEqual({
      rate: 4,
      convertedAmount: "0.000000",
    });
  });

  it("returns an empty amount for a negative number", () => {
    expect(calculateConversion("-1", 100, 25)).toEqual({
      rate: 4,
      convertedAmount: "",
    });
  });

  it("returns an empty amount for non-numeric input", () => {
    expect(calculateConversion("abc", 100, 25).convertedAmount).toBe("");
  });

  it("does not divide by a zero target price", () => {
    expect(calculateConversion("1", 100, 0)).toEqual({
      rate: null,
      convertedAmount: "",
    });
  });

  it("calculates a new result when the target price changes", () => {
    expect(calculateConversion("1", 100, 25).convertedAmount).toBe("4.000000");
    expect(calculateConversion("1", 100, 50).convertedAmount).toBe("2.000000");
  });
});
