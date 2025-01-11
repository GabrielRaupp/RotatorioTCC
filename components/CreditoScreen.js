import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const CreditosScreen = () => {
  const [user, setUser] = useState({
    name: 'Gabriel', // Nome do usuário
    credits: 100, // Créditos iniciais
  });

  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Área de Créditos</Text>
      </View>

      {/* Exibição do nome do usuário e dos créditos */}
      <View style={styles.userInfo}>
        <Text style={styles.userName}>Nome: {user.name}</Text>
        <Text style={styles.userCredits}>Créditos: R$ {user.credits}</Text>
      </View>

      {/* Botão para comprar créditos */}
      <TouchableOpacity
        style={styles.buyCreditsButton}
        onPress={() => navigation.navigate('Buy')}
      >
        <Text style={styles.buyCreditsButtonText}>Sem créditos? Compre aqui</Text>
      </TouchableOpacity>

      {/* Botão para voltar à tela anterior */}
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => {
          // Voltar à tela anterior
          navigation.goBack();
        }}
      >
        <Text style={styles.backButtonText}>Voltar</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  userInfo: {
    marginBottom: 30,
    alignItems: 'center',
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  userCredits: {
    fontSize: 16,
    marginTop: 10,
  },
  buyCreditsButton: {
    backgroundColor: '#FF6347',
    padding: 12,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 20,
  },
  buyCreditsButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  backButton: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  backButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default CreditosScreen;
