import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Image, TouchableOpacity, TextInput, Animated  } from "react-native";
import React, { useState, useEffect, useRef  } from "react";

// Tipo do Pokémon
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
  const bounceValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
  Animated.loop(
    Animated.sequence([
      Animated.timing(bounceValue, {
        toValue: -10, // sobe
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.timing(bounceValue, {
        toValue: 0, // volta
        duration: 600,
        useNativeDriver: true,
      }),
    ])
  ).start();
}, []);

  useEffect(() => {
  fetchPokemon(id);
}, [id]);

  const fetchPokemon = async (value: string | number) => {
  try {
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${value.toString().toLowerCase()}`
    );

    const data = await response.json();

    const poke: Pokemon = {
      id: data.id,
      nome: data.name,
      imagem: data.sprites.front_default,
      tipo1: data.types[0]?.type.name,
      tipo2: data.types[1]?.type.name,
    };

    setPokemon(poke);
  } catch (error) {
    console.log("Pokémon não encontrado");
  }
};
  return (
    <View style={styles.container}>
      {/* LOGO */}
      <View style={styles.areaLogo}>
        <Image source={require("../../assets/logo.png")} />
      </View>

      {/* IMAGEM DO POKEMON */}
      <View style={styles.areaImagem}>
        {pokemon && (
          <Animated.Image
            source={{ uri: pokemon?.imagem }}
            style={[
            styles.imagemPoke,
        { transform: [{ translateY: bounceValue }] },
         ]}
/>
        )}
      </View>

      {/* DESCRIÇÃO */}
      <View style={styles.areaDesc}>

         <View style={styles.areaNome}>
          <Text style={styles.text}>ID: {pokemon?.id}</Text>
        </View>

            <View style={styles.areaNome}>
             <Text style={styles.text}>
               Nome: {pokemon?.nome?.toUpperCase()}
             </Text>
           </View>

       <View style={styles.areaTipo}>
         <Text style={styles.text}>Tipo: </Text>
         <Text style={styles.text}>{pokemon?.tipo1}</Text>

             {pokemon?.tipo2 && (
              <Text style={styles.text}> / {pokemon.tipo2}</Text>
            )}
      </View>

      </View>

           <TextInput
            placeholder="Buscar Pokémon"
            placeholderTextColor="#fff"
            value={search}
            onChangeText={setSearch}
            style={styles.input}
            onSubmitEditing={() => fetchPokemon(search)}
           />



      {/* BOTÕES */}
      <View style={styles.areaBtn}>
        <TouchableOpacity
          style={styles.btn}
          onPress={() => id > 1 && setId(id - 1)}
        >
          <Text style={styles.txtBtn}>Anterior</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.btn}
          onPress={() => setId(1)}
        >
          <Text style={styles.txtBtn}>Início</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.btn}
          onPress={() => setId(id + 1)}
        >
          <Text style={styles.txtBtn}>Próximo</Text>
        </TouchableOpacity>
      </View>

      <StatusBar style="auto" />
    </View>
  );
}

// ESTILOS
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0e0d0d",
    alignItems: "center",
    justifyContent: "center",
  },

  areaLogo: {
    marginTop: 60,
  },

  areaImagem: {
    marginVertical: 20,
  },

  areaDesc: {
    marginBottom: 20,
  },

  areaNome: {
    flexDirection: "row",
    marginBottom: 5,
  },

  areaTipo: {
    flexDirection: "row",
  },

  areaBtn: {
    flexDirection: "row",
    gap: 10,
  },

  btn: {
    backgroundColor: "#c25843",
    padding: 10,
    borderRadius: 8,
  },

  txtBtn: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },

  imagemPoke: {
    width: 120,
    height: 120,
  },

  input:{
  borderWidth: 1,
  borderColor: "#ccc",
  padding: 8,
  width: 200,
  borderRadius: 8,
  marginBottom: 10,
},

text: {
  color: "#fff",
}

},
);

