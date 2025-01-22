import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { firestore } from '../firebaseConfig';
import { collection, query, where, getDocs, doc, updateDoc, getDoc } from 'firebase/firestore';
import { getAuth, signOut } from "firebase/auth";

export default function Infracao() {
  const [placa, setPlaca] = useState('');
  const [infracao, setInfracao] = useState(null);
  const [creditos, setCreditos] = useState(); // Créditos iniciais para o usuário
  const [userData, setUserData] = useState(null);
    
  
    useEffect(() => {
      const fetchUserData = async () => {
        const auth = getAuth();
        const user = auth.currentUser;
  
        if (user) { 
          try {
            const userDocRef = doc(firestore, "usuarios", user.uid);
            const userDoc = await getDoc(userDocRef);
            if (userDoc.exists()) {
              setUserData(userDoc.data());
              setCreditos(userDoc.data().credito)
            } else {
              Alert.alert("Erro", "Dados do usuário não encontrados.");
            }
          } catch (error) {
            console.log(error)
          }
        } else {
          Alert.alert("Erro", "Usuário não autenticado.");
        }
  
        setLoading(false);
      };
  
      fetchUserData();
    }, []);

  const buscarVeiculo = async () => {
    try {
      const auth = getAuth();
      const user = auth.currentUser;

      // Validar se o usuário está autenticado
      if (!user) {
        Alert.alert('Erro', 'Usuário não autenticado.');
        return;
      }

      // Criar uma consulta para buscar o veículo pela placa e userId
      const placasRef = collection(firestore, 'placas');
      const q = query(placasRef, where('placa', '==', placa), where('userId', '==', user.uid));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        querySnapshot.forEach((doc) => {
          const { infracao } = doc.data();
          setInfracao({ id: doc.id, status: infracao }); // Salvar ID do documento e status da infração
        });
      } else {
        Alert.alert('Erro', 'Veículo não encontrado.');
      }
    } catch (error) {
      Alert.alert('Erro', 'Falha ao buscar o veículo.');
      console.error(error);
    }
  };

  const pagarInfracao = async () => {
    try {
      // Verificar se há uma infração ativa
      if (!infracao || infracao.status === false) {
        Alert.alert('Erro', 'Não há infrações pendentes para este veículo.');
        return;
      }
  
      const auth = getAuth();
      const user = auth.currentUser;
  
      if (!user) {
        Alert.alert('Erro', 'Usuário não autenticado.');
        return;
      }
  
      // Buscar os dados do usuário no Firestore
      const userDocRef = doc(firestore, 'usuarios', user.uid);
      const userDoc = await getDoc(userDocRef);
  
      if (!userDoc.exists()) {
        Alert.alert('Erro', 'Usuário não encontrado.');
        return;
      }
  
      const userData = userDoc.data();
      const userCredits = userData.credito || 0;
  
      if (userCredits < 20) {
        Alert.alert('Erro', 'Créditos insuficientes para pagar a infração.');
        return;
      }
  
      // Atualizar o campo `infracao` para `false` no documento da placa
      const placaDocRef = doc(firestore, 'placas', infracao.id); // Use o ID do documento da placa
      await updateDoc(placaDocRef, { infracao: false, pago: true });
  
      // Atualizar os créditos do usuário no Firestore
      await updateDoc(userDocRef, { credito: userCredits - 20 });
  
      // Atualizar localmente os estados
      setCreditos(userCredits - 20);
      setInfracao({ status: false }); // Atualizar o status localmente
  
      Alert.alert('Sucesso', 'Infrações pagas com sucesso. 20 créditos foram descontados.');
    } catch (error) {
      Alert.alert('Erro', 'Falha ao pagar a infração.');
      console.error(error);
    }
  };
  
  

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Infrações</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite a placa"
        value={placa}
        onChangeText={(text) => setPlaca(text.toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 7))}
      />
      <TouchableOpacity style={styles.button} onPress={buscarVeiculo}>
        <Text style={styles.buttonText}>Buscar Veículo</Text>
      </TouchableOpacity>

      {infracao !== null && (
        <View>
          <Text style={styles.infraction}>
            Infrações: {infracao.status ? 'Sim' : 'Não'}
          </Text>
          {infracao.status && (
            <TouchableOpacity style={styles.button} onPress={pagarInfracao}>
              <Text style={styles.buttonText}>Pagar Infração</Text>
            </TouchableOpacity>
          )}
        </View>
      )}

      <Text style={styles.credits}>Créditos: {creditos}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 20 },
  input: { height: 50, borderWidth: 1, padding: 10, marginBottom: 15 },
  button: { backgroundColor: '#000', padding: 15, alignItems: 'center', borderRadius: 5, marginTop: 10 },
  buttonText: { color: '#fff', fontWeight: 'bold' },
  infraction: { fontSize: 18, color: 'blue', marginTop: 10, textAlign: 'center' },
  credits: { fontSize: 16, color: 'green', marginTop: 20, textAlign: 'center' },
});
