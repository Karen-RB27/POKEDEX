import {
  addDoc,
  collection,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db } from "./firebase";

// CREATE
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
    console.log("Erro ao salvar:", error);
    return false;
  }
}

// READ
export async function listarFavoritos() {
  const snapshot = await getDocs(collection(db, "favoritos"));

  return snapshot.docs.map((doc) => ({
    idFirebase: doc.id,
    ...doc.data(),
  }));
}

// UPDATE
export async function atualizarApelido(
  idFirebase: string,
  apelido: string
) {
  const referencia = doc(db, "favoritos", idFirebase);

  await updateDoc(referencia, {
    apelido,
  });
}

// DELETE
export async function excluirFavorito(idFirebase: string) {
  const referencia = doc(db, "favoritos", idFirebase);

  await deleteDoc(referencia);
}