import { useQuery } from "@tanstack/react-query";

import { LIST_CARS_URL } from "@/app/_common/constants";

import { Car } from "../types";

export default function useCars() {
  const { data: cars, ...queryResponse } = useQuery({
    queryKey: ["cars"],
    queryFn: async (): Promise<Array<Car>> => {
      const response = await fetch(LIST_CARS_URL);
      return await response.json();
    },
  });

  return { ...queryResponse, cars };
}
