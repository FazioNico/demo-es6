/**
 * @Author: Nicolas Fazio <webmaster-fazio>
 * @Date:   01-12-2017
 * @Email:  contact@nicolasfazio.ch
 * @Last modified by:   webmaster-fazio
 * @Last modified time: 01-12-2017
 */

 import { UserPage } from '../user/user'
 import { homeSkeleton } from './home-ui'

 export class HomePage {
   constructor(app, fb){
     this.app = app
     this.fb = fb
     this.title = 'hello world!!!!'
     this.initUI()
     this.loadEventUI()
   }

   initUI(){
     document.body.style.opacity = 1;
     let skeleton = homeSkeleton({
       title:this.title
     })
     this.app.innerHTML = skeleton;
   }

   loadEventUI(){
     // event formSwitch
     // switchForm
     document.getElementById('switchForm').addEventListener('click', event=> {
       console.log([...document.getElementById('switchForm').classList].includes('create'))
       switch ([...document.getElementById('switchForm').classList].includes('create')) {
         case false:
           document.getElementById('switchForm').classList.toggle('create')
           document.getElementById('switchForm').innerHTML = 'Click here to login with existing account'
           document.forms[0].querySelector('button').innerHTML = 'Create an account'
           break;
         case true:
           document.getElementById('switchForm').classList.toggle('create')
           document.getElementById('switchForm').innerHTML = 'Click here to create new account'
           document.forms[0].querySelector('button').innerHTML = 'Login'
           break;
         default:
       }
     })

     // event form submit
     document.forms[0].addEventListener('submit', event=> {
       event.preventDefault()
       let formData =  {}
       let formEl = document.forms[0].elements
       for (var i = 0; i < formEl.length; i++) {
         if(formEl[i].value){
           formData[formEl[i].name] = formEl[i].value
         }
       }
       console.log(formData);
       ([...document.getElementById('switchForm').classList].includes('create'))
        ? this.fb.createEmailAccount(formData.email, formData.password)
        : this.fb.logInEmailAccount(formData.email, formData.password);
       // send user data to FB to creat user of to log user
       // do not run UserPage()
     })
   }
 }
