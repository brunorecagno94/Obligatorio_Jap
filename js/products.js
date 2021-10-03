const ORDER_ASC_BY_PRICE = "AZ";
const ORDER_DESC_BY_PRICE = "ZA";
const ORDER_BY_PROD_COUNT = "Cant.";
let sortedProductsArray = [];
let currentSortCriteria = undefined;
let minCount = undefined;
let maxCount = undefined;

sortProducts = (criteria, array) => {
    let result = [];
    if (criteria === ORDER_ASC_BY_PRICE)
        result = array.sort(function (a, b) {
            if (a.cost > b.cost) return -1;
            if (a.cost < b.cost) return 1;
            return 0;
        });
    if (criteria === ORDER_DESC_BY_PRICE)
        result = array.sort(function (a, b) {
            if (a.cost < b.cost) return -1;
            if (a.cost > b.cost) return 1;
            return 0;
        });
    if (criteria === ORDER_BY_PROD_COUNT)
        result = array.sort(function (a, b) {
            let aCount = parseInt(a.soldCount);
            let bCount = parseInt(b.soldCount);

            if (aCount > bCount) return -1;
            if (aCount < bCount) return 1;
            return 0;
        });

    return result;
}

showProductsList = sortedProductsArray => {

    let htmlContentToAppend = "";
    for (let product of sortedProductsArray) {

        if (((minCount == undefined) || (minCount != undefined && parseInt(product.cost) >= minCount)) &&
            ((maxCount == undefined) || (maxCount != undefined && parseInt(product.cost) <= maxCount))) {

            htmlContentToAppend += `
    <a href="product-info.html" style="text-decoration:none">
        <div class="list-group-item list-group-item-action">
            <div class="row">
                <div class="col-3">
                    <img src="${product.imgSrc} " alt="${product.description} " class="img-thumbnail">
                    <p><strong>${product.currency} ${product.cost}</strong></p>
                </div>
                <div class="col">
                    <div class="d-flex w-100 justify-content-between">
                        <h3 class="mb-1">${product.name}</h3>
                        <small class="text-muted">${product.soldCount} vendidos</small>
                    </div>
                
                    <p><em>${product.description}</em></p>
                </div>
            </div>
        </div>
    </a>
        `
            document.getElementById("products-container").innerHTML = htmlContentToAppend;
        }
    }
}

sortAndShowProducts = (sortCriteria, productsArray) => {
    sortedProductsArray = sortProducts(sortCriteria, productsArray);

    //Muestro las categorías ordenadas por criterio
    showProductsList(sortedProductsArray);
}

//Función que filtra los productos por nombre
document.getElementById("buscador-prod").addEventListener("keyup", function (e) {

    let inputBuscador = document.getElementById("buscador-prod").value;
    let htmlContentToAppend = ""

    //Uso los métodos .toLowerCase para evitar discordancias de mayúsculas y minúsculas 
    //entre lo que ingresa el usuario y los nombres/descripciones de los productos,
    //y los métodos .normalize y .replace para que ignore tildes
    for (let product of productsArray) {
        if (((product.name).toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")).includes(inputBuscador.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")) ||
            ((product.description).toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")).includes(inputBuscador.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, ""))) {

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
                        <small class="text-muted">${product.soldCount} vendidos</small>
                    </div>
                
                    <p><em>${product.description}</em></p>
                </div>
            </div>
        </div>
        `
        }
        document.getElementById("products-container").innerHTML = htmlContentToAppend;
    }
});

$(document).ready(function (e) {
    getJSONData(PRODUCTS_URL).then(resultObj => {
        if (resultObj.status === "ok") {
            productsArray = resultObj.data;
            showProductsList(productsArray);
        }
    });

    document.getElementById("sortAsc").addEventListener("click", function () {
        sortAndShowProducts(ORDER_ASC_BY_PRICE, productsArray);
    });

    document.getElementById("sortDesc").addEventListener("click", function () {
        sortAndShowProducts(ORDER_DESC_BY_PRICE, productsArray);
    });

    document.getElementById("sortByCount").addEventListener("click", function () {
        sortAndShowProducts(ORDER_BY_PROD_COUNT, productsArray);
    });

    document.getElementById("clearRangeFilter").addEventListener("click", function () {
        document.getElementById("rangeFilterCountMin").value = "";
        document.getElementById("rangeFilterCountMax").value = "";

        minCount = undefined;
        maxCount = undefined;

        showProductsList(productsArray);
    });

    document.getElementById("rangeFilterCount").addEventListener("click", function () {

        minCount = document.getElementById("rangeFilterCountMin").value;
        maxCount = document.getElementById("rangeFilterCountMax").value;

        if ((minCount != undefined) && (minCount != "") && (parseInt(minCount)) >= 0) {
            minCount = parseInt(minCount);
        }
        else {
            minCount = undefined;
        }

        if ((maxCount != undefined) && (maxCount != "") && (parseInt(maxCount)) >= 0) {
            maxCount = parseInt(maxCount);
        }
        else {
            maxCount = undefined;
        }

        showProductsList(productsArray);
    });
})


