// archivo de fuente de datos
// para notas
// - gestionar notas

// leer lista de notas
// agregar nota
// guardar nota

import { getDatabase, ref, onValue } from "firebase/database";

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