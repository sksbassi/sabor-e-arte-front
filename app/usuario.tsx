import { useCRUD } from "@/src/hooks/useCrud";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Button,
  FlatList,
  Text,
  TextInput,
  View,
} from "react-native";

interface usuario {
  id: string;
  nome: string;
  sobrenome: string;
  email: string;
  telefone: string;
  senha: string;
  //receita: Receita[]
}

const Usuarios = () => {
  // Usa o hook useCRUD passando a entidade "users" e o tipo Cliente.
  // A URL base do hook será algo como: https://suaapi.com/users

  const { data, loading, error, create, getAll, remove } =
    useCRUD<usuario>("usuario");

  // Estados para armazenar os dados do formulário
  const [nome, setNome] = useState("");
  const [sobrenome, setSobrenome] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const [senha, setSenha] = useState("");

  //useEffect para buscar todos os clientes assim que o componente for montado
  useEffect(() => {
    getAll('/rotausuario');
  }, []);//antes tinha data

  //função para cadastrar um novo usuario
  const handleSubmit = async () => {
    const novoUsuario = { nome, sobrenome, email, telefone, senha };
    try {
      await create(novoUsuario,'/rotausuario'); //Chama o método POST do Hook
      setNome("");
      setSobrenome("");
      setEmail("");
      setTelefone("");
      setSenha("");
      await getAll('/rotausuario'); //Chama a função que faz uma requisição GET para a api
    } catch (error) {
      console.log("Erro no cadastro de usuario" + error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await remove(id); // Chama o método de delete do hook
    } catch (error) {
      console.log("Erro para deletar o usuario" + error);
    }
  };

  //Fazer com que o valor 'data'(ou seja, ou dados) sejam sempre um Array
  const usuariodata = Array.isArray(data) ? data : data ? [data] : [];

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 18, marginBottom: 10 }}>
        Cadastro de Usuario
      </Text>
      {/* Campo de entrada para nome */}
      <TextInput
        value={nome}
        onChangeText={setNome}
        placeholder="Nome"
        style={{ borderBottomWidth: 1, marginBottom: 10 }}
      />

      <TextInput
        value={sobrenome}
        onChangeText={setSobrenome}
        placeholder="Sobrenome"
        style={{ borderBottomWidth: 1, marginBottom: 10 }}
      />

      {/* Campo de entrada para email */}
      <TextInput
        value={email}
        onChangeText={setEmail}
        placeholder="Email"
        keyboardType="email-address"
        style={{ borderBottomWidth: 1, marginBottom: 20 }}
      />

      <TextInput
        value={senha}
        onChangeText={setSenha}
        placeholder="Senha"
        keyboardType="visible-password"
        style={{ borderBottomWidth: 1, marginBottom: 20 }}
      />

      <TextInput
        value={telefone}
        onChangeText={setTelefone}
        placeholder="Telefone"
        keyboardType="phone-pad"
        style={{ borderBottomWidth: 1, marginBottom: 20 }}
      />

      {/* Botão para cadastrar */}
      <Button title={"Cadastrar"} onPress={handleSubmit} disabled={loading} />

      <Text style={{ marginTop: 20, fontWeight: "bold" }}>
        Lista de Clientes:
      </Text>

      {/* Exibe um indicador de carregamento, mensagem de erro ou a lista */}
      {loading ? (
        <ActivityIndicator size="large" color="#196e52" />
      ) : error ? (
        <Text style={{ color: "red" }}>Erro ao carregar clientes</Text>
      ) : (
        <FlatList
          data={usuariodata} // Garante que seja um array
          renderItem={({ item }) => (
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginBottom: 10,
              }}
            >
              <Text>
                {item.nome} - {item.email}
              </Text>
              <Button title="Excluir" onPress={() => handleDelete(item.id!)} />
            </View>
          )}
          keyExtractor={(item) =>
            item.id?.toString() || Math.random().toString()
          }
        />
      )}
    </View>
  );
};

export default Usuarios;
