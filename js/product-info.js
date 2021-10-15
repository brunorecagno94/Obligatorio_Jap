const arrayEstrellas = [...document.getElementsByClassName("estrella")];
const estrellaPintada = `<i class="rating__star fas fa-star"></i>`;
const estrellaVacia = `<i class="rating__star far fa-star"></i>`;
let contadorEstrella = 0;

mostrarInfoProducto = datosProducto => {

    let htmlContentToAppend = `
    <h1>${datosProducto.name}</h1>
    <hr class="my-3">
    <dl>
        <dt>Descripción</dt>
        <dd>
          <p>${datosProducto.description}</p>
        </dd>

        <dt>Precio</dt>
        <dd>
          <p>${datosProducto.currency} ${datosProducto.cost}</p>
        </dd>

        <dt>Vendidos</dt>
        <dd>
          <p>${datosProducto.soldCount}</p>
        </dd>

        <dt>Categoría</dt>
        <dd>
          <a href="category-info.html">${datosProducto.category}</a>
        </dd>
    `
    $('#product-info').html(htmlContentToAppend);
    mostrarImagenes(datosProducto);
}

//Añade las imágenes al carrusel ya armado en html
mostrarImagenes = datosProducto => {
    let arrayImagenes = datosProducto.images;

    document.getElementById("carousel-container").innerHTML += `
    <div class="carousel-item active">
      <img src="${arrayImagenes[0]}" class="d-block" alt="...">
    </div>`

    let htmlContentToAppend = "";
    let indicadores =""

    for (let i = 1; i < arrayImagenes.length; i++) {
        const imagen = arrayImagenes[i];

        htmlContentToAppend += `
        <div class="carousel-item">
            <img src="${imagen}" class="d-block">
        </div>`

        indicadores +=`
        <li data-target="#carouselExampleIndicators" data-slide-to="${i}"></li>`
    }
    document.getElementById("carousel-container").innerHTML += htmlContentToAppend;
    document.getElementById("indicadores").innerHTML += indicadores;
}

//Ordena los comentarios precargados por fecha
ordenarComentariosPorFecha = arrayComentarios => {
    let comentariosOrdenados = []

    comentariosOrdenados = arrayComentarios.sort(function (a, b) {
        if (a.dateTime < b.dateTime) return -1;
        if (a.dateTime > b.dateTime) return 1;
        return 0;
    });
    return comentariosOrdenados;
}

//Una vez que la función anterior ordena los comentarios por fecha,
//esta función los muestra en una lista
mostrarComentariosYPuntaje = comentariosOrdenados => {
    $("#product-review").html = `
    <dd>
        <h2>Comentarios</h2>
    </dd><br>
    `

    for (let review of comentariosOrdenados) {

        htmlContentToAppend = `
        <p><strong>${review.user}</strong></p>
        <p><em>${review.description}</em></p>
        <div class="contenedor-estrellas"></div>
        <small class="text-muted">${review.dateTime}</small><br>
        <hr class="my-3">
        `

        document.getElementById("product-review").innerHTML += htmlContentToAppend;
    }
    puntajeEstrellasComentarios(comentariosOrdenados);
}

//Muestra los puntajes (en estrellas) de cada comentario precargado
puntajeEstrellasComentarios = comentariosOrdenados => {


    for (let i = 0; i < comentariosOrdenados.length; i++) {
        const comentario = comentariosOrdenados[i];

        let htmlContentToAppend =
            estrellaPintada.repeat(comentario.score) + estrellaVacia.repeat(5 - comentario.score) + `<br>`

        document.getElementsByClassName("contenedor-estrellas")[i].innerHTML += htmlContentToAppend;
    }

}

publicarComentario = () => {
    let comentario = $("#text-area").val();
    let fecha = new Date();
    let fechaActual = fecha.getFullYear() + "-" + (fecha.getMonth() + 1) + "-" + fecha.getDate();
    let horaActual = fecha.getHours() + ":" + fecha.getMinutes() + ":" + fecha.getSeconds();


    if (comentario === "") {
        alert("Debes ingresar un comentario!");
    } else {

        document.getElementById("product-review").innerHTML += `
        <p><strong>${localStorage.getItem("nombre")}</strong></p>
        <p><em>${comentario}</em></p>
        <div class="puntaje-usuario"></div>
        <small class="text-muted">${fechaActual} ${horaActual}</small><br>
        <hr class="my-3">`

        añadirEstrellasAComentario(contadorEstrella);
        contadorEstrella++;
    }
    $("#text-area").val("")

}

//Función para que las estrellas se pinten y despinten al hacer click sobre ellas
pintarEstrellas = arrayEstrellas => {
    const claseEstrellaPintada = "rating__star fas fa-star estrella";
    const claseEstrellaVacia = "rating__star far fa-star estrella";
    let i;

    arrayEstrellas.map((estrella) => {
        estrella.onclick = () => {
            i = arrayEstrellas.indexOf(estrella);

            if (estrella.className === claseEstrellaVacia) {
                for (i; i >= 0; --i) arrayEstrellas[i].className = claseEstrellaPintada;
            } else {
                for (i; i < arrayEstrellas.length; ++i) arrayEstrellas[i].className = claseEstrellaVacia;
            }
        };
    });
}

//Agrega estrellas al comentario que el usuario publica
//(tantas como se hayan marcado en la función pintarEstrellas)
añadirEstrellasAComentario = i => {
    let estrellaPintadaLength = document.getElementsByClassName("rating__star fas fa-star estrella").length;
    let estrellaVaciaLength = document.getElementsByClassName("rating__star far fa-star estrella").length;

    let htmlContentToAppend =
        estrellaPintada.repeat(estrellaPintadaLength) + estrellaVacia.repeat(estrellaVaciaLength);

    document.getElementsByClassName("puntaje-usuario")[contadorEstrella].innerHTML += htmlContentToAppend;
}

mostrarProductosRelacionados = (arrayProductos, infoProductos) => {
    let relatedProductsArray = infoProductos.relatedProducts;

    for (let i = 0; i < relatedProductsArray.length; i++) {
        let product = arrayProductos[relatedProductsArray[i]];

        let htmlContentToAppend = ` 
            <a href="product-info.html" class="related-product col-md-3 col-xs-12" style="text-decoration:none">
            <div class="col">
                <div class="d-block mb-4 h-100">
                    <dd>${product.name}</dd>
                    <img class="img-fluid img-thumbnail" src="${product.imgSrc}" alt="">
                    <dd><strong>${product.currency} ${product.cost}</strong></dd>
                </div>
            </div>
            </a>`

        document.getElementById("related-products").innerHTML += htmlContentToAppend;
    }
}

$(document).ready(function (e) {
    pintarEstrellas(arrayEstrellas);
    
    $("#text-area").val("");

    getJSONData(PRODUCT_INFO_COMMENTS_URL).then(resultObj => {
        if (resultObj.status === "ok") {
            let arrayComentarios = resultObj.data;
            mostrarComentariosYPuntaje(ordenarComentariosPorFecha(arrayComentarios));

        }
    });

    getJSONData(PRODUCTS_URL).then(resultObj => {
        if (resultObj.status === "ok") {
            let arrayProductos = resultObj.data;
            getJSONData(PRODUCT_INFO_URL).then(resultObj2 => {
                if (resultObj2.status === "ok") {
                    let infoProductos = resultObj2.data;
                    mostrarInfoProducto(infoProductos);
                    mostrarProductosRelacionados(arrayProductos, infoProductos);
                }
            });
        }
    });
});