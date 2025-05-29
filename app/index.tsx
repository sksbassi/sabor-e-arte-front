import { useRouter } from "expo-router";
import { useState } from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";
import { z } from "zod";
import { useAuth } from "../src/contexts/authContext";

const loginSchema = z.object({
  email: z.string().email("Email inválido"),
  password: z.string(),
});

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();
  const router = useRouter();

  const handleLogin = () => {
    const result = loginSchema.safeParse({ email, password });

    if (!result.success) {
      setError(result.error.errors[0].message);
      return;
    }

    if (password !== "1234567") {
      setError("Senha incorreta");
      return;
    }

    login(email);
    router.push("/profile");
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
        value={password}
        onChangeText={setPassword}
        style={styles.input}
        secureTextEntry
      />
      {error ? <Text style={styles.error}>{error}</Text> : null}
      <Button title="Entrar" onPress={handleLogin} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 20 },
  title: { fontSize: 24, marginBottom: 20, textAlign: "center" },
  input: { borderWidth: 1, borderColor: "#ccc", padding: 10, marginBottom: 10 },
  error: { color: "red", marginBottom: 10 },
});

// import { useRouter } from 'expo-router';
// import { useState } from 'react';
// import { Button, StyleSheet, Text, TextInput, View } from 'react-native';
// import { z } from 'zod';
// import { useAuth } from '../app/hooks/useAuth';
// //import { useAuth } from '../app/contexts/authContext';

// const loginSchema = z.object({
//   email: z.string().email(),
//   password: z.string().min(6)
// });

// export default function LoginScreen() {
//   const router = useRouter();
//   const { login } = useAuth();

//   const [email, setEmail] = useState('');
//   const [senha, setSenha] = useState('');
//   const [errorMsg, setErrorMsg] = useState('');

//   function handleSubmit() {
//     //O que safeParse(...) faz?
//     //O safeParse tenta validar os dados que você passa.
//     const result = loginSchema.safeParse({ email, senha });

//     if (!result.success) {
//       setErrorMsg('Email inválido ou senha muito curta.');
//       return;
//     }

//     // Armazena o e-mail do usuário no estado global da aplicação
//     if (email === 'ddm@gmail.com' && senha === '12345678') {
//       login(email);
//       router.push('/profile');
//     } else {
//       setErrorMsg('Email ou senha incorretos.');
//       return;
//     }
//   }

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Login</Text>

//       <TextInput
//         style={styles.input}
//         placeholder="Email"
//         value={email}
//         onChangeText={setEmail}
//         autoCapitalize="none"
//       />

//       <TextInput
//         style={styles.input}
//         placeholder="Senha"
//         value={senha}
//         onChangeText={setSenha}
//         secureTextEntry
//       />

//       {errorMsg !== '' && <Text style={styles.error}>{errorMsg}</Text>}

//       <Button title="Entrar" onPress={handleSubmit} />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: { padding: 20, flex: 1, justifyContent: 'center' },
//   input: { borderBottomWidth: 1, marginBottom: 10, padding: 8 },
//   title: { fontSize: 24, marginBottom: 20, textAlign: 'center' },
//   error: { color: 'red', marginBottom: 10 }
// });
