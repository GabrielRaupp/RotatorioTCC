import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ActivityIndicator, Alert } from "react-native";
import { getAuth } from "firebase/auth";

export default function PerfilScreen() {
  const [email, setEmail] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEmail = () => {
      const auth = getAuth();
      const user = auth.currentUser;

      if (user) {
        setEmail(user.email);
      } else {
        Alert.alert("Erro", "Usuário não autenticado.");
      }

      setLoading(false);
    };

    fetchEmail();
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
      <Text style={styles.header}>Perfil do Usuário</Text>
      <View style={styles.card}>
        <Text style={styles.emailText}>
          {email ? `E-mail: ${email}` : "Erro ao carregar o e-mail do usuário."}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F3F4F6",
    padding: 16,
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
  header: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 24,
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
    alignItems: "center",
  },
  emailText: {
    fontSize: 18,
    color: "#444",
    textAlign: "center",
  },
});
