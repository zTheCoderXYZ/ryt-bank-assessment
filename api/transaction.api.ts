import { useLoadingStore } from "@/store/loading";
import { Transaction, useTransactionsStore } from "@/store/transactions";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";

type TransactionsQueryOptions = Omit<
  UseQueryOptions<Transaction[], Error>,
  "queryKey" | "queryFn"
>;

export const useTransactionsQuery = (options?: TransactionsQueryOptions) =>
  useQuery({
    queryKey: ["transactions"],
    queryFn: async () => {
      const { start, stop } = useLoadingStore.getState();
      start();
      try {
        await new Promise((resolve) => setTimeout(resolve, 2000));
        return useTransactionsStore.getState().transactions;
      } catch (error) {
        console.error("Failed to fetch transactions:", error);
        throw error;
      } finally {
        stop();
      }
    },
    ...options,
  });
