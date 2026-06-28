import { StatusBar } from "expo-status-bar";
import {  StyleSheet, Text,  View, Image, TouchableOpacity, TextInput, Animated, } 
from "react-native";
import React, { useState, useEffect, useRef } from "react";
import { router } from "expo-router";


type Pokemon = {
  id: number;
  nome: string;
  imagem: string;
  tipo1: string;
  tipo2?: string;
};

export default function App() {
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const [id, setId] = useState(1);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const bounceValue = useRef(new Animated.Value(0)).current;

  // animação
  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(bounceValue, {
          toValue: -10,
          duration: 600,
          useNativeDriver: true,
        }),
        Animated.timing(bounceValue, {
          toValue: 0,
          duration: 600,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  // busca por ID
  useEffect(() => {
    fetchPokemon(id);
  }, [id]);

  // função fetch
  const fetchPokemon = async (value: string | number) => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${value
          .toString()
          .toLowerCase()}`
      );

      if (!response.ok) {
        throw new Error();
      }

      const data = await response.json();

      const poke: Pokemon = {
        id: data.id,
        nome: data.name,
        imagem: data.sprites.front_default,
        tipo1: data.types[0]?.type.name,
        tipo2: data.types[1]?.type.name,
      };

      setPokemon(poke);
      setId(data.id); // sincroniza ID com busca
    } catch (err) {
      setError("Pokémon não encontrado 😢");
      setPokemon(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />

      {/* LOGO */}
      <View style={styles.logoArea}>
        <Image
          source={require("../../assets/logo.png")}
          style={styles.logo}
        />
      </View>

      {/* CARD */}
      <View style={styles.card}>

        {/* INPUT */}
        <TextInput
          placeholder="Buscar Pokémon (nome ou ID)"
          placeholderTextColor="#999"
          value={search}
          onChangeText={setSearch}
          style={styles.input}
          onSubmitEditing={() => fetchPokemon(search)}
        />

        {/* LOADING */}
        {loading && (
          <Text style={styles.infoText}>Carregando...</Text>
        )}

        {/* ERRO */}
        {error !== "" && (
          <Text style={styles.errorText}>{error}</Text>
        )}

        {/* POKÉMON */}
        {pokemon && !loading && (
  <>
        <View style={styles.imageBox}>
          <Animated.Image
            source={{ uri: pokemon.imagem }}
            style={[
              styles.pokemonImage,
              { transform: [{ translateY: bounceValue }] },
            ]}
          />
        </View>

        <Text style={styles.name}>
          {pokemon.nome.toUpperCase()}
        </Text>

        <Text style={styles.id}>#{pokemon.id}</Text>

        <View style={styles.typeContainer}>
          <View style={styles.typeBadge}>
            <Text style={styles.typeText}>
              {pokemon.tipo1}
            </Text>
          </View>

          {pokemon.tipo2 && (
            <View style={styles.typeBadge}>
              <Text style={styles.typeText}>
                {pokemon.tipo2}
              </Text>
            </View>
          )}
        </View>

        <TouchableOpacity
          style={styles.detailsButton}
          onPress={() =>
            router.push({
              pathname: "/pokemon/[id]",
              params: { id: pokemon.id.toString() },
            })
          }
        >
          <Text style={styles.buttonText}>
            Ver Detalhes
          </Text>
        </TouchableOpacity>
      </>
    )}


        {/* BOTÕES */}
        <View style={styles.buttonArea}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => id > 1 && setId(id - 1)}
          >
            <Text style={styles.buttonText}>◀</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.buttonCenter}
            onPress={() => setId(1)}
          >
            <Text style={styles.buttonText}>Início</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={() => setId(id + 1)}
          >
            <Text style={styles.buttonText}>▶</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

// 🎨 ESTILOS MELHORADOS
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1a1a1a",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },

  logoArea: {
    marginBottom: 10,
  },

  logo: {
    width: 160,
    height: 60,
    resizeMode: "contain",
  },

  card: {
    width: "100%",
    backgroundColor: "#2a2a2a",
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
    elevation: 10,
  },

  input: {
    width: "100%",
    backgroundColor: "#3a3a3a",
    padding: 12,
    borderRadius: 12,
    color: "#fff",
    marginBottom: 15,
  },

  imageBox: {
    backgroundColor: "#1f1f1f",
    borderRadius: 100,
    padding: 20,
    marginBottom: 10,
  },

  pokemonImage: {
    width: 130,
    height: 130,
  },

  name: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "bold",
    marginTop: 10,
  },

  id: {
    color: "#aaa",
    marginBottom: 10,
  },

  typeContainer: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 15,
  },

  typeBadge: {
    backgroundColor: "#c25843",
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 20,
  },

  typeText: {
    color: "#fff",
    fontWeight: "bold",
  },

  buttonArea: {
    flexDirection: "row",
    gap: 10,
    marginTop: 10,
  },

  button: {
    backgroundColor: "#c25843",
    padding: 12,
    borderRadius: 12,
    width: 60,
    alignItems: "center",
  },

  buttonCenter: {
    backgroundColor: "#444",
    padding: 12,
    borderRadius: 12,
    width: 80,
    alignItems: "center",
  },

  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },

  errorText: {
    color: "#ff4d4d",
    marginBottom: 10,
  },

  infoText: {
    color: "#fff",
    marginBottom: 10,
  },

  detailsButton: {
  backgroundColor: "#3b82f6",
  padding: 12,
  borderRadius: 12,
  width: "100%",
  alignItems: "center",
  marginBottom: 15,
},
});