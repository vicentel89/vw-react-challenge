import { useMutation, useQueryClient } from "@tanstack/react-query";

import { LIST_CARS_URL } from "@/app/_common/constants";

import type { Car } from "../types";

type CreateCarData = Omit<Car, "id">;

export default function useCreateCar() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createCar,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cars"] });
    },
  });
}

async function createCar(carData: CreateCarData): Promise<Car> {
  const newCar: Car = {
    ...carData,
    id: generateId(),
  };

  const response = await fetch(LIST_CARS_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newCar),
  });

  if (!response.ok) {
    throw new Error("Failed to create car");
  }

  return response.json();
}

// This should be done on the backend
function generateId(): string {
  return (
    Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15)
  );
}
