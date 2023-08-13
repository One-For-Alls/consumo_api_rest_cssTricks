export function SearchForm(){
   const d = document;
   const $form = d.createElement('form');
   const $input = d.createElement('input');
   $form.classList.add('form-search');

   $input.name = 'search';
   $input.type = 'search';
   $input.autocomplete = 'off';
   $input.placeholder = 'buscar...';

   $form.appendChild($input);

   if(location.hash.includes('#/search')){
      $input.value = localStorage.getItem('search');
   }

   d.addEventListener('search', e =>{
      if(!e.target.matches("input[type='search']")) return false;
      if(!e.target.value) localStorage.removeItem('search');
   });

   d.addEventListener('input',e=>{
      if(e.target.matches(".form-search input[type='search']")){
         if(e.target.value.length <= 0) localStorage.removeItem('search');
      }
   });

   d.addEventListener('submit', e=>{
      if(!e.target.matches(".form-search")) return false;
      e.preventDefault();
      localStorage.setItem('search',e.target.search.value);
      location.hash = `#/search?search=${e.target.search.value}`;
   });

   return $form;
}