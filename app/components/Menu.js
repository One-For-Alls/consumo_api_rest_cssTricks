export function Menu(){
   const $menu =  document.createElement('nav');
   $menu.classList.add('menu');
   $menu.innerHTML = `
      <li><a href="#/">Home</a></li>
      <li><a href="#/search">Búsqueda</a></li>
      <li><a href="#/contacto">Contacto</a></li>
      <li><a href="https://www.linkedin.com/in/anthony-zavaleta-r/" target="_blank" rel="noopener">Pagina autor</a></li>
   `;
   return $menu;
}