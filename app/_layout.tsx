import { Stack } from "expo-router";
import { Image } from "react-native";
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
