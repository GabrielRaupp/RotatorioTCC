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
import { FontAwesome } from '@expo/vector-icons'; // Importe o ícone do FontAwesome

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
      // Autenticar o usuário com o Firebase
      await signInWithEmailAndPassword(auth, email, senha);
      Alert.alert('Bem-vindo', 'Login efetuado com sucesso!');

      // Navegar para a tela de Menu
      navigation.navigate('MenuScreen'); // Certifique-se de que 'MenuScreen' está registrado no Stack.Navigator
    } catch (error) {
      console.log(error); // Log do erro no console para depuração
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
      {/* Cabeçalho */}
      <View style={styles.header}>
        <TouchableOpacity>
          <FontAwesome name="bars" size={24} color="#000" />
        </TouchableOpacity>
        <View style={styles.logoContainer}>
          <Image
            source={require('../assets/logorotarorio.png')}
            style={styles.logo}
          />
          <Text style={styles.title}>Menu</Text>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('PerfilScreen')}>
          <FontAwesome name="user-circle" size={24} color="#000" />
        </TouchableOpacity>
      </View>

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
        keyboardType="email-address"
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

      {/* Barra de navegação inferior */}
      <View style={styles.footer}>
        <TouchableOpacity onPress={() => navigation.navigate('HomeScreen')}>
          <FontAwesome name="home" size={24} color="#000" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Credito')}>
          <FontAwesome name="dollar" size={24} color="#000" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Ajuda')}>
          <FontAwesome name="cog" size={24} color="#000" />
        </TouchableOpacity>
      </View>
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
    color: '#333',
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
    marginBottom: 15,
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#FFF',
    elevation: 4, // Sombra para o cabeçalho
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#FFF',
    elevation: 4, // Sombra para o rodapé
  },
});
