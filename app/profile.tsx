import { useRouter } from "expo-router";
import { Button, StyleSheet, Text, View } from "react-native";
import { useAuth } from "../src/hooks/useAuth";

export default function ProfileScreen() {
  const { user, logout } = useAuth();
  const router = useRouter();

  function handleLogout() {
    logout();
    router.replace("/");
  }

  // function handleClientes() {
  //   router.push("/usuario");
  // }

  function handleReceitas() {
    router.push("/receita");
  }

  function handleTodasReceitas(){
    router.push("/consulta");
  }


  return (
    <View style={styles.container}>
      <Text style={styles.text}>Bem-vindos cozinheiros!</Text>

      <Button title="Receitas" onPress={handleReceitas} />
      <Text>{'\n'}</Text>
      <Button title="Pesquisar" onPress={handleTodasReceitas}></Button>
      <Text>{'\n'}</Text>
      <Button title="Sair" onPress={handleLogout} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: { fontSize: 20, marginBottom: 20 },
});
