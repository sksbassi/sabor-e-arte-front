import { useCRUD } from "@/src/hooks/useCrud";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import {
  Button,
  Modal,
  Text,
  TextInput,
  View
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

const usuario = () => {
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
  const [showModal, setShowModal] = useState(false);
  const [mensagemErro, setMensagemErro] = useState("");
  const [showModalSucess, setShowModalSucess] = useState(false);

  // Validação de email
  const isEmailValid = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const isTelValid = (telefone: string) => {
    if (telefone.length === 11 || telefone.length === 10) {
      return true;
    }
  }

  const formatTelefone = (text: string) => {
    const cleaned = text.replace(/\D/g, "");

    if (cleaned.length <= 10) {
      return cleaned.replace(/(\d{2})(\d{4})(\d{0,4})/, "($1) $2-$3");
    } else {
      return cleaned.replace(/(\d{2})(\d{5})(\d{0,4})/, "($1) $2-$3");
    }
  };


  //useEffect para buscar todos os clientes assim que o componente for montado
  useEffect(() => {
    getAll();
  }, []);//antes tinha data

  //função para cadastrar um novo usuario
  const handleSubmit = async () => {

    setMensagemErro("");

    const novoUsuario = { nome, sobrenome, email, telefone, senha };
    try {
      if (!isEmailValid(email)) {
        setMensagemErro("Email inválido. Por favor, insira um email válido.");
        setShowModal(true);
        return;
      }

      if (!isTelValid(telefone)) {
        setMensagemErro("Telefone inválido. O número deve conter 11 dígitos");
        setShowModal(true);
        return;
      }
      setMensagemErro("");

      await create(novoUsuario); //Chama o método POST do Hook
      setNome("");
      setSobrenome("");
      setEmail("");
      setTelefone("");
      setSenha("");
      await getAll(); //Chama a função que faz uma requisição GET para a api
      setShowModalSucess(true);
    } catch (error) {
      console.log("Erro no cadastro o usuario" + error);
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
        Cadastro de Usuário
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
        value={formatTelefone(telefone)}
        onChangeText={(text) => setTelefone(text.replace(/\D/g, ""))}
        placeholder="Telefone"
        keyboardType="phone-pad"
        style={{ borderBottomWidth: 1, marginBottom: 20 }}
      />

      {/* Botão para cadastrar */}
      <Button title={"Cadastrar"} onPress={handleSubmit} disabled={loading} />

      {/* Modal de Erro */}
      <Modal
        visible={showModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowModal(false)}
      >
        <View
          style={{
            flex: 1,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <View
            style={{
              backgroundColor: "white",
              padding: 20,
              borderRadius: 10,
              width: "80%",
              alignItems: "center",
            }}
          >
            <Text style={{ fontSize: 16, marginBottom: 10, color: "red" }}>
              Erro
            </Text>
            <Text style={{ marginBottom: 20 }}>{mensagemErro}</Text>
            <Button title="Fechar" onPress={() => setShowModal(false)} />
          </View>
        </View>
      </Modal>
      <Modal
        visible={showModalSucess}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowModalSucess(false)}
      >
        <View style={{
          flex: 1,
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          justifyContent: "center",
          alignItems: "center"
        }}>
          <View style={{
            backgroundColor: "white",
            padding: 20,
            borderRadius: 20,
            width: "80%",
            alignItems: "center"
          }}>
            <Text style={{ fontSize: 16, color: "green", margin: 10 }}>
              Usuário cadastrado com sucesso!!!
            </Text>
            <Button title="OK" onPress={() => router.push('/')} />
          </View>
        </View>
      </Modal>
    </View>
  );

};

export default usuario;
