import React, { useRef, useState } from 'react';
import './App.css';

import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';
import 'firebase/compat/analytics';

import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';


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
firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();

function App() {
  const [user] = useAuthState(auth);

  return (
    <div className="App">
      <header className="App-header">
        {user &&
          <strong>{user.displayName}</strong>
        }
      </header>
      <div className="App-main">
        {!!user ?
          <ChatRoom></ChatRoom>
          : <SignIn></SignIn>
        }
      </div>
    </div>
  );
}

function SignIn() {
  const authWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
  }

  return (
    <button onClick={authWithGoogle}>Log In</button>
  );
}
function ChatRoom() {
  const [formValue, setFormValue] = useState('');
  return (
    <>
      <main>
        Here's where the chats should be
      </main>

      <form >
        <input type="text" value={formValue} onChange={e => setFormValue(e.target.value)} placeholder='Type your message' />
      </form>
    </>
  );
}

export default App;
