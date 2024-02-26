import { useState } from "react";
import { Alert, Button, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { supabase } from "../../../../lib/supabase";

/***
 * Pantalla para agregar una nueva nota
 */
export default function AddNote() {
  const [note, setNote] = useState('');

  /**
   * función que guarda la nota en supabase
   */
  const saveNote = async () => {

    // si no hay valor en note, no continuar
    if(!note) {
      return;
    }

    //guarda la nota
    const { data, error } = await supabase
    .from('notes')
    .insert([
      { 
        note: note,
        date: new Date(),
      },
    ])
    .select();

    console.log(data);

    if (error) Alert.alert(error.message)
    
    // si no hay error, la nota se guardó
    // limpiar el formulario
    if (!error) {
      setNote('');
      Alert.alert('La nota ha sido guardada :)');
    }
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
          onPress={saveNote}
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