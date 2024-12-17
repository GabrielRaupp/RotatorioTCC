import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

export default function MenuScreen({ navigation }) {
  return (
    <View style={styles.container}>
      {/* Cabeçalho */}
      <View style={styles.header}>
        <TouchableOpacity>
          <FontAwesome name="bars" size={24} color="#000" />
        </TouchableOpacity>
        <View style={styles.logoContainer}>
          <Image
            source={require('../assets/logorotarorio.png')} // Substitua pelo caminho do logotipo
            style={styles.logo}
          />
          <Text style={styles.title}>Menu</Text>
        </View>
        <TouchableOpacity>
          <FontAwesome name="user-circle" size={24} color="#000" />
        </TouchableOpacity>
      </View>

      {/* Botões principais */}
      <View style={styles.grid}>
        <TouchableOpacity style={styles.card}>
          <Image
            source={require('../assets/iconeveiculo.jfif')} // Ícone de veículos
            style={styles.icon}
          />
          <Text style={styles.cardText}>veículos</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.card}>
          <Image
            source={require('../assets/iconecredito.jfif')} // Ícone de crédito
            style={styles.icon}
          />
          <Text style={styles.cardText}>crédito</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.card}>
          <Image
            source={require('../assets/iconeloc.jfif')} // Ícone de localização
            style={styles.icon}
          />
          <Text style={styles.cardText}>localização</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.card}>
          <Image
            source={require('../assets/iconepesquisar.jpg')} // Ícone de pesquisar
            style={styles.icon}
          />
          <Text style={styles.cardText}>pesquisar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.card}>
          <Image
            source={require('../assets/suport.png')} // Ícone de ajuda
            style={styles.icon}
          />
          <Text style={styles.cardText}>ajuda</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.card}>
          <Image
            source={require('../assets/multa.jfif')} // Ícone de infrações
            style={styles.icon}
          />
          <Text style={styles.cardText}>infrações</Text>
        </TouchableOpacity>
      </View>

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
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
    marginRight: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  grid: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    padding: 10,
  },
  card: {
    width: '40%',
    aspectRatio: 1,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
    borderRadius: 10,
    elevation: 3,
  },
  icon: {
    width: 50,
    height: 50,
    marginBottom: 10,
    resizeMode: 'contain',
  },
  cardText: {
    fontSize: 14,
    textAlign: 'center',
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
