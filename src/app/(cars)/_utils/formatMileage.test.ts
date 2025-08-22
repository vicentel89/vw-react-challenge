import { formatMileage } from "./formatMileage";

describe("formatMileage", () => {
  it("formats mileage with German locale thousand separators", () => {
    expect(formatMileage(1000)).toBe("1.000 km");
  });

  it("formats mileage with multiple thousands", () => {
    expect(formatMileage(25000)).toBe("25.000 km");
  });

  it("formats mileage with hundreds of thousands", () => {
    expect(formatMileage(150000)).toBe("150.000 km");
  });

  it("formats zero mileage", () => {
    expect(formatMileage(0)).toBe("0 km");
  });

  it("formats small numbers without separators", () => {
    expect(formatMileage(500)).toBe("500 km");
  });

  it("formats large numbers with correct separators", () => {
    expect(formatMileage(1234567)).toBe("1.234.567 km");
  });
});
