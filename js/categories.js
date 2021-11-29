const ORDER_ASC_BY_NAME = "AZ";
const ORDER_DESC_BY_NAME = "ZA";
const ORDER_BY_PROD_COUNT = "Cant.";
let sortedCategoriesArray = [];
let currentSortCriteria = undefined;
let minCount = undefined;
let maxCount = undefined;

sortCategories = (criteria, array) => {
    let result = [];
    if (criteria === ORDER_ASC_BY_NAME)
        result = array.sort(function (a, b) {
            if (a.name < b.name) return -1;
            if (a.name > b.name) return 1;
            return 0;
        });
    if (criteria === ORDER_DESC_BY_NAME)
        result = array.sort(function (a, b) {
            if (a.name > b.name) return -1;
            if (a.name < b.name) return 1;
            return 0;
        });
    if (criteria === ORDER_BY_PROD_COUNT)
        result = array.sort(function (a, b) {
            let aCount = parseInt(a.productCount);
            let bCount = parseInt(b.productCount);

            if (aCount > bCount) return -1;
            if (aCount < bCount) return 1;
            return 0;
        });

    return result;
}

showCategoriesList = () => {

    let htmlContentToAppend = "";
    for (let category of sortedCategoriesArray) {

        if (((minCount == undefined) || (minCount != undefined && parseInt(category.productCount) >= minCount)) &&
            ((maxCount == undefined) || (maxCount != undefined && parseInt(category.productCount) <= maxCount))) {

            htmlContentToAppend += `
            <div class="list-group-item-action card col-xs-8 col-sm-6 col-md-4 col-lg-4">
                <a href="category-info.html" style="text-decoration:none; color: #404244">
                    <div class="col-12">
                        <img src="${category.imgSrc}" alt="${category.description} " class="img-thumbnail">
                    </div>
                    <div class="col">
                        <div class="d-flex w-100 justify-content-between">
                            <h4 class="mb-1">${category.name}</h4>
                        </div>
                        <p class="mb-1"><em>${category.description}</em></p>
                    </div>
                </a>
            </div>
            `
        }

        $("#cat-list-container").html(htmlContentToAppend);
    }
}

sortAndShowCategories = (sortCriteria, categoriesArray) => {
    currentSortCriteria = sortCriteria;

    if (categoriesArray != undefined) {
        sortedCategoriesArray = categoriesArray;
    }

    sortedCategoriesArray = sortCategories(currentSortCriteria, sortedCategoriesArray);

    //Muestro las categorías ordenadas
    showCategoriesList();
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
$(document).ready(function (e) {
    getJSONData(CATEGORIES_URL).then(function (resultObj) {
        if (resultObj.status === "ok") sortAndShowCategories(ORDER_ASC_BY_NAME, resultObj.data);
    });

    $("#sortAsc").click(function () {
        sortAndShowCategories(ORDER_ASC_BY_NAME);
    });

    $("#sortDesc").click(function () {
        sortAndShowCategories(ORDER_DESC_BY_NAME);
    });

    $("#sortByCount").click(function () {
        sortAndShowCategories(ORDER_BY_PROD_COUNT);
    });

    $("#clearRangeFilter").click(function () {
        $("#rangeFilterCountMin").value = "";
        $("#rangeFilterCountMax").value = "";

        minCount = undefined;
        maxCount = undefined;

        showCategoriesList();
    });

    $("#rangeFilterCount").click(function () {
        //Obtengo el mínimo y máximo de los intervalos para filtrar por cantidad
        //de productos por categoría.
        minCount = $("#rangeFilterCountMin").val();
        maxCount = $("#rangeFilterCountMax").val();

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

        showCategoriesList();
    });
});

//Función que filtra las categorías por nombre
$("#buscador-cat").keyup(function (e) {

    let inputBuscador = $("#buscador-cat").val();
    let htmlContentToAppend = ""

    //Uso los métodos .normalize y .replace para que ignore tildes
    for (let category of sortedCategoriesArray) {
        if (((category.name).toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")).includes(inputBuscador.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")) ||
            ((category.description).toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")).includes(inputBuscador.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, ""))) {

                htmlContentToAppend += `
                <div class="list-group-item-action card col-xs-8 col-sm-6 col-md-4 col-lg-4">
                    <a href="category-info.html" style="text-decoration:none; color: #404244">
                        <div class="col-12">
                            <img src="${category.imgSrc}" alt="${category.description} " class="img-thumbnail">
                        </div>
                        <div class="col">
                            <div class="d-flex w-100 justify-content-between">
                                <h4 class="mb-1">${category.name}</h4>
                            </div>
                            <p class="mb-1"><em>${category.description}</em></p>
                        </div>
                    </a>
                </div>
                `
        }
        $("#cat-list-container").html(htmlContentToAppend);
    }
});