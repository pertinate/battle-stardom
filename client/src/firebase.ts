import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyCeeeTxl6mq2Vb0mUWEsOeznVwCos86iQw",
    authDomain: "battle-stardom-d.firebaseapp.com",
    projectId: "battle-stardom-d",
    storageBucket: "battle-stardom-d.appspot.com",
    messagingSenderId: "440571764145",
    appId: "1:440571764145:web:f2d9ac21db02ba4f737190",
    measurementId: "G-0Y16EWZEP2"
};

try {
    firebase.initializeApp(firebaseConfig);
} catch (err) {
    if (!/already exists/.test(err.message)) {
        console.error('Firebase initialization error:', err.stack);
    }
}

const Firebase = firebase;

export default Firebase;
