/**
 * @Author: Nicolas Fazio <webmaster-fazio>
 * @Date:   01-12-2017
 * @Email:  contact@nicolasfazio.ch
 * @Last modified by:   webmaster-fazio
 * @Last modified time: 01-12-2017
 */

 import { TimerComponent } from '../../components/timer/timer-component';

 export class UserPage {
   constructor(app, fb, UserData) {
     this.app = app
     this.fb = fb
     this.userData = UserData
     this.initUI()
     this.loadEventUI()
     new TimerComponent()
   }

   initUI(){
     this.app.innerHTML = `
       <section>
         <h1 id="time"></h1>
         <h2>Hello ${this.userData.email.split('@')[0]}</h2>
         <button id="logout">logout</button>
       </section>
     `;
   }

   loadEventUI(){
     // event logout
     document.getElementById('logout').addEventListener('click', e=> {
       this.fb.auth.signOut()
     })
   }


 }
