/**
 * @Author: Nicolas Fazio <webmaster-fazio>
 * @Date:   01-12-2017
 * @Email:  contact@nicolasfazio.ch
 * @Last modified by:   webmaster-fazio
 * @Last modified time: 01-12-2017
 */

 import { TimerComponent } from '../../components/timer/timer-component';
 import { UnsplashProvider } from '../../providers/unsplash/unsplash';

 export class UserPage {
   constructor(app, fb, UserData) {
     this.app = app
     this.fb = fb
     this.unsplash = new UnsplashProvider()
     this.userData = UserData
     this.loadBackground()
     this.initUI()
     this.loadEventUI()
     new TimerComponent()
   }

   initUI(){
     this.app.innerHTML = `
       <section>
         <h1 id="time"></h1>
         <h2>${this.greetings()} ${this.userData.email.split('@')[0]}</h2>
         <button id="logout">logout</button>
       </section>
     `;
   }

   loadBackground(){

     this.unsplash
         .getRandomImg()
         .then(res => {
           // add img to section bg
           document.querySelector('section').style.background = `url(${res[0].urls.regular}) center center no-repeat`
           document.querySelector('section').style.backgroundSize = `cover`
           return res
         })
         .then(res => {
           console.log(res[0].user)
           // add user data to HTML
           document.querySelector('section').insertAdjacentHTML('beforeend',`
              <footer>
                <p>Photo by ${res[0].user.name}</p>
              </footer>
           `)
           return res
         })
         .then(res => {
           // add img dwn btn
           document.querySelector('section').insertAdjacentHTML('afterbegin', `
              <button id="download">download</button>
           `)
           document.getElementById('download').addEventListener('click', _=> {
             window.open(res[0].links.download, true)
           })
           return res[0].urls.regular
         })
         .then(imgUrl=> {
           // stage img load to rmv body opacity
           let img = new Image();
           img.src = imgUrl;
           img.addEventListener('load', _=> {
             document.body.style.opacity = 1;
           })
         })
         .catch(err => alert(err.toString()))
   }

   loadEventUI(){
     // event logout
     document.getElementById('logout').addEventListener('click', e=> {
       this.fb.auth.signOut()
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
