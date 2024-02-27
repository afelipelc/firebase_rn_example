// archivo de fuente de datos
// para notas
// - gestionar notas

// leer lista de notas
// agregar nota
// guardar nota

import { getDatabase, ref, onValue, set, push } from "firebase/database";

import firebaseDb from '../../../../config/firebaseDb';

/**
 * Función para leer la lista de notas
 */
export function notesList( setData ) {

  //firebaseDb es la instancia de app,
  // que inicializamos en nuestro archivo de
  // configuración de firebase

  const db = getDatabase( firebaseDb );
  const notesRef = ref(db, "notes/");
  
  onValue(notesRef, (snapshot) => {
    const data = snapshot.val();
    console.log(data);
    
    let notes = []; //para acumular las notas 
    snapshot.forEach(item => {

      // insertar en nuestro arreglo
      // los datos de cada nota
      notes.push({
        id: item.key,
        ...item.val()
      });

      /*
      // cada objeto note, debe tener esta estructura
      {
        id: 'asdasd',
        note: 'esta es una nota',
        date: 'debe ser date'
      }
      */

    }); // fin forEach

    // ya tenemos los datos
    console.log(notes);
    // pasar los datos a la función setData
    setData(notes);
  });
}

/**
 * Función que lee las notas de firebase
 * y retorna los datos a la función de callback
 * @param {*} setData Función callback
 */
export function notesListMin( setData ) {
  const db = getDatabase( firebaseDb );
  const notesRef = ref(db, "notes/");
  
  onValue(notesRef, (snapshot) => {
    let notes = []; //para acumular las notas 
    snapshot.forEach(item => {
      notes.push({
        id: item.key,
        ...item.val()
      });
    }); // fin forEach

    setData(notes);
  });
}

/**
 * Función que actualiza una nota
 * @param {*} note 
 * @returns 
 */
export function updateNote(note) {
  const db = getDatabase( firebaseDb );
  const noteRef = ref(db, `notes/${note.id}`);

  // quitar el id de note
  set(noteRef, {
    note: note.note,
    date: note.date,
  })
  .then(() => {
    return {
      success: true,
      message: 'El registro fue actualizado.',
    }
  })
  .catch(() => {
    return {
      success: false,
      message: `Algo salió mal, no se pudo actualizar :( Error: ${error.message}`
    }
  });

}

export function createNote(note) {
  const db = getDatabase( firebaseDb );
  const noteRef = ref(db, `notes`);

  // quitar el id de note
  return push(noteRef, note )
  .then(() => {
    return {
      success: true,
      message: 'Se ha guardado la nota.',
    }
  })
  .catch(() => {
    return {
      success: false,
      message: `Algo salió mal, no se pudo guardar :( Error: ${error.message}`
    }
  });

}