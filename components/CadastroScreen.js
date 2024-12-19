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
import { auth, createUserWithEmailAndPassword } from '../firebaseConfig'; // Importe a configuração do Firebase

export default function CadastroScreen({ navigation }) {
  const [nome, setNome] = useState('');
  const [cpf, setCpf] = useState('');
  const [fone, setFone] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');

  const handleCadastro = async () => {
    // Validação dos campos
    if (!nome || !cpf || !fone || !email || !senha || !confirmarSenha) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos!');
      return;
    }
    if (senha !== confirmarSenha) {
      Alert.alert('Erro', 'As senhas não coincidem!');
      return;
    }

    try {
      // Cadastro no Firebase
      await createUserWithEmailAndPassword(auth, email, senha);
      Alert.alert('Sucesso', 'Cadastro realizado com sucesso!');
      navigation.navigate('LoginScreen'); // Navegar para a tela de login
    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        Alert.alert('Erro', 'Este e-mail já está em uso!');
      } else if (error.code === 'auth/invalid-email') {
        Alert.alert('Erro', 'O e-mail fornecido é inválido!');
      } else if (error.code === 'auth/weak-password') {
        Alert.alert('Erro', 'A senha fornecida é muito fraca!');
      } else {
        Alert.alert('Erro', 'Ocorreu um erro, tente novamente.');
      }
    }
  };

  return (
    <View style={styles.container}>
      {/* Cabeçalho com logo */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Text style={styles.backText}>{'<'}</Text>
        </TouchableOpacity>
        <Image
          source={require('../assets/logorotarorio.png')} // Substitua pelo caminho do logotipo
          style={styles.logo}
        />
      </View>

      {/* Título */}
      <Text style={styles.title}>Crie sua conta!</Text>
      <TouchableOpacity onPress={() => navigation.navigate('LoginScreen')}>
        <Text style={styles.subtitle}>Já registrado? Entre aqui.</Text>
      </TouchableOpacity>

      {/* Campos de entrada */}
      <TextInput
        style={styles.input}
        placeholder="Nome"
        value={nome}
        onChangeText={setNome}
      />
      <TextInput
        style={styles.input}
        placeholder="CPF"
        value={cpf}
        onChangeText={setCpf}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Fone"
        value={fone}
        onChangeText={setFone}
        keyboardType="phone-pad"
      />
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
      <TextInput
        style={styles.input}
        placeholder="Confirmar Senha"
        value={confirmarSenha}
        onChangeText={setConfirmarSenha}
        secureTextEntry
      />

      {/* Botão de cadastro */}
      <TouchableOpacity style={styles.button} onPress={handleCadastro}>
        <Text style={styles.buttonText}>CRIAR!</Text>
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
  header: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#D9D9D9',
    paddingVertical: 20,
    marginBottom: 20,
    borderRadius: 10,
  },
  backButton: {
    position: 'absolute',
    left: 10,
    top: 10,
  },
  backText: {
    fontSize: 18,
    color: '#000',
  },
  logo: {
    width: 80,
    height: 80,
    resizeMode: 'contain',
    marginBottom: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 14,
    color: '#007BFF',
    textAlign: 'center',
    marginBottom: 20,
    textDecorationLine: 'underline',
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
});
