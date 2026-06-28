import React, { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet, ActivityIndicator } from "react-native";
import { Stack, useLocalSearchParams } from "expo-router";

type Pokemon = {
  id: number;
  nome: string;
  imagem: string;
  tipo1: string;
  tipo2?: string;
  altura: number;
  peso: number;
};

export default function PokemonDetails() {
  const { id } = useLocalSearchParams();

  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    buscarPokemon();
  }, []);

  async function buscarPokemon() {
    try {
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${id}`
      );

      const data = await response.json();

      setPokemon({
        id: data.id,
        nome: data.name,
        imagem: data.sprites.other["official-artwork"].front_default,
        tipo1: data.types[0].type.name,
        tipo2: data.types[1]?.type.name,
        altura: data.height / 10,
        peso: data.weight / 10,
      });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Stack.Screen
        options={{
          title: "Detalhes",
        }}
      />

      <View style={styles.container}>
        {loading ? (
          <ActivityIndicator size="large" color="#fff" />
        ) : (
          <>
            <Image
              source={{ uri: pokemon?.imagem }}
              style={styles.image}
            />

            <Text style={styles.name}>
              {pokemon?.nome.toUpperCase()}
            </Text>

            <Text style={styles.id}>
              #{pokemon?.id}
            </Text>

            <Text style={styles.info}>
              Tipo: {pokemon?.tipo1}
              {pokemon?.tipo2 ? ` / ${pokemon.tipo2}` : ""}
            </Text>

            <Text style={styles.info}>
              Altura: {pokemon?.altura} m
            </Text>

            <Text style={styles.info}>
              Peso: {pokemon?.peso} kg
            </Text>
          </>
        )}
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
    padding: 20,
  },

  image: {
    width: 220,
    height: 220,
    marginBottom: 20,
  },

  name: {
    color: "#fff",
    fontSize: 30,
    fontWeight: "bold",
  },

  id: {
    color: "#aaa",
    marginBottom: 20,
  },

  info: {
    color: "#fff",
    fontSize: 18,
    marginTop: 10,
  },
});