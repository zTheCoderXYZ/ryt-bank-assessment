import { useAuthStore } from "@/store/auth";
import { Redirect } from "expo-router";

export default function App() {
  const { token } = useAuthStore();

  if (token) {
    return <Redirect href="/(main)" />;
  } else {
    return <Redirect href="/(auth)/login" />;
  }
}
