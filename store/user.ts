import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type UserState = {
  balance: number;
  setBalance: (balance: number) => void;
  incrementBalance: (amount: number) => void;
  decrementBalance: (amount: number) => void;
};

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      balance: 2500,
      setBalance: (balance) => set({ balance }),
      incrementBalance: (amount) =>
        set((state) => ({ balance: state.balance + amount })),
      decrementBalance: (amount) =>
        set((state) => ({ balance: Math.max(0, state.balance - amount) })),
    }),
    {
      name: "user-storage",
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
