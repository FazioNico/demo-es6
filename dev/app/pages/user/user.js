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
   }

   initUI(){
     this.app.innerHTML = `
       <section>
         <h1>Hello ${this.userData.email.split('@')[0]}</h1>
       </section>
     `;
   }
 }
