import { Stack } from "expo-router";
import { createContext, useContext, useMemo, useState } from "react";

type Receiver = { name: string; accountNumber: string } | null;

type PaymentFlowState = {
  receiver: Receiver;
  amount: string;
  note: string;
  setReceiver: (r: Receiver) => void;
  setAmount: (a: string) => void;
  setNote: (n: string) => void;
};

const PaymentFlowContext = createContext<PaymentFlowState | null>(null);

export function usePaymentFlow() {
  const ctx = useContext(PaymentFlowContext);
  if (!ctx)
    throw new Error("usePaymentFlow must be used inside PaymentFlowProvider");
  return ctx;
}

export default function PaymentModule() {
  const [receiver, setReceiver] = useState<Receiver>(null);
  const [amount, setAmount] = useState<string>("");
  const [note, setNote] = useState<string>("");
  const value = useMemo(
    () => ({ receiver, amount, note, setReceiver, setAmount, setNote }),
    [receiver, amount, note],
  );

  return (
    <PaymentFlowContext.Provider value={value}>
      <Stack>
        <Stack.Screen name="step1" options={{ headerShown: false }} />
        <Stack.Screen name="step2" />
        <Stack.Screen name="step3" />
        <Stack.Screen name="step4" options={{ headerShown: false }} />
      </Stack>
    </PaymentFlowContext.Provider>
  );
}
