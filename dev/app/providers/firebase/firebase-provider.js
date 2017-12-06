import * as firebase from "firebase";

import { CONFIG } from './config'

export class FirebaseProvider {
  constructor() {
    // init fb
    firebase.initializeApp(CONFIG);
    // init fb.auth()
    this.auth = firebase.auth();
    //console.log(firebase.database())
  }

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

}
