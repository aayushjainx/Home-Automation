import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyAaaOSxtXUJ5ec3uvyra_CiFiytcTSnpLI",
    authDomain: "home-monitoring-c6386.firebaseapp.com",
    projectId: "home-monitoring-c6386",
    storageBucket: "home-monitoring-c6386.appspot.com",
    messagingSenderId: "189021564727",
    appId: "1:189021564727:web:b9fb911b78c7d3b3e934b2"
  };


const app = !firebase.apps.length ? firebase.initializeApp(firebaseConfig): firebase.app();


const db = app.firestore();
const auth = app.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export {db, auth, provider};