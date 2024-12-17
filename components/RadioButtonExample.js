import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { RadioButton } from 'react-native-paper';

export default function RadioButtonExample() {
  const [value, setValue] = React.useState('first');

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Escolha uma opção:</Text>
      <RadioButton.Group onValueChange={newValue => setValue(newValue)} value={value}>
        <RadioButton.Item label="Primeira Opção" value="first" />
        <RadioButton.Item label="Segunda Opção" value="second" />
      </RadioButton.Group>
      <Text style={styles.selected}>Selecionado: {value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#F7F7F7',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  selected: {
    fontSize: 16,
    color: 'gray',
    textAlign: 'center',
    marginTop: 20,
  },
});
