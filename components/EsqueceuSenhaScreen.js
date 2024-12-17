import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Image,
  Platform,
} from 'react-native';

export default function EsqueceuSenhaScreen({ navigation }) {
  const [emailOuTelefone, setEmailOuTelefone] = useState('');

  const handleEnviarLink = () => {
    if (!emailOuTelefone) {
      Alert.alert('Erro', 'Por favor, insira seu email ou telefone.');
      return;
    }

    // Validação simples de e-mail
    const isEmailValido = emailOuTelefone.includes('@') && emailOuTelefone.includes('.');
    if (!isEmailValido) {
      Alert.alert('Erro', 'Por favor, insira um e-mail válido.');
      return;
    }

    Alert.alert(
      'Sucesso',
      `Um link foi enviado para "${emailOuTelefone}" para recuperação da sua conta.`
    );
  };

  return (
    <View style={styles.container}>
      {/* Cabeçalho com logo */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Text style={styles.backText}>{'<'}</Text>
        </TouchableOpacity>
        <Image
          source={require('../assets/logorotarorio.png')} // Verifique se o caminho está correto
          style={styles.logo}
        />
      </View>

      {/* Título */}
      <Text style={styles.title}>Problemas para entrar?</Text>
      <Text style={styles.subtitle}>
        Insira o seu email ou telefone, e enviaremos um link para você voltar a acessar a sua conta.
      </Text>

      {/* Campo de entrada */}
      <TextInput
        style={styles.input}
        placeholder="Email ou telefone"
        value={emailOuTelefone}
        onChangeText={setEmailOuTelefone}
        keyboardType={Platform.OS === 'ios' ? 'email-address' : 'default'}
        autoCapitalize="none"
      />

      {/* Botão de envio */}
      <TouchableOpacity style={styles.button} onPress={handleEnviarLink}>
        <Text style={styles.buttonText}>Enviar</Text>
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
    color: '#000',
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
});
