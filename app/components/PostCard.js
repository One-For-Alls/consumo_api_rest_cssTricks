export function PostCard(props){
   let picture =  props._embedded["wp:featuredmedia"][0].source_url 
      ? props._embedded["wp:featuredmedia"][0].source_url
      :  "app/assets/agumon.webp";
   //tambien podemos destructuras las propiedades del objeto para ahorr codigo

   document.addEventListener('click', e =>{
      if(!e.target.matches('.post-card a')) return false;

      localStorage.setItem('PostId', e.target.dataset.id);
   });
   return `
   <article class="post-card">
   <img src="${picture}" alt="">
   <h2>${props.title.rendered}</h2>
   <p>
      <time datetime="${props.date}">${new Date(props.date).toLocaleString()}</time>
      <a href="#/${props.slug}" data-id ="${props.id}">Ver Publicacion</a>
   </p>
   </article>
   `;
}