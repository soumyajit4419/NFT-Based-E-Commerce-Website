import firebase from "firebase";

const firebaseApp=firebase.initializeApp({
  apiKey:"AIzaSyAsz_ZOqtFvcYPuf1FuBMrpvquv2iE4y-c",
  authDomain:"loud-platform.firebaseapp.com",
  projectId:"loud-platform",
  storageBucket:"loud-platform.appspot.com",
  messagingSenderId:"585162530654",
  appId:"1:585162530654:web:caa703406452b7e54f79cf",
  measurementId:"G-D25ZM31WE3"
});

const db=firebaseApp.firestore();
const auth=firebase.auth();
const storage=firebase.storage();
const analytics=firebase.analytics();
export{db,auth,storage,analytics};
