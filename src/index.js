import React from 'react';
import ReactDOM from 'react-dom';
import firebase from 'firebase';
import './style/style.css';
import App from './components/App.js';


var config = {
  apiKey: "AIzaSyCB0i4CmDJcJOpd5AOR_8MRDrAFA4MJJJ0",
  authDomain: "warehouse-2967b.firebaseapp.com",
  databaseURL: "https://warehouse-2967b.firebaseio.com",
  projectId: "warehouse-2967b",
  storageBucket: "warehouse-2967b.appspot.com",
  messagingSenderId: "793660629914"
};
firebase.initializeApp(config);

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
