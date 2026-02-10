import { useAuthStore } from "@/store/auth";
import { useLoadingStore } from "@/store/loading";
import { useMutation } from "@tanstack/react-query";

export const useLogoutMutation = () =>
  useMutation({
    mutationFn: async () => {
      const { start, stop } = useLoadingStore.getState();
      start();
      try {
        await new Promise((resolve) => setTimeout(resolve, 2000));
        useAuthStore.getState().logout();
        return true;
      } finally {
        stop();
      }
    },
  });
