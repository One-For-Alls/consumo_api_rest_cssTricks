import { PostCard } from "./PostCard.js";
import { ajax } from "../helpers/ajax.js";
import api from "../helpers/wp_api.js";
import { Post } from "./Post.js";
import { SearchCard } from "./SearchCard.js";
import { ContactForm } from "./ContactForm.js";

   //indica q contenido cargarda la web //hacemos asycronia para q primero espere al ajax y lyego siga su funcion con lo sincrono
export async function Router(){  
   const d = document,
         w = window,
         $main = d.getElementById('main');  

   let {hash} = location;

   //PAGINA PRINCIPAL
   if(!hash || hash === '#/'){
      await ajax({
         url:`${api.POSTS}`,
         cbSuccess: (posts) =>{
            let html = '';
            posts.forEach(post => (html += PostCard(post)));
            d.querySelector(".loader").style.display = "none";
            $main.innerHTML = html;
         }
      });

      //PAGINA BUSQUEDA
   }else if(hash.includes('#/search')){
      let query = localStorage.getItem('search');

      if(!query) {
         d.querySelector(".loader").style.display = "none";
         $main.innerHTML = `
            <p class="error">Ooopss.. No se ha ingresado ninguna palabra de busqueda!</p>
         `;
         return false;
      }  
      await ajax({
         url:`${api.SEARCH}${query}`,
         cbSuccess: (search) =>{

            let html = '';
            if(search.length === 0){
               html = `
               <p class="error">No existen resultados para la busqueda: <mark>${query}</mark></p>
               `;
            }else{
               search.forEach(post => (html += SearchCard(post)));
            }

            $main.innerHTML = html;
         }
      });


      //PAGINA DE CONTACTO
   }else if(hash.includes('#/contacto')){
      $main.appendChild(ContactForm());

      //PAGINA POST POR ID
   }else{
      await ajax({
         url:`${api.POST}/${localStorage.getItem('PostId')}`,
         cbSuccess: (post) =>{
            console.log(post);
            $main.innerHTML = Post(post);
         }
      });
   }

   d.querySelector(".loader").style.display = "none";
}