
import * as firebase from 'firebase'

var config = { /* COPY THE ACTUAL CONFIG FROM FIREBASE CONSOLE */
    apiKey: "AIzaSyAoI03A2zj7tB8cGzeyRMbVwc78jjTgI-8",
    authDomain: "fir-test-c19d6.firebaseapp.com",
    databaseURL: "https://fir-test-c19d6.firebaseio.com",
    projectId: "fir-test-c19d6",
    storageBucket: "gs://fir-test-c19d6.appspot.com/",
    messagingSenderId: "422811454875"
};
var fire = firebase.initializeApp(config);

// TODO: export the db, and other useful objects
export default fire;
