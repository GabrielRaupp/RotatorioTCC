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
import { getFirestore, doc, getDoc } from 'firebase/firestore'; 

const db = getFirestore(); // Instância do Firestore

export default function LoginScreen({ navigation, onLoginAdmin }) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [usuario, setUsuario] = useState(null);

  // Função para buscar dados no Firestore
  const buscarDadosUsuario = async (email) => {
    try {
      const docRef = doc(db, 'usuarios', email); 
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const dados = docSnap.data();
        setUsuario(dados); 
      } else {
        Alert.alert('Erro', 'Nenhum usuário encontrado!');
      }
    } catch (error) {
      console.error("Erro ao buscar usuário:", error);
      Alert.alert('Erro', 'Ocorreu um erro ao buscar os dados.');
    }
  };

  const handleLogin = async () => {
    if (!email || !senha) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos!');
      return;
    }

    if (email === '11111' && senha === '123456') {
      onLoginAdmin()
      return;
    }
  }

  return (
    <View style={styles.containerWrapper}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate('HomeScreen')}>
      <FontAwesome name="arrow-left" size={24} color="#000" />
    </TouchableOpacity>
          <View style={styles.logoContainer}>
            <Image source={require('../assets/logorotarorio.png')} style={styles.logo} />
            <Text style={styles.title}>Login</Text>
          </View>
          <View style={{ width: 24 }} />
        </View>

        <Text style={styles.subtitle}>Faça login para continuar</Text>

        <TextInput
          style={styles.input}
          placeholder="Código"
          value={email}
          onChangeText={setEmail}
          keyboardType="number-pad"
          maxLength={5}
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

        {usuario && (
          <View style={styles.userInfo}>
            <Text style={styles.userInfoText}>Usuário: {usuario.nome}</Text>
            <Text style={styles.userInfoText}>Placa: {usuario.placa}</Text>
            <Text style={styles.userInfoText}>Email: {usuario.email}</Text>
          </View>
        )}
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
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 15,
    backgroundColor: '#FFF',
    elevation: 4,
  },
  userInfo: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#EDEDED',
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
  },
  userInfoText: {
    fontSize: 16,
    color: '#333',
  },
});
