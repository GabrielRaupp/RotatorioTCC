import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Image,
} from 'react-native';

export default function LoginScreen({ navigation }) {
  const [codigo, setCodigo] = useState('');
  const [senha, setSenha] = useState('');

  const handleLogin = () => {
    if (!codigo || !senha) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos!');
      return;
    }
    Alert.alert('Bem-vindo', `Login efetuado com o Código: ${codigo}`);
    // Você pode navegar para uma tela específica aqui, se necessário.
  };

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image
          source={require('../assets/logorotarorio.png')} // Substitua pelo caminho do logotipo
          style={styles.logo}
        />
      </View>
      <Text style={styles.title}>Entrar!</Text>
      <Text style={styles.subtitle}>Faça login para continuar!</Text>

      <TextInput
        style={styles.input}
        placeholder="Código"
        value={codigo}
        onChangeText={setCodigo}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        value={senha}
        onChangeText={setSenha}
        secureTextEntry
      />

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>ENTRAR</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F7F7F7',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    height: 50,
    backgroundColor: '#EDEDED',
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 15,
    fontSize: 16,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  logo: {
    width: 100,
    height: 100,
  },
  button: {
    height: 50,
    backgroundColor: '#000',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  link: {
    fontSize: 14,
    color: '#007BFF',
    textAlign: 'center',
    marginTop: 15,
    textDecorationLine: 'underline',
  },
});
