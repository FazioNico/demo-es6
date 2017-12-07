/**
 * @Author: Nicolas Fazio <webmaster-fazio>
 * @Date:   01-12-2017
 * @Email:  contact@nicolasfazio.ch
 * @Last modified by:   webmaster-fazio
 * @Last modified time: 01-12-2017
 */

 import { TimerComponent } from '../../components/timer/timer-component';
 import { BackgroundComponent } from '../../components/background/background-component';

 export class UserPage {
   constructor(app, fb, UserData) {
     this.app = app
     this.fb = fb
     this.userData = UserData
     this.initUI()
     this.loadEventUI()
     new TimerComponent()
     new BackgroundComponent()
   }

   initUI(){
     this.app.innerHTML = `
       <section>
         <h1 id="time"></h1>
         <h2>${this.greetings()} ${this.userData.email.split('@')[0]}</h2>
         <button id="logout">logout</button>
       </section>
       <aside>
        <form>
          <input id="title" type="text" placeholder="title">
          <input id="link" type="url" placeholder="link url">
          <button>add</button>
        </form>
       </aside>
     `;
   }

   loadEventUI(){
     // event logout
     document.getElementById('logout').addEventListener('click', e=> {
       this.fb.auth.signOut()
     })
     // event submit
     document.forms[0].addEventListener('submit', e=> {
        e.preventDefault()
        let title = document.getElementById('title').value
        let link = document.getElementById('link').value
        this.fb.path = 'userLinks'
        this.fb.firebasePush(this.userData.uid, {
          title,
          link
        })
     })
   }

   greetings(){
     let hour = new Date().getHours()
     console.log(hour)
     switch (true) {
       case (hour >= 18 && hour < 22):
         return 'Good Evening'
         break;
       case (hour >= 22 || hour < 6):
         return 'Good Night'
         break;
       case (hour > 6 && hour < 12):
         return 'Good morning'
         break;
       default:
         return 'Hello'
     }
   }
 }
