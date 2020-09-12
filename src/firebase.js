import firebase from 'firebase'

const firebaseConfig = {
  apiKey: "AIzaSyCps4em-cbwihDhZE_0kMcbNNasYZP65rs",
  authDomain: "whatsapp-clone-25f06.firebaseapp.com",
  databaseURL: "https://whatsapp-clone-25f06.firebaseio.com",
  projectId: "whatsapp-clone-25f06",
  storageBucket: "whatsapp-clone-25f06.appspot.com",
  messagingSenderId: "103182269768",
  appId: "1:103182269768:web:01fc52907d89cb9916877d",
  measurementId: "G-9R15GXKJDN"
};

  const firebaseApp = firebase.initializeApp(firebaseConfig);
  const db = firebaseApp.firestore();
  const auth = firebase.auth();
  const provider = new firebase.auth.GoogleAuthProvider();
  export { auth, provider };
  export default db;