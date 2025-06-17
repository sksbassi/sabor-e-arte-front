import { useAuth } from "@/src/contexts/authContext";
import { useCRUD } from "@/src/hooks/useCrud";
import { router } from "expo-router";
import { useEffect, useMemo, useState } from "react";
import { ActivityIndicator, Button, FlatList, Modal, Text, View } from "react-native";

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

  const [showModalDelete, setShowModalDelete] = useState(false);

  useEffect(() => {
    getAll();
  }, []);

  // Filtra só as receitas do usuário logado
  const minhasReceitas = useMemo(() => {
    const todasReceitas = Array.isArray(data) ? data : data ? [data] : [];
    return todasReceitas.filter((r) => String(r.usuarioId) === String(user?.id));
  }, [data, user?.id]);

  const handleDelete = async (id: string) => {
    try {
      await remove(id);
      await getAll();
      setShowModalDelete(true);
    } catch (error) {
      console.log("Erro ao deletar receita:", error);
    }
  };

  function edicaoReceita() {

  }

  return (
    <View style={{ flex: 1, padding: 10 }}>
      <Text style={{ fontSize: 18, marginBottom: 10, fontWeight: "bold" }}>
        Minhas Receitas
      </Text>

      {loading ? (
        <ActivityIndicator size="large" color="#196e52" />
      ) : error ? (
        <Text style={{ color: "red" }}>Erro ao carregar receitas.</Text>
      ) : minhasReceitas.length === 0 ? (
        <Text>Você ainda não cadastrou nenhuma receita.</Text>
      ) : (
        <FlatList
          data={minhasReceitas}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View
              style={{
                backgroundColor: "#f9f9f9",
                padding: 10,
                borderRadius: 8,
                marginBottom: 10,
              }}
            >
              <Text style={{ fontWeight: "bold", fontSize: 16, marginBottom: 5 }}>
                {item.nome}
              </Text>
              <Text>Ingredientes: {item.ingredientes}</Text>
              <Text>Modo de Preparo: {item.modoPreparo}</Text>
              <Text>Tempo de Preparo: {item.tempoPreparo} min</Text>
              <Text>Classificação: {item.classificacao}</Text>

              <View
                style={{
                  flexDirection: "row",
                  marginTop: 10,
                  justifyContent: "space-between",
                }}
              >
                <Button
                  title="Editar"
                  onPress={() =>
                    router.push({
                      pathname: "/receita",
                      params: { idreceitaexistente: item.id },
                    })
                  }
                />
                <Button
                  title="Excluir"
                  color="red"
                  onPress={() => handleDelete(item.id)}
                />
              </View>
            </View>
          )}
        />
      )}

      <Modal
        visible={showModalDelete}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowModalDelete(false)}
      >
        <View style={{
          flex: 1,
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          justifyContent: "center",
          alignItems: "center"
        }}>
          <View style={{
            backgroundColor: "white",
            justifyContent: "center",
            alignItems: "center",
            padding: 20,
            borderRadius: 10,
            width: "80%"
          }}>
            <Text style={{ color: "green" }}>Receita excluída com sucesso!!!</Text>
            <Button title="OK" onPress={() => setShowModalDelete(false)}></Button>
          </View>
        </View>
      </Modal>
    </View>
  );
}

