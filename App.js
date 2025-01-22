import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, TouchableWithoutFeedback } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FontAwesome6 } from '@expo/vector-icons';

// Importação das telasas
import HomeScreen from './components/HomeScreen';
import LoginScreen from './components/LoginScreen';
import LoginAdminScreen from './components/LoginAdminScreen';
import CadastroScreen from './components/CadastroScreen';
import MenuScreen from './components/MenuScreen';
import Veiculos from './components/Veiculos';
import Config from './components/Config';
import Allveiculos from './components/Allveiculos';
import CreditoScreen from './components/CreditoScreen';
import LocalizacaoScreen from './components/LocalizacaoScreen';
import AjudaScreen from './components/AjudaScreen';
import Infracao from './components/Infracao';
import EsqueceuSenhaScreen from './components/EsqueceuSenhaScreen';
import ComprarVagaScreen from './components/ComprarScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const AdditionalStack = ({ navigation }) => (
  <Stack.Navigator screenOptions={{ 
    headerShown: true,
  }}>
    <Stack.Screen 
      name="MenuScreen" 
      component={MenuScreen} 
      options={{ title: 'Menu',
        headerTitle: () => {
          return (
            <View style={styles.headerContainer}>
              <View style={styles.headerTitle}>
                <Image source={require("./assets/logorotarorio.png")} style={styles.logo} />
                <Text style={styles.headerText}>Menu</Text>
              </View>
              <TouchableWithoutFeedback onPress={() => navigation.navigate("Perfil")}>
                <FontAwesome6 name="user-circle" color="#111" size={30} />
              </TouchableWithoutFeedback>
            </View>
          );
        }
       }} 
    />
    <Stack.Screen 
      name="Infracoes" 
      component={Infracao} 
      options={{ title: 'Menu',
        headerTitle: () => {
          return (
            <View style={styles.headerContainer}>
              <View style={styles.headerTitle}>
                <Image source={require("./assets/logorotarorio.png")} style={styles.logo} />
                <Text style={styles.headerText}>Infrações</Text>
              </View>
              <TouchableWithoutFeedback onPress={() => navigation.navigate("Perfil")}>
                <FontAwesome6 name="user-circle" color="#111" size={30} />
              </TouchableWithoutFeedback>
            </View>
          );
        }
       }} 
    />
    <Stack.Screen 
      name="Comprar" 
      component={ComprarVagaScreen} 
      options={{ title: 'Comprar Vaga',
        headerTitle: () => {
          return (
            <View style={styles.headerContainer}>
              <View style={styles.headerTitle}>
                <Image source={require("./assets/logorotarorio.png")} style={styles.logo} />
                <Text style={styles.headerText}>Comprar Vaga</Text>
              </View>
              <TouchableWithoutFeedback onPress={() => navigation.navigate("ComprarVagaScreen")}>
                <FontAwesome6 name="user-circle" color="#111" size={30} />
              </TouchableWithoutFeedback>
            </View>
          );
        }
       }} 
    />
    <Stack.Screen 
      name="Veiculos" 
      component={Veiculos} 
      options={{ title: 'Veículos',
        headerTitle: () => {
          return (
            <View style={styles.headerContainer}>
              <View style={styles.headerTitle}>
                <Image source={require("./assets/logorotarorio.png")} style={styles.logo} />
                <Text style={styles.headerText}>Veiculos</Text>
              </View>
              <TouchableWithoutFeedback onPress={() => navigation.navigate("Perfil")}>
                <FontAwesome6 name="user-circle" color="#111" size={30} />
              </TouchableWithoutFeedback>
            </View>
          );
        }
       }} 
    />
    <Stack.Screen 
      name="Credito" 
      component={CreditoScreen} 
      options={{ title: 'Crédito',
        headerTitle: () => {
          return (
            <View style={styles.headerContainer}>
              <View style={styles.headerTitle}>
                <Image source={require("./assets/logorotarorio.png")} style={styles.logo} />
                <Text style={styles.headerText}>Crédito</Text>
              </View>
              <TouchableWithoutFeedback onPress={() => navigation.navigate("Perfil")}>
                <FontAwesome6 name="user-circle" color="#111" size={30} />
              </TouchableWithoutFeedback>
            </View>
          );
        }
       }} 
    />
    <Stack.Screen 
      name="Localizacao" 
      component={LocalizacaoScreen} 
      options={{ title: 'Localização',
        headerTitle: () => {
          return (
            <View style={styles.headerContainer}>
              <View style={styles.headerTitle}>
                <Image source={require("./assets/logorotarorio.png")} style={styles.logo} />
                <Text style={styles.headerText}>Localização</Text>
              </View>
              <TouchableWithoutFeedback onPress={() => navigation.navigate("Perfil")}>
                <FontAwesome6 name="user-circle" color="#111" size={30} />
              </TouchableWithoutFeedback>
            </View>
          );
        }
       }} 
    />
    <Stack.Screen 
      name="Ajuda" 
      component={AjudaScreen} 
      options={{ title: 'Ajuda',
        headerTitle: () => {
          return (
            <View style={styles.headerContainer}>
              <View style={styles.headerTitle}>
                <Image source={require("./assets/logorotarorio.png")} style={styles.logo} />
                <Text style={styles.headerText}>Ajuda</Text>
              </View>
              <TouchableWithoutFeedback onPress={() => navigation.navigate("Perfil")}>
                <FontAwesome6 name="user-circle" color="#111" size={30} />
              </TouchableWithoutFeedback>
            </View>
          );
        }
       }} 
    />
  </Stack.Navigator>
);

