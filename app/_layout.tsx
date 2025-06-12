import { Stack } from "expo-router";
import { AuthProvider } from "../src/contexts/authContext";
import { View } from "react-native";


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

