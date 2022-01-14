import React, { useRef, useState } from 'react';
import './App.css';

import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';
import 'firebase/compat/analytics';

import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollection, useCollectionData } from 'react-firebase-hooks/firestore';


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
const firestore = firebase.firestore();

function App() {
  const [user, loading, error] = useAuthState(auth);
  const x = null;

  return (
    <div className="App">
      <header className="App-header">
        {user !== null &&
          <strong>{user.displayname}</strong>
        }
      </header>
      <div className="App-main">
        {user !== null ?
          <ChatRoom />
          : <SignIn />
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
    <CustomButton onClick={authWithGoogle}>Sign In with Google</CustomButton>
  );
}
function ChatRoom() {
  const messagesRef = firestore.collection('messages');
  const query = messagesRef.orderBy('createdAt').limit(25);
  const [messages] = useCollectionData(query, { idField: 'id' }) ;
  const [formValue, setFormValue] = useState('');

  /* style */
  const isBlank = formValue === undefined || formValue === "";

  const sendMessage = (e) => {
    e.preventDefault();
    const { uid, photoURL } = auth.currentUser;
    const text = formValue;


    messagesRef.add({
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      photoURL: photoURL,
      text: text,
      uid: uid,
    }).then((docRef) => {
    }).catch((error) => {
      console.error("Error adding document: ", error);
    });
    setFormValue('');
  }
  return (
    <>
      <main className='ChatRoom-main'>
        {messages &&
          messages.map(msg => <ChatMessage key={msg.id} uid={msg.uid} photoURL={msg.photoURL}>{msg.text}</ChatMessage>)
        }
      </main>

      <form onSubmit={sendMessage}>
        <input type="text" value={formValue} onChange={e => setFormValue(e.target.value)} placeholder='Type your message' />
        <CustomButton disabled={isBlank}>🚀</CustomButton>
      </form>
    </>
  );
}

function CustomButton({ onClick, children, disabled }) {
  return (
    <button disabled={disabled} className='CustomButton rounded' onClick={onClick}>
      {children}
    </button>
  );
}
function ChatMessage({ uid, children, photoURL }) {
  const ownMessage = uid === auth.currentUser.uid;
  return (
    <div className={`ChatMessage ${ownMessage ? 'own' : ''}`}>
      <img className='avatar rounded' src={photoURL} alt="" />
      <div className={`chat-bubble rounded ${ownMessage ? 'own' : ''}`} >
        <span className='message'>{children}</span>
      </div>
    </div>
  );
}

export default App;
