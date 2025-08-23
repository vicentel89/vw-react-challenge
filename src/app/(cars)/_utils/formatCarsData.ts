import { Car } from "../types";
import { formatMileage } from "./formatMileage";

export function formatCarsData(
  cars: Array<Car>
): Array<Record<string, string | number>> {
  if (!cars) return [];

  const formattedCars = cars.map(({ id: _id, mileage, ...car }) => ({
    ...car,
    mileage: formatMileage(mileage),
  }));

  return formattedCars;
}
