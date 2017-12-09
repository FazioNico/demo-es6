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
    // read child_added
    this.fb.read('userLinks')
           .child(this.userData.uid)
           .on('child_added', (snpashot)=>this.addElement(snpashot))

    // read child_changed
    this.fb.read('userLinks')
           .child(this.userData.uid)
           .on('child_changed', (snpashot)=>this.updateElement(snpashot))
    // read child_changed
    this.fb.read('userLinks')
           .child(this.userData.uid)
           .on('child_removed', (snpashot)=>this.removeElement(snpashot))

   }
   addElement(snpashot){
     console.log(snpashot);
     //add button
     this.app.querySelector('#btnList').insertAdjacentHTML('afterbegin', `
      <button data-id="${snpashot.key}">${snpashot.val().title}</button>
     `)
     // add element to editable liste
     this.app.querySelector('ul#editableList').insertAdjacentHTML('afterbegin', `
      <li id="${snpashot.key}">
        <input type="text" name="title" value="${snpashot.val().title}"/>
        <input type="url" name="link" value="${snpashot.val().link}"/>
        <button class="save">save</button>
        <button class="del">x</button>
      </li>
     `)
   }

   updateElement(snpashot){
     //update input editable liste (optional)
     document.querySelector(`#${snpashot.key} input[name=title]`).value = snpashot.val().title
     document.querySelector(`#${snpashot.key} input[name=link]`).value = snpashot.val().link
     // update btn clicable list
     document.querySelector(`#btnList button[data-id=${snpashot.key}]`).innerHTML = snpashot.val().title
   }

   removeElement(snpashot){
     let el = document.querySelector(`#${snpashot.key}`);
     el.parentElement.removeChild(el)
   }

   initUI(){
     this.app.innerHTML = `
       <section>
         <h1 id="time"></h1>
         <h2>${this.greetings()} ${this.userData.email.split('@')[0]}</h2>
         <div id="btnList"></div>
       </section>
       <span id="settings">Settings</span>
       <aside>
        <p>You are connected as <b>${this.userData.email}</b>. Want to  <i id="logout">logout</i>
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
     // add event listener to UL#editable
     this.app.querySelector('ul#editableList').addEventListener('click', e=> {

       if(e.target.nodeName !== 'BUTTON'){
         return
       }
       let li = e.target.closest('li')
       if([...e.target.classList].includes('save')) {
         // save action
        console.log(li.id, document.querySelector(`#${li.id} input[name=title]`).value);
        this.fb.path = `userLinks/${this.userData.uid}`;
        this.fb.firebaseUpdate(li.id,{
          title: document.querySelector(`#${li.id} input[name=title]`).value,
          link: document.querySelector(`#${li.id} input[name=link]`).value,
        })
       }
       else {
          //delete action;
          this.fb.path = `userLinks/${this.userData.uid}`;
          this.fb.firebaseSet(li.id,null)
       }
       console.log([...e.target.classList].includes('save'))
     })
     // add event to setting btn
     this.app.querySelector('#settings').addEventListener('click', e=> {
        this.app.querySelector('aside').classList.toggle('active')
        this.app.querySelector('#settings').classList.toggle('active')
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
