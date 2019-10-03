import firebase from "firebase/app";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDnxFtBVqKWTQEnEmuWucKpqg73SOEWL0Q",
  authDomain: "e-vahak.firebaseapp.com",
  databaseURL: "https://e-vahak.firebaseio.com",
  projectId: "e-vahak",
  storageBucket: "e-vahak.appspot.com"
};

firebase.initializeApp(firebaseConfig);

var storage = firebase.storage();

export default storage;
