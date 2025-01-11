import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { firestore } from '../firebaseConfig'; // Ajuste conforme sua configuração do Firebase
import { collection, getDocs, doc, updateDoc } from 'firebase/firestore';

export default function AdminScreen() {
  const [placasRegistradas, setPlacasRegistradas] = useState([]);
  const [erro, setErro] = useState(null);

  // Função para carregar placas registradas
  const carregarPlacas = async () => {
    try {
      const placasRef = collection(firestore, 'veiculos');
      const placasSnapshot = await getDocs(placasRef);
      const placasList = placasSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setPlacasRegistradas(placasList);
    } catch (error) {
      console.error("Erro ao carregar placas:", error);
      setErro("Erro ao carregar placas registradas.");
    }
  };

  // Função para adicionar infração
  const adicionarInfracao = async (placaId) => {
    try {
      const placaRef = doc(firestore, 'veiculos', placaId);
      await updateDoc(placaRef, {
        infração: true, // ou o campo correspondente que você queira usar
      });
      Alert.alert('Sucesso', 'Infração registrada com sucesso!');
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível adicionar a infração.');
      console.error('Erro ao adicionar infração:', error);
    }
  };

  // Carregar placas ao montar o componente
  useEffect(() => {
    carregarPlacas();
  }, []);

  return (
    <View style={styles.container}>
      {/* Cabeçalho */}
      <View style={styles.header}>
        <TouchableOpacity>
          <FontAwesome name="bars" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.title}>Administração</Text>
        <TouchableOpacity>
          <FontAwesome name="user-circle" size={24} color="#000" />
        </TouchableOpacity>
      </View>

      {/* Exibição das Placas Registradas */}
      <ScrollView style={styles.scrollContainer}>
        {erro && <Text style={styles.errorText}>{erro}</Text>}

        {placasRegistradas.length === 0 ? (
          <Text style={styles.noPlacasText}>Nenhuma placa registrada.</Text>
        ) : (
          placasRegistradas.map((placa) => (
            <View key={placa.id} style={styles.placaContainer}>
              <Text style={styles.placaText}>Placa: {placa.placa}</Text>
              <Text style={styles.placaText}>Usuário: {placa.usuario || 'Desconhecido'}</Text>
              <Text style={styles.placaText}>Email: {placa.email}</Text> {/* Exibindo email */}
              <TouchableOpacity
                style={styles.button}
                onPress={() => adicionarInfracao(placa.id)}
              >
                <Text style={styles.buttonText}>Adicionar Infração</Text>
              </TouchableOpacity>
            </View>
          ))
        )}
      </ScrollView>

      {/* Barra de navegação inferior */}
      <View style={styles.footer}>
        <TouchableOpacity>
          <FontAwesome name="home" size={24} color="#000" />
        </TouchableOpacity>
        <TouchableOpacity>
          <FontAwesome name="dollar" size={24} color="#000" />
        </TouchableOpacity>
        <TouchableOpacity>
          <FontAwesome name="cog" size={24} color="#000" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#D9D9D9',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#F7F7F7',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  scrollContainer: {
    padding: 20,
  },
  placaContainer: {
    backgroundColor: '#FFF',
    padding: 15,
    marginBottom: 15,
    borderRadius: 8,
    elevation: 3,
  },
  placaText: {
    fontSize: 16,
    marginBottom: 5,
  },
  button: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#FFF',
    fontWeight: 'bold',
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginTop: 10,
  },
  noPlacasText: {
    color: 'gray',
    fontSize: 18,
    textAlign: 'center',
    marginTop: 20,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderColor: '#CCC',
  },
});
