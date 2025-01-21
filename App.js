import React from 'react';
import { NavigationContainer } from '@react-navigation/native'; 
import { createStackNavigator } from '@react-navigation/stack'; 
import { Provider as PaperProvider } from 'react-native-paper';

import HomeScreen from './components/HomeScreen';
import AdminScreen from './components/LoginAdminScreen'; 
import LoginScreen from './components/LoginScreen'; 
import CadastroScreen from './components/CadastroScreen'; 
import EsqueceuSenhaScreen from './components/EsqueceuSenhaScreen'; 
import RadioButtonExample from './components/RadioButtonExample'; 
import MenuScreen from './components/MenuScreen';
import Veiculos from './components/Veiculos';
import PerfilScreen from './components/PerfilScreen';
import Localizacao from './components/LocalizacaoScreen';
import Ajuda from './components/AjudaScreen';
import Credito from './components/CreditoScreen';
import Buy from './components/BuyCredito';
import Allveiculos from './components/Allveiculos';
import Infracao from './components/Infracao';

const Stack = createStackNavigator();

export default function App() {
  return (
    <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="HomeScreen">
          <Stack.Screen
            name="HomeScreen"
            component={HomeScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="AdminScreen"
            component={AdminScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="LoginScreen"
            component={LoginScreen}
            options={{ headerShown: false }}
          />
   

          {/* Tela Cadastro */}
          <Stack.Screen
            name="CadastroScreen"
            component={CadastroScreen}
            options={{ headerShown: false }}
          />

          {/* Tela Esqueceu Senha */}
          <Stack.Screen
            name="EsqueceuSenhaScreen"
            component={EsqueceuSenhaScreen}
            options={{ headerShown: false }}
          />

          {/* Exemplo com Botões de Rádio */}
          <Stack.Screen
            name="RadioButtonExample"
            component={RadioButtonExample}
            options={{ headerShown: false }}
          />

          {/* Tela de Menu */}
          <Stack.Screen
            name="MenuScreen"
            component={MenuScreen}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="Veiculos"
            component={Veiculos}
            options={{ headerShown: false }}
          />

          <Stack.Screen 
            name="PerfilScreen" 
            component={PerfilScreen} 
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="Localizacao"
            component={Localizacao}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="Ajuda"
            component={Ajuda}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="Credito"
            component={Credito}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="Buy"
            component={Buy}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="Allveiculos"
            component={Allveiculos}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="Infracao"
            component={Infracao}
            options={{ headerShown: false }}
          />
       </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}
