import React, { useCallback, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useFocusEffect } from "expo-router";
import {
  listarFavoritos,
  excluirFavorito,
} from "../../services/favoritesService";

export default function FavoritesScreen() {
  const [favoritos, setFavoritos] = useState<any[]>([]);

  async function carregarFavoritos() {
    const dados = await listarFavoritos();
    setFavoritos(dados);
  }

  useFocusEffect(
    useCallback(() => {
      carregarFavoritos();
    }, [])
  );

  async function remover(idFirebase: string) {
    Alert.alert(
      "Excluir",
      "Deseja remover este Pokémon dos favoritos?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Excluir",
          onPress: async () => {
            await excluirFavorito(idFirebase);
            carregarFavoritos();
          },
        },
      ]
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>❤️ Favoritos</Text>

      <FlatList
        data={favoritos}
        keyExtractor={(item) => item.idFirebase}
        ListEmptyComponent={
          <Text style={styles.empty}>
            Nenhum Pokémon favoritado.
          </Text>
        }
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image
              source={{ uri: item.imagem }}
              style={styles.image}
            />

            <View style={{ flex: 1 }}>
              <Text style={styles.name}>
                {item.nome.toUpperCase()}
              </Text>

              <Text style={styles.type}>
                {item.tipo1}
                {item.tipo2 ? ` / ${item.tipo2}` : ""}
              </Text>
            </View>

            <TouchableOpacity
              style={styles.deleteButton}
              onPress={() => remover(item.idFirebase)}
            >
              <Text style={styles.deleteText}>🗑</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1a1a1a",
    padding: 20,
  },

  title: {
    color: "#fff",
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },

  empty: {
    color: "#ccc",
    textAlign: "center",
    marginTop: 50,
    fontSize: 18,
  },

  card: {
    flexDirection: "row",
    backgroundColor: "#2a2a2a",
    padding: 15,
    borderRadius: 15,
    marginBottom: 15,
    alignItems: "center",
  },

  image: {
    width: 80,
    height: 80,
    marginRight: 15,
  },

  name: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },

  type: {
    color: "#bbb",
    marginTop: 5,
  },

  deleteButton: {
    backgroundColor: "#d62828",
    padding: 10,
    borderRadius: 10,
  },

  deleteText: {
    color: "#fff",
    fontSize: 18,
  },
});