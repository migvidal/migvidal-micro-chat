import './App.css';

import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import { initializeApp } from "firebase/app";
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";


// Import the functions you need from the SDKs you need


const firebaseConfig = {
  apiKey: "AIzaSyDjxA1hOfiPMTCdbUZQGtEitQs8KUNIRu4",
  authDomain: "micro-chat-bc474.firebaseapp.com",
  projectId: "micro-chat-bc474",
  storageBucket: "micro-chat-bc474.appspot.com",
  messagingSenderId: "829001232661",
  appId: "1:829001232661:web:17a42f3b500b04c733791c"
};

// Initialize Firebase
initializeApp(firebaseConfig);

const auth = getAuth();

function App() {
  const [user] = useAuthState(auth);
  return (
    <div className="App">
      <header className="App-header">
        {!!user ?
          <strong>{user.displayName}</strong>
          : <button>Log In</button>
        }
      </header>
      <div className="App-main">
      </div>
    </div>
  );
}

export default App;
