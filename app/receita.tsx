import { useAuth } from "@/src/contexts/authContext";
import { useCRUD } from "@/src/hooks/useCrud";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Button, Text, TextInput, View } from "react-native";


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
    const { data, loading, error, create, getAll, remove, update } =
        useCRUD<receita>("receita");
    const { user } = useAuth();
    const { idreceitaexistente } = useLocalSearchParams();

    // Estados para armazenar os dados do formulário
    const [nome, setNome] = useState("");
    const [ingredientes, setIngredientes] = useState("");
    const [modoPreparo, setModoPreparo] = useState("");
    const [tempoPreparo, setTempoPreparo] = useState(0);
    const [classificacao, setClassificacao] = useState("");

    //useEffect para buscar todos os clientes assim que o componente for montado
    // useEffect(() => {
    //     getAll();
    // }, []);//antes tinha data

    useEffect(() => {
        if (idreceitaexistente && typeof idreceitaexistente === "string") {
            const carregarReceita = async () => {
                const resultado = await getAll() as receita[]; // ou criar um getById se preferir
                const receitaExistente = resultado.find(r => r.id === idreceitaexistente);
                if (receitaExistente) {
                    setNome(receitaExistente.nome);
                    setIngredientes(receitaExistente.ingredientes);
                    setModoPreparo(receitaExistente.modoPreparo);
                    setTempoPreparo(receitaExistente.tempoPreparo);
                    setClassificacao(receitaExistente.classificacao);
                }
            };
            carregarReceita();
        }
    }, [idreceitaexistente]);


    //função para cadastrar um novo usuario
    const handleSubmit = async () => {
        const novaReceita = { nome, ingredientes, modoPreparo, tempoPreparo, classificacao, usuarioId: user?.id };

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

    function handleMinhasReceitas() {
        router.push("/minhasreceitas");
    }

    const handleSalvar = async () => {
        const novaReceita = {
            nome,
            ingredientes,
            modoPreparo,
            tempoPreparo,
            classificacao,
            usuarioId: user?.id,
        };

        try {
            if (idreceitaexistente && typeof idreceitaexistente === "string") {
                await update(idreceitaexistente, novaReceita);
            } else {
                await create(novaReceita);
            }

            // Limpar campos
            setNome("");
            setIngredientes("");
            setModoPreparo("");
            setTempoPreparo(0);
            setClassificacao("");

            await getAll(); // Atualizar lista
            router.push("/minhasreceitas"); // Volta para listagem
        } catch (error) {
            console.log("Erro ao salvar receita", error);
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
            {/*<Button title={"Cadastrar"} onPress={handleSubmit} disabled={loading} />*/}
            <Button
                title={idreceitaexistente ? "Atualizar" : "Cadastrar"}
                onPress={handleSalvar}
                disabled={loading}
            />
            <br />
            <Button title={"Minhas receitas"} onPress={handleMinhasReceitas}></Button>



        </View>)
}

export default receita