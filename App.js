import React from 'react';
import { NavigationContainer } from '@react-navigation/native'; // Para navegação entre telas
import { createStackNavigator } from '@react-navigation/stack'; // Para o stack de navegação
import { Provider as PaperProvider } from 'react-native-paper'; // Para usar os botões de rádio do Paper

// Importando as telas
import HomeScreen from './components/HomeScreen'; // Tela inicial
import AdminScreen from './components/LoginAdminScreen'; // Tela do administrador
import LoginScreen from './components/LoginScreen'; // Tela de login
import CadastroScreen from './components/CadastroScreen'; // Tela de cadastro
import EsqueceuSenhaScreen from './components/EsqueceuSenhaScreen'; // Tela de recuperação de senha
import RadioButtonExample from './components/RadioButtonExample'; // Tela de exemplo com botões de rádio
import MenuScreen from './components/MenuScreen'; // Tela de menu (adicionada)

// Criando a pilha de navegação
const Stack = createStackNavigator();

export default function App() {
  return (
    <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="HomeScreen"
          screenOptions={{
            headerStyle: {
              backgroundColor: '#6200EE', // Cor de fundo do cabeçalho
            },
            headerTintColor: '#fff', // Cor do texto do cabeçalho
            headerTitleStyle: {
              fontWeight: 'bold', // Negrito no título
            },
          }}
        >
          {/* Tela Inicial */}
          <Stack.Screen
            name="HomeScreen"
            component={HomeScreen}
            options={{ title: 'Home' }}
          />

          {/* Tela Admin */}
          <Stack.Screen
            name="AdminScreen"
            component={AdminScreen}
            options={{ title: 'Administrador' }}
          />

          {/* Tela Login */}
          <Stack.Screen
            name="LoginScreen"
            component={LoginScreen}
            options={{ title: 'Login' }}
          />

          {/* Tela Cadastro */}
          <Stack.Screen
            name="CadastroScreen"
            component={CadastroScreen}
            options={{ title: 'Cadastro' }}
          />

          {/* Tela Esqueceu Senha */}
          <Stack.Screen
            name="EsqueceuSenhaScreen"
            component={EsqueceuSenhaScreen}
            options={{ title: 'Esqueceu Senha' }}
          />

          {/* Exemplo com Botões de Rádio */}
          <Stack.Screen
            name="RadioButtonExample"
            component={RadioButtonExample}
            options={{ title: 'Exemplo de Botões' }}
          />

          {/* Tela de Menu */}
          <Stack.Screen
            name="MenuScreen"
            component={MenuScreen}
            options={{ title: 'Menu' }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}
