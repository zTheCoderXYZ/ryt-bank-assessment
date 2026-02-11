import { create } from "zustand";

export type Receiver = { name: string; accountNumber: string };

type PaymentState = {
  receiver: Receiver;
  amount: string;
  note: string;
  setReceiver: (r: Receiver) => void;
  setAmount: (a: string) => void;
  setNote: (n: string) => void;
  reset: () => void;
};

const initialReceiver: Receiver = { name: "", accountNumber: "" };

export const usePaymentStore = create<PaymentState>((set) => ({
  receiver: initialReceiver,
  amount: "",
  note: "",
  setReceiver: (receiver) => set({ receiver }),
  setAmount: (amount) => set({ amount }),
  setNote: (note) => set({ note }),
  reset: () =>
    set({ receiver: initialReceiver, amount: "", note: "" }),
}));
