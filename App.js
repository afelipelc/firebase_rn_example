import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import NotesScreen from './src/features/notes/notes/application/screens/NotesScreen';
import AddNote from './src/features/notes/notes/application/screens/AddNoteScreen';
import LoginScreen from './src/features/auth/LoginScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from './SplashScreen';
import SessionProvider, { useSessionState } from './src/features/auth/sessionContext';
import { useEffect } from 'react';

const Stack = createNativeStackNavigator();

function AppView({ navigation }) {
  //initialRouteName='LoginScreen'
  const { 
    user,
    sessionLoaded,
  } = useSessionState();

  useEffect(() => {
    if (sessionLoaded && !user) {
      navigation.navigate('LoginScreen');
    }
  }, [user]);

  return (
    <Stack.Navigator > 
      <Stack.Screen
        name="NotesScreen"
        component={NotesScreen}
        options={{title: 'Notas'}}
      />
      <Stack.Screen
        name="AddNoteScreen"
        component={AddNote}
        options={{title: 'Agregar Nota'}}
      />
      <Stack.Screen
        name="LoginScreen"
        component={LoginScreen}
        options={{title: 'Ingresar'}}
      />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <SessionProvider>
      <NavigationContainer>
        <Stack.Navigator >
          <Stack.Screen
            name="SplashScreen"
            component={SplashScreen}
            options={{title: ''}}
          />
          <Stack.Screen
            name="MainApp"
            component={AppView}
            options={{title: ''}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SessionProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
