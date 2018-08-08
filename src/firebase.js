import * as firebase from 'firebase';

var config = {
    apiKey: "AIzaSyB7cTk0oj7uW4U0qqZpI807Kc4K87dNjaw",
    authDomain: "sinister-6aec6.firebaseapp.com",
    databaseURL: "https://sinister-6aec6.firebaseio.com",
    projectId: "sinister-6aec6",
    storageBucket: "sinister-6aec6.appspot.com",
    messagingSenderId: "334435003108"
  };
firebase.initializeApp(config);

export default firebase;