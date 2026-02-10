import { useLoadingStore } from "@/store/loading";

export const transfer = async () => {
  const { start, stop } = useLoadingStore.getState();
  start();
  try {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    return true;
  } finally {
    stop();
  }
};
