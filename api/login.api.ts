import { useAuthStore } from "@/store/auth";
import { useLoadingStore } from "@/store/loading";

export const login = async () => {
  const { start, stop } = useLoadingStore.getState();
  start();
  try {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    useAuthStore.getState().login("dummy-token");
  } finally {
    stop();
  }

  return true;
};
