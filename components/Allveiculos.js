import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { firestore } from '../firebaseConfig';
import { collection, getDocs, doc, updateDoc, query, where, getDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

export default function AdminScreen() {
  const [placasRegistradas, setPlacasRegistradas] = useState([]);
  const [erro, setErro] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredPlacas, setFilteredPlacas] = useState([]);

  const carregarPlacas = async () => {
    try {
      const auth = getAuth();
      const user = auth.currentUser;
      if (!user) {
        setErro('Usuário não autenticado.');
        return;
      }

      const placasRef = collection(firestore, 'placas');
      const q = query(placasRef, where('userId', '==', user.uid));
      const placasSnapshot = await getDocs(q);

      if (placasSnapshot.empty) {
        setPlacasRegistradas([]);
        return;
      }

      const placasList = await Promise.all(
        placasSnapshot.docs.map(async (docSnapshot) => {
          const placaData = docSnapshot.data();
          const userDoc = await getDoc(doc(firestore, 'users', placaData.userId));
          const userInfo = userDoc.exists() ? userDoc.data() : { nome: 'Desconhecido', email: 'Não informado' };
          
          return {
            id: docSnapshot.id,
            placa: placaData.placa || 'Placa desconhecida',
            email: userInfo.email || 'Usuário não informado',
            nome: userInfo.nome || 'Nome não disponível',
            expiracao: placaData.expiracao || 'Data não disponível',
            imagem: placaData.imagem || null,
            pago: placaData.pago || false,
          };
        })
      );

      setPlacasRegistradas(placasList);
      setFilteredPlacas(placasList);
    } catch (error) {
      console.error('Erro ao carregar placas:', error);
      setErro('Erro ao carregar placas registradas. Tente novamente mais tarde.');
    }
  };

  useEffect(() => {
    carregarPlacas();
  }, []);

  useEffect(() => {
    const filtered = placasRegistradas.filter((placa) =>
      placa.placa.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredPlacas(filtered);
  }, [searchQuery, placasRegistradas]);

  const adicionarInfracao = async (placaId) => {
    try {
      const placaRef = doc(firestore, 'placas', placaId);
      await updateDoc(placaRef, {
        infracao: true,
      });
      Alert.alert('Sucesso', 'Infração registrada com sucesso!');
      carregarPlacas();
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível adicionar a infração.');
      console.error('Erro ao adicionar infração:', error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity>
          <FontAwesome name="bars" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.title}>Administração</Text>
        <TouchableOpacity>
          <FontAwesome name="user-circle" size={24} color="#000" />
        </TouchableOpacity>
      </View>

      <TextInput
        style={styles.searchInput}
        placeholder="Buscar placa..."
        value={searchQuery}
        onChangeText={setSearchQuery}
      />

      <ScrollView style={styles.scrollContainer}>
        {erro && <Text style={styles.errorText}>{erro}</Text>}

        {filteredPlacas.length === 0 ? (
          <Text style={styles.noPlacasText}>Nenhuma placa encontrada.</Text>
        ) : (
          filteredPlacas.map((placa) => (
            <View key={placa.id} style={styles.placaContainer}>
              <Text style={styles.placaText}>Placa: {placa.placa}</Text>
              <Text style={styles.placaText}>Nome: {placa.nome}</Text>
              <Text style={styles.placaText}>Email: {placa.email}</Text>
              <Text style={styles.placaText}>Status: {placa.pago ? 'Pago' : 'Não Pago'}</Text>
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
  searchInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    margin: 20,
    backgroundColor: '#fff',
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
});
