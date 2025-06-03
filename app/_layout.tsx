import { Stack } from "expo-router";
import { AuthProvider } from "../src/contexts/authContext";

export default function RootLayout() {
  return (
    <AuthProvider>
      <Stack
        screenOptions={{
          headerTitle: "Login", 
        }}
      />
    </AuthProvider>
  );
}
