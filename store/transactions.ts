import { Receiver } from "@/store/payment";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export type Transaction = {
  receiver: Receiver;
  note: string;
  amount: string;
  id: string;
  date: string;
};

type TransactionsState = {
  transactions: Transaction[];
  selectedTransactionId: string | null;
  addTransaction: (transaction: Transaction) => void;
  clearTransactions: () => void;
  selectTransaction: (id: string) => void;
};

export const useTransactionsStore = create<TransactionsState>()(
  persist(
    (set) => ({
      transactions: [],
      selectedTransactionId: null,
      addTransaction: (transaction) =>
        set((state) => ({
          transactions: [transaction, ...state.transactions],
        })),
      clearTransactions: () => set({ transactions: [] }),
      selectTransaction: (id) => set({ selectedTransactionId: id }),
    }),
    {
      name: "transactions-storage",
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
