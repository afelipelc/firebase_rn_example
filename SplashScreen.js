import { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { Text } from "react-native-elements";
import { useSessionState } from "./src/features/auth/sessionContext";

export default function SplashScreen({ navigation }) {

  const {
    loadSession,
  } = useSessionState();

  // al cargar la pantalla, 
  // verificar la sesión
  useEffect(() => {
    
    //checkSession();
    loadSession();
    // después de 3 segs, redireccionar 
    // a la pantalla principal
    setTimeout(() => {
      navigation.navigate('MainApp');
    }, 3000);
  }, []);


  return (
    <View style={styles.container}>
      <Text>Splash</Text>
    </View>
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