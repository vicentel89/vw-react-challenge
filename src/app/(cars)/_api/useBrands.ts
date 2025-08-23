import { useQuery } from "@tanstack/react-query";

import { LIST_BRANDS_URL } from "@/app/_common/constants";

interface Brand {
  id: string;
  name: string;
}

export default function useBrands() {
  const { data: brands, ...queryResponse } = useQuery({
    queryKey: ["brands"],
    queryFn: async (): Promise<Array<Brand>> => {
      const response = await fetch(LIST_BRANDS_URL);
      return await response.json();
    },
  });

  return { ...queryResponse, brands };
}
