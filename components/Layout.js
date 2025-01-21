import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons'; // ou outro pacote de ícones que você preferir

const Layout = ({ children, navigation, screenName }) => {
  return (
    <View style={{ flex: 1 }}>
      {/* Cabeçalho */}
      <View style={styles.header}>
        <TouchableOpacity>
          <FontAwesome name="bars" size={24} color="#000" />
        </TouchableOpacity>
        <View style={styles.logoContainer}>
          <Image
            source={require('../assets/logorotarorio.png')}
            style={styles.logo}
          />
          <Text style={styles.title}>{screenName}</Text>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('PerfilScreen')}>
          <FontAwesome name="user-circle" size={24} color="#000" />
        </TouchableOpacity>
      </View>

      {/* Conteúdo da tela */}
      <View style={{ flex: 1 }}>
        {children}
      </View>

      {/* Rodapé */}
      <View style={styles.footer}>
        <TouchableOpacity onPress={() => navigation.navigate('HomeScreen')}>
          <FontAwesome name="home" size={24} color="#000" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Credito')}>
          <FontAwesome name="dollar" size={24} color="#000" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Ajuda')}>
          <FontAwesome name="cog" size={24} color="#000" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#fff',
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    width: 30,
    height: 30,
    marginRight: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
    backgroundColor: '#fff',
  },
});

export default Layout;
