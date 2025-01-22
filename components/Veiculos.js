import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  KeyboardAvoidingView,
  Platform,
  Image,
} from 'react-native';
import { firestore, storage } from '../firebaseConfig';
import {
  collection,
  addDoc,
  getDocs,
  query,
  orderBy,
  where,
  doc,
  updateDoc,
  deleteDoc,
} from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { getAuth } from 'firebase/auth';
import * as ImagePicker from 'expo-image-picker';
import { FontAwesome6 } from '@expo/vector-icons';

export default function RegistroPlacasScreen({ navigation }) {
  const [placa, setPlaca] = useState('');
  const [marca, setMarca] = useState('');
  const [ano, setAno] = useState('');
  const [cor, setCor] = useState('');
  const [image, setImage] = useState(null);
  const [placasRegistradas, setPlacasRegistradas] = useState([]);
  const [editandoPlaca, setEditandoPlaca] = useState(null);
  const auth = getAuth();
  const user = auth.currentUser;

  const validarPlaca = (placa) => /^[A-Z]{3}[0-9]{4}$/.test(placa);

  const carregarPlacas = async () => {
    try {
      if (!user) throw new Error('Usuário não autenticado.');
  
      const q = query(
        collection(firestore, 'placas'),
        where('userId', '==', user.uid),
        orderBy('indice', 'asc') // Ordenar pelo índice
      );
      const querySnapshot = await getDocs(q);
      const placas = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setPlacasRegistradas(placas);
    } catch (error) {
      console.error('Erro', error.message);
    }
  };
  


  const registrarPlaca = async () => {
    if (!validarPlaca(placa)) {
      Alert.alert('Erro', 'A placa deve estar no formato correto (3 letras e 4 números).');
      return;
    }
  
    try {
      if (!user) throw new Error('Usuário não autenticado.');
  
      // Gerar índice para a placa
      const placasExistentes = placasRegistradas.length;
      const indice = placasExistentes + 1;  // Índice simples para adicionar as placas em ordem
  
      const novaPlaca = { placa, marca, ano, cor, userId: user.uid, indice };
  
      if (editandoPlaca) {
        await updateDoc(doc(firestore, 'placas', editandoPlaca.id), novaPlaca);
        setPlacasRegistradas((prev) =>
          prev.map((p) => (p.id === editandoPlaca.id ? { ...p, ...novaPlaca } : p))
        );
        Alert.alert('Sucesso', 'Placa atualizada com sucesso!');
      } else {
        const docRef = await addDoc(collection(firestore, 'placas'), novaPlaca);
        setPlacasRegistradas((prev) => [...prev, { id: docRef.id, ...novaPlaca }]);
        Alert.alert('Sucesso', 'Placa registrada com sucesso!');
      }
      resetForm();
    } catch (error) {
      Alert.alert('Erro', error.message);
    }
  };
  


  const editarPlaca = (placa) => {
    setEditandoPlaca(placa);
    setPlaca(placa.placa);
    setMarca(placa.marca);
    setAno(placa.ano);
    setCor(placa.cor);
    setImage(placa.imageUrl);
  };

  const excluirPlaca = async (placaId) => {
    try {
      await deleteDoc(doc(firestore, 'placas', placaId));
      setPlacasRegistradas((prev) => prev.filter((p) => p.id !== placaId));
      Alert.alert('Sucesso', 'Placa excluída com sucesso!');
    } catch (error) {
      Alert.alert('Erro', error.message);
    }
  };

  const resetForm = () => {
    setPlaca('');
    setMarca('');
    setAno('');
    setCor('');
    setImage(null);
    setEditandoPlaca(null);
  };

  useEffect(() => {
    carregarPlacas();
  }, []);

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
  

      <ScrollView contentContainerStyle={styles.scrollContainer} keyboardShouldPersistTaps="handled">
        <Text style={styles.title}>{editandoPlaca ? 'Editar Placa' : 'Registrar Placas'}</Text>

        <TextInput
          style={styles.input}
          placeholder="Placa (3 letras e 4 números)"
          value={placa}
          onChangeText={(text) => setPlaca(text.toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 7))}
        />

        <TextInput
          style={styles.input}
          placeholder="Marca"
          value={marca}
          onChangeText={setMarca}
        />

        <TextInput
          style={styles.input}
          placeholder="Ano"
          value={ano}
          onChangeText={setAno}
          keyboardType="numeric"
        />

        <TextInput
          style={styles.input}
          placeholder="Cor"
          value={cor}
          onChangeText={setCor}
        />

        <TouchableOpacity style={styles.button} onPress={registrarPlaca}>
          <Text style={styles.buttonText}>{editandoPlaca ? 'Atualizar Placa' : 'Registrar Placa'}</Text>
        </TouchableOpacity>

        <Text style={styles.subTitle}>Placas Registradas:</Text>
        <View style={styles.placaList}>
          {placasRegistradas.length === 0 ? (
            <Text style={styles.noPlacasText}>Nenhuma placa registrada.</Text>
          ) : (
            placasRegistradas.map((placa) => (
              <View key={placa.id} style={styles.placaContainer}>
                <Text style={styles.placaText}>
                  {placa.placa} - {placa.marca} - {placa.ano} - {placa.cor}
                </Text>
                <TouchableOpacity onPress={() => editarPlaca(placa)}>
                  <Text style={styles.editText}>Editar</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => excluirPlaca(placa.id)}>
                  <Text style={styles.deleteText}>Excluir</Text>
                </TouchableOpacity>
              </View>
            )) 
          )}
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F7F7',
    paddingTop: 40,
  },
  scrollContainer: {
    paddingHorizontal: 20,
    paddingBottom: 60,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginBottom: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 12,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  button: {
    backgroundColor: '#000', // Cor preta para o botão
    paddingVertical: 12,
    borderRadius: 5,
    marginBottom: 15,
  },
  buttonText: {
    color: '#fff', // Cor branca para o texto
    fontSize: 18,
    textAlign: 'center',
  },
  photoButton: {
    backgroundColor: '#000', // Cor preta para o botão de foto
    paddingVertical: 12,
    borderRadius: 5,
    marginBottom: 15,
  },
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
    marginBottom: 15,
  },
  subTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  placaList: {
    marginBottom: 20,
  },
  placaContainer: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 5,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 5 },
  },
  placaImage: {
    width: 50,
    height: 50,
    borderRadius: 5,
    marginBottom: 10,
  },
  placaText: {
    fontSize: 16,
    marginBottom: 10,
  },
  editText: {
    color: '#FF9800',
    marginBottom: 10,
  },
  deleteText: {
    color: '#F44336',
  },
  noPlacasText: {
    color: '#888',
    fontStyle: 'italic',
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: -5 },
  },
});
