import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import NotesScreen from './src/features/notes/notes/application/screens/NotesScreen';
import AddNote from './src/features/notes/notes/application/screens/AddNoteScreen';

export default function App() {
  /*
  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
  );
  */
 return <AddNote />
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
