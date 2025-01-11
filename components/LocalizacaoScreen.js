import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

export default function MenuScreen({ navigation }) {
  const menuItems = [
    { label: 'Veículos', icon: require('../assets/iconeveiculo.png'), route: 'Veiculos' },
    { label: 'Crédito', icon: require('../assets/iconecredito.png'), route: 'Credito' },
    { label: 'Localização', icon: require('../assets/iconeloc.png'), route: 'Localizacao' },
    { label: 'Pesquisar', icon: require('../assets/iconepesquisar.jpg'), route: 'Ajuda' },
    { label: 'Ajuda', icon: require('../assets/suport.png'), route: 'Ajuda' },
    { label: 'Infrações', icon: require('../assets/multa.png'), route: 'Infracao' },
  ];

  const footerItems = [
    { icon: 'home', route: 'HomeScreen' },
    { icon: 'dollar', route: 'CréditoScreen' },
    { icon: 'cog', route: 'ConfigScreen' },
  ];

  return (
    <View style={styles.container}>
      {/* Cabeçalho */}
      <View style={styles.header}>
        <TouchableOpacity>
          <FontAwesome name="bars" size={30} color="#000" />
        </TouchableOpacity>
        <View style={styles.logoContainer}>
          <Image
            source={require('../assets/logorotarorio.png')}
            style={styles.logo}
          />
          <Text style={styles.title}>Menu</Text>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('PerfilScreen')}>
          <FontAwesome name="user-circle" size={30} color="#000" />
        </TouchableOpacity>
      </View>

      {/* Conteúdo rolável */}
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {menuItems.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.card}
            onPress={() => navigation.navigate(item.route)}
          >
            <Image source={item.icon} style={styles.icon} />
            <Text style={styles.cardText}>{item.label}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Barra de navegação inferior */}
      <View style={styles.footer}>
        {footerItems.map((item, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => navigation.navigate(item.route)}
            style={styles.footerIcon}
          >
            <FontAwesome name={item.icon} size={30} color="#000" />
          </TouchableOpacity>
        ))}
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
    paddingVertical: 15,
    backgroundColor: '#F7F7F7',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
    marginRight: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
  },
  scrollContent: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    padding: 15,
  },
  card: {
    width: '45%',
    marginVertical: 15,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
    elevation: 5,
    paddingVertical: 20,
  },
  icon: {
    width: 70,
    height: 70,
    marginBottom: 10,
    resizeMode: 'contain',
  },
  cardText: {
    fontSize: 16,
    textAlign: 'center',
    color: '#333',
    fontWeight: '600',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 15,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderColor: '#CCC',
  },
  footerIcon: {
    padding: 10,
  },
});
