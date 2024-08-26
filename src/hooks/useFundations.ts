import { getFundations } from "../services/fundationsService";
import { useFundationStore } from "../store/fundationStore";
import { useQuery } from "@tanstack/react-query";

export const useFundations = () => {
  const { fundations, setFundations } = useFundationStore();

  const fundationQuery = useQuery({
    queryKey: ["fundations"],
    queryFn: async () => {
      const data = await getFundations();
      setFundations(data);
      return data;
    },
  });

  return { fundations, ...fundationQuery };
};
