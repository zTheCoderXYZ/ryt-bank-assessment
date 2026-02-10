import { useAuthStore } from "@/store/auth";

export const logout = () => {
  useAuthStore.getState().logout();

  return true;
};
