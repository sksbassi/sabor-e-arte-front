import { useAuth } from "@/src/contexts/authContext";
import { useCRUD } from "@/src/hooks/useCrud";
import { Text } from "@react-navigation/elements";
import { router } from "expo-router";
import { useEffect } from "react";
import { ActivityIndicator, FlatList, View } from "react-native";
import receita from "./receita";


const consultaReceita = () => {
    const { data, loading, error, create, getAll, remove, update } =
        useCRUD<receita>("receita");
    const { user } = useAuth();

    //useEffect para buscar todos os clientes assim que o componente for montado
    useEffect(() => {
        getAll();
    }, []);//antes tinha data

    const handleDelete = async (id: string) => {
        try {
            await remove(id); // Chama o método de delete do hook
        } catch (error) {
            console.log("Erro para deletar a receita" + error);
        }

        router.push("/profile")
    };

    const handleUpdate = async (id: string, receita: receita) => {
        try {
            const novaReceita: Partial<receita> = {
                nome: "Nome atualizado",
                classificacao: "Atualizada",
                // adicione outros campos se quiser
            };

            await update(id, novaReceita); // chama o método de PUT
        } catch (error) {
            console.log("Erro ao atualizar a receita: ", error);
        }
    };

    const receitadata = Array.isArray(data) ? data : data ? [data] : [];
    return (
        <View style={{ flex: 1 }}>
            <Text style={{ marginTop: 20, fontWeight: "bold" }}>
                Lista de Receitas:
            </Text>

            {
                loading ? (
                    <ActivityIndicator size="large" color="#196e52" />
                ) : error ? (
                    <Text style={{ color: "red" }}>Erro ao carregar receitas</Text>
                ) : (
                    <FlatList
                        data={receitadata}
                        renderItem={({ item }) => (
                            <View
                                style={{
                                    flexDirection: "row",
                                    justifyContent: "space-between",
                                    marginBottom: 10,
                                    padding: 10,
                                    borderRadius: 8
                                }}
                            >
                                <Text style={{ width: "95%" }}>
                                    <br />
                                    <Text style={{ fontWeight: "bold", marginBottom: 5 }}>
                                        {item.nome}{":"}
                                    </Text><br />
                                    {"Ingredientes:"}
                                    {item.ingredientes}
                                    <br />
                                    {"Modo preparo:"}{item.modoPreparo}
                                    <br />
                                    {"Tempo de preparo:"}{item.tempoPreparo}{"min"}
                                    <br />
                                    {"Classificação:"}{item.classificacao}
                                    <br />
                                </Text>
                                <View style={{ flexDirection: "row", gap: 5 }}>
                                    {/* <Button title="Editar" onPress={() => router.push({ pathname: "/receita", params: { idreceitaexistente: item.id } })}></Button>
                                <Button title="Excluir" onPress={() => handleDelete(item.id!)} /> */}
                                </View>
                            </View>
                        )}
                        keyExtractor={(item) =>
                            item.id?.toString() || Math.random().toString()
                        }
                    />

                )
            }
        </View>
    )
}

export default consultaReceita

