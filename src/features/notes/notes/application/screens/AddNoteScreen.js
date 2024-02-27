import { useState } from "react";
import { Alert, Button, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { createNote, saveNote } from "../../datasource/notesDataSource";

/***
 * Pantalla para agregar una nueva nota
 */
export default function AddNote() {
  const [note, setNote] = useState('');

  /**
   * función que guarda la nota en supabase
   */
  const onSaveNote = async () => {

    // si no hay valor en note, no continuar
    if(!note) {
      return;
    }

    //guarda la nota
    const result = await createNote({
      note,
      date: (new Date()).getTime(), 
    });

    if (result.success) {
      setNote('');
    }
    Alert.alert(result.message);
  }

  return(
    <View style={styles.container}>
      <Text style={styles.title}>Registrar Nota</Text>

      <View style={styles.form}>
        <TextInput
          style={styles.note}
          placeholder="Ingresar la nueva nota"
          numberOfLines={4}
          value={note}
          onChangeText={setNote}
        />

        <Button
          title="Registrar Nota"
          disabled={!note} // si no hay nota, deshabilitar
          onPress={onSaveNote}
        />
      </View>
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
  },
  form: {
    marginVertical: 6,
    display: 'flex',
    gap: 8,
  },
  note: {
    borderWidth: 1,
    borderColor: '#bbb',
    fontSize: 20,
    minHeight: 120,
    padding: 6,
    borderRadius: 14,
  },
  button: {
    fontWeight: 'bold',
    fontSize: 22,
    borderWidth: 1,
    borderColor: 'blue',
  }
});