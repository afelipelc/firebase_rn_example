import React from 'react';
import firebaseDb from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth';

const SessionContext = React.createContext();

// actions
const USER_LOGUED = 'session/USER_LOGUED';

// initial state
const initialState = {
  user: null,
};

// reducer
function sessionReducer(state, action) {
  switch (action.type) {
    case USER_LOGUED:
      return { ...state, user: action.payload };
    default:
      throw new Error(`Acción desconocida: ${action.type}`);
  }
}

// provider and context definition
function SessionProvider({ children }) {
  const [state, dispatch] = React.useReducer(sessionReducer, initialState);
  
  //investigar: AsyncStorage

  // actions
  async function loginEmailPassword(email, password) {
    console.log("LOGIN");
    const auth = getAuth(firebaseDb);
    return signInWithEmailAndPassword( auth, email, password)
    .then((userCredential) => {
      console.log(userCredential);
      dispatch({ type: USER_LOGUED, payload: userCredential.user });

      return {
        signedIn: true,
        session: userCredential.user,
        message: 'Sesión iniciada.'
      }
    })
    .catch((error) => {
      console.log(error);
      dispatch({ type: USER_LOGUED, payload: null });
      return {
        signedIn: false,
        session: null,
        message: `Error al iniciar sesión: ${error.message}`,
        errorCode: error.code
      }
    });
  }
  
  async function loadSession() {
    const auth = getAuth(firebaseDb);

    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log(user);
        // set session data
        dispatch({ type: USER_LOGUED, payload: user });
      } else {
        // clear session
        dispatch({ type: USER_LOGUED, payload: null });
      }
    });
  }
  
  function logOut() {
    dispatch({ type: USER_LOGUED, payload: null });

    // cerrar sesión ante firebase
  }

  return (
    <SessionContext.Provider value={{
      ...state,

      loginEmailPassword,
      loadSession,
      logOut,
    }}>
      {children}
    </SessionContext.Provider>
  );
}

function useSessionState() { // hook
  const context = React.useContext(SessionContext);
  if (context === undefined) {
    throw new Error('useSessionState must be used within a SessionProvider');
  }

  return context;
}

export { useSessionState };

export default SessionProvider;
