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
import { collection, addDoc, getDocs, query, orderBy, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'; 
import * as ImagePicker from 'expo-image-picker';

export default function RegistroPlacasScreen() {
  const [placa, setPlaca] = useState('');
  const [marca, setMarca] = useState('');
  const [ano, setAno] = useState('');
  const [cor, setCor] = useState('');
  const [image, setImage] = useState(null);
  const [placasRegistradas, setPlacasRegistradas] = useState([]);
  const [editandoPlaca, setEditandoPlaca] = useState(null); 

  const validarPlaca = (placa) => {
    const regexPlaca = /^[A-Z]{3}[0-9]{4}$/;
    return regexPlaca.test(placa);
  };

  const carregarPlacas = async () => {
    try {
      const q = query(collection(firestore, 'placas'), orderBy('placa', 'asc'));
      const querySnapshot = await getDocs(q);
      const placas = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setPlacasRegistradas(placas);
    } catch (error) {
      console.error('Erro ao carregar placas:', error.message);
    }
  };

  const salvarImagemNoStorage = async (uri) => {
    try {
      const response = await fetch(uri);
      const blob = await response.blob();
      const storageRef = ref(storage, `placas/${new Date().getTime()}.jpg`);
      await uploadBytes(storageRef, blob);
      const url = await getDownloadURL(storageRef);
      return url;
    } catch (error) {
      console.error('Erro ao salvar imagem no Storage:', error.message);
      throw error;
    }
  };

  const registrarPlaca = async () => {
    if (!validarPlaca(placa)) {
      Alert.alert('Erro', 'A placa deve estar no formato correto (3 letras e 4 números).');
      return;
    }

    try {
      let imageUrl = null;
      if (image) {
        imageUrl = await salvarImagemNoStorage(image);
      }

      const novaPlaca = { placa, marca, ano, cor, imageUrl };

      if (editandoPlaca) {
        await updateDoc(doc(firestore, 'placas', editandoPlaca.id), novaPlaca);
        Alert.alert('Sucesso', 'Placa atualizada com sucesso!');
      } else {
        await addDoc(collection(firestore, 'placas'), novaPlaca);
        Alert.alert('Sucesso', 'Placa registrada com sucesso!');
      }

      setPlacasRegistradas((prev) =>
        editandoPlaca
          ? prev.map((placa) =>
              placa.id === editandoPlaca.id ? { ...placa, ...novaPlaca } : placa
            )
          : [...prev, novaPlaca]
      );
      resetForm();
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível registrar a placa.');
      console.error('Erro ao registrar placa:', error.message);
    }
  };

  const tirarFoto = async () => {
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaType.IMAGE,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.uri);
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
      setPlacasRegistradas((prev) => prev.filter((placa) => placa.id !== placaId));
      Alert.alert('Sucesso', 'Placa excluída com sucesso!');
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível excluir a placa.');
      console.error('Erro ao excluir placa:', error.message);
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
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled"
      >
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

        <TouchableOpacity style={styles.photoButton} onPress={tirarFoto}>
          <Text style={styles.buttonText}>Adicionar Foto</Text>
        </TouchableOpacity>

        {image && <Image source={{ uri: image }} style={styles.image} />}

        <Text style={styles.subTitle}>Placas Registradas:</Text>
        <View style={styles.placaList}>
          {placasRegistradas.length === 0 ? (
            <Text style={styles.noPlacasText}>Nenhuma placa registrada.</Text>
          ) : (
            placasRegistradas.map((placa) => (
              <View key={placa.id} style={styles.placaContainer}>
                <Image source={{ uri: placa.imageUrl }} style={styles.placaImage} />
                <Text style={styles.placaText}>
                  {placa.placa} - {placa.marca} - {placa.ano} - {placa.cor}
                </Text>
                <TouchableOpacity onPress={() => editarPlaca(placa)} style={styles.editButton}>
                  <Text style={styles.buttonText}>Editar</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => excluirPlaca(placa.id)} style={styles.deleteButton}>
                  <Text style={styles.buttonText}>Excluir</Text>
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
    backgroundColor: '#F5F5F5',
  },
  scrollContainer: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#333',
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
    marginVertical: 10,
  },
  photoButton: {
    height: 50,
    backgroundColor: '#000',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  image: {
    width: '100%',
    height: 200,
    marginVertical: 15,
    borderRadius: 8,
    resizeMode: 'cover',
  },
  subTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
    color: '#333',
  },
  noPlacasText: {
    fontSize: 16,
    fontStyle: 'italic',
    color: '#888',
  },
  placaList: {
    paddingHorizontal: 10,
  },
  placaContainer: {
    marginBottom: 20,
  },
  placaImage: {
    width: '100%',
    height: 150,
    borderRadius: 8,
    marginBottom: 10,
  },
  placaText: {
    fontSize: 16,
    backgroundColor: '#FFF',
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#DDD',
  },
  editButton: {
    height: 40,
    backgroundColor: '#008CBA',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 5,
  },
  deleteButton: {
    height: 40,
    backgroundColor: '#f44336',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 5,
  },
});
