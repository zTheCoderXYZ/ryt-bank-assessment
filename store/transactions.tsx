import { Receiver } from "@/app/(main)/payment/_layout";
import { create } from "zustand";

export type Transaction = {
  receiver: Receiver;
  note: string;
  amount: string;
  id: string;
};

type TransactionsState = {
  transactions: Transaction[];
  addTransaction: (transaction: Transaction) => void;
  clearTransactions: () => void;
};

export const useTransactionsStore = create<TransactionsState>((set) => ({
  transactions: [],
  addTransaction: (transaction) =>
    set((state) => ({
      transactions: [transaction, ...state.transactions],
    })),
  clearTransactions: () => set({ transactions: [] }),
}));
