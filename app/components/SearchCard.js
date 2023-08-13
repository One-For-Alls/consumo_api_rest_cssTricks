export function SearchCard(props){
   const {id,title,_embedded,slug} = props;
   let picture =  _embedded.self[0]['featured_media_src_url']
      ? _embedded.self[0]['featured_media_src_url']
      :  "app/assets/agumon.webp";
   return `
   <article class="post-card">
   <img src="${picture}" alt="">
   <h2>${title}</h2>
   <p>
      <time datetime="${_embedded.self[0].date}">${new Date(_embedded.self[0].date).toLocaleString()}</time>
      <a href="#/${_embedded.self[0].slug}" data-id ="${id}">Ver Publicacion</a>
   </p>
   </article>
   `;
}