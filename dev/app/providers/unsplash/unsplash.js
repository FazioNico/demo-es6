import  { API_KEY_CONFIG } from './config'

export class UnsplashProvider{

  constructor(){
    this.params = API_KEY_CONFIG
    this.queryUrl = 'https://api.unsplash.com/photos/random?count=1&client_id='
  }

  getRandomImg(){
    return fetch(this.queryUrl+this.params.client_id, {
      method: "GET"
    })
    .then(res=> res.json())
    .catch(err => alert(err.toString()))
      // //Return a new promise.
      // return new Promise((resolve, reject)=> {
      //   // Do the usual XHR stuff
      //   var req = new XMLHttpRequest();
      //   req.open('GET', this.queryUrl+this.params.client_id);
      //   req.onload = () =>{
      //     // This is called even on 404 etc
      //     // so check the status
      //     if (req.status == 200) {
      //       // Resolve the promise with the response text
      //       resolve(JSON.parse(req.responseText));
      //     }
      //     else {
      //       // Otherwise reject with the status text
      //       // which will hopefully be a meaningful error
      //       reject(Error(req.statusText));
      //     }
      //   };
      //   // Handle network errors
      //   req.onerror = ()=> {
      //     reject(Error("Network Error"));
      //   };
      //   // Make the request
      //   req.send();
      // });
  }
}
