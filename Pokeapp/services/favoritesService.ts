import { addDoc, collection } from "firebase/firestore";
import { db } from "./firebase";

export async function salvarFavorito(pokemon: any) {
  try {
    await addDoc(collection(db, "favoritos"), {
      nome: pokemon.nome,
      numero: pokemon.id,
      imagem: pokemon.imagem,
      tipo1: pokemon.tipo1,
      tipo2: pokemon.tipo2 || "",
      apelido: "",
    });

    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}