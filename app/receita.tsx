import { useAuth } from "@/src/contexts/authContext";
import { useCRUD } from "@/src/hooks/useCrud";
import { useEffect, useState } from "react";
import { ActivityIndicator, Button, FlatList, Text, TextInput, View } from "react-native";

interface receita {
    id: string;
    nome: string;
    ingredientes: string;
    modoPreparo: string;
    tempoPreparo: number;
    classificacao: string;
    dataPublicacao: Date;
    usuarioId: string;
    usuariopostagem: {
        nome: string
    }

}

const receita = () => {
    const { data, loading, error, create, getAll, remove } =
        useCRUD<receita>("receita");
        const {user} = useAuth();

    // Estados para armazenar os dados do formulário
    const [nome, setNome] = useState("");
    const [ingredientes, setIngredientes] = useState("");
    const [modoPreparo, setModoPreparo] = useState("");
    const [tempoPreparo, setTempoPreparo] = useState(0);
    const [classificacao, setClassificacao] = useState("");

    //useEffect para buscar todos os clientes assim que o componente for montado
    useEffect(() => {
        getAll();
    }, []);//antes tinha data

    //função para cadastrar um novo usuario
    const handleSubmit = async () => {
        const novaReceita = { nome, ingredientes, modoPreparo, tempoPreparo, classificacao, usuarioId:user?.id };

        try {
            await create(novaReceita); //Chama o método POST do Hook
            setNome("");
            setIngredientes("");
            setModoPreparo("");
            setTempoPreparo(0);
            setClassificacao("");
            await getAll(); //Chama a função que faz uma requisição GET para a api
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
    const receitadata = Array.isArray(data) ? data : data ? [data] : [];
    return (
        <View style={{ padding: 20 }}>

            <Text style={{ fontSize: 18, marginBottom: 10 }}>
                Cadastro de Receita
            </Text>
            {/* Campo de entrada para nome */}
            <TextInput
                value={nome}
                onChangeText={setNome}
                placeholder="Nome"
                style={{ borderBottomWidth: 1, marginBottom: 10 }}
            />

            <TextInput
                value={ingredientes}
                onChangeText={setIngredientes}
                placeholder="Ingredientes"
                style={{ borderBottomWidth: 1, marginBottom: 10 }}
            />

            {/* Campo de entrada para email */}
            <TextInput
                value={modoPreparo}
                onChangeText={setModoPreparo}
                placeholder="Modo de Preparo"
                style={{ borderBottomWidth: 1, marginBottom: 20 }}
            />

            <TextInput
                value={tempoPreparo.toString()}
                onChangeText={(text) => setTempoPreparo(Number(text))}
                placeholder="Tempo de Preparo"
                style={{ borderBottomWidth: 1, marginBottom: 20 }}
            />

            <TextInput
                value={classificacao}
                onChangeText={setClassificacao}
                placeholder="Classificacao"
                style={{ borderBottomWidth: 1, marginBottom: 20 }}
            />

            {/* Botão para cadastrar */}
            <Button title={"Cadastrar"} onPress={handleSubmit} disabled={loading} />


            <Text style={{ marginTop: 20, fontWeight: "bold" }}>
                Lista de Receitas:
            </Text>

            {/* Exibe um indicador de carregamento, mensagem de erro ou a lista */}
            {loading ? (
                <ActivityIndicator size="large" color="#196e52" />
            ) : error ? (
                <Text style={{ color: "red" }}>Erro ao carregar receitas</Text>
            ) : (
                <FlatList
                    data={receitadata} // Garante que seja um array
                    renderItem={({ item }) => (
                        <View
                            style={{
                                flexDirection: "row",
                                justifyContent: "space-between",
                                marginBottom: 10,
                            }}
                        >
                            <Text>
                                {item.nome} - {item.classificacao}
                            </Text>
                            <Button title="Excluir" onPress={() => handleDelete(item.id!)} />
                        </View>
                    )}
                    keyExtractor={(item) =>
                        item.id?.toString() || Math.random().toString()
                    }
                />

            )}
        </View>)
}

export default receita