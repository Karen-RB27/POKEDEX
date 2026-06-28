import { Stack, useLocalSearchParams } from "expo-router";
import { View, Text, StyleSheet } from "react-native";

export default function PokemonDetails() {
  const { id } = useLocalSearchParams();

  return (
    <>
      <Stack.Screen options={{ title: "Detalhes" }} />

      <View style={styles.container}>
        <Text style={styles.title}>Detalhes do Pokémon</Text>

        <Text style={styles.id}>
          ID recebido: {id}
        </Text>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1a1a1a",
    justifyContent: "center",
    alignItems: "center",
  },

  title: {
    color: "#fff",
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
  },

  id: {
    color: "#fff",
    fontSize: 20,
  },
});