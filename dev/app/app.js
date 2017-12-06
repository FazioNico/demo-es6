/**
* @Author: Nicolas Fazio <webmaster-fazio>
* @Date:   01-12-2017
* @Email:  contact@nicolasfazio.ch
* @Last modified by:   webmaster-fazio
* @Last modified time: 01-12-2017
*/

import { HomePage } from './pages/home/home'
import { UserPage } from './pages/user/user'
import { FirebaseProvider } from './providers/firebase/firebase-provider'

class App {
  constructor() {
    this.app = document.querySelector('app')
    this.fb = new FirebaseProvider()
    this.start()
  }
  start(){
    console.log('hello')
    // detect if user is connected...
    this.fb.auth.onAuthStateChanged(user=> {
      // if connected => new UserPage(this.app, USER_ID)
      if (user) {
        new UserPage(this.app, this.fb, user)
      }
      // if NOT connected => new HomePage(this.app)
      else {
        new HomePage(this.app, this.fb)
      }
    })
  }
}

new App()
