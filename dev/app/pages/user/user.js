/**
 * @Author: Nicolas Fazio <webmaster-fazio>
 * @Date:   01-12-2017
 * @Email:  contact@nicolasfazio.ch
 * @Last modified by:   webmaster-fazio
 * @Last modified time: 01-12-2017
 */

 export class UserPage {
   constructor(app, fb, UserData) {
     this.app = app
     this.fb = fb
     this.userData = UserData
     this.initUI()
     this.loadEventUI()
     this.displayTime()
   }

   initUI(){
     this.app.innerHTML = ``;
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

   displayTime(){
     let timeElement = document.getElementById('time')
     if(!timeElement){
       return
     }
     // add date
     timeElement.innerHTML = this.getTime(new Date())
     // some css with JS for time txt
     timeElement.style.fontSize = '10rem';
     timeElement.style.margin = '0rem';
     timeElement.style.textShadow = '0px 0px 50px rgba(0, 0, 0, 0.21)';
     // run interval
     setTimeout(()=>this.displayTime(),1000)
   }

   getTime(time){
     let timeUTC = time;
     let timeArray = time.toLocaleTimeString().split(':');

     return    `
     <time datetime="-${(timeUTC.getMonth() < 10)?'0'+timeUTC.getMonth():timeUTC.getMonth()}-${(timeUTC.getDate() < 10)?'0'+timeUTC.getDate():timeUTC.getDate()} ${(timeUTC.getHours() < 10)?'0'+timeUTC.getHours():timeUTC.getHours()}:${(timeUTC.getMinutes() < 10)?'0'+timeUTC.getMinutes():timeUTC.getMinutes()}:${(timeUTC.getSeconds() < 10)?'0'+timeUTC.getSeconds():timeUTC.getSeconds()}">
       ${timeArray[0]}:${timeArray[1]}:${timeArray[2]}
     </time>
     `;
   }
 }
