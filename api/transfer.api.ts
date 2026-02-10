import { useLoadingStore } from "@/store/loading";
import { Transaction, useTransactionsStore } from "@/store/transactions";
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
        return true;
      } finally {
        stop();
      }
    },
  });
