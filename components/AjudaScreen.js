import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Linking,
  Image,
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

export default function AjudaScreen({ navigation }) {
  const numeroContato = `+55 48 999796771`;
  const mensagemWhatsApp = `Olá, gostaria de ajuda com o aplicativo.`;

  const abrirWhatsApp = () => {
    const url = `https://wa.me/${numeroContato.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
      mensagemWhatsApp
    )}`;
    Linking.openURL(url).catch(() => {
      alert('Não foi possível abrir o WhatsApp.');
    });
  };

  const enviarEmail = () => {
    const email = 'suporte@app.com';
    const assunto = 'Ajuda com o aplicativo';
    const url = `mailto:${email}?subject=${encodeURIComponent(assunto)}`;
    Linking.openURL(url).catch(() => {
      alert('Não foi possível abrir o aplicativo de e-mail.');
    });
  };

  return (
    <View style={styles.container}>
  
    <View style={styles.content}>
      <Text style={styles.title}>Precisa de Ajuda?</Text>
      <Text style={styles.subtitle}>
        Entre em contato com nossa equipe de suporte pelos canais abaixo:
      </Text>
  
      <View style={styles.contactContainer}>
        <FontAwesome name="phone" size={24} color="#6200EE" />
        <Text style={styles.contactText}>{numeroContato}</Text>
      </View>
  
      <TouchableOpacity style={styles.button} onPress={enviarEmail}>
        <FontAwesome name="envelope" size={20} color="#fff" />
        <Text style={styles.buttonText}>Enviar E-mail</Text>
      </TouchableOpacity>
  
      <TouchableOpacity style={styles.button} onPress={abrirWhatsApp}>
        <FontAwesome name="whatsapp" size={20} color="#fff" />
        <Text style={styles.buttonText}>Entrar em Contato via WhatsApp</Text>
      </TouchableOpacity>
    </View>
  </View>
  
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F9F9',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#F5F5F5',
    paddingVertical: 20,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    width: 35,
    height: 35,
    marginRight: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#000',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
  },
  contactContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 15,
  },
  contactText: {
    fontSize: 18,
    marginLeft: 10,
    fontWeight: 'bold',
    color: '#000',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#000',
    paddingVertical: 12,
    borderRadius: 8,
    marginVertical: 10,
    width: '90%',
    alignSelf: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 30,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    paddingVertical: 15,
  },
});


