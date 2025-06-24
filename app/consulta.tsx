import { useAuth } from "@/src/contexts/authContext";
import { useCRUD } from "@/src/hooks/useCrud";
import { Text } from "@react-navigation/elements";
import { router } from "expo-router";
import { useEffect } from "react";
import { ActivityIndicator, FlatList, View } from "react-native";
import receita from "./receita";

const ConsultaReceita = () => {
    const { data, loading, error, getAll, remove, update } = useCRUD<receita>("receita");
    const { user } = useAuth();

    useEffect(() => {
        getAll(); //carregar todos assim que a tela for renderizada
    }, []);

    const handleDelete = async (id: string) => {
        try {
            await remove(id);
            router.push("/profile");
        } catch (error) {
            console.log("Erro ao deletar a receita: ", error);
        }
    };

    const handleUpdate = async (id: string, receita: receita) => {
        try {
            const novaReceita: Partial<receita> = {
                nome: "Nome atualizado",
                classificacao: "Atualizada",
            };
            await update(id, novaReceita);
        } catch (error) {
            console.log("Erro ao atualizar a receita: ", error);
        }
    };

    const receitaData = Array.isArray(data) ? data : data ? [data] : []; //listar todas as receitas

    return (
        <View style={{ flex: 1, padding: 10 }}>
            <Text style={{ marginTop: 20, fontWeight: "bold" }}>Lista de Receitas:</Text>

            {loading ? (
                <ActivityIndicator size="large" color="#196e52" />//Exibe um indicador de carregamento
            ) : error ? (
                <Text style={{ color: "red" }}>Erro ao carregar receitas</Text>
            ) : (
                <FlatList //Componente usado para renderizar listas grandes
                    data={receitaData}
                    keyExtractor={(item) => item.id?.toString() || Math.random().toString()}
                    renderItem={({ item }) => (
                        <View
                            style={{
                                flexDirection: "column",
                                marginBottom: 10,
                                padding: 10,
                                borderRadius: 8,
                                backgroundColor: "#f9f9f9",
                            }}
                        >
                            <Text style={{ fontWeight: "bold", marginBottom: 5 }}>{item.nome}:</Text>
                            <Text>Ingredientes: {item.ingredientes}</Text>
                            <Text>Modo de Preparo: {item.modoPreparo}</Text>
                            <Text>Tempo de Preparo: {item.tempoPreparo} min</Text>
                            <Text>Classificação: {item.classificacao}</Text>

                            {/* <View style={{ flexDirection: "row", marginTop: 10, gap: 5 }}>
                <Button title="Editar" onPress={() => handleUpdate(item.id!, item)} />
                <Button title="Excluir" onPress={() => handleDelete(item.id!)} />
              </View> */}
                        </View>
                    )}
                />
            )}
        </View>
    );
};

export default ConsultaReceita;


