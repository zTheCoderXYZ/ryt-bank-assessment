import { useLoadingStore } from "@/store/loading";
import { Transaction, useTransactionsStore } from "@/store/transactions";
import { useUserStore } from "@/store/user";
import { useMutation } from "@tanstack/react-query";

export const useTransferMutation = () =>
  useMutation({
    mutationFn: async (transaction: Omit<Transaction, "id">) => {
      const { start, stop } = useLoadingStore.getState();
      const { addTransaction } = useTransactionsStore.getState();
      start();
      try {
        await new Promise((resolve) => setTimeout(resolve, 2000));
        const transactionId =
          "TXN" +
          Math.floor(Math.random() * 1000000)
            .toString()
            .padStart(6, "0");
        addTransaction({ ...transaction, id: transactionId });
        useUserStore.getState().decrementBalance(Number(transaction.amount));
        return true;
      } catch (error) {
        console.error("Transfer failed:", error);
        throw error;
      } finally {
        stop();
      }
    },
  });
