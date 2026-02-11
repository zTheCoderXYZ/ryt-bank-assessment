import { useLoadingStore } from "@/store/loading";
import { useUserStore } from "@/store/user";
import { useQuery } from "@tanstack/react-query";

export const useBalanceQuery = () =>
  useQuery({
    queryKey: ["balance"],
    queryFn: async () => {
      const { start, stop } = useLoadingStore.getState();
      start();
      try {
        await new Promise((resolve) => setTimeout(resolve, 2000));
        return useUserStore.getState().balance;
      } finally {
        stop();
      }
    },
  });
