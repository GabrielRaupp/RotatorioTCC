import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  ScrollView,
  Dimensions,
  SafeAreaView,
  Modal,
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { firestore } from '../firebaseConfig';
import {
  collection,
  getDocs,
  addDoc,
  query,
  where,
} from 'firebase/firestore';

const { width, height } = Dimensions.get('window');

export default function ComprarVagaScreen({ navigation }) {
  const [selectedOption, setSelectedOption] = useState(null);
  const [hours, setHours] = useState('');
  const [price, setPrice] = useState(null);
  const [selectedPlaca, setSelectedPlaca] = useState(null);
  const [placas, setPlacas] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [purchasedSlots, setPurchasedSlots] = useState([]);

  useEffect(() => {
    fetchPlacas();
    fetchPurchasedSlots();
  }, []);

  const openPlacaSelectionModal = () => {
    setModalVisible(true);
  };

  const fetchPlacas = async () => {
    try {
      const placaCollection = collection(firestore, 'placas');
      const placaSnapshot = await getDocs(placaCollection);
      const placaList = placaSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setPlacas(placaList);
    } catch (error) {
      console.error('Erro ao buscar placas:', error);
    }
  };

  const fetchPurchasedSlots = async () => {
    try {
      const slotsCollection = collection(firestore, 'purchasedSlots');
      const slotsSnapshot = await getDocs(slotsCollection);
      const slotsList = slotsSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setPurchasedSlots(slotsList);
    } catch (error) {
      console.error('Erro ao buscar vagas compradas:', error);
    }
  };
  const handlePlacaSelect = (placa) => {
    setSelectedPlaca(placa); 
    setModalVisible(false);
  };


  const handleOptionPress = (option) => {
    setSelectedOption(option);
    setHours('');
    
    if (option === '1h') {
      setPrice(3); // 1 hora custa R$ 3
    } else if (option === '2h') {
      setPrice(6); // 2 horas custam R$ 6
    } else if (option === 'custom') {
      setPrice(null); // Limpar o preço se for a opção personalizada
    }
  };
  
  const handleCustomTimeChange = (text) => {
    const enteredHours = parseInt(text);
    setHours(text);
  
    if (enteredHours === 1) {
      setPrice(3);
    } else if (enteredHours === 2) {
      setPrice(6);
    } else if (enteredHours > 2) {
      setPrice(3 * enteredHours); // 3 reais por hora
    } else {
      setPrice(null);
    }
  };
  
  const handlePurchase = async () => {
    // Validação para garantir que placa e preço estão selecionados corretamente
    if (!selectedPlaca || !price || (selectedOption === 'custom' && !hours)) {
      alert('Selecione uma placa, uma duração válida e um tempo antes de comprar.');
      console.log(selectedPlaca + price);
      return;
    }
  
    // Se estiver na opção "custom", garanta que o valor das horas é um número válido
    if (selectedOption === 'custom' && (isNaN(hours) || parseInt(hours) <= 0)) {
      alert('Por favor, insira um número válido de horas.');
      return;
    }
  
    try {
      const slotData = {
        carPlate: selectedPlaca.placa, // Usando placa selecionada
        hours: selectedOption === 'custom' ? parseInt(hours) : parseInt(selectedOption),
        price,
        purchasedAt: new Date().toISOString(),
      };
  
      // Adiciona o slot no banco de dados
      await addDoc(collection(firestore, 'purchasedSlots'), slotData);
  
      alert('Vaga comprada com sucesso!');
      fetchPurchasedSlots(); // Recarrega as vagas compradas
    } catch (error) {
      console.error('Erro ao comprar vaga:', error);
    }
  };
  
  

  return (
      <ScrollView style={styles.container}>
        {/* Informação da placa */}
      <View style={styles.carInfo}>
        <TouchableOpacity onPress={openPlacaSelectionModal} style={styles.carTouchable}>
          <View style={[styles.plateContainer, selectedPlaca && styles.selectedCar]}>
            <Text style={styles.plateLabel}>Placa do Carro:</Text>
            <Text style={styles.plateText}>{selectedPlaca ? selectedPlaca.placa : 'Selecione uma placa'}</Text>
          </View>
          <FontAwesome name="chevron-right" size={20} color="#000" style={styles.arrowIcon} />
        </TouchableOpacity>
      </View>

      <Text style={styles.questionText}>Quanto tempo você deseja estacionar?</Text>

      {/* Opções de tempo de estacionamento */}
      <View contentContainerStyle={styles.optionsContainer} style={styles.scrollView}>
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
            placeholder="Digite o número de horas:"
            value={hours}
            onChangeText={handleCustomTimeChange}
            keyboardType="numeric"
          />
        )}

        {price !== null && (
          <Text style={styles.priceText}>Valor a pagar: R$ {price}</Text>
        )}

        {/* Botão Comprar */}
        <TouchableOpacity style={styles.buyButton} onPress={handlePurchase}>
          <Text style={styles.buyButtonText}>Comprar</Text>
        </TouchableOpacity>
      </View>

      {/* Modal de seleção de placa */}
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Selecione uma Placa</Text>
            {placas.map((placa) => (
              <TouchableOpacity
                key={placa.id}
                style={[
                  styles.modalOption,
                  selectedPlaca?.id === placa.id && styles.selectedCarOption,
                ]}
                onPress={() => handlePlacaSelect(placa)}
              >
                <Text style={styles.modalOptionText}>{placa.placa}</Text>
              </TouchableOpacity>
            ))}
            <TouchableOpacity
              style={styles.modalCloseButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.modalCloseText}>Fechar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Lista de vagas compradas */}
      <View style={styles.purchasedSlotsContainer}>
        <Text style={styles.purchasedSlotsTitle}>Vagas Compradas</Text>
        {purchasedSlots.map((slot) => (
          <View key={slot.id} style={styles.purchasedSlotItem}>
            <Text style={styles.slotText}>Placa: {slot.carPlate}</Text>
            <Text style={styles.slotText}>Horas: {slot.hours}</Text>
            <Text style={styles.slotText}>Preço: R$ {slot.price}</Text>
          </View>
        ))}
      </View>
      </ScrollView>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#F5F5F5', // Cor de fundo mais suave
      paddingTop: 20,
      paddingBottom: 10,
      paddingHorizontal: 15,
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 20,
      paddingVertical: 10,
      backgroundColor: '#F7F7F7',
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
    carTouchable: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      width: '100%',
      padding: 15,
      borderRadius: 10,
      backgroundColor: '#FFF',
      marginTop: 10,
      borderWidth: 1,
      borderColor: '#BEBEBE',
      shadowColor: '#000',
      shadowOpacity: 0.1,
      shadowRadius: 5,
      elevation: 3, // Sombras para iOS e Android
    },
    plateContainer: {
      padding: 15,
      backgroundColor: '#D9D9D9',
      borderRadius: 8,
      borderWidth: 1,
      borderColor: '#BEBEBE',
      alignItems: 'center',
      width: '80%',
    },
    selectedCar: {
      borderColor: '#003366', // Azul escuro para indicar o carro selecionado
      borderWidth: 2,
    },
    plateLabel: {
      fontSize: 16,
      fontWeight: 'bold',
      color: '#000',
    },
    plateText: {
      fontSize: 18,
      color: '#000',
      marginTop: 5,
    },
    arrowIcon: {
      marginLeft: 10,
      fontSize: 24,
    },
    questionText: {
      fontSize: 20,
      fontWeight: 'bold',
      textAlign: 'center',
      color: '#333',
      marginVertical: 20,
    },
    optionsContainer: {
      alignItems: 'center',
      paddingBottom: 100,
    },
    optionButton: {
      width: '90%',
      paddingVertical: 18,
      borderRadius: 8,
      backgroundColor: '#FFF',
      alignItems: 'center',
      marginVertical: 12,
      borderWidth: 1,
      borderColor: '#BEBEBE',
      shadowColor: '#000',
      shadowOpacity: 0.05,
      shadowRadius: 5,
      elevation: 2,
    },
    optionSelected: {
      backgroundColor: '#003366', // Azul escuro
      borderColor: '#003366', // Azul escuro
      color: '#fff'
    },
    optionText: {
      fontSize: 18,
      fontWeight: 'bold',
      
    },
    input: {
      width: '90%',
      paddingVertical: 15,
      borderRadius: 8,
      backgroundColor: '#FFF',
      marginVertical: 12,
      textAlign: 'center',
      fontSize: 18,
      borderColor: '#BEBEBE',
      borderWidth: 1,
      shadowColor: '#000',
      shadowOpacity: 0.1,
      shadowRadius: 5,
      elevation: 3,
    },
    priceText: {
      fontSize: 18,
      fontWeight: 'bold',
      color: '#000',
      marginTop: 12,
    },
    buyButton: {
      marginTop: 25,
      backgroundColor: '#003366',
      paddingVertical: 15,
      width: '90%',
      borderRadius: 10,
      alignItems: 'center',
      shadowColor: '#000',
      shadowOpacity: 0.2,
      shadowRadius: 6,
      elevation: 4,
    },
    buyButtonText: {
      color: '#FFF',
      fontSize: 20,
      fontWeight: 'bold',
    },
    bottomMenu: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      paddingVertical: 10,
      backgroundColor: '#F7F7F7',
    },
    menuButton: {
      paddingHorizontal: 20,
      paddingVertical: 10,
    },
    modalContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
      width: '80%',
      padding: 20,
      backgroundColor: '#FFF',
      borderRadius: 10,
      shadowColor: '#000',
      shadowOpacity: 0.2,
      shadowRadius: 5,
      elevation: 5,
    },
    modalTitle: {
      fontSize: 22,
      fontWeight: 'bold',
      marginBottom: 20,
      textAlign: 'center',
      color: '#003366',
    },
    modalOption: {
      paddingVertical: 15,
      borderRadius: 8,
      backgroundColor: '#F0F0F0',
      alignItems: 'center',
      marginVertical: 10,
      borderWidth: 1,
      borderColor: '#BEBEBE',
    },
    selectedCarOption: {
      borderColor: '#003366', 
      borderWidth: 2,
    },
    modalOptionText: {
      fontSize: 18,
      color: '#000',
    },
    modalCloseButton: {
      marginTop: 20,
      backgroundColor: '#003366',
      paddingVertical: 15,
      borderRadius: 8,
      alignItems: 'center',
    },
    modalCloseText: {
      color: '#FFF',
      fontSize: 18,
      fontWeight: 'bold',
    },
    purchasedSlotsContainer: {
      marginTop: 30,
      padding: 10,
      backgroundColor: '#FFF',
      borderRadius: 10,
      marginBottom: 20,
      shadowColor: '#000',
      shadowOpacity: 0.1,
      shadowRadius: 5,
      elevation: 3,
    },
    purchasedSlotsTitle: {
      fontSize: 22,
      fontWeight: 'bold',
      color: '#003366',
      marginBottom: 15,
      textAlign: 'center',
    },
    purchasedSlotItem: {
      paddingVertical: 12,
      borderBottomWidth: 1,
      borderBottomColor: '#BEBEBE',
      marginBottom: 10,
    },
    slotText: {
      fontSize: 16,
      color: '#333',
    },
  });
  