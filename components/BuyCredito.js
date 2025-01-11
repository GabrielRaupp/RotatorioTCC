import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  TextInput,
  ScrollView,
  Dimensions,
  SafeAreaView,
  Picker,  // Importando o Picker para seleção
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window'); // Obtém a largura e altura da tela

export default function ParkingScreen({ navigation }) {
  const [plates, setPlates] = useState(['ABC1D23', 'XYZ2A34']);  // Exemplo de placas registradas
  const [selectedPlate, setSelectedPlate] = useState(plates[0] || '');  // Placa selecionada
  const [selectedOption, setSelectedOption] = useState(null);
  const [hours, setHours] = useState(''); 
  const [price, setPrice] = useState(null);

  // Função para verificar se há placas registradas
  const hasPlateRegistered = plates.length > 0;

  const handleOptionPress = (option) => {
    setSelectedOption(option);
    setHours(''); 
    setPrice(null);
  };

  const handleCustomTimeChange = (text) => {
    const enteredHours = parseInt(text);
    setHours(text);

    if (enteredHours === 1) {
      setPrice(3);
    } else if (enteredHours === 2) {
      setPrice(6);
    } else if (enteredHours > 2) {
      setPrice(3 * enteredHours);
    } else {
      setPrice(null);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Cabeçalho */}
      <View style={styles.header}>
        <TouchableOpacity>
          <FontAwesome name="bars" size={24} color="#000" />
        </TouchableOpacity>
        <View style={styles.logoContainer}>
          <Text style={styles.logoText}>Crédito</Text>
        </View>
        <TouchableOpacity>
          <FontAwesome name="user-circle" size={24} color="#000" />
        </TouchableOpacity>
      </View>

      {/* Verificação de placa registrada */}
      {!hasPlateRegistered ? (
        <View style={styles.noPlateContainer}>
          <Text style={styles.noPlateText}>Você precisa cadastrar uma placa para acessar esta área.</Text>
        </View>
      ) : (
        <>
          {/* Informação do carro */}
          <View style={styles.carInfo}>
            <Image
              source={require('../assets/iconecredito.png')} // Imagem do carro, substitua pelo caminho correto
              style={styles.carImage}
            />
            <View style={styles.plateContainer}>
              <Text style={styles.plateLabel}>Placa do Carro:</Text>
              <Picker
                selectedValue={selectedPlate}
                style={styles.picker}
                onValueChange={(itemValue) => setSelectedPlate(itemValue)}
              >
                {plates.map((plate, index) => (
                  <Picker.Item key={index} label={plate} value={plate} />
                ))}
              </Picker>
            </View>
          </View>

          <Text style={styles.questionText}>Quanto tempo você deseja estacionar?</Text>

          {/* Opções de tempo de estacionamento */}
          <ScrollView
            contentContainerStyle={styles.optionsContainer}
            style={styles.scrollView}
          >
            <TouchableOpacity
              style={[styles.optionButton, selectedOption === '1h' && styles.optionSelected]}
              onPress={() => handleOptionPress('1h')}
            >
              <Text style={styles.optionText}>1 Hora - R$ 3</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.optionButton, selectedOption === '2h' && styles.optionSelected]}
              onPress={() => handleOptionPress('2h')}
            >
              <Text style={styles.optionText}>2 Horas - R$ 6</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.optionButton, selectedOption === 'custom' && styles.optionSelected]}
              onPress={() => handleOptionPress('custom')}
            >
              <Text style={styles.optionText}>Outros</Text>
            </TouchableOpacity>

            {selectedOption === 'custom' && (
              <TextInput
                style={styles.input}
                placeholder="Digite o número de horas a ser usadas:"
                value={hours}
                onChangeText={handleCustomTimeChange}
                keyboardType="numeric"
              />
            )}

            {price !== null && (
              <Text style={styles.priceText}>Valor a pagar: R$ {price}</Text>
            )}

            {/* Botão Comprar */}
            <TouchableOpacity style={styles.buyButton}>
              <Text style={styles.buyButtonText}>Comprar</Text>
            </TouchableOpacity>
          </ScrollView>
        </>
      )}

      {/* Menu Inferior */}
      <View style={styles.bottomMenu}>
        <TouchableOpacity style={styles.menuButton}>
          <FontAwesome name="home" size={24} color="#000" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuButton}>
          <FontAwesome name="dollar" size={24} color="#000" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuButton}>
          <FontAwesome name="cog" size={24} color="#000" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#D9D9D9', // Fundo cinza para toda a tela
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#F7F7F7', // Fundo claro do cabeçalho
    paddingTop: 10, // Ajuste para a barra de status
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoText: {
    fontSize: 22,
    color: '#000',
    fontWeight: 'bold',
  },
  carInfo: {
    alignItems: 'center',
    marginVertical: 20,
  },
  carImage: {
    width: width * 0.6,
    height: height * 0.15,
    resizeMode: 'contain',
  },
  plateContainer: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#D9D9D9',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#BEBEBE',
    width: '80%',
    alignItems: 'center',
  },
  plateLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  picker: {
    width: '100%',
    height: 50,
    borderColor: '#CCCCCC',
    borderWidth: 1,
    borderRadius: 8,
  },
  questionText: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#000',
    marginVertical: 20,
  },
  optionsContainer: {
    alignItems: 'center',
    paddingBottom: 100, // Ajuste para não sobrepor o rodapé
  },
  optionButton: {
    width: '80%',
    padding: 15,
    backgroundColor: '#EDEDED',
    borderRadius: 8,
    marginVertical: 5,
    alignItems: 'center',
  },
  optionSelected: {
    backgroundColor: '#D3D3D3',
  },
  optionText: {
    fontSize: 18,
    color: '#000',
  },
  input: {
    width: '80%',
    height: 50,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    paddingHorizontal: 10,
    marginTop: 10,
    fontSize: 16,
    borderColor: '#CCCCCC',
    borderWidth: 1,
  },
  priceText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    marginTop: 10,
  },
  buyButton: {
    marginTop: 15,
    width: '80%',
    padding: 15,
    backgroundColor: '#000',
    borderRadius: 8,
    alignItems: 'center',
  },
  buyButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFF',
  },
  bottomMenu: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 10,
    backgroundColor: '#F7F7F7', // Fundo do rodapé
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  menuButton: {
    padding: 10,
  },
  noPlateContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
  },
  noPlateText: {
    fontSize: 18,
    color: '#FF0000',
    fontWeight: 'bold',
  },
});
