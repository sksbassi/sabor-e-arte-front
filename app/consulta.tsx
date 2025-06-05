import { useAuth } from "@/src/contexts/authContext";
import { useCRUD } from "@/src/hooks/useCrud";
import { Text } from "@react-navigation/elements";
import { router } from "expo-router";
import { useEffect } from "react";
import { ActivityIndicator, Button, FlatList, View } from "react-native";
import receita from "./receita";

// interface receita {
//     id: string;
//     nome: string;
//     ingredientes: string;
//     modoPreparo: string;
//     tempoPreparo: number;
//     classificacao: string;
//     dataPublicacao: Date;
//     usuarioId: string;
//     usuariopostagem: {
//         nome: string
//     }
// }

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
            console.log("Erro para deletar o usuario" + error);
        }

        router.push("/profile")
    };

    // const handleUpdate = async (id: string, receita: receita) => {
    //     try {
    //         await update(receita){
    //             where:id,
    //         }; // Chama o método de delete do hook
    //     } catch (error) {
    //         console.log("Erro para deletar o usuario" + error);
    //     }
    // };

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
        <View>
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
                                }}
                            >
                                <Text>
                                    {item.nome}
                                    -{item.ingredientes}
                                    -{item.modoPreparo}
                                    -{item.tempoPreparo}
                                    -{item.classificacao}
                                </Text>
                                <Button title="Editar" onPress={() => router.push({ pathname: "/receita", params: { idreceitaexistente: item.id } })}></Button>
                                <Button title="Excluir" onPress={() => handleDelete(item.id!)} />
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

