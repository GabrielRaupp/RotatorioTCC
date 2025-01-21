import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Alert,
  Image,
  TouchableOpacity,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { getAuth } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { firestore } from "../firebaseConfig"; // Certifique-se de configurar o Firestore corretamente

export default function PerfilScreen({ navigation }) {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      const auth = getAuth();
      const user = auth.currentUser;

      if (user) {
        try {
          const userDocRef = doc(firestore, "usuarios", user.uid); // Referência ao documento do usuário
          const userDoc = await getDoc(userDocRef);

          if (userDoc.exists()) {
            setUserData(userDoc.data());
          } else {
            Alert.alert("Erro", "Dados do usuário não encontrados.");
          }
        } catch (error) {
          Alert.alert("Erro", "Ocorreu um erro ao buscar os dados do usuário.");
        }
      } else {
        Alert.alert("Erro", "Usuário não autenticado.");
      }

      setLoading(false);
    };

    fetchUserData();
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#6200EE" />
        <Text style={styles.loadingText}>Carregando...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Cabeçalho */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate("MenuScreen")}>
          <FontAwesome name="arrow-left" size={24} color="#000" />
        </TouchableOpacity>
        <View style={styles.logoContainer}>
          <Image
            source={require("../assets/logorotarorio.png")} // Substitua pelo caminho do logotipo
            style={styles.logo}
          />
          <Text style={styles.title}>Perfil</Text>
        </View>
        <View style={{ width: 24 }} /> {/* Espaço para alinhar os elementos */}
      </View>

      {/* Conteúdo principal */}
      <View style={styles.content}>
        <Text style={styles.headerText}>Perfil do Usuário</Text>

        {/* Foto de perfil */}
        <Image
          source={{
            uri: "https://via.placeholder.com/150", // Substitua pela URL da foto de perfil ou carregue localmente
          }}
          style={styles.profilePicture}
        />

        {/* Informações do usuário */}
        <View style={styles.card}>
          <Text style={styles.infoText}>
            Nome de usuário: {userData?.nome || "Não disponível"}
          </Text>
          <Text style={styles.infoText}>
            E-mail: {userData?.email || "Não disponível"}
          </Text>
          <Text style={styles.infoText}>
            CPF: {userData?.cpf || "Não disponível"}
          </Text>
          <Text style={styles.infoText}>
            Telefone: {userData?.fone || "Não disponível"}
          </Text>
          <Text style={styles.infoText}>
            Conta criada em:{" "}
            {userData?.createdAt?.toDate().toLocaleDateString() || "Não disponível"}
          </Text>
        </View>
      </View>

      {/* Barra de navegação inferior */}
      <View style={styles.footer}>
        <TouchableOpacity onPress={() => navigation.navigate("HomeScreen")}>
          <FontAwesome name="home" size={24} color="#000" />
        </TouchableOpacity>
        <TouchableOpacity>
          <FontAwesome name="dollar" size={24} color="#000" />
        </TouchableOpacity>
        <TouchableOpacity>
          <FontAwesome name="cog" size={24} color="#000" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F3F4F6",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: "#F7F7F7",
  },
  logoContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  logo: {
    width: 40,
    height: 40,
    resizeMode: "contain",
    marginRight: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F3F4F6",
  },
  loadingText: {
    marginTop: 8,
    fontSize: 16,
    color: "#666",
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 70, // Para evitar sobreposição com a barra inferior
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 24,
  },
  profilePicture: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 24,
    borderWidth: 2,
    borderColor: "#6200EE",
  },
  card: {
    width: "90%",
    padding: 16,
    backgroundColor: "#FFF",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 3,
  },
  infoText: {
    fontSize: 16,
    color: "#444",
    marginVertical: 8,
  },
  footer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    padding: 15,
    backgroundColor: "#FFFFFF",
    borderTopWidth: 1,
    borderColor: "#CCC",
  },
});
