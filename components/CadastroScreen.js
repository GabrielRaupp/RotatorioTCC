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
import { auth, firestore, createUserWithEmailAndPassword } from '../firebaseConfig';
import { collection, doc, setDoc } from 'firebase/firestore';

export default function CadastroScreen({ navigation }) {
  const [nome, setNome] = useState('');
  const [cpf, setCpf] = useState('');
  const [fone, setFone] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');

  // Função para formatar o CPF
  const formatCpf = (value) => {
    return value
      .replace(/\D/g, '') // Remove caracteres não numéricos
      .replace(/(\d{3})(\d)/, '$1.$2') // Adiciona o primeiro ponto
      .replace(/(\d{3})(\d)/, '$1.$2') // Adiciona o segundo ponto
      .replace(/(\d{3})(\d{1,2})$/, '$1-$2') // Adiciona o hífen
      .slice(0, 14); // Limita a 14 caracteres
  };

  // Função para formatar o telefone
  const formatFone = (value) => {
    return value
      .replace(/\D/g, '') // Remove caracteres não numéricos
      .replace(/(\d{2})(\d)/, '($1) $2') // Adiciona o parêntese
      .replace(/(\d{5})(\d)/, '$1-$2') // Adiciona o hífen
      .slice(0, 15); // Limita a 15 caracteres
  };

  const handleCadastro = async () => {
    if (!nome || !cpf || !fone || !email || !senha || !confirmarSenha) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos!');
      return;
    }
    if (senha !== confirmarSenha) {
      Alert.alert('Erro', 'As senhas não coincidem!');
      return;
    }
  
    try {
      // Criação do usuário
      const userCredential = await createUserWithEmailAndPassword(auth, email, senha);
      const user = userCredential.user;
  
      // Criação de dados no Firestore
      const userRef = doc(firestore, 'usuarios', user.uid);
      await setDoc(userRef, {
        nome,
        cpf,
        fone,
        email,
        createdAt: new Date(),
      });
  
      // Login automático após cadastro
      await signInWithEmailAndPassword(auth, email, senha);
  
      // Alerta de sucesso e navegação para a tela de login ou principal
      Alert.alert(
        'Sucesso',
        'Usuário criado com sucesso!',
        [
          {
            text: 'OK',
            onPress: () => navigation.navigate('LoginScreen'), // Ou outra tela principal
          },
        ],
        { cancelable: false }
      );
    } catch (error) {
      let mensagemErro = 'Ocorreu um erro, tente novamente.';
      if (error.code === 'auth/email-already-in-use') {
        mensagemErro = 'Este e-mail já está em uso!';
      } else if (error.code === 'auth/invalid-email') {
        mensagemErro = 'O e-mail fornecido é inválido!';
      } else if (error.code === 'auth/weak-password') {
        mensagemErro = 'A senha fornecida é muito fraca!';
      }
  
      Alert.alert(
        'Erro',
        mensagemErro,
        [
          {
            text: 'OK',
          },
        ],
        { cancelable: false }
      );
    }
  };
  

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Text style={styles.backText}>{'<'}</Text>
        </TouchableOpacity>
        <Image
          source={require('../assets/logorotarorio.png')}
          style={styles.logo}
        />
      </View>

      <Text style={styles.title}>Crie sua conta!</Text>
      <TouchableOpacity onPress={() => navigation.navigate('LoginScreen')}>
        <Text style={styles.subtitle}>Já registrado? Entre aqui.</Text>
      </TouchableOpacity>

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
        onChangeText={(text) => setCpf(formatCpf(text))}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Fone"
        value={fone}
        onChangeText={(text) => setFone(formatFone(text))}
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
