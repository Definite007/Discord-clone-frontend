import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyDkqncVhfxYSDsFBXXvbenmob-IkMS2y0U",
    authDomain: "discord-clone-356da.firebaseapp.com",
    projectId: "discord-clone-356da",
    storageBucket: "discord-clone-356da.appspot.com",
    messagingSenderId: "765938225244",
    appId: "1:765938225244:web:b6aca308b5b4fe83785699"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig);
  const db = firebase.firestore();
  const auth = firebase.auth();
  const provider = new firebase.auth.GoogleAuthProvider();

  export { auth, provider };
  export default db;