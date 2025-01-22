import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, RefreshControl, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome6 } from '@expo/vector-icons';
import { getAuth } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { firestore } from "../firebaseConfig";

const CreditosScreen = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false); // Estado para o RefreshControl

  const fetchUserData = async () => {
    const auth = getAuth();
    const user = auth.currentUser;

    if (user) {
      try {
        const userDocRef = doc(firestore, "usuarios", user.uid);
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

  useEffect(() => {
    fetchUserData();
  }, []);

  // Função para o refresh
  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await fetchUserData(); // Atualiza os dados do usuário
    setRefreshing(false);
  }, []);

  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollViewContent}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View style={styles.content}>
          <FontAwesome6 name="wallet" size={60} style={{ textAlign: 'center' }} />
          <Text style={styles.userCredits}>Créditos Disponíveis</Text>
          <Text style={{ fontSize: 40, textAlign: 'center' }}>
            R$ {userData?.credito || 0}
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F9F9',
    justifyContent: 'center',
    alignContent: 'center',
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    textAlign: 'center',
    marginTop: 10,
    padding: 60,
    backgroundColor: '#00e676',
    borderRadius: 30,
    elevation: 10,
  },
  userCredits: {
    fontSize: 20,
    textAlign: 'center',
  },
});

export default CreditosScreen;