const MainTabs = ({ onLogout, getAdmin }) => (
  <Tab.Navigator
    screenOptions={({ route, navigation }) => ({
      tabBarShowLabel: true,
      tabBarLabelStyle: { fontSize: 12 },
      tabBarStyle: {
        backgroundColor: '#fff',
        height: 80,
        paddingBottom: 10,
        paddingTop: 10,
        elevation: 8,
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
      }, 
      tabBarActiveTintColor: '#010101',
      tabBarInactiveTintColor: '#414141',
      headerShown: false,
      tabBarIcon: ({ color }) => {
        const icons = { 
          Menu: 'house',
          Credito: 'money-bill',
          Perfil: 'user-circle',
          Veiculos: 'car',
          Sair: 'arrow-right-from-bracket'
        };
        return <FontAwesome6 name={icons[route.name]} size={28} color={color} />;
      },
    })}
  >
    {getAdmin ? (
      <>
      <Tab.Screen name="Veiculos" component={Allveiculos} />
      <Tab.Screen name="Sair">
        {() => onLogout()}
      </Tab.Screen>
      </>
    ) : (
      <>
        <Tab.Screen name="Menu" component={AdditionalStack}  />
        <Tab.Screen name="Credito" component={CreditoScreen} options={{
          headerShown: true,
          headerTitle: () => {
            return (
              <View style={styles.headerContainer}>
                <View style={styles.headerTitle}>
                  <Image source={require("./assets/logorotarorio.png")} style={styles.logo} />
                  <Text style={styles.headerText}>Crédito</Text>
                </View>
                <TouchableWithoutFeedback onPress={() => navigation.navigate("Perfil")}>
                  <FontAwesome6 name="user-circle" color="#111" size={30} />
                </TouchableWithoutFeedback>
              </View>
            );
          }
         }}  
         />
        <Tab.Screen name="Perfil" options={{
          headerShown: true,
          headerTitle: () => {
            return (
              <View style={styles.headerContainer}>
                <View style={styles.headerTitle}>
                  <Image source={require("./assets/logorotarorio.png")} style={styles.logo} />
                  <Text style={styles.headerText}>Perfil</Text>
                </View>
                <TouchableWithoutFeedback onPress={() => navigation.navigate("Perfil")}>
                  <FontAwesome6 name="user-circle" color="#111" size={30} />
                </TouchableWithoutFeedback>
              </View>
            );
          }
         }} 
          >
          {() => <Config onLogout={onLogout} />}
        </Tab.Screen>
      </>
    )}
  </Tab.Navigator>
);

export default function App() {
  const [isLoggedInUser, setIsLoggedInUser] = useState(false);
  const [isLoggedInAdmin, setIsLoggedInAdmin] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const userData = await AsyncStorage.getItem('@user_data');
        const adminData = await AsyncStorage.getItem('@admin_data');
        setIsLoggedInUser(!!userData);
        setIsLoggedInAdmin(!!adminData);
      } catch (error) {
        console.error('Erro ao verificar autenticação:', error);
      } 
    };
    checkAuth();
  }, []);

  const handleLogout = async () => {
    try {
      await AsyncStorage.multiRemove(['@user_data', '@admin_data']);
      setIsLoggedInUser(false);
      setIsLoggedInAdmin(false);
    } catch (error) {
      console.error('Erro ao deslogar:', error);
    }
  };

  if (isLoggedInUser === null && isLoggedInAdmin === null) {
    return (
      <View style={styles.container}>
        <Text>Verificando autenticação...</Text>
      </View>
    );
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>
        {(isLoggedInUser || isLoggedInAdmin) ? (
          <MainTabs onLogout={handleLogout} getAdmin={isLoggedInAdmin} />
        ) : (
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="HomeScreen" component={HomeScreen} />
            <Stack.Screen name="LoginScreen">
              {(props) => <LoginScreen {...props} onLoginUser={() => setIsLoggedInUser(true)} />}
            </Stack.Screen>
            <Stack.Screen name="LoginAdminScreen">
              {(props) => <LoginAdminScreen {...props} onLoginAdmin={() => setIsLoggedInAdmin(true)} />}
            </Stack.Screen>
            <Stack.Screen name="CadastroScreen" component={CadastroScreen} />
            <Stack.Screen name="EsqueceuSenhaScreen" component={EsqueceuSenhaScreen} />
          </Stack.Navigator>
        )}
      </NavigationContainer>

      <StatusBar style="black" backgroundColor="#FFF" />
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    flexDirection: "row",
    gap: 2,
    alignItems: "center",
  },
  logo: {
    width: 40,
    height: 40,
    resizeMode: "contain",
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
  },
  headerText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#111",
  }, 
});
