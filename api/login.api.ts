import { useAuthStore } from "@/store/auth";

export const login = () => {
  useAuthStore.getState().login("dummy-token");

  return true;
};
