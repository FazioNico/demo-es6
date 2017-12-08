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
     this.readDatabase()
     new TimerComponent()
     new BackgroundComponent()
   }

   readDatabase(){
    this.fb.read('userLinks')
           .child(this.userData.uid)
           .on('child_added', (snpashot)=>this.addElement(snpashot))
   }
   addElement(snpashot){
     console.log(snpashot);
     //add button
     this.app.querySelector('#btnList').insertAdjacentHTML('afterbegin', `
      <button id="${snpashot.key}">${snpashot.val().title}</button>
     `)
     // add element to editable liste
     this.app.querySelector('ul#editableList').insertAdjacentHTML('afterbegin', `
      <li>
        <input type="text" name="title" value="${snpashot.val().title}"/>
        <input type="url" name="link" value="${snpashot.val().link}"/>
        <button>x</button>
      </li>
     `)
   }

   initUI(){
     this.app.innerHTML = `
       <section>
         <h1 id="time"></h1>
         <h2>${this.greetings()} ${this.userData.email.split('@')[0]}</h2>
         <button id="logout">logout</button>
         <div id="btnList"></div>
       </section>
       <aside>
        <ul id="editableList"></ul>
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
        let link = document.getElementById('link').value;
        if(!title && !link) return;

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
