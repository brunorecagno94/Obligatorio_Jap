const CATEGORIES_URL = "https://japdevdep.github.io/ecommerce-api/category/all.json";
const PUBLISH_PRODUCT_URL = "https://japdevdep.github.io/ecommerce-api/product/publish.json";
const CATEGORY_INFO_URL = "https://japdevdep.github.io/ecommerce-api/category/1234.json";
const PRODUCTS_URL = "https://japdevdep.github.io/ecommerce-api/product/all.json";
const PRODUCT_INFO_URL = "https://japdevdep.github.io/ecommerce-api/product/5678.json";
const PRODUCT_INFO_COMMENTS_URL = "https://japdevdep.github.io/ecommerce-api/product/5678-comments.json";
const CART_INFO_URL = "https://japdevdep.github.io/ecommerce-api/cart/987.json";
const CART_INFO2_URL = "https://japdevdep.github.io/ecommerce-api/cart/654.json";
const CART_BUY_URL = "https://japdevdep.github.io/ecommerce-api/cart/buy.json";


//URLs locales
// const CATEGORIES_URL = "http://localhost:3000/categories-all";
// const CATEGORY_INFO_URL = "http://localhost:3000/category-info";
// const PRODUCTS_URL = "http://localhost:3000/products-all";
// const PRODUCT_INFO_URL = "http://localhost:3000/product-info";
// const PRODUCT_INFO_COMMENTS_URL = "http://localhost:3000/product-comments";
// const PUBLISH_PRODUCT_URL = "http://localhost:3000/publish-product";
// const CART_INFO_URL = "http://localhost:3000/cart-article-single";
// const CART_INFO2_URL = "http://localhost:3000/cart-article-2";
// const CART_BUY_URL = "http://localhost:3000/cart-buy-mssg";

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

mostrarNav = () => {
  const nombreBarra = localStorage.getItem("nombre");

  let htmlContentToAppend = `
  <a class="navbar-brand text-light" href="home.html">Inicio</a>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>
  <div class="collapse navbar-collapse" id="navbarNavDropdown">
    <ul class="navbar-nav">
      <li class="nav-item">
        <a class="nav-link text-light mg-5" href="categories.html">Categorías</a>
      </li>
      <li class="nav-item">
        <a class="nav-link text-light mg-5" href="products.html">Productos</a>
      </li>
      <li class="nav-item">
        <a class="nav-link text-light mg-5" href="sell.html">Vender</a>
      </li>
      <li class="nav-item">
        <a class="nav-link text-light mg-5" href="cart.html">Mi carrito</a>
      </li>
      <li class="nav-item dropdown mg-5">
        <a class="nav-link text-light dropdown-toggle" id="navbarDropdownMenuLink" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          ${nombreBarra}
        </a>
        <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
          <a class="dropdown-item" href="my-profile.html">Mi perfil</a>
          <a class="dropdown-item" href="index.html" onclick='cerrarSesion()'>Cerrar sesión</a>
        </div>
      </li>
    </ul>
  </div>
  `
  document.getElementById("nav-bar").innerHTML = htmlContentToAppend;
}

cerrarSesion = () => {
  localStorage.clear();
}

//Event listener que se encarga de cargar el menú
//del usuario en la barra de navegación, y también
//de redireccionar al login si no está hecho previamente.
$(document).ready(function (e) {
  mostrarNav();
  // menuBarraNav();

  if (!location.href.includes("index.html")) {
    if (localStorage.getItem('nombre') === null || localStorage.getItem('pass') === null) window.location.href = 'index.html';
  }
});


