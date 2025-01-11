import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { firestore } from '../firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';

export default function Infracao() {
  const [placa, setPlaca] = useState('');
  const [tempoRestante, setTempoRestante] = useState(null);

  const buscarVeiculo = async () => {
    try {
      const veiculoRef = doc(firestore, 'veiculos', placa);
      const veiculoSnap = await getDoc(veiculoRef);

      if (veiculoSnap.exists()) {
        const { expiracao } = veiculoSnap.data();
        const tempo = Math.max(0, Math.floor((expiracao - Date.now()) / 1000)); // Tempo restante em segundos
        setTempoRestante(tempo);
      } else {
        Alert.alert('Erro', 'Veículo não encontrado.');
      }
    } catch (error) {
      Alert.alert('Erro', 'Falha ao buscar o veículo.');
      console.error(error);
    }
  };

  useEffect(() => {
    if (tempoRestante === 0) {
      Alert.alert('Tempo Esgotado', 'Seu tempo acabou. Cobrança será feita.');
    } else if (tempoRestante > 0) {
      const timer = setTimeout(() => setTempoRestante(tempoRestante - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [tempoRestante]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Infrações</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite a placa"
        value={placa}
        onChangeText={setPlaca}
      />
      <TouchableOpacity style={styles.button} onPress={buscarVeiculo}>
        <Text style={styles.buttonText}>Buscar Veículo</Text>
      </TouchableOpacity>
      {tempoRestante !== null && (
        <Text style={styles.timer}>Tempo Restante: {Math.floor(tempoRestante / 60)}:{tempoRestante % 60}</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 20 },
  input: { height: 50, borderWidth: 1, padding: 10, marginBottom: 15 },
  button: { backgroundColor: '#000', padding: 15, alignItems: 'center', borderRadius: 5 },
  buttonText: { color: '#fff', fontWeight: 'bold' },
  timer: { fontSize: 20, color: 'red', marginTop: 20, textAlign: 'center' },
});
