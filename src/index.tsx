import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import React, { createContext } from "react";

import firebase from "firebase";
import { App } from "./App";
import { FirebaseContextProps } from "./types";
const firebaseConfig = {
  apiKey: "AIzaSyBlDX-Hsh-9msaWKqI4JMYpdvVj6MG9w8Y",
  authDomain: "movies-antonlazurko.firebaseapp.com",
  projectId: "movies-antonlazurko",
  storageBucket: "movies-antonlazurko.appspot.com",
  messagingSenderId: "213386909953",
  appId: "1:213386909953:web:67c5258469e3fd2c08e300",
};
export const FirebaseContext = createContext<Partial<FirebaseContextProps>>({});
firebase.initializeApp(firebaseConfig);
const firestore = firebase.firestore();
const auth = firebase.auth();

ReactDOM.render(
  <React.StrictMode>
    <FirebaseContext.Provider value={{ firestore, firebase, auth }}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </FirebaseContext.Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
