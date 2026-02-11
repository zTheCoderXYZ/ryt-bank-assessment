import { useLoadingStore } from "@/store/loading";
import { useTransactionsStore } from "@/store/transactions";
import { useQuery } from "@tanstack/react-query";

export const useTransactionsQuery = () =>
  useQuery({
    queryKey: ["transactions"],
    queryFn: async () => {
      const { start, stop } = useLoadingStore.getState();
      start();
      try {
        await new Promise((resolve) => setTimeout(resolve, 2000));
        return useTransactionsStore.getState().transactions;
      } finally {
        stop();
      }
    },
  });
