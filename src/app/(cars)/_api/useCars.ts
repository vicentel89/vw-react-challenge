import { useQuery } from "@tanstack/react-query";

import { LIST_CARS_URL } from "@/app/_common/constants";

import { Car } from "../types";

interface UseCarsParams {
  search?: string;
}

export default function useCars({ search }: UseCarsParams = {}) {
  const { data: cars, ...queryResponse } = useQuery({
    queryKey: ["cars", search],
    queryFn: async (): Promise<Car[]> => {
      const response = await fetch(LIST_CARS_URL);
      const allCars: Car[] = await response.json();

      if (!search || search.trim() === "") {
        return allCars;
      }

      const searchTerm = search.toLowerCase().trim();
      return allCars.filter(
        (car) =>
          car.brand.toLowerCase().includes(searchTerm) ||
          car.model.toLowerCase().includes(searchTerm) ||
          car.color.toLowerCase().includes(searchTerm) ||
          car.year.toString().includes(searchTerm)
      );
    },
  });

  return { ...queryResponse, cars };
}
