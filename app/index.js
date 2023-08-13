import {App}  from "./Apps.js";
import { infinity_Scroll } from "./helpers/infinty_scroll.js";
import api from "./helpers/wp_api.js";

document.addEventListener("DOMContentLoaded",() =>{
   api.page = 1;
   App();
   infinity_Scroll();
});
window.addEventListener('hashchange', ()=>{
   api.page = 1;
   App();
});