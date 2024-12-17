import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

export default function HomeScreen({ navigation }) {
  const [selectedType, setSelectedType] = useState(null);

  const handleSelect = (type) => {
    setSelectedType(type);
    if (type === 'Usuário') {
      navigation.navigate('LoginScreen');
    } else if (type === 'Administrador') {
      navigation.navigate('AdminScreen');
    }
  };

  const handleNoCadastro = () => {
    navigation.navigate('CadastroScreen');
  };

  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <Image source={require('../assets/logorotarorio.png')} style={styles.logo} />
      </View>

      <TouchableOpacity style={styles.noCadastroButton} onPress={handleNoCadastro}>
        <Text style={styles.noCadastroText}>Não tenho cadastro, clique aqui!</Text>
      </TouchableOpacity>

      <View style={styles.bottomContainer}>
        <Text style={styles.title}>Escolha o tipo de acesso:</Text>

        <View style={styles.buttonGroup}>
          <TouchableOpacity
            style={[
              styles.radioButton,
              selectedType === 'Administrador' && styles.selectedButton,
            ]}
            onPress={() => handleSelect('Administrador')}
          >
            <Text
              style={[
                styles.radioButtonText,
                selectedType === 'Administrador' && styles.selectedText,
              ]}
            >
              Administrador
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.radioButton,
              selectedType === 'Usuário' && styles.selectedButton,
            ]}
            onPress={() => handleSelect('Usuário')}
          >
            <Text
              style={[
                styles.radioButtonText,
                selectedType === 'Usuário' && styles.selectedText,
              ]}
            >
              Usuário
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#ccc' },
  topContainer: { flex: 0.5, justifyContent: 'center', alignItems: 'center', backgroundColor: '#ccc' },
  logo: { width: 200, height: 200, resizeMode: 'contain', marginBottom: 10 },
  bottomContainer: { 
    flex: 0.5, 
    padding: 20, 
    alignItems: 'center', 
    justifyContent: 'center', 
    backgroundColor: '#fff', 
    borderTopLeftRadius: 40, 
    borderTopRightRadius: 40, 
    width: '100%' 
  },
  title: { fontSize: 24, fontWeight: 'bold', color: '#333', marginBottom: 20 },
  noCadastroButton: { 
    marginTop: 10,
    padding: 15,
    alignItems: 'center',
    width: '90%',
    alignSelf: 'center',
  },
  noCadastroText: { 
    color: '#000',
    fontSize: 13,
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 20,
  },
  radioButton: {
    borderWidth: 1,
    borderColor: '#333',
    borderRadius: 5,
    padding: 15,
    width: '40%',
    alignItems: 'center',
  },
  selectedButton: {
    backgroundColor: '#333',
  },
  radioButtonText: {
    fontSize: 16,
    color: '#333',
  },
  selectedText: {
    color: '#fff',
  },
});
