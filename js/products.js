let productsArray = [];

const showProductsList = array => {

    let htmlContentToAppend = "";
    for (let product of productsArray) {
        htmlContentToAppend += `
        <div class="list-group-item list-group-item-action">
            <div class="row">
                <div class="col-3">
                    <img src="${product.imgSrc} " alt="${product.description} " class="img-thumbnail">
                    <p><strong>${product.currency} ${product.cost}</strong></p>
                </div>
                <div class="col">
                    <div class="d-flex w-100 justify-content-between">
                        <h3 class="mb-1">${product.name}</h3>
                        <small class="text-muted">${product.soldCount} artículos</small>
                    </div>
                
                    <p><em>${product.description}</em></p>
                </div>
            </div>
        </div>
        `
        document.getElementById("products-container").innerHTML = htmlContentToAppend;
        productsArray[2].imgSrc = "img/prod4.jpg";
        productsArray[3].imgSrc = "img/prod3.jpg";
    }
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(PRODUCTS_URL).then(resultObj => {
        if (resultObj.status === "ok") {
            productsArray = resultObj.data;
            showProductsList(productsArray);
        }
    });
});