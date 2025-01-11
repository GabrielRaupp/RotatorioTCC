// Importação das bibliotecas do Firebase
import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import {
  getFirestore,
  doc,
  setDoc,
  getDoc,
  collection,
  addDoc,
} from "firebase/firestore";
import { getDatabase } from "firebase/database";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

// Configuração do Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCn7FdIPNBpDJvnLu38Nqk2MvKA4HLW5C8",
  authDomain: "rotatorio-486de.firebaseapp.com",
  projectId: "rotatorio-486de",
  storageBucket: "rotatorio-486de.appspot.com",
  messagingSenderId: "786713643511",
  appId: "1:786713643511:web:f851e60531f90b982906f2",
  measurementId: "G-7NL1XHKK25",
};

// Inicialização do Firebase
let app;
try {
  app = initializeApp(firebaseConfig);
  console.log("Firebase inicializado com sucesso.");
} catch (error) {
  console.error("Erro ao inicializar o Firebase:", error.message);
}

// Inicialização dos serviços do Firebase
const auth = getAuth(app);
const firestore = getFirestore(app);
const database = getDatabase(app);
const storage = getStorage(app);

/**
 * Registra ou atualiza um documento no Firestore.
 * @param {string} userId - ID do usuário.
 * @param {Object} userData - Dados do usuário.
 */
const registrarUsuarioNoFirestore = async (userId, userData) => {
  if (!userId || !userData) {
    throw new Error("Parâmetros inválidos: userId e userData são obrigatórios.");
  }
  try {
    const userRef = doc(firestore, "users", userId);
    await setDoc(userRef, userData, { merge: true });
    console.log("Usuário registrado/atualizado no Firestore:", userId);
  } catch (error) {
    console.error("Erro ao registrar usuário no Firestore:", error.message);
    throw error;
  }
};

/**
 * Registra um veículo no Firestore e faz upload de uma imagem opcional no Storage.
 * @param {string} userId - ID do usuário.
 * @param {string} placa - Placa do veículo.
 * @param {Date} expiracao - Data de expiração.
 * @param {File} imagem - Arquivo de imagem opcional.
 */
const registrarVeiculoComImagem = async (userId, placa, expiracao, imagem) => {
  if (!userId || !placa || !expiracao) {
    throw new Error("Todos os campos são obrigatórios: userId, placa, expiracao.");
  }

  try {
    let imageUrl = null;

    // Upload da imagem para o Firebase Storage, se fornecida
    if (imagem) {
      const imageRef = ref(storage, `veiculos/${placa}.jpg`);
      await uploadBytes(imageRef, imagem);
      imageUrl = await getDownloadURL(imageRef);
    }

    // Salvando os dados do veículo no Firestore
    const placaRef = doc(firestore, "veiculos", placa);
    await setDoc(placaRef, {
      usuario: userId,
      placa,
      expiracao: expiracao.toISOString(),
      imagem: imageUrl || null,
    });

    console.log("Veículo registrado com sucesso:", placa);
    return "Veículo registrado com sucesso.";
  } catch (error) {
    console.error("Erro ao registrar veículo:", error.message);
    throw error;
  }
};

/**
 * Busca as informações de um veículo pelo número da placa.
 * @param {string} placa - Placa do veículo.
 * @returns {Object} Dados do veículo (ou null se não encontrado).
 */
const buscarVeiculo = async (placa) => {
  if (!placa) {
    throw new Error("A placa é obrigatória para buscar um veículo.");
  }

  try {
    const placaRef = doc(firestore, "veiculos", placa);
    const placaSnapshot = await getDoc(placaRef);

    if (placaSnapshot.exists()) {
      console.log("Dados do veículo:", placaSnapshot.data());
      return placaSnapshot.data();
    } else {
      console.log("Veículo não encontrado:", placa);
      return null;
    }
  } catch (error) {
    console.error("Erro ao buscar veículo:", error.message);
    throw error;
  }
};

/**
 * Registra uma placa simples no Firestore (sem imagem).
 * @param {string} placa - Placa do veículo.
 */
const registrarPlacaSimples = async (placa) => {
  if (!placa) {
    throw new Error("A placa é obrigatória para registrar.");
  }

  try {
    const novaPlaca = { placa };
    await addDoc(collection(firestore, "placas"), novaPlaca);
    console.log("Placa registrada com sucesso no Firestore:", novaPlaca);
  } catch (error) {
    console.error("Erro ao registrar placa no Firestore:", error.message);
    throw error;
  }
};

// Exportação dos serviços e métodos
export {
  app,
  auth,
  firestore,
  storage,
  database,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  registrarUsuarioNoFirestore,
  registrarVeiculoComImagem,
  buscarVeiculo,
  registrarPlacaSimples,
};
