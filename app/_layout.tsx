import { Stack } from "expo-router";
import { AuthProvider } from "../src/contexts/authContext";


export default function RootLayout() { //layout da aplicação, executado antes de qualquer tela
  return (
    <AuthProvider> 
      <Stack
        screenOptions={{
          headerTitle: "SABOR & ARTE",
        }}
      />
    </AuthProvider>
  );//AuthProvider é um componente de contexto usado para gerenciar estados
  //Nesse caso ele envolve toda a pilha de navegação
}

