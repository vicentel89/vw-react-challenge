import { formatCarsData } from "./formatCarsData";
import { Car } from "../types";

describe("formatCarsData", () => {
  const mockCars: Car[] = [
    {
      id: "1",
      brand: "Volkswagen",
      model: "Golf",
      year: 2020,
      mileage: 25000,
      color: "Blue",
    },
    {
      id: "2",
      brand: "Audi",
      model: "A3",
      year: 2019,
      mileage: 50000,
      color: "Red",
    },
  ];

  it("formats car data correctly", () => {
    const result = formatCarsData(mockCars);

    expect(result).toHaveLength(2);
    expect(result[0]).toEqual({
      brand: "Volkswagen",
      model: "Golf",
      year: 2020,
      mileage: "25.000 km",
      color: "Blue",
    });
    expect(result[1]).toEqual({
      brand: "Audi",
      model: "A3",
      year: 2019,
      mileage: "50.000 km",
      color: "Red",
    });
  });

  it("removes id field from each car", () => {
    const result = formatCarsData(mockCars);

    result.forEach((car) => {
      expect(car).not.toHaveProperty("id");
    });
  });

  it("formats mileage", () => {
    const carWithHighMileage: Car[] = [
      {
        id: "3",
        brand: "BMW",
        model: "X5",
        year: 2018,
        mileage: 123456,
        color: "Black",
      },
    ];

    const result = formatCarsData(carWithHighMileage);
    expect(result[0].mileage).toBe("123.456 km");
  });

  it("returns empty array when input is null or undefined", () => {
    expect(formatCarsData(null as unknown as Car[])).toEqual([]);
    expect(formatCarsData(undefined as unknown as Car[])).toEqual([]);
  });

  it("returns empty array when input is empty array", () => {
    expect(formatCarsData([])).toEqual([]);
  });

  it("handles single car correctly", () => {
    const singleCar: Car[] = [
      {
        id: "1",
        brand: "Tesla",
        model: "Model S",
        year: 2022,
        mileage: 5000,
        color: "White",
      },
    ];

    const result = formatCarsData(singleCar);
    expect(result).toHaveLength(1);
    expect(result[0]).toEqual({
      brand: "Tesla",
      model: "Model S",
      year: 2022,
      mileage: "5.000 km",
      color: "White",
    });
  });
});
