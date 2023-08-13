export function ContactForm(){
   console.log('holaa');
   const d = document,
         $form = d.createElement('form'),
         $styles = d.getElementById('dynamic-styles');

         $form.classList.add('form');
   
   $styles.innerHTML = `
      .form{
         width: 80%;
         --ok-valid-color: #0f0;
         --error-valid-color: #f00;
         margin: auto;
      }
      
      .form *{
         width: 100%;
         padding: .5rem;
         margin: 1rem auto;
         display: block;
         border-radius: 3px;
      }
      
      .form textarea{
         resize: none;
      }
      
      .form input,
      .form textarea{
         font-size: 1rem;
         font-family: cursive;
         outline: none;
      }
      
      .form .legend,
      .form-response{
         font-size: 1.5rem;
         font-weight: bold;
         color: #880387;
         text-align: center;
      }
      
      .form button{
         width: 40%;
         cursor: pointer;
         font-weight: bold;
         border: none;
         background-color: #13b513;
         outline: none;
         color: #fff;
         padding: 1rem;
         font-size: 1.2rem;
      }

      .form button:hover{
         background-color: #008000;
      }
      
      .form *::placeholder{
         color: #666;
      }
      
      .form [required]:valid{
         border: thin solid var(--ok-valid-color);
      }
      
      .form [required]:invalid{
         border: thin solid var(--error-valid-color);
      }
      
      .invalidText{
         border: thin solid var(--error-valid-color) !important;
      }
      
      .contact-form-error{
         margin-top: -1rem;
         font-size: 80%;
         background-color: var(--error-valid-color);
         color: #fff;
         transition: all 800ms ease;
      }
      
      .contact-form-error.is-active2{
         display: block;
         animation: show-message 1s 1 normal 0s ease-out both;
      }
      
      .none{
         display: none;
      }
      
      @keyframes show-message{
         0%{
            visibility: hidden;
            opacity: 0;
         }
      
         100%{
            visibility: visible;
            opacity: 1;
         }
      }
   `;

   $form.innerHTML = `
      <p class="legend">Envianos tus comentarios</p>					    
      <input name="nombre" type="text" placeholder="ingresar nombre" pattern="^[a-zA-ZáéíóúÁÉÍÓÚäëïöüÄËÏÖÜ\\s]+$" title="Solo se admiten letras" required>
      <input name="correo" type="email" placeholder="ingresar correo" pattern="^[a-zA-Z-\d _ - .]+@[a-z]{3,}[.][a-z]{2,5}$" title="no se admiten los caracteres: ,#$%&/()=?¡¿!|° *@gmail o @hotmail" required>
      <input name="asunto" type="text" placeholder="ingresar asunto" title="* El asunto es requerido" required>	
      <textarea name="comentarios" placeholder="maximo 255 caracteres" data-pattern="^[a-zA-Z-\d . ;]{1,255}$" title="Tu comentario no debe superar los 255 caracteres" cols="50" rows="5" data-limit=255 required></textarea>

      <button type="submit">Enviar</button>

      <div class="form-loader none">
         <img src="app/assets/spin.svg" alt="cargando..">
      </div>
      <div class="form-response none">
         <p>Los datos se enviaron correctamente</p>
      </div>
   `;
   
function validationForm() {

   const $form = d.querySelector('.form'),
         $inputs = d.querySelectorAll('.form [required]');


   $inputs.forEach(input => {

      const $span = d.createElement('span');
      //console.log($span);
      $span.id = input.name;
      $span.textContent = input.title;
      $span.classList.add('contact-form-error','none')
      input.insertAdjacentElement('afterend',$span);
   });


   d.addEventListener('keyup',(e) =>{

   if (e.target.matches('.form [required]')) {
      const $textArea = d.querySelector('.form [name=comentarios]');

      let $input = e.target,
            pattern = $input.pattern || $input.dataset.pattern;
            
      if(pattern && $input.value !== ''){

         console.log('tiene patron');
         let regex = new RegExp(pattern);
         // console.log(regex);
         if(!regex.exec($input.value)){
            $textArea.classList.add('invalidText');
            d.getElementById($input.name).classList.add('is-active2'); 
         }else{
            $textArea.classList.remove('invalidText');
            d.getElementById($input.name).classList.remove('is-active2');
         }                          
      }

      if(!pattern){
         //console.log($input.value);
         return $input.value === ''
            ? d.getElementById($input.name).classList.add('is-active2')
            : d.getElementById($input.name).classList.remove('is-active2')
      }

   }
});

   d.addEventListener('submit',(e) => {
   console.log(e.target);
   e.preventDefault();

   const $loader = d.querySelector('.form-loader'),
         $response = d.querySelector('.form-response');

   $loader.classList.remove('none');

   fetch('https://formsubmit.co/ajax/anthony.z.roldan@gmail.com',{
      mode: 'cors',
      method: 'POST',
      body: new FormData(e.target)
   })
   .then(res => res.ok ? res.json() : Promise.reject(res))
   .then(json => {
      console.log(json);
      $loader.classList.add('none');
      $response.classList.remove('none');
      $response.innerHTML = `<p>${json.message}</p>`;
      $form.reset();
   })
   .catch(err =>{
      let message = err.statusText || 'ocurrio un error, intente nuevamente';
      $response.innerHTML = `<p>Error ${err.status}: ${message}</p>`;
   })

   .finally(() => setTimeout(() => {
      $response.classList.add('none');
      $response.innerHTML = '';
   },3000));

      });
   }

   setTimeout(() => {
      validationForm();
   },1000);

   return $form;
}