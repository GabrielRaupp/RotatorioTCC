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
  Picker,
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

// Simulação de dados do usuário (substituir por API ou banco de dados)
const userPlatesData = [
  { id: 1, plate: 'ABC1D23', userId: 123 },
  { id: 2, plate: 'XYZ2A34', userId: 456 },
  { id: 3, plate: 'DEF3G56', userId: 123 },
];

const userId = 123; // Simulação do ID do usuário logado

const { width, height } = Dimensions.get('window');

export default function ParkingScreen({ navigation }) {
  const [plates, setPlates] = useState([]);
  const [selectedPlate, setSelectedPlate] = useState('');
  const [selectedOption, setSelectedOption] = useState(null);
  const [hours, setHours] = useState('');
  const [price, setPrice] = useState(null);

  useEffect(() => {
    // Filtrar placas do usuário logado
    const userPlates = userPlatesData.filter((plate) => plate.userId === userId);
    setPlates(userPlates.map((p) => p.plate));
    if (userPlates.length > 0) {
      setSelectedPlate(userPlates[0].plate);
    }
  }, []);

  const hasPlateRegistered = plates.length > 0;

  const handleOptionPress = (option) => {
    setSelectedOption(option);
    setHours('');
    setPrice(null);
  };

  const handleCustomTimeChange = (text) => {
    const enteredHours = parseInt(text);
    setHours(text);
    if (enteredHours === 1) setPrice(3);
    else if (enteredHours === 2) setPrice(6);
    else if (enteredHours > 2) setPrice(3 * enteredHours);
    else setPrice(null);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
      <TouchableOpacity onPress={() => navigation.navigate("MenuScreen")}>
          <FontAwesome name="arrow-left" size={24} color="#000" />
        </TouchableOpacity>
        <View style={styles.logoContainer}>
          <Text style={styles.logoText}>Crédito</Text>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('PerfilScreen')}>
          <FontAwesome name="user-circle" size={24} color="#000" />
        </TouchableOpacity>
      </View>

      {!hasPlateRegistered ? (
        <View style={styles.noPlateContainer}>
          <Text style={styles.noPlateText}>Você precisa cadastrar uma placa para acessar esta área.</Text>
        </View>
      ) : (
        <>
          <View style={styles.carInfo}>
            <Image source={require('../assets/iconecredito.png')} style={styles.carImage} />
            <View style={styles.plateContainer}>
              <Text style={styles.plateLabel}>Placa do Carro:</Text>
              <Picker selectedValue={selectedPlate} style={styles.picker} onValueChange={(itemValue) => setSelectedPlate(itemValue)}>
                {plates.map((plate, index) => (
                  <Picker.Item key={index} label={plate} value={plate} />
                ))}
              </Picker>
            </View>
          </View>

          <Text style={styles.questionText}>Quanto tempo você deseja estacionar?</Text>

          <ScrollView contentContainerStyle={styles.optionsContainer} style={styles.scrollView}>
            <TouchableOpacity style={[styles.optionButton, selectedOption === '1h' && styles.optionSelected]} onPress={() => handleOptionPress('1h')}>
              <Text style={styles.optionText}>1 Hora - R$ 3</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.optionButton, selectedOption === '2h' && styles.optionSelected]} onPress={() => handleOptionPress('2h')}>
              <Text style={styles.optionText}>2 Horas - R$ 6</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.optionButton, selectedOption === 'custom' && styles.optionSelected]} onPress={() => handleOptionPress('custom')}>
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

            {price !== null && <Text style={styles.priceText}>Valor a pagar: R$ {price}</Text>}

            <TouchableOpacity style={styles.buyButton}>
              <Text style={styles.buyButtonText}>Comprar</Text>
            </TouchableOpacity>
          </ScrollView>
        </>
      )}

<View style={styles.footer}>
        <TouchableOpacity onPress={() => navigation.navigate('HomeScreen')}>
          <FontAwesome name="home" size={24} color="#000" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Buy')}>
          <FontAwesome name="dollar" size={24} color="#000" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Config')}>
          <FontAwesome name="cog" size={24} color="#000" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#D9D9D9' 
  },

  header: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    paddingHorizontal: 20, 
    paddingVertical: 10, 
    paddingTop: 10, 
    backgroundColor: '#F7F7F7' 
  },

  logoContainer: { 
    flexDirection: 'row', 
    alignItems: 'center' 
  },

  logoText: { 
    fontSize: 22, 
    fontWeight: 'bold', 
    color: '#000' 
  },

  carInfo: { 
    alignItems: 'center', 
    marginVertical: 20 
  },

  carImage: { 
    width: width * 0.6, 
    height: height * 0.15, 
    resizeMode: 'contain' 
  },

  plateContainer: { 
    marginTop: 10, 
    padding: 10, 
    width: '80%', 
    borderRadius: 8, 
    alignItems: 'center', 
    backgroundColor: '#D9D9D9', 
    borderWidth: 1, 
    borderColor: '#BEBEBE' 
  },

  plateLabel: { 
    fontSize: 16, 
    fontWeight: 'bold', 
    color: '#000' 
  },

  picker: { 
    width: '100%', 
    height: 50, 
    borderColor: '#CCCCCC', 
    borderWidth: 1, 
    borderRadius: 8 
  },

  questionText: { 
    fontSize: 20, 
    fontWeight: 'bold', 
    textAlign: 'center', 
    color: '#000', 
    marginVertical: 20 
  },

  optionsContainer: { 
    alignItems: 'center', 
    paddingBottom: 100 
  },

  optionButton: { 
    width: '80%', 
    padding: 15, 
    marginVertical: 5, 
    borderRadius: 8, 
    alignItems: 'center', 
    backgroundColor: '#EDEDED' 
  },

  optionSelected: { 
    backgroundColor: '#D3D3D3' 
  },

  optionText: { 
    fontSize: 18, 
    color: '#000' 
  },

  input: { 
    width: '80%', 
    height: 50, 
    fontSize: 16, 
    marginTop: 10, 
    borderRadius: 8, 
    paddingHorizontal: 10, 
    backgroundColor: '#FFFFFF', 
    borderColor: '#CCCCCC', 
    borderWidth: 1 
  },

  priceText: { 
    fontSize: 18, 
    fontWeight: 'bold', 
    color: '#000', 
    marginTop: 10 
  },

  buyButton: { 
    marginTop: 15, 
    width: '80%', 
    padding: 15, 
    borderRadius: 8, 
    alignItems: 'center', 
    backgroundColor: '#000' 
  },

  buyButtonText: { 
    fontSize: 18, 
    fontWeight: 'bold', 
    color: '#FFF' 
  },

  footer: { 
    flexDirection: 'row', 
    justifyContent: 'space-around', 
    alignItems: 'center', 
    paddingVertical: 10, 
    backgroundColor: '#F7F7F7', 
    borderTopWidth: 1, 
    borderTopColor: '#E0E0E0' 
  },

  menuButton: { 
    padding: 10 
  },

  noPlateContainer: { 
    justifyContent: 'center', 
    alignItems: 'center', 
    marginVertical: 20 
  },

  noPlateText: { 
    fontSize: 18, 
    fontWeight: 'bold', 
    color: '#FF0000' 
  },
});

