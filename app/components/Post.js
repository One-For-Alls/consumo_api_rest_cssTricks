export function Post(props){
   console.log(props);
   const {title,content,date} = props;

   return `
      <section class="post-page">
         <aside>
            <h2>${title.rendered.toUpperCase()}</h2>
            <time datetime = "${date}">${new Date(date).toLocaleString()}</time>
         </aside>
         <hr>
         <article>
            ${content.rendered}
         </article>
      </section>
   `;
}