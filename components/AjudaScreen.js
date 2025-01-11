import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Linking,
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

export default function AjudaScreen() {
  // Gerar um número aleatório para contato
  const numeroContato = `+55 48 999796771`;

  // Mensagem para WhatsApp
  const mensagemWhatsApp = `Olá, gostaria de ajuda com o aplicativo.`;

  const abrirWhatsApp = () => {
    const url = `https://wa.me/${numeroContato.replace(/[^\d]/g, '')}?text=${encodeURIComponent(
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
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F9F9F9',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#6200EE',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
    marginBottom: 20,
  },
  contactContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  contactText: {
    fontSize: 18,
    marginLeft: 10,
    color: '#333',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#6200EE',
    padding: 15,
    borderRadius: 5,
    marginBottom: 15,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    marginLeft: 10,
  },
});
