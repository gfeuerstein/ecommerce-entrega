import * as firebase from 'firebase/app';
import 'firebase/firestore';

const app = firebase.initializeApp( {
    apiKey: "AIzaSyCNTzFG6VMzjEGukJIWpr2rL_ipbxZ1M7Y",
    authDomain: "app-cart-gf.firebaseapp.com",
    databaseURL: "https://app-cart-gf.firebaseio.com",
    projectId: "app-cart-gf",
    storageBucket: "app-cart-gf.appspot.com",
    messagingSenderId: "673509901165",
    appId: "1:673509901165:web:0df151e1bc210dd8245064",
    measurementId: "G-K64RNSTTRL"
  });

  export function getFirebase(){
      return app;
  }

  export function getFirestore(){
      return firebase.firestore(app);
  }