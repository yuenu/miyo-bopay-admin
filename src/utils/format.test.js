import { priceFormat } from "./format";

describe("format functions", () => {
  test("priceFormat", () => {
    expect(priceFormat({ val: 200, currency: 0 })).toBe(`¥ 2`);
  });
});
