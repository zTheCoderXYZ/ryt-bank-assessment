import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface AuthState {
  token: string | null;
  login: (token: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      login: (token: string) => set(() => ({ token })),
      logout: () => set(() => ({ token: null })),
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
