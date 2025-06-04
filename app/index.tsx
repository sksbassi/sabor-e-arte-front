import { useCRUD } from "@/src/hooks/useCrud";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";
import { z } from "zod";
import { useAuth } from "../src/contexts/authContext";
import usuario from "./usuario";
// import Usuarios from "../app/usuario";
//import usuario from "../app/usuario";


const loginSchema = z.object({
  email: z.string().email("Email inválido"),
  senha: z.string(),
});


export default function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();
  const router = useRouter();

  const { data, getAll, getByEmail } = useCRUD<usuario>("usuario");

  useEffect(() => {
    getAll(); // pega todos os usuários
  }, []);

  const handleLogin = async () => {
    const result = loginSchema.safeParse({ email, senha });

    if (!result.success) {
      setError(result.error.errors[0].message);
      return;
    }

    const usuario = await getByEmail(email);
    console.log(usuario);
    console.log(senha);

    if (usuario && usuario.senha === senha) {
      login(usuario.id);
      router.push("/profile");
    } else {
      setError("Email ou senha incorretos.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        autoCapitalize="none"
        keyboardType="email-address"
      />
      <TextInput
        placeholder="Senha"
        value={senha}
        onChangeText={setSenha}
        style={styles.input}
        secureTextEntry
      />
      {error ? <Text style={styles.error}>{error}</Text> : null}
      <Button title="Entrar" onPress={handleLogin} />
      <br />
      <Button title="Cadastrar" onPress={() => router.push("/usuario")} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 20 },
  title: { fontSize: 24, marginBottom: 20, textAlign: "center" },
  input: { borderWidth: 1, borderColor: "#ccc", padding: 10, marginBottom: 10 },
  error: { color: "red", marginBottom: 10 },
});

