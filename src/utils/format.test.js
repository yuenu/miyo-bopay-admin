import { priceFormat, dateFormat } from "./format";

describe("format functions", () => {
  test("priceFormat", () => {
    expect(priceFormat({ val: 200, currency: 0 })).toBe(`¥ 2`);
  });
  test("dateFormat", () => {
    expect(dateFormat("2021-07-07T00:00:00+08:00")).toBe(`2021-07-07 00:00:00`);
    expect(dateFormat(null)).toBe(`is not valid date`);
    expect(dateFormat(123)).toBe(`is not valid date`);
  });
});
