import * as firebase from "firebase";

import { CONFIG } from './config'

export class FirebaseProvider {
  constructor() {
    this.path = ''
    // init fb
    firebase.initializeApp(CONFIG);
    // init fb.auth()
    this.auth = firebase.auth();
    this.database = firebase.database();
    //console.log(firebase.database())
  }

  // Auth() methode
  createEmailAccount(email, password){
    this.auth
            .createUserWithEmailAndPassword(email, password)
            .then(response => console.log(response))
            .catch((error)=> {
                // Handle Errors here.
                let errorCode = error.code;
                let errorMessage = error.message;
                alert(errorMessage)
            });
  }
  logInEmailAccount(email, password){
    this.auth
            .signInWithEmailAndPassword(email, password)
            .then(response => console.log(response))
            .catch((error)=> {
                // Handle Errors here.
                let errorCode = error.code;
                let errorMessage = error.message;
                alert(errorMessage)
            });
  }

  // database() Methodes
  read(path){
    return this.database.ref(path)
  }

  firebasePush(uid,datas){
    this.database.ref(this.path)
            .child(uid)
            .push(datas)
  }

}
