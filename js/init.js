const CATEGORIES_URL = "https://japdevdep.github.io/ecommerce-api/category/all.json";
const PUBLISH_PRODUCT_URL = "https://japdevdep.github.io/ecommerce-api/product/publish.json";
const CATEGORY_INFO_URL = "https://japdevdep.github.io/ecommerce-api/category/1234.json";
const PRODUCTS_URL = "https://japdevdep.github.io/ecommerce-api/product/all.json";
const PRODUCT_INFO_URL = "https://japdevdep.github.io/ecommerce-api/product/5678.json";
const PRODUCT_INFO_COMMENTS_URL = "https://japdevdep.github.io/ecommerce-api/product/5678-comments.json";
const CART_INFO_URL = "https://japdevdep.github.io/ecommerce-api/cart/987.json";
const CART_BUY_URL = "https://japdevdep.github.io/ecommerce-api/cart/buy.json";

var showSpinner = function () {
  document.getElementById("spinner-wrapper").style.display = "block";
}

var hideSpinner = function () {
  document.getElementById("spinner-wrapper").style.display = "none";
}

var getJSONData = function (url) {
  var result = {};
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

//Función para agregar menú en la barra de navegación (con link al perfil y opción de cerrar sesión)
menuBarraNav = () => {
  let nombreBarra = sessionStorage.getItem('nombre');

  let htmlContentToAppend = `
  <div class="dropdown">
    <button onclick="mostrarMenu()" class="dropbtn">${nombreBarra}</button>
    <div id="myDropdown" class="dropdown-content">
      <a class="py-2 d-none d-md-inline-block" href="my-profile.html">Mi perfil</a>
      <a class="py-2 d-none d-md-inline-block" href="index.html" onclick='cerrarSesion()'>Cerrar sesión</a>
    </div>
  </div>
`

  document.getElementById('nav').innerHTML += htmlContentToAppend;
}

//Función para mostrar el menú dropdown
//cuando se hace click en el usuario
mostrarMenu = () => {
  document.getElementById("myDropdown").classList.toggle("show");
}

cerrarSesion = () => {
  sessionStorage.clear();
}

//Event listener que se encarga de cargar el menú
//del usuario en la barra de navegación, y también
//de redireccionar al login si no está hecho previamente.
document.addEventListener("DOMContentLoaded", function (e) {
  menuBarraNav();

  if (window.location.href != 'index.html') {
    if (sessionStorage.getItem('nombre') === null || sessionStorage.getItem('pass') === null) window.location.href = 'index.html'; 
  }
});
