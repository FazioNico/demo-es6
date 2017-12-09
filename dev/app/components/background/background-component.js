/**
* @Author: Nicolas Fazio <webmaster-fazio>
* @Date:   07-12-2017
* @Email:  contact@nicolasfazio.ch
* @Last modified by:   webmaster-fazio
* @Last modified time: 07-12-2017
*/

import { UnsplashProvider } from '../../providers/unsplash/unsplash';

export class BackgroundComponent {
  constructor() {
    this.unsplash = new UnsplashProvider()
    this.content = document.querySelector('section');
    this.loadBackground()
  }

  loadBackground(){
    if(!this.content){
      console.error(`unable to find <section></section> HTMLElement`)
      return
    };
    this.unsplash
    .getRandomImg()
    .then(res => {
      // add img to section bg
      this.content.style.background = `url(${res[0].urls.regular}) center center no-repeat`
      this.content.style.backgroundSize = `cover`
      return res
    })
    .then(res => {
      console.log(res[0].user)
      // add user data to HTML
      this.content.insertAdjacentHTML('beforeend',`
      <footer>
        <p>Photo by ${res[0].user.name}</p>
      </footer>
      `)
      return res
    })
    .then(res => {
      // add img dwn btn
      this.content.insertAdjacentHTML('afterbegin', `
      <i id="download" class="material-icons">file_download</i>
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

}
