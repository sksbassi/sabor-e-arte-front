import { useAuth } from "@/src/contexts/authContext";
import { useCRUD } from "@/src/hooks/useCrud";
import { useEffect, useMemo } from "react";
import { ActivityIndicator, Button, FlatList, Text, View } from "react-native";
import usuario from "./usuario";
import { router } from "expo-router";

interface Receita {
  id: string;
  nome: string;
  ingredientes: string;
  modoPreparo: string;
  tempoPreparo: number;
  classificacao: string;
  dataPublicacao: Date;
  usuarioId: string;
  usuariopostagem: {
    nome: string;
  };
}

export default function MinhasReceitasScreen() {
  const { data, loading, error, getAll, remove } = useCRUD<Receita>("receita");
  const { user } = useAuth();

  useEffect(() => {
    getAll();
  }, []);

  // Filtrar receitas apenas do usuário logado
  const minhasReceitas = useMemo(() => {
    const todasReceitas = Array.isArray(data) ? data : data ? [data] : [];
    // return todasReceitas.filter((r) => r.usuarioId === {user}.user?.id);
    return todasReceitas.filter((r) => String(r.usuarioId) === String(user?.id));

  }, [data, user?.id]);

  const handleDelete = async (id: string) => {
    try {
      await remove(id);
      await getAll();
    } catch (error) {
      console.log("Erro ao deletar receita: " + error);
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 18, marginBottom: 10 }}>Minhas Receitas</Text>

      {loading ? (
        <ActivityIndicator size="large" color="#196e52" />
      ) : error ? (
        <Text style={{ color: "red" }}>Erro ao carregar receitas</Text>
      ) : minhasReceitas.length === 0 ? (
        <Text>Você ainda não cadastrou nenhuma receita.</Text>
      ) : (
        <FlatList
          data={minhasReceitas}
          renderItem={({ item }) => (
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginBottom: 10,
              }}
            >
              <Text>{item.nome} - {item.ingredientes} - {item.modoPreparo} - {item.tempoPreparo}{"min"} - {item.classificacao}</Text>
              <View style={{flexDirection:"row", gap:5}}>
              <Button title="Editar" onPress={() => router.push({ pathname: "/receita", params: { idreceitaexistente: item.id } })}></Button>
              <Button title="Excluir" onPress={() => handleDelete(item.id)} />
              </View>
            </View>
          )}
          keyExtractor={(item) => item.id}
        />
      )}
    </View>
  );
}
