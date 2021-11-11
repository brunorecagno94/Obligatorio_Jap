const CATEGORIES_URL = "https://japdevdep.github.io/ecommerce-api/category/all.json";
const PUBLISH_PRODUCT_URL = "https://japdevdep.github.io/ecommerce-api/product/publish.json";
const CATEGORY_INFO_URL = "https://japdevdep.github.io/ecommerce-api/category/1234.json";
const PRODUCTS_URL = "https://japdevdep.github.io/ecommerce-api/product/all.json";
const PRODUCT_INFO_URL = "https://japdevdep.github.io/ecommerce-api/product/5678.json";
const PRODUCT_INFO_COMMENTS_URL = "https://japdevdep.github.io/ecommerce-api/product/5678-comments.json";
const CART_INFO_URL = "https://japdevdep.github.io/ecommerce-api/cart/987.json";
const CART_INFO2_URL = "https://japdevdep.github.io/ecommerce-api/cart/654.json";
const CART_BUY_URL = "https://japdevdep.github.io/ecommerce-api/cart/buy.json";

let showSpinner = function () {
  document.getElementById("spinner-wrapper").style.display = "block";
}

let hideSpinner = function () {
  document.getElementById("spinner-wrapper").style.display = "none";
}

let getJSONData = function (url) {
  let result = {};
  showSpinner();
  return fetch(url)
    .then(response => {
      if (response.ok) return response.json();

      throw Error(response.statusText);
    })
    .then(function (response) {
      result.status = 'ok';
      result.data = response;
      hideSpinner();
      return result;
    })
    .catch(function (error) {
      result.status = 'error';
      result.data = error;
      hideSpinner();
      return result;
    });
}

//Función para agregar menú en la barra de navegación
//(con link al perfil y opción de cerrar sesión)
menuBarraNav = () => {
  let nombreBarra = localStorage.getItem('nombre');

  let htmlContentToAppend = `
  <div class="dropdown">
    <button onclick="mostrarMenu()" class="dropbtn">${nombreBarra}</button>
    <div id="myDropdown" class="dropdown-content">
      <a class="py-2 d-none d-md-inline-block" href="my-profile.html">Mi perfil</a>
      <a class="py-2 d-none d-md-inline-block" href="index.html" onclick='cerrarSesion()'>Cerrar sesión</a>
    </div>
  </div>
`

  if (document.getElementById('nav')) document.getElementById('nav').innerHTML += htmlContentToAppend;

}

//Función para mostrar el menú dropdown
//cuando se hace click en el usuario
mostrarMenu = () => {
  document.getElementById("myDropdown").classList.toggle("show");
}

//Función que cierra el menú dropdown al hacer click afuera
$(window).click(function (e) {
  if (!e.target.matches('.dropbtn')) {
    let dropdowns = document.getElementsByClassName("dropdown-content");
    let i;
    for (i = 0; i < dropdowns.length; i++) {
      let openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
})

onSignIn = googleUser => {
  // Useful data for your client-side scripts:
  var profile = googleUser.getBasicProfile();
  console.log("ID: " + profile.getId()); // Don't send this directly to your server!
  console.log('Full Name: ' + profile.getName());
  console.log('Given Name: ' + profile.getGivenName());
  console.log('Family Name: ' + profile.getFamilyName());
  console.log("Image URL: " + profile.getImageUrl());
  console.log("Email: " + profile.getEmail());
  
  localStorage.setItem('nombre', profile.getName());
  localStorage.setItem('pass', passUsuario);

  // The ID token you need to pass to your backend:
  var id_token = googleUser.getAuthResponse().id_token;
  console.log("ID Token: " + id_token);
}

cerrarSesion = () => {
  localStorage.clear();

  let auth2 = gapi.auth2.getAuthInstance();
  auth2.signOut();
}


//Event listener que se encarga de cargar el menú
//del usuario en la barra de navegación, y también
//de redireccionar al login si no está hecho previamente.
$(document).ready(function (e) {
  menuBarraNav();

  //if (window.location.href != 'index.html') {
  if (!location.href.includes("index.html")) {
    if (localStorage.getItem('nombre') === null || localStorage.getItem('pass') === null) window.location.href = 'index.html';
  }
});


