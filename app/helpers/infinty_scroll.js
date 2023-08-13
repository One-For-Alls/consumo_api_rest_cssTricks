import { PostCard } from "../components/PostCard.js";
import { SearchCard } from "../components/SearchCard.js";
import { ajax } from "./ajax.js";
import api from "./wp_api.js";

export async function infinity_Scroll(){
   const d = document,
         w = window;
   let query = localStorage.getItem('search'),
   apiURL,
   Component;

   w.addEventListener('scroll', async e =>{
      let {scrollTop, clientHeight, scrollHeight} = d.documentElement, //altura del contenido / altura pantalla dispositivo // altura total
      {hash} = w.location;
      // console.log(scrollTop, clientHeight, scrollHeight);
      if(scrollTop + clientHeight >= scrollHeight){
         api.page++;
         // console.log('es mayor');
         if(!hash || hash === '#/'){
            apiURL = `${api.POSTS}&page=${api.page}`;
            Component = PostCard;
         }else if(hash.includes('#/search')){
            apiURL = `${api.SEARCH}${query}&page=${api.page}`;
            Component = SearchCard;
         }else{
            return false;
         }

         await ajax({
            url: apiURL,
            cbSuccess: (posts) => {
               let html = '';
               posts.forEach((post) =>html+=Component(post));
               d.getElementById('main').insertAdjacentHTML('beforeend',html);
            }
         });
      }
   });

}