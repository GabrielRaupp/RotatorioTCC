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
import { auth, signInWithEmailAndPassword } from '../firebaseConfig'; // Importe o Firebase

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  // Função para fazer login
  const handleLogin = async () => {
    if (!email || !senha) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos!');
      return;
    }

    try {
      // Tentar autenticar o usuário com o Firebase
      await signInWithEmailAndPassword(auth, email, senha);
      Alert.alert('Bem-vindo', 'Login efetuado com sucesso!');

      // Navegar para a tela de boas-vindas
      navigation.navigate('WelcomeScreen'); 

      // Depois de um pequeno delay, navegar para a tela inicial (Home ou Menu)
      setTimeout(() => {
        navigation.navigate('HomeScreen'); // Altere para a tela desejada
      }, 2000); // 2 segundos de delay para o usuário ver a mensagem de boas-vindas
    } catch (error) {
      console.log(error); // Verifique o erro no console para mais detalhes
      if (error.code === 'auth/user-not-found') {
        Alert.alert(
          'Erro',
          'Usuário não encontrado! Você precisa se cadastrar.',
          [
            {
              text: 'Cadastrar',
              onPress: () => navigation.navigate('CadastroScreen'), // Navega para a tela de cadastro
            },
            { text: 'Cancelar', style: 'cancel' },
          ]
        );
      } else if (error.code === 'auth/wrong-password') {
        Alert.alert('Erro', 'Senha incorreta!');
      } else if (error.code === 'auth/invalid-email') {
        Alert.alert('Erro', 'O e-mail fornecido é inválido!');
      } else {
        Alert.alert('Erro', 'Ocorreu um erro, tente novamente.');
      }
    }
  };

  return (
    <View style={styles.container}>
      {/* Espaço para a logo */}
      <View style={styles.logoContainer}>
        <Image
          source={require('../assets/logorotarorio.png')} // Substitua pelo caminho do logotipo
          style={styles.logo}
        />
      </View>

      {/* Título */}
      <Text style={styles.title}>Entrar!</Text>
      <Text style={styles.subtitle}>Faça login para continuar!</Text>

      {/* Campos de entrada */}
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address" // Definir para aceitar e-mail
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        value={senha}
        onChangeText={setSenha}
        secureTextEntry
      />

      {/* Botão de login */}
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>ENTRAR</Text>
      </TouchableOpacity>

      {/* Link para recuperação de senha */}
      <Text
        style={styles.link}
        onPress={() => navigation.navigate('EsqueceuSenhaScreen')}
      >
        Esqueceu sua senha?
      </Text>

      {/* Link para cadastro */}
      <Text
        style={styles.link}
        onPress={() => navigation.navigate('CadastroScreen')}
      >
        Inscrever-se!
      </Text>
    </View>
  );
}

// Estilos
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F7F7F7',
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
