import { useAuthStore } from "@/store/auth";
import { useLoadingStore } from "@/store/loading";
import { useMutation } from "@tanstack/react-query";

export const useLoginMutation = () =>
  useMutation({
    mutationFn: async () => {
      const { start, stop } = useLoadingStore.getState();
      start();
      try {
        await new Promise((resolve) => setTimeout(resolve, 2000));
        useAuthStore.getState().login("dummy-token");
        return true;
      } finally {
        stop();
      }
    },
  });
