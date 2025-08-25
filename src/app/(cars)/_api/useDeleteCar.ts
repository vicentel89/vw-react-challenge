import { useMutation, useQueryClient } from "@tanstack/react-query";

import { LIST_CARS_URL } from "@/app/_common/constants";

export default function useDeleteCar() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteCar,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cars"] });
    },
  });
}

async function deleteCar(id: string): Promise<void> {
  const response = await fetch(`${LIST_CARS_URL}/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Failed to delete car");
  }
}
