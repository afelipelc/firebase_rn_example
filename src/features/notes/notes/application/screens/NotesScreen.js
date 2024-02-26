import { useState, useEffect } from 'react'
import { StyleSheet, Text, View } from 'react-native'


// importar función del datasource
import { notesList } from '../../datasource/notesDataSource'

export default function NotesScreen() {
  // state para notas
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    notesList( setNotes ); //mandar a leer las notas
  }, []);

  // mostrar la lista de notas que tenemos
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Notas </Text>
      {notes.map((item) => (
        <Text 
          key={item.id}
        >
          {item.note}
        </Text>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    padding: 12,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'darkblue',
    textAlign: 'center',
    marginVertical: 8,
  }
});