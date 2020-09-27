import firebase from "firebase/app";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyD3A-ISrckEQ5lcN5N_yHtRA45M84o0RSI",
  authDomain: "ml-2-290800.firebaseapp.com",
  databaseURL: "https://ml-2-290800.firebaseio.com",
  projectId: "ml-2-290800",
  storageBucket: "ml-2-290800.appspot.com",
  messagingSenderId: "572066598641",
  appId: "1:572066598641:web:88397008abcd90304ea350"
};

firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();

export { storage, firebase as default };


