import { useQuery } from "@tanstack/react-query";

import { LIST_MODELS_URL } from "@/app/_common/constants";

import { Model } from "../types";

export default function useModels(brandId: string) {
  const { data: models, ...queryResponse } = useQuery({
    queryKey: ["models", brandId],
    queryFn: async (): Promise<Array<Model>> => {
      const response = await fetch(`${LIST_MODELS_URL}?brandId=${brandId}`);
      return await response.json();
    },
    enabled: !!brandId,
  });

  return { ...queryResponse, models };
}
