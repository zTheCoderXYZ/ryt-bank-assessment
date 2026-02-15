import { useLoadingStore } from "@/store/loading";
import { useUserStore } from "@/store/user";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";

type BalanceQueryOptions = Omit<
  UseQueryOptions<number, Error>,
  "queryKey" | "queryFn"
>;

export const useBalanceQuery = (options?: BalanceQueryOptions) =>
  useQuery({
    queryKey: ["balance"],
    queryFn: async () => {
      const { start, stop } = useLoadingStore.getState();
      start();
      try {
        await new Promise((resolve) => setTimeout(resolve, 2000));
        return useUserStore.getState().balance;
      } catch (error) {
        console.error("Failed to fetch balance:", error);
        throw error;
      } finally {
        stop();
      }
    },
    ...options,
  });
