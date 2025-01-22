import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Image,
  ScrollView,
} from 'react-native';
import { auth, signInWithEmailAndPassword } from '../firebaseConfig';
import { FontAwesome } from '@expo/vector-icons';

export default function LoginScreen({ onLoginUser, onRegisterUser, navigation }) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const handleLogin = async () => {
    if (!email || !senha) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos!');
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email, senha);
      Alert.alert('Bem-vindo', 'Login efetuado com sucesso!');
      onLoginUser();
    } catch (error) {
      console.log(error);
      if (error.code === 'auth/user-not-found') {
        Alert.alert('Erro', 'Usuário não encontrado! Cadastre-se.', [
          { text: 'Cadastrar', onPress: () => onRegister() },
          { text: 'Cancelar', style: 'cancel' },
        ]);
      } else if (error.code === 'auth/wrong-password') {
        Alert.alert('Erro', 'Senha incorreta!');
      } else if (error.code === 'auth/invalid-email') {
        Alert.alert('Erro', 'E-mail inválido!');
      } else {
        Alert.alert('Erro', 'Ocorreu um erro, tente novamente.');
      }
    }
  };

  return (
    <View style={styles.containerWrapper}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <FontAwesome name="arrow-left" size={24} color="#000" />
          </TouchableOpacity>
          <View style={styles.logoContainer}>
            <Image source={require('../assets/logorotarorio.png')} style={styles.logo} />
            <Text style={styles.title}>Login</Text>
          </View>
          <View style={{ width: 24 }} />
        </View>

        <Text style={styles.subtitle}>Faça login para continuar!</Text>

        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
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

        <Text style={styles.link} onPress={() => navigation.navigate('EsqueceuSenhaScreen')}>
          Esqueceu sua senha?
        </Text>
        <Text style={styles.link} onPress={() => navigation.navigate('CadastroScreen')}>
          Inscrever-se!
        </Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  containerWrapper: {
    flex: 1,
    backgroundColor: '#F7F7F7',
  },
  container: {
    paddingHorizontal: 20,
    paddingTop: 40,
    alignItems: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  logo: {
    width: 100,
    height: 100,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: '#EDEDED',
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 15,
    fontSize: 16,
  },
  button: {
    width: '100%',
    height: 50,
    backgroundColor: '#000',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  link: {
    fontSize: 14,
    color: '#007BFF',
    textAlign: 'center',
    marginTop: 15,
    textDecorationLine: 'underline',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginBottom: 20,
  },

});
