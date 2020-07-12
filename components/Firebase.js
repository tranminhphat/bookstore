import firebase from 'firebase';

const firebaseConfig = {
  apiKey: 'AIzaSyA1HFFGKCNSachIBB8FBZuajzef4W4gSXM',
  authDomain: 'jsaddicted-1.firebaseapp.com',
  databaseURL: 'https://jsaddicted-1.firebaseio.com',
  projectId: 'jsaddicted-1',
  storageBucket: 'jsaddicted-1.appspot.com',
  messagingSenderId: '521640983450',
  appId: '1:521640983450:web:cdb53b42f19a3581739823',
  measurementId: 'G-167E3YEE46',
};
const Firebase = firebase.initializeApp(firebaseConfig);
export default Firebase;
